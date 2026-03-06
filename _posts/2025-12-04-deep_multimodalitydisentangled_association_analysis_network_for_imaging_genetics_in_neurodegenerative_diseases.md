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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFBRUFET%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T082141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQDIA6RFSpPwrfAwA2IV%2BOJPo26%2Fh65HrOjdsIasqz6zOAIgKDs6or1WZNpfxDEqd5PRpr3Cs%2FSisFnjN%2B5vFomCR%2FoqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPjSa7V18qDnhcXeNCrcA4PdyD2lZgYdpSVNfgfxDMqVmKExYWRbmlSN%2BCCfkLDIOlqiZKO5V9Ep4w%2BwptmmlcbPczGpOE%2BHRbqRbWbIhXPcg90Vvd8qurTQ493AbbX4BNFpbrlKO41JTxAfwA4a4Iue2T9hB%2Fiktys0J7JNvXEwW0ljEvHnXOkFCaT6amwcRaVziE2Q81YQbhc5czCNEKpT0%2Be%2BcbGGWpUPjID4ofXk5fRfMSUsez2HVPYFs%2BZ5Bhk6T%2BSTaB0HpmmF1f1oGiIOx3QzhABhIERIPu0%2BVBmnKxjGTDOViqwYihz6Canjd1LKqqHoErTTfi2sAjt4ERJn8wl6pxccnjGL2gbaJCaStYKVAtqJN1%2BpVlkaOkyOvHXmvhgFqUOb1jaTUmbiGmf4IJ6BD%2FrWyLVQcR9g2wJwR0H6KRaBkVQXc8tmZ7vyUfjwnty4hCE1dV7p43yJ%2FgdvoWK4giVv1SzwS5xtXo2cOFQny61gp1mITkSMjdpNuJk0rIMHEmmJduMV24lp0rqq7tVcz8IAvyyOJosMkGFvgJr3lAQ70MyIg1vlP%2FAwFKd7zm%2B1YtSLCDsMtJYLUgH%2BkF2St1cb7D%2FzIzBn24J5%2BOosnNcDSYAFeBuvjTj3ZLJh2axwxsa1u9tEMPj7qc0GOqUBgqOMD6KdFX0F3wm9v%2Fe8lNrn6aAdlCQVEFlMZhuVREtSyotWG6QrZQyj%2BsHjqi7d7dBvnsjWSs%2B42RaNHxWb1aa2RvvK%2FjHKc%2FoUKmTcMbZXE8MiT6GGJjaOW1kiFM7SCiDEEW8qBh4DGe2Jj%2Be3B%2FuRLVvsc24uuXyaxFcY86hDqjcmloV1X%2FwOKDW0vz135%2F81ghD%2BArArqBP0bIU%2F5ZDEhDH7&X-Amz-Signature=1864b445a4b0e1ef11e9737819d36a24986f736e25a9843b26b69640106b6363&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFBRUFET%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T082141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQDIA6RFSpPwrfAwA2IV%2BOJPo26%2Fh65HrOjdsIasqz6zOAIgKDs6or1WZNpfxDEqd5PRpr3Cs%2FSisFnjN%2B5vFomCR%2FoqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPjSa7V18qDnhcXeNCrcA4PdyD2lZgYdpSVNfgfxDMqVmKExYWRbmlSN%2BCCfkLDIOlqiZKO5V9Ep4w%2BwptmmlcbPczGpOE%2BHRbqRbWbIhXPcg90Vvd8qurTQ493AbbX4BNFpbrlKO41JTxAfwA4a4Iue2T9hB%2Fiktys0J7JNvXEwW0ljEvHnXOkFCaT6amwcRaVziE2Q81YQbhc5czCNEKpT0%2Be%2BcbGGWpUPjID4ofXk5fRfMSUsez2HVPYFs%2BZ5Bhk6T%2BSTaB0HpmmF1f1oGiIOx3QzhABhIERIPu0%2BVBmnKxjGTDOViqwYihz6Canjd1LKqqHoErTTfi2sAjt4ERJn8wl6pxccnjGL2gbaJCaStYKVAtqJN1%2BpVlkaOkyOvHXmvhgFqUOb1jaTUmbiGmf4IJ6BD%2FrWyLVQcR9g2wJwR0H6KRaBkVQXc8tmZ7vyUfjwnty4hCE1dV7p43yJ%2FgdvoWK4giVv1SzwS5xtXo2cOFQny61gp1mITkSMjdpNuJk0rIMHEmmJduMV24lp0rqq7tVcz8IAvyyOJosMkGFvgJr3lAQ70MyIg1vlP%2FAwFKd7zm%2B1YtSLCDsMtJYLUgH%2BkF2St1cb7D%2FzIzBn24J5%2BOosnNcDSYAFeBuvjTj3ZLJh2axwxsa1u9tEMPj7qc0GOqUBgqOMD6KdFX0F3wm9v%2Fe8lNrn6aAdlCQVEFlMZhuVREtSyotWG6QrZQyj%2BsHjqi7d7dBvnsjWSs%2B42RaNHxWb1aa2RvvK%2FjHKc%2FoUKmTcMbZXE8MiT6GGJjaOW1kiFM7SCiDEEW8qBh4DGe2Jj%2Be3B%2FuRLVvsc24uuXyaxFcY86hDqjcmloV1X%2FwOKDW0vz135%2F81ghD%2BArArqBP0bIU%2F5ZDEhDH7&X-Amz-Signature=1864b445a4b0e1ef11e9737819d36a24986f736e25a9843b26b69640106b6363&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663REZJTGM%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T082142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIGTmmX9CY9jcdC%2FlfU0RhfvY3G6oh733WRujQ40M87%2BeAiEA0H084OZ%2FESz77ApDVbKciKYllQHx7catZKeMktu2wGYqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBlcECB4P3%2F%2ByM4zVyrcA4X7a7Tx%2F92nQREntnVzwtTiRm601dLiVZ%2BekJxVGjmWHwEJOCoab%2FrZPpGegPPWD4JXx%2Bd3T38KnjePM7HsmAYK4A8eGsMckpW3RH7vi8daso85N3oNvhiOL6FxluwUVpNmjdZgygY1WSVqvA4XEAW%2FdFGivfiRHex4rWimw6xxNPSlMfa%2BuC7%2FeAv6PfZAWvzUdv3iE1VJtVfUJfK%2B1Xj4%2BJcNequIsr4KZo3cfLv5EFXe2%2BR5w78ZmLsI00LppMBDrdyY4RwRs7Po40tVEPKwU6ozCeEPwsw4W3enq4Q5NHwTzwgFVZCYUetEA%2Bhf39bHelTLZORfEYLl%2BFmoM0YXxy4fQCfNI5SmXNAySIvf5Zxib7m5s9IGKi%2FKJ%2BVwFl5%2BB8IRb9Ltf%2FTcKIzXXCUnB0SvAOA2G%2BG%2FZIzvEuNJulSYiFNdWMJXTwFZsybtQaKAOqhuGLbpwo3jDkDbLgG10fYtADKJgHpfohluiVfCd7H630DHIUALBSujPEZeUV7UlmvDz8d4LcmHPAc1sj8zGlhP4xzYIcqzDA11zMbLrAFv5n%2BxiMcEz67LLWGJi9CaW%2B9ooTtOkrKt0oAMAFqb7I1tzIL8aUNTzDu4Qu8C0TOzmJcgRhOLCHrLMJv8qc0GOqUB7n54QBcKfaa6AttH1qWI1TEx0epGeRBjN6cRjM70Q1hwiGcfsyAlu%2B11nAvWaBogJwj%2BQ7NZCV2hbsOZqT3dFyi4Mq3QXbWwE4ufCu5SJRZav0BRiwEjoH9qQZWDihBlxX9IMTA%2F0apIaXZDSBVjSTvJIS0NrCkFMk5FGPxIvsl8xPIPEYRQOW58XBV0zhV%2FVJ9OSWckp00912AfQvLm8TwzrPCX&X-Amz-Signature=bfbe52059fbf12416780b5f592990a6c60186b72d4d76a51283ce24901a3c3e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLUPQGBU%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T082145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQDsbzYt1dDcfYNEEQMiGRAuJ2uzSfKKqehMT0Y2cUC1mgIgCkhnz0vTmvWEaECb9Lw8wMPZvh4l4GvBSGO8U3J1KccqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKJjcDn8gLZeUNna9ircAyFp4jmENuH1rhV1gpuh2tkNTJBPZI35yDChLMf6WEt8QYJh6dRiGuaf0tfJp0eFj7EPSzFJ62rpgDIFadbm5q8B76NhLKbAj2GIOEM0asjVjRj7Lfymma6mjP0KlI%2B1L4zWBxqBBeWJhDPord1KyUhJek53e1tqIKa2IyCtpDOeh7H4WJ1VD%2Fw3Cc%2FECRlVXzVFMJYYcvcwnP75AMVtyw0JRSVfqDFV7%2BETqoCy263l13wlhiQihos7xEEl10%2BGsB8QnPb%2FgPZucNc9ajjPT%2FL9RzbW0h0rekRTdbfb0jsdRm3DsY8c4xWG6pXW4sXMhBwT91JIfdp%2FXF0oEoS0lqsQAxhijQm8QEWtRnRgf8v8Ddrtl956eqtrdOVGJEPJn25S2mxhRR2vPbJOUn707QoVV8Tqw4d0cwHcYrlqENkjQWhjxcnWFH3OsFEwZjWjjQKZWTdkVoE9vYbuenSDJ4NEXzOEawhQIUzri15RxW5lloNHnzQoXyhX6oJDaQAT8pZhzvuCY73cUouFBFKq9M80%2B%2BC8zCdQw%2BivQbOCX%2FAUgNG0Sbqf1o4S2KyVfweQAPrJGWRLDtujga%2FiYPCX%2FyucmZy40B5D7hzoexAAxG8P9fLSn5WFos%2BQaiayMND8qc0GOqUB2aHkf%2BkXUgOmAG9MDxDq323Akzp6%2FuPTxMSg6VIGO2eXUBldpqG3yBtWAJKwzPJyM2knmpDQHQG3aZCajyQIzReHVfK7RPzoJrruV0J2QJu%2BlnK4xTuw4AogyxdTTkgvBk9AR19ihvaBvvr62oggGsnx7jSqj%2FjdAdZsEaJWqATRd80%2Fl43%2BBhuLdggmkf8JlTY9k3Bon89%2BSSklODKsvOmCEtMU&X-Amz-Signature=fc41973d746f2629c082eb3b82269a2e3cacda72f5d9eef57ca50d9e577c5156&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLUPQGBU%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T082145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQDsbzYt1dDcfYNEEQMiGRAuJ2uzSfKKqehMT0Y2cUC1mgIgCkhnz0vTmvWEaECb9Lw8wMPZvh4l4GvBSGO8U3J1KccqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKJjcDn8gLZeUNna9ircAyFp4jmENuH1rhV1gpuh2tkNTJBPZI35yDChLMf6WEt8QYJh6dRiGuaf0tfJp0eFj7EPSzFJ62rpgDIFadbm5q8B76NhLKbAj2GIOEM0asjVjRj7Lfymma6mjP0KlI%2B1L4zWBxqBBeWJhDPord1KyUhJek53e1tqIKa2IyCtpDOeh7H4WJ1VD%2Fw3Cc%2FECRlVXzVFMJYYcvcwnP75AMVtyw0JRSVfqDFV7%2BETqoCy263l13wlhiQihos7xEEl10%2BGsB8QnPb%2FgPZucNc9ajjPT%2FL9RzbW0h0rekRTdbfb0jsdRm3DsY8c4xWG6pXW4sXMhBwT91JIfdp%2FXF0oEoS0lqsQAxhijQm8QEWtRnRgf8v8Ddrtl956eqtrdOVGJEPJn25S2mxhRR2vPbJOUn707QoVV8Tqw4d0cwHcYrlqENkjQWhjxcnWFH3OsFEwZjWjjQKZWTdkVoE9vYbuenSDJ4NEXzOEawhQIUzri15RxW5lloNHnzQoXyhX6oJDaQAT8pZhzvuCY73cUouFBFKq9M80%2B%2BC8zCdQw%2BivQbOCX%2FAUgNG0Sbqf1o4S2KyVfweQAPrJGWRLDtujga%2FiYPCX%2FyucmZy40B5D7hzoexAAxG8P9fLSn5WFos%2BQaiayMND8qc0GOqUB2aHkf%2BkXUgOmAG9MDxDq323Akzp6%2FuPTxMSg6VIGO2eXUBldpqG3yBtWAJKwzPJyM2knmpDQHQG3aZCajyQIzReHVfK7RPzoJrruV0J2QJu%2BlnK4xTuw4AogyxdTTkgvBk9AR19ihvaBvvr62oggGsnx7jSqj%2FjdAdZsEaJWqATRd80%2Fl43%2BBhuLdggmkf8JlTY9k3Bon89%2BSSklODKsvOmCEtMU&X-Amz-Signature=91e67824da62fea409f19b02b7f1cfcf0bba4f554c9372d9ad02be41cc76258a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RXL4SSJ%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T082146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJIMEYCIQDVOeIKKk26c0ys6jgZSNhurVJNEsPTN4OYZDWgp7j4lQIhAIXa8EA%2BAQSDeXmzhcNEwwHe6exsNycNDisQYOkhpW9aKogECOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxryK4kpByemaGxRWoq3APWXRkWhd4%2Bquc3SXwGoDtzqkzvjadm33Nqq0oRKvCP0lS4Es82Vsi5kdWRo8Ghx6CTCmLF78Oi7fYHXI3ApzYJa6h2WaI%2BBrk7wyX42k3G0scST1jIwsxhn3rAfCIrwyid5p18aAy3YCrOPxrqay1XbRlduTnDQpqt7GKLNY3%2B4DqYkvSyJ99Ow93kXQG2DN%2FxfKoUqd5Yks%2FjzKbHJNZt21h%2BIk%2F%2B5aMcG7UEyKpz9FMpqnW6hvFWFH5aFSrjRB3fH8OepMu0HNMS0t4T0QN1QveF6yFr7nwdhHRRw4LpHG2UBudD0BG6SEIWkjqphDoeNCXS2qlID4ABPogvh2zNNYADdlLLl%2BkRxEmUelINyzln9RTw%2FBwPc%2Fyy3uMst3UYpYI77dFVGZcz5a5kMv5TRCVup2pmTxD5kziBqXkjGxpAS8nkUh7M%2FIi6FW3syN%2B2EYlJRmDTOmnD6lD2i3SXR7e%2Foc6%2B1NO3sYFUueTpXh6symVnw0YpQyBIQzXLhKwxpyeBe1eSP5%2FIQpgB6UCaRzk6FSVunhh6wpDt00tpdfR1EuXX6OBmicT90nL7ZCmmx%2BcZ%2BXrieT49yusNNTsEnb%2F40Qq1nDcRYJJF55yVlLYadFM6gKdaPYHnrTCf%2B6nNBjqkAVA2fFKwfw4TDhAsZrWvWfvCWmInw8GsZ4s%2Bfx%2BowUQKBLeerbNSvG0KXNq3u4mdTBjkJbDQDUZ7JS74Zm8j0vk%2Bzpf%2BZRwYzu2igK6%2BTLXn0ovv41tYFKMd6b2RaTWh3%2FrPt9QYRLZcrikNO2lNs2vlAVYt%2FhWs%2B1JPN%2F0qJitDRWS05Eu4%2FslTs1uELMR6zs2uhU4we%2Ff268Zo3CnTN%2FkztB1p&X-Amz-Signature=3050a35c33580d6676a8994ea68339022cd5d576cb8810719d59309f910b135b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZWHDE3P%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T082146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQDacTv7dC0k1sPi3ozvMluOa0DgmMKVzN3NTW2kg%2FmPFQIgRxWGcV617CxU68tHJpEm8A3WmkeWJUYXNYQaKqO9B00qiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPDj%2BYiM15fTziwtIyrcAwsvH254Fxe6xfTw37gjdIkX0dsMfvD582eRUhQxCPSxo%2Boc5uBwHtjLG2tnHhLZ9oCZu8OkfmhB6kD%2Bh4dVtiE60hSHFYpY2%2F9hT8DJu96JRUP8G83aooVE%2BQhKhtoKwPzbSP6tjdUogm5Q462XhRqK1coMQEevS%2FazDSQrmlJ%2FEalMPvCEDVOrw49r%2F2cEWmHSAeM8Q6KluJHqAJ6gxl0MhU2N4VBC5ADV5xWEBnTDdfjOcK5C87Ps7Vl1JawTjhbq6ske77zK4nkd4clQV%2F67K9l7bm4Zig5E6ATO4ItLkd2W6OOr1DelNcFESOls%2B%2FdLGT9GvArOzZ%2BSjFukHvHQEAQP3660m%2BeEF8rwaXKtNQG2gwKOX4eGqQrn7MOL78lCb14sgqAzZHeGtUAmV2%2B0jW3tR%2FHnFkS5WGyx4XaXVBwdbDWEBX9br6cYnLxkCOCj0R7LCUb1tbhh2idt4EFNmr%2F9hU6cUc9MmxX1zhItIEaHQWhT0%2FRojo3vhiHPpf3AicZXR00s0LoWkLt0fwx4Sps2WHqE0%2FRgC8Vwm9V4M6iaI92lGMfS0HK0TPlq%2FQEVF15VYUYR36S5886z6ZwS%2BRp8%2F08sme4w79DCRiJ93ZTeDHhGfcEVyUiTMLP7qc0GOqUBAgv64lDMInbnb0JGvjP2VqF%2B8mWRV9d%2BHDgbhVdlDT%2BR6Tqfi6qRVbVGyfkn54lF8ywL%2BAJ4pbj%2Bvum%2BZuv%2BUn9rwAMpLQ0f5tqFKnS5eywh5JPBKcCTRXkSl9jQJ%2FgMbiAQBzYiiM8JNDJBD6LkZ7bG4KTPsc8T6i78F7r0OPaA5aKAfco55x5WY2FSsRv9RiRG%2F7Npxszzx4ofmtC5CrnW6vTm&X-Amz-Signature=0ffb27e28143cc81b04ab9d3be9a544ac26384f7ffab8a086f4c74fefff03184&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEZCJUCW%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T082148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJIMEYCIQCFeKzUODfibVGSFtrQj6fMvOhD5LqjZHtV%2FmRRigCzfQIhAO0kCeOFbAYSFEK5Kt4SqL%2BmRWH5gnSlIszCb38f4JZUKogECOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwWOPeW5qKlSCq0Hckq3APHQb%2FefGcjC0TU8oW%2Bt0r2PyyaQjJawl5gKaxI87%2BDEinRc%2FDQFXgxyQNO0WqNSEaoduQgSMqJbZJmpUgpSRIBxSCGxtDmW3cmu61C8mo%2BRy4YH3W74PEQZP%2FOIBe9Hr8dBnseH19ysM3xxs%2F2yEztKlHgL3yHu42IJo68QhfT7qjYTmEclkk4FBPBm6DkOc9k%2FT0eCFjdD5nsjX%2F%2BCruvY9kZRbyDsroGtdS9%2FAGDfuSnQp%2FqwUhh0BFYrsl1PwPrGSQtmNfeL8msxvptfPWkINr4ffzh0Ezi8YUKtoMmN8nkoFERPzULUA%2FcgyL5%2BKuf3g3VX1SiokgoV2wBnkDnQ1S9PjDAEpaBWI%2BJndrH94kt366fQAY3ZQCqggcxJUUaqo7N%2Bw3498ffrmfXGO3yvMiBzRIGHTQQgAritWXho7I7dYu3%2FK4aME%2FBd8Xt9cJwEDNHO4FzfZxh92p7dlmwko9hvqZKuWnOa4%2F9c9lMlKrX9%2BnTFspvqnAW%2BDx4KUqJD7h8og3SSz%2BoeA5Wcs1BLZK1BIg6th6lXMKqb9rIBXZfUk%2Fc7ARVv5emMs56%2F%2BjSSZnzKXt8fFINQcq9X%2Fuk23Xp9GLPrKrnGzJxEh3tvF7%2FrLVEXZqHQAzRRjCp%2B6nNBjqkAWhXIpXRfn%2FryxwrGS3zGxsS2iY6WYX%2Fj15VLxM9kcdIOfFoSdSrVaVoAN95XxQCkmDZcDEDZ2DvO57NgHbkDn9AaqPl9rx%2FWBZENIprfXWpH9XDeGC3OYZBFgQ3x1%2BiQXAc4NJmTqy58CL74YxmFXcLhJXn8e5L8IhQphAMPte19ngNF72y0LqoyP8TEGvmGv%2B6rNPz%2F8otUojMvStCK7IjOxZ8&X-Amz-Signature=4fbd194613496e8265b7c17fb3292b0f90e3555b7efce87f486557293f204578&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEPEN7IF%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T082150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIB3%2Bu8zcJHVU%2BzDMibp6qPZIJGBjqpD%2F9CoD7iysyTb5AiEA%2BG2z3NhPB6RU4B%2FBG0MpsMsPpV33nnWvXImvivz07MgqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE3xD7bHKoMo0yyyeircA4yVc21A2zPlxAlw1LCJIwbgx%2BE1I%2BmhuwyUqTIqF6sweN177NJA4RAZJhkX2Xm7%2B2PIhxLCcC9clWyb6pQou5Tu0RKaUNREl43Kwb3I%2Bnqve9P1yytvDjbs0HKTAIwHsxWGt3nCvWuQ0P%2FdMTYnQu4KDZifelI65YQ3LC2r1o9ShgJ%2FswLbc8KpzpHQltv3r1QOfLn4IgB9cILSS7TVbeVMGumSHLLuDRmucqIxx4XH6ghnzc%2FJSz55ALf2Ipe6zSwlLKq6fXJgDxRXJO1YYQjm1neubME6GrVum94stE0faEqJgUkckSNr2lGwAS2R4vz%2FLrAXXBFiyfp7Fyi6gTB0wyNFkLTqtUaS3WrrVP3Q42fKaFXwCuCPHcs8UGiW7oiNU0mHVz38mfb%2BWI4NXnWXxaIkLztriuqhAXV23zbWKvNLyvxEc9hPwRXH1KGW%2FyRLUOQvG0OQK%2F9BwaRbZlaxL8FO8QdDtzIpwGSA101sKwDZgHuCs7Tkk4JqU3PFpv9Yv7tqQD4OzXvzpdFhY7LtgErcBG4HnUc11BIwBz2Fyr5oJJwRQqlebOeiZbNx5poZbZZqNPUsdVkfKOZ3C3G4o%2BOp70JiXSc1L7Qw02DyH7uk2rU3ozXWTi7jMMH7qc0GOqUBqUaKYoh4rdbUJ5d4YQaSNqyEF48bSiIU85hKkdNPv4L1HPaRopXkBbRNhKe93q7rfyrVmDdR%2BIzAsiDQxv%2FbsyhXK%2BBgAApdhPeFpZA9Qk7rZ3IIjI6xtLFVhEBTV5JdgFCOQ%2BHGjMLlo5QW8rWkCNZIGqGu42TEE7linCjaEgynDo%2Fu3PEzlyAmsmg31o2srIKju6xTlZY7bepp%2Bf9kZHLlFnY8&X-Amz-Signature=7070a8b0cb210469050390c3069e60e112368ed9ac22af87770368e1a599d2f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEPEN7IF%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T082150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIB3%2Bu8zcJHVU%2BzDMibp6qPZIJGBjqpD%2F9CoD7iysyTb5AiEA%2BG2z3NhPB6RU4B%2FBG0MpsMsPpV33nnWvXImvivz07MgqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE3xD7bHKoMo0yyyeircA4yVc21A2zPlxAlw1LCJIwbgx%2BE1I%2BmhuwyUqTIqF6sweN177NJA4RAZJhkX2Xm7%2B2PIhxLCcC9clWyb6pQou5Tu0RKaUNREl43Kwb3I%2Bnqve9P1yytvDjbs0HKTAIwHsxWGt3nCvWuQ0P%2FdMTYnQu4KDZifelI65YQ3LC2r1o9ShgJ%2FswLbc8KpzpHQltv3r1QOfLn4IgB9cILSS7TVbeVMGumSHLLuDRmucqIxx4XH6ghnzc%2FJSz55ALf2Ipe6zSwlLKq6fXJgDxRXJO1YYQjm1neubME6GrVum94stE0faEqJgUkckSNr2lGwAS2R4vz%2FLrAXXBFiyfp7Fyi6gTB0wyNFkLTqtUaS3WrrVP3Q42fKaFXwCuCPHcs8UGiW7oiNU0mHVz38mfb%2BWI4NXnWXxaIkLztriuqhAXV23zbWKvNLyvxEc9hPwRXH1KGW%2FyRLUOQvG0OQK%2F9BwaRbZlaxL8FO8QdDtzIpwGSA101sKwDZgHuCs7Tkk4JqU3PFpv9Yv7tqQD4OzXvzpdFhY7LtgErcBG4HnUc11BIwBz2Fyr5oJJwRQqlebOeiZbNx5poZbZZqNPUsdVkfKOZ3C3G4o%2BOp70JiXSc1L7Qw02DyH7uk2rU3ozXWTi7jMMH7qc0GOqUBqUaKYoh4rdbUJ5d4YQaSNqyEF48bSiIU85hKkdNPv4L1HPaRopXkBbRNhKe93q7rfyrVmDdR%2BIzAsiDQxv%2FbsyhXK%2BBgAApdhPeFpZA9Qk7rZ3IIjI6xtLFVhEBTV5JdgFCOQ%2BHGjMLlo5QW8rWkCNZIGqGu42TEE7linCjaEgynDo%2Fu3PEzlyAmsmg31o2srIKju6xTlZY7bepp%2Bf9kZHLlFnY8&X-Amz-Signature=457dad0598cb9b0458e2b4bc9c805232ce20ffbf9803665ad23eab7a1878c835&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TN57ZQDQ%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T082135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJIMEYCIQCVrDOKvfwvv7IKO838Rzb4jj%2BsuYIgXdq0wT%2Fp1zfvZwIhAL%2BIgA%2B4Pf4JOQG1xLDZHmymZwR%2FW2S8A0SteedY8TigKogECOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwB9I8m%2BEYaI4qRfScq3AP705u1qqq5foqnxaZqb27xGHCcg1fRGSxeuEw9c35BP9nSjuW7Uy4mfuH9SA0t4lyO4Jz%2BBYMcmyar9Q3FWgfciMLT1MiXBmP5odiyiWQIKy2abne%2F6DP2VWhfRZ2C%2BLLsJpNfCratWoywRVPKQ6QKaxaRJN%2BqTR17jmKafhqXyELrq6ZgO5mMKFMIPlClvgcU4xPYzuwb9Uglvs3u1w4JPBtCn18WJLAznMrkbsW3Pu%2BO9zxCm6eCLcxF6DYaJFFRl0vuK%2FvI6U4Zamk%2FO2edOau67cvbuX7K%2FI8Xh5Ym1t427HgbL34cZJ%2B5yMFTt67c8YEMqZhT7OnWd7owE1MraoZSvHPsyRsV6%2F4Vvg2IijfXdv%2B%2FmQoFMPmcKztwUX341LAeU5qrfZM%2B7bFbh9JnaVv4Apl0mfP4Yqni6fGa7KGwZj5YvAlzvXCQGLrK9EViQy%2BSLYjXB5J5xiutDx8qWJYaBy4dkeqC3TPFn9LDsdCz6p9kqbchpemQwz9qjr0DUkwGnsjwqesU1bV82o1N1PIyRgH0euI6nb%2FbMTEHCaMnHUHD8embnNKcIUliswJC93PoJ3rCxBMvoAJ1CMO2ogoiA6GsGKxeBBJM5v5isZwHU%2FywdNRZLxhcSzCw%2FKnNBjqkAVTO%2BbcBHYwiv39q8SH%2BNeJZA0V6Z72R95e1zFD3izwse8uOXfqb38AsSrWCoLYJeX7rc85D%2BXMIcOeoepC2q8%2FjJv0QhN0lMrvore5ny5Fx3U%2FE59p%2FBl9yAcXkris0HJSkLvIggv%2BioCatDncsB0HXyZMBRsGsZlorHpKTG3%2FdUpp9sFlpG1GT1AEPEoK9%2FJnU%2F%2BorOyqrfJM%2BuVdv6eezpSnY&X-Amz-Signature=dd69e6003b66e3ae000e6833a0a0836a57c919b4ef4bd54762891c83374ee325&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOQVA4HH%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T082151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIGdr0gKxkks8uUzce%2FBvJcJTZediYOEquutehIK7512kAiEAqqfPN%2F0PkBdprZ8orAiqof%2FwnNZxmLXANXvroNSMJrgqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHw120LC25MfOojacircA4jkFYsqiKO8bhPq0yTDk%2BpRlI1kriAmqYdrd9YOy9VatTIXydZ%2FwLEm2fy1cC57SMWFZALRNp4Eg0aKEPKNqY35%2BVsifXkPO9shZaPyNH%2FDITeR4zdB7CnhxvjZOuI7lD4MWATUih0KYXrr9oteFhY0uNjzxu0qtdClFa00LhqzLJJQfdBKe25%2FlaTjcR3qDK%2BE3g%2BJ2KWbOw5BVcpj%2BjWsI5eWlSbGGzwfOSPyzcGsRGu5Da941OBObyukwFYa4HMMiRtPex8%2FkF%2B2yuZoS47Wl1e7LL41VfjOzDSE%2BTp65aJ%2FJfsbf4M8nef8XEXI2uQr0BDb4dut%2FhuM7gqY7dY%2BqUGXA4DpaUUrFeWsvwPIYjvhsT3A6yEq6En0rPdgiPBz9RjaPXeDQdMmZnkhowXtwAq7d%2FYlSPa8mZ%2BKFJ2C2VhmbavSpzunXNGIMW4WCBtsQdHjqocgKkCkM5FlQEXw5djtXbWzXbWAlaNZBG9tx3JBj9sNr0V%2FEB2v26AbOgpzm3Yr6sUmof4oHXFjLkbmdz%2FyFjRb3TaWddwedaU4JdyO6JzoWYLD76dtpenuneEQpu90LENshR%2BhWMwDWavY5U9htQ1UF7xetNgri%2BTY%2FNWU3C16QSv5dwfkMJj7qc0GOqUBLh8yGudFjnTJRZK3Dss5DcNpR%2FRpHXIUbJKdLhY7hW9uohZxHKvmMMyrTjD%2BmNKnnk0%2F%2BGm3qKxFn5f2irFFwh7hSXQbERRbE1HVKEyq8sNxWU31cQI0Q1cGN8Ocb1uMXZ1IzB1HAm8r1SIZxUr9YfhzbhWB4K8wMZT6TmKBDyE7Tv6abdpV%2Fi01C4i1JGJbIs%2FBMnnkkE6I%2BOZXP3vGPZniyqS4&X-Amz-Signature=fa30605567e5b41c104551a6c214743a7800fc58bb5a7d34868192f2dfc6623f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOQVA4HH%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T082151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIGdr0gKxkks8uUzce%2FBvJcJTZediYOEquutehIK7512kAiEAqqfPN%2F0PkBdprZ8orAiqof%2FwnNZxmLXANXvroNSMJrgqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHw120LC25MfOojacircA4jkFYsqiKO8bhPq0yTDk%2BpRlI1kriAmqYdrd9YOy9VatTIXydZ%2FwLEm2fy1cC57SMWFZALRNp4Eg0aKEPKNqY35%2BVsifXkPO9shZaPyNH%2FDITeR4zdB7CnhxvjZOuI7lD4MWATUih0KYXrr9oteFhY0uNjzxu0qtdClFa00LhqzLJJQfdBKe25%2FlaTjcR3qDK%2BE3g%2BJ2KWbOw5BVcpj%2BjWsI5eWlSbGGzwfOSPyzcGsRGu5Da941OBObyukwFYa4HMMiRtPex8%2FkF%2B2yuZoS47Wl1e7LL41VfjOzDSE%2BTp65aJ%2FJfsbf4M8nef8XEXI2uQr0BDb4dut%2FhuM7gqY7dY%2BqUGXA4DpaUUrFeWsvwPIYjvhsT3A6yEq6En0rPdgiPBz9RjaPXeDQdMmZnkhowXtwAq7d%2FYlSPa8mZ%2BKFJ2C2VhmbavSpzunXNGIMW4WCBtsQdHjqocgKkCkM5FlQEXw5djtXbWzXbWAlaNZBG9tx3JBj9sNr0V%2FEB2v26AbOgpzm3Yr6sUmof4oHXFjLkbmdz%2FyFjRb3TaWddwedaU4JdyO6JzoWYLD76dtpenuneEQpu90LENshR%2BhWMwDWavY5U9htQ1UF7xetNgri%2BTY%2FNWU3C16QSv5dwfkMJj7qc0GOqUBLh8yGudFjnTJRZK3Dss5DcNpR%2FRpHXIUbJKdLhY7hW9uohZxHKvmMMyrTjD%2BmNKnnk0%2F%2BGm3qKxFn5f2irFFwh7hSXQbERRbE1HVKEyq8sNxWU31cQI0Q1cGN8Ocb1uMXZ1IzB1HAm8r1SIZxUr9YfhzbhWB4K8wMZT6TmKBDyE7Tv6abdpV%2Fi01C4i1JGJbIs%2FBMnnkkE6I%2BOZXP3vGPZniyqS4&X-Amz-Signature=fa30605567e5b41c104551a6c214743a7800fc58bb5a7d34868192f2dfc6623f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEZCJUCW%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T082151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJIMEYCIQCFeKzUODfibVGSFtrQj6fMvOhD5LqjZHtV%2FmRRigCzfQIhAO0kCeOFbAYSFEK5Kt4SqL%2BmRWH5gnSlIszCb38f4JZUKogECOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwWOPeW5qKlSCq0Hckq3APHQb%2FefGcjC0TU8oW%2Bt0r2PyyaQjJawl5gKaxI87%2BDEinRc%2FDQFXgxyQNO0WqNSEaoduQgSMqJbZJmpUgpSRIBxSCGxtDmW3cmu61C8mo%2BRy4YH3W74PEQZP%2FOIBe9Hr8dBnseH19ysM3xxs%2F2yEztKlHgL3yHu42IJo68QhfT7qjYTmEclkk4FBPBm6DkOc9k%2FT0eCFjdD5nsjX%2F%2BCruvY9kZRbyDsroGtdS9%2FAGDfuSnQp%2FqwUhh0BFYrsl1PwPrGSQtmNfeL8msxvptfPWkINr4ffzh0Ezi8YUKtoMmN8nkoFERPzULUA%2FcgyL5%2BKuf3g3VX1SiokgoV2wBnkDnQ1S9PjDAEpaBWI%2BJndrH94kt366fQAY3ZQCqggcxJUUaqo7N%2Bw3498ffrmfXGO3yvMiBzRIGHTQQgAritWXho7I7dYu3%2FK4aME%2FBd8Xt9cJwEDNHO4FzfZxh92p7dlmwko9hvqZKuWnOa4%2F9c9lMlKrX9%2BnTFspvqnAW%2BDx4KUqJD7h8og3SSz%2BoeA5Wcs1BLZK1BIg6th6lXMKqb9rIBXZfUk%2Fc7ARVv5emMs56%2F%2BjSSZnzKXt8fFINQcq9X%2Fuk23Xp9GLPrKrnGzJxEh3tvF7%2FrLVEXZqHQAzRRjCp%2B6nNBjqkAWhXIpXRfn%2FryxwrGS3zGxsS2iY6WYX%2Fj15VLxM9kcdIOfFoSdSrVaVoAN95XxQCkmDZcDEDZ2DvO57NgHbkDn9AaqPl9rx%2FWBZENIprfXWpH9XDeGC3OYZBFgQ3x1%2BiQXAc4NJmTqy58CL74YxmFXcLhJXn8e5L8IhQphAMPte19ngNF72y0LqoyP8TEGvmGv%2B6rNPz%2F8otUojMvStCK7IjOxZ8&X-Amz-Signature=15c833a0c5e799da549bc69c08c96dfd7415d4735d4b2862fc6abbeb055ccf91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

