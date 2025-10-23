---
layout: post
date: 2025-10-22
title: "[논문 리뷰] GroupMamba: Efficient Group-Based Visual State Space Model"
tags: [Mamba]
categories: [Paper Review]
---


## Abstract

- Vision에 있어 Mamba는 Scaling의 불안정, 비효율의 문제점 존재
- Modulated Group Mamba 제안
	- input channel을 4개의 group으로 분할
	- 4개의 direction 중 하나의 방향으로 scan하는 efficient Visual Single Selective Scanning(VSSS) block
	- block을 각 group에 독립적으로 적용
	- 4개의 VSSS block을 channel modulation operator로 감싸 cross-channel communication 향상
	- <span class="notion-red">_**distillation-based training**_</span> objective를 통해 large scale에서의 안정성, 성능 향상

> ❓ **Distillation-based training?**

	- Knowledge Distillation(KD) 기반 학습
	- Student-Teacher 구조의 학습 방법


## Introduction

- 초기 SSM(S4)는 Vision과 같은 고밀도 data의 global context 처리에 한계 존재

	→ Mamba는 S6를 도입해 입력 의존적인 selective-scan을 통해 long-term dependency 향상

- Mamba는 여전히 **scaling 문제** 존재 

	→ model 커질 수록 학습 불안정 (instability)

- Mamba의 Vision 버전인 VSS(Visual State Space) block은 channel에 비례해 파라미터 및 계산 효율 등의 문제 존재

> 💡 


	### Contribution

	1. `Modulated Mamba layer` : 계산 효율성, interaction 향상 위한 mamba layer 수정
	1. `Channel Affinity Modulation` (CAM) : channel 간 상호 작용 향상 operator
	1. `Distillation-based training objective` : 학습 불안정성 완화 위한 학습 방법
	1. `GroupMamba` : Modulated GM layer 기반 classification model 제시


## Method


> 💡 


	### Motivation

	- `Lack of Stability for Larger Models` : SiMBA-L (MLP)에서 확인된 문제
		- MLP channel mixer 사용 시 parameter 수 확장 시 불안정
		- **distillation objective**와** Modulated Group Mamba architecture**를 도입해 완화
	- `Efficient Improved Interaction` 
		- **Modulated Group Mamba layer** 도입 → 기존 Mamba layer보다 parameter 절감
		- **Multi-direction scan →** input token 단에서의 local, global information modeling
		- **Channel Affinity Modulation** 도입 → Group 연산으로 인한 제한된 channel interaction 향상


### Preliminaries



#### State-Space Models (SSM)



#### Discrete State-Space Models


SSM이 딥러닝에서 sequence modeling에 사용하기 위해 **discretization(이산화)**하여 연속 시간에서의 _function-to-function map_을 _discrete-time sequence-to-sequence map_으로 변환해야 한다.

- SSM은 continuous time system에서 정의
- sequence modeling은 continuous time이 아닌 token 기반의 특정 time step에서 데이터를 다룸
- continuous time → discrete time step 으로 변환 필요, **Discretization.**

일반적으로 discretization은 timescale parameter, \Delta를 continuous parameter와 통합해 수행


**→ Zero-Order Hold (ZOH)**



### Architecture


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/f9de14fb-9b58-4912-a908-139bc60500bd/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXOKJDW3%2F20251023%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251023T003900Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCbSGoXOW2xnJaXz9gM%2BfnX7KwPDikilKRSOW2Tu4IMAwIgHBbrGlA744TMJOApd203qipNIUNlr0kwcICFgCiQc2cq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDA3anrZMSNgopN6eSSrcA%2FiOqJYhdR6mSc14t6sjI5CFUPxlYr7hypxJUgZk2dFxCO5lXleJ3IiSqepdOor2iK2S19ImdzMUooBfWc2UTasnvO8sgpmqRIhz0ziGJZDdMzhgsOYgk7O0heeuEXKqneZhhJOW8fPLlzKLILE2Z%2B1o3teqk3dc2ScqXeTVpQHexh64NpIePTMEZfSncwku3WAZjJYQkU1C6dhbJFjoTDVAcE9wOv7TUyoDVlm%2BRY68zFtU9q1hclGr%2FMgjpGkZDPtaOx6UZxV%2FQPE%2BJFIsjADgrYWlNYrp3NQVATrPTfql6DmKty8PAlkh6GhClCndfvcN6cEoarpE3dSMrvri8LRN496N%2FyAuXcaPtbLbbCedmspfSJ3QmW4SQ%2BpY5kEIm7wBca7OQMcHgOKdBJQ8XeZiIEERalVaCY1cZApd1thr9YiyZCMLpDpu%2BpAS%2FY%2FNB%2BVIX%2FTCqruXyp4U0k63g5s9MxsD1C%2Bj4BxBclo0l3DupKEj6eIU3Vm436SkUkRKR8y6%2FCD0jPKis4dLef5ohYQVQavgbeRm6TWjdThzj3Zyco%2BzYouVrTBco9OC9QSOt19d%2FuoUSPHRAamc1zw4NfDikI%2FkPBC1x%2FneapT%2BxRE%2BJEYjIPUc6PNBdhn7MIba5ccGOqUBsU%2FtkqxU8m3l%2BgYBowoKOIgoq2nJGCDOCzyvTb2sAjBakSlI%2F5jCxf59F9KLPX1VHNjtcXQIFAfNt8t%2FzFx5GlPY4tNJuLV8SBYLgfM8aMCzMcxE9E5vW6xCLEeXaw1k5u6nVkb29IyxBUrNF7jRJqtlonAPhDAMDGlKEZXo7dkGFGqQkOnmredn7FxLmFfiezTGuaCRZpano8qRKRPj2bCxe8X%2F&X-Amz-Signature=c2362b686f7d5a7edba03ecfacc2952365fb4f1f951d1e30c0aac8b03414d938&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



#### Modulated Group Mamba Layer


Modulated GM layer는 크게 Group Mamba operator와 Channel Affinity Modulation으로 나눌 수 있다.

- `Group Mamba operator` : Input을 channel 기준으로 4개의 group으로 분할, VSSS block 거친 출력을 concat
- `Channel Affinity Modulation (CAM)` : group 분할로 channel 간 정보 교환 활성화 위한 연산

위 두 과정을 차례로 거친 후 Normalize, FFN을 거쳐 output을 출력, 수식으로 나타내면 다음과 같다.


$$
X_{GM} = GroupedMamba(X_{in}, \Theta) \\
X_{CAM} = CAM(X_{GM}, Affinity(X_{in}) \\
X_{out} = X_{in}+FFN(LN(X_{CAM}))
$$



#### Visual Single Selective Scan (VSSS) Block


Group Mamba operation은 다시 input을 4 group으로 나눠 각각 VSSS block를 통과시킨 후 concat 하는 과정으로 나뉜다. 


먼저 단일 VSSS block의 연산 과정을 살펴보면 수식 표현은 아래와 같다.


$$
Z'_{out} = Z_{in} + Mamba(LN(Z_{in})) \\
Z_{out} = Z'_{out} + FFN(LN(Z'_{out}))
$$


Mamba block은 discretization을 거친 Mamba SSM operator를 그대로 따르며, FFN의 경우 GELU activation과 linear projection을 통과하게 된다.


$$
FFN(LN(Z'_{out})) = GELU(LN(Z'_{out})W_1 + b_1)W_2 +b_2
$$



#### Grouped Mamba Operator


Grouped Convolution에서 영감을 받은 Mamba operation으로 앞서 소개한 VSSS block을 각 group에 개별 적용한다. Operation 과정은 아래와 같다.

1. Input의 channel을 4등분 하여 4개의 group으로 분할, `(B, H, W, C) → (B, H, W, ``\frac{C}{4}``)`
1. 각 group에 독립적인 VSSS block 적용 → channel을 작은 group으로 분할해 효율성 향상
1. 4개의 group은 서로 다른 scan 방향을 가짐
1. 각 group의 출력을 concat해 channel dimension 복원된 output 출력

수식으로 표현하면 아래와 같다.


$$
X_{GM} = GroupedMamba(X_{in}, \Theta) 
=Concat( \\ VSSS(X_{LR}, \Theta_{LR}), VSSS(X_{RL}, \Theta_{RL}), \\ VSSS(X_{TB}, \Theta_{TB}), VSSS(X_{BT}, \Theta_{BT}))
$$

- \Theta : 각 Mamba Block에 대한 operation parameter 집합
	- \Delta, B, C 생성 위한 learnable parameters
	- FFN의 linear projection 위한 W\_1, W\_2, b\_1, b\_2
- X와 \Theta 의 아래첨자는 각각 scan 방향을 의미함
	- LR : Left to Right
	- RL : Right to Left
	- TB : Top to Bottom
	- BT : Bottom to Top


#### Channel Affinity Modulation (CAM)

- `문제점` : Grouped Mamba operator는 각 group내의 연산이 \frac{C}{4} channel에서만 동작 
→ channel 간 정보 교환 제한적

_→ Channel-wise feature response의 향상 위한 연산 제안_

1. Input을 average pool하여 channel의 통계 계산
1. 2개의 activation function과 2개의 linear projection을 포함하는 Affinity 계산 연산 수행
1. Affinity 값 이용해 Grouped Mamba operation 결과 보정

수식으로 나타내면 아래와 같다.


$$
ChannelStat(X_{in}) = AvgPool(X_{in}) \\
Affinity(X_{in}) = \sigma(W_2\delta(W_1 ChannelStat(X_{in}))) \\
X_{CAM} = CAM(X_{GM},Affinity(X_{in})) = X_{GM}\cdot Affinity(X_{in}) 
$$

- X\_{in} : 입력 tensor로 Grouped Mamba operator의 입력과 동일
- X\_{GM}: Grouped Mamba 출력


#### Distilled Loss Function

- Mamba의 scaling 문제 해결 위한 방안
- Cross Entropy와 Knowledge Distilation objective 활용

> 💡  **Knowledge Distillation**

	- Classification loss와 distillation loss를 최소화 하도록 Teacher model 기반의 Student model 학습
	- Distillation loss는 teacher-student model 간의 CE objective로 계산

$$
\mathcal{L}_{total} = \alpha\mathcal{L}_{CE}(Z_s,y)+(1-\alpha)\mathcal{L}_{CE}(Z_S,y_t)
$$

- y : Ground Truth label
- y\_t : Teacher model이 예측한 label
- Z\_s : Student model의 예측 label
