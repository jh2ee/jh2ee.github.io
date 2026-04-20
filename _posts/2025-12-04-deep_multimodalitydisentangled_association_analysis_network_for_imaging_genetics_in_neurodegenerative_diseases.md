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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GHJBR6D%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T184504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQCdQb%2FYywS2CjaAghEO6t%2BtS6UFe40MpQzzWEnR0YfUaAIhAIubs3OfzJn3%2BtyQfI75mLOnxQseupvdj8f6LFSCWf8WKv8DCCQQABoMNjM3NDIzMTgzODA1IgxplbH01LJ8%2BjAR7v0q3AM0hqF1z9a7zZOochYWzsl%2FuAw0M5tHkKToRC2Wp6AZHYAz0KkCi7oSIGlM11upANsH7ZH4U%2BOLpQ36J%2BjtnLcCskHlNS7cYJnyRnxwwk1vbWy7gswdgfytqn3%2BzCaW7LMzvoA52M1lU5NUwIQhlQQjrD70fLKZUXhivltUbWwpMzJqNn3j8nTcplDMJ3NapiK7w7J1ASpZZuWjx%2B%2BnEyq7oth2yjY%2FvfAr4aGfZNE6B%2F3gU8FAY6KYXEfuvsb6Y0FwSBVvFEl3hFs0ICoz4Gq%2FMDHnKXasIEQ%2F8RGiBNvkOeuLltovMH0Ex9LNIMstveZPLBZCP5%2FGJQGJRTNdbH7iMtV0INsoYkzKXuNAAMrUWN5R1TTCaMD6FpQYcIsPkP%2FGJd%2FGtGrd%2BQkB5t97a06inJFFwOCsVZp0hUNDor5QxEPTH%2FBmy1l4hp3ULbV9iYFUYz%2BrjwoLUfcy5K3%2BI280rq%2FeJk3Gb2H4kT3bbR9OJrIBWI4ELi9GfEka8gHiJXUaYWCGNFxq9qeJLfPhO2sini9S%2F1bGG1cHkkwTzRctkmxeGtjSA%2B9Pb3WqYuigrICuQxHT2FmGjTwKg3tqV8AoOiGVdmeEQMI4Lg2T%2B6%2FOrrRDPM2ffgTmX1%2FgsTDK45nPBjqkAX7vmqNadYm73AZsISTMgF9fZ0oRXrTBaQ%2FiugU36Vg8wWAfhxUSxb5VU4mJ1GZGdnun5mOKAqKp4mh%2BhQaGl9a7ZOLr9KrQGV866YF6cDDh5gyM2XSpCEXxqMyuDW8qxb%2BQeuYkp%2FyIFojNCWXklVngzN79DXtvmePAvyGO0RsU2D8xfZMDOsq2YE44nXIoD6NaenDdN0u%2BhtzGp6IqqExv9g4F&X-Amz-Signature=630cb90f9b7533a406e54f16c6aa1ebfd7bc02ceb7ae8a21900ae6899b6de589&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GHJBR6D%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T184504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQCdQb%2FYywS2CjaAghEO6t%2BtS6UFe40MpQzzWEnR0YfUaAIhAIubs3OfzJn3%2BtyQfI75mLOnxQseupvdj8f6LFSCWf8WKv8DCCQQABoMNjM3NDIzMTgzODA1IgxplbH01LJ8%2BjAR7v0q3AM0hqF1z9a7zZOochYWzsl%2FuAw0M5tHkKToRC2Wp6AZHYAz0KkCi7oSIGlM11upANsH7ZH4U%2BOLpQ36J%2BjtnLcCskHlNS7cYJnyRnxwwk1vbWy7gswdgfytqn3%2BzCaW7LMzvoA52M1lU5NUwIQhlQQjrD70fLKZUXhivltUbWwpMzJqNn3j8nTcplDMJ3NapiK7w7J1ASpZZuWjx%2B%2BnEyq7oth2yjY%2FvfAr4aGfZNE6B%2F3gU8FAY6KYXEfuvsb6Y0FwSBVvFEl3hFs0ICoz4Gq%2FMDHnKXasIEQ%2F8RGiBNvkOeuLltovMH0Ex9LNIMstveZPLBZCP5%2FGJQGJRTNdbH7iMtV0INsoYkzKXuNAAMrUWN5R1TTCaMD6FpQYcIsPkP%2FGJd%2FGtGrd%2BQkB5t97a06inJFFwOCsVZp0hUNDor5QxEPTH%2FBmy1l4hp3ULbV9iYFUYz%2BrjwoLUfcy5K3%2BI280rq%2FeJk3Gb2H4kT3bbR9OJrIBWI4ELi9GfEka8gHiJXUaYWCGNFxq9qeJLfPhO2sini9S%2F1bGG1cHkkwTzRctkmxeGtjSA%2B9Pb3WqYuigrICuQxHT2FmGjTwKg3tqV8AoOiGVdmeEQMI4Lg2T%2B6%2FOrrRDPM2ffgTmX1%2FgsTDK45nPBjqkAX7vmqNadYm73AZsISTMgF9fZ0oRXrTBaQ%2FiugU36Vg8wWAfhxUSxb5VU4mJ1GZGdnun5mOKAqKp4mh%2BhQaGl9a7ZOLr9KrQGV866YF6cDDh5gyM2XSpCEXxqMyuDW8qxb%2BQeuYkp%2FyIFojNCWXklVngzN79DXtvmePAvyGO0RsU2D8xfZMDOsq2YE44nXIoD6NaenDdN0u%2BhtzGp6IqqExv9g4F&X-Amz-Signature=630cb90f9b7533a406e54f16c6aa1ebfd7bc02ceb7ae8a21900ae6899b6de589&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5G46Q2V%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T184504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIGxzRK5XZfaJ2ZNdVAM4zOEPPJuBxm5hyBKFAKCiKjZgAiEA9R1NF6IJILdkrSgWdVu3VXDw5F9qq4j%2B5iSDHRhI3vcq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDOCQrv00wN3jE%2B2whSrcA5PTU8OnlmLJQobEO4dWNUmav8BjM2M2dbFfJ4alJDvF451rObjt7ANsL9EdWK8fEZDITdDOYbNO4VikSPLTkwgmDZPkWPmcHRH0VP496udqYUBu7uO8wAeMzoBh6XU5Mu3TBqp3HzwCuuJptU%2BcDY1gF%2BQ%2B400C1aQs38C4%2Fi8sV1mjl8krEROiXaHPlGnSQderY3PbV4L8GXMeIa57Bk%2Bt3EzTgM1YRkSb6e955rd5CUmp8hRMgFe8LdoiNsKSV%2BklFNsqVqB5ei55O6KtsP1H43IvshtUsgKRbH2yq3f7yEXRq37BFqtNW0T8v4HPj4H6A1bNOd3ZmKTmnkolJTJ1dewde5ofAaL7CtJQagjt6TF1shIc9DPT5tBRluOh07jOeoKbiXGyCEmDbvLlfxA%2BHjTapNwe%2BIh%2BH58D7puMnN7wHlAje75w9ZB11HexjfUJO1VAYBqNz5FZOhxw%2FeNbvPI9C1NzQ%2F0JuPYfCq4aRauqUZ%2FjCz4qhGLacSBXq68nNgQ9DJbjcfeOooMaiRpBctj4iaBlV9AGI4NTSEC%2FUSMcq8rESCqOIDfQOcyd8aqic%2FNA75soXq7dB%2B6e9Msk%2BuEufTst0Mpq0qUSJ3jvuM0IOOl0TdDWvB1TMMfkmc8GOqUBk0OU6uUfMtB%2B64OjfiylCaCtMTaRrCdn7mhX%2FqNsieo8zExpEUH3ke27YNu7KaAB5q30YzbPO6LBNXsKABkagOzOx%2FdxjqbN6WlOJu0oWpLr6zzAch8JfoYvrwASA1WY7%2B0mFp4B99D5di21Tu6NjF6Gp8ChjWWwMBA2n1Dg5pq2LqnPJ1R2wc8nA5BXnEhhEDwUNeQeM7%2F%2BBVLe4L67sOapTShf&X-Amz-Signature=f7f2aaae9e0cdb2c75c2c3eb7b6d862a460cc7cffa40d92e4ab16da4ee43fa08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MOJDWFP%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T184506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIDIS5d%2FrjOyvqBnl4X9RUAuhAyXpzXEOHA6JYLPlcXR9AiEAzNY4Uuo%2F4jHyUC856vTkoZ5MLiHadENS8cShx8GApSUq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDLEhp0rr7Vb%2BBeFcCSrcAxCjrKnKWx8snPtSS0gV0SUKOJ73kZw0AQun%2FdTQYoTzhosP%2BjzDJqoAcVF9irZ20xpqfi253U0LFnKDAGTD71entYQi%2FRL9zpAOaFRCwobHAAPLkDOYkQ0HMgcSzwYL2u7olR9J7EWwATLoMJIhufNeVDwDd3%2FDZSZaccQZEicEXmZ9QlxaO8e4eyEDUyLgGsNuixiLL4ZtRdKw79MKLAvtjrBiTrUFCsk7WVfKcE2C5SenUJ3el4UF18JjoTp5LjGAoOXoB5Pykzv4DoSc%2Fglv7vUrgjF6WhZGHYy8UPmwIuICqfG0qKuJCfp1XoMPomt1rpx5Wk8QdDlkY6GbIVcLfv8FBS8UhUBAq%2BhrfLbkuOXfGsyhdbRoePSAJfNH2MWB063kkyQjIuMdkThxqsgOeEegtAxey9My8RzXbOJ7jkOut7wmWOTRHnoOm3xVow3sYIwR3%2FP8YS1iJiwrsZO4bK0mG11QbgsYOq11Gt%2BFW6QfI96TrYdGpcfwr6WfV4U80Xsxh9ZGWQjj7P5VhgxkaHnoCbIDTx54zy%2BOGi28w0mqUHF6Q1jnPj%2BzQDlGdtpQCe7p4Dsknp9%2FKEPszS2VPm%2BVAJMG4hSR3DbqfDJ1%2B4FCm8MGeMcmvgsDMNrlmc8GOqUBODu2tM1Nthv1uF%2F0JwTRet2%2BW8V31y7X6JqJlHHDRHMoz0biF2BBWBF7IEt586amo4vsXcNQaH9IjohFQ91X4A%2FQ4ohNAJgwDcSL4g9m36BXjEFO%2F38lvd8GPJm73zVl9jgjNUTOJ7DcIpPOrJEMaYMJvQSPQQgfEjpNODB6JzDYiU17bxto7S5pt4YJfyu%2BagslTzZXLH1f%2Bqr6XXf25rtMeOGc&X-Amz-Signature=677a9ee21b8ebc0dc6a835429c2eb3c5f12c26e95d99f17689ff4e7414939b95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MOJDWFP%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T184506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIDIS5d%2FrjOyvqBnl4X9RUAuhAyXpzXEOHA6JYLPlcXR9AiEAzNY4Uuo%2F4jHyUC856vTkoZ5MLiHadENS8cShx8GApSUq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDLEhp0rr7Vb%2BBeFcCSrcAxCjrKnKWx8snPtSS0gV0SUKOJ73kZw0AQun%2FdTQYoTzhosP%2BjzDJqoAcVF9irZ20xpqfi253U0LFnKDAGTD71entYQi%2FRL9zpAOaFRCwobHAAPLkDOYkQ0HMgcSzwYL2u7olR9J7EWwATLoMJIhufNeVDwDd3%2FDZSZaccQZEicEXmZ9QlxaO8e4eyEDUyLgGsNuixiLL4ZtRdKw79MKLAvtjrBiTrUFCsk7WVfKcE2C5SenUJ3el4UF18JjoTp5LjGAoOXoB5Pykzv4DoSc%2Fglv7vUrgjF6WhZGHYy8UPmwIuICqfG0qKuJCfp1XoMPomt1rpx5Wk8QdDlkY6GbIVcLfv8FBS8UhUBAq%2BhrfLbkuOXfGsyhdbRoePSAJfNH2MWB063kkyQjIuMdkThxqsgOeEegtAxey9My8RzXbOJ7jkOut7wmWOTRHnoOm3xVow3sYIwR3%2FP8YS1iJiwrsZO4bK0mG11QbgsYOq11Gt%2BFW6QfI96TrYdGpcfwr6WfV4U80Xsxh9ZGWQjj7P5VhgxkaHnoCbIDTx54zy%2BOGi28w0mqUHF6Q1jnPj%2BzQDlGdtpQCe7p4Dsknp9%2FKEPszS2VPm%2BVAJMG4hSR3DbqfDJ1%2B4FCm8MGeMcmvgsDMNrlmc8GOqUBODu2tM1Nthv1uF%2F0JwTRet2%2BW8V31y7X6JqJlHHDRHMoz0biF2BBWBF7IEt586amo4vsXcNQaH9IjohFQ91X4A%2FQ4ohNAJgwDcSL4g9m36BXjEFO%2F38lvd8GPJm73zVl9jgjNUTOJ7DcIpPOrJEMaYMJvQSPQQgfEjpNODB6JzDYiU17bxto7S5pt4YJfyu%2BagslTzZXLH1f%2Bqr6XXf25rtMeOGc&X-Amz-Signature=b60836d1372a7cf0011f08a76da727bb2add2dbb6cfa01f0fff79741b187292c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7D4M7ZS%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T184506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQDNl4KrFlVY9u0s7yhFHriQqCRRWbU6rJqCTzut0w9jQgIgT0leMLKREKdQTEdDq2i5086hiFt37FxzPUpg33hGlA4q%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDNnFQo%2B7fYji4htGrSrcAy3PJ0yQ%2F541Ske2LihwzOz7tKRrAsJwK1UBcWTv6Qb9zto1K5lIfWOIWaCh7p2G6cHKzIR0IbTZqVoatFw6DQh1pWjCVvcYO78tU9gt9kN%2BoZqd5K4LcO5qxPc%2F7w7Au59NwCJMm%2F%2FA%2BBaav6Hle0ODEscjWy1pK3tEF7sCzbmoX1Mp1QeYvsGwytGEIxipBQyWrTrrCeIUfw8eGn4Etr5VexwiWP0FINUmMqSteQKzrkRZhSKP98o57vb7jugoAoc1F2LsKmgCwX%2F%2BKLo6nS03MJzD9Sdo9X7fNXN38HkOMWsJVbD212a%2BUc379Dt9m73aSfPZimCkhJpUVeMEctjyGkdDwoHrhFvG5BbcEvSB1V2IWwVamHV6fTojQeSh434Qprm19Wuf2gY0j87tHaxTT36ZsGFoA4I0OVyoXLtzBQUL71MVCLvoHO%2F86hhTDr90BrHNNfDlpmaZoplDQEThx9HGvaWBScEx9heN8gQisBrVl2lqxdSuFwdLXFKhinstgwgVkgn23vTWDLQhlpZBOOSO6w9JqdVABjGAsFQ9OID5Q5QiipgnGX7i6Cx8i2kvoGfPXRXC3eZ39ZVg1emnDtA6yGa7oOI1DHxyarG7cTwO944%2FP1KVJZLSMJHlmc8GOqUBwaUPQnolura3HqVtZHZm6AYk8zWG8N5pj49NQrSUKpqY3jjDQsLama68GkhinKWCfWjgg%2BlUFaEXXL7imwnB1oVboK5uAV0BvtUbOCoL4k2PWbZY%2Fy%2F9CymQJSwKFpESxe%2FMkCprk5NNaESoiKME5StHOJdZG%2FEGnE6TEWfwhqDcoj4ecif8D20fRXtTGK8qJw6GfP1SteZmY4nwBtL%2Bd%2FXd10Ea&X-Amz-Signature=5e343cb74037cf50bf3818ab88fd0185502654ad35ef688890206f42bce80783&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4FLNUVD%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T184507Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCICMtUzSXClVCelYWvsQaMe6Y1ckJpV2MXYq9VXZMRBryAiALuNrnF2lM364EVP9GtqUrx72iMz1vMrGBRhjd9k%2BOAir%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMeUX4QUBOTuiz3JtHKtwDfFbhRBFLQF9fayvcMrscyedxUMs%2B4yT85O7cBSH5IDz9886lmI9lOL7h8a0SOWj44hGedtfUKB4edBMktzy9ojWTcU7Ev7L7DV2CZnc1e0ts1shjH5ftOFZp%2FC%2Byr4H6MBPiHBZqFf0WrpuUC6DgT7ZxBewaoZntKZtyfuv7Yl7iefR6rW4C8sb%2F77x%2FS79G8Dwe5mkj9k9z9tteOxyEZJ58ZcfS%2Bsowqzxg3fuXh15z98RBf7UAtACdtsVwcVo3QYx04P5BSTq5aFAwq0FP6Jofpz%2BHp%2FVtvCiv0tdNrZSwcTbgzr5RFQW14jdQYvf%2Bqu5YSyZ2jOcKY5xG1KWqw%2BAUG9wdsE%2BYDHqYQ3cial0uSM9rjP6lV96YX8b8qYS%2F40X49IxptlIVX1wR3t5TbBQ6IpPRLh%2BbuzgQUzceeBDosm2gIV3cCxF8pl632HoI%2BmgOqxWGH%2Bgk3Wl4Y3xoz8RRKgwV8BIIGdqwnBu9G7rK8QhJhYPp10m6lGthyjVsfCAS5B6c01gPGUXe0qgXsM3yOSfH%2BjpRYnFOcp7GhKrg1avA%2F6YRbnx4etvpuhjBty3berLVvi%2B4t99KUdXASd6xAYARySUZ4htKnfmX%2FTh9iBt9dwRTFAvGVeUw1uSZzwY6pgEaBdp5ndxPK5%2B8PKOJLSteOXrA4hIKc2nc7hAiVJYSvc6jLvt%2FdtpkvZVAWjlp4%2Fl31qjOfE4KiM0GUXL8KwG7RH97S6FvRwlio2MAknKk2kmjo5lMZ%2FFCjlAQ1CK70SFF47mNoi5EbyJmCWpYprdbhAfoX6knJkBvRK1YbMqRpONAFaH2u7%2B4CcKsgSCJCobrCSIC6jw7ZksvEOTYgMtLAhgktThu&X-Amz-Signature=43f4f171f037fb203db7890d8fa2e3d1652a85c6ce9d6cd04fe8da42ce749081&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466US2ZY64X%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T184509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQCH20A78yNX17cRMFvabMA9VSzsHcqWMauc%2Fd5pfMS7sQIhAMdB5Cih9obiieqNiUuLMjYGhN57mwGsTGbYbEFeAPx1Kv8DCCQQABoMNjM3NDIzMTgzODA1IgxYjdY1Oa5COSMJaCIq3AO3IzB%2F4Mza82IiOlcLbNXVyxXwRJQMkwFndL%2BbEyf6bTcFCymp0j8bSFkjzQeWmr4oK5T85w8LbtVa7fZxEvbAvjmvmfH9S2H5FXcmpLnZaP7y3kynqS0rm40NRritA7FNxxUUl0d7oXj0PF1mhTZifUU%2B9BkfHbR3oJSqWmZOS6DclDGK7Hh5AFRjy9KOFzLyGZowaH%2FVHTpPhBQY71uLTP8p%2F%2F28OBBIy%2BsWj173eb8%2FmMAzD1t4ykEC3zqW7MK%2F9PtUXZTtSbfe0yqU1i0eBNiTVQ%2B7dVu%2BZcousMkTb4TkLYevSzZUHXvkfmAQ8NRKDMNVVHppOkQK5FkP0o8RJzFRIVjVreSetYZUSVF7cg8vAU9WwwWGEpW%2BeCTbip6UZPvczpoKH4TIIJU0unT9UBd8cahxwEb1DOMYI8UaDp1qn3Zr6266t1jYKZj33oUqSz9BC7e3IaeDvHJWP0xBoyjPpl0lxBgx9qQj36caIiczLhrJ9wN2%2Fo611ukYENONfnYc7l7HCrDoKyApVJouXVnNXqp1HeA6z9h3ySuSaRt56GGkte2VJTb6agBZKP8ZjdVkEN1jF8rxS2K4arZmCkc0d2CYoYJIFlmHlbhgdvzuDfMb8TwEtLifFjDE5pnPBjqkAbWk%2B6mqIl7Th7qynWFsa%2BrsbSuwviclfLsruu13jaJtx6eu%2FahD%2FklGyM7ZGkobfLJBKaEXSJRaBHmVKDZxdcbYkw7wJU%2B9KZZyxb8%2Bpfv6QPH2RD47wzrKdOea2cthxBb%2BI43sDmTc9%2B3JlbT6hqvYaO6aIn8Yd8zsn%2F9IYLKwctSHGW8q4umG0GrgQB8Yd2n3q77KmMxO8EGWpXakigZvdoFc&X-Amz-Signature=77af8473212d0d7f16f3c19cfd49f0b669473fa3cf58f9e04677f34a49d9369f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYH2QPF2%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T184510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIGeeRbPgXUQ15vwS%2FWWI%2BCOT4gl8yuvJv5m8GW4fIwixAiBUttIUHRP9pGDjeAuWYX8JkN%2FO9khRQkHcykwkdkdfWSr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMIzMvSdMLx1voSHIfKtwD3lKqeU8hpF6g5rBrABIj30vBSS9QR%2FCRraOpm7GyAB%2BPuBQ8lsdJ9uyPWEwC5YBup6X2Oq5I3ozTv6n2M4QdNscsZAZNTkxihshBtD2ckQJtvaqeu1PNvLmO%2BwsOTWgq1L6knolWloWFGhUO0DkpHFB5tYXSypMszKNJ%2F20grnT4Jf3tr1xlDqqVp%2Bqo%2BFN5gCEMXrzx%2FYWci8hILsL6%2F6XvE3z9WM5nkNW8ls37ZTkxCMRjUiXE65urSWGVupY5zLnXY025b0cWIxq1XNTDhAj5hujBvS%2F44DhIVFRaUde0eR7mzHioMMQeNUDQ9eCvWNgVhA9hwTGJxgKlQ2RuWcVraQgXypv8TAuvj8cEHRr3gpwq7%2FwT1arcfIhYbRQ0qsz3QBqROuW12WktH2fxL6zOkr6bkm8z%2FRqbq%2FiAaf38vqTtzl8EbV8lEqPgB0kjjWrUInYJFuAF%2FLXBa9%2BGoik5bgvESERSJlb%2Br3k9xFncpttQba2XRB3zJ%2Bc2McRuKW0jLhwgg9PozNETFSKvkdVeoCJd119uKwpBpdOzBIN1TBjEL6EPrvGu0osuNZtr%2FapiYV4VyFE8bpYJ2eka9J%2FuAYCuwJZW4zwJzFqdd5pimwFPe7WKuvB90bwwxOaZzwY6pgFNMxzZm5MWBn90YRA6pzgbkf9gsElIs4fwBDAsbGglJKuiSI1cQ9HS%2BQIEM%2BAIVaMO8FVM1VlX48uFa%2BHZZT0G2Bi%2B9Yw%2BmXdsOtFK1mbKB3QdkxXJeokQVTQlyobRRq9DctbQY%2F1rfdgjncmhS4uFIKveqcmhHXM7XnePt6H56NN0RXKqJ0%2B9noh%2Fn6YLYaG2Q2S%2F8wuzfc8N7rQlGLKcdw4ubKzR&X-Amz-Signature=5f8c03efcf74f08075bf9d84338ade5a91105a99ceda20a4a975722b4cf01bc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYH2QPF2%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T184510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIGeeRbPgXUQ15vwS%2FWWI%2BCOT4gl8yuvJv5m8GW4fIwixAiBUttIUHRP9pGDjeAuWYX8JkN%2FO9khRQkHcykwkdkdfWSr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMIzMvSdMLx1voSHIfKtwD3lKqeU8hpF6g5rBrABIj30vBSS9QR%2FCRraOpm7GyAB%2BPuBQ8lsdJ9uyPWEwC5YBup6X2Oq5I3ozTv6n2M4QdNscsZAZNTkxihshBtD2ckQJtvaqeu1PNvLmO%2BwsOTWgq1L6knolWloWFGhUO0DkpHFB5tYXSypMszKNJ%2F20grnT4Jf3tr1xlDqqVp%2Bqo%2BFN5gCEMXrzx%2FYWci8hILsL6%2F6XvE3z9WM5nkNW8ls37ZTkxCMRjUiXE65urSWGVupY5zLnXY025b0cWIxq1XNTDhAj5hujBvS%2F44DhIVFRaUde0eR7mzHioMMQeNUDQ9eCvWNgVhA9hwTGJxgKlQ2RuWcVraQgXypv8TAuvj8cEHRr3gpwq7%2FwT1arcfIhYbRQ0qsz3QBqROuW12WktH2fxL6zOkr6bkm8z%2FRqbq%2FiAaf38vqTtzl8EbV8lEqPgB0kjjWrUInYJFuAF%2FLXBa9%2BGoik5bgvESERSJlb%2Br3k9xFncpttQba2XRB3zJ%2Bc2McRuKW0jLhwgg9PozNETFSKvkdVeoCJd119uKwpBpdOzBIN1TBjEL6EPrvGu0osuNZtr%2FapiYV4VyFE8bpYJ2eka9J%2FuAYCuwJZW4zwJzFqdd5pimwFPe7WKuvB90bwwxOaZzwY6pgFNMxzZm5MWBn90YRA6pzgbkf9gsElIs4fwBDAsbGglJKuiSI1cQ9HS%2BQIEM%2BAIVaMO8FVM1VlX48uFa%2BHZZT0G2Bi%2B9Yw%2BmXdsOtFK1mbKB3QdkxXJeokQVTQlyobRRq9DctbQY%2F1rfdgjncmhS4uFIKveqcmhHXM7XnePt6H56NN0RXKqJ0%2B9noh%2Fn6YLYaG2Q2S%2F8wuzfc8N7rQlGLKcdw4ubKzR&X-Amz-Signature=fb7529adb9f3537cee499cad6e7e80ba354c110e710c9680d8ea94ccb9eea946&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663S3Q5XU2%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T184501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIGykFzDHG%2FFwe%2FKTXD4l5LtoCVz1lIZkCtN2r%2FKHSFWMAiBzpd8%2BYwJin%2FGv21ZCVmQysi9Pt9KdcvTKQ1kXD4vvhCr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMDh%2B1iYubrjc%2F5TzHKtwDWGkTAE5NCGSzDv8VGQDGEXkhQ%2FAZiRkHxrAyxQ3RwTTZbWxl8oZ%2FiT7krSFXeEamv3Yz8KGriNihj%2FDCe%2BDBdK14Xwu18iEp1tCwDijsmfI3suNfGbrZJCc8KhB6k4%2Fb5v%2FglPl0bgvSebjk1ruejH1OUmAZynJpxad2MyzruLvp15gm7hs23Vc58DyuCle9hdKEEq5k5xVZWOeDcpue%2B2gI2D0R49lYH%2Fop4ytsl9LWVWEGsycPTLxbff3Jwal6k9qvngl4vZVrVGvtKiYlIQQh1FRwpfskgBPicajQwvb9mgpaZOnsnzVrl5J%2F0saUsWzmm1TRez9kji2pUoInIWwsilVnxAdQH1N56PAIPMLgDthlvb4OFIWwGAxysPTzysgZiNp0XqFgsK0rkmbcK87ZwhCbOOEQ%2FvoTmLMj4Lb%2F%2FoNkmXRK8j0MSfGnOQXHuq5hVZ4uKad4dglC2ripKSwR88LVr1PnrMPQB3UtJ4Q2ck0K%2BIHmJb69IaAU81zAEWmhdU07lHS6t2%2BGVbSdGsL3eNVlU0RvXuB1wh4EI%2BmJWpilgzi9wqYQO2LhYzMY4%2BPhDdfhCzHR49oQfUB%2FMS7ij4vfe6YFGOvCa0LzxZ%2FwVS8arRATLCf5PCEw1uSZzwY6pgE7YckjysSiZRgKEG0c8%2BP8lIJ3ciEf7CRhDuEzQXNPGrzUCezSRIt2U%2FMKL2glFmsGLJ%2BLY2wbM%2Fb1uQ4LGibq6GUtHynLUJNX8sQVij1lw257tXNWPnph3s1qbMPhlssHTp%2BT%2FUDoNCM%2FMLK7Kz4zcVQdzTITQ6mg8ctLlWv3nmuT%2FDC02Xn5CSzBO3IOvkEkDcsPJqPihiqToDA1QU2MXs4k0w%2FA&X-Amz-Signature=cdf976911ceac23ff3d8e4ba0a8cfd1e65905612cffa44ac33a5a717d99c4262&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PBGKAOO%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T184511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQDsEBLlPPjaQReV%2BILcyCpHa%2FMiQxwgS02sZIo5lOJ83gIgLRfu0AkT40sZuYyis6183YBckjm8wev8C2WhVK5tnYAq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDML4Zj6JocgF1MdVASrcA3K%2F%2F5Fl5G1AZSAC%2BN%2Fa%2BepJl%2Bx80vdGNj3obMrQN4oDs9SGaaA0wFa5nauf9j2GgMYkuby3gWfKK5f3alV4rZpRiMu4c2Yg5xA4rsIhOutQ75eprW4tP4tiS1URqTnuu2fMtVzTGsY%2BudcUMoewgKuH8Zn1FhEAgxIrITmVGr0vzhChPZK00zi38EQJTYLb50CEw4WVEQ1cYpYWbWcS7xil9rnnyfyOor3B%2FTFmRCwwjra7mA%2BIqaklTp65ZHcPgGkrqIkrgZpONJ4IVsbimtrr7TzAGFuPyELmu%2FBg6zgwNzKqVcwtt7%2F0%2Bf5LXe6gSORduyNcJU%2BzshKZdAWKknXdLOdcaoCP20FKENZOmkI4uEzcGadheNpUJQRwjtJg7Bmr0GnKw43fHNpzwApm9i3UYrL2WutCQIdUz358zdsUeMBa5rsSG2Coy4qCxC2YIYYwZKOGN5U5Brw0U4ctehSnuFeylWivjXingc2F0UBeMauxYpubl%2B8%2FoA4kKQ6iwIlFE3ramFuNwuaU44u3AQoieYY0l8V65cLAe73Rz%2FraZaYsoJwitshpWir8oR%2F2piGsuszCVkZryZCQss79dRvpzWnNIQEo4J23s5EqSHHH46SKFUo91cfwiexHMMrjmc8GOqUBDyYNEM7sOL%2BAft68FkfzFRztXKQnxtXciQP52Wr%2Bu%2BSlkLzkY%2BjXsEC%2FFp2L7GGQZJdzWXqt%2FB2HpKQSRXbi%2FLjJ59RKKHot4MWBP0YiRQZFbmaK9TarnYhPMdW1lztXfLcSRDhVtB2mntsMCGhL6FYmDAEzTIl1h1PioPGfsdkPUC6nyDvr2B7RqoEwKQexH6S2PaJ9uzgK%2F%2BUUgVkJpENq02YG&X-Amz-Signature=20d211eacd730cb16462a36f49154db433372b5cb5b9030e4e7ca726a380b780&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PBGKAOO%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T184511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQDsEBLlPPjaQReV%2BILcyCpHa%2FMiQxwgS02sZIo5lOJ83gIgLRfu0AkT40sZuYyis6183YBckjm8wev8C2WhVK5tnYAq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDML4Zj6JocgF1MdVASrcA3K%2F%2F5Fl5G1AZSAC%2BN%2Fa%2BepJl%2Bx80vdGNj3obMrQN4oDs9SGaaA0wFa5nauf9j2GgMYkuby3gWfKK5f3alV4rZpRiMu4c2Yg5xA4rsIhOutQ75eprW4tP4tiS1URqTnuu2fMtVzTGsY%2BudcUMoewgKuH8Zn1FhEAgxIrITmVGr0vzhChPZK00zi38EQJTYLb50CEw4WVEQ1cYpYWbWcS7xil9rnnyfyOor3B%2FTFmRCwwjra7mA%2BIqaklTp65ZHcPgGkrqIkrgZpONJ4IVsbimtrr7TzAGFuPyELmu%2FBg6zgwNzKqVcwtt7%2F0%2Bf5LXe6gSORduyNcJU%2BzshKZdAWKknXdLOdcaoCP20FKENZOmkI4uEzcGadheNpUJQRwjtJg7Bmr0GnKw43fHNpzwApm9i3UYrL2WutCQIdUz358zdsUeMBa5rsSG2Coy4qCxC2YIYYwZKOGN5U5Brw0U4ctehSnuFeylWivjXingc2F0UBeMauxYpubl%2B8%2FoA4kKQ6iwIlFE3ramFuNwuaU44u3AQoieYY0l8V65cLAe73Rz%2FraZaYsoJwitshpWir8oR%2F2piGsuszCVkZryZCQss79dRvpzWnNIQEo4J23s5EqSHHH46SKFUo91cfwiexHMMrjmc8GOqUBDyYNEM7sOL%2BAft68FkfzFRztXKQnxtXciQP52Wr%2Bu%2BSlkLzkY%2BjXsEC%2FFp2L7GGQZJdzWXqt%2FB2HpKQSRXbi%2FLjJ59RKKHot4MWBP0YiRQZFbmaK9TarnYhPMdW1lztXfLcSRDhVtB2mntsMCGhL6FYmDAEzTIl1h1PioPGfsdkPUC6nyDvr2B7RqoEwKQexH6S2PaJ9uzgK%2F%2BUUgVkJpENq02YG&X-Amz-Signature=20d211eacd730cb16462a36f49154db433372b5cb5b9030e4e7ca726a380b780&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IAKYMI5%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T184511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQDlQXCXRyH%2FZRbIOr2eh%2FvoFowYcktAjqUsVlxNhP2PNwIhAJX6q%2BPmZ2UawlWjgxN3iHB%2BJ%2BDswLwBCOTtonhfOT5QKv8DCCQQABoMNjM3NDIzMTgzODA1IgzfJxeUAiU5OYxzGSkq3AOnHYNV4%2F3V1g8EU9Fp6imqWMoNtnJgUhZRJzC4ZV0qqUst34JNw7Kwk8rvngT%2FweDiKr3DDeIAJXvZ3VY78t2HGe%2BN5Ur37s6QFOCOBeOZEwVEZYVfWjDM2umTOwEeu0%2FsJXRmBciAZoz9jMp3s6BaZIkpV6MSHjTYs1FMd%2FqBfduw9STyB3bihLHWPLufKAWcVT90OlHoQZjWYEJZLGpP6CwH1Q19gZr2jQbac2%2FtA%2FBKaGxo2EmGh%2FghLdjopZOWLdbEjcd%2FCYluW%2FynTFVnt6XgxRrA3JzY3O9IMtYXwGqwmZOvOPTHPVw6mjWq3JiG0Bygy%2B0TCgN4Xu%2FAg%2F6ifV5M8TUWkFzQ744EwgCer1kppL28Y%2BlCvleWrtu9plSJmGIr9WM9HY68EWpkcUP6RNBOL%2FwrqFekM2H9qlF%2B3E24o9esLx5UqClAy24pQ2JnKx9GvBJVuXKFp8qOxM%2BrguZ2NUIN54vQelA38jAkDhnoPHVaJYNAGXMyCJcYmGpJr51LOwgBYadAiS3ZqZlGX12O37fK3R%2F7OeJfQGONvNosJa5waM8Er1rIqTu6ffTDjqDFDcWOhxffW0K37rMOFvEhnXjhqsaYXlasLJ%2FVxbG3ejlb36Ub75JqNjDD5ZnPBjqkAVx59oi5T1Tgrnmk5SHXWnOcqZh7%2FRTJqoSVXRBCYWNItNA8RAoHV7m%2BZSmI0nheoMcKgnJHl%2Bgp2LAWOMBkQR2oEPH16taDaVsqQcTWjhb3YC57ndGpyr%2F2EGqX6Qznvi%2B9IZEn7NxurHB%2FpvcaEUZ2cy5dMPFAHSHq8Z2hxVuecEPc7eJ7nyM5vwI1KnAduWDZR3I51DTfy1vyhRTidaHO3ab9&X-Amz-Signature=4801ce4ff9726b969be493e861a163b04418d692738621d9e84aff1e7c70a37a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

