---
layout: post
date: 2026-07-23
title: "[논문 리뷰] Meta-Transformer: A Unified Framework for Multimodal Learning"
excerpt: "Zhang, Yiyuan, et al. \"Meta-transformer: A unified framework for multimodal learning.\" arXiv preprint arXiv:2307.10802 (2023). https://arxiv.org/abs/2307.10802 https://github.com/invictus717/MetaTransformer Multimodal을..."
image: /assets/img/2026-07-23-metatransformer_a_unified_framework_for_multimodal_learning/0.png
tags: [Arxiv, Transformer, Multimodal]
categories: [Paper Review]
---

> Zhang, Yiyuan, et al. "Meta-transformer: A unified framework for multimodal learning." _arXiv preprint arXiv:2307.10802_ (2023).


> [https://arxiv.org/abs/2307.10802](https://arxiv.org/abs/2307.10802)
[https://github.com/invictus717/MetaTransformer](https://github.com/invictus717/MetaTransformer)


Multimodal을 하나의 backbone을 이용해 처리하는 framework.


제목에 비해 Multimodal task 결과가 적어 아쉬움이 있다.


---


---


---



## Abstract

- Multimodal learning에 있어 modality 간의 내재된 격차로 인해 다양한 modality 처리를 위한 통합 네크워크 설계는 어려운 과제
- Pair를 이루는 multimodal 학습 데이터 없이도 multimodal perception 가능한 framework 제시
- 다양한 modality를 tokenizer를 통해 공유 공간으로 mapping, Frozen encoder를 활용하여 feature extraction하는 구조

---


---


---



## Introduction


![](/assets/img/2026-07-23-metatransformer_a_unified_framework_for_multimodal_learning/0.png)

- 각 modality는 고유한 data pattern을 가지며 이로 인해 다른 modality로 학습된 모델 적용에 한계 존재

  → Modality를 encoding하기 위해 그에 맞는 architecture 사용하는 것이 일반적


  ![](/assets/img/2026-07-23-metatransformer_a_unified_framework_for_multimodal_learning/1.png)


> **Meta-Transformer**

- Images, natural language, point cloud, audio spectrogram, video, infrared, hyperspectral, X-Ray, IMU, tabular, graph, and time-series data 를 포함하는 12개의 modality를 처리하기 위한 Transformer 기반 framework
- 동일한 parameter set을 사용해 12가지 modality data를 동시에 encoding
- `Modality-specialist` : Data-to-sequence tokenization, 각 modality 입력을 common manifold space 공유하는 token sequence로 변환
- `Modality-shared encoder` : Modality 간 representation extraction 위한 frozen shared encoder, token sequence 입력받아 feature extraction 수행
- `Task-specific heads` : Downstream task head

> **Contribution**

1. 동일한 parameter set으로 여러 modality에서 동시에 representation 추출할 수 있는 framework, Meta-Transformer 제안
1. Multimodal network design 위해 다양한 modality 처리에 있어 embedding, tokenize, encoder 등 Transformer의 다양한 요소의 기능 검토 
→ 모든 modality를 통합할 수 있는 modality-agnostic framework 개발의 방향성 제시
1. 다양한 task에서 SoTA급 성능 제시

---


---


---



## Method


![](/assets/img/2026-07-23-metatransformer_a_unified_framework_for_multimodal_learning/2.png)

- Meta-Transformer는 서로 다른 modality를 처리하는 다중 pipeline 통합
- Shared encoder를 통해 12가지 modality를 encoding
- Modality 별 tokenizer 통해 데이터를 shared embedding space로 투영

---



#### Preliminary


> **Multimodal Pipeline**

- \{X1, X2, · · · , Xn\} : n개 modality의 input space
- \{Y1, Y2, · · · , Yn\} : input에 대응하는 label space
- F : x ∈ X →\hat y ∈ Y : Multimodal mapping function
  - x : Inputa data
  - \hat y : Model 예측 label

> **Hypothesis**

- 각 modality에 대해 효과적인 parameter space θi ∈ Θi 있다고 가정 

  <span class="notion-red">_→ Input _</span><span class="notion-red">_x_</span><span class="notion-red">_에 대해 최적의 feature를 encoding할 수 있는 parameter space 존재_</span>

- `Hypothesis` : \Theta\_1 \cap \Theta\_2 \cap \Theta\_3 \cap \dots \cap \Theta\_n \neq \varnothing

  → 모든 modality의 effective parameter space는 교집합을 가짐


> **Objective**

- Meta-Transformer의 본질은 다음을 만족하는 shared \theta^\* 찾는 것

$$
\theta^* \in \Theta_1 \cap \Theta_2 \cap \Theta_3 \cap \cdots \Theta_n
$$


> **각 Modality input을 encoding하는 최적의 parameter space가 존재하고 그 교집합이 공집합이 아닐때, Meta-Transformer는 multimodal input에 대한 최적의 parameter space ****\theta^\*****를 찾는 것이 목표**
{: .prompt-tip }


---



#### Data-to-Sequence Tokenization


![](/assets/img/2026-07-23-metatransformer_a_unified_framework_for_multimodal_learning/3.png)

- 다양한 modality data를 shared manifold space 내의 token embedding으로 변환
  - `Natural Language` : WordPiece embedding
  - `Image` : 2D patch로 flatten 후 embedding, video 입력의 경우 3D convolution 통해 patchify

  <span class="notion-red">⚠️ 다른 모달리티에 대한 embedding 방법들은 paper/appendix 참고</span>


---



#### Unified Encoder


> **Pretraining**

- Raw input을 token embedding space로 변환 후 **frozen된 shared transformer encoder**를 통해 각 modality의 token embedding sequence encoding 

  <span class="notion-red">→ LAION-2B로 학습된 ViT를 backbone으로 고정, ViT-base 사용</span>

- Text understanding task에서는 CLIP의 pretrained text tokenizer 사용해 word embedding 추출

> **Modality-Agnostic Learning & Task-specific Hads**

- Modality token embedding 앞에 learnable CLS token 추가
- 1D positional embedding을 element-wise addition으로 결합
- Shared backbone encoder에 입력
- 각 task 별로 MLP head 구성하며 아래와 같은 학습 objective 가짐

  $$
  \hat{\boldsymbol{y}} = \mathcal{F}(\boldsymbol{x}; \theta^*) = h \circ g \circ f(\boldsymbol{x}), \quad \theta^* = \underset{\theta}{\arg\min} \mathcal{L}(\hat{y}, y)
  $$

  - f, g, h : tokenizer, backbone, head

> Pretrain된 ViT backbone에 각 task input에 맞는 tokenizer와 head를 붙여 supervised train하는 방식
>
> _**→ Multimodal input에도 확장 가능하며, 핵심은 하나의 backbone을 여러 modality 또는 multimodal 조합에 사용 가능하다는 것**_
{: .prompt-tip }


---


---


---



## Experiments


![](/assets/img/2026-07-23-metatransformer_a_unified_framework_for_multimodal_learning/4.png)

- 위와 같은 task에 대해 각 benchmark 수행

<span class="notion-red">_**본 review에는 일부 task 결과만 제시**_</span>


> **Text Understanding**


![](/assets/img/2026-07-23-metatransformer_a_unified_framework_for_multimodal_learning/5.png)

- F, T는 각각 backbone ViT의 finetuning 여부 표현
- 기존 model에 비해 떨어지는 성능 보임

> **Image Understanding**


![](/assets/img/2026-07-23-metatransformer_a_unified_framework_for_multimodal_learning/6.png)


---


---


---



## Conclusion


> **Limitations**

- O(n^2\times D)의 높은 연산량
- 기존 연구들에 비해 temporal, structural awareness 부족

<span class="notion-red">각 benchmark 특화 모델에 비해 떨어지는 성능을 보이기도 함</span>


<span class="notion-red">하지만 단일 backbone을 통해 다양한 multimodal task를 cover할 수 있다는 장점이 있음</span>


<span class="notion-red">↔ 그럼에도 각 task에 사용되는 modality 별 tokenizer와 head를 따로 두어 학습한다는 한계 존재. Foundation model로의 발달을 위해서는 추가적인 장치가 필요할 듯 함</span>

