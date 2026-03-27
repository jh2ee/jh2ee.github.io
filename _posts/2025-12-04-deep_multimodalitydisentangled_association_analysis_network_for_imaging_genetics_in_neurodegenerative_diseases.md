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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2Z5JGK3%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T212239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQCdDWKGHGefPVo98HZf2dLP9D0MnHv%2FVYyk8ZbWhRwEKAIhALZA2lPbrCM707BtpFBqgoAAeJHrGgPaV%2FM2GeAV%2B0MXKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyQXCzXxkjpUkKrPxYq3ANYg77ZZTlgLUF%2FGIGDn0x%2BIsAXa2wiSb6%2F82Q4kGpCmmwcBgdxASmdxYbynNVLkzSlTF0e8Fe6aK3BwbcXKhc1DvH94iIwvcE537xYtQPI%2BsfcObwwdjoVtQcEYLPta8jHaS3UffvlR%2BxZPnlh37rDbRwesW%2FxXr2YJ%2B7IRhD9vBy1pmK%2BTz9qs6RJMGLHS9r9lXXmfeVCqftywumdoYRTFd4sYyK7VKBBeDmdVezzqkWXjzGFRKTOZ3gfrz1nhdiZEESP9NLjqywZwu13y5lmV3h1ZIo6tIJXnvRxdz2Ff4QqmFoocsMoVwvUDg2eH3AiPxqqBswR%2BZlX9fc4qE5Of2n9KRiEUqbWqeDKSZu2nG60U5t9rINyOnCYPOI%2FMGOFB2KdSvNjBS4JAM4TrWAgJRJOKrP1umhP2Bc2QJKFUMR1g%2BR7B6s0ct8y4nAaMu4vEt6ULUTvSQYKjbYrQiPVVG3lXhwBq9ygiFoIh7VNfYGck2yzG9Gp5xBuoJ6fptwb%2Fl0CTCXiTiBh3UPfVXSs4zgiRobOA7Mfuxik5niAuIX2dZrVpklt5KtmLjOOSWFC2ZkFC6yrlJrfocElvPGDXoDw8WvHLZyRr5TP0Dg3%2FVMwF4lQjvLibf2vpjCt1JvOBjqkATi0l%2Fow5sW0QFQLbHPH9ybyBqlfquzbrTGJNievcbHGHwxbB6prZRJCMWnlvPbxiCDUZrQtKumoNgyAXfEVlr3OykU%2FncY1qU5mkJaEJ6Z7Qfk9UcI0ZBzQlk0hcziw%2B%2FLve37jASFtc5RsVHQ%2F6w21JAPE7ONpSbVr%2BNnY36aS%2ByJ75NM%2FMtu%2Bvq1hOIi8RIYfpfUWHw2hSaTeckpnM8HSgylu&X-Amz-Signature=0c5a5d93799505d546c094d49b35f9088a71f4201b823f6a990132ee0368f34b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2Z5JGK3%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T212239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQCdDWKGHGefPVo98HZf2dLP9D0MnHv%2FVYyk8ZbWhRwEKAIhALZA2lPbrCM707BtpFBqgoAAeJHrGgPaV%2FM2GeAV%2B0MXKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyQXCzXxkjpUkKrPxYq3ANYg77ZZTlgLUF%2FGIGDn0x%2BIsAXa2wiSb6%2F82Q4kGpCmmwcBgdxASmdxYbynNVLkzSlTF0e8Fe6aK3BwbcXKhc1DvH94iIwvcE537xYtQPI%2BsfcObwwdjoVtQcEYLPta8jHaS3UffvlR%2BxZPnlh37rDbRwesW%2FxXr2YJ%2B7IRhD9vBy1pmK%2BTz9qs6RJMGLHS9r9lXXmfeVCqftywumdoYRTFd4sYyK7VKBBeDmdVezzqkWXjzGFRKTOZ3gfrz1nhdiZEESP9NLjqywZwu13y5lmV3h1ZIo6tIJXnvRxdz2Ff4QqmFoocsMoVwvUDg2eH3AiPxqqBswR%2BZlX9fc4qE5Of2n9KRiEUqbWqeDKSZu2nG60U5t9rINyOnCYPOI%2FMGOFB2KdSvNjBS4JAM4TrWAgJRJOKrP1umhP2Bc2QJKFUMR1g%2BR7B6s0ct8y4nAaMu4vEt6ULUTvSQYKjbYrQiPVVG3lXhwBq9ygiFoIh7VNfYGck2yzG9Gp5xBuoJ6fptwb%2Fl0CTCXiTiBh3UPfVXSs4zgiRobOA7Mfuxik5niAuIX2dZrVpklt5KtmLjOOSWFC2ZkFC6yrlJrfocElvPGDXoDw8WvHLZyRr5TP0Dg3%2FVMwF4lQjvLibf2vpjCt1JvOBjqkATi0l%2Fow5sW0QFQLbHPH9ybyBqlfquzbrTGJNievcbHGHwxbB6prZRJCMWnlvPbxiCDUZrQtKumoNgyAXfEVlr3OykU%2FncY1qU5mkJaEJ6Z7Qfk9UcI0ZBzQlk0hcziw%2B%2FLve37jASFtc5RsVHQ%2F6w21JAPE7ONpSbVr%2BNnY36aS%2ByJ75NM%2FMtu%2Bvq1hOIi8RIYfpfUWHw2hSaTeckpnM8HSgylu&X-Amz-Signature=0c5a5d93799505d546c094d49b35f9088a71f4201b823f6a990132ee0368f34b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRHPI644%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T212239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQD5PwOTWOFiTq4Zzh3QrlKk3aVbgTe7nNt3h3p0GZmCtwIgMKp8o%2FX9yFxErMbTg3mFMiJ%2FGkEiPwDkZn28rSWkAOMqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMyXjvBbmXf5YXWLPircAxmLpYHdyEpkq8wGmhCCuh3nT9eS3LvlgStF3c8v8NaHLX%2F517%2BDZ27dbAaaaeN4xf8rf5Dzk5o0DWVrV7NNjP1mR4Oi5kJZQ0UYlywhVsN0Dte%2FRjwO9re3z8Ks1XFSRwxtGveQCzN664aV42zP0rT5FF%2FulZ94HmRi4Az6jerQEBtaw%2FAlegFkXv9qZeidlIHUrub%2BzIeC6htWWeceCq%2FSVkcrbFWdxbNSpg496qbfBnwIdkeH%2BlBmlFG0dUUe1nT49RRT%2BpdPz2p%2BBv2oZIMu249Jb2OrI2ha6ySw5hEdgL8ckHg3IkoJZoqvGX07%2F9qbefZkrDbE%2B%2BRUm6mx%2BUnWeopUJD72zpyzMZf6CToeYszfmvIBFGFSKAy%2FkZmsDotYkKVj0NUFidb1Xgl1%2FjzBsT%2FxQ3Snu0pZ%2B0fXvuXpG6qm%2BelLPNDgOQCAk4P0mhe5ixtH8osmLE7aJ5XWmRZ%2FZM4mdjXyDqtvqATW9Ud2gy6vVPo5AqArDd0RdCyJ52a2Mz%2BBvB9ar1SzzwCUe0riDFSZQcUWK7Xg%2FqXyUjlmL%2BWfeNWtBWmRNeuqXhgOhDmjMg%2ByeDvx2UZ5FP8Nt5%2FlZoNnA212%2FqKwej7sRltNx4SJNEGWkf3%2BS9ulMNvSm84GOqUB%2F006Q8ggg%2FCxD1g9fWviUDY3qvKolBCvGfqR9z%2FAtcyBC2%2FXJg83MdyG%2BTaBDsOOms3dNFR0XMubF3SAgnNsgBI7hJWJs4%2BVR%2FHU5YPfbcw%2FjVcHspBZsoeI7aTtkgCri98ZaAkzQGckjlvwA%2B%2F2hJ03DObHp%2BWooJHe8Xs1AZMaybRzG9ZGQycmJAH0MT5TjxSoXUmg8Qjo9jBn7I4J4kiapdvO&X-Amz-Signature=3d84cc13cd245ba3931379501e20b1812cf61098a04c7a2f2c6cd4c895abf11f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WWMTIYMJ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T212243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQDDu4bPnvJAOJKZeQcPjo%2FjNpyRtgQPifhKQ8e7NNY0swIhAIycC6qNrZdeKlsi%2BZPXOzExO40sJtuXTdf3GvWTJmibKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwYvwhZoyoRL8OUjZIq3ANMJHo0FkMm6jNZ2MjCm5tEXl9Pb7tBrthUOK324COqsfPY4YftcwKgvw9fKQjlvFKIOQoA9sWKOndKupAOdOg0N15juvjcc%2BX%2F%2B5HyEq4NotlxCylioRAGENy6HP6LQUia7GhhTO6enBoGObrayIDLvtEw7p%2F9ulvmhEjvdBumIysmDh5epSahpJNfF%2FfKHVetQkee6MMRQ7Q2FSugQycpy6WhGzVq4jLgAjag3kHu0MwRtV6Ry%2F0dAvPHtmmn0xXTOLkUjXFSAvO2XJ0DU8OjUz%2B5Dhs7PLFYusc5H2JFVSijdg1eOqJzXIQND7XLDCtBcjrhG7wALOxwPytBmyM1I%2FU%2Bwc3ljdwSC57xnfOSZRkcgb2oYLTpO6m8VTgjB2cCpwxDDusnBqO3GjTZytxFnhBar%2Bt7Yxp3WZVi4Kkpsx0lLI6R7r5nwYOvkfxObFTrKEAm5i%2BIfnoe7Ogpk%2BES7V%2FMo2v%2BvOBb4hRXeKdFmqqaQcf0fj8SHP8sK3DI9KBKNWr6Vc0WSWcWOadQbvd8kXzN%2B2fXSOTtp2wW7Hw8VgLgX8cvQPeUxcsdKHVt3d49phj64oE37fLlXjZbu0jORY0cfzvUQ9dgxpGGb%2FPtHdEIcF7JAPn55nimgDDR1JvOBjqkAeqNOhptuW0d1G15I4AhbRGyg8a2ayw8oJjFAmOnVgMpwlhyZ7dTgW8LVls5VVY5SLLJD0f%2Fg9m2B4Zyv2liI3VOhGCtnx%2FOaPNUORhJIBd17Gs3cLH3TyBAS9UU7qguBFAnAOAnS0tKiCI3ahmaNoC34xcodnn144UXJ43uonLPU8fFhEBVHapJwoJ6MbGUus7gX5Pg2zPULgaxTnp7JbEYUafl&X-Amz-Signature=44e51e34164b6873748ac12b2e971007d638216644d2aaad4bfa809d8f6710b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WWMTIYMJ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T212243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQDDu4bPnvJAOJKZeQcPjo%2FjNpyRtgQPifhKQ8e7NNY0swIhAIycC6qNrZdeKlsi%2BZPXOzExO40sJtuXTdf3GvWTJmibKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwYvwhZoyoRL8OUjZIq3ANMJHo0FkMm6jNZ2MjCm5tEXl9Pb7tBrthUOK324COqsfPY4YftcwKgvw9fKQjlvFKIOQoA9sWKOndKupAOdOg0N15juvjcc%2BX%2F%2B5HyEq4NotlxCylioRAGENy6HP6LQUia7GhhTO6enBoGObrayIDLvtEw7p%2F9ulvmhEjvdBumIysmDh5epSahpJNfF%2FfKHVetQkee6MMRQ7Q2FSugQycpy6WhGzVq4jLgAjag3kHu0MwRtV6Ry%2F0dAvPHtmmn0xXTOLkUjXFSAvO2XJ0DU8OjUz%2B5Dhs7PLFYusc5H2JFVSijdg1eOqJzXIQND7XLDCtBcjrhG7wALOxwPytBmyM1I%2FU%2Bwc3ljdwSC57xnfOSZRkcgb2oYLTpO6m8VTgjB2cCpwxDDusnBqO3GjTZytxFnhBar%2Bt7Yxp3WZVi4Kkpsx0lLI6R7r5nwYOvkfxObFTrKEAm5i%2BIfnoe7Ogpk%2BES7V%2FMo2v%2BvOBb4hRXeKdFmqqaQcf0fj8SHP8sK3DI9KBKNWr6Vc0WSWcWOadQbvd8kXzN%2B2fXSOTtp2wW7Hw8VgLgX8cvQPeUxcsdKHVt3d49phj64oE37fLlXjZbu0jORY0cfzvUQ9dgxpGGb%2FPtHdEIcF7JAPn55nimgDDR1JvOBjqkAeqNOhptuW0d1G15I4AhbRGyg8a2ayw8oJjFAmOnVgMpwlhyZ7dTgW8LVls5VVY5SLLJD0f%2Fg9m2B4Zyv2liI3VOhGCtnx%2FOaPNUORhJIBd17Gs3cLH3TyBAS9UU7qguBFAnAOAnS0tKiCI3ahmaNoC34xcodnn144UXJ43uonLPU8fFhEBVHapJwoJ6MbGUus7gX5Pg2zPULgaxTnp7JbEYUafl&X-Amz-Signature=c7695693673ed1260ee7c767c5c248c62189e4a928763fc9082c5f7ca80e7bc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJH7PGHL%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T212245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQDIiulS41pOp5ugiQxcy6ZwPKZ%2B%2FeRrLwk3Q%2BW%2FLxMkyAIgOLMRvhTYw%2Fnwy0FIbQMhnQ4z32oVCujFEMPRUfUqvX8qiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMnOvL8fOrNOYFQp6ircA9NZohn2lFfi65oDc%2F2KloorJBxmLhe2H50d70Kg2Q4maG%2FtOKitkZnAa797QFa0X15wcxf5kTGEG70MmL%2BkEtnk6H8bSGEzh8pBVgwZcLZetw4LN9ftxZegzfLZga0LXJY9irUoZM0LyliKmHRbdBZLJbLFQuw8DpDl1hfUe6eZPXNBdtdCmX0qQqYERNsYy%2Fb5chBxLsRPhJD73qfY962s3Zw1Uxk7NtQAeO%2ByUsAZcXfkM5c3L%2FvyDoDNBouKKYTQ8hAXhMKRK75vv6%2FGgkr0nF%2B7WLuC8LzVEv%2BdAouXvJrCM%2BUI9fVF3YadzNQsGnr7Kp3ao2ZNpsN%2Fo3plgp%2F%2FQtrzRGppw7PH6BuF%2Bd9zSLNhGWykPLVxVgDwR5TyY%2F00n4sP8hI%2BmtbpoY2JZpT96yYiDTlXf4DbeP1HNoJL94wfyiC8bjINcEjJRkb7ETJDqEzRKT005HLq2%2Bu3tgxnrF4yJcpsQP8e7u4SshH4y71L%2BcV3XaDcIeAV7YX9pzLXL%2FmqdQ4%2FS12TgLfQDRnoNOvO8xwvLGcAVxQk2VI%2FK2pHBlr4NiN10wJwW861CsjaL36sTP0IW2o2gWaiQoUu9r7pdFZfBpRDVPBFScWDiv1NgPnEkEL31l%2B5MJ7Tm84GOqUBHeYA6PslVv6BjKYvZzQ0WR05pLrK9DD4o6ydLDQRQG7uroWsQc99UtxaBXP8ph8mz0gI5dpaxX9ADl6pR%2FnaUjLii7%2BUESmUkePIZ%2BWuzctMaggp41jZgAe%2BNhgyGgmPSESYCPrZVXjOhmq1h0q%2FH03Uq8SanMxC4wJHLyKZwJncCy9K%2FgpA339UanVQ3aaBWZZrL60xbF8BpEpDSlsNvcfYfY1K&X-Amz-Signature=d1f2f9db30fba61a92636bea3ece86df301f8eea509e282658aadc09c075433e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZ5XT7E4%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T212246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIDes06RBONYLQp7VfRhcf%2FXXIYUAyxAMbTnhZhGr5MxsAiEAq1qD%2B6TWzOu0S%2FAnUU7waXMmTCQ%2Feh02ed4Ne7kOxvQqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC2BiUGhSWpFsqb%2F1yrcA4HEio15lVDUrXN6vmeWPtFjYr%2BUHjus9AuolnlwrvB93VZblm8e95cKmgFzYfyL5bXzUEe3Vy0G9mFrtg9uIyl1YtCpUuCzIcL7kJXK5pZ7V5l9mY%2Fwr9E710HGBI%2FyXnW2ZXqcwJw7TqcvoJv4LFk0hEDEzeDKhikDe0vHrzwjMTwg6cJF9AnNplNvN3DjMpMt4WO4mqDzLiZFz0BkWYNFjfB5ds79voul%2FLwXl1dkIixne5Xb3e8fQJb%2FvoLQbho4kMH6yhADyxhnDtoZftD2VVrsO7Xz%2BM3a4706gd6n8WqEXI9UIwnZ0SsrumazWJLVIFoGXXkSESpcygM3ICQddPi2nBhaAzzPuinpoh0WTWtVRQEMkedbQmXd2v8loVwBAZ7EI%2BSIKNazKNl97qFurLy8JBiLwqnrNaqXdVxuUcy8AnMcxNooR9HfnXfEuxuHp8ZOtObmi%2Bqe4yPAppYPPvbr3k%2BzQoRAUCiDZ7%2B9UGJ3dljkvs9ErXA%2FOAtXIRihZBomzMScsQwZWEHl%2FNfatVcgNjHHYH9hg4iZ3q4q8rFXjKkei7KvIf012H9kPgNiNFRT3hUU1Gq6jG2Nvn4B%2B7W4grsCUNu3RPePlPZ%2FtW9MiG78Bc1uZ9JQML%2FSm84GOqUBKu1qkSd0YrTKA4u%2FCtxFSqGRcr07ymhK6ylJnEvn%2BvRijfncSEHVn1Qj7vXdyv6qIaFUUCk5EOuXlmqzcJMVR9fgD%2BZHB%2B7S61hef5YVZyAkR4mCl7Veh3aq03zluyhp5rYP1raa8yhn1UXRMu8EcBN8cwmdYsf7E4uWSJxw6bf5ye9dzdiI7gBpf%2FFncS3AZ6PxEjRu0g1R91%2FHz66Fi%2BHhR5iV&X-Amz-Signature=86059ad4e75b9b6b707ab87ab2472ef5473ecbe834a6db3c48b91127331a4158&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DZL3ZHR%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T212247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQDtqycVXkbDOx4TQ10RtV92%2BSaXzSO6RCOf7q0Nupy5hQIhAKQKr1qkktEIHLWe%2B8GSX7Ld9rXTX5%2Bj7N%2Boc%2BUw5OOKKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwwRvAJagFGg6GAAOYq3APLjplUjisY%2BpgQsdhBi8ZyzXtoSOlkm0MmorkRSW5vWWYMIrp21vX2yTlAG2xAi%2FQHAWC7gFGKOUVmez01xr37b6ARqfcnAZHxvMgGlxSsb6O3N%2BvYgw2XkCE1q1AokU0sIzH5F7Fc%2BfttETNU0BXOfDAItmiMvc8Cmdxeh4ACB065i4oqnMFLH4G2dvMeLpO67HNmCu3HSGM9lvcfc8S%2B6lMTtN5i%2BXw1prw%2B1rWrskNerkyvPvIhwjydEULM1pDZfjHbGAIvWMQ6pv3CWWOqwlOJYcmGVSbigXAeVw10lCnMT0JlQfqTzs2V76WlJJOL73GBYOYkPEQdUGuznA1KJ3borVnXJtQaMc76Uf0ollbjoMV5gNbUo1x0flNLzCEE5Af%2FWnZr8ZuMauzc9TOJjwLtXFRFKl6hU9sDoRcsW9q%2Fhl6HT9joAL8x0crcPlvzv0AXkliWANeUGojq%2BpRT5MKS3MlhTCOUgnjnlI6XUVHLnqo9eknb0VP5A0LNKS5z4JmF4ZAUBgcg7ZSUl6dIBCDolJRM3xyapUKY6xMkKdPfXH4oge1ELO3uLFwPTmbd1Ubu010LA11KWfVuAXoh6eVx4GVk84Tt93w%2Fh3hxbJbXfGaPTxRR4YyKSzDC0pvOBjqkAdlF3o1BseNEIqvXrxpZnkbiENteg6IS%2B56ea3VW22lkJ5adX7D50KlM9gZXCn%2F%2FkPdQ8Kb2q8%2Bx3k2q6doafAVEf%2BZbGyPv03IbXw46u3oURDSbW2plY3K5ZMjhwd9M85%2BI1aYz9uBfK3Hzr3lOkkd1RnOshoAjkKW5jjgCu5bGO0p62sFAlColf9Hd4zYqliO%2BpqukTchAm5d0wWbl1CaC2D48&X-Amz-Signature=79799a68fbfbe08e919b9504b96f35d563367d767f8c022bc069a57895462590&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VH3L7E4E%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T212251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQCNq9kExYVK1u3RrHUFOEdFthTIM2nRpZ3ErxdgtEhIuQIgT2g3FXKb%2FyBVsg4oSHf9mxxtAywfcoZ2TeD6GJS%2FQ5YqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMGj1anV1JGUJT0%2FDSrcAwWZx1aEbLid1USfzVnQhvLAe100%2FMyD7TkasuGhL55EtswBuzBoVc4efnr6B5ujgrcsDCXvpNiDqfssirnLHXQmaSURms1DpZnAOwGY4d4ukNCM3Q0p3Nsb66ENXCeJw0CqK8e8T%2B1gZMlz9Ee6NRTaxShgVrxohSUFY%2FYbSXyezVablfPWJVCL2J4%2F4C7AY%2Fa%2F21vzDdPx7YbYPstIXkygbeKO7KAsNdvVDk5uMBsZMSAN6BFNBd8lAOhz7ZNdjqUjBGE3L%2BZFgY8NoqiJwkMKhZGJuR33yeEY87yQusg6FVo3%2FdKCmtCCx9EU2pPwdbpkaHZO%2B%2F8TJv3J7veH62JEufzVulxHIDvErwj4B5skd4LHcCccWZbzeuYJln9ZFhlw1y2rfTtfupIKYxBg2PCOgadVd%2BCezk%2Fq6XvKK7n6jrk5pDjzgHSmj2gX6rwZ%2FSNyNqsXYO3EDH7voK2PzbTmZmq0PeJHt6UlDlIcq7WlUibsSexMUR%2F1gIBi%2BawoQZd1x6n%2FtuHaUzZzFe9JwNkZEYOoWxVqRASdAIclMb%2B6rO6EqxIpz5rYHMWDXgrMEZyXneP2JzrgdX%2BbvMlkdwip403RXiUGNQA7S9qwPVzRu1ea3Saj9VXhz2eNMI3Um84GOqUBbe6fTetkgSmc%2BeS71YjvIgMWqQ18ACSkkUBfTjm52QgKHu2oaYGOvi%2FRJxDnF579tPGTUPYnYGtPtg9G96H7qHeSZFQNidlIdP0IJPxGRyAuItPJ4XcM%2FKP02DUEjBISussmA39DF1I9hlC9VnMQzkMLBH4u2GFp9GartKQnRSdkCho9b%2Bjb67WfNVNCI%2B5v6KjaXJMqLO2%2FScM08dWRgxmghHp%2B&X-Amz-Signature=bc57396225e90ff899d8540a5e10a22a80f1f42dab6a376ec57f078affdd3d60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VH3L7E4E%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T212251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQCNq9kExYVK1u3RrHUFOEdFthTIM2nRpZ3ErxdgtEhIuQIgT2g3FXKb%2FyBVsg4oSHf9mxxtAywfcoZ2TeD6GJS%2FQ5YqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMGj1anV1JGUJT0%2FDSrcAwWZx1aEbLid1USfzVnQhvLAe100%2FMyD7TkasuGhL55EtswBuzBoVc4efnr6B5ujgrcsDCXvpNiDqfssirnLHXQmaSURms1DpZnAOwGY4d4ukNCM3Q0p3Nsb66ENXCeJw0CqK8e8T%2B1gZMlz9Ee6NRTaxShgVrxohSUFY%2FYbSXyezVablfPWJVCL2J4%2F4C7AY%2Fa%2F21vzDdPx7YbYPstIXkygbeKO7KAsNdvVDk5uMBsZMSAN6BFNBd8lAOhz7ZNdjqUjBGE3L%2BZFgY8NoqiJwkMKhZGJuR33yeEY87yQusg6FVo3%2FdKCmtCCx9EU2pPwdbpkaHZO%2B%2F8TJv3J7veH62JEufzVulxHIDvErwj4B5skd4LHcCccWZbzeuYJln9ZFhlw1y2rfTtfupIKYxBg2PCOgadVd%2BCezk%2Fq6XvKK7n6jrk5pDjzgHSmj2gX6rwZ%2FSNyNqsXYO3EDH7voK2PzbTmZmq0PeJHt6UlDlIcq7WlUibsSexMUR%2F1gIBi%2BawoQZd1x6n%2FtuHaUzZzFe9JwNkZEYOoWxVqRASdAIclMb%2B6rO6EqxIpz5rYHMWDXgrMEZyXneP2JzrgdX%2BbvMlkdwip403RXiUGNQA7S9qwPVzRu1ea3Saj9VXhz2eNMI3Um84GOqUBbe6fTetkgSmc%2BeS71YjvIgMWqQ18ACSkkUBfTjm52QgKHu2oaYGOvi%2FRJxDnF579tPGTUPYnYGtPtg9G96H7qHeSZFQNidlIdP0IJPxGRyAuItPJ4XcM%2FKP02DUEjBISussmA39DF1I9hlC9VnMQzkMLBH4u2GFp9GartKQnRSdkCho9b%2Bjb67WfNVNCI%2B5v6KjaXJMqLO2%2FScM08dWRgxmghHp%2B&X-Amz-Signature=2c51ba73a1bc4d14f1d9701012f92f1201d3a2ca9d4f6ff4f73e88bfef4d8bf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQEVSRZW%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T212237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQCguxbbT21qJxKgkmicRev742dPTpAP0Nxh81tVixCXTwIgeNCn20Sg%2F2VSfW2MdjpmdLeVbP6TL%2FYeMxEeQzKJ5TQqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEaruxHRboUetVq0YSrcA9eXOQW32kRB1%2BHzlqcANg9qUjSPvB0v6UaX44vpIhpRf6oz0FUEhmmDa3mHlc%2BEeTYRbIEtIYl7gUYqQji4mAt4IWJDn4ThQKoEqB24%2BJQIvPAnI0GvA%2FLsHQ0RLgbH5azO5gEfflfXUV%2FFIrNrYnz%2FlMog7S%2BuhqgPcxsD%2BPAAqUcupKATT%2BpdR6KyGcRVI8zxwwOjyE5XIneEZrahudSiBfWwvRbXCYXnNrABIBW2W98A4%2FCBx3iUdiMAhn4LOLh2QP10WWBglwn6MZv2ccDTKmIIq%2Bn0cOX03tgu3vdEzFnZZzyqHQc0VjGAEYAuqRrWAoRO15rtDLc9TdKi1G%2BnRIXxEFW5EsnPgZwLcGvn0DHqnYxrJ%2BoQuObWhpKa9F3GSG8oGH8JOPAIZgBPFJysN90Ge1fyzW9MHwbObFGdU7AyJR0g4p1fSvw1SkRDd8ePeNSQRDLfBItOOP1GmzYgNl4w88cfVPjYyS40IEJJjyx4LoBuv%2Br0sSAuZHd4qnP28cmOSLWkW0HMqqMfeERl5%2FUvxsjYCWtaMofce872VRR5s3ZBPyizce0TAAZBkyBMSAwqhz0tdRp2Kexxk2Vo9sqgPRke6EidMOHyRnP5YL1LWPVUepuHqBceMP%2FSm84GOqUB70MISQ2HHyBGktQaN%2BGtWVzNJGpxApzhctW8fZRfcKrzfNUfiBN5h5ShzMWqHB18tbqJNEpuq1dqSp3Mfj94wCijWvuAoNStGGzHmcwKYyzFYOrmNpgByInzFMjt81UWmFxbj0nNlYPehRIkX%2Ft57wez3F22zJrCVXuzn4zjKOTrn%2BAlTX8KT2%2FuM3acCHKSiDToaI4HQsT9brJdzabXleF27CsO&X-Amz-Signature=e81e79bcc6168500ab2a69fe008d67961fa9844bc19f450531738f93442e89ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ETRER5K%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T212253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQC2eMxlBklRGplfoJnt1thi3l35%2FIrM1amcYTK2l%2B6TKwIgaBBfpE8mQi5twYHCwFwSzfPUKKiJ7cibZN8LRQAwxYoqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEyMwsvwBFEDENWO8ircA9W%2BqUFYdnW0b5WNGxMI73qgZKU%2BevNorayeuFJVe3YoZpEq7Fjf2%2BAYhoh0RrsRfQdj8j1UgbP4%2B81Mh0YJvFKiqHWwA59ouMIP0U1RZUACAATVUGpvHLe7h9NLz8l8OLz7GCm9T49Yz6JgClhiqaMPwIifr32dlXToVHrEFZllg2pOpg2pRRZBw005d3dWBhS9%2F9crwT6%2Bw%2FI8ecGOy%2B%2FKb13XHJVCL5j7QfLbJ%2FufXBixZNj3nA7pkPL041MNvZ35J%2BmgeElC%2F0EFef090Q0csnyHYjaAOD85q089jE9RpzQ2zGc5aoqBZL7mhaGmxLAzjm9ak9x1kCaKZJ9LAH335ooKN4u9uL7DM42Bk68e7uCcTdAyYwKj4tDfze50gGb98fSv7UtilZ2Q6nYtBf%2FyveNzdRYsFovhtctGINLGFDKveirmvOrWgwsy%2Bla1fDvsb%2FIkmLFGT0jrl%2F7wvDLR%2BwXNrBbjIOI%2FELla%2BTRZPGF%2Bja4dT0g9vRLA0NTF2B2EtpumWeftDeN%2FqgyOBVGaF6R3wFHMhbdiSIOAjmybvd2MhPwj5yVemuktAObXGx418w9uZpFx4gehQ3vqNzHnOz83eYZvaPtvhMBxvrJBYIGfsZVHpHzhH0s5MJ7Tm84GOqUBrlKqp6My9t4TXi%2Fk7wY%2FPH3mL%2FQvH646%2FtNHTOFyZmDSenLLvUfda%2FRrmTqF%2FNFcB%2BbrzTkChpAGDay4Vsauu00YM72Jrk8cN9L3T4kgyoQfFe72A9YMfO0xNdtcjmSHA1HH5YqtPSEwJRNVOX5J%2Bom14NjwGhKSni%2F%2BBakzc6n6kvTOwTG75uVGe13k3Q53KNYPORY4MA0C1lMFDxp6g2fI5oWO&X-Amz-Signature=404e4cf1723e9f299e66281f4359aeedd5bddf0780083774e5cde8454eb9a5b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ETRER5K%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T212253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQC2eMxlBklRGplfoJnt1thi3l35%2FIrM1amcYTK2l%2B6TKwIgaBBfpE8mQi5twYHCwFwSzfPUKKiJ7cibZN8LRQAwxYoqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEyMwsvwBFEDENWO8ircA9W%2BqUFYdnW0b5WNGxMI73qgZKU%2BevNorayeuFJVe3YoZpEq7Fjf2%2BAYhoh0RrsRfQdj8j1UgbP4%2B81Mh0YJvFKiqHWwA59ouMIP0U1RZUACAATVUGpvHLe7h9NLz8l8OLz7GCm9T49Yz6JgClhiqaMPwIifr32dlXToVHrEFZllg2pOpg2pRRZBw005d3dWBhS9%2F9crwT6%2Bw%2FI8ecGOy%2B%2FKb13XHJVCL5j7QfLbJ%2FufXBixZNj3nA7pkPL041MNvZ35J%2BmgeElC%2F0EFef090Q0csnyHYjaAOD85q089jE9RpzQ2zGc5aoqBZL7mhaGmxLAzjm9ak9x1kCaKZJ9LAH335ooKN4u9uL7DM42Bk68e7uCcTdAyYwKj4tDfze50gGb98fSv7UtilZ2Q6nYtBf%2FyveNzdRYsFovhtctGINLGFDKveirmvOrWgwsy%2Bla1fDvsb%2FIkmLFGT0jrl%2F7wvDLR%2BwXNrBbjIOI%2FELla%2BTRZPGF%2Bja4dT0g9vRLA0NTF2B2EtpumWeftDeN%2FqgyOBVGaF6R3wFHMhbdiSIOAjmybvd2MhPwj5yVemuktAObXGx418w9uZpFx4gehQ3vqNzHnOz83eYZvaPtvhMBxvrJBYIGfsZVHpHzhH0s5MJ7Tm84GOqUBrlKqp6My9t4TXi%2Fk7wY%2FPH3mL%2FQvH646%2FtNHTOFyZmDSenLLvUfda%2FRrmTqF%2FNFcB%2BbrzTkChpAGDay4Vsauu00YM72Jrk8cN9L3T4kgyoQfFe72A9YMfO0xNdtcjmSHA1HH5YqtPSEwJRNVOX5J%2Bom14NjwGhKSni%2F%2BBakzc6n6kvTOwTG75uVGe13k3Q53KNYPORY4MA0C1lMFDxp6g2fI5oWO&X-Amz-Signature=404e4cf1723e9f299e66281f4359aeedd5bddf0780083774e5cde8454eb9a5b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466562OUERP%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T212253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQDPPzljTN3cSbeXxVIHtnee6QUvvDPGUx%2BI7dseE54jLgIgBzeWnSnLspG5EeLgNcC3CRZdELWr0QhTy0xZa80Rc0IqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDClKWZbvy44ZJ0ZQHircA8yrHFh3jqgd%2BGsWmEjiCiy5cqQ1nAT2i7eOgUKUWlNOHSaEt52Al8Pf54r76ddjZeU7qqF7ODXlRnQH%2FjU57NHTk9xQ0bIv4uK9FtsP1Lcap0IhkJnxz4tSw%2F%2FHSrMwhfI6C1gYsv%2BrIdzV%2B2jA4dYUThGObhik6imuvNPWnQ4%2BXD28u5BpvkBfh4SH3%2BynxyZQL9VSuD28CbDT6SEdpvvoK9YC%2FR2ANDs4SYJSihUP4X97fDfBtjuYPncCRVB6qQJk%2BzGx3kuDE9Dx%2FwIgkolr2VRwEKYEqxIgfcfiXyXOJzTyU%2BEzPAv1Wslne0fWskn2E4KKErwrEOHOQU%2Baxp%2FKxpbyGEdXR7tvpCIicjaXTPcEuXAKwpI6XrctQiRadSNYuJ70NchCo2SVbVCAAKxkmWK8UVtNqk4uduVDUBfXUokhKPKR9nqYPCuBB1D5Zj50LgLYOFrs%2FLudKbfsPvuwe4piPSidX8urI0SdV0np4eh8V%2B68hjP933nPcszmsr9ISZ%2FOws5tZ8FBRgSw5Zvym%2FmYDtIhed8ZHkTfctNs29IyT7FTzDyblnJlIq%2BCgcrjUcoqSDzpi8iPCyPnJJRVJhnkCWZzLPy6CIjjrWjUv0p3QqZjgYjd4YchMLfSm84GOqUBzt5hydpx9dY5DPqFCWyDjtSga58j4r0mb1xK0NQuIeRYFN%2F95O1NffM%2BPZGQFQJDmmHoLX3wzw4%2BAqpDbWdcQS2o3p%2BSJ9QmaealTptFjNu3rybESyBv8vRgwCz9qXVyybgBlqkHetWUSIclrVw5C9iiArcZZC5yJ7%2BruZfC69H9mF5giycvZ7sAdv1MT54powUt5cgwl7gKq8ZFpoqZ1Ws7zVjt&X-Amz-Signature=48f15ee7fc089d931389e7a473d00e2306c6177b04028835059f7aa663c38b82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

