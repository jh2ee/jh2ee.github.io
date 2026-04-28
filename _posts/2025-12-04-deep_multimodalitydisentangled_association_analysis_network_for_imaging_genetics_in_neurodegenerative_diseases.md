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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEUDIQW2%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T100827Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIC0sd%2FwQNgHlcz5wqO3HCfcScruOw99avr2WWW9h35gjAiApSjN5EgI%2B0myZCIjbZOiXDFwQfJjKYU3TyzMKi58HcCqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2B%2FF52sFZqeuvU1PJKtwDdIa%2FNQrVu%2BOJX7h8SOmMeCEQPdo3OBx7YfsozKidHg%2F1qys7J4w%2BEYlNJj%2F1%2Fym1%2FRHuGxWAx5RgO1EPqSXDdKsIXfMshUduC7ySQOlFhvmqQI5JWF0dq5A2r9X781o3%2BBHunG65BobBaPv9%2F8eopKZnH5D29MVHxsMasdNirLpAaU1ufY9aIY9A5vLR3gADT2OxLOEnZqs2zOh0MsG761HP2TPbHqbPyhp3DgIkJd2g78zfUGol%2BE%2FKQYgv6oAT4G0b7boymCthQnNrvBL5uXpLilJCwUcs5%2F4xsFOwQYXrTTQ9I%2BtwwEPkgiZDC7P977cy12eq860Y1TJji%2FndlACW8NKf0Pf3z00%2FdRZd43NhcXTMo3ZArqjPJ%2FHAlk%2BMqjrd9vlSxECTQzPSXYUz%2FvN%2FHnyJXzSu4UqPr%2FLjpVaojKnnFwr0le%2B%2FEGH7CMnpz2TLiSHbRxVgxmuARrLfPIXRzDKgIzrw%2FEZZRWSsU%2FE5DqSYa%2FrVHtP4HCIoHiIEKpCUsT%2Fk95XsSaDHYr2zPn0y5APYRJ1cdXaOFOmgvEC5PPV8DsQMATOdTEpYn2mX9UrrjbY7nK5cXbqdLQqRyObDcf3PvDLXfU%2FicIpcPAf4ZunOYGspMmppYK0w0v%2FBzwY6pgHGOO3BNJiIoHHD8lMaV1oCRTYCt%2BYq5SVotUXqS8n2iBRbdal97yFXeUxrUVhxdWKulJBjJtrrGD0YeUcq0joApGKLdEpI3wDdfmTS2CpomjW16D1js%2FEmbI6hhk%2F7KJD4Y3m9m9nziNrffdAaduDA%2B7r46OcYztIthw4xnLzXpemtTTBm7Et95JnduCrLSrbg0hoBUhN7tx0D3EGTnJkVypot9CNY&X-Amz-Signature=f781edbf58a148c8b6511e946f78dccf1a721b90d7909b253e2f6792e1409910&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEUDIQW2%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T100827Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIC0sd%2FwQNgHlcz5wqO3HCfcScruOw99avr2WWW9h35gjAiApSjN5EgI%2B0myZCIjbZOiXDFwQfJjKYU3TyzMKi58HcCqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2B%2FF52sFZqeuvU1PJKtwDdIa%2FNQrVu%2BOJX7h8SOmMeCEQPdo3OBx7YfsozKidHg%2F1qys7J4w%2BEYlNJj%2F1%2Fym1%2FRHuGxWAx5RgO1EPqSXDdKsIXfMshUduC7ySQOlFhvmqQI5JWF0dq5A2r9X781o3%2BBHunG65BobBaPv9%2F8eopKZnH5D29MVHxsMasdNirLpAaU1ufY9aIY9A5vLR3gADT2OxLOEnZqs2zOh0MsG761HP2TPbHqbPyhp3DgIkJd2g78zfUGol%2BE%2FKQYgv6oAT4G0b7boymCthQnNrvBL5uXpLilJCwUcs5%2F4xsFOwQYXrTTQ9I%2BtwwEPkgiZDC7P977cy12eq860Y1TJji%2FndlACW8NKf0Pf3z00%2FdRZd43NhcXTMo3ZArqjPJ%2FHAlk%2BMqjrd9vlSxECTQzPSXYUz%2FvN%2FHnyJXzSu4UqPr%2FLjpVaojKnnFwr0le%2B%2FEGH7CMnpz2TLiSHbRxVgxmuARrLfPIXRzDKgIzrw%2FEZZRWSsU%2FE5DqSYa%2FrVHtP4HCIoHiIEKpCUsT%2Fk95XsSaDHYr2zPn0y5APYRJ1cdXaOFOmgvEC5PPV8DsQMATOdTEpYn2mX9UrrjbY7nK5cXbqdLQqRyObDcf3PvDLXfU%2FicIpcPAf4ZunOYGspMmppYK0w0v%2FBzwY6pgHGOO3BNJiIoHHD8lMaV1oCRTYCt%2BYq5SVotUXqS8n2iBRbdal97yFXeUxrUVhxdWKulJBjJtrrGD0YeUcq0joApGKLdEpI3wDdfmTS2CpomjW16D1js%2FEmbI6hhk%2F7KJD4Y3m9m9nziNrffdAaduDA%2B7r46OcYztIthw4xnLzXpemtTTBm7Et95JnduCrLSrbg0hoBUhN7tx0D3EGTnJkVypot9CNY&X-Amz-Signature=f781edbf58a148c8b6511e946f78dccf1a721b90d7909b253e2f6792e1409910&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUEKXUCW%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T100827Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQCDxnFvsAgT%2FLdGXGXOfYzYdJB66ck7SqKx76Fsm4LF%2FAIgGdiU6ThWeDAyRMuqjEPY1wI4knTn164KUUp5NWcK4sQqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAZz7SQscBe9tydTxircAw3z2zlxgASpUlqi3Cl9WMuStWc1TZG6Tzw6FBrsApX7JZc%2BbWqd9Reiaxo1u27KMmBCVzKJtAuy2%2BIeKv%2BsYEwCuWV9%2Bb%2FyZ8tqQzuOgdIDJSHO3DfW5%2FAwl7QlmC3BJGDTnuIefnd4eqJqnfaoPejOY8krHu0TDcYthRSsSlEv4oKYoyhvvEVOiZRDZvjVHpwZqlyliq2uE5gA1XT2SvtjgobNLU%2BvULXcdvnzEl5ZmhLjxtmFyK%2FnGqeizhQOtWZS%2BDMIzeHuHGmxR5p3wlH2JaIwn5HVggk3SSHRukaocJjSaEag9Fm4M%2F69%2FQOFsbtqVA1%2FF17qcoWKL1oX1nDK7l7rKjbQQhjvCc0fQK7VISfVuH7Wvfu4X0%2FMalsB14hjP0YJGvVfCIjzioIPI1%2FHytffYetBDi0cD5SWXEspHpP0tazC2%2FmmqpmEawM0%2FZLG0AS%2FG7qIZc%2BY%2B2e9v62NeEdYr%2FShImOL1TzEeovzHofPtznvMjt%2FmQA2gXlRyd4OyS%2Fn49Ad21VDhYwuDe5adHfveYuWrNCio3rwc8mSFL0V%2BskLZO2dyjoi%2B597eYg8KySFRNF%2FBAoqt4r2Giqa5S23oConeGaySvwoDm13iOp5j8SVNJ2izJRLMKiBws8GOqUBUnBEtw8coaLFNhDSft7k%2BCCDg%2Fgv96I%2FWB7cvzyesK47i2jmX2R2wLfOuiom8Rhkzi%2BTKfFNflvJ3quhekViS0%2FiYH0fyEtbodMSz59FWvoqGACvkQ1LQTV0iAmhxN%2FrT3RM6xTWV6V4Tvg4keKMka4LgdkKTICl4HzEGpp5DJT2HpUTpVSqOyy1sHDFeQkHdao8THFLMOXsKMPGifAYyn81VJ%2Be&X-Amz-Signature=0c13a72e60caa4819fee730d78b0a65a0afe955004af12f09266bda1c2666b3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPQHLLOD%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T100828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIEorPQrDJl%2F3RRkdmM%2B5Og2Pieurd%2FxOMhOfWxXubF3NAiEAmxbeqT3vUynnsuOOfIEOfkPzvnU3BuIsyKYcy%2Bp0p8gqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCBchI8UZWtBa17pxCrcA4gaqPo%2Fv8mS7HX4Yp0ygW6J81YpD1AjnHo%2F1Eb91oG43zSLo%2BUZwnVZcdLmXaCmrixzd2atIhOhS%2FT7r465x4Jus1IC1qxyx6IV2Txi5CAWDYEyNr0Lh12bjGMLTTzazEbR5V3lHk0%2FUWjFQLx0bTgEIRbssO0kKyQZYQ5F%2BgHkvHRr62IglyyfeDBTzEWd3%2BmBPXVtEmYaE4dPR61ClaaCjeWIU%2B4bXNojBmpKF8pkpqkJAIKMNy2CHRROW5B01R5CHhZ4A03%2BwQEYHkow1if%2FeVFiNo32kaaPbfDKSmmjJoVU0oGArf7%2B7i03HUoDOru9kFEgUd7gKg8I9up%2BOXH%2B046SYNBGlDJC74GoVp3VGcxEmE60NPMaTsUkKvMZ2ZdmqgxtwUQtGprfkB58KjDM%2Fpd0Ha6EHdmoWQI0ET6FVIQODXsrar9yAv60xR532p9UIdjfHV2QO%2FimxPmdPOEar40WYBDo9Ht8Fki42Zgu96Yb%2BQ7hmb0%2BCO%2FQZW%2BUZ%2BWBgZ0TRPHCzumMHhx0Xx5reTAAO1S3MQBR0oD59qbHUnCNGXTZZgi1Q6kPW1K1BPZu9HPYzjOgG49u5r19Nt7un%2BVvl31ZzlFGBrULL5Nmxbdm%2FhVEi6lNYkeOMJ%2F%2Fwc8GOqUBRMUA6l1pbc%2Bz%2Fk%2FGqmhQcUCL60CmVd0LKsVSSJ%2FSV2nLGWziKQotuwLVe%2BVlzMPK8ti6kKsWk0IWYVGYFEY6zvVH8UlinDP5%2Baus%2BFVFffAkB0RgyGFGcrQ0udLohGuNwI5aUvYbg2eaxPCIf4wYyZJPtxxSDyJy9ewEMWKGRPDj5WtUpU4rRaNDukWMoqeZbtPE0MLw3S7n5SVVB0xdZyU3wBRi&X-Amz-Signature=a2986677f8135752d0ef426fe599463a5d710bb8a08fcc933cdfc9275895f43d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPQHLLOD%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T100828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIEorPQrDJl%2F3RRkdmM%2B5Og2Pieurd%2FxOMhOfWxXubF3NAiEAmxbeqT3vUynnsuOOfIEOfkPzvnU3BuIsyKYcy%2Bp0p8gqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCBchI8UZWtBa17pxCrcA4gaqPo%2Fv8mS7HX4Yp0ygW6J81YpD1AjnHo%2F1Eb91oG43zSLo%2BUZwnVZcdLmXaCmrixzd2atIhOhS%2FT7r465x4Jus1IC1qxyx6IV2Txi5CAWDYEyNr0Lh12bjGMLTTzazEbR5V3lHk0%2FUWjFQLx0bTgEIRbssO0kKyQZYQ5F%2BgHkvHRr62IglyyfeDBTzEWd3%2BmBPXVtEmYaE4dPR61ClaaCjeWIU%2B4bXNojBmpKF8pkpqkJAIKMNy2CHRROW5B01R5CHhZ4A03%2BwQEYHkow1if%2FeVFiNo32kaaPbfDKSmmjJoVU0oGArf7%2B7i03HUoDOru9kFEgUd7gKg8I9up%2BOXH%2B046SYNBGlDJC74GoVp3VGcxEmE60NPMaTsUkKvMZ2ZdmqgxtwUQtGprfkB58KjDM%2Fpd0Ha6EHdmoWQI0ET6FVIQODXsrar9yAv60xR532p9UIdjfHV2QO%2FimxPmdPOEar40WYBDo9Ht8Fki42Zgu96Yb%2BQ7hmb0%2BCO%2FQZW%2BUZ%2BWBgZ0TRPHCzumMHhx0Xx5reTAAO1S3MQBR0oD59qbHUnCNGXTZZgi1Q6kPW1K1BPZu9HPYzjOgG49u5r19Nt7un%2BVvl31ZzlFGBrULL5Nmxbdm%2FhVEi6lNYkeOMJ%2F%2Fwc8GOqUBRMUA6l1pbc%2Bz%2Fk%2FGqmhQcUCL60CmVd0LKsVSSJ%2FSV2nLGWziKQotuwLVe%2BVlzMPK8ti6kKsWk0IWYVGYFEY6zvVH8UlinDP5%2Baus%2BFVFffAkB0RgyGFGcrQ0udLohGuNwI5aUvYbg2eaxPCIf4wYyZJPtxxSDyJy9ewEMWKGRPDj5WtUpU4rRaNDukWMoqeZbtPE0MLw3S7n5SVVB0xdZyU3wBRi&X-Amz-Signature=f62114773f3cbb2575e1b0822b3b6ed150633a264301a01f417af3852c6c010e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYMQ3GXL%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T100828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIGYnhS%2BeUGraa6%2B%2BNbfKtEIigxHDcgkIrWsmHFtPU9n1AiEAnLJGPIpig1a%2F5nHRz6DOinVOlm6So1Hjzblm6AUfz2sqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ5NPHLTyvi0qsNoJircA733RZ0kXfHIfsYbWpERDfW%2BKwsLIdkugo8r7E56dQIeLS%2Fp2SURDPF2sI%2FwS8RfKQd4dCYY%2BGKrYc8eJtu2iNzuAvW066PFb3%2FP5DqGXpGh%2FKtuYNtePnnFMcKNtNnC021vApfk3DbwpV2k0mPl%2BHdp4eRNO7G9%2FPQD%2B%2BA2ZatWFfCTRKfdcEBTjwD9a%2BG5zQq03Hp%2FFT4SfmPrY9d2XjirWLUnNMqPZ%2BQWrS1ZXM7lamlpB302Dzx6mK60Qaut%2FpIwDnDVysfU5%2BLkbMSu4uZpsXVnbnuqgQg3GVxjGWOZf%2BwWcqe81V2D1b1e8B7%2Fl7wvxe2szXsK9OpyNia9we3btNzK9MFT1JAoBObTq7KDrjp%2B3eoeed0veP%2FdsYHuOLAXXQgTSHNPSrCNgYNgS0mVcWRWBpDZ02kNBsoHkeNii5nIR8H0ossN8jSRXBu6RTZ3nny3OMrpVOe%2ByuXtxA%2F0Ru%2BxFBRDTc8wCS%2BtBcBZUczDZqHvQhwFkGX1BcP0walgbXleh0IbhWHyvqUnIb5cbar57HROAPbGJLIbXBL8a0JJWUGZImE1G8XwLv6RPRC3HmMGlbyAH5HAcSp2dWx%2FOV6wQ%2BHHkWP7GJajoHzJ4d4cL97WQF8lvh6FMKuBws8GOqUBUk88395QQ6sM10IWlwkHWThi%2BSSBO9a3ffZ2XGs0XCj8BJqH4ARyyw78VsBKiOzags4hgQro%2BbJiCLdxeJcXVAErVZRx2P1DVvB4I09XyfJF5MmJKo8%2FbybXTqdq03sQMp9XW9i3JZVJ6l0ILWsEigVmBVa4iSEPpVZSYJCaJJsP1NZyuootAB8c16ssYwryeqxQEfOoPUQwTvwGi%2BBDWWUnMG5M&X-Amz-Signature=ad8ef9676563331f94737efdef0824e41d730df82fbae806fdf5dbadb9716db5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KWRGWPE%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T100828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQD3NrW2Gz1kieqH8tXEEg1XHGhgUGXIivKd2DeNJswsQQIhAM1%2B0yDPFBjvu6TG%2FCd2Xk4gp8zJvlFXry9J49%2F5%2FrmYKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyEAFYxPlhVUnhaZjIq3AOn%2FGSTEV1LXN76qdlth0RKpzQq%2BD6VoTy4I5rX734PTiC8Hnh7hSboLl6N952JvNN3FaISdJvKSCDpQkuWIwsS4nf0FOHuRckfAtGkEpqtVxiatKek%2BmPR2L0%2F7zILYQ2IFc5ZyN6Lz519VMio0BD4MOamiIY7KLNecVbAnRwPA3KMLH9BJqFR3frlfLRwiWcd%2Bjpo0Z2NFM2NVu8r2I%2B3N8GFHPAGwXre7fu5T5qgLtY0ZKKbERrrdwY6e4oondHdnVQzy8cskffaywMpyatPQb9gxNpTeEQ3D%2BfQ9wukSbI%2BoX9v1RBM24rsP0mTdxElDwNgC3wqabDNNXCuSEgRGZVDR4OYPNPMN8itsSPUhHCDufwDxYK2wkuVjkdKW6vj3CkvMVvXuIaGonJAsdSlbsP7oH8h%2FNklmBc4z4%2FvAaS%2B9k6y8ymJTvYDJiW%2FWqagyflh8%2Bbu3NAMaQrmYrEWbaWzo6PjnyxN2PoxP6ZQ1e8dyHnxJe5jmwiM1peZv2lCC%2BACkq3UOjKCm1wV3hxk1YhbZgNBWqcaOBnWsxsO8xrxQLMm%2FWD5yiQ7CuoLLtog%2FjvQDU2nvr2h0TKLpEvf9qUxigW0BKz1k5i%2Bp8v6YSRfBy3Tcul6imHVpzC9%2FsHPBjqkAR2%2Feq4NKAmPmgeVthbaqbGOitfHbRbcF3gjFUFoL6zHImpFtm0za0VHUkxnpjZDzVcvG%2B1fZzMIFq2%2BCKzG9KGIxTdmtM13TLv0nozE%2Bmnof5qqz9HblF79ta%2Fv2kAAV1WNimc4%2FNgrU6wR%2B82NEoaakcwXVVdMj%2FAgcsXcuUJTmj74T3SIS58VFzHIfQqRlzwJ6AA1ssRbxW2QsRlugZqnPkGa&X-Amz-Signature=ed2e97c8808e2b7245ddd34a465a4c915c19b78059aad196aa3e68b2e3ef7b35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEEJ5LQJ%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T100829Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQCsFyBwR18Y1kjdeHrbwaxBR9bv9JmQCy6070%2FfWqHM5QIgfInYGr67Kxe5NwmJqxJ4lJho6CQpGJhyPufUTe5lajwqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDKkaWUyYK2FRBG3CyrcA9tUxw1xbCH5Yiy3QBj4Y%2FCpHR4g%2FzxBthSudpQIzPcZyGOkFKi79AQb9rStqB4rDiJIqZVYejNFZH9iD8zWnabwXCCklvlHuuWHQdmg9N7T0NGob8hqPhAaiEmIP2fUSByG6ZlmwYOavptm0YDWQ5m8Ucz4GsU1751G3TpX7oYNFupHx7f5pQfsS8xrtjf5uJKuw5bEAeoui2F9qtEJ0avZog9rKMByDFujOP90%2BJF9sYeKAwaTfsCR0cnOjOVXkiTEjfusKRoLGhqQvDph2bDj9Fxr1MbBX1B4NzpiYu7VgqfY%2ByQnlWarMiFMsS0lwIPPIvp%2BklRUWRQkUNIQFWQq9rdXt3NIW7ssyqV%2FWMjvppwHibS37tI8QHnrAqq4tsGgdt2E953kpEXripXPZc9cNNDMJg57ypUgO4daV3n0OBwLIHZGgHHWm5CYfV0cI6jAtdkqiEYiro5f1Z8JllYAK01mHtgV5ltuGjBxRIRA3LcwfX3ZCHW1QP66ewS1IqicsOayt8Q5IfqOpICh9vSaZaxlwlXETrGipYkYSgcD3iDVo2szP6EWLd%2Bba3jqFNuYtz8N%2B5YZvf4cbZYWfW8leFWaOxDpPHj%2BfwW3L2Y0hdW3jBXqd%2BfpXBF7ML6Bws8GOqUBZKUrsiRZem3C1A8qgUsrtnVGn1hmfTml%2FjwgHpyoLrUeHmmsAwz%2FYJtOFIHXT8vVC1iLWlNuNAsRjf8%2FpOP7Q%2FPLa829OTcraWi17Atml3N3bhZEh6w%2BdQpg7By%2FxOeBereb3RPKSKBxWQu%2BfTJnV65G4KD%2B59ztttX6qKZtURtAuq%2BVv4Jf9FKyrkc4SLSLq4SCPjJo66dfbbuLGhdzb%2FlCtFXk&X-Amz-Signature=f28140ac43d4cbb734988e40f58944deaf1fa37b98749756eedf2b2defc3bdf6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4ZPAUUD%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T100830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIGOUIY6AOTmjPCK7BISjHU%2B3AyGMR03m5OKJTW73U2yfAiA8Zg0Sz9nSLufgvN40zkndayrwbsLSlFFvVff5xMe8QSqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMI7ccESI5w0lb0trrKtwDckuYgDIiCcFJxvqrR14zzOABWgA2nrdsmXzWEGi6VjzSAHCF2ZXaieBLRkmPrskqmzE7%2B1LPS%2ByrqxO8Ld%2BJKbjNOEKVlXImV674eLEvO82zfH2UwSc28a3h%2B6FAOTGZc%2BptL5uLOjLglStjg7BAZizbDfocK3g0OX9XNxA4oD6RAjDZTilCXZT354ULFvZDoxlBgjkSv%2BPBwHU8QWXpEd60DeGkqOUKuBM17yI4ZG2ZU7ELuV0VgJkGVRnbqR%2B85tsrAENk5EAtjv7NBKX%2BK6T4twG2TfWk6cDvE7ikwTNBB%2BR7EBjSRnGLeKVASCCzEL23G8KAQKmtFj%2Ba0fPGBpnrkhmLPtxzxOjweG7RlOaizFupv8cYyeVf1QdXsZO21Sq%2BO%2BY3SgDQXJtCJ4WzGojCFCZImcqEbEPyOpWnnESjktKrt1fOeu%2F0UA0AuzI%2B%2BKT43OTsD7tbRlTjyogJiU5PVYT20QfWa2w2yULuKXlUQOSsafksUCEBeSCYoKIdUM6Fs0wJdK%2Bww8gsJ68kci4pm7W%2F%2BeO27P%2Fu2cI9CsHhc8Ku3FZ1mtOy3a85HhkNQ4k1wL7nDm7P1ZyNqWc84q%2FmANsiHqEehA2ONh7rkGhG6gdrGWzQLpxgHIow6YDCzwY6pgHKztDtkl1%2FEX%2Bgjve0PYkU7tY%2BEUAWShkpQo7QnwzN5m2TQC8zg3BxmFqqFnFdDmo5fjR7ymHDhVn3oqKxNLiwYaRWNBXsF3WRK5FuoZ%2FqxWQxjVkvnGypVsgmtcqiCJDIj%2BEeMiAJBeCYxW94g08BSNsfJ8AIRU3aW0oTlhh60nSdr87XBCl1C60z8lExIMF%2F70PjZAP0UjwAzwjgZKZ3IYbzrYIC&X-Amz-Signature=4d9637fecc4e6c0db09f0f99fdc4eb71b765f08bc108bee50e2c7e088f9a0dbc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4ZPAUUD%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T100830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIGOUIY6AOTmjPCK7BISjHU%2B3AyGMR03m5OKJTW73U2yfAiA8Zg0Sz9nSLufgvN40zkndayrwbsLSlFFvVff5xMe8QSqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMI7ccESI5w0lb0trrKtwDckuYgDIiCcFJxvqrR14zzOABWgA2nrdsmXzWEGi6VjzSAHCF2ZXaieBLRkmPrskqmzE7%2B1LPS%2ByrqxO8Ld%2BJKbjNOEKVlXImV674eLEvO82zfH2UwSc28a3h%2B6FAOTGZc%2BptL5uLOjLglStjg7BAZizbDfocK3g0OX9XNxA4oD6RAjDZTilCXZT354ULFvZDoxlBgjkSv%2BPBwHU8QWXpEd60DeGkqOUKuBM17yI4ZG2ZU7ELuV0VgJkGVRnbqR%2B85tsrAENk5EAtjv7NBKX%2BK6T4twG2TfWk6cDvE7ikwTNBB%2BR7EBjSRnGLeKVASCCzEL23G8KAQKmtFj%2Ba0fPGBpnrkhmLPtxzxOjweG7RlOaizFupv8cYyeVf1QdXsZO21Sq%2BO%2BY3SgDQXJtCJ4WzGojCFCZImcqEbEPyOpWnnESjktKrt1fOeu%2F0UA0AuzI%2B%2BKT43OTsD7tbRlTjyogJiU5PVYT20QfWa2w2yULuKXlUQOSsafksUCEBeSCYoKIdUM6Fs0wJdK%2Bww8gsJ68kci4pm7W%2F%2BeO27P%2Fu2cI9CsHhc8Ku3FZ1mtOy3a85HhkNQ4k1wL7nDm7P1ZyNqWc84q%2FmANsiHqEehA2ONh7rkGhG6gdrGWzQLpxgHIow6YDCzwY6pgHKztDtkl1%2FEX%2Bgjve0PYkU7tY%2BEUAWShkpQo7QnwzN5m2TQC8zg3BxmFqqFnFdDmo5fjR7ymHDhVn3oqKxNLiwYaRWNBXsF3WRK5FuoZ%2FqxWQxjVkvnGypVsgmtcqiCJDIj%2BEeMiAJBeCYxW94g08BSNsfJ8AIRU3aW0oTlhh60nSdr87XBCl1C60z8lExIMF%2F70PjZAP0UjwAzwjgZKZ3IYbzrYIC&X-Amz-Signature=7c21319f0b5cafd82af6c845b04776f194f2cb8c3c36d8309553f3f86cb23ff9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3NKYRTM%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T100825Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQDGZNmpOVTkz6narTJipP4b3nQmnMAi2cMOYmp2tUjRVwIhANIwP%2Bno0ZRNdjO1X%2Fek4A8P1pH3AN%2BcbDRfoko%2BUneoKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxu3%2BcuHbhcGoYuzKQq3ANgcXpSGW3SQbXS9Frr3DDC6kEIf6hAx4G5fII6AatsQIRB63ELGHjVq%2BD0EOKyUfjqT42kYbU9v38u4nbaXfPktD1ElpI7LXIxUZyd5SkdtHqoGNuHJmsIKQ6yEdQeiC9du%2Fn%2BFM8xFAu6ZzZ4TELAqKfXkfAtSEDCftnnFE9nrGmsTSVP90PMRAg3fkOjYQ70X%2FdN85Arzm42NqmH%2BzkyvOsVYY%2FbxVyuHu6RuvWfFAdkKczchcl%2B87jw2FtAz7B8Cb6QhLLBKIjcP1LVhSBS6elqEQZkqE3Kh6N0pgI4AOieZCS6AxW%2Fv7Q%2FUyzOM5ofzxjueX9gWWpwfE9FNJGs4kxvbczzWb3u7p95cfcS6F1CJEEDi%2BLPAn%2BF%2BQysIpLH%2BvccT2Wvf2WllQTm9vhrz5YNBDA3f7p06qL4uknRD6TALrbMWmjOQclbShhjB9mYO54hpfhFmziJfrjdjiBdo%2Fl8jTDV9v5vtCrei4QPjwsOZs0Q8XHIYRvdcmqCyi1At8oA41%2FBkyokAlv5%2BhWTmggYlH%2BJLTkb2VuJjaU5%2FHBSyOwTSwDzzg2cdmg2gSpNnYiMc4wvxWoev8v%2BbuozVj2dcKSxWwrQ4wpSGO4A4DHFT%2BYIgc4BoapANzCWgcLPBjqkAYpyqGU%2Bn622mru9PKtCtee1UpIsBACB%2FTLQeoL0NXuXFWT0TGs8FUX9CuTe240zdJ%2BzeCPWLWAQVSILWJlOqnTl7%2FaCSdExdnAnetmt9Pa3WjnvTXGXd60TfNpHGwOueJ0rEx%2B%2FKi6VBN1HhFoZPjmebwIbnkAfQJkMQeOQ8t7VjMUhKTS5VGKMZm94%2BuRsVeAd4aQ2i7%2F8rLJFzKlCf433mxrF&X-Amz-Signature=aaad56459e901dcbf1147b2a1ea529ee6d1038d83d996e02ba5a34253f60ba17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZJ6H33Z%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T100831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIBHQ7NOAYNOb9cdBdfUoEPWJ6mXRgqW%2BDvi9Cuwg6jp0AiARMpSH2TT5A%2FqpKlIiHUY4dD4OVaxpsIypEXKbS5qy5iqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrxtEcmWvkQs36hQcKtwDfcJ6y9YaZS5kKImF9MQqPtOVTp%2BRaCTCVSs9w%2F14HXGmV%2FgV3pW8G9TBI1dK2eilgw9o7UfCmDT58FAPFWUyFR%2FnJkLdwzpbuaoNDQau%2FiNGe64VXMglYSXjE4squ1PWPqedIJlXxdluWNIQaZ2MHr7QRf1I6bMH8j1iVGtlSst4fBK6%2Blvchfn%2Fio2PRx0ErUF0rOl549jkSM8seR%2FyOMSFpOhT0p4e4riv%2B0NM6jUvElf7%2FKLkoRJc%2BqXoEqaw%2FUrE8G%2B%2BL3eHzdjTYT5pey%2Bj78Yd%2BUkzfMX06NUt2aGiYC1lkajrTkaL%2Bam%2B%2FMgy2UzAL10IU8pF9%2Be3PYpH11m%2B46ZMS99gYwH0sKU6k2kwJvpQO7sSkydB70wAquAbXt7ATUoo%2Bg8A1HYarUEINUVJYOKF9uXf1rToe9nQL0HiAhZYvDVhkhoEuqeDm5h2kdKN6%2FJyFLvoQYSOfQ7N83Z07GgbNukE0Gs2TCNa0UuuKw9OYlllsppmZkm0k5r4dyLjA0snlB5IF5FbMlXAA2XWP%2BHwH8Qnodo2IGqRKkigvL5pZUMzs2N3MFX0BdSArBnBdZBJGAaiDCJFzWhMvAfB7ucDnuPMxjGKnVgVpJhAhwvjaTP1rds2y44w4%2F7BzwY6pgEsLAjZAt8mHQpO9mih5J2ReVWXKQeC0b061Z8eOqxwJk6Bnq1N0r7EBYPQRU6fVWa0DIZaf5%2F4WelGFbZSCU1ZcaIlD8o3h4cv4hw0FQXGsOYA0CuPbZ3mnlmwv0%2B0zgb5AZw53u%2BYEq2u5oj0Gc2Ghuj4eOSoC8lOMRjHl5sSWoAKLGTUbIbdn9m47Lf1yckDxIjD21d8OmXveruyUm62dkJzXgIt&X-Amz-Signature=bf58518ec89fd67e273087835fcb4f97bf1287aee1e40803590ce4feaa09633e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZJ6H33Z%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T100831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIBHQ7NOAYNOb9cdBdfUoEPWJ6mXRgqW%2BDvi9Cuwg6jp0AiARMpSH2TT5A%2FqpKlIiHUY4dD4OVaxpsIypEXKbS5qy5iqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrxtEcmWvkQs36hQcKtwDfcJ6y9YaZS5kKImF9MQqPtOVTp%2BRaCTCVSs9w%2F14HXGmV%2FgV3pW8G9TBI1dK2eilgw9o7UfCmDT58FAPFWUyFR%2FnJkLdwzpbuaoNDQau%2FiNGe64VXMglYSXjE4squ1PWPqedIJlXxdluWNIQaZ2MHr7QRf1I6bMH8j1iVGtlSst4fBK6%2Blvchfn%2Fio2PRx0ErUF0rOl549jkSM8seR%2FyOMSFpOhT0p4e4riv%2B0NM6jUvElf7%2FKLkoRJc%2BqXoEqaw%2FUrE8G%2B%2BL3eHzdjTYT5pey%2Bj78Yd%2BUkzfMX06NUt2aGiYC1lkajrTkaL%2Bam%2B%2FMgy2UzAL10IU8pF9%2Be3PYpH11m%2B46ZMS99gYwH0sKU6k2kwJvpQO7sSkydB70wAquAbXt7ATUoo%2Bg8A1HYarUEINUVJYOKF9uXf1rToe9nQL0HiAhZYvDVhkhoEuqeDm5h2kdKN6%2FJyFLvoQYSOfQ7N83Z07GgbNukE0Gs2TCNa0UuuKw9OYlllsppmZkm0k5r4dyLjA0snlB5IF5FbMlXAA2XWP%2BHwH8Qnodo2IGqRKkigvL5pZUMzs2N3MFX0BdSArBnBdZBJGAaiDCJFzWhMvAfB7ucDnuPMxjGKnVgVpJhAhwvjaTP1rds2y44w4%2F7BzwY6pgEsLAjZAt8mHQpO9mih5J2ReVWXKQeC0b061Z8eOqxwJk6Bnq1N0r7EBYPQRU6fVWa0DIZaf5%2F4WelGFbZSCU1ZcaIlD8o3h4cv4hw0FQXGsOYA0CuPbZ3mnlmwv0%2B0zgb5AZw53u%2BYEq2u5oj0Gc2Ghuj4eOSoC8lOMRjHl5sSWoAKLGTUbIbdn9m47Lf1yckDxIjD21d8OmXveruyUm62dkJzXgIt&X-Amz-Signature=bf58518ec89fd67e273087835fcb4f97bf1287aee1e40803590ce4feaa09633e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJLG3OG4%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T100831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIBBSp2ymoxzOpQrffRP8iuJM473BYrnW0hJS8SqEmhBnAiB8cs1Z42QG%2BweA6NHkEcJixSiz3d9rtxFMioEuciElNSqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMK8vB13jjvdOhJYe8KtwD%2BATce3idwH1frBXLkSyT7gJWJ9wxFb1rrwNtXAPqgkicQBCfbzJhIaKqsiIgZIZ5tK2N8m85B23%2F%2FwrAfRAZaxQG4LQvu%2FOiG6Dml9CK1MhgQ6MictCiLDkErTOHZjmQ3bbV3yAHO2hguVjg7MHE%2Byn8A0%2Bs6j4VQHi5X1evKFjq93nuW6HbLBg86EZOT2dbaiCJVEfJ%2FoZYFDfEX6FsOUTEKrU04uOnlsZBbBnCUJih34RAOvNqcYx2y6MQfD%2FUmIYutmbfW94PemCP8irOaj54Ft%2Fc%2FcaagdVVbPiezYr%2BXFFio72pP87Go6KDAk5Yh4gcXIZVjnJ%2Br7m777S6sHvoEejPeE3ZyoztKEBsSHh5wzKMvHT0nS3m99a1%2F5Wq6Hz8UCzuaEzi44L9G1ShenzergGawFftsVnFkXp9gw8KFa5CZqs8n%2B5HGQ%2FpZqbdZgb153LgrbuF40nBwPtxZrXZD5cOFJTaNLNHoanohyqHSXoDqxuLn9CevBdz7n8%2FZSOZO6vEcVR6ZMMxECVJ9G%2BeqzXPpPUdTHvG0ChEas9sP38edmSGkdSzzGL1Fi29Ei7klbplMOj6tngX5p3k3843axNEF6MEOCRlSackIoM%2BQnqycd%2BABp7HZ6swoIHCzwY6pgER389Sb0%2FL%2FVsSK9%2BmjU5xpNhp1ssIDMll5UKTdYcIVy6SO%2F8Xmw9A%2FQwqtySZS7t%2BhL8RXXOKbZ9edSMzoNXOVHak8aTkAJQsVpPGCiPapOGV2tb7U8%2BK8n0qdN21ZiwV%2FugwYYlooAy2KdKBTvHRzu1Kg1mApC95fKTfPn6vti32hUGe%2FsC%2FhsC%2BfJkUiFd0TJtzJWq9VGHqSCUYy3c2HW9Frntv&X-Amz-Signature=101cccfd95091f15f2c4f70f608635260632a3e1509dc191068f4f82dd62f9b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

