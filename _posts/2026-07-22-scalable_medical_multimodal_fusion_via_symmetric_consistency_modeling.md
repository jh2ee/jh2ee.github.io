---
layout: post
date: 2026-07-22
title: "[논문 리뷰] Scalable Medical Multimodal Fusion via Symmetric Consistency Modeling"
excerpt: "최근 ICML 2026이 코엑스에 열려 다녀왔다. 최근 트렌드는 아무래도 agentic AI 그리고 신약개발 관련 분야인 protein sequence 관련 연구들이었던 것 같다. Multimodal 관련 연구도 심심찮게 보였는데 medical 분야를 연구하다 보니 관련 연구로 몇 가지 리뷰해보려 한다. ICML에도 의료 분야 연구는 꽤 있었지만 대부분 EEG 같은 signal 위주의..."
image: /assets/img/2026-07-22-scalable_medical_multimodal_fusion_via_symmetric_consistency_modeling/0.png
tags: [ICML, Multimodal]
categories: [Paper Review]
---

_최근 ICML 2026이 코엑스에 열려 다녀왔다. 최근 트렌드는 아무래도 agentic AI 그리고 신약개발 관련 분야인 protein sequence 관련 연구들이었던 것 같다. Multimodal 관련 연구도 심심찮게 보였는데 medical 분야를 연구하다 보니 관련 연구로 몇 가지 리뷰해보려 한다._


_ICML에도 의료 분야 연구는 꽤 있었지만 대부분 EEG 같은 signal 위주의 연구였던 것 같다. 의료 학회에서는 CT가 가장 흔한 분야였던 것에 반해.._


---


> Sun, Xiaowen, et al. "Scalable Medical Multimodal Fusion via Symmetric Consistency Modeling." _Forty-third International Conference on Machine Learning_.


> [https://icml.cc/virtual/2026/poster/65096](https://icml.cc/virtual/2026/poster/65096)
[https://github.com/xxiaowSun/SMMF](https://github.com/xxiaowSun/SMMF)


---


---


---



## Abstract


의료 진단 task는 multimodal의 heterogeneous information 활용하지만 기존 방법은 고정된 modality set을 가정 → modality 수와 구성이 변경될 경우 성능 떨어지는 문제 발생


⇒ 임의 개수의 modality 입력을 수용할 수 있는 **modality-agnostic medical multimodal fusion framework** 제시

- 각 modality의 latent semantic estimation을 uncertainty-aware probability distribution으로 표현
- Global cross-modal semantic alignment 달성 위해 symmetric consistency constraint 도입
- Fusion 단계에서 multi-view consistency strategy 도입

---


---


---



## Introduction

- 의료 영상 기술과 임상 정보 시스템 발전과 함께 multimodal data를 이용한 diagnosis 연구 발전

> **Challenges**

- 기존 연구들은 multimodal feature fusion과 representation learning에 초점을 맞추고 있으며 아래와 같은 challenges 존재
  1. Cross-modal interaction 위해 세밀한 feature를 도입했으나 direct fusion을 위한 discriminative information으로만 활용해 cross-modal local semantic structure consistency 부족
  <span class="notion-red">⇒ Modality 별 차이를 cross-modal consistency 학습 과정에서 반영하지 않음</span>
  1. Medical modality가 동일한 semantic을 표현함에 있어 상당한 불일치 보이나 각 modality를 deterministic vector로 표현
  <span class="notion-red">⇒ 동일한 질병에 대한 신호를 서로 다른 방식으로 포착/표현하기에 단순히 feature vector를 일치시키는 것으로 충분하지 않음</span>
  1. 모델 설계 과정에서 modality set 고정
  <span class="notion-red">⇒ 다양한 modality 조합에 따른 확장성과 일반화 능력에 제약 존재</span>

> **Proposed Methods**

1. `Uncertainty modeling`
  - 서로 다른 modality가 동일한 medical semantic을 표현할 때 발생하는 신뢰도의 차이 처리를 위함
  - semantic encoding 단계에서 도입

  <span class="notion-red">⇒ 각 modality의 estimation을 단일 vector가 아닌 확률 분포로 표현해 서로 다른 modality 사이의 alignment를 신뢰도에 따라 동적으로 조절 가능</span>

1. `Bidirectional consistency constraint`
  - Fine-grained cross-modal consistency 학습 위함
  - Token-level의 linear cross-modal reconstruction
1. `Multi-view consistency prespective` 
  - 각 modality를 순차적으로 conditional view로 취급, 나머지 modality representation의 noise 제거
  - 서로 다른 modality 간 공유되는 semantic 추출

---


---


---



## Method

- Multimodal medical data를 이용한 diagnosis task에 초점을 맞춘 end-to-end framework 제안

![](/assets/img/2026-07-22-scalable_medical_multimodal_fusion_via_symmetric_consistency_modeling/0.png)


---



#### Modality-level Consistency Alignment

- Multimodal task에서 서로 다른 modality는 동일한 semantic을 설명할 때도 신뢰도 차이 존재

  → Modality 수준의 bidirectional consistency alignment 도입


![](/assets/img/2026-07-22-scalable_medical_multimodal_fusion_via_symmetric_consistency_modeling/1.png)


> **Notation**

- s\_i : Subject i 의 semantic representation <span class="notion-red">_→ 모든 modality를 종합한 Ground Truth, 주어지지 않는 값으로 근사할 대상임_</span>
- z^{(m)}\_i \in \R^d : Subject i 의 m번째 modality의 representation → 모델을 통해 구하는 값
- \mu^{(m)}\_i : Global feature로 다른 모달리티와 공유되는 semantic feature로 사용
- \sigma^{(m)}\_i : Uncertainty, 모달리티의 신뢰성 나타냄

> **Methods**

1. Input modality m에 대해 Dual Encoder 적용
  - `Shared semantic Encoder` : 다른 modality와 공유되는 feature \mu 와 Local token \tau 출력
  - `Uncertainty Encoder` : 이 modality의 불확실성 vector \sigma 출력
1. Modality m에 대한 latent semantic variable s\_i 추정치 모델링

  $$
    q_{i}^{(m)}(s_{i}) = \text{N}(s_{i}; \mu_{i}^{(m)}, \text{diag}((\sigma_{i}^{(m)})^{2})).
  $$

  - 각 modality를 단일 deterministic vector가 아닌 확률분포로 표현

    → 신뢰도 높은 modality(작은 \sigma)는 평균 \mu의 영향력을 공유 공간 형성에 더 크게 기여하도록 함

  - 대각 공분산행렬 채택을 통해 차원 간 독립성 가성 → 계산 단순화

  > 서로 다른 modality로 부터 얻은 동일 subject의 semantic characterization은 동일한 latent variable에 의한 통계적 측정값으로 간주됨
  >
  > → 서로 다른 modality로부터 추론된 semantic distribution은 통계적 관점에서 가까워야함
  >
  >
  > <span class="notion-red">⇒ </span><span class="notion-red">**Symmetric KL Divergence**</span><span class="notion-red">를 modality level의 consistency contraints로 채택</span>
  {: .prompt-tip }

1. Loss

  $$
  L_{bi-align}^{m,k} = E [KL(q_{i}^{(m)}||q_{i}^{(k)}) + KL(q_{i}^{(k)}||q_{i}^{(m)})].
  $$

  - 서로 다른 두 modality m, k에 대한 symmetric KL Divergence
  - Loss는 전체 modality pair에서 계산한 합

  $$
  L_{bi-align} = \sum_{m<k} L_{bi-align}^{m,k}.
  $$


---



#### Token-level Bidirectional Consistency Alignment

- Modality level의 alignment는 global semantic의 일관성을 보장하지만 서로 다른 modality는 여전히 local하고 세밀한 semantic 차이 존재
- Cross-modal alignment의 신뢰성 향상 위해 bidirectional reversible reconstruction 기반의 token-level consistency alignment 도입

> **Notation**

- H^{(m)}\_i : Sample i의 modality m에 대한 token representations (=\tau)
- \lambda : Regularization coefficient

> **Methods**

1. Sample의 modality 별 token representations H에 대해 cross-modal linear reconstruction 연산자 W(=R) 구성
  - Deterministic least-squares criterion (최소 자승법) 사용 → 오차 제곱합 최소화하여 최적화

    <span class="notion-red">⇒ 여러개 존재할 수 있는 연산자의 해를 deterministic하게 구할 수 있도록 함.</span>

  - Modality k로 부터 m을 재구성하는 linear reconstruction 연산자는 아래의 matrix regression 문제의 닫힌 해로 정의

  $$
  R^{m \leftarrow k} = \underset{R}{\arg \min} \left\| H_{i}^{(m)} - H_{i}^{(k)} R \right\|_{F}^{2} = (H_{i}^{(k)T} H_{i}^{(k)} + \lambda I)^{-1} H_{i}^{(k)T} H_{i}^{(m)}
  $$

1. Operator-level의 bidirectional consistency constraint 적용
  - 두 모달리티가 일관된 local semantic structure를 공유한다면 둘 사이의 bidirectional reconstruction 연산자 또한 일관됨

    <span class="notion-red">⇒ 두 연산자의 곱이 Identity 행렬과 같음</span>


  $$
  L_{bi-token} = \sum_{m<k} \|R^{m \leftarrow k} R^{k \leftarrow m} - I\|_{F}^{2} + \sum_{m<k} \|R^{k \leftarrow m} R^{m \leftarrow k} - I\|_{F}^{2}
  $$

  - 양방향에 대해 모두 constraint 적용함으로써 두 모달리티 사이의 일관성/가역성 보장

---



#### Multimodal Fusion

- 서로 다른 modality에 걸쳐 동일한 medical semantic을 표현하는 정보 통합, 중복성/노이즈 억제 목적
- multiple conditional 관점에서 multimodal representation에 consistency constraint 부여

> **Notation**

- p : Conditional modality
- A : 나머지 modality
- s, n : signal, noise <span class="notion-red">→ </span><span class="notion-red">s</span><span class="notion-red">의 경우 앞서 언급한 latent semantic variable 아님</span>
- z : Modality features, shared semantic encoder의 output
- I : InfoNCE loss
- H : Conditional entropy (batch-wise coefficient penalty)

> **Methods**

1. 각 modality의 feature는 signal과 noise로 decompose 가능
  - signal은 diagnosis에 있어 중요한(영향을 미치는) 성분

  $$
  z_{i}^{(p)} = s_{i}^{(p)} + n_{i}^{(p)}, z_{i}^{(m)} = s_{i}^{(m)} + n_{i}^{(m)}, m \in A
  $$

  - Signal은 MLP를 통해 z로 부터 얻어지며 noise는 z-s로 구해짐
1. Modality 집합 A와 conditional modality 간의 semantic consistency 향상 위해 directional information constraint loss 설계

  $$
  L_{signal} = -\sum_{m \in A} (I(s_{i}^{(p)}; s_{i}^{(m)}|z_{i}^{(p)}) - H(s_{i}^{(m)}|z_{i}^{(m)}))
  $$

  - I는 conditional mutual information을 나타내며 InfoNCE loss로 근사
    - 동일한 sample을 기준으로 conditional modality p의 representation과 나머지 modality의 signal이 가까워지도록 발생
    - 다른 sample의 signal은 밀어냄
  - H는 conditional entropy를 나타내며, 일종의 regularizer로 사용됨, 구현 상 batch-wise coefficient penalty
1. Noise 억제를 위해 아래 loss 사용

  $$
  L_{noise} = \sum_{m \in A} \left( \left\| n_i^{(p)} s_i^{(p)T} \right\|^2 + \left\| n_i^{(m)} s_i^{(p)T} \right\|^2 \right) + \sum_{m \in A} \left( \left\| n_i^{(p)} s_i^{(m)T} \right\|^2 + \left\| n_i^{(m)} s_i^{(m)T} \right\|^2 \right)
  $$

  - Noise와 signal의 외적을 손실로 사용 → signal과 noise 사이의 유사도 낮아지도록 함
1. 추출된 signal의 합으로 fusion

  $$
  X_{fusion} = \sum_{k=1}^{M} s_{i}^{(k)}
  $$


---



#### Objective

- 논문에는 따로 언급되어 있지 않으나 end-to-end framework로 classification loss까지 발생
- 아래와 같은 loss로 학습됨. 

$$
\begin{aligned}
L_{\text{total}} \;=\; &\; \alpha\, L_{\text{bi-align}} \;+\; \beta\, L_{\text{bi-token}} \;+\; \gamma\, L_{\text{signal}} \\
&\; +\; \delta\, L_{\text{noise}} \;+\; \eta\, L_{\text{cls}},
\end{aligned}
$$


---


---


---



## Experiments


> **Dataset**

- `ABIDE` : 자폐아 관련 dataset, fMRI/clinical 사용
- `ADHD-200` : ADHD 관련 dataset, fMRI/clinical 사용
- `CMMD` : 유방 조직 관련 dataset, CT/US/clinical 사용
- `Self-constructed datasets` : Multimodal breast cancer dataset과 gastric cancer dataset 구성

> **Results**


![](/assets/img/2026-07-22-scalable_medical_multimodal_fusion_via_symmetric_consistency_modeling/2.png)


![](/assets/img/2026-07-22-scalable_medical_multimodal_fusion_via_symmetric_consistency_modeling/3.png)


![](/assets/img/2026-07-22-scalable_medical_multimodal_fusion_via_symmetric_consistency_modeling/4.png)


![](/assets/img/2026-07-22-scalable_medical_multimodal_fusion_via_symmetric_consistency_modeling/5.png)


![](/assets/img/2026-07-22-scalable_medical_multimodal_fusion_via_symmetric_consistency_modeling/6.png)


![](/assets/img/2026-07-22-scalable_medical_multimodal_fusion_via_symmetric_consistency_modeling/7.png)


![](/assets/img/2026-07-22-scalable_medical_multimodal_fusion_via_symmetric_consistency_modeling/8.png)


![](/assets/img/2026-07-22-scalable_medical_multimodal_fusion_via_symmetric_consistency_modeling/9.png)


![](/assets/img/2026-07-22-scalable_medical_multimodal_fusion_via_symmetric_consistency_modeling/10.png)


---


_최근 multimodal fusion 연구들은 특히 medical domain에서는 disentanglement를 통해 modality common/specific information의 분리를 통해 표현력을 향상하려는 시도가 많은데 비해, 한 sample의 latent semantic variable의 존재를 가정해 각 modality가 가진 정보를 variable을 바라보는 상이한 view로 재정의 하는 시각이 새롭다._


_이를 통해 확률 분포로 variable을 모델링함으로써 modality에 존재하는 noise를 제거하고 핵심 signal만 추출해 fusion을 이루는 방식은 새로우나 fusion technique에 있어서는 단순 sum으로 구성된 것이 의아했다._


_실제 code 구성을 보면 설명된 architecture에 비해 구현 자체는 복잡하게 되어 있지 않고, 간소화 되어있다는 느낌을 받았다. 또한 한번에 5개의 loss term이 존재하고 대부분 bidirectional loss이기 때문에 hyperparameter tunning이 힘들 것 같다._

