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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SULPZLFS%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T092510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6hr6GFN8gKl5Hbu5TzHYmptoxXAHiB5j3BUvt9BAalgIhAOc%2BkrqxuCjXVNyGwFUBXWAb9Gqwk7eaklgUMiHIPtLBKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz68pg2qT3hQiF2l1Yq3AO%2F%2B5Mx%2FUnffWMEFMqQIUpTAkv5WivEjVzkG8rJs5Qq1soT9K33GDdg52BfcKap3zNL76d5QjfchJ%2BV4Qzfec63Jky7bvETkxmS0BUtsNa7Qi9AdzrmCv0sW4lqYw2ObuV%2B3sA9GqpRQcVAV%2FkEO99SwEgA186rMZnK2nCHMZARoskl9EfTy291iI9fBvke5Um43U0umlKi2ZzBd%2FlgETfcNOuifUHSsF4tTQNA6oFeuBnH1OymSsz8NiUWkSqXjUgFBjZGoZzO1dLl2c8E%2BXXDfV1k1pRBrslHR%2FqRQHX7MnWsV77fcD7OL5%2BBRqeEn6LTL1OV28%2BfTnfSb2rAwQuMsmt4xIWHWVel8MlGY6AXKDSUqMMQhTDCGoivt5EfDv2S%2FsZc%2Bs%2BO12aPf6bKxrsJOKgEXDCZ7owfczPlGXBtv6dZXcYZ03mH%2B21aPvHarUcW7L3EdVl%2BtnqTpGVL6Iqj6UQ5TaKqKz5sCgN8NMn%2Bvng8JRkcqtuHccG2vF9UiIkuyBpta%2BPLCkJIixlPHuENbpS7tzrSOw1mkxGHNvMTB1eF9R6rKPky4ixzV%2Brx3U0WDMvVndSTBsxViI5RWfnnV287Vlmw1%2Fov3OP6gYmQEM2O2P10MoXIWkFiazDpnsPOBjqkAcYoIR9o004ncbSKrlv8JKiYtzFA5hitG5C6Qss%2BC2gLLZPOjDvTcFMZHPLZgWhgox31Trjr6nVvUqiLNIA84PyOySojWT6Jh1vZXaGoShXIwVnU6NbkeepopqWaXLEP4R4Z95x2%2BHn1Wztxk3Z7Ld8sUOt%2FKXqI6pt5f6YRO0t84%2BYEy%2BaXmc6L4tqwTixFRIRGI1pazqd3OqHXhUVo63ZnHFxJ&X-Amz-Signature=a6a7b276b24ba1773f6243bf9e51988c6407e3b58dd9e67b5b01191f79dcc6cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SULPZLFS%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T092510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6hr6GFN8gKl5Hbu5TzHYmptoxXAHiB5j3BUvt9BAalgIhAOc%2BkrqxuCjXVNyGwFUBXWAb9Gqwk7eaklgUMiHIPtLBKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz68pg2qT3hQiF2l1Yq3AO%2F%2B5Mx%2FUnffWMEFMqQIUpTAkv5WivEjVzkG8rJs5Qq1soT9K33GDdg52BfcKap3zNL76d5QjfchJ%2BV4Qzfec63Jky7bvETkxmS0BUtsNa7Qi9AdzrmCv0sW4lqYw2ObuV%2B3sA9GqpRQcVAV%2FkEO99SwEgA186rMZnK2nCHMZARoskl9EfTy291iI9fBvke5Um43U0umlKi2ZzBd%2FlgETfcNOuifUHSsF4tTQNA6oFeuBnH1OymSsz8NiUWkSqXjUgFBjZGoZzO1dLl2c8E%2BXXDfV1k1pRBrslHR%2FqRQHX7MnWsV77fcD7OL5%2BBRqeEn6LTL1OV28%2BfTnfSb2rAwQuMsmt4xIWHWVel8MlGY6AXKDSUqMMQhTDCGoivt5EfDv2S%2FsZc%2Bs%2BO12aPf6bKxrsJOKgEXDCZ7owfczPlGXBtv6dZXcYZ03mH%2B21aPvHarUcW7L3EdVl%2BtnqTpGVL6Iqj6UQ5TaKqKz5sCgN8NMn%2Bvng8JRkcqtuHccG2vF9UiIkuyBpta%2BPLCkJIixlPHuENbpS7tzrSOw1mkxGHNvMTB1eF9R6rKPky4ixzV%2Brx3U0WDMvVndSTBsxViI5RWfnnV287Vlmw1%2Fov3OP6gYmQEM2O2P10MoXIWkFiazDpnsPOBjqkAcYoIR9o004ncbSKrlv8JKiYtzFA5hitG5C6Qss%2BC2gLLZPOjDvTcFMZHPLZgWhgox31Trjr6nVvUqiLNIA84PyOySojWT6Jh1vZXaGoShXIwVnU6NbkeepopqWaXLEP4R4Z95x2%2BHn1Wztxk3Z7Ld8sUOt%2FKXqI6pt5f6YRO0t84%2BYEy%2BaXmc6L4tqwTixFRIRGI1pazqd3OqHXhUVo63ZnHFxJ&X-Amz-Signature=a6a7b276b24ba1773f6243bf9e51988c6407e3b58dd9e67b5b01191f79dcc6cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644XXNUX2%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T092510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDh5ZYfjHZl5FjhSkXuw%2FswDqj9TerehcQGvzxbXKLBGgIhANUQ17mYVnCuDuJgzBSlN7XilOLq0GfNwtynkDo%2Fk7NMKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzQEiOUtBRJ0DzJG54q3AP2dg7wyWetS%2Fx4eTWrd85vT6T6%2BECvg7eLx%2BVQFtlz2YCD3LWf4gAy2UAxOPaaBdhz%2FavbXzQ%2FYjXRUmG%2FYcFSBU3Ax2sMYTWp9OGCCNiquTv05od%2FzzydzF4Pxx%2F60i0wwNrGJZXXnSMIkmkcyAf1SjWoV3exsK1%2FieqoVjkLEKYD0IIa9HfanxnmN4ESijr9rucRtTKUMqfKW06JRanfODfcwo%2B7o9AgzORNVJSbw0A%2F2i6O9%2FyCm7jG6ASFSD1CNT1A6SLBmN0ZtOHBJuN6VIYcYEPNMCd7y%2BHU2GxAL7Dj2IsQMyDemvIoaNn24aFa1HYFxqZL5IBveFrwTIdF0UZfz6E5urbocgfrdgy1kV%2F8E%2FPxUdYARt402%2F1Hv%2FzTCi%2BVLOLBclgNX7RVD4gq%2BSqnqtcefvwaZ%2FAhDXfya%2BQeHJAnvGDKdv%2FhMlpNlpdUl%2Fb%2Fdx6OaSfJ%2FoUDFLzbT8PJBhpRjywZe3pu3fOrDDGF%2FoP47pDTC5VjBsNDG7TvUF7en7ckysTc%2FhDKELSYQsGgyV3riWDksxGtZndYQzTIZ2FKRPd9TatwMYQw39yl2%2Be1VqnlEODNwwfpPsyCka4C8mMYomC0jv%2F%2BVkeOq%2FacSDP3pfZN7xC9PjCHncPOBjqkAXR5O48kJBUWxFkYtScxEEVB3IdJB%2B%2F%2BaTkmF7JGeH4UXiqIagaU2EhqoBTNdfLDuOhdToIclGEhm5zzIZCfpaJk8eSaXqu5KGBOpID54%2B2deG6TdwXcsweJngODK3P4cIl71nsOtv2w6v8Sry20YBr2q1ztja5rpWzZq35H61vqByzR86Vn%2FIQv5x4MfD7C2Ti8z6pG%2BZb4C786NlCZvG6ur1fJ&X-Amz-Signature=e9afe858b9c8ed1607580b6d23cd8d10d2d3fc92efb68119d42b708fe6321bf8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIU6X3MW%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T092512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFFVddNqYne%2BP1lhfI6fXrDFJ%2BsvcKWK1g4Z0RwYSNm4AiBS1AAplx%2FDHOx%2BxPNuHmyB0HRIcUmwI3qBeJP%2FJnV43CqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMaIZdhuaLEmJFOX71KtwDP%2BmiRW9jcVq%2FmOJ61p51MOKRVOdCzjTtf%2BnTd%2FrLVg9bMbxz3y3I3U%2BoxE3jOsVBK%2FnvmLrjcAsIJpZsOHt%2B%2BmdFbWaUJoH25EGhVQvnppG27qBFoC5q%2F%2BuxxtaxUh5As4EtitGaFKSiXpiJuyrTJGn6oqGzLEiShSHeW3%2B0tpFrB4nuiAToBaAfx2g9%2F0Dss0H9S3Iy0wD%2FmUCsYHeM71w017%2FeAGaYWZUIm2nzBjqyQoaZVfGHmTIIxHZ0hRAzEyWS8kyNiODtetVzA6Quhzj%2Fc0NAn9WxuFxoRvbkPv6aVXjOKmlLrcCGkvtNBEeBGhMnRq2tFvPykuZ7stWrLnilOAW2zEbiTAyd7N4wSvBUXp%2Bn012M079YAiKI226GInQw07KUXAEwiS61knAvwTh7y2NsfBisTXoqUCB4NJPMetZOJN2EOQNWM9VDod2vl%2Bsc%2FzQEr%2BRWBa3pA%2BMpgweteuaIQpqFEwNkZYzrMy1NZKUG6n%2BtR9i6%2Brq0gPc%2BvJS0QknRpcbGkg2Z67WYjrkO1bE6x3yKBBBvbdihH7QUQSk33IBzvMP%2Bm6yFk%2FztKtaHBvGr9iEtghEeiY9sKDiKOwifpUR3fF0s4bd4E5kNXe%2FFVfmyRelZSDow8ZzDzgY6pgFHKUfDtCCLVsVllZESDZRXGI7XftOjTXb6do%2FycVhlQ9U2v38QJaQYrRKuiQ3%2B0xiiPPwD2dwSfsC0TsPgbek6K%2FYz5f%2Bpjs7Fv%2F6Ywtlrjrz%2BHOY%2FCNtog7CBokVWsVJe5v8WVzI%2BBug%2BwXRBSymaXVWYHIDABJbUZT43EY%2BBuZGY7z%2BvhoQcwKGz3DudoSa7%2BrRpVPd2qejkzcFutLfKvFgnRmVf&X-Amz-Signature=a96f9b8f3b3dbf36357cb360d3d73911bda63671f2fb45133dcb98b1986e5f22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIU6X3MW%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T092513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFFVddNqYne%2BP1lhfI6fXrDFJ%2BsvcKWK1g4Z0RwYSNm4AiBS1AAplx%2FDHOx%2BxPNuHmyB0HRIcUmwI3qBeJP%2FJnV43CqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMaIZdhuaLEmJFOX71KtwDP%2BmiRW9jcVq%2FmOJ61p51MOKRVOdCzjTtf%2BnTd%2FrLVg9bMbxz3y3I3U%2BoxE3jOsVBK%2FnvmLrjcAsIJpZsOHt%2B%2BmdFbWaUJoH25EGhVQvnppG27qBFoC5q%2F%2BuxxtaxUh5As4EtitGaFKSiXpiJuyrTJGn6oqGzLEiShSHeW3%2B0tpFrB4nuiAToBaAfx2g9%2F0Dss0H9S3Iy0wD%2FmUCsYHeM71w017%2FeAGaYWZUIm2nzBjqyQoaZVfGHmTIIxHZ0hRAzEyWS8kyNiODtetVzA6Quhzj%2Fc0NAn9WxuFxoRvbkPv6aVXjOKmlLrcCGkvtNBEeBGhMnRq2tFvPykuZ7stWrLnilOAW2zEbiTAyd7N4wSvBUXp%2Bn012M079YAiKI226GInQw07KUXAEwiS61knAvwTh7y2NsfBisTXoqUCB4NJPMetZOJN2EOQNWM9VDod2vl%2Bsc%2FzQEr%2BRWBa3pA%2BMpgweteuaIQpqFEwNkZYzrMy1NZKUG6n%2BtR9i6%2Brq0gPc%2BvJS0QknRpcbGkg2Z67WYjrkO1bE6x3yKBBBvbdihH7QUQSk33IBzvMP%2Bm6yFk%2FztKtaHBvGr9iEtghEeiY9sKDiKOwifpUR3fF0s4bd4E5kNXe%2FFVfmyRelZSDow8ZzDzgY6pgFHKUfDtCCLVsVllZESDZRXGI7XftOjTXb6do%2FycVhlQ9U2v38QJaQYrRKuiQ3%2B0xiiPPwD2dwSfsC0TsPgbek6K%2FYz5f%2Bpjs7Fv%2F6Ywtlrjrz%2BHOY%2FCNtog7CBokVWsVJe5v8WVzI%2BBug%2BwXRBSymaXVWYHIDABJbUZT43EY%2BBuZGY7z%2BvhoQcwKGz3DudoSa7%2BrRpVPd2qejkzcFutLfKvFgnRmVf&X-Amz-Signature=e68a69e31325f0c07bdb1b83d5b29423187f58cbea174aabdfb5d30b0fa9d6dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUNKW5EG%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T092513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAkerlb%2FH%2FyP4Uz2FFHE%2BzsnHHWqPeicGsShRSk99YCqAiEAlmuQjRwDd3hErpz9sIzqM79FNjl%2BCHC9Ua7Fu9cskUYqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPP9E7NJvSjnPHAN5yrcA5fHYff5oTquaPktsU5oUcYumDPEtrR4O9ojJIOrs4jgBUo6bS1eVZNjIt2yDVsnDYezVy5poh%2BccOC619wJXDQFJhGvhgzf0e4P0LGF80vUIQJJyfcscoRjgCBlP%2BwkhEt7T5bznXwykg1jgznbje6cP19jthth2ebSckaLZPDnyzKsju6iNrq44CcK%2FRjm0OWCs37utUrEJJT5yg5Q5kuk3GTY%2F66EjgLVB1ihx%2BHp2syQlkI%2Bfq4eLlXiCGvlh28lNbz2CLZT7SmNK5pu4w7Fuw3%2FLa0fNi5JR2DYRQK%2BqfxMfbLwJCgaLfxWCYqBWRxg%2BohCJFnGiUSjm%2BznJ2PKWjJhLKdUKH9F3y%2B3%2BGnachg2K8lIHpJk4klaQ5FhIvRmPqDkxaxCiATRNFID3ONy5XsAZODZruE2U080yhRfU6f7jALLLNkfNcKxS%2F2lHRxwaZ5HInNLahjuD9NGTkHefoqsKXIufbfjEp23oATeRI0%2FNthcAw1F7%2Bhrs%2FCb3KhP7np%2FOoWNGWFIdBi3LkOhluKs%2F3iowM62LyvL172yZg0vbQJBEtV35JC0a9ak6ZRnwZN7Z2JE1qLMuDFbonwah9Q0fH1%2F3l5B337DukCmwJ47lU%2F857azK4rcMIKdw84GOqUBz2SPkbCpwlh33mnMqQWbrlSaE9pWhWUYZ%2F84eAcdkH1izyXiJoQYBnz%2F1SJyhaXJwCXBPI%2FlCa7L0IxvtTWD1SMuyd7k9YSyq8JHOFhQ2s8UVcwJ2sKmyAuf6bUOwu8OHzOdD7jEbLzjug10uo6bmGEI0byyPVIDwoqL9YWI5ZKb0JmajKrRqtvhPh8uxakk1xfuy9JmwoSH3qvpikIhAdvAtu6%2B&X-Amz-Signature=c0c0f1e9bd6b37da6b79e691a58a1f5d2ab75b18308419b8be393bd2ac5118f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZCIKZPU%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T092513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD3yb752uB%2BZJPDG%2Bo1cdSXwLj%2B4latHk6zp3so7WBKHgIgNRYLXEk7zV0H0r1sGTV4IALnefYw5KHoonGB1qI0zhAqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOjk9UnKmKIHNArS9CrcA0tJWWUeNQjTHZxrQ%2FqX715tl4b8DdObSCgs6X4Smuelinz6mc42n69jpJedMRnEMltFWVVrTEqDEC1lHegcCzg11gNGHbF0LlSsdPRNcn0z8the19%2BMwxDoh8jUII%2BM27lKPeB5aozjub1%2Bv4Ix8avNwAMKf2APsNt7RBWOHXDEAqC799Yg81e0c4v1tsGquSieK9tIoy3927DIKmn4NKESDd%2BqdFrnWewFmUBZ4XgDbEq1FrN6nCGWvTcQBK10xlhfIEOBX%2BdnBBUPmR5YhxgIRGa9g0gV8iSUQN4G11%2FrC%2FwJUehkhXkzTZv2gBUvUuI9DWQbb8p6DC6aZK4gK7xT8XvdX6EtsNvCOV9knyrM8KW83ZHAB3iR0C9jJDfslmk7F4JEmUzXlVE1NCbmaY5o7WxN2YNRObsY8HXV0E30yE9kl%2BewvYURo6TxayhBI3LT%2BHkgdSpCsTYaB1iYtA7%2BfIpoUd9qol7uhhYjJFrOSwAp793EFWzxbbqyCHvmolgo%2BvtAn5lPT%2Bp7HhODbzPklfUj66ttkgzWepEjb4wXnLfQiNA7ua%2BxB4KCWxnjxZn9qbgaiRdwmHkvubDu%2BokVth669RdTCKr0Reg3KnGXbyIW6%2BbcKe5BaT%2FSMP2bw84GOqUBWzvzlqBcRCupEOCPX2eiZpG4PNxZ1%2BrGLn1pTesMxfnKLKS4shyX4AmmeLxZjXqdR1t7w7w4K0peo1PUq6MValurnaCsbI0Y3QBZ%2BnClGp%2FSaYf3c%2F77OerqEvel0IoBR%2BCF2y%2BQsedeEOO%2Bp9oCHM3oci%2BzgLH%2FALcZ0LqD%2FzrArPcka6%2FlO%2BRi8hKFcuTzVQmPILW5i2NFInFGSKEMpfED%2FIb2&X-Amz-Signature=a82e0192df836b5ac5ab910f2b908418c6589eeaefe036812b96db1363694258&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUOFALNN%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T092515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEC5ZIp2IxO19Jy7P%2FbPE9tUBoDEYEkI%2FySjSYVNqv3QAiBpodN5oEU1%2BRwLRuJezudHDPqQaMqY6HXlql%2BIzEZKziqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMENwLcXeC%2Bgsuy7%2B0KtwDs0CzMrSO%2Fyu%2Bushx6BnO7UBTCYS5IcmVvIRw%2By7DPwj3X%2Flq51ZNBctUWsE172MkdViz5Xm5l8392lFs2BZbEUWBs7C20k8Ce6H3BEbbDCgRMkDMjovrtnrfAqOFYzCTrGcTBkriZz1ou%2F6aJ%2B1lPiYGjTs%2BdXe2tNptSr%2Fav4nc%2BDfXag60jFyH5BGlGa6j4sE4lvs4jzoMENqTjNEERf2Lj3p8XCiJoNhVL8hBI62yx7O%2FqC1DOw8zr3L75WHMM7L72cmAidxE8UAzdSJplaXM4qUeyG3odeKn%2FzgVZz8rr8rRVDxj8CwnCpb3gM5qmgVmLRY1BMLEk5WBMK2tGv%2BOIXpzgMaXVw7eNJ%2FHzzDcv4%2F3iP%2FkYdZaT5pwFRqs9gFlU37QkQUak9I2ybocbcWdszfgBEswIaFMTUbrEOM5akXZxrytzIiEa0dHGmw7dQWfURx1jRVXYN96Y%2Bi9AUB9ZIe8ewT4sGAs1%2F02ytZ05vTpKnS4QUlqb3aZvxYMs78kkzcSRuCs8H9DMt1mNkQaC01SAcJ0CuZKl3XbelPLUADdyumY4%2BbbJWITkyifFJ6pxzX5loP7K7dd2GhreuwwQ2PEGuYp8EBQcVxfGuYKf5J9MS1XavLttTQw3pzDzgY6pgEDdOpFZXdCiH%2FYa3e1XVYRHkO%2BfTF1qc%2FsxoUeXCSZTTdEJXamc%2Flx5UN1U7VGnWRJgVdDEGkZWHpmd4f05sQ5GVxcFJ04OpR9n1IoLyEZxLRidR18vZ6TWIxsMT%2BqBiU6ngaTocaqJUl1CGF%2Fb0nM74bQsdFnk1kOAg%2F9xPO84F0O7Aht2romX73DPf4Hg07Ck3GGPJ%2FdK6YulMdqQaFLPaWAsb9i&X-Amz-Signature=5472e31712ee756fbad9c8b09e0b4498e56b697135e6f0c3cdaf1120a1d81cf7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4YI3TOW%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T092516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFpdQQEEF5WAxhiTBZV5CM%2FqieWyv6aBrUjMZ%2B9bKz1CAiEA0%2FaUJ%2B2jie3Ti9JEogWCdcpSjh3YRF%2FkpE%2FwYYCLegkqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI7tjAJ2RUvDBmYN2SrcAwZspcrVMDozO2%2F%2FqACncXWeaF7MrY3Ly9l1ASs60VE9G9zYPLM8b%2BUb%2B5FbPrXngRZiQpyZ42KIjhQ4GOXJ6sgrXcmCvYEQyb7NaMUh%2FPQdOK8WTQeD2s8HVgVavWPqUTD%2FIvro73aLKr4TsR3TNjZB2SKG5dZq%2FUDdCfgVjtC0Ob0j8%2F2UdPKs5IPP1I%2B2SevS4f0%2BQ4mC5H2X%2BsEzJqpFN9cfsKT619k3UWL1scrJpMibJXhrnme3RGXhsPSzHDefsq%2B%2FXycUexxNyCJU8dDTw7SBA0mrQNghww0kUaH6Dn2te3RZjG%2BlxWnscuGzrs%2FIhAiypdbBGQGmMtuMUiCgGr1KEoj9dpkX2HOPOxpL8s%2FuVG5Ux0Gq%2FvoYPxr8kFzB6HYhL3W%2BEcqdoBU8siuuKj64kWpl4IvGToUv3XbtYIC3a4EfvWuPumrHIdN6wdwaKj%2BQxzMqtrKPUbu6AAETnHlmeSp2gOKnFWOew8hJ0PG5N9EluHlUSxpwiiAmpQdy4BYmhmYgfS3kF1DAm7oeRwlaE4jfXRsyFSWsDPrhHbe8RCfsjAkWa2eMl4rMmy8OJNeNKNzUx3fRIhBEEWnms%2FG4EDWUxC1iEtQAwlWzFCnXsGAt%2FJQMUfBmMJefw84GOqUBl1nhX3O0gBQrmTKskZlQ29yiHGRvSQpb%2BXgwHMhoTBN6cWX%2Fw2savrldBElYlgptt3eS658rLgxrwVwmyAyursre97ernBfoGz7%2FWjiD0fQSxjllXvuc1C8mTnbpRER2HebOAoDsh1C6EsOAvPiQscT1JwrXdwcg5x0TUIAvTkbZpZJlP9x%2FKuuhQ8Re0AekXVZaMj4CWPcVNO1il0mDzH3tMhqZ&X-Amz-Signature=a1e99c8c0b2850c44ba2087d715e986c492e104bd87a7e96a521fd2c9e1d4c81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4YI3TOW%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T092516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFpdQQEEF5WAxhiTBZV5CM%2FqieWyv6aBrUjMZ%2B9bKz1CAiEA0%2FaUJ%2B2jie3Ti9JEogWCdcpSjh3YRF%2FkpE%2FwYYCLegkqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI7tjAJ2RUvDBmYN2SrcAwZspcrVMDozO2%2F%2FqACncXWeaF7MrY3Ly9l1ASs60VE9G9zYPLM8b%2BUb%2B5FbPrXngRZiQpyZ42KIjhQ4GOXJ6sgrXcmCvYEQyb7NaMUh%2FPQdOK8WTQeD2s8HVgVavWPqUTD%2FIvro73aLKr4TsR3TNjZB2SKG5dZq%2FUDdCfgVjtC0Ob0j8%2F2UdPKs5IPP1I%2B2SevS4f0%2BQ4mC5H2X%2BsEzJqpFN9cfsKT619k3UWL1scrJpMibJXhrnme3RGXhsPSzHDefsq%2B%2FXycUexxNyCJU8dDTw7SBA0mrQNghww0kUaH6Dn2te3RZjG%2BlxWnscuGzrs%2FIhAiypdbBGQGmMtuMUiCgGr1KEoj9dpkX2HOPOxpL8s%2FuVG5Ux0Gq%2FvoYPxr8kFzB6HYhL3W%2BEcqdoBU8siuuKj64kWpl4IvGToUv3XbtYIC3a4EfvWuPumrHIdN6wdwaKj%2BQxzMqtrKPUbu6AAETnHlmeSp2gOKnFWOew8hJ0PG5N9EluHlUSxpwiiAmpQdy4BYmhmYgfS3kF1DAm7oeRwlaE4jfXRsyFSWsDPrhHbe8RCfsjAkWa2eMl4rMmy8OJNeNKNzUx3fRIhBEEWnms%2FG4EDWUxC1iEtQAwlWzFCnXsGAt%2FJQMUfBmMJefw84GOqUBl1nhX3O0gBQrmTKskZlQ29yiHGRvSQpb%2BXgwHMhoTBN6cWX%2Fw2savrldBElYlgptt3eS658rLgxrwVwmyAyursre97ernBfoGz7%2FWjiD0fQSxjllXvuc1C8mTnbpRER2HebOAoDsh1C6EsOAvPiQscT1JwrXdwcg5x0TUIAvTkbZpZJlP9x%2FKuuhQ8Re0AekXVZaMj4CWPcVNO1il0mDzH3tMhqZ&X-Amz-Signature=b28182f1f1b854dbdd3e4d6886b1f2f4b6a1d6793bd41b327a14ed5394083cd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IDZ252B%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T092507Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDx4CBq2j7eM2R2fS6EtX4M3%2BZqxkYr%2FRN7grr1wVMHRwIhAPE3OBl00MmJx0XXcA2y49JPBhLyPrNg48YXN%2Fm%2FZ%2BPlKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxwPni42q8TTfs9TY0q3AMBRBH5pRfnEdrx3IikcNFShQyIJqm%2F2cTW1ZC3%2FolbiX7S7AxQ%2BgyxZxTMhddnxodIHG4O6%2B0bkOVD5A%2BRZ13ScJT%2FCpNV9dTXNWVeZkho3PICSKGJxIEYjIacU%2FdghZS4Bxtxcnle%2Fto%2B8gLFMS8K2hDfDxx8IIzVjYMvL%2FRJi79RLJDPMgOClCOgAMZJPuupx9cGks0MDkUO9eKZi0ZAVd%2B0A%2BLd4%2BnoAO9oYJmp3IX8iTsxtOC%2FvW%2B8tzweUlZ45dftkFo3FGG99%2BggK7uC81mmrtzqzNPCVrpTXN8kQpK6A6UK4lpHBWu8lTSIWENEaKj3%2Fb4uzVihHW%2FGFVXGtbf%2FdnN%2FlOEG0UUtSduyWoV3cxQrkt0uaDiTCRbAa1B93fnRrgiIo%2F1a8Oq1SEwwgV755pBlKr7OrPRPZ%2F7R4mLRjfWrklGdOmSXTjD0q1WHOx2ce71DmtZgFbV0i59OP8T%2B6v60%2B3rwEq2JX2wZeQPpMHXvGxOvHwzOebRNS6bPiW%2FeHs9Mhb4e4qVdjWWXD6NWF%2F8a2IMGbic3fsWkBX0buIwSBpHHP65bp%2FrZL5cait8LkP5FW6%2B%2BFfU8PuI%2FQSbiypaGtE9HJSJt6K5vb0%2B050SASz7UU9VcWjDMncPOBjqkASfUsKC1gMaB7pBPUHio%2FCRrRphUCq4K3CmcH%2BYG5zILx1Tpw1zPJUnIh7tnY7kIeyXsofaZ%2FiybZffydCu29OZjJN21DDH9I%2FnYiYtPkyh8WFd8nwHA7kYJ%2FroE9W945rm%2ByR2uC%2F1Yhxa5VE5XqgruU4UeIA6BqnGlFfU8j3y2nsc8cL6W5w1c4LrXhBGoFANQZpJklJncRck5cWkX05luT2hw&X-Amz-Signature=b139df253ac6cf4a19ca2ac367b22457803ea1381464ab8cb5ba25f77462885f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDTIQDBL%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T092519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDFdop%2BZZxTx4gdBk%2B2P40ZRAYKoLdq31eu3QGx9ZDiBAiAkl%2FdXqsCAU4Emat2O87GAJy7wE1Sm9ggds9%2F8b7FEPiqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcAZd7f5QRbraTWoZKtwDoVCZ4Yuuj85dklSo8isFiqgTA6MsDlq7yy0yYpzBoghTnLfylRoW6w3MuwAQ9rWPtkfrxRjqIUJoax7Ki1GTs30QsMOfDyrO3GgGl8uCwRg2tQjmhGZxfrGu6twYdGTibEeRvK%2FHZcTXMInLz4wb4bynBbwx6tSg2boOPnFBbMRzhL0ynpmHzNOMsZGfizT2x8PRQgTaqLsOxiAT8equbP1SHOHfMnilIiLx3DkQcyVyqrjGC93ovfbOAWuLkPmJzUUfdLQALPeERZcaS%2Fud3VfGB9ggOC%2BWfvfu5wf3dvgb4umH47T%2Fht2%2FphfO1Gt8%2BSeADgqg908ja9GYYM20Qm1hyN680mDhxxFQwYbkvl8fq0ok9Iw%2B8oE2FYw7dpUBoj0PQqLxBAIpnt1puo1U3sakf2forSDq3x1fbP1TYXqxkZ0ZW8t%2FudtoqWxpXfsZYV0qSxzST6AIX6gtVUvihqloBofUig8PCxRsCAF0eQ6KfbDUX3APLq4yhV3gs4XB0dNpq67y5c%2FQBOmkSTOzunLj1AOtLoCmucqzolxMYzuHrOiXKCzKXC%2BVK557TOk8DRkeb604lG0whCPRzbpsU0qgW4%2BV0oEsPO%2FCKQ%2FnCWsSVuKrlAaHyWWuKP0wn57DzgY6pgHXjPYMwMsiy0F8B8hM8wH2n2zHuXdxQazKw91wLpjD8YhbVNN7FC0ULQDvmqjbrYsBtI4w3AX7CGEOTacOm%2FUdr6dSWRBV2dWPNOKuw3STxHcgxI43gzBnn8JQ5%2FOgml0Dq2UXKIECYTPf6T0kyf%2BGoCYEgEn7XIo2a4lEWiyM3eIlUTuF3XRaiMScs6Miu32vjr4uosisTCTPaI2KnYaN37ehfxXL&X-Amz-Signature=f56f5e8603cbf422ad634a1cd765155beb9e5b4a2a4a065bb8f83bc57bb1b6a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDTIQDBL%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T092519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDFdop%2BZZxTx4gdBk%2B2P40ZRAYKoLdq31eu3QGx9ZDiBAiAkl%2FdXqsCAU4Emat2O87GAJy7wE1Sm9ggds9%2F8b7FEPiqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcAZd7f5QRbraTWoZKtwDoVCZ4Yuuj85dklSo8isFiqgTA6MsDlq7yy0yYpzBoghTnLfylRoW6w3MuwAQ9rWPtkfrxRjqIUJoax7Ki1GTs30QsMOfDyrO3GgGl8uCwRg2tQjmhGZxfrGu6twYdGTibEeRvK%2FHZcTXMInLz4wb4bynBbwx6tSg2boOPnFBbMRzhL0ynpmHzNOMsZGfizT2x8PRQgTaqLsOxiAT8equbP1SHOHfMnilIiLx3DkQcyVyqrjGC93ovfbOAWuLkPmJzUUfdLQALPeERZcaS%2Fud3VfGB9ggOC%2BWfvfu5wf3dvgb4umH47T%2Fht2%2FphfO1Gt8%2BSeADgqg908ja9GYYM20Qm1hyN680mDhxxFQwYbkvl8fq0ok9Iw%2B8oE2FYw7dpUBoj0PQqLxBAIpnt1puo1U3sakf2forSDq3x1fbP1TYXqxkZ0ZW8t%2FudtoqWxpXfsZYV0qSxzST6AIX6gtVUvihqloBofUig8PCxRsCAF0eQ6KfbDUX3APLq4yhV3gs4XB0dNpq67y5c%2FQBOmkSTOzunLj1AOtLoCmucqzolxMYzuHrOiXKCzKXC%2BVK557TOk8DRkeb604lG0whCPRzbpsU0qgW4%2BV0oEsPO%2FCKQ%2FnCWsSVuKrlAaHyWWuKP0wn57DzgY6pgHXjPYMwMsiy0F8B8hM8wH2n2zHuXdxQazKw91wLpjD8YhbVNN7FC0ULQDvmqjbrYsBtI4w3AX7CGEOTacOm%2FUdr6dSWRBV2dWPNOKuw3STxHcgxI43gzBnn8JQ5%2FOgml0Dq2UXKIECYTPf6T0kyf%2BGoCYEgEn7XIo2a4lEWiyM3eIlUTuF3XRaiMScs6Miu32vjr4uosisTCTPaI2KnYaN37ehfxXL&X-Amz-Signature=f56f5e8603cbf422ad634a1cd765155beb9e5b4a2a4a065bb8f83bc57bb1b6a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGBPKRCR%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T092519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEDYTqkmKHIWWWyqTqcHKThK83pKTkiwjOTPJajplgHvAiBM5iRBy4ENV24bkoXm4wChNR1srwIXN9Oan9A2LFOXryqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXsr5XS3b1TEdJA3NKtwDInNHMY5jrXKXdU2P8%2BBx2qztT5A8a21x74ViIXxBGQaTbph89fB9bEQDmavPUZ5q7BBs7KTPnCsyasIr6Mnxwk8EQfxLuVVKDoafWk5yoP3lLyLeLVbITQpovn9Qx7iBstNu2xpT58AhKqbESa8lCNXOn%2BuBIN3CZBgdL2xj3bU36t%2BJp2Cu%2BbEWrbkmaAjfz3gL%2BK5DNx9mJvbSscl0%2BB4IUROfJz96XE%2B2lg8W5X%2B0SQU6EW3wB4uGrBmq%2BElp1mScRiHokm%2B9faSkGzWoqJq8Cq0TSYsCCp63%2B1hFfcgjOzLUCUegE93nsGZvrI2MKkSRlHGl5FdqXPeK7glY6DlYlu5sXd2rNJCUPdboT%2BlHz%2B0kvtIsjnIp0QE7B8NYBd7ZwRTi0ZcHA6fdjUMrHeXjI8x1fBYOAel4dtPJy%2BUDDb%2FX5wBUN%2BtBZ%2BadOUFzaXilHAQuwjN4cLyvPAjrvdi5E8H5BOFafpCfB7FvWITihjzyCDif1pbgshZ9ii0v6llnT4fmu3BH%2BYxz9pltiiLd5JsR16R%2FAIuKef60j72HWxkAKfqHudxiqg6vsNd8NvOHS%2FRFia7a0%2BJZesInKc0jbgLpAfRVWz7SfgAulhtZJFtwzj0ZNfi3%2B20w85zDzgY6pgGuPzyFbNapOspGhhzYW7QEyWvbCxb%2BZEPJ7vozAYKowRVsnEzaJ4GoWC8mGJHhPoqjT79RAhrP2Ru57Cr2dBGi11E36kWqaNizDRz163BxlgxL776VW4KGHx%2BNIOFdT4W3%2BRb6NdaNrx3ELlUUFHSwMoLwNS1TgJ2J3GJXxuK3G1YTHmbdxrN%2FSd0WkrETjQ18chHZqsZs9qcAYBIUbNcna2KSnkNd&X-Amz-Signature=ee5d6992e15e4c61d83e834a412ae9ab389c2a5b447a7e4fa26bcd15d0506937&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

