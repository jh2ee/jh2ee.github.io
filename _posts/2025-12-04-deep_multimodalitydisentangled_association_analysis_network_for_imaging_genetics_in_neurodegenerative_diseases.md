---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
  - IDPs 추출의 경우 전처리 비용 높음
  - ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

  _**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
  - multi-genetic, multi-imaging
  - correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
  - `Multimodality-disentangled module`
    - multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
    - latent representation은 common과 specific으로 분리
    - self, cross attention 통해 유용한 정보 추출
  - `Association analysis module`
    - potential genetic representation 탐색
    - imaging data 와의 연관성 분석
  - `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](/assets/img/2025-12-04-deep_multimodalitydisentangled_association_analysis_network_for_imaging_genetics_in_neurodegenerative_diseases/0.png)


![](/assets/img/2025-12-04-deep_multimodalitydisentangled_association_analysis_network_for_imaging_genetics_in_neurodegenerative_diseases/1.png)



### Notation


![](/assets/img/2025-12-04-deep_multimodalitydisentangled_association_analysis_network_for_imaging_genetics_in_neurodegenerative_diseases/2.png)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
  - data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

    → prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

  - VAE, AAE 모두 distribution 일치하도록 허용 

    → AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

  - Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
  - Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
  - v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
  - _**Adversarial learning & Discriminator learning**_
  - representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
  - Discriminator는 MLP로 구성
  - multimodality에 대해 shared parameter 가짐
  - v\_i가 prior distribution 따르는지 판별

  ![](/assets/img/2025-12-04-deep_multimodalitydisentangled_association_analysis_network_for_imaging_genetics_in_neurodegenerative_diseases/3.png)


  ![](/assets/img/2025-12-04-deep_multimodalitydisentangled_association_analysis_network_for_imaging_genetics_in_neurodegenerative_diseases/4.png)

1. `Disentangle layer`
  - Adversarial learning 후 FC에 의해 common, specific representation으로 분리
  - Fully connected layer가 disentanglement 수행하는 layer
  - common representation과 specific representation 간 L-2 distance 멀어지도록 학습

  ![](/assets/img/2025-12-04-deep_multimodalitydisentangled_association_analysis_network_for_imaging_genetics_in_neurodegenerative_diseases/5.png)

1. `Decoder`
  - sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

  ![](/assets/img/2025-12-04-deep_multimodalitydisentangled_association_analysis_network_for_imaging_genetics_in_neurodegenerative_diseases/6.png)

  - modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

    → modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
  - prior distribution 내 제약된 genetic latent representation 생성
  - adversarial learning, gene representation reconstruction
- `Association network` 
  - genetic representation을 imaging representation에 mapping
    - 각 network는 imaging data의 common, specific representation과 각각 mapping

    > **Mapping?**
    >
    > imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)
    >
    >
    > _**→  image representation과 어떠한 연산을 하는 개념이 아님**_
    {: .prompt-warning }

    - imaging data와 genetic data의 association 분석

    ![](/assets/img/2025-12-04-deep_multimodalitydisentangled_association_analysis_network_for_imaging_genetics_in_neurodegenerative_diseases/7.png)

  - mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
  - mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
  - SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

  > **e.g. **
  >
  > trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때
  >
  >
  > → sample의 dosage 값이 1인 경우 0.7로 embedding
  {: .prompt-tip }

1. `Adversarial learning`
  - Multimodality-disentangled module과 같은 방법으로 adversarial learning
  - genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

  ![](/assets/img/2025-12-04-deep_multimodalitydisentangled_association_analysis_network_for_imaging_genetics_in_neurodegenerative_diseases/8.png)


  ![](/assets/img/2025-12-04-deep_multimodalitydisentangled_association_analysis_network_for_imaging_genetics_in_neurodegenerative_diseases/9.png)

1. `Association Network`
  - `Input` : latent representation + age, sex, education year
  - 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
  - diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](/assets/img/2025-12-04-deep_multimodalitydisentangled_association_analysis_network_for_imaging_genetics_in_neurodegenerative_diseases/10.png)

- T1 : 90개의 ROI에서 GM volume 계산
  - MNI template 적용
  - ANTs 이용
  - AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
  - T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
  - plink 후 screening


### Results


![](/assets/img/2025-12-04-deep_multimodalitydisentangled_association_analysis_network_for_imaging_genetics_in_neurodegenerative_diseases/11.png)


![](/assets/img/2025-12-04-deep_multimodalitydisentangled_association_analysis_network_for_imaging_genetics_in_neurodegenerative_diseases/12.png)


![](/assets/img/2025-12-04-deep_multimodalitydisentangled_association_analysis_network_for_imaging_genetics_in_neurodegenerative_diseases/13.png)

