---
layout: post
notion_page_id: "2aaad5ef-e42b-8057-bec3-fc677bf79eff"
date: 2025-11-13
title: "[논문 리뷰] UniCross: Balanced Multimodal Learning for Alzheimer’s Disease Diagnosis by Uni-modal Separation and Metadata-guided Cross-modal Interaction"
tags: [Alzheimer's Disease, Multimodal, MICCAI]
categories: [Paper Review]
---

본 논문은 MICCAI 2025 conference에 accept되었음.


> [Yin et al., MICCAI 2025](https://papers.miccai.org/miccai-2025/0972-Paper2409.html)



## Abstract


다중 modality를 이용한 진단은 바람직하나 Modality laziness라는 challenge에 직면해 있음.


**Modality laziness?**

- imbalanced modality contribution
	- ex) AD 진단에서 PET가 sMRI와 같은 modality에 비해 높은 기여도 보이는 현상
- dominant modality 위주로 학습되며, 약한 modality는 잘 학습되지 않음
	- Multimodality 학습 후 단일 modality 이용해 inference 시 성능 저하 심함
	- modality 고유 feature 활용성 저하

**UniCross?**

- Modality laziness 해결 위한 학습 paradigm
- Metadata Weighted Contrastive Loss(MWCL) 설계
	- 환자의 metadata 활용해 개인별 cross-modal, intra-modal에서의 feature distance 보정


## Introduction


Introduction에서는 pMCI vs sMCI task와 multimodality 사용에 대한 significance와 최근 연구들에서 발생하는 modality laziness 해결 방법에 대한 논의가 이루어짐.


Mild Cognitive Impairment (MCI)는 AD의 전단계이며 36개월 내 AD로의 진행 여부에 따라 progressive MCI (pMCI)와 stable MCI (sMCI)로 분류.


pMCI 환자는 sMCI 환자보다 AD로 전환될 위험이 높기에 pMCI 환자의 식별은 조기 개입 및 치료에 필수적 _→ pMCI vs sMCI classification의 significance_


sMRI는 상세한 해부학적 정보를 제공해 structural 변화를 평가, PET은 cerebral glucose metabolism을 측정해 functional 변화를 탐지 _→ Multimodality 사용의 significance_


이러한 특성을 바탕으로 Multimodality를 사용하는 연구들이 활발히 이루어지고 있으나 modality laziness가 발생, 단일 modality의 불충분한 학습 초래.



## Method



### Overview


![](/assets/img/2025-11-13-unicross_balanced_multimodal_learning_for_alzheimers_disease_diagnosis_by_unimodal_separation_and_metadataguided_crossmodal_interaction/0.png)



#### Train


2 stage train

- `Encoder train` : modality 간 interaction 유지하며 uni-modal representation 학습에 초점
- `Fusion module train` 


#### Architecture

- `Patch embedding` 
	- 3D convolution → patch 분할
	- 3D patch embedding module
- `Image Encoder` : ViT-B
- `Meta Encoder` : Linear transform
- `Fusion Module` : Concatenate based


### Encoder Training



#### Uni-modal separation

- Encoder train 과정에서는 multimodal fusion 하지 않음
- 각 modality는 개별 classifier를 가지는 분리된 train path 가짐

uni-modal separation은 아래와 같은 train objective로 표현됨


$$
\mathcal{L}_{\text{uni}} = \sum_{i=1}^{N} \left[ \mathcal{H}(y_i, \phi_{\text{s}}(f_i^{\text{S}})) + \mathcal{H}(y_i, \phi_{\text{p}}(f_i^{\text{P}})) \right]
$$

- Modality : \mathcal{M} = \{sMRI,PET,metadata\}
- i 번째 sample의 representation : \{s\_i,p\_i,c\_i,y\_i\}
	- y\_i : binary disease label, \{0,1\}
- E\_s, E\_p : Encoders
- f^s\_i,f^p\_i : Feature (Encoder 출력)
- \phi\_s,\phi\_p : Classifiers

> **Head update?**
>
> - 각 separate head가 업데이트 될 때는 각 head 출력으로 계산된 CE loss 만 사용됨
>
> 	→ gradient update 과정에서 parameter와 관련 없는 term은 gradient가 0으로 계산되기 때문
{: .prompt-info }


_단일 path만을 사용하는 경우 modality 간의 heterogeneity로 인해 representation space에서의 discrepancy(불일치) 초래 가능_


_**→ shared classfier 제안**_


$$
\mathcal{L}_{\text{sp}} = \sum_{i=1}^{N} \left[ \mathcal{H}(y_i, \phi_{\text{sp}}(f_i^{\text{S}})) + \mathcal{H}(y_i, \phi_{\text{sp}}(f_i^{\text{P}})) \right]
$$

- 동일한 classifier를 통과, CE 계산 (weight shared)
- _이 경우 objective와 실제 head의 weight update에 쓰이는 loss는 같음_


#### MWCL


MWCL은 **Metadata Weighted Contrastive Learning**으로,_ metadata calibration을 통해 두 image modality의 feature space를 align하는 목적_으로 두가지 가정을 수반함.

1. 동일 category(disease label)을 갖는 sample들은 의미상 유사(semantically similar)
1. AD 증상은 본질적으로 인구 통계학적 특성과 관련됨 (demographic characteristic)

첫 번째 가정을 바탕으로 기존의 multimodal contrastive loss를 supervised contrastive learning으로 확장.

- Class label을 기준으로 positive/negative sample pair 정의

	_→ __동일한 disease label 가진 경우 positive 다른 경우 negative_


> **MMCL, MultiModal Contrastive Loss (Learning)**
>
> - 동일 sample의 서로 다른 modality를 positive pair
> - 다른 sample인 경우 negative
> - 동일 sample의 서로 다른 modality의 representation을 가까워지도록 align
{: .prompt-info }

두 번째 가정을 바탕으로 Metadata를 추가로 통합.

- 유사한 특성 가진 환자들을 feature space에서 근접하도록 align

결과적으로 MWCL은 아래와 같은 objective로 표현.


$$
\mathcal{L}_{\text{MWCL}} = -\frac{1}{4N} \sum_{v,v' \in \{s,p\}} \sum_{i=1}^N \sum_{j=1}^N w_{ij} \log \frac{\exp(f_i^v \cdot f_j^{v'} / \tau)}{\sum_{k=1}^N \exp(f_i^v \cdot f_k^{v'} / \tau)}
$$

- v,v^{'}  : modality type (sMRI, PET)
	- v와 v^{'}는 같을 수 있음 → 4가지 경우의 수 존재
	- s-s, s-p, p-s, p-p

	> **4N으로 나누는 이유?**
	>
	> - contrastive loss 계산 시 batch 내의 모든 sample에 대해 representation feature 계산(Encoder 통과) 후 저장
	>
	> 	→ 입력은 sMRI-PET pair로 입력되지만 각각 modality input에 대한 representation 모두 저장 후 contrastive 계산되므로 동일한 modality 끼리의 contrastive loss도 계산 가능.
	>
	> - 4가지 pair 계산을 정규화 하기 위함
	{: .prompt-info }
- \tau : temperature parameter, _비학습 (코드 구현 상에는 0.07로 고정되어 있음)_
- w\_{ij} : normalized adaptive weight, disease label과 sample air의 metadata에 의해 결정

	$$
	w_{ij} = \frac{\tilde{w}_{ij}}{\sum_{j=1}^{N} \tilde{w}_{ij}} \\
	\tilde{w}_{ij} = m_{ij} \cdot \psi(f_i^c, f_j^c) \quad \text{with} \quad m_{ij} = \begin{cases} 1, & \text{if } y_i = y_j \\ 0, & \text{otherwise} \end{cases}
	$$

	- \tilde{w}\_{ij} : normalize 이전의 weight
	- m\_{ij} : binary mask, 두 sample의 label이 다른 경우 masking
	- \psi : cosine similarity

> **Over-densification Problem in MWCL?**
>
> - class label을 기준으로 pair를 나누기 때문에 **동일 label끼리 과밀**해지는 문제 발생 가능
> - 각 sample(individual)의 고유 특성 무시될 수 있음
>
> **Solution**
>
> _1.  metadata 기반의 weight를 통해 조절_
>
> - metadata representation 간의 cosine similarity 측정
> - metadata를 각 sample의 고유 특성으로 보고 유사할 경우 더 가깝게 align
>
> _2. __\tau__ 값 이용한 조절_
{: .prompt-warning }



#### Final Objective


$$
\mathcal{L} = \mathcal{L}_{\text{uni}} + \mathcal{L}_{\text{sp}} + \mathcal{L}_{\text{MWCL}}
$$



### Fine-tuning


Fine-tuning 단계에서는 encoder를 frozen 후 modality fusion 후 FC layer 통과해 predict



### Implementation Details

- Encoder 학습 단계에서 Warm restarts strategy 사용한 Cosine annealing
- 40 epoch encoder 학습, 10 epoch fine-tuning
undefined

## Experiments and Results



### Data Description and Experimental Settings

- `ADNI dataset` : 1,044 sample
	- AD/NC/pMCI/sMCI : 284/385/183/192
- sMRI preprocessing
	- Colin27 template 정렬
	- 128x128x128 size resample with 1x1x1 mm^3 resolution
- Data augmentation on trainset : 3D rotation ,random zoom, random shift
- `Metadata` : age, gender, years of education
	- `age, years of education` : continuous variables
	- `gender` : one-hot encode
- 5-fold cross-validation
- _sMCI vs pMCI 실험의 경우 AD vs NC task로 학습된 weight로 초기화 후 학습 진행_


### Results



#### Comparison with SoTA methods


![](/assets/img/2025-11-13-unicross_balanced_multimodal_learning_for_alzheimers_disease_diagnosis_by_unimodal_separation_and_metadataguided_crossmodal_interaction/1.png)



#### Ablation

1. Contrastive learning methods

![](/assets/img/2025-11-13-unicross_balanced_multimodal_learning_for_alzheimers_disease_diagnosis_by_unimodal_separation_and_metadataguided_crossmodal_interaction/2.png)

1. Fusion methods

![](/assets/img/2025-11-13-unicross_balanced_multimodal_learning_for_alzheimers_disease_diagnosis_by_unimodal_separation_and_metadataguided_crossmodal_interaction/3.png)
