---
title: 大话线上事故
reward: false
top: false
date: 2023-11-26 21:13:51
authors: 一卓 17哥
categories:
tags:
---

说起`线上事故`，资深的IT从业人员也难免"谈虎色变"。对于一叶扁舟的小型初创公司，它像狂风暴雨，轻则使之风雨飘摇，对于泰坦尼克号类的大型公司，则可能是危险的冰山，重则致其折戟沉沙。本文尝试通过浅显易懂的方式，从系统设计的角度对3个已发生的事故进行原因分析，总结改进方案。

愿"哀之鉴之，不使后人而复哀后人也"。

* 事故一：西瓜和芝麻一起蚌埠住了--组件上线导致服务不可用x分钟
* 事故二：超时还是不超时，这是个问题--不合理的止损方案导致服务大量拒绝
* 事故三：删除一条数据，系统崩溃了--牵一发而动全身，不合理的系统架构

## 事故一 西瓜和芝麻一起蚌埠住了

`故障描述`：不重要的芝麻组件发生配置变更，由于线上程序不兼容，导致其重启后挂掉，重要的西瓜组件由于采用同步阻塞方式调用了芝麻组件，进而无法写入卡死，导致大量用户访问拒绝

![](1.png)

`经验教训`：
* 关键点：西瓜重要，相对来说，芝麻不重要，芝麻丢了不应该西瓜也一起跟着丢掉，需要保住西瓜！！
* 芝麻组件未做好前向兼容，对于不能识别的配置，没有终止操作
* 组件之间的强/弱耦合关系需要正确处理，系统才具备容灾/解耦能力
* 由于程序健壮性不足，无法自动重启，通过手动发单操作重启，导致回滚环节持续时间较长

## 事故二 超时还是不超时，这是个问题

`故障描述`：网络异常触发了Redis主从全量同步，导致Redis负载较高，读写成功率降低。处理该问题时，将超时时间配置修改为0，意图尝试快速超时断开Redis连接，而0的含义实际为不超时，操作后问题进一步扩大：PHP进程夯住，大量请求拒绝，问题等级上升为事故

![](2.png)

`经验教训`：
* 存储层未区分核心、非核心，导致无法对非核心数据进行摘除，止损方案本身不合理
* 连接层的处理上，未对边界配置进行充分了解，仓促进行调整，导致故障范围扩大
* 监控角度，地域连通性监控，主从同步监控有效性需要检查

## 事故三 删除一条数据，系统崩溃了

`故障描述`：删除Redis的一个大Key，导致地域X，地域Y机房Redis阻塞，Redis不可读写，在横跨多业务线的系统中，逐层触发重试风暴，最终DB流量暴增被压垮，同时影响共用DB的模块B、C、D，其中包含某"一级服务（核心）"，另外上游模块也被拖死，请求大量拒绝

![](3.png)

`经验教训`：
* 不合理的重试次数设置：底层服务挂掉后，逐层触发重试，疯狂重试！
* 共用数据库可以考虑拆分与隔离，使用异步队列等
* 大Key删除可能导致"堵水管"（redis主线程执行del），4.0以后得版本可以考虑lazy free
* 同理考虑DB删除记录带来的锁升级风险
