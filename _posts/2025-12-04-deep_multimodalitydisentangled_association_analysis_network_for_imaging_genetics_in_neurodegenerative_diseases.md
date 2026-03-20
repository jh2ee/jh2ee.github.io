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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUATO5FY%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T153053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIBS1Ayhcy62U3nbwRprsCd%2BfZVYGcC7IIbjfowKrs8LxAiEAtdDC%2BsoUwtHNnbxBEKp%2Fyh84GM2cOgq%2BlzwDfUtwz3Mq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDF22BxRq9%2FiJ4Z1VHCrcAy27BN1T5Y83RCQxZiLDYd%2FC3AcTEWEmXR1qSTVSpe9qZ8U3HkU%2FF6cv9rz3%2BrNbn0QsA7Aq1jOKZaXexoiUWoFbbD0QwNEMuzmJCsiPTRFhBiuE3l7pmJnDt%2BeImOxw%2FxtzAiUaToRmBVbpwpMN8BsORuBj0gBZ7fssxJW9mykW6upvV2s31AIO1a3Fp%2F7sjr2QOkW2%2B%2Fv%2FPpLVYO5NlLW855XNJ0F2E0Vhl01O%2B%2BPi%2BcQG7jSvNntOIPcN6BjNM8hFoZarhmNC1Am%2BOCri29Od8YI%2Bwq4v87HAY6YK70NwIWRsQBxuD%2B0uUUssrqXJ23uUOr%2BhjJzD6wWOqYGsWZ4zfKQ5nZLxLd%2BKidYMY47hj1tWTKSrVjpGUp7wTdjB%2BAeG6xntiltqn8Jv7HrugKLEtSLv5e%2FqES%2FSm58ky74v8gZMr25hdsRc2OZPsJ%2BlFV5dnOkIVPSgw2eiXUHXDd1vRHojqHpe%2BCxYkNmRQ7DNqChVlBSsOcGXrLwEX8T4kteD1lsQYyGIJt9E1sakVNVcA7AM9nNABfZpQXWhcSMoJ0k%2FJZlrG94358DlZXakBThCopdXgUSPyqgCOk3H8GG%2Bw%2BGrzCsXiLSk2JsahYYqD0dpx%2FV8V618r2m8MMym9c0GOqUBIYJTffDN3Vl6kYwbeyAKOlJBEImsfvza0SDsYThpIBtRtIUXrj3D8euu2fhx5EOkDX5E7oknF87BnldfOhLwWG1GeMH5dxPbHwA5lECbbuN7Y0gfHXH9N38aO%2FyYjOhwvJySzgHuYD1qQ1Iv1DpYYNqUN8DnEpMpf9yw%2FeQO94wLvEgpkuJX1gEOeuk2U9u3qdCb9LuTrZllU9mNq0gsV23KrxkG&X-Amz-Signature=a3dbdb290eca3d401328c47e239899ab510d9f8f1831a07d910b405262b3be75&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUATO5FY%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T153053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIBS1Ayhcy62U3nbwRprsCd%2BfZVYGcC7IIbjfowKrs8LxAiEAtdDC%2BsoUwtHNnbxBEKp%2Fyh84GM2cOgq%2BlzwDfUtwz3Mq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDF22BxRq9%2FiJ4Z1VHCrcAy27BN1T5Y83RCQxZiLDYd%2FC3AcTEWEmXR1qSTVSpe9qZ8U3HkU%2FF6cv9rz3%2BrNbn0QsA7Aq1jOKZaXexoiUWoFbbD0QwNEMuzmJCsiPTRFhBiuE3l7pmJnDt%2BeImOxw%2FxtzAiUaToRmBVbpwpMN8BsORuBj0gBZ7fssxJW9mykW6upvV2s31AIO1a3Fp%2F7sjr2QOkW2%2B%2Fv%2FPpLVYO5NlLW855XNJ0F2E0Vhl01O%2B%2BPi%2BcQG7jSvNntOIPcN6BjNM8hFoZarhmNC1Am%2BOCri29Od8YI%2Bwq4v87HAY6YK70NwIWRsQBxuD%2B0uUUssrqXJ23uUOr%2BhjJzD6wWOqYGsWZ4zfKQ5nZLxLd%2BKidYMY47hj1tWTKSrVjpGUp7wTdjB%2BAeG6xntiltqn8Jv7HrugKLEtSLv5e%2FqES%2FSm58ky74v8gZMr25hdsRc2OZPsJ%2BlFV5dnOkIVPSgw2eiXUHXDd1vRHojqHpe%2BCxYkNmRQ7DNqChVlBSsOcGXrLwEX8T4kteD1lsQYyGIJt9E1sakVNVcA7AM9nNABfZpQXWhcSMoJ0k%2FJZlrG94358DlZXakBThCopdXgUSPyqgCOk3H8GG%2Bw%2BGrzCsXiLSk2JsahYYqD0dpx%2FV8V618r2m8MMym9c0GOqUBIYJTffDN3Vl6kYwbeyAKOlJBEImsfvza0SDsYThpIBtRtIUXrj3D8euu2fhx5EOkDX5E7oknF87BnldfOhLwWG1GeMH5dxPbHwA5lECbbuN7Y0gfHXH9N38aO%2FyYjOhwvJySzgHuYD1qQ1Iv1DpYYNqUN8DnEpMpf9yw%2FeQO94wLvEgpkuJX1gEOeuk2U9u3qdCb9LuTrZllU9mNq0gsV23KrxkG&X-Amz-Signature=a3dbdb290eca3d401328c47e239899ab510d9f8f1831a07d910b405262b3be75&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662S4ZLQ4J%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T153053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQC3qTKCRCa5wveZKn6WDTImz%2BC%2FOphx7x9FrvZBIChgMQIgNEyNUCvbGiV0CCMvx6zxaNh7b1bDHEd%2BN65jYuLskM4q%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDCZ%2Bbaojls44U8nuGCrcA7%2FN7vHVHDa9bXMQbYJDywsFp3Gj7AcISZdubc5hWsIWfKCDpLnZKB6xt2EdLmXXpFULRE2z82dymBfvCsFcYFJVPOcuYHz7dl7dd%2FaQA%2FXC3eQRZaFFQlkQuRqf19Ycd08xZDSMDxXneu4heeiEhEvJ85YRW638QC3qW6xeL1b95FXpXEcb7vhfbZ8LDIkRdIcnpqvz3YlhJ3VTVRRc0IEOgTdJBnWkvvsZGz3%2Bf0dP5lrMm3G%2Fp66ULuvByG6xtNoixkjp8e38DESwin3ri81v2XtJB6FIZ0uAowxJm1dtJd12ZZsll9TARVtPjUAIiwGDIWjgyPLIEPb17YO3GpEsrRbFYz4dH%2FgxqhxEv4CnrbG4ZNcWSRsMloL0UT4ky9P9IBb2QyEg8gMYESfBGSu2qKSzMA%2FKDyHW4ORw63kzpB5L6tCUQK0Lz7G814JB63mDVJ6MxM6UP3ZS7JT5EjqEsWEMsBD5DU8c97DL3MSRXQ3NWHx5d1pkGG6O80g3HAltIqYgF0RSVFylz1AWhI6DLjis1i4zI%2FZC9C5Rk8VFSaqwvduCjKt34mVEytGOmGiBx8s%2Bm11ESZs6EvvFZlfSYXf0BpMYm9nXl8q2DVRO%2F8QpF7fMbDvB0mXsMNum9c0GOqUBCVjuHVc5gR7uPDb2Ra63HIPpKkw0GkpSp8m9SWoaKKy1jyg47Qg2kZWw17lcK46Ae3Z7bZ%2FO9V6dbWmsUUCAATaSLVK1r0Gc4J5Rt4ar%2BPy86pcoPuS3DNFSBRuZiddM%2Fjkd%2FJttQMhwrSKq%2Bt8pNIxjjqMEjnIUQ%2FDgSILL9hLtNse0FzMplxpapEB%2F5Lhn6hL8%2BAD%2Fpxekl3SSoQlq3NnyRP4h&X-Amz-Signature=caf92b6a73babee6cdd652029da6c2bcb6d15ad3c0b442342ac688f3a57f053f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZ4UFTER%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T153058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDWSokAT7dgoI3Rb8Tr5AvxdvjGaRHwZFX7pJBhIvtLxgIhAKxkrHY0HDpSTmeq1mevTZsdoLZbCpu5poen3abaqDhKKv8DCDcQABoMNjM3NDIzMTgzODA1IgwRxWi%2FQ47FKUikZ%2BMq3ANfPW3ltXHBC8I9KkxbqELjfw9J92vcaVNWnWP2cH40hF5S4j%2B0MCi0ypoxw2BwYm2xVwkGBwjYXt5Km13UKscg7VB%2B0xz4nxYfgLZMMmBXFAjK0GghseifJ5O4EsUhb0DEAKQ9ARlIYy1BY9qqFBdrqycr1y2VoZ%2F51RNHW%2F7z9yHztVtg3%2Fig9OTyjOuo6hoIeo4lYCrTB8WJMrT6FlAescN34SbcCltrptBb8DX5dVRDb5M8dbpfPGjYTL%2Fl%2BJrkQ%2BUOGv3LqqtI5JCttI2xY%2Fa7oitD31xWIWOX67hMLI5IDLWpDJwP%2FdNhbGS6tuQHaJck9%2Fj68K1f8BPnLCVbAxWBgjS7HLk55UkD7rvO1%2BNkf1oHrRUcjQii99mhnxj%2Bs8NLL8M9bKsTHrliTJbzXaxXchJYrZLoDebkcJ%2FfjU66H6hzwIz7WT3vnQK0Gv7NW8bmwJf46vcX7gT5qNdtRbJMEhzQBlwzj%2BieoWCLj%2BJVFokHJxMtMp5Djj6b2dzk4N4uOqp0dOQyi03K29x0vtz%2BSvaPXi%2FSodqc3Tdyj51iX1zM0NPxEjg8MOLRsjLrqGtTHaIA%2FkTJDeRqUl7oe5YnMGC7p60lLK2Vap1DE9eWe%2FHGjWFp6O%2B35zDepvXNBjqkAR0BJ9tklQ6X4ay8%2BgWUvLDZxvEu26zs%2FOAOILCWZep1Gdr1GRvUVw23ZuLSts9O4SRNU0OpxdHvNBeO2jGXg6U%2FcS1JGt1%2F97wtl3bSUHyTv7NMLLZ4bw8xXQkSqerRCsnIVD7TejQYMOcd1EYAC2%2F8Wp5bv2rjHfXauj9KeZcllEqv%2FzQaMvrhVmdEo3jf1%2FKEGFNcLqTGf4SoC40qztxqgDn%2B&X-Amz-Signature=ca6b6928e22140ad7fb3fd955d127ff4a10b5736fd4333086cddbc4d95c8b7ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZ4UFTER%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T153058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDWSokAT7dgoI3Rb8Tr5AvxdvjGaRHwZFX7pJBhIvtLxgIhAKxkrHY0HDpSTmeq1mevTZsdoLZbCpu5poen3abaqDhKKv8DCDcQABoMNjM3NDIzMTgzODA1IgwRxWi%2FQ47FKUikZ%2BMq3ANfPW3ltXHBC8I9KkxbqELjfw9J92vcaVNWnWP2cH40hF5S4j%2B0MCi0ypoxw2BwYm2xVwkGBwjYXt5Km13UKscg7VB%2B0xz4nxYfgLZMMmBXFAjK0GghseifJ5O4EsUhb0DEAKQ9ARlIYy1BY9qqFBdrqycr1y2VoZ%2F51RNHW%2F7z9yHztVtg3%2Fig9OTyjOuo6hoIeo4lYCrTB8WJMrT6FlAescN34SbcCltrptBb8DX5dVRDb5M8dbpfPGjYTL%2Fl%2BJrkQ%2BUOGv3LqqtI5JCttI2xY%2Fa7oitD31xWIWOX67hMLI5IDLWpDJwP%2FdNhbGS6tuQHaJck9%2Fj68K1f8BPnLCVbAxWBgjS7HLk55UkD7rvO1%2BNkf1oHrRUcjQii99mhnxj%2Bs8NLL8M9bKsTHrliTJbzXaxXchJYrZLoDebkcJ%2FfjU66H6hzwIz7WT3vnQK0Gv7NW8bmwJf46vcX7gT5qNdtRbJMEhzQBlwzj%2BieoWCLj%2BJVFokHJxMtMp5Djj6b2dzk4N4uOqp0dOQyi03K29x0vtz%2BSvaPXi%2FSodqc3Tdyj51iX1zM0NPxEjg8MOLRsjLrqGtTHaIA%2FkTJDeRqUl7oe5YnMGC7p60lLK2Vap1DE9eWe%2FHGjWFp6O%2B35zDepvXNBjqkAR0BJ9tklQ6X4ay8%2BgWUvLDZxvEu26zs%2FOAOILCWZep1Gdr1GRvUVw23ZuLSts9O4SRNU0OpxdHvNBeO2jGXg6U%2FcS1JGt1%2F97wtl3bSUHyTv7NMLLZ4bw8xXQkSqerRCsnIVD7TejQYMOcd1EYAC2%2F8Wp5bv2rjHfXauj9KeZcllEqv%2FzQaMvrhVmdEo3jf1%2FKEGFNcLqTGf4SoC40qztxqgDn%2B&X-Amz-Signature=58ceabedc951090f8b0aca02f06d4bc7a894990b2fc55e20e2b34a883f4e4838&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WBD6KNV%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T153058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQCi6KjTLED%2FZ2e%2BVnXvkIQRAmcJsWwHRjcHHql4MvFYTQIhALa7K2zOXaxA3kd8c7QqNOizBtjcXU%2Bml57ehKMVcu84Kv8DCDcQABoMNjM3NDIzMTgzODA1Igw6nXj4D9yoiUx%2B9Coq3APMX%2BwPXFy0FibNqyB8brd22DUhrvsnnf8ITnzlblfh5A065xXzkNzatz0XbdvFI07Dt7RFfK6vh0evDHledRd1QnXTN01oiHT0N4Adj09BVT3A4KcQV1feujldiQ8hm930bASFP%2FrvcgirwtYo%2FWsYolD8elDLmWfpNa%2By%2FCBX%2FG%2BQYxqOxqxn6kwpBp5gzOWho2knqVvvj3oF%2BDE4sxvcwVJSEbcKTpSMXHH3wHSv0OiSwqnvgrkhB7nMNbmQdsUuHPb1Y3Yq0gi4p3Mn9dOGWUs2tMUQk9T4UCJHCQlnQTBkmCqGqIMeyQptj57fxOX1UH84V2rx4wooFnvPkZ7llbODyZilaNCK6QmmMyM%2BGAMS4DuilNQIGC%2BuZMWRN2OfsZcpTr0jZgxMcGz6GzeX3taHrdxK4x4C2jnxWEA%2FUiIlkvzCid6b1NlvylGniNJY1NSOCPXrHNtdxnADE%2Fb9A6swRUEZUrj4fcZ5%2FyfTCIlA48KjFNe%2FayqlmTn6GEx7E5rUIFrSyT00m5f1nqv%2FB15v%2BiSAmWRQKNPEFaSVXmpHqneCcivG3ZQ8jimBlSufa8VPVX%2FtA%2F0AUI%2BCG8EjkUPoPpxTSw9GxmwDesJhoZodfmUPn1SkSK22YTDbpfXNBjqkAUSl%2Bm6ypACzOKPSAsLRam0vwyFDboYRCPk0p94O8g%2FETaNg8bXtDVfG%2Fzk9BJ%2BxOyt5NaM0U3gFlX2lihQ5f8JBPW6YI7b1DCkvAAjNsJ3l86%2BwHw6xHj2P3YFW8VtZhMmjhfz1wJNCmSZKUY%2Frt3A0zQy%2F%2F8D3i8E6hAL0UTAsdDa7%2FlmiU4QgcxGlmLoUxgelSdTUjLBgd1MmuI1w87F2sRXM&X-Amz-Signature=15bf0162ccdd2f1d1b10105bda2dd8084bd9883357841343b25e226465510ec1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666QZBOO6P%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T153058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIBvX9%2Bz%2BDtj%2Ff9P4MEJ5iM97Xu5iumTFBxkvJSWgGpaTAiAuNimijfOBEKCdzC0AfgOq5MLP%2BPNk8nIjLu%2FpDJgd2Sr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIM9OfpPkuJ5KbGaFh2KtwDf7TEi6JXmlELy4nA%2F1DIgDP5QonTaVw6EuGu7tOQ%2F7M0LfJsadwX3jVokyIJBdfnmyE0ILbx5nKzwTbKOT8V%2ByZrnh9M0xQXQe%2FxQkUwYWP6Y71NIgW4U6LIqC7Lblj4GMlpxJCHLcffRax05yrmFnLFT6p6aiHIjmya95zr3T10uF8P5hQDJKSIs%2BzF5cd8swZAAS7I2cB5d5EKKCLZwU3uAm6%2Ft62mQbmA%2BXYJ27i42y%2Bu7cWCBtF81ixk4tjdcT2agLPsE3KDzal7pL5RvRq0pPmypxetf1unjBDj8Km05KUKDxxmnV5POyEaxXOq3O%2BzXWF5W2qsHAwKJ5vhg5qofc7ccg89spmZs%2Bp21S34U5pOSTIoJQqPscGTGwMSjbTNCwsnAnCDVPM3P1WOEHMMYuBDc3JlVefbvfkDsPtnHOCuNvNqmKHyjhKtx5rw8dGAAXm3%2Bhr%2Bf1BM37BRYuMt4FwAMZ4la9qE3E8slUEVn0wJDefrhZFOIWJT5Vvve1rr%2FkwJGKT%2BDhFCY267Q75HdnLQP11jFsg6YNzrZC4Ncy%2BMObifGqlHmqcqEYXEGST9mGKeV9mubyH0tw%2Fqo9h1Ufx4sJCXVfz1BicCIc%2FfkSXcomhqunxZDD0wjKf1zQY6pgH2YdlApJ%2Bms3yIzYVvgQlYYlrBr6nRaMuXtPFv1aLeZ3ubzOvb8w6kt5Wl12LsTOwqiVxQY4vyt%2Bng3C1NsiuxwPPL6JF0ZVP34SwFTCyhkD1iYsYCtkn5k3AXQ3uUT0FH1lTUXRMhyGLnPtt7ABKp06WSkZbcwXJpYtZ%2Bo1RmEqzIBgrVWyNAcdeEdjhQourgifixOZrGN4rQ7LW%2B5dPJ5UiWiwx%2F&X-Amz-Signature=e934456bc8d7b81166e116dd26db9e9f15c6ab9dc68360405de3d6f00f5bd67b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6UTWRNJ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T153059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIBEmBNnnOOkvFIUL1TCNxrdaiB%2Bv89cS6olX9Zs%2BPB%2FoAiBu1wZcGy2RW8LLMZ%2B4WdcK5%2FVjDXESUDEKjMuKt8eSZCr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMwIVS8uCUZQqfCR97KtwDCvmXtFbkkKiA2Iz%2Bzdq8tfgbXQPeMSyWowUHAXzZQX%2FA6Yzb9w%2FBIo9BJcIJFuswVWEk0PvhbdsPJYoJ7D2aQPT2fVDxl4WOW7fTODZDYmDwyk8AZZCoa2Tp2pXsibJwgQgiSVEQzH1%2FRpDCbl%2Bh8dyjuFkAmrPljKdqB4jn7BL%2BQhwuGG%2FfSjAz5OxUG%2BltWa2pjZjFLQnn3gB1UfK0KRNi16x9BPeC%2FBjo91Jz3qtiyVjVkgWD%2FDDHAgmfHa1Rb%2Fo4j2JD3qniOx9s8c%2FipUDr%2F0aOL%2B5%2Bg5fFPmmjIYH3OjligEWkxvftoQnHMyufRueim08fxgzf4qu4N%2FUhg5rv5mxnufNL%2FHIGEihRQyp7R%2BNnOAXKtEtIHykFfzzx9oM7303zb1Su0Si9bv%2FgPXPBNMw8Lo3OdJGBtoseD09qwin40b%2BLBA13yPcn3u6Kyjze93LKjnXDDXjLQh2%2Bs%2B9zAcBlsaY0zGPCzQaaIHKAkFcP%2F3C0PpF89rwhiGV59oKjxztQYBJ7zBGwcHjPxC9bxpvUuFvnUeE8a06OuKNYW3U0b%2BUxQbGroFKxCcH64azwipzLA2f7dtDWCOMsFMydAUsFAPo%2BTzpJ%2FuUgyHCDQYaUtGE0w%2FhAnvcwuqb1zQY6pgHUsd9NyHy%2FftwMyGbljt3xQ%2BX8Fg8CWPZBVjlNJhiSNz5Nf%2BB9hkBnWIk%2FG4XMosjF9Dz8GVuSt30PnRYOKv%2FsHVZ53PhJ3cEWZDbim6hXJvpXYJme7j%2BQJR996fdSyhb7uRNjmjAD96CfxlLcg7SyzIfqps%2BymnWbj%2B8oJtFVninpb5zxg2Gn5sr0fwcOhRXKfsCTQUbdgKdQ75MOPnj%2BRrxsqEoC&X-Amz-Signature=0898187248deac633f8c0c5db70943d377afe313789a8a74fb7e11d0a23c7d3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VS6MDDJE%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T153100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQCujcN2pTlcdYowCx2jKTVlSsZGR7mKpcVn%2FNfAApZL4gIhALB%2F4ffpI2WzgRQVrIE89zivJjeMnvbSCHj6mexCd4%2F%2FKv8DCDcQABoMNjM3NDIzMTgzODA1IgygsmqImPhqMkFOYiAq3APhFZfc1FV0rT7NAksxPScJHnyM9W48dDs73HQ67ISbWMfgwuO30vfY%2FeUMg0blcuK6U9nsMWxQgOqpmt8LIp4DCSynR4qa%2BwxfKHULt15aWTAeSRgOE7CYSYGTRw1PSKvN%2BwMKAkSSST1oP3%2FcYGnNubXI0kypUsRKcCmJnjNNoKx1z7aK6YhOp5aM%2F4wNuDYR9WDzPPLcZEOs3rrJhfebe8%2FyZRgl56F8mnPf%2FMLtmReP8IxVkoZdeAv9zs4%2FhXY%2FgoP%2FswyfLAvnN%2FJySo9Pw%2B5amd%2FWqg6jmNm0nknmtUzmVtQe3VvPv884tOp%2B1ZqDIGf3uL35N9KN1EN13b274v32wzvtEyHaLae2Zg89kmVuHvYU%2B8%2FGK30ieAr8SrFTXBmD4gAfIgezn%2B3unshGSAQJRulOWQqUoo9AVabBLBJ%2FPiPf1FqEW8yhCO%2FE%2Bgxwv0%2FM%2Bf%2Fv51rpyK8vJ6m3ddwJ4Hx%2BKG5bQUo%2BEC5ZmY7QBZa216cJADJZLYXpEsymyCXtxT%2F3rW6z74JDjqVwTJgNjI5hd2t4JQU4g4GAB3mAY5VHyfBRzxmmrWMOKE%2B%2BG43CZozU8z90Y929X4OMw8PI1N45Y4STxi4nS5FtAU8Ihvpv1sIhBLXsejD4pfXNBjqkATPkt2SaWi85Hs0A3IA9QM5J6LZB287k6xInZAisN8cxe5Q%2Fq1l0F%2Bq5wglsvIP96XqHNHFUyoBUi7tb17VXOEkzdX%2Bih%2FgkKmtc868r34Sf0xbGBOshDPyQMNmsNNciBJ46vPhf7KhvpaE2SpoofPssJ1yCcKGwo5uDLya2iKx9Q5b%2FK%2FcQ2zIk8n%2F%2FfjGKtJ3vsC93spu%2FQvUGXJuXClYAI9sW&X-Amz-Signature=0a8e1b8b149e1b8be44935529c0208b92fae73563e5385b68d3326a8aa15ae14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VS6MDDJE%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T153100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQCujcN2pTlcdYowCx2jKTVlSsZGR7mKpcVn%2FNfAApZL4gIhALB%2F4ffpI2WzgRQVrIE89zivJjeMnvbSCHj6mexCd4%2F%2FKv8DCDcQABoMNjM3NDIzMTgzODA1IgygsmqImPhqMkFOYiAq3APhFZfc1FV0rT7NAksxPScJHnyM9W48dDs73HQ67ISbWMfgwuO30vfY%2FeUMg0blcuK6U9nsMWxQgOqpmt8LIp4DCSynR4qa%2BwxfKHULt15aWTAeSRgOE7CYSYGTRw1PSKvN%2BwMKAkSSST1oP3%2FcYGnNubXI0kypUsRKcCmJnjNNoKx1z7aK6YhOp5aM%2F4wNuDYR9WDzPPLcZEOs3rrJhfebe8%2FyZRgl56F8mnPf%2FMLtmReP8IxVkoZdeAv9zs4%2FhXY%2FgoP%2FswyfLAvnN%2FJySo9Pw%2B5amd%2FWqg6jmNm0nknmtUzmVtQe3VvPv884tOp%2B1ZqDIGf3uL35N9KN1EN13b274v32wzvtEyHaLae2Zg89kmVuHvYU%2B8%2FGK30ieAr8SrFTXBmD4gAfIgezn%2B3unshGSAQJRulOWQqUoo9AVabBLBJ%2FPiPf1FqEW8yhCO%2FE%2Bgxwv0%2FM%2Bf%2Fv51rpyK8vJ6m3ddwJ4Hx%2BKG5bQUo%2BEC5ZmY7QBZa216cJADJZLYXpEsymyCXtxT%2F3rW6z74JDjqVwTJgNjI5hd2t4JQU4g4GAB3mAY5VHyfBRzxmmrWMOKE%2B%2BG43CZozU8z90Y929X4OMw8PI1N45Y4STxi4nS5FtAU8Ihvpv1sIhBLXsejD4pfXNBjqkATPkt2SaWi85Hs0A3IA9QM5J6LZB287k6xInZAisN8cxe5Q%2Fq1l0F%2Bq5wglsvIP96XqHNHFUyoBUi7tb17VXOEkzdX%2Bih%2FgkKmtc868r34Sf0xbGBOshDPyQMNmsNNciBJ46vPhf7KhvpaE2SpoofPssJ1yCcKGwo5uDLya2iKx9Q5b%2FK%2FcQ2zIk8n%2F%2FfjGKtJ3vsC93spu%2FQvUGXJuXClYAI9sW&X-Amz-Signature=e842ac27c1f5d006bdcbdee11b6b3f1a3670d3ae1ec112bcea9b966c38082c7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OL47SD2%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T153047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDK2sg0jiPgXjRlNyNtL2fCfxCRpxVrgRRPlm4jtnx7BQIhAIM4C2E6mJrxjidRvAkK3%2Fgqo%2BS8ugv2yh3QtxJTxBNTKv8DCDcQABoMNjM3NDIzMTgzODA1IgwErPvBsNM5xYYEDNQq3APJQmQP5Xw9OhGnDN3hRlAKfKpieQw0FUYmqxoMP%2FcE7TsD1EiKPXmp%2BzRuEOCPFAWT64wfp%2FUlHLZT1W%2FVYIHJ7zxe4r2Iiwsgn4xgTm2hIbS1ykRnudRE5BJqc2f5JmrsCb4FLhdGxWAqbatUXPbSkVRTjLopHiElQpH66GyYMNo482GBq9BwxoKctrlwOTX6QtDLrKrBCbsEmJMyQqSodoeV8ouuPyo12v2jcewMu24A7ZdUw06dw4Q1sgoKNOuPu5yfswKkanRwtFyZITof3%2FqSdMpKh5GkS51qN3MPNm2LElurula3tlz2JSU%2Fre%2FbrPvh%2FEmSwsg12gMtqHCVHrPIODIl6H5ycRyJ02q7SjwYpDWGBK1JcAhWTnHOwtnUlmfn%2FsmDk0ud983XlOwp0TSuAGYpGH6IhdOUOKzyHbuLqPifEvGz6C10%2BQsgmA2Yf%2BgEnV7HskTKV3OiJ08dQ%2FQDD0sqNAJegig3Al6m54ORK9s3tD9WArMa6M25in%2BYiYh5kx201LqA%2FKDFGSqoQVsEb5lbOO2h3rkiCOBhSPBjbvVZ9OM4sDEZbJmeYn4%2ByoC%2BHevVJDyTzwB7nL0RGXSObHbtD5oTRr%2B2x14olat4H2kbtsC8gUpS6DDhpfXNBjqkAUDGmHrMIdPK0%2FtY9qYOW4zE7XfIK1AbkY1cnPrplYF%2B8EE%2FnhNLmmzDkuIHuRgXLb3KtpKAfSrfouVTkouJYL4S1rAmlOR2dCaq0qovrTIHf43q%2Bc%2FUlrBQutGHtJBR%2BjfW4AMA8lh7cAfxBDbJ6Z3zJQ9z2s7jiWhyCYBcOyzkVVX3z6CXAl9JVH1pRCnAE1VKX1vfBs6ZWmQ%2FytEh%2BqRfmKXv&X-Amz-Signature=cb2515ad213aeae6403c92d3c37c51617e8877b14aeaf08cf05387b34edfa950&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZY2NX5JS%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T153107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIEMHFuQgaB7v8q1QMAnecdk8y9nDaFhcTWyB4%2FkkY3VvAiEAoGzJwagXE9bqzZNPveHLxJbrE6RlfcDlOID43N5q3GEq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDFOtWmGX29hK8hlBayrcA5QiuIkUI2L0rRLhSCMF8jgdCKgWtpBt4YfKLRvSSrt4EIRVT6LcrOMULWU0EKhuZ0PKGwSEU2NXZVLDuHlV4PFr0Vck38RqRhdB3VT89QqlqevbKdT9Hp13HsYbQnfkaBItsYdq2FXY1S2RYgmNoaIMMjbgEqQC4S1ZMmVqVN2JmA6ZCycWRWtL8EZKlqfa2HWEhvsZkJsXJvD9WaGRpbkg8D35LlBJTpXdfDPPNS5OK1AAvK%2BjN5gGU97N0geRxHrmBdNzldHlwD7s9PdpHuHAL4yHUwMeGeDHAnz4xfxG78JUQ0zCLLK7AkM0z4kWuUWsU9cfz%2Br6dd0%2B2POfS%2FivuRbrYTybuwT3So8Pa1fudi2nSYANIpnpukLyUXPVx19WAMXYQ%2BOn2GEMOYLGZ%2BsVFAWCfXw6eywLCgIPxRKRnBx3XBDI%2B836DWxSapnkZl2n3Hrcwb6ViIH3FF5gOwDTzWOmvl4mtI2aEGcnuufcLMP7EMLBDjC%2B9wy6h%2FXyFKbl59EBVuOo1%2FzLse3JVOK0Y%2BbzJ1ZHsuNA6DS4al%2B281EAA179LWgkvUSSSHdlz%2FieJFDiXFoSvu6Sez41zqM3Qp%2FOzDr4udI5eVfBz5FlkNi9Crusp0tfpommMMLE9c0GOqUBXnhyD4LEZmUY%2F7cCEGel2Wws7S%2BWRrHQ930K4MOu189BBx5CPskr6o7RKG9x02dn4gGgZq9nMejPVkSGb6TTQ%2FtbVxq07Fyu64VoUlrg4pJDPz0P7CBqZBAUQU%2FrNoCI%2FIKKVULKdhvxlEXn7oLUvx3uWF69ODOhzhyG674bQYDyXlINE16lnJJcd%2Fu0E9A7tymaaOQnDPVi1ZQ56ynjO%2BRytXZx&X-Amz-Signature=5ff63ae9a13d75b93549c857e7befd7551e6c15bf18d54dea2a68fd4dba96f8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZY2NX5JS%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T153107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIEMHFuQgaB7v8q1QMAnecdk8y9nDaFhcTWyB4%2FkkY3VvAiEAoGzJwagXE9bqzZNPveHLxJbrE6RlfcDlOID43N5q3GEq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDFOtWmGX29hK8hlBayrcA5QiuIkUI2L0rRLhSCMF8jgdCKgWtpBt4YfKLRvSSrt4EIRVT6LcrOMULWU0EKhuZ0PKGwSEU2NXZVLDuHlV4PFr0Vck38RqRhdB3VT89QqlqevbKdT9Hp13HsYbQnfkaBItsYdq2FXY1S2RYgmNoaIMMjbgEqQC4S1ZMmVqVN2JmA6ZCycWRWtL8EZKlqfa2HWEhvsZkJsXJvD9WaGRpbkg8D35LlBJTpXdfDPPNS5OK1AAvK%2BjN5gGU97N0geRxHrmBdNzldHlwD7s9PdpHuHAL4yHUwMeGeDHAnz4xfxG78JUQ0zCLLK7AkM0z4kWuUWsU9cfz%2Br6dd0%2B2POfS%2FivuRbrYTybuwT3So8Pa1fudi2nSYANIpnpukLyUXPVx19WAMXYQ%2BOn2GEMOYLGZ%2BsVFAWCfXw6eywLCgIPxRKRnBx3XBDI%2B836DWxSapnkZl2n3Hrcwb6ViIH3FF5gOwDTzWOmvl4mtI2aEGcnuufcLMP7EMLBDjC%2B9wy6h%2FXyFKbl59EBVuOo1%2FzLse3JVOK0Y%2BbzJ1ZHsuNA6DS4al%2B281EAA179LWgkvUSSSHdlz%2FieJFDiXFoSvu6Sez41zqM3Qp%2FOzDr4udI5eVfBz5FlkNi9Crusp0tfpommMMLE9c0GOqUBXnhyD4LEZmUY%2F7cCEGel2Wws7S%2BWRrHQ930K4MOu189BBx5CPskr6o7RKG9x02dn4gGgZq9nMejPVkSGb6TTQ%2FtbVxq07Fyu64VoUlrg4pJDPz0P7CBqZBAUQU%2FrNoCI%2FIKKVULKdhvxlEXn7oLUvx3uWF69ODOhzhyG674bQYDyXlINE16lnJJcd%2Fu0E9A7tymaaOQnDPVi1ZQ56ynjO%2BRytXZx&X-Amz-Signature=5ff63ae9a13d75b93549c857e7befd7551e6c15bf18d54dea2a68fd4dba96f8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6HJ2LNS%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T153108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQC%2F4qCURcyS8yrkm3cFvbQabK4M%2Fvgp0%2FHbiEYBb3FknQIgIReNM4Zu5C4MctXkRhxHBqQOixzr6LFt%2FJuePT3E3uEq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDBQIFG0w71grQmcm3ircA2rVzUqbfF%2B1NxKfXr4i3b5W4y792wi7dXWP8Sel8UNdtNan6qc0HfZhKo6oNmkJKsgjRm0XthyRf92TpdMXUYiWoGyv9WmzMxDuFSUpHzS%2F7V3uu2rK1406DlQrIuH3NQNMFwXKDn4jtqj07t%2B3giQUVD1N5qv75dhXJIcRvCPoXIvxlw8Gmp44bmj8fzSlxaghv%2FjHYRK3PzP7uj371MjS2iExmCaong%2F3CuEOD0YhKvm9DMbX%2F%2FljHWfrILG0L%2FsjduOIuTPUJI7M%2B2QIyvuSQN0Daj0GaWthMq90CLvNLcQzrHWKcHqBPnlQBwNixLh6czaOO6tGLjHmXenieJvdHt0avIOvukA61fpx8DlRaV2vCBHhomGSHFNmU82WFfnuMVDP2Q%2BjjhGpbKFwaQ47Cj8mPEl0hHgE8UR6uWqwKb3w7hBep88ef8irtFFS7PIMwg%2FIVyiTakbJZJCfQNz%2BMV5di%2FiChUWM5%2BGyvRLiR7wy88y7E6q%2F9mLLKXzt6qgcrqcBYL57POtQbhytPZEouDWvK4KbHWhuwsGrIhJKXXlTOy4ToZBDg3jQW2r%2FlgJcQg0jKMkcju4rIRW%2FN59XuvD%2FAYwggfbkPvJQ%2BfAyDfyCXMv6Pq6ySmt0MOCl9c0GOqUBscD5B9vDfmEoHMb8PHnwZvzgZIKO0JWiPhJDdi0iXQKGLDS2vwHn0exYoSVqgDC4f1kufhvOVgGaKLU5Hfa6NoFImf555dVouW%2F1ZA7PJ%2BPtQXS%2BqfLdlojTGNtdSmMDkD3jp2sn658EYeWpeFuuUMM%2FJ4vMjFfCSDblSSu3FY3PiC1XG6LV7pHmltfyV4e2D2GYUBV6osqDngmTK4ZnxhzEuD3j&X-Amz-Signature=a85d3b16fc00867ed218727669d92ba1dca84d403938d35ffd71a9f866969518&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

