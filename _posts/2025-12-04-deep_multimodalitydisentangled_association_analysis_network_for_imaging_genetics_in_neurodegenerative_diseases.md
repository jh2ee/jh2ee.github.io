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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2WMRW4I%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T112047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIAfHnQceOWKZnhLwV0UkZhSxaB1ETY5UlCdkk5wX91VqAiEArp3J%2FKTlq9Q8Fqruzctbr4AIesGtBiRJI7QGzQMSF6Mq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDGIeib2lr04aeheMCSrcA0J%2BIXyitamCujA2to20rGoRG%2Fx%2BPfp1dtgyagx39Yq0EVrdKNmLmhBLykZ5ooxjXCSEK8D7337QSzZ4hp2ERDCLflqxOBwfsbyo1ejScaYvp4GFcH6tNCNhvHgNPxQYnLE9ukaU2wNj2zveL8yZuwX5ETiSJrlKJD5GC2toXNq319JofLeMNU%2Bu3P3XmPH1PXoaRmfcFVAVpCIaONpvfROdjfs91uaAkpBcjKopfU7GXTRQg9n2NtsQbz9JpetbcRv14MjE6lStK5Kf%2BuRvtfqrQXZe51jgBGbtEEzZMxp9XTaZQEurndprd3g5auyG358h4K0HVunzjfHDBBprrx7FibuQFHNNrF1wWFfTWloKQwNIuQhk3u9dIVquNHpzFtIgKN5y3x27GQih3LqiuJYKcurRFrLjOt4wZ6JP320LflZVbWgqwSLmceZw0oznNeq877MvnqCCbXDoMcuqndpRjC5c1jbJ2aCg%2B6TGDEl4uRrf9fVbTjBr6ScPX1EXU9bHmDe4atH6ZjxECywhghQGTd5afzu9HxD4V1ozEJem2TT6bBla2YzsA9%2FPmV4DtKJazWqdTJ2o%2BK%2B3%2BnIo6jMM2JWGKGik5XrbmZH6Zfxtqu%2BcvA0ZaNs0gpdBMJq%2B9M0GOqUB0wOVlQPpK%2BGoiBg7RUVwrYuEhc1TxbEMyIth8kpEqva%2BRjzXu8qY4QuC%2F5F%2BgDeNY6Rvz7wtTffO3s7ghiO7iDBypEFbjyUmeGe%2FwnIcdoKVfNfcTeQzKxtffThG1xzBCgnqEXRRm5yiAXt1RFwTlzWFee%2B25KKCiISeiHryzkKjBQ9eLpM88gd9hypVywXymzn1RCJadE87blNEeIKa9uzrZyTP&X-Amz-Signature=59fdab03a4eb845960e3c01b5218a8dfef6b8789a7d3a768f79dea545fafb2e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2WMRW4I%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T112047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIAfHnQceOWKZnhLwV0UkZhSxaB1ETY5UlCdkk5wX91VqAiEArp3J%2FKTlq9Q8Fqruzctbr4AIesGtBiRJI7QGzQMSF6Mq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDGIeib2lr04aeheMCSrcA0J%2BIXyitamCujA2to20rGoRG%2Fx%2BPfp1dtgyagx39Yq0EVrdKNmLmhBLykZ5ooxjXCSEK8D7337QSzZ4hp2ERDCLflqxOBwfsbyo1ejScaYvp4GFcH6tNCNhvHgNPxQYnLE9ukaU2wNj2zveL8yZuwX5ETiSJrlKJD5GC2toXNq319JofLeMNU%2Bu3P3XmPH1PXoaRmfcFVAVpCIaONpvfROdjfs91uaAkpBcjKopfU7GXTRQg9n2NtsQbz9JpetbcRv14MjE6lStK5Kf%2BuRvtfqrQXZe51jgBGbtEEzZMxp9XTaZQEurndprd3g5auyG358h4K0HVunzjfHDBBprrx7FibuQFHNNrF1wWFfTWloKQwNIuQhk3u9dIVquNHpzFtIgKN5y3x27GQih3LqiuJYKcurRFrLjOt4wZ6JP320LflZVbWgqwSLmceZw0oznNeq877MvnqCCbXDoMcuqndpRjC5c1jbJ2aCg%2B6TGDEl4uRrf9fVbTjBr6ScPX1EXU9bHmDe4atH6ZjxECywhghQGTd5afzu9HxD4V1ozEJem2TT6bBla2YzsA9%2FPmV4DtKJazWqdTJ2o%2BK%2B3%2BnIo6jMM2JWGKGik5XrbmZH6Zfxtqu%2BcvA0ZaNs0gpdBMJq%2B9M0GOqUB0wOVlQPpK%2BGoiBg7RUVwrYuEhc1TxbEMyIth8kpEqva%2BRjzXu8qY4QuC%2F5F%2BgDeNY6Rvz7wtTffO3s7ghiO7iDBypEFbjyUmeGe%2FwnIcdoKVfNfcTeQzKxtffThG1xzBCgnqEXRRm5yiAXt1RFwTlzWFee%2B25KKCiISeiHryzkKjBQ9eLpM88gd9hypVywXymzn1RCJadE87blNEeIKa9uzrZyTP&X-Amz-Signature=59fdab03a4eb845960e3c01b5218a8dfef6b8789a7d3a768f79dea545fafb2e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWAS5V35%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T112049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCOHf5%2F0aOtBJiCF0o6HWaQw7EGuRf0Ql9JMCvXZ%2BIOMwIgaz5X2k3d4qD%2Bi0v9hmQAJTBxeNEu88Z%2FCB7oz9lwZ9wq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDGy3%2FGefF76H1106%2FCrcA5X9jm%2FlrOX7wgDLut3J36%2BM7GrHjvLNl6PLr4YXNJDo6tD08v46QaF7iCvH0EVg2uRqQ71lcHS%2F1QuaCMI4KXHLCMx%2B6xuh05GZ10qDs6kY9SBRong1FDYLZ9SRbAXXMv3RyKTCm1%2Fl%2BQGpv%2Bv4UeZ7wo%2F8Rpd%2Bo32XmLpAZmGq6zX4h%2FqPY6EaFT5ddgRa6Kx54%2BbadRwZc%2FzUkOcPZuquOf4qIehRdTUuf4OPu1RwuPDaVOFD9wwQSzAS6ke2scv7u3IaN9bortkjYoVDkJ7D%2B%2BoJzfI8%2BWb9Xjv7%2BympDhwZjm6WiTCwkvgZRzmJp6eS14z%2FoQd1hXpp%2F8R5G4RBFyNNFLXQ5EQKOSMSqbS60pGNOx6ufUijKEL5tucHO0OmvOjNGp3XK93mUKKSMVDKhevcSUEmvAOKBz5xD7V1KrJ%2Fj7n8jBUkQSpPxorYR%2BOmSNlzcQ478oUo3zK%2ByAa6WKYZUwiG2UE2YF6YkVbZAQ71oxpT%2BMcFOCqxPT5asY%2FH1zde2uwrI16TlhNy67K0%2BMQuocK4tTMT2tOv07ml5nywSB9ISszCNKiyEYFAOJ%2B0cqIXv5TCo36%2F5MQjcbjkhZF5fPtnPC7vLxZQiLkvL%2FntLPLSPIznFGphMMi89M0GOqUBW9ID4oY28tJbB3cpAQYQg0a%2FMN9hv3f2EfQXe2ymN1B%2FcRlnFURQIVO9iqyWSX3CKwjt%2BcG9sHTIBbYpuI2lJ%2BSuuOTlR5HygdyW49ODfUpU7uc7S9q%2Fwslv9DUgZqdaH20LjRiSF5zMUSas0HYbFXN5wJawMaexAaaCbDGUqdA6Xxr1NsoAOeC8wM0WAh3zi4saDQnvWcbTfF2d5IUx2pv8xGL7&X-Amz-Signature=d40faaf7c6e973689fb28391c7c358277dbbea1613bc6d8d076291ddf34c49bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHZUPMUN%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T112051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQC%2BHnHNAgYUyn0ul9WjNilh8MhM1HpwqwNr4%2BSEPezfRwIgWOuK0bmmK43zoC7zmy2RQF3gqugN7CxjM5U6buCF2hYq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDFTkq4X3b0KStEVQhyrcAz4ZGqrH5sZFx%2Ba%2BBJ4HNVAOdzkU14YSL22TSzs4KMEsHGEoT0xNN8gbf6JTbq7XUBvK3JC%2FUWr6cQiB%2BUMWkAVLEy%2B1F%2F4woQG%2F6Ilf57RdOEGZ%2F6ewi%2FlA%2FnmcN5vJm%2FBZSTemzrozlqR5xURbu1NBmgPqn7Gig%2F7VYK2zipsMURMwJz4kX6ryhzP6AiV8GkksXjMKh7jChgTUFrvhT0%2Bh7wCu3RlCeAGR6VcHHUQPii1n0vfyKBiyv%2FeW%2FcF3kb6e7xVX%2FnR3qFPavv7VIxRNVH2CBEz1%2B%2Bxk4rcnvE%2BneA87Jli5GCPEmNJ9YLytMGAjRfBSF3c37LiJ5rjscexRH5ZJnMg07nxBUccCO0VDREcTyEPyn%2BROJpmjACdUpktuIzEHcfYcxYh27zShxZ1BTQp5W%2F2Ureku%2FAwLGU%2B%2BIaRtbzqAuK1IBBwH6yLGzAZ7dFiO2ldnmIagJ9vdveR0W2PAT4VW47m75TFXvgSQhV4ShMLGhpEJmqvAeofMGWE0KSZ%2B8CLo5ymcMjfAdsXJJfW3HL6qvfz6GxLhfPWAavu7WXRNo9mcWLtgtV%2BRC65%2FqUVDzNgmCRaWG%2B5n99G%2BHaDB9LWuezKa8eMBvL2LWg66Nbg5v0CaoDb4MJm99M0GOqUB9cwToYi8w9ZSDNzZIWmF1Ovjfh7Vp2VdwbriX62taujZIbQ94uxXOYcqw2ME5alXvUZCWXJF8mbizL%2FE7MU3vw8a04NkDsMCaLU5b59IbF%2BrPj6nQ7KbUejBf8iad2b4MKvGt9v807AS2T%2FDsT8JC15iD2FAF8gcbbiMfGl0vCpxWREssbxJL1AIPFEQovFhmGUFDLod6mK%2F7doXIHxdFFG8Gt7s&X-Amz-Signature=207be17e18a4c594eafb2a2fb4cbefeff8ed49699f0cade72cfa67c749085f6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHZUPMUN%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T112051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQC%2BHnHNAgYUyn0ul9WjNilh8MhM1HpwqwNr4%2BSEPezfRwIgWOuK0bmmK43zoC7zmy2RQF3gqugN7CxjM5U6buCF2hYq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDFTkq4X3b0KStEVQhyrcAz4ZGqrH5sZFx%2Ba%2BBJ4HNVAOdzkU14YSL22TSzs4KMEsHGEoT0xNN8gbf6JTbq7XUBvK3JC%2FUWr6cQiB%2BUMWkAVLEy%2B1F%2F4woQG%2F6Ilf57RdOEGZ%2F6ewi%2FlA%2FnmcN5vJm%2FBZSTemzrozlqR5xURbu1NBmgPqn7Gig%2F7VYK2zipsMURMwJz4kX6ryhzP6AiV8GkksXjMKh7jChgTUFrvhT0%2Bh7wCu3RlCeAGR6VcHHUQPii1n0vfyKBiyv%2FeW%2FcF3kb6e7xVX%2FnR3qFPavv7VIxRNVH2CBEz1%2B%2Bxk4rcnvE%2BneA87Jli5GCPEmNJ9YLytMGAjRfBSF3c37LiJ5rjscexRH5ZJnMg07nxBUccCO0VDREcTyEPyn%2BROJpmjACdUpktuIzEHcfYcxYh27zShxZ1BTQp5W%2F2Ureku%2FAwLGU%2B%2BIaRtbzqAuK1IBBwH6yLGzAZ7dFiO2ldnmIagJ9vdveR0W2PAT4VW47m75TFXvgSQhV4ShMLGhpEJmqvAeofMGWE0KSZ%2B8CLo5ymcMjfAdsXJJfW3HL6qvfz6GxLhfPWAavu7WXRNo9mcWLtgtV%2BRC65%2FqUVDzNgmCRaWG%2B5n99G%2BHaDB9LWuezKa8eMBvL2LWg66Nbg5v0CaoDb4MJm99M0GOqUB9cwToYi8w9ZSDNzZIWmF1Ovjfh7Vp2VdwbriX62taujZIbQ94uxXOYcqw2ME5alXvUZCWXJF8mbizL%2FE7MU3vw8a04NkDsMCaLU5b59IbF%2BrPj6nQ7KbUejBf8iad2b4MKvGt9v807AS2T%2FDsT8JC15iD2FAF8gcbbiMfGl0vCpxWREssbxJL1AIPFEQovFhmGUFDLod6mK%2F7doXIHxdFFG8Gt7s&X-Amz-Signature=df18cf22eae0f8970e1b4a719116c0dfe8357a72d9dc74da2d23689c9bff3c09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPJJS75E%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T112051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIHmEYV0bBxstZ6NfJ%2Fe1VI1w7s9Znxrww1MuioyG8rn9AiEAql4YCPNnK58pY1Ot3w8g7xCrE%2BWoWgwwOoBs2NwAzgUq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDBkBLsmV8Qk3QGq9vCrcA2YOpAbwO9qB8aio5gHGKWcEuWCjBb5T488X8nikZnKEbqcoyKKnqCaHOitOHDj9AaSMs68C8TrMJ6Xj5IbeBkX1xccjuvdBPfsrRHhi2ZPG5cAcTPxWYs99N5J0wBntOZxlL09FABpxNlszJ8ZCAW3052TTvzMD77eSZAwUV2ldoJDEMmHp2CjPv%2B3keyv9AeHL6USfMOkXa74Qt9%2BF8jWyC14hRS7XOriPEKIu1aSIvhmglcj9VMZpY87pEV2sjaPxJNw%2F%2FakVeQzNbs7L0KBAVmQKE2oCp%2BiajTzmbEvU%2F4PzAHLPzhmIOszg1rHSD5iSJpb6fOWVkMMyxr6uwShbBiZMWTTYyb7LbOzkfI0HPdRWVO%2BAicAgECQqegWytH%2FcOgk2YV9eJE0NFrqrmjepChOB5U%2BDeOSJYChAaUiRnkZLcY%2FNGArhZRp892udkC0ITWgBqdMDUMc5%2BkG%2FvZivPH1KsYMWQKToVJBWD27XYyJhEXzOlzkySy3bMNqSi2HvcJhtJ2tE0gfyZ0bZ%2BLM0oMnfjxzedUiTc%2ByUyOT6ijeRWmnB6UPCZYuyuza8jzWJ8bQhs%2FtSj5s8EePrHYEFrZjevl6iKXqnLyO3FkkUuNDhzcYquDf2EKPqMKq%2B9M0GOqUBCZgSksfp6Oxtm0mvamkF9syY%2BYVtq9Nk0%2FvXMZ2br03zGbknVrZ4ZeZJ8luNjCC8JbN53H%2FjjTn2AQMnO6Ky8kiS4VEoqz0hqAt%2FcNjHPn2y0jyvZM3LZNdZqgnCDPzfTNO9EoLJ1LKG608QWWxmF0U6K5y6D3GhUOwYwaHI7bwfLLOts%2B0IaNfPOl5%2FZZpUung1N5klMethYqYSpj8SplQLBOh%2B&X-Amz-Signature=1cac93260b85bdd163fa809d8aed7aa57d62a3babf57c4582b969e089faf6ab7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VC5NHV53%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T112052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDoqAVH2%2BZmvsudmzuL3liuRYxQYjSOFxzMqOAAqUpF9QIgW1GIrVVVlm6%2FUfGrS89Q8lM03R90%2FwjE%2BDHBJQ5KY1Eq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDPelIH6xHZftGVU8syrcA7jilFMYdWDpzte%2FbdypucXdkbPHhyyKwGXKyIUyEJg7M4BN4%2BgbbwkBiR01h6KVZK9D%2BmTQgHAIOO0Xik8X0lGpwChSxXfWahjqfkIsvL7rUH%2BgW1qsar04w7vnN1ae4YRUy0mu8LBJ9En31RryVQhR2yV0nHWpN0RQxXVG8CCqovyT%2FSSwPuponRzR%2B6gHqHXPfYnllbPCyOabIoLjiDTxgzDWToNhDLxa8tfSIi63g4EtJUmlwwFotHy9Qwl%2BWRTqI5HTTTcNjlZr1MYm5Imzavh2IhUSxjWNIWUhpDGrmYWtPz7WTWdY45ykHACpqEWpsEs1n3NX6DtvQwYg3fQVeX5BnbdDIzY7Morb%2FfLX5KBLRNnzkujBlTaYuJdKQKptnB5JjnU1CfxharW%2B2dutySnBCoIGBIZDDnCpNWWPjfiF40R6LOCwZORk9bJCKmXhiXuajUCLLCADIDytkviortb%2FyV3qO8oaN2k5hi5NbhVVOKvIE0eK8G0%2F2pUz%2F1EuTn74zwbLmMRdjqZY4njhLptP%2FKEoY0K6ojLU7PcaiKKVC6aA6ThX2Pnv990V0g2kV0i9Ef2rLW%2FrRKpqoIap1fbmcrEKMSgnFz6nCjOQIHWP0sTYXhY4i0MWMP689M0GOqUBQU51bzfdTl%2BbE6SSG4i2ps7WkFDOWTMuDNQZc883qQj6EtU%2BGw8rNxmZ06JrHrOJmMaXtSuqigYjjypTFg53j1t3x19f9XwRuDP5jbVGUeuLSk8H4IuyQ6SodJTLcEg1%2BT6q19XQFFV46ZjizRvX3mTlIbu76J897hQVzqBEtm3dtebYqnaXXm7rYwxQ8Ys25Ft71lKuEYDplAdOF%2BnaIjjnqxIy&X-Amz-Signature=9a3a450db0d0645e414d06f619d42fc0f0566a6ac9be6f4de7a60229f7e2d51c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AAQZIXU%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T112057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJIMEYCIQDpyoVtvb23vD%2BR29tqy5k84kBcvxTNnQwisS1GuVdSfAIhAKd34dc2Zy6uM0bUFeX4684eGh4qwEN2ZYVT6z8P4BuNKv8DCDMQABoMNjM3NDIzMTgzODA1IgyZA1qiLz9CNbvYDFEq3APdmjDxIZV4KyWNkXcazrHCodVYVESF%2BX3mRyRZ%2Be%2FFCpxav74vSjXqqD3aWm77h95R9OcRmx%2BVrfTnvETrvSnlUOGngOC%2BhPMuwsKoyJ%2BbkFB6nd16ozCrq8Zwdjc1m1QxnNQEm2j7GOlE05IuoI9VFZMq0M6G0edLtjNuoTWj6BTMQwGOHsI1JRc7Q1oON4wLIQ41s8P%2BVBo32TTuL79dumpJ3MMm08hEORIRFsl265C%2BYVHkVo9WHPAwM0Q6jl97Pxm%2FE1kkT%2BKWmGN7yIwkRvI%2FSs%2FIO0z7NzBWEvxUtwnSAl9arimkU2idSB5XFhRdRonR4zuqqYZZyGSTP%2FSA9LRd%2FylBp90P6cy10CsnNsftRIpvNhmRdxECyK%2BiayiIBvprm8z3gbSvqrSoyzx41Ps%2BTRm%2Fp%2Fc9tEOqJnrqCiROeR7xgexqWI7RyNVdak3MdiSTGh%2Fq%2F2FsivN7pbIigHODAbp1FzQsH6NwNVqHcSkLX%2F0fTxcgFAEkleyzVX8n21DpdXYu9DJUUm%2F7bZk06KjZm1CqwaGSf%2FIJPUaK6Ba%2FGjTvj0ogkPw7UywdzWVXPq%2B3NULZs1eWkA0fnldd8hUvQq2NLYVlK7vTTaikM3ZFfp4xohY2%2BBJadTCavvTNBjqkAfJKwmnAyxQOueunl8789xy%2BWZTDiytq2ph8BwEWLGTtRWpWKA7Og%2BDja94D%2Fboh5S2hYjfzky95i5b5IjzKEFVlMG3JWC1%2FLqGqwAadCaUL80su4zRQcVztlQnnKF4kxF5l99SBZPpjfdeL8EjkociYhHcmZgvUd2wv1dhPPS%2BhxKmDicifitnKOl%2FRitLF0XfK55T%2B%2FHn%2Bf3jt1qn99lVsNS2J&X-Amz-Signature=f369a09510c80e3db4c638e7284eb8bb7c7e285f1174267d5d33cba725a546c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPLM6JPG%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T112058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIQDVbi6yVmXhqv05zA2WfaJsLJF6mjemPpDfyEeNOyi7RwIgDFREwTgwspO539SBwlY69fV4iHdb1yK8RV0wKTompzYq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDG9LNTcOeEkU3kWQeyrcA6mjNpnt7AyaHnYbahQ3KdWc8N1t8c%2B%2BkuaE8SKlVxEbwEN%2FRckWPRj%2BMqG5fu2knQnLBWavqcBKLO1bP9EgUuPK4%2Bi8zKoJDTV3QTsgoJOtq6zNLP%2FRsLiz1ECbX8rEtUroAYuwwkfTgjZOuZMDewIHm7diUK4fXJk0Q4zlNt7ThD5MXEGcBN8L4vij4v%2Fr19GOfFqmBc0MTnfSG0OzkrkRcMzzojn5KV1vT%2BWg%2FZEeTWk1UPoT390nPJCQg6Dnh1IKJ5Lmgyj7YvLt3OT%2FM2724kULLwEqoOzQj3lhuMfD6DnzxiwrnOPu3Eb5DybBkcCWJmyZyvr25WG%2F2rf8VcrOHH0XQEG3Fz0BlJYkFuTbD33R2ygam9VJZpXx2qTlmNEl7JsUTZlQbVA0ZfNgp0yzr2GbLKGv5St6qQgSavkeEzsI2PfyL%2BtY7Pl8QnHxUwer3puLXrR3gG2UGZ%2BCuLJzAHT0NhOOqp%2Ft%2Buf3wr78SN4oT2WHZK7AEGWZBsGvLCPBickjVhCdxqmOHjvCTREf0MPxglpSbGz8pxJsTQewEzPKks4%2BcmN9lUKvtDhtPsWhr5dj8MsX1t%2Fvs3FU8zPwy%2FRAePqM%2Bs1n0NLKjxi%2FJ%2BwuBiiWCdjGbu1kMOS99M0GOqUBV%2F9HQc2ylq%2BHK1dXKvLx1oHwNkACnp1Je2Dw%2BK9dC%2B5%2BcFzBb7VuEu%2FporQhPIps3vlaC%2BCznN%2FQ6%2BwfmuGVWDTdGlx0RWBlJEC7TaEtXoFOzrX5266BoM23dPLlyHh0eyH4KJupDo0cHxoBxrfEwwl0Az5AUTcrCC5ahVur7pdlV9yh2E8lvon4M1Cc8aCEKHMExc9PsvvPQ3Ymgw1gru2yiWqJ&X-Amz-Signature=dc66dd5e4d8acc7bcebd99acdd5fc1c277f5e606a896340b84fe4bafa9aa8064&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPLM6JPG%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T112058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIQDVbi6yVmXhqv05zA2WfaJsLJF6mjemPpDfyEeNOyi7RwIgDFREwTgwspO539SBwlY69fV4iHdb1yK8RV0wKTompzYq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDG9LNTcOeEkU3kWQeyrcA6mjNpnt7AyaHnYbahQ3KdWc8N1t8c%2B%2BkuaE8SKlVxEbwEN%2FRckWPRj%2BMqG5fu2knQnLBWavqcBKLO1bP9EgUuPK4%2Bi8zKoJDTV3QTsgoJOtq6zNLP%2FRsLiz1ECbX8rEtUroAYuwwkfTgjZOuZMDewIHm7diUK4fXJk0Q4zlNt7ThD5MXEGcBN8L4vij4v%2Fr19GOfFqmBc0MTnfSG0OzkrkRcMzzojn5KV1vT%2BWg%2FZEeTWk1UPoT390nPJCQg6Dnh1IKJ5Lmgyj7YvLt3OT%2FM2724kULLwEqoOzQj3lhuMfD6DnzxiwrnOPu3Eb5DybBkcCWJmyZyvr25WG%2F2rf8VcrOHH0XQEG3Fz0BlJYkFuTbD33R2ygam9VJZpXx2qTlmNEl7JsUTZlQbVA0ZfNgp0yzr2GbLKGv5St6qQgSavkeEzsI2PfyL%2BtY7Pl8QnHxUwer3puLXrR3gG2UGZ%2BCuLJzAHT0NhOOqp%2Ft%2Buf3wr78SN4oT2WHZK7AEGWZBsGvLCPBickjVhCdxqmOHjvCTREf0MPxglpSbGz8pxJsTQewEzPKks4%2BcmN9lUKvtDhtPsWhr5dj8MsX1t%2Fvs3FU8zPwy%2FRAePqM%2Bs1n0NLKjxi%2FJ%2BwuBiiWCdjGbu1kMOS99M0GOqUBV%2F9HQc2ylq%2BHK1dXKvLx1oHwNkACnp1Je2Dw%2BK9dC%2B5%2BcFzBb7VuEu%2FporQhPIps3vlaC%2BCznN%2FQ6%2BwfmuGVWDTdGlx0RWBlJEC7TaEtXoFOzrX5266BoM23dPLlyHh0eyH4KJupDo0cHxoBxrfEwwl0Az5AUTcrCC5ahVur7pdlV9yh2E8lvon4M1Cc8aCEKHMExc9PsvvPQ3Ymgw1gru2yiWqJ&X-Amz-Signature=8db002223a4d18ad1f35bfa4cc3eb40160153aa8da7e6ce4f2d143e8d89c44e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZR2EH5RV%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T112041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJGMEQCIECY3KobTGCOhse%2FD8PigdQq13gTXAlVJ0PdbzzH75GdAiB4%2BVGV1%2FALd9SvaA8U%2BcuAFvwpdNEzokcbQor37RCJ1yr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIM%2F10Y%2F%2FOgUuJtUWQEKtwDucs1gzwi7vjsXheeJiB5guEQ6Dswq96UYyUKErhJUvqSBXvD4NHf32T5s%2B2f0vnmXZd7I0GmQv%2FECXR316J2kE5dE90R66SQd1lZUSPAgDvbhnH8TwaofX35qJ8iGrpb7Ij75JkR9RHyG02wT2%2FbYH3R8CIDYHPbKtD82%2BlelgkITNPCR5J79FATSA7duLA0jRxaZBeZXmTCuPesi%2FpUh5vQGRt3QQ%2Fzj0aNk3YojW3rFgW7P8VTsb9vnQg1ArdjwMQemCGkQcQPyHRaNrXAsSnyvr8Adt%2BQn5LEDGjsm1wGq9YNCHb%2F6stlWKY%2FjW8BpBTtgD%2B%2FGVeOUrDHGHawAck40qR5zcJFZsHNuL9N0gkQlHNffrtfGRbxtosA6utelkgD07yU1v%2F7Do%2Frhoj9iYTP%2FZwBSteNymQjPqeAAfCDfV8OYd%2BPGKQ59Y%2FuzPuniB1F3%2FPdipziAb0Ugn0o%2Bqfe1G3l9uWDsQx3fWWJMsJFOf9J9HZ26eHCQkvDVmnm0%2FfL7PM5bv49RCrNj9%2FZjxGr8kahfTxT59M4qLDjJoGwqOgnau%2Baoci8AKRCrq4%2FXBwuDFjl8eyaLlw4f8SMNOmQZuvAPeel2NuPrEEEjxk4PY44PxjXhUBdau8whb70zQY6pgEQGW0CK3Tv8C5MpR9cwN9KY%2Bw39eaebllQLDi9Dcu12zc%2FXiLQe8xasmYZ%2B8Fx%2FcWj%2BYlPX2gi8RLURBgaQHlT7%2FKqziiR5%2F249r5Ox2uXNAm75lmFa1mZrmyrqFBYMsU9s0dOa54JSl7YJsHaOdqVOGylqVosadtfMRsVxmxfT6uSDjtdFZPtaffu7qLpfna3lV5Orw5dzeDJFLJ3nRAYVbEzrE5c&X-Amz-Signature=6874cdc19c515ac876edc3690c32494c97c41920c526031a95e7aa21b3b9543a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQNIURM6%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T112059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCICrTS8TrivAABDmKnbtPxia6z0wdxaaEnJ7Aj5ARNH39AiArUzllU1d4KF%2FqdQwyBflGqp27AFEGcgbjDNMsPv6XiCr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMwMwUlmtm4HM7lvFXKtwDlhTHl625meCSBjDFzbakUj1Jj0Ml2wxGgwqAbA7ZqVIrrZdIZy8pb92EvQVh2vOejSzSdFx%2FXyK6vGMXjL1ZjdK7zpgjtGlsxOXHsJ8Z24K0KqnTu%2FEIWTRwr%2Bm%2BGdPmFpu3umGpdFMS9qiw3r9OJFkJTq6BTNyo36SQCR%2FZMPlfeKItEGpHaSkzHZKBibPT9ziTbfSrBkM0BxQar0qZrPtVhbEbvT5b9BjF%2Fk%2FpBbgB9Oy%2BSrvq1bHtq5biPRZS4ozCru0YO%2BjKgrXvqYWiGg3SV4h7hrmRmLJYypHqIdkCz0zq8GefYjVlzss1l9iykIqaPWVQxfm7vLTSi3ETVQFjua4MSONfpnnoApdNsQUv1%2B5mjvYSWw9rR0n9PT8840Vw29fjXIzI8sgf9mJzGGJ8fJ%2FW7Iycw6V5CBoVuSv2DB45dZQbxPqpMzno%2FakU9zoJvt2ynKpY0L%2BhRN64WZsxwZCbBqD06IDWfpX0ed6LguZzRHwPRZWx9zQHsuH0WVk2fbd48qtwonzXD7LxF0V4vp8j6yAJEOcK8ajlNebAyvzu%2F%2Bj606%2Bw85pSdutGwzTj0ZJ1R0EKn4ZTxxF1gb7ZKwp7%2BrTT%2BZasPtINZuKpcXUZcQeeTkcr0AIwmb30zQY6pgEK0V%2B0eDf2VTWKLxTqknOK76gnUKRHTjLm5uJYBHl2S5l%2BkDqBUp8SpfkiuVaSgUNBqvUVWQNYlsuu8atAGPZIYwlUHZqMA1CveyAESxDcT7yls57BNdgFIj%2BCYcNUhMPh7gSYzNXTJqCG8PgKclTFD%2Fr%2FCax8b2LgOnf0FVhWXWuMWeje%2BpKlM7PZ4pveAgC%2FJhpEdd3HKYrFXY5nr6XaDsU08r4B&X-Amz-Signature=a3f4f22b2b23a0b8988c1382830eb77cb0534fd644e18e29ffc517997fa795e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQNIURM6%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T112059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCICrTS8TrivAABDmKnbtPxia6z0wdxaaEnJ7Aj5ARNH39AiArUzllU1d4KF%2FqdQwyBflGqp27AFEGcgbjDNMsPv6XiCr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMwMwUlmtm4HM7lvFXKtwDlhTHl625meCSBjDFzbakUj1Jj0Ml2wxGgwqAbA7ZqVIrrZdIZy8pb92EvQVh2vOejSzSdFx%2FXyK6vGMXjL1ZjdK7zpgjtGlsxOXHsJ8Z24K0KqnTu%2FEIWTRwr%2Bm%2BGdPmFpu3umGpdFMS9qiw3r9OJFkJTq6BTNyo36SQCR%2FZMPlfeKItEGpHaSkzHZKBibPT9ziTbfSrBkM0BxQar0qZrPtVhbEbvT5b9BjF%2Fk%2FpBbgB9Oy%2BSrvq1bHtq5biPRZS4ozCru0YO%2BjKgrXvqYWiGg3SV4h7hrmRmLJYypHqIdkCz0zq8GefYjVlzss1l9iykIqaPWVQxfm7vLTSi3ETVQFjua4MSONfpnnoApdNsQUv1%2B5mjvYSWw9rR0n9PT8840Vw29fjXIzI8sgf9mJzGGJ8fJ%2FW7Iycw6V5CBoVuSv2DB45dZQbxPqpMzno%2FakU9zoJvt2ynKpY0L%2BhRN64WZsxwZCbBqD06IDWfpX0ed6LguZzRHwPRZWx9zQHsuH0WVk2fbd48qtwonzXD7LxF0V4vp8j6yAJEOcK8ajlNebAyvzu%2F%2Bj606%2Bw85pSdutGwzTj0ZJ1R0EKn4ZTxxF1gb7ZKwp7%2BrTT%2BZasPtINZuKpcXUZcQeeTkcr0AIwmb30zQY6pgEK0V%2B0eDf2VTWKLxTqknOK76gnUKRHTjLm5uJYBHl2S5l%2BkDqBUp8SpfkiuVaSgUNBqvUVWQNYlsuu8atAGPZIYwlUHZqMA1CveyAESxDcT7yls57BNdgFIj%2BCYcNUhMPh7gSYzNXTJqCG8PgKclTFD%2Fr%2FCax8b2LgOnf0FVhWXWuMWeje%2BpKlM7PZ4pveAgC%2FJhpEdd3HKYrFXY5nr6XaDsU08r4B&X-Amz-Signature=a3f4f22b2b23a0b8988c1382830eb77cb0534fd644e18e29ffc517997fa795e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HVJVPWY%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T112059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDHoIiibg6ACnEI4neWX2ZBWHL8iHf4gr8n633RHIWvRgIhAOmvXjMv0eFZJoMcdL60MhzLN2HVos5WksG%2B1vZaAjFqKv8DCDMQABoMNjM3NDIzMTgzODA1IgxeVqeyMNO%2FFgqVq%2Bsq3ANmI6bYiziDLNk%2FkEhf7Rpw752H1yOxE5c%2B05cWZ%2FFDa0hoD027SC0ZQYEUTND2vFK3ID5dAqU%2F1OlFOfSFtEclfw9bhmVGmo%2FaqeOaZA18%2F0ZFdOeak8WchE8NS6iZXOIBc3PJWq%2BWjmB2yKVnFEK92%2FW7lUIqm%2BcdXAO09nXRFUgylKN44AYt0d%2FFSgicktt%2B6WoVT3IOehvp9iub7SEVAObDPXnm%2BX%2BFTw3Ek6FT25eoETHg%2F20fxAzUgen3ohAMkzdP7JGdSAFYGZlvVDmjWRHYMx9k95wkZKHnfSGK8G%2Fsv3%2BXVYN%2BtGzmycldBk79hLzDpAxUXEf2j%2FCqCGUEoPGfBjABMW7QSE14Bf3g3e02DkUM4S%2FUivXi5WJtkC%2Fn4JDciq6yPHXjJcfLteg5q8FXciMV8Ua5HAPrdgoXO%2Bhf5PzUVfzl4lRUyZVFgGhJs%2Fls%2F0QWDXyu0H9jj1lmGZkUjLGyWFzRtmkiSwdVdx4H9nWQ6cA2pcBmn1PIoWjSIQ8GHFroOy1Jnms%2FSOzsiH7HZGjjTea%2FRV4%2FDWJP883a3lAh3JPPBMNVG0gwBf3IUnEv20ZOE1AMmSgGZLIaxIH5PaglMqkl5NcvN8OSipW4skWQ4K%2FY7zdhtDDSvPTNBjqkAQ5TkwqZjaWe0AW8FHip0WVgH6vGDVLp0ol2PTnVmzBwySJm0Z5K6zAvKaPrpxtSB7CAsvBtaPd4frYxypQSyIR3%2FzQ2pgrjfBa%2FANGEbNxJpR3y4g%2B9KjCFi%2BSQO98R%2FtqISzCDq6LvccpL2%2BS3nf%2F1fUnNrSSeSCtOpI9XJf8Zc851H6Ju%2Fh1AR%2FFd%2BjOeSVFsrrKSeOnHJ32JbCDU7FQN3eLT&X-Amz-Signature=d15284fa606d0653293ce52e9a63a91cdcd2fe9e09a426259b59bf5e55f5c818&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

