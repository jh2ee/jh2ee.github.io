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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNZM5SAU%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T094128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICursC0qEh3Z7J141wBeTfzY4RSzQBm7pv5v1KqXBK8lAiEAyVDr0EyTMBU%2FXzHN2yKHg%2BMJUo7mE1Hl36R%2Bm0XXdHIqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKynfQDH6JgHvu8W0CrcAy7Et7kgQBosWDT%2BbAMMhe0hrR4KKRmx5hlHO%2BBTfJ27i0ObytK%2F0lXTJYmg4ACcpQIcQ8KwWu9EuvKD5pZTv1vqu7mFcZ%2BmM8dyLbR2lhP26Qhg3pWFb1nG0tvCnrygDMFMP2UC2Y%2F6WqlLUKEf2HvqvGQ91OF8BcSyZk7OdOvtiGh%2Fvk4in1o9FkjLx1FgdaVzbAusQ4mZ7MK%2F9LWGim32E6KOBomvUQSK%2Bkk7knaYjK8SElpT%2ByY3m76NbP3xwQ0RG25ez8f9Wv%2B26YVGfLbrS28EhTHd52zXdCfM8E%2Bis3dvdgyeBYb9B%2FqRjQZ9RqSuABxj2U53Jw%2B5SJlgjYKqBI7a5Uw11c34tX%2FclkInDC%2Bo%2Fhy6x%2FOlILN4%2BiXD5LITdmRSYftWKtLlEMK6z1AdwVX9dZbWSyxNwl0cS8PqNgdCMSuns6b7WJ5sYiJkk1ht8oByHo%2FhSL4hcxvAhYIQkAy0kWcqi0hsWkuv9SI0jAXAUrkMClfAqxSBiMBVKr7Wvmm1Wy85YfQ%2BnsZJMBAjUUxopgdNEBu3PEHmWspakuEbEgf8Srufh05f%2F%2BF2AB%2FDdaGCNouTfT%2Bm83V3Q4USxTsB52a%2B7mBcNMdYkrAX4ItFm6ehbJTVZPKYMLSqic4GOqUBhO6PZqD62p1nYxh%2BYniG%2B9VB2KhEM45yGskcln2Yip1QlY5aE%2Bmz5xVNxiTa1ekG%2Bn0DGWwvi%2FYE6HjeKqU5Y4H%2Fne68sUFNuyoyH3yaEWyYnJ5Hh25Gy4fwNnHZG5si1XkXBNejVRxEU34bM2I4Z6h1WCopMUDzlhJuJsKB7pOElfnndX6yXy%2F4VyEv5w%2BXvfHPnDljp0tj2jLz9EE3luGQOf6S&X-Amz-Signature=d432c45e9a4d1f468c5f7f5559d1547eb110e8936c524c2b1f8b38105ada61b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNZM5SAU%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T094128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICursC0qEh3Z7J141wBeTfzY4RSzQBm7pv5v1KqXBK8lAiEAyVDr0EyTMBU%2FXzHN2yKHg%2BMJUo7mE1Hl36R%2Bm0XXdHIqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKynfQDH6JgHvu8W0CrcAy7Et7kgQBosWDT%2BbAMMhe0hrR4KKRmx5hlHO%2BBTfJ27i0ObytK%2F0lXTJYmg4ACcpQIcQ8KwWu9EuvKD5pZTv1vqu7mFcZ%2BmM8dyLbR2lhP26Qhg3pWFb1nG0tvCnrygDMFMP2UC2Y%2F6WqlLUKEf2HvqvGQ91OF8BcSyZk7OdOvtiGh%2Fvk4in1o9FkjLx1FgdaVzbAusQ4mZ7MK%2F9LWGim32E6KOBomvUQSK%2Bkk7knaYjK8SElpT%2ByY3m76NbP3xwQ0RG25ez8f9Wv%2B26YVGfLbrS28EhTHd52zXdCfM8E%2Bis3dvdgyeBYb9B%2FqRjQZ9RqSuABxj2U53Jw%2B5SJlgjYKqBI7a5Uw11c34tX%2FclkInDC%2Bo%2Fhy6x%2FOlILN4%2BiXD5LITdmRSYftWKtLlEMK6z1AdwVX9dZbWSyxNwl0cS8PqNgdCMSuns6b7WJ5sYiJkk1ht8oByHo%2FhSL4hcxvAhYIQkAy0kWcqi0hsWkuv9SI0jAXAUrkMClfAqxSBiMBVKr7Wvmm1Wy85YfQ%2BnsZJMBAjUUxopgdNEBu3PEHmWspakuEbEgf8Srufh05f%2F%2BF2AB%2FDdaGCNouTfT%2Bm83V3Q4USxTsB52a%2B7mBcNMdYkrAX4ItFm6ehbJTVZPKYMLSqic4GOqUBhO6PZqD62p1nYxh%2BYniG%2B9VB2KhEM45yGskcln2Yip1QlY5aE%2Bmz5xVNxiTa1ekG%2Bn0DGWwvi%2FYE6HjeKqU5Y4H%2Fne68sUFNuyoyH3yaEWyYnJ5Hh25Gy4fwNnHZG5si1XkXBNejVRxEU34bM2I4Z6h1WCopMUDzlhJuJsKB7pOElfnndX6yXy%2F4VyEv5w%2BXvfHPnDljp0tj2jLz9EE3luGQOf6S&X-Amz-Signature=d432c45e9a4d1f468c5f7f5559d1547eb110e8936c524c2b1f8b38105ada61b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7ZEZWSK%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T094128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCbqwuvxYB4wXXO3Yh%2F2MjTKk2qscOsoibukIM4URgqEAIgPgZI6m%2Bv%2FIe9wL5gIWZpnwxdaNxeg%2FGe3ZKH1%2B3eAf4qiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGkh5YjGPcU0SUg70ircAwDZFLrRTJS7bZj6Lacot6guPbX%2BqULNCnEPdFHD%2BsPbY5vS727q6oQHuURKR1V2iVty%2FXEO2mzN5vTNi%2BIbYe5TPQWb12r%2FbpqUlQ99B3sATZGbio9aqz7Twpn94vTToFiJ5cMtG%2FeHm2kQMGG5BabAxQiAG61zssRWFYB0bSHPmMJCK%2BVJpsZ1hC4UYxamL6QU0cejRlTa6VIhStChdu8hvLwRfY2jPofuvzLNY9YGahVzs01SMJORgHd%2BkpEJ%2B113FuEhj%2FPenwiETbGwZua8yPo3XGu0aqUP5N5hCoq2KHleZ4a20xJe9AjaZ168e5wvrryO6h1wFwjv1WOeNhpB2u%2FyoT5%2F9%2Bt1mhPOSvVAScjXo8NfTGU51pNbcufZ5WS2%2FVPu%2B2l%2BcsPHDMzostE2nVip7ll5y9GdqZwUghhvGLR37NmRuXWbMOdP3mYQ%2Fov%2FDY2sKbHlsmzj8CUH1btcDcRreB7WJX79oY0ir0kPT4PaRsqcd0OLIv9IASnk4259iJqKJfxoJ8Dl%2FFAMl3Sw3RYmaaaUx7AIWO5QbbdRFvvv3anj5fzf2Zk1wWUMa%2BlS5YJwXPdAeeasJy9IrRV02lJ5zLNNsV1DM%2Bb8W%2FaZ0knN75h0Lc7Kvj%2FbMLusic4GOqUBP2sCVD1EEuzaSSeD0na%2FWAyK%2Bp%2Bv%2BQCXbmMGBA5cBNoE63D6pU0Ma%2FCXLDvQ%2FBRac4ObiEzkCVaYScU0d90utSc7bilQtpWsUHVMsuTtTfSibdhugAbhE%2Ftr5zF9Yyc20Y8UgZkhWBRTPD%2FhCTace463yI59WtjjOEKFjjed1rGMZC9JPDWnTGCEe0B4mtCB4h2VLTW%2BhkTtlaJhxNre6%2FjYl0cY&X-Amz-Signature=ec9c97b0fe61acdd9f6adf826280a88aecf233b644d142f96d1387bb4d923ec5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6OKUHN2%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T094134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCwCOznQ0ILyy2%2B3fmOkkyXFOSVQV846ma9MxTlC8XXKAIhAInn35doYQNaxsaVCvIkxX8Cd2BImNZlaOHUT7pkpFbpKogECJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyHg2x3ypXo54wTRsUq3ANvs77eK%2FTAwN3p5GIZE3mg%2BUwyNKqGnysrDBy42S%2BRk4LqchmS1NzWsJDsKnVjdKvkdjBqxcl0NgIyFzG3X4xDpB3CVlhtRsh3uVy3zVPy7cvsJPwCeqYuiyFZSIpStyVIMROs962AygTYc0SDE9DObSJhtX%2BfhAwOftKTEmJgZR7UshTPosTC%2Fz3odhF6OvrpIRAlT%2F0AuH78ShRWsqZDAm3dhvSNACmCY2KFuYx00RkhwJiqNCS3gD85iok4p31GQYbF87moTHFQI0gmWRjZVmg0W8YSNzUuhRocO%2FNI9Ta4CaT9b4HNQPuqTA9hhRL6uPgL7wg1ZR2Y88NA%2BT%2FiprAf2b7qCaWxzadnfU00wOZ3r9PJn1D8xvPqSYibZuZEODAcPUT9Q2JXCvDi6J9IDs%2BAxmZSGxdIpK3jGv3T4apGTi9Tt4aM%2BivlBIqnS%2B95Z7dnySIDj6n6FjPzyFvfpl37Dj71miSMKDJilISElP39kQjgYm7fw7SIFUYUcirB8h6TlUkT%2Bl0rHi2GyoU3RARKWnX0YAwm4QGtW9i28jQaiu%2FwRpTGDfQ3sTHVOQj%2BTFhGXlqd6i1tthC8pdRJggcUN1EQofefPjAte2urafYqEnWZbvsRBx1%2BMzCNq4nOBjqkAVS77EsolMU0sw%2F%2FOr4ca4o5b3wKnKqZqpCVJiqa1hcCBN4FVBi6UydUYcshMYDiQHXRPHbAQNptTAoOvrXC94sPpFMxg1C8I%2FZ2osfNs3PQTOI78HnHSKxC2w52PSew4xrT0eAmcr45o%2BDPhon9oJtYwNXeSxjXrSl2HgreIvSlBKNFcFgMHSQGMsv%2Bi0Hp3vbkXa0SMKnuLuiYu2HUzaxQGuT7&X-Amz-Signature=44346fbf9ebe957dcdc77368930db5c45d94f4081694dfc7b951214a42b414cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6OKUHN2%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T094134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCwCOznQ0ILyy2%2B3fmOkkyXFOSVQV846ma9MxTlC8XXKAIhAInn35doYQNaxsaVCvIkxX8Cd2BImNZlaOHUT7pkpFbpKogECJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyHg2x3ypXo54wTRsUq3ANvs77eK%2FTAwN3p5GIZE3mg%2BUwyNKqGnysrDBy42S%2BRk4LqchmS1NzWsJDsKnVjdKvkdjBqxcl0NgIyFzG3X4xDpB3CVlhtRsh3uVy3zVPy7cvsJPwCeqYuiyFZSIpStyVIMROs962AygTYc0SDE9DObSJhtX%2BfhAwOftKTEmJgZR7UshTPosTC%2Fz3odhF6OvrpIRAlT%2F0AuH78ShRWsqZDAm3dhvSNACmCY2KFuYx00RkhwJiqNCS3gD85iok4p31GQYbF87moTHFQI0gmWRjZVmg0W8YSNzUuhRocO%2FNI9Ta4CaT9b4HNQPuqTA9hhRL6uPgL7wg1ZR2Y88NA%2BT%2FiprAf2b7qCaWxzadnfU00wOZ3r9PJn1D8xvPqSYibZuZEODAcPUT9Q2JXCvDi6J9IDs%2BAxmZSGxdIpK3jGv3T4apGTi9Tt4aM%2BivlBIqnS%2B95Z7dnySIDj6n6FjPzyFvfpl37Dj71miSMKDJilISElP39kQjgYm7fw7SIFUYUcirB8h6TlUkT%2Bl0rHi2GyoU3RARKWnX0YAwm4QGtW9i28jQaiu%2FwRpTGDfQ3sTHVOQj%2BTFhGXlqd6i1tthC8pdRJggcUN1EQofefPjAte2urafYqEnWZbvsRBx1%2BMzCNq4nOBjqkAVS77EsolMU0sw%2F%2FOr4ca4o5b3wKnKqZqpCVJiqa1hcCBN4FVBi6UydUYcshMYDiQHXRPHbAQNptTAoOvrXC94sPpFMxg1C8I%2FZ2osfNs3PQTOI78HnHSKxC2w52PSew4xrT0eAmcr45o%2BDPhon9oJtYwNXeSxjXrSl2HgreIvSlBKNFcFgMHSQGMsv%2Bi0Hp3vbkXa0SMKnuLuiYu2HUzaxQGuT7&X-Amz-Signature=6123fce23256ad9ac88878694a770a2d2e04c8cf7072be6483d3807e67d0fbdc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLWFLWPD%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T094134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD7hyLmDBugjxAVAisbmCunaYoPxgBVMA1vqcDFdfbg1wIgCnY9gvyE6%2FjNWCot%2FBMP1ZkMkwDNF11TzVtgVx4kC0QqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHqxZwQvqAYXWhmB8ircA80kwJ0udFvEjrTVsP%2BYWeMj1ExgOWapRB2BlhV%2B48PnDQ%2FM8F8sCQxmaMJkf7IwA8b1%2BL7wzUIpedxUJ7xEsnt%2FUVFpm50VVmu18TJMmFmN%2F9gMvElCafiUL3I5ITJpdo13P9ySd8TR7UTB15Tt5qhNIvjrGKbRRuppl%2B71pfguUV1npU9Xi8tjarqGjviIcTUD8zxlcNzIXtH24aGiuG8lZmlYxyiCkDqp8Q9zVksc%2By71HTOjHtcc4oe74kXQZ1e8Y8glNVYZRPs3lOtTgDvmKu9FdzeNgTJoWKFNJPx6alnLvJAeAfa9H4McHZMfTcP30v3e56r4xzxwF0n%2BybBzX4E%2FTYN51W8IgvpVz6lnK6wx2WIBl%2Bqw3GOK%2Fv0cwQuOTdtdZXIqhx%2FIt42ZmS4C47egAkTVRd1I2W6XjJQgZ1M8AezAUyRacyBKPSyKvg%2FJqfpI8XxcZCTUjzXvpc9ua7FZLnlSq8jsnz0obQWG4RumYGCuxF1W%2FsZv7i3zhn2BNMzPOyrImsU43n91wrLBX1y%2FD3NEcLZ0SCpD07yjF1vddVHKgcbL27W4SalikXgae%2FZos%2Fip85EpmtUdg7mUvULJp5dNFz7gavTcFCW7IrTmmFmtME0jLl4oMIusic4GOqUBlWsa67vd7JIpYpandF6cWsluBcl2MrRv7MXRddRPv2t1adSeafy%2B3pPJwv6wmHEcMaJzCIxCKdVc6UbwirQJcmKksOL2uOe8CB8NxaYYd2imTGse11LPXfHIAWbVWi0vLf3QHu0uKkxk8rsCnzmonxgYC1LD%2BR5e1j2LjLLYrFC25uvYS8AJYX%2FPSnbNuzmR4OVWqRJ0m1T6i1MrJpgrtT7zg8zU&X-Amz-Signature=4ea688c9838764cf294ec7aaa7e39acdbfef7ea4bd8b5aa02126b9421129f38a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665WTRA4Y%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T094134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBuOeMdQlPPxdVp5FQkHtbcyhImG7X3qViGpHSSG2KgtAiEA1w8b4Trp%2FjFYlkXTcibkFz5CdMku%2FSVJtIstdcjTzrcqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIMYrMB%2BkDyPlWe1dSrcA%2FI6F8qn2eubBhQERD13ctHDmKmFXTmJARZJP0W8WNf9t8UeGq3VhmaxihzffiZfl3llmBSBEhWuosODDQvgJldkGVCOhT9udxN1kdcmdq1OOZc7l0wfaKzRKOtIKrctl2Dx0I5nMxLaL4kbY37ybLrSttbs66DQ8Uy6rwW61FDtWUoa59eIb45LKLm%2BvIBbjoraJNGJDFE6gLXYOVL1OXwmL4GNgDXcKRk1suW39S5rN9Q3rfXZIfK0bkfmKtFcyGtZHMckj7AaZ0VpC4QZtHot9PnI%2BjtA5d73G85h79MQDLNOC%2FVyXk0XaUvOI6FZYF2wvsNzOjU744btWxiXLnjtZd9pvIc0C9x%2BnKqwaHoecgmC3H11gOngHUTdni%2Fu8dxRjG%2FlCnZwOa7AjUcPCiekvzovy7qx0aPX%2FkEefFqFKjzOwqCkVg89zFfgAC5E5MutiXdw2onsQRv2RgFCDZCGtG96hct%2Fk%2FkAoGBHrXewZwAniKiO23vem35jNo3tJmYmE3jo%2B%2BOxAzBtnGDzpMQQ1SUS%2FBveBcwCP5g96LKlENgieKS7QD98VXNTc2PUdSvdvng6rc3FQ0n4ZBZHpBD%2B4un41G%2F89MgZp0Nd7MFr7uKVALyJju%2F9nJW1MIusic4GOqUBsoXKzSmXn0H49zjNGaGwPCT3%2F4K7%2F97hAsd0I%2FAyDwwpFWk7p%2BMzzBZBxOOSUBo1hExWPY5gbsA%2BUqfFOhnmnXEo%2FOYAz0cEI0mWQO4jNhHxJ3B6%2FzNU4LxlDWx6i%2FcvZs7%2B3ejTuHShnnOlJEgIywOgkFenTXEx6bg%2F8%2FhZgrrGg2GdcAebkqs4BIl2q8VRru1i25clMAPWmRjZKFr9BPQOdX91&X-Amz-Signature=fcaa3f6987c3c73a2ec5389ffd586fdba90a3b92bbcb4c58e5ca184f0996689a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662E2LRNU%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T094136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2FbvO59IC214rEPN9P48M3eOsiP7dpn1z2yQe2lVPe4wIgFWX6maAtXk1kdVi%2F1VKMkb%2Fch9zSZX3%2FTzV%2FPIzI5SsqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCBqlES0ivWZ5aUymCrcA8rJgDjrhtIjk9SG55XGeem4TNk%2B4Oy%2Bk1%2BpemB4lPxioPNQHSt7Coq0bqSiU5m3adB5RAlnbRk15qsSsae4ah6quI7tRxB9yPejpzSNDpcjxectMvFM4DoHFeUSQ3XW3wy65TPwWBN5npOKQ2M1x5hP7Kf3lLzTuupSC%2F2sj0BgneVS%2B8itw9BIY%2FVsaY%2FKbZnfEw7Y6fS9eLutcFLzViTz0Xq5mbnpTpw3%2BtqniucWSaaRji4J6AEUswh%2BqJz6j4DwNDwwnIb%2FAdHy02jwm35Utg6jTIzdnqGbehh3fqn6haSby27iYyoGF33jfPbo9vBw7LFMnuRtfC2ckdn7TPirSq3ekhSBu66ky5v75Fgyj376UKXMaaNqoC9qa62IjXcCQn948cjVLPGhudh%2FHtv8m3oC0aQ%2FYyDJMmpq74gD0Xv7NhU2iKC8gIQaj%2F2BXsQHMhCvma7BOlXAe58wM9u303%2BOGClo9y1NMuKGZrl1tBha%2Btl%2Bwk%2BPdJDIvy%2Bx3ljXswJEIrkR3j5meIb0Skti7dvSFWxGsLbSvd8rU%2FBsjN3MAUk1iIqWxgfv0Nz0D4VJnoAXfztn%2FZt10rxbfLX6g6TTWRyxVAEi%2FH9OKGTtQCUTvWFCOg25iA%2FwMM2sic4GOqUBxhwMUBWPlM0yRp0TPJ8NYyFrYn24W0xNg9%2B62oNbifPGofkTru2Rl1Uw%2BhA8oDK3KnP9eYos7R2Y%2FGQf%2BIInkeY2AVsUyZ246lrrtWJWv6%2FPA64gwoqLTnSYGH1T5WST7m%2F4XuS%2BZlLs3j8UBt1EuHKIVizZGlElOiNZZ0GVCoD8m2UgOC2poj%2F0S9eL99kd2FPWpkCLGvuf1idwKU3oV0n01gP5&X-Amz-Signature=c7be36d670f638b24c192361df32256ebf71c6db83c05ddfd944dee2b63ee99c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHV6D63B%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T094139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCfvLBFZ8A3Zvc8CfyEo4kwb6%2B3KHio1u5fIOZwKE66DwIhAMCee%2B9D0x6QGdwez4%2F0CvgB0b1FeOdxTnDn8JT435vpKogECJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzoSCXUsIUvMPjT%2F2Iq3APqUdiOHHW4e9Us9krKfHpUWv%2B1V%2BwvbZaeG25Px7UMDMA8%2F0rOTXhJOkrmQpjjkea4ipA4XwpeHdueMAYEiKPvTpwPiD0xrLS5LI95fPGNemgvRV%2BH56qvz8qb20Mu%2BkXZpEerEKOk3GqtD5GD69UaNf1Js5W2UzcGFy0owFgucfgPTnCh3ZTDz2cPXJcirMcvVXWc4gD3svVyvfJJL2Iy%2BNswwjVzNb76cJE%2FRVO0G8Oczm4EZLzfp2AHHjhfrhzva%2BuJuak4Pvu9UIijvTdeDtFKli8dL6Shk8PZvhZ49FdQeySMdAr2fcHaJBl74Yu2KQXQfYOudPL9hsIoUctd8Cp%2Ff6cOk%2BlCbbt6HhCpefUEVWfjdbhxM0q3nvCh3QRXfxOBDsJgz4urYVpG2yxdHdmbRMEvqYvNu5nqhytKbvdaYBMZ8fNrKsr8wirpt7VGl16ptbgC5sC9GAx0tTqo9gepR7dAzUpuBmpQwAvp21JXD6g8y%2BOqKTJfbEe9PzbYXaLZj4HCoW%2FrapQ5e4yytsPVtYBzgUtPpesXALGGygbcHYuviM6bAC5ndJUlHp9ox%2B1vAf4FYlpfWNhuTIBxeC4pGcLOFC3ecfZew9u74YQimJbX7jLie0GrbTCPq4nOBjqkAfE1S6jHqBRVFGPav2b4X9IbfTAXnRIyh59uxvAngSBXJ3s1tgEc7%2F3q%2FK9X0Xt6VTOagPaZ7DgXU2JVRU1Mg9StSPkTaLe%2B8p1ybkEoevJuyFU0kGZ3kk6uOFpGVvveeuRUQtBP56c%2BXHND4%2FmS5dYtb6yMW76FXGk4sHhrXKKm1sZVfv77x16GfFLV9A%2BDe9SM%2FHo%2FShG2UB6Gr84FtXlSKUri&X-Amz-Signature=ca38e9460e97912d9f3562c447bbe550b5514c271dbb58b29b5552e022fe953e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHV6D63B%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T094139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCfvLBFZ8A3Zvc8CfyEo4kwb6%2B3KHio1u5fIOZwKE66DwIhAMCee%2B9D0x6QGdwez4%2F0CvgB0b1FeOdxTnDn8JT435vpKogECJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzoSCXUsIUvMPjT%2F2Iq3APqUdiOHHW4e9Us9krKfHpUWv%2B1V%2BwvbZaeG25Px7UMDMA8%2F0rOTXhJOkrmQpjjkea4ipA4XwpeHdueMAYEiKPvTpwPiD0xrLS5LI95fPGNemgvRV%2BH56qvz8qb20Mu%2BkXZpEerEKOk3GqtD5GD69UaNf1Js5W2UzcGFy0owFgucfgPTnCh3ZTDz2cPXJcirMcvVXWc4gD3svVyvfJJL2Iy%2BNswwjVzNb76cJE%2FRVO0G8Oczm4EZLzfp2AHHjhfrhzva%2BuJuak4Pvu9UIijvTdeDtFKli8dL6Shk8PZvhZ49FdQeySMdAr2fcHaJBl74Yu2KQXQfYOudPL9hsIoUctd8Cp%2Ff6cOk%2BlCbbt6HhCpefUEVWfjdbhxM0q3nvCh3QRXfxOBDsJgz4urYVpG2yxdHdmbRMEvqYvNu5nqhytKbvdaYBMZ8fNrKsr8wirpt7VGl16ptbgC5sC9GAx0tTqo9gepR7dAzUpuBmpQwAvp21JXD6g8y%2BOqKTJfbEe9PzbYXaLZj4HCoW%2FrapQ5e4yytsPVtYBzgUtPpesXALGGygbcHYuviM6bAC5ndJUlHp9ox%2B1vAf4FYlpfWNhuTIBxeC4pGcLOFC3ecfZew9u74YQimJbX7jLie0GrbTCPq4nOBjqkAfE1S6jHqBRVFGPav2b4X9IbfTAXnRIyh59uxvAngSBXJ3s1tgEc7%2F3q%2FK9X0Xt6VTOagPaZ7DgXU2JVRU1Mg9StSPkTaLe%2B8p1ybkEoevJuyFU0kGZ3kk6uOFpGVvveeuRUQtBP56c%2BXHND4%2FmS5dYtb6yMW76FXGk4sHhrXKKm1sZVfv77x16GfFLV9A%2BDe9SM%2FHo%2FShG2UB6Gr84FtXlSKUri&X-Amz-Signature=f438703f869cbe2f239e421f424bdf79931fbd3b7749a3666aba83a531395f32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AZM3MNX%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T094126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDb%2FMUg%2FEJV%2F8btwCFCLrTjTkECi6lu4vxUA8xHv9AJcwIhAKGf3oz9QkSLa%2FJsuAKvdVDXI0N%2BOoTqewmKZiWHrA9GKogECJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzSYcdRxC6L8rwDDLYq3AP4rTYlMHvbZeCQe%2Ft4Jfj4sr8OptZNRE0S1I0ku%2FhXEEpQ5VM8CHe%2BrcGPsovWqHsxr%2FR1i8Bt6jFvWFLllIrY7LwYr%2BF5I7vG8E96WWc%2F6uFUv41NxqXb7UauGRqQmuvJRlnsgBeN9i3tIYDTfpU5GKbyDmpY7HDJuNm838wq8VcbS1190hXiqUHPdw0k4H3%2BikIXDDEmH8GrWxxJRUKIfpNokrZLB8cB%2BLs4B3UO8xe0ZWbpAxUyjJrugVeWQfmXmmbw1ZcFyvUbUecA5LpP8xsf1BScVN5NJB3LPr127JssWH34FaseMrVXDN9gbSjfGM8Qgjs2kAGIWMZEf6N3oMnP1x1zOpMN%2Buuq1ZR2jtBtbKuexAXCh4YxxiTKgU5E0jn1iku%2FKcTpn2zr6uOvk8%2Fx1qErapFZyOOGCELsSHKqyFWS2FZTmzuTuH3xnRaaF1GdC92NJsPWh5THcsqreRsedstLBPmE%2FUnbFTf9XAR%2Bc%2BS5ONFDm0S7Ro1knTpQDIM%2FvNOB8B%2FXsheUevhoRZj%2BTw4%2BgCtqjA0ldkusk2MecbKoXx2QZgqIgZVbyRyCqcB9cL6snN3spvT9VvwoqYYRa1U1VMCNMm%2FIuy2jEaYDt%2Fyjpg6JEbqHoTC2qonOBjqkAUErV4OqViIrf2zIkVYXiEVZwRqrpXGDg2ildICdnAZHSH%2BGNyHABX%2BYeIzHeQmtjmgJXTbRbFNcKDEG4Z2Rc9W96WFtIJMAhC0eOiRx3%2FVcASS7%2B242wYDOdS3LfdqgFYlKHghDSaMnA39rR1UDzswhBkqyTVru2X2aSesP7GKn7fvgu7PPaxF69s%2BV5WAGPM%2FzTjDUNWc8k%2FmR%2FOucPb3BK3Fv&X-Amz-Signature=4ecf6eb43fb55cc09755e027ecfcdf67e4e15c02cfe8503d44c8c8c031f3425b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIQP2NLL%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T094141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDYVMn386uAl25KcGjPdN%2Fi%2BN0FnnfU23lGSDeXLyPdBAiEA5Sk5hzyuHqlgIn2b4bX93ixVlfEPQgVSSN6dv93yxzcqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPah87%2FGHqXimgEpcSrcA1mdses6%2BLi5ON1tFOyqqwnjCUvrlGcZjM0YmmKcMqbU3Aysmn%2B62ntIGFv1GCWb1M6gLT7OQKEpx9t43J1wUnX7vDIPDiED7hTqrU%2Bjsw4asiwVY8dHkCKgDegvJuuN%2BtL7h04DwHBZ6%2BUoVzGZbFnJl%2BLSP82QPDjbHqlvWnhB%2FmZMGeZMMMasa%2BduLQuVdiE%2BjS7cGZvcGoV%2F%2F3hUQJzZOGLTmVfw338r%2FLzXRkUIE54Hy4TkVXH3m2cOY6vUN1eKS8OYmiqXV7FK%2B4UssdI7GxbstKkTsTpzvmZzq5w5k9lahQ%2B8DbrxRmwNPTngHvZsCuAEESj60Hi2Dc0qaMTtMSc%2BuVZperLEZaL9%2F4dzZubY0FN2q6S01bPq0qlpRaBqXgrZk6WTZA7tQ5l%2FXr6VancGvQ%2Fr%2FUtd3eTNNA3nC72iM9KgepJH8DBhfI%2FF6%2FLQ8B40cQGFF%2FzmfgLTBTP0a7KI%2BCT69LJR0eHXEr3BC5CoWqE%2BZ%2Ben1q7Z2c1RhvMSuyNpksS8OixOYftwk2ShfM9DS9DMr3uRu5ZbSJ8FdpoOrml4QgDkOQ1tlkDozV5hb%2FkjVu8wnLAl3pMsl6j5szRCAuEL%2B6xOmeaj9lWU19cn7sK5piYAMZ9gMOmqic4GOqUBTPxW4zL15Z8TDmfiX3GFE2%2FvPsVV6Bg4kvWuvlyvQOcGQFPupmy5uLejqayLw13jUQ0hOaJh02rNRk3pLBaxc%2F9MEXTZNoZdOUsNtyKfjdp3STWKGMmAJ2dl1nqTk4ncU2AP8bp8UNzC6%2FqZ9IUGDkRg%2FXbB9YRaQufbRoxqKwahOsjZDMs3FkopB2Ew7se7FtoKqisOb0WelENmGsos9VslqOOw&X-Amz-Signature=61a82fd7eabf5e0eb7fc94e1b61e0ade86c6389eb47f6e3e00e362abcf86ec11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIQP2NLL%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T094141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDYVMn386uAl25KcGjPdN%2Fi%2BN0FnnfU23lGSDeXLyPdBAiEA5Sk5hzyuHqlgIn2b4bX93ixVlfEPQgVSSN6dv93yxzcqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPah87%2FGHqXimgEpcSrcA1mdses6%2BLi5ON1tFOyqqwnjCUvrlGcZjM0YmmKcMqbU3Aysmn%2B62ntIGFv1GCWb1M6gLT7OQKEpx9t43J1wUnX7vDIPDiED7hTqrU%2Bjsw4asiwVY8dHkCKgDegvJuuN%2BtL7h04DwHBZ6%2BUoVzGZbFnJl%2BLSP82QPDjbHqlvWnhB%2FmZMGeZMMMasa%2BduLQuVdiE%2BjS7cGZvcGoV%2F%2F3hUQJzZOGLTmVfw338r%2FLzXRkUIE54Hy4TkVXH3m2cOY6vUN1eKS8OYmiqXV7FK%2B4UssdI7GxbstKkTsTpzvmZzq5w5k9lahQ%2B8DbrxRmwNPTngHvZsCuAEESj60Hi2Dc0qaMTtMSc%2BuVZperLEZaL9%2F4dzZubY0FN2q6S01bPq0qlpRaBqXgrZk6WTZA7tQ5l%2FXr6VancGvQ%2Fr%2FUtd3eTNNA3nC72iM9KgepJH8DBhfI%2FF6%2FLQ8B40cQGFF%2FzmfgLTBTP0a7KI%2BCT69LJR0eHXEr3BC5CoWqE%2BZ%2Ben1q7Z2c1RhvMSuyNpksS8OixOYftwk2ShfM9DS9DMr3uRu5ZbSJ8FdpoOrml4QgDkOQ1tlkDozV5hb%2FkjVu8wnLAl3pMsl6j5szRCAuEL%2B6xOmeaj9lWU19cn7sK5piYAMZ9gMOmqic4GOqUBTPxW4zL15Z8TDmfiX3GFE2%2FvPsVV6Bg4kvWuvlyvQOcGQFPupmy5uLejqayLw13jUQ0hOaJh02rNRk3pLBaxc%2F9MEXTZNoZdOUsNtyKfjdp3STWKGMmAJ2dl1nqTk4ncU2AP8bp8UNzC6%2FqZ9IUGDkRg%2FXbB9YRaQufbRoxqKwahOsjZDMs3FkopB2Ew7se7FtoKqisOb0WelENmGsos9VslqOOw&X-Amz-Signature=61a82fd7eabf5e0eb7fc94e1b61e0ade86c6389eb47f6e3e00e362abcf86ec11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662E2LRNU%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T094141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2FbvO59IC214rEPN9P48M3eOsiP7dpn1z2yQe2lVPe4wIgFWX6maAtXk1kdVi%2F1VKMkb%2Fch9zSZX3%2FTzV%2FPIzI5SsqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCBqlES0ivWZ5aUymCrcA8rJgDjrhtIjk9SG55XGeem4TNk%2B4Oy%2Bk1%2BpemB4lPxioPNQHSt7Coq0bqSiU5m3adB5RAlnbRk15qsSsae4ah6quI7tRxB9yPejpzSNDpcjxectMvFM4DoHFeUSQ3XW3wy65TPwWBN5npOKQ2M1x5hP7Kf3lLzTuupSC%2F2sj0BgneVS%2B8itw9BIY%2FVsaY%2FKbZnfEw7Y6fS9eLutcFLzViTz0Xq5mbnpTpw3%2BtqniucWSaaRji4J6AEUswh%2BqJz6j4DwNDwwnIb%2FAdHy02jwm35Utg6jTIzdnqGbehh3fqn6haSby27iYyoGF33jfPbo9vBw7LFMnuRtfC2ckdn7TPirSq3ekhSBu66ky5v75Fgyj376UKXMaaNqoC9qa62IjXcCQn948cjVLPGhudh%2FHtv8m3oC0aQ%2FYyDJMmpq74gD0Xv7NhU2iKC8gIQaj%2F2BXsQHMhCvma7BOlXAe58wM9u303%2BOGClo9y1NMuKGZrl1tBha%2Btl%2Bwk%2BPdJDIvy%2Bx3ljXswJEIrkR3j5meIb0Skti7dvSFWxGsLbSvd8rU%2FBsjN3MAUk1iIqWxgfv0Nz0D4VJnoAXfztn%2FZt10rxbfLX6g6TTWRyxVAEi%2FH9OKGTtQCUTvWFCOg25iA%2FwMM2sic4GOqUBxhwMUBWPlM0yRp0TPJ8NYyFrYn24W0xNg9%2B62oNbifPGofkTru2Rl1Uw%2BhA8oDK3KnP9eYos7R2Y%2FGQf%2BIInkeY2AVsUyZ246lrrtWJWv6%2FPA64gwoqLTnSYGH1T5WST7m%2F4XuS%2BZlLs3j8UBt1EuHKIVizZGlElOiNZZ0GVCoD8m2UgOC2poj%2F0S9eL99kd2FPWpkCLGvuf1idwKU3oV0n01gP5&X-Amz-Signature=fad5d2885b0688c128a988a6310cd579312077b385d8c17268ff9a6138ef747c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

