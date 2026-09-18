---
layout: post
date: 2026-09-18
title: "[논문 리뷰] Masked Siamese Networks for Label-Efficient Learning"
excerpt: "이번 논문은 Contrastive loss를 두 representation에 직접 적용하지 않고 prototype이라는 learnable sequence와 간접적으로 distribution을 정렬하는 방식이다. Assran, Mahmoud, et al. \"Masked siamese networks for label-efficient learning.\" European conference on..."
image: /assets/img/2026-09-18-masked_siamese_networks_for_labelefficient_learning/0.png
tags: [ECCV, SSL]
categories: [Paper Review]
---

이번 논문은 Contrastive loss를 두 representation에 직접 적용하지 않고 prototype이라는 learnable sequence와 간접적으로 distribution을 정렬하는 방식이다. 


> Assran, Mahmoud, et al. "Masked siamese networks for label-efficient learning." _European conference on computer vision_. Cham: Springer Nature Switzerland, 2022.
[https://arxiv.org/abs/2204.07141](https://arxiv.org/abs/2204.07141)


---



## Abstract

- Image representation learning framework Masked Siamese Networks (MSN) 제시
- Original unmasked image와 randomly masked patch의 representation 일치시키는 방식

---


---


---



## Introduction


**Masked Reconstruction**

- Reconstruction loss를 최적화하기 위해서는 low-level image detail을 modeling해야 함
- Classification task와 같이 semantic abstraction을 포함하는 작업에는 불필요

  → semantic recognition task를 위해 fine-tune 필요하며 low-shot에서 overfitting 유발할 수 있음


**Joint-embedding**

- Augmented view 간의 유사성 학습 → Invariance-based pretraining)
- Inductive bias는 일반적으로 높은 semantic level의 off-the-shelf representation 생성하지만 local structure 간과

** Masked Siamese Networks (MSNs)**

- Masking된 입력의 representation과 unmask 표현의 일치

  → 암시적으로 denoise 수행


---


---


---



## Method


![](/assets/img/2026-09-18-masked_siamese_networks_for_labelefficient_learning/0.png)

- Augmentation된 두 image 생성
- Random mask가 적용된 anchor view와 unmask 상태인 target view
- 두 view에 대해 soft distribution 계산해 두 representation을 동일한 prototype에 할당
  - Prototype : Learnable vector 집합으로 image feature의 대표값
  - Input representation과 prototype 간의 유사도를 softmax로 나타냄

---



#### Input Views

- B : 1개 이상의 image 포함하는 mini-batch 
- x\_i : batch 내의 i 번째 sample
- x^+\_i : augmentation 적용된 target view
- x\_{i,M} : anchor view

---



#### Patchify and Mask

- 각 view를 겹치지 않는 N \times N patch sequence로 변환 후 anchor view masking
- \hat x\_{i,M} : masked anchor sequence
- \hat x^+ : masking 되지 않은 target patch sequence

→ masking 여부에 따라 두 view의 sequence 길이 다를 수 있음


**Masking strategy**


![](/assets/img/2026-09-18-masked_siamese_networks_for_labelefficient_learning/1.png)

- anchor view masking 위한 두 전략
- `Random Mask` : 무작위 patch 제거
- `Focal Mask` : anchor view의 국소적인 연속 블록 무작위 선택 이외의 patch 제거

---



#### Encoder

- ViT를 encoder로 사용하며 target encoder는 anchor encoder의 EMA 통해 업데이트
- f\_{\theta}(\cdot) : anchor encoder
- z\_{i,M} : masking된 anchor view로부터 계산된 representation

---



#### Similarity Metric and Predictions

- q \in \R^{K \times d} : K > 1의 Learnable prototypes, 각 prototype은 d 차원
- Encoder 학습을 위해 prototype과 anchor/target view 쌍 사이의 similarity를 기반으로 distribution 계산
- Distribution간 차이에 대해 encoder에 penalty 부여

$$
p_{i,m} := \operatorname{softmax} \left( \frac{z_{i,m} \cdot \mathbf{q}}{\tau} \right)
$$

- p\_{i,M} : anchor representation과 prototype matrix q 사이의 cosine similarity 측정한 K 차원의 prediction
  - p\_{i,m} \in \Delta^K
  - 두 view에 대해 각각 계산

---



#### Training Objective

- Anchor와 target prediction이 다를 때 penalty 부여
- Cross-entropy loss 사용
- 모델이 전체 prototype 활용하도록 장려하기 위해 평균 엔트로피 최대화 (ME-MAX) 기법 통합

아래와 같이 모든 anchor view에 걸친 평균 예측값 정의


$$
\bar{p} := \frac{1}{MB} \sum_{i=1}^{B} \sum_{m=1}^{M} p_{i,m}
$$


ME-MAX 정규화는 p의 엔트로피인 H(p) 최대화하거나 동등하게 p의 음의 엔트로피 최소화를 목표로 하므로 아래와 같은 Objective 가짐


$$
\frac{1}{MB} \sum_{i=1}^{B} \sum_{m=1}^{M} H(p_{i}^{+}, p_{i,m}) - \lambda H(\bar{p})
$$


<span class="notion-red">_→ 학습 시 target encoder는 EMA로 update 되므로 anchor의 prediction에 대해서만 gradient 계산됨_</span>


---


> 두 view의 CLS token과 learnable prototype matrix와의 similarity를 계산해 prediction을 만든 후 두 prediction 간의 cross-entropy 계산하는 방식
>
> - Pixel level의 복원 대신 prototype space에서 두 view의 distribution 일치시켜 간접적으로 denoise
> - 복원 불필요, masking으로 인한 연산량/메모리 사용량 감소
> - Temperature param.과 ME-MAX 정규화 통해 representation collapse 방지
{: .prompt-tip }


---


---


---



## Result

- Extreme low-shot

![](/assets/img/2026-09-18-masked_siamese_networks_for_labelefficient_learning/2.png)

- 1% label low-shot

![](/assets/img/2026-09-18-masked_siamese_networks_for_labelefficient_learning/3.png)

- Linprob

![](/assets/img/2026-09-18-masked_siamese_networks_for_labelefficient_learning/4.png)

- fine-tune

![](/assets/img/2026-09-18-masked_siamese_networks_for_labelefficient_learning/5.png)

