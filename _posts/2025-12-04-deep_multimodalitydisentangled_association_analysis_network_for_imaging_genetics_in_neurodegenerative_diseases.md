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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXNVVCBB%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T182203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF6AbD4qcfyI1UUZvOjUrvJL3zY37AJ9yLjYFKzo2%2FKXAiBRGKEXxsBix943iI1i%2BI7HAX%2FVMWbhCzoN%2B7AAwrjt7CqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIME3uRJhLD0o%2BIdJ0gKtwDeGJgkLu0198iXzikpht6klwotWSQzOJ4X3RsiXINZ9xGpVUG6kyeX5FFHrYhP%2B76kunHLDy9ZCCAuAdvhvKHQzIFy86tmG5apnNp4%2BfdWTiACmHGsCqh2ksHDEzvYteqddRVOb4WGyHO40nR%2FUMiYeUnsj5y4JZGX1z5L%2BVqcrj8H%2FtsX3Gl09Nq4%2FgEMyp%2Bw1PJMPiDH%2Bxcs5jr78CVoJ%2Fr5RcCRqKSLn8MQF8LeWiJEpV8smCJOnr8oYnjwWi%2FeUEGk3YhPftKm8PaNo2Ve%2FBYshtwIFLd%2BPX907s5iQfFjmUcQW7NINI7sPSAL%2FKFuLjjmviHn3XoocbDk%2Ba1Qq28Eu8AZk%2FZsnhz2flkctYwhggve3cny70tNoNxgzf%2BfaGm%2FY%2BNj%2FE8upLri5c5lO3j%2Bhy%2BlFWbEPRfQXt1RiTxRcNRbwM19YgkNOTwv6yVFEtUlEO1Cuo0VzVPra7av3UNkFXx2k4qtY7PFH5FvaTY5eRDtjlLSfVjb7IezUM%2BgQUZ4lBdozE3K1ALwCuIf4PqQ5yo0S1HyNQvrhLsli%2FcweCMI90Q5WTCiAA8x9mwTyY7GK0XigTT%2F5jMIlli4YNd63coQlAEHab8%2FFnriYdy0UfKtF8k7KJEPgswl43FzgY6pgG9uPh0y%2FXZk5y4RdpAi%2BLFDtHFrRIB9f2qxByk9vMRli7xZozsFLKSC9Zk4MxgTqpXsqIFiuxRHcpEZkJXJn5xj2tLr6HKR74QL8VY2SNtjXAXQlRToOo5ZiVF%2FYG%2B4C0S91hKkTHaVuihBc0eciSW5bDuRS%2FkRGFD%2BDLspePTMNlrm1wrBob3uHgBt80I2wlgB60rwiz39xCZKfBd6yr5BcHfuxIW&X-Amz-Signature=7a2d96d68b81805be7d3df7b1b8f2373b032bda4498e72ebcf9ce471bf10a2c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXNVVCBB%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T182203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF6AbD4qcfyI1UUZvOjUrvJL3zY37AJ9yLjYFKzo2%2FKXAiBRGKEXxsBix943iI1i%2BI7HAX%2FVMWbhCzoN%2B7AAwrjt7CqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIME3uRJhLD0o%2BIdJ0gKtwDeGJgkLu0198iXzikpht6klwotWSQzOJ4X3RsiXINZ9xGpVUG6kyeX5FFHrYhP%2B76kunHLDy9ZCCAuAdvhvKHQzIFy86tmG5apnNp4%2BfdWTiACmHGsCqh2ksHDEzvYteqddRVOb4WGyHO40nR%2FUMiYeUnsj5y4JZGX1z5L%2BVqcrj8H%2FtsX3Gl09Nq4%2FgEMyp%2Bw1PJMPiDH%2Bxcs5jr78CVoJ%2Fr5RcCRqKSLn8MQF8LeWiJEpV8smCJOnr8oYnjwWi%2FeUEGk3YhPftKm8PaNo2Ve%2FBYshtwIFLd%2BPX907s5iQfFjmUcQW7NINI7sPSAL%2FKFuLjjmviHn3XoocbDk%2Ba1Qq28Eu8AZk%2FZsnhz2flkctYwhggve3cny70tNoNxgzf%2BfaGm%2FY%2BNj%2FE8upLri5c5lO3j%2Bhy%2BlFWbEPRfQXt1RiTxRcNRbwM19YgkNOTwv6yVFEtUlEO1Cuo0VzVPra7av3UNkFXx2k4qtY7PFH5FvaTY5eRDtjlLSfVjb7IezUM%2BgQUZ4lBdozE3K1ALwCuIf4PqQ5yo0S1HyNQvrhLsli%2FcweCMI90Q5WTCiAA8x9mwTyY7GK0XigTT%2F5jMIlli4YNd63coQlAEHab8%2FFnriYdy0UfKtF8k7KJEPgswl43FzgY6pgG9uPh0y%2FXZk5y4RdpAi%2BLFDtHFrRIB9f2qxByk9vMRli7xZozsFLKSC9Zk4MxgTqpXsqIFiuxRHcpEZkJXJn5xj2tLr6HKR74QL8VY2SNtjXAXQlRToOo5ZiVF%2FYG%2B4C0S91hKkTHaVuihBc0eciSW5bDuRS%2FkRGFD%2BDLspePTMNlrm1wrBob3uHgBt80I2wlgB60rwiz39xCZKfBd6yr5BcHfuxIW&X-Amz-Signature=7a2d96d68b81805be7d3df7b1b8f2373b032bda4498e72ebcf9ce471bf10a2c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLFHSP3S%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T182203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDFUvALoKwgZQOXHOuSoucpAHk3bfi2GL%2BCrdAdU42GcwIhAKv48J4N0Zn9bm1vWRh%2F029i539xQ%2FuNHwGz0qPx00tcKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyEBa8gTElXcASTkVwq3AM2e4SXaCx3kTI%2FDNIHvb3iqgzL4Cz53S92evoAG8z13RmnD2TkXELfrckLse7I%2FwAjN8CGxL%2FGhxLxl4cnGN1Pv6pT6eJzEsQjkV%2Bg7gNCN0ZkX12gAcW60lD3kKQMuYAqACaHM1BAkbEJoqVevXKt%2BNtUzsjKFRYzgYMMLo2y0rYrWhsXchQy3W0Yt11H3BDCWwLn1vyVPnXYdihpzQ8l441UgUq2JSLXOy89o2bKoKyBEry5L%2BeQwp5Yjl6lg9QWaxIpzDo8ei3LzpS4rrB%2BBsL5ymct0GngzbdGDTMj0J5AGk42zhuL67Ma88v5%2BjqZjkoO0JYWgU3JA2%2F7AUk1U63aPLSC%2FQ7TJ9qVR9Jk%2FzFGRyKrcVkYE0Bou3jXlZsV9N3nP2Rh8Jw4U4eW0SsFPkTGNrOAZFrFQJDFRKpihKgbd3G0EQaoAy%2Fx%2BYXiXDzioSxBrvJTBeHHD5PkNhh4iISIgW1%2FL60UFo5vL7L73JAbc4fc90PiKtacn1fPftSPEm7LTnIw5xXXyAHJ2nRTVsXYJ%2BEWI88WS9fyiUm5Ob2XxCSsc5q9M9n23j1jBaSPWI2U2ZMLqURad7bIt%2FyqdBE42HIYE8L8RW8eZxeXy%2BFU0bSkMRDY98rhcDDKjMXOBjqkAXrZ0Rp6ON6AZV6O8L%2FqPKuyGtBYWAKbgJLSLD1AjGlwlorT911bC72Kccq0y2N51oTsoOw%2FoCwVoEANBFBTqHAWzJOo0Y2fm13VVp7U6AVUG0buMMjglG%2F6DB4zUXWOlQeY8yhF7Ihcf2uwaudOIdtEGB4XcC8BC78q79jhbsfVURGIkBQ1yMzkypBn%2FeNInmnVDh6k0Snuf7mqj92RsS%2FWLVc%2B&X-Amz-Signature=93129ffaf8224735b680da12799e9b4682ed2cb4b834da48e541a8f5750d52b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BTBHSV2%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T182205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGELF5UqzWhceByjOR5Sp8NtS9Feme9ccP4AnOtMgBRtAiA0AF%2FiVHBSyTGbKRzFaN4PB%2Fl7TfRsr6%2Bg6z7OP4zSiyqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcFBUZIKRqlAOd%2F1TKtwDiT0672cR7IOgamKGcKGF1m%2Fc0nb3AacM5RzipHDrWjtLll1VtYBJ3Kezqw75Wmi%2BklpsDHhFMCBh7w4DN4fJQH5VEfDrx8gxRlPrvLS94ZEJN%2F8S2LTSPxER%2BAJYCCiDkaEmbF6SWdGvBVKUBrc5wR3BtaeCSCxURLy4LFz0xxkoir4qtxpKWzNNY548LZzXWhqRIjiorE0Uo5nkhRNVFABbtvLblTHHSK2wCH8bIbJ%2BLKb15Fy5xzye1B4NiLfPlxJapSulrE83kcDze0tZBqgqh8A%2F4iAjftPk16wmchSqEXCWUF5wE3326eEasOXKHfzYLttBUAWG9BDSuWTR9Y%2FgkvikSMgK9X73E%2BDtb9%2FcnZppESMTplFSr%2FgS6C2949tDy4HS%2BKDAzUNwGJbZTu7X%2Baw8xQlKINLfe0unrxdBezvB97VlhDrj0wywhOMd9ZVpfVOfcQ1g61Eo2hblZpTvxsFB7qgu2mYRXKH0N%2FqlDhfYLTwiSZWlYo3UvideIIxv5u0L31mNmef6LyZpq4CcrnVUzI2tQ5vRGtPRCXgx2iuUNWFHJBtgaEnyBPDXZI1EP%2FztFdZgmtkbktA1vVhY30oqMqdcpCtNwZo9qBib%2BeBdLis3H8Up8IIwhY3FzgY6pgHvG%2B2SZLfax6KYOfBtDEBjNux8XDP%2BL3y%2FyrGaTHKcT6BDG5Hj3pFQmGkZeDy2d168I5wOW9BAqrNnAPcdWwKmD8AB76zhK0%2FMndvW1EcJZ5FXyz%2BpmuH9bZQSz1ynp9%2F5uwTyyMrbpj8uF0bXIzrTXJJjgtZ3LA6rIlcYJdAM6ehKyvnGAVZCcuGtiiLpPm8lNkED9RrX%2F208oWwxQqvA3jAwijq8&X-Amz-Signature=2de38e2ec57d10804779911575b2db02f3daeac1e3a65168cea559bcde15e3f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BTBHSV2%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T182205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGELF5UqzWhceByjOR5Sp8NtS9Feme9ccP4AnOtMgBRtAiA0AF%2FiVHBSyTGbKRzFaN4PB%2Fl7TfRsr6%2Bg6z7OP4zSiyqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcFBUZIKRqlAOd%2F1TKtwDiT0672cR7IOgamKGcKGF1m%2Fc0nb3AacM5RzipHDrWjtLll1VtYBJ3Kezqw75Wmi%2BklpsDHhFMCBh7w4DN4fJQH5VEfDrx8gxRlPrvLS94ZEJN%2F8S2LTSPxER%2BAJYCCiDkaEmbF6SWdGvBVKUBrc5wR3BtaeCSCxURLy4LFz0xxkoir4qtxpKWzNNY548LZzXWhqRIjiorE0Uo5nkhRNVFABbtvLblTHHSK2wCH8bIbJ%2BLKb15Fy5xzye1B4NiLfPlxJapSulrE83kcDze0tZBqgqh8A%2F4iAjftPk16wmchSqEXCWUF5wE3326eEasOXKHfzYLttBUAWG9BDSuWTR9Y%2FgkvikSMgK9X73E%2BDtb9%2FcnZppESMTplFSr%2FgS6C2949tDy4HS%2BKDAzUNwGJbZTu7X%2Baw8xQlKINLfe0unrxdBezvB97VlhDrj0wywhOMd9ZVpfVOfcQ1g61Eo2hblZpTvxsFB7qgu2mYRXKH0N%2FqlDhfYLTwiSZWlYo3UvideIIxv5u0L31mNmef6LyZpq4CcrnVUzI2tQ5vRGtPRCXgx2iuUNWFHJBtgaEnyBPDXZI1EP%2FztFdZgmtkbktA1vVhY30oqMqdcpCtNwZo9qBib%2BeBdLis3H8Up8IIwhY3FzgY6pgHvG%2B2SZLfax6KYOfBtDEBjNux8XDP%2BL3y%2FyrGaTHKcT6BDG5Hj3pFQmGkZeDy2d168I5wOW9BAqrNnAPcdWwKmD8AB76zhK0%2FMndvW1EcJZ5FXyz%2BpmuH9bZQSz1ynp9%2F5uwTyyMrbpj8uF0bXIzrTXJJjgtZ3LA6rIlcYJdAM6ehKyvnGAVZCcuGtiiLpPm8lNkED9RrX%2F208oWwxQqvA3jAwijq8&X-Amz-Signature=86ecd3cd04c73d6fd7ac08ed9b3e2582f9fc018c469089782911264539aeef99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6TOO2UM%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T182205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGQk4ZH8Q2Dk8ZCpdChtU7HuQt4rv2fpVXMz4D%2FerlqlAiAFYyLWxSyGnmZvyhgx3XWB5DTp7GD1iwf%2FIR17%2Bdq62iqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMciLhshXjCQxcWg4iKtwDb0Pg10Ll8jFwWes%2FckzmjkEJ%2FClfT65R99xywL2zqnXLvgnoDB86GlIkS5u6bbXJYJ%2FjL414kGYto09WYiBTNyMnhU510RGJEtBLEstxY0R1fT9KMNOT9T1yXtTniHq8dg8h45OI8GweWk3DmEkeEUO4dD4xKsifz%2FR3JexO8lYZ%2FkkIzka4BeWwEKJP4DyNl%2BKQDde7i3U9%2FGerFjP9bYrTUkIrvuhYskgPZV6H%2F7OO2NPLq4WQZCJtHf%2FwfqMBzRbpSrWoKuPUMTSbpvJfrrMHyn88JXQYZHPCYqWHkz06wHgtmeHjc1Fqc%2Bz94yp5hjS0FZn%2BLCj7FSZxvhccxLRhAB4SHwrMum8wOc9uusuaoca8LY%2FfGjN45F6fioLB%2FUgccEmxzeZcNl12PFqrp5%2FcxPvqQlMZTW6MUFmhVVlQW374mNXaZfNiuuoPxNKFslGbOlMNlmYuBlTxDNgIlxEuzAI%2FwVyxsPUpgUhvHNwZUzKEA4jz3GMDjq5UNvuh80ukKmAWXGWRsDtBtzmNll07cLJlpEF18nMd1B26PgQDURBYdA6ZEarx3yemjwZvtNRzP3YkmL7KlsRig2CMsqPyOMq2CqebrDOELmxhODcdj%2B4qr9xlHRpIHdUwgY%2FFzgY6pgF%2Fj3UlU8YQv85kGexn71I2%2BHgCGP%2B1YbAUd7z9T9gLvfCHtatNacA%2FqTmRjhwuewWOLU3hQpkyTtMaI2iIJVuT%2F8qDcSl%2Fq9nBwxXE3ac5Eolon0kTpq0lEcCrZrij3Q36omskXrCP2ETW%2Fx%2B3zmayCAfy4DEwMN8EwLtYg9o5Rqc5h6DgSLgYuPQkEMN1Tp%2FRm9vD015Ea1tCTVP4kMZWuLSciJ6z&X-Amz-Signature=de459d7b5027204012ff32e96d40148967e64bc5ba5fd74bb28529881e356db6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AUZAA66%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T182206Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEnW5TuSyWEL2RlQjl8ds5YtqnShLLtThwZ7CKr3Dq%2FcAiEAs0xnNdRoSyIAmic1feiSbY8tVEHC59jp8iICL46f%2B94qiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDnA2IcrpKv2mMqqmSrcA4OwK29077wI1qnqYYF%2FAqJMZe229vl7wt4Zu%2Fs1dbjjRQ5n9YqjoMx0qzE2kSa07W4960s4HDwL4SBvpbkbgcJXCYOLXOePLMIq5IQ2rMR2Sh%2F2qHb4wYxPh4rSqsaKKHklz%2FySdEMfMmS%2FObwXR%2BiT7ofODg9mrB8d3UI0%2BlT%2B4m531WXqrjcm6tiUjrM8fsMe24Jdki9C9WB2ye64vV%2BEgr79Wx2MaltY3bR3TIh4zoNBBqOCgkEPqKYMkGoySn0chXQv7CcUj1CcgdMnOXZ6QtoN8ZPisXD4AV6azNidALLS%2FeshMd%2FVDuf%2FIm%2B1Qr%2Fk%2B5%2BzFc7Z2eed%2BS72CLcYzU418GAJydtnxzwJ8gkXRtWNAg4d8imDa3ClLj1%2BTjB3a5tXJ16S0CbLWy5JWQSgMZPbthqT5MUWsqZXpoAkEeHgncksOmc6pzxpxFiC3Zyr7c6eer6cYZU78A9yNUAPoTjXNyQsbFs%2F2F%2BavcZwMVG6ZTV83wsxk9y%2BmlGx44djVsFW53mL8UFJFHwJMaDbnlReDu4qeIKPLDffe1Or7JTb%2FG4pxLa0WWhx1UlqxmU3Nl3gzULJHh4JvLVu7dx4LuekvyPWPgqf3zXOLZaV49X1f5sJpcQfebiuMIuOxc4GOqUBFaa8HHKuhpoKxWGX%2BtEZfUDzh1ChzV%2F%2FJusTcwN9K9H5UIG26U8ZXPd2uaHzCTf7yyOQA6dspEO5rHbzM5w68JrvqNvRTSL2ZV%2BBmiGwKx66bryDaBKPjDfSxCIHT6sy1Zeb%2F6WdRWXdndW6xK%2B6iy7J%2B0jk8VcbogIT7JJP5ReY4ldCyyx%2FrN53uOoKcwpRZm8mcLjee14vySEALQf0kyQ7w7r6&X-Amz-Signature=54c37747a12eaaa23a8c3f08bb529d5c30a640ec9c4986f6e95aa704f7408b53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSN2Y5TA%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T182209Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEsDf%2Bp4mkyYMR8Bods2Rc35NniqIVgrt7MQyXPrZPNlAiAA52R88vljTOT%2BFqaMqvKpxCVrSVpP%2Bt3qbL254MDtYiqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM6WS9%2FL5OyRYL%2FlloKtwDb558xzB0GRbCrnic%2BpbJlFLLG79W44fZ1XczFBQAsaP4Vucp3n23LGOvOGqArg%2B4uy%2Ft0DiSpfspg4WdT3G4vJSyS3B8pSUo4DtN2vyoHWwL%2FFBYB881ID0wMFhOQZtTDZTNSQHlI3xv7lvWCTqvvmpAiebrLA2lfEw8TGaz2ZGFMF3R5NX9OZJMJyOhrN4Pdb84g4TM8vWlR5AiR2alAM1094ok9rkknM5sJ2F5hwhH0xlJenyfsAk4sSVnaDdTqYkl0OQO129lh8x9DFLww7eYGCDqfvVBIviZlDcjOurjcdXdGxP03oO%2BomXLuV4vWcLonIuoPODQgZBalcKNsPTNTDzOpw86y98OAckG742BOzqvZzvPpkGle6wcRHpzdXYnrcI%2F8kMNN%2BLL6e1KmXjEmaHBIbowcQ32frRpTXVwsucAz5rH8N6%2FGtVHoNYtqewWxekhDXgEr8rN2umIOWHEzzUxZUYnG46y%2FcM0zBkwgM4vRJr4MxFpjVTbiQjsa9wUz0TlAcFbxHl51xaemVrvf4nAhKdGe8FBdkdaG7kj2aXEiBE1qvEd%2FJLRO4f4le%2F%2BsAfVj7TZyh%2FI2iVybDpUbra%2BOCvkqiog4UNLfdDM%2BOoAIJsaGdDObUUwwo3FzgY6pgGkxCzf2%2FRn%2FfrogJ5XOmNv%2BJpWmZPGspE45ZPTOGJ3rk%2B0PQalTosxWcakzBAyGaHBOcT6pKX6NTLxdP8nprb12sNaH5g5t7Y9AmsevgjpaPSgHxnvHdaozDes0wm9ymIEZGCAZN2U3nzFjDf319ELxSfs2iUUxkh8KQWc%2BmPhXNrVg%2FhPasiaicozDE4Peq6hrJkx0BrufZ3fosA%2Bg7gDlU4ewK5k&X-Amz-Signature=d2b466e6769e8238af9cb6a7117575eaefcfddc086d93848bf3c2fa1b0f95b97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QB5WKOHS%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T182213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEftGHIKXIhrBgpxdsNdn%2FXTRVcFa59MC7gRkkRLdKLuAiBIsZNm%2B48l1iqUiYhJBbkwGUbGad8T1ttBxerZ0vpbCiqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcHeeP%2FaKKmI14%2BdJKtwDVRkezhNKRtOrNVmR0%2F6LPEdDmc2VJ6s%2F9CFnXCT3qUlypqZmvsUpFm%2B%2FWC41HILM1RL7G%2BVLlbNkr6R%2FAL5lehfbq3nswi1gfLoL5JR5oVNl4AHvYrBIr8fnnVs1Eh77bGRrOQa5q2ke8qW2d0c0IAMzaS%2FMRT%2F8e1UBX%2BtHpk%2FRBLrYGkaaObDHkNw6xlxQ%2B9OBoGNXhSStFAeNla9trpvYu40rpsrfGY8jBR1rUNitkfcw5nWjFMolvqceIUSnZpWQF%2BZgtJ076%2BawKYXdQInbqIJOCQhp2nB%2BrYAq%2FFtilijon1yPnIJF6tIcf3UJZ5ybADm5%2B1CLOzagkIOs%2Fd3jDjNVJWzDmWe5w10HT3Ok2AZcfdFCt8tUcikiCtLqDyXsihpKwozoH8id8XlcAZ8aFYA2RMz6dgV0hQoCQskJrD%2FrBESAXBI6m5lazzS5siwa2vqr77jtQqUWuRNx7Ux8Vy8mBWiEJ8x6N2xcoPhIpFZC7iUjE0gfG8OyeUQ4xmbrFloWsXzSNHHbHCKUERTzbSo9k0x16ryTt81cs%2Fzru%2FZF6xvDmyz2ufkx5IUhrcBa7i%2F8vOWRxRnZNmLXVw3THS4IVkYG%2F1Jvjhbya6aebWMRtpDSRYxti2Ewvo%2FFzgY6pgF7dflSiO5GnorPBaEN3ODT6RvkHM%2BPTZW3i5VEHVOIqlgcgOc74qk2h0cqKgc5ijp1zkTh1wl20lSNDEkSB0DSuF%2B3OTwctAlDFrD73Fgaz3W2WDM6xnuK3qibjAlIPoeQFSKCAHlwfufId5S3egPoJSl4OjqlGVskeVoqBytoZ3aKPWANYdxssu6PaVpAxZPQ1TD%2FzcsTsfDoCArBV4imy66ZFduY&X-Amz-Signature=be0422782c7f3f6cbeca2d1a90264038e71f2e35c6f9738c2bf85f85797372c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QB5WKOHS%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T182213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEftGHIKXIhrBgpxdsNdn%2FXTRVcFa59MC7gRkkRLdKLuAiBIsZNm%2B48l1iqUiYhJBbkwGUbGad8T1ttBxerZ0vpbCiqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcHeeP%2FaKKmI14%2BdJKtwDVRkezhNKRtOrNVmR0%2F6LPEdDmc2VJ6s%2F9CFnXCT3qUlypqZmvsUpFm%2B%2FWC41HILM1RL7G%2BVLlbNkr6R%2FAL5lehfbq3nswi1gfLoL5JR5oVNl4AHvYrBIr8fnnVs1Eh77bGRrOQa5q2ke8qW2d0c0IAMzaS%2FMRT%2F8e1UBX%2BtHpk%2FRBLrYGkaaObDHkNw6xlxQ%2B9OBoGNXhSStFAeNla9trpvYu40rpsrfGY8jBR1rUNitkfcw5nWjFMolvqceIUSnZpWQF%2BZgtJ076%2BawKYXdQInbqIJOCQhp2nB%2BrYAq%2FFtilijon1yPnIJF6tIcf3UJZ5ybADm5%2B1CLOzagkIOs%2Fd3jDjNVJWzDmWe5w10HT3Ok2AZcfdFCt8tUcikiCtLqDyXsihpKwozoH8id8XlcAZ8aFYA2RMz6dgV0hQoCQskJrD%2FrBESAXBI6m5lazzS5siwa2vqr77jtQqUWuRNx7Ux8Vy8mBWiEJ8x6N2xcoPhIpFZC7iUjE0gfG8OyeUQ4xmbrFloWsXzSNHHbHCKUERTzbSo9k0x16ryTt81cs%2Fzru%2FZF6xvDmyz2ufkx5IUhrcBa7i%2F8vOWRxRnZNmLXVw3THS4IVkYG%2F1Jvjhbya6aebWMRtpDSRYxti2Ewvo%2FFzgY6pgF7dflSiO5GnorPBaEN3ODT6RvkHM%2BPTZW3i5VEHVOIqlgcgOc74qk2h0cqKgc5ijp1zkTh1wl20lSNDEkSB0DSuF%2B3OTwctAlDFrD73Fgaz3W2WDM6xnuK3qibjAlIPoeQFSKCAHlwfufId5S3egPoJSl4OjqlGVskeVoqBytoZ3aKPWANYdxssu6PaVpAxZPQ1TD%2FzcsTsfDoCArBV4imy66ZFduY&X-Amz-Signature=8ecb062f993eede96932d7cc871830edfa42e45d64ad9fbc154004219ce9b2bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QBAIM7Q%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T182159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFhlcpiKsy0DVDHn9KciIRG%2F0TXvRvdNzjDk3v8NQ0ptAiEA1JFXKfnIDM6mVQ0q%2BDarpvsdGGOT%2B2nlqg5lPg%2F2JiQqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM%2Bb0shx5L%2Ft6ATzIyrcA4Uta22HTaJXTMi9eKurUyeu2jpzHTLCws36n2lE0QdSpDAZs4bMIatmwCyKmDeMHcCCBzl6a4NS%2BfyTfB%2FJ4X5gBu9jUr5477ZkYWrExJYQiIA9GFveV7TzGppGLvKvTT2cUD3iJTCcmBzu09Z8j2VuP09kIRZOgc2POukLjB91SywulG7tdhUSaGxC9VBJr6q9jWh8xZMpnIEuxXR7zz%2F529UC2sBUlW26nEdhKs%2FTWSkqio5zIktiXFOXI7ivjRsa2rqNxmhCegNO7Bbh1fnIK7U93nXWOeGOJ5VYsTGI6QUGeGfuGyGdllxqnl3cud6DCCFDVqXOjpNkchgqDp%2Fcc61%2BHbGkkdKer8Hz%2F170sl2hgN%2FOoU6SjOsMKqD54Oe45BlwW7KYDGEMOOucmqqspswPuP0CwmR%2B4MNmd7bmbEiJTp39xlSdDOSsqA%2FiUGSzVa9d1%2FuL%2Fc305TLvz6f%2FMWrep%2Bxk3j58LO829sdLFEvbJXx9dVIxs6r%2Fkx1%2BTAorxNm3Hvcl5wXY0wWp%2BwQ%2FjkzaJX8%2BUPw%2BCHXdufQDRfwJ2mIw%2F1zmNkQGKfBphYjmStcZyzstpI6R2CFfChzsJHiMX5WmtNaUQK5RB63MCZ4aEm4pFIDlTSqaMMSPxc4GOqUBoQX5LpLFlXtL%2FU0wjvy4nAyMu50Xe2BfI35AHIxQemIaV8yESkZQCcN7RD%2BM8RTLr5QSX%2F10ve%2BzcReiX4TUTLo8cl7Bnkfsqx2VMT0Bl1qU7TSPTXp4ltJb7V1T%2FKTMkvEwRWMluOuCyVbnMNrt7pVC3hZTWTcc%2FvuSpgryDicLNCxCv%2FIStTJira4y%2BRhrqzrVv5BcI0dJFbW5Imw%2BNh%2FK8n6T&X-Amz-Signature=24bc0ad57acaedf41d62e2b72066cc98a6d8838c6166a5dc3798c64cdb2fec3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKY5HRPQ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T182215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGQMfC2PIfmCRsUlNlARfpWXdtPIFLF4Of5xEZoVX4ktAiEAx84I9yzra8tI9jTX99FVbt%2BJAmzHKuiPYktvi3C%2FFjUqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLX35B9NkKRIsgq9ryrcA4kMvTG%2Bn%2FdnXsQJl1O2c3TPPLAt%2FzL7h%2BXTUmnHGGJzRPP4zWrMj%2FsWv7vqH81Vn6F81yEaN0Hd%2Bkpn%2FSRYIRKJecWXacDkumpGA4kIdsN4eC29lCSSWs12Z%2FODgRk5nQtJcJum5uTwg9K%2BUOWsXF3%2B%2F0D%2BW9siS1W9i07ebHimGgH8CfnQlCx%2FDq9LLg03qN7l8ozc6wEj4mMNmyimLDdvX0g4uS3ZBAvUhnumJEH7Oq%2BcnJRas9ch2DXAXoWagG2XTOBheDp3Fqc2Uowv3H7RHXelSPUOjWPtQ%2FYxS417t8gcG%2F9qJ2WeyndHAnrycYvnIIUIn3krxoa5fC98S3RI%2Fzkw5ZXF%2FcRPPwvzOudjZUuhpXVpLAHQLAA5QjrW7Sam1tRJcqdrQ6EcgOEmpNIjBu5tNe9CqZuGly9N27MtZLLfUc%2BI2O4rRpHqoQe9ZIm1tgRTvddWx0POP0V3oxlC%2BwuznXt%2Fmt6%2BH88AKLm4vP4VG1y8yRivLwVfnqO6N6uKcsUXll0%2F45y2NYSMShO0lk8Woe%2B58jCXE0E1SKU1pusQ%2BiPvFPlgrrHWRsd5wfNYnfOpDpQIqKsyVwpMFPKvcgp5gL3embTJlxyvWKm29E%2FRs6rxBeQzzc%2BdMPeOxc4GOqUB9EIwWhqBrnwJ7h1rf4z8zQQSDxFZ8SjOOYaAlBweayr2Shk4H6axTCtQpLJ9KHLFazxCY29bpMsyYhRyjL3VBHDFX7qB83fM75hiV2u0qr3W1lFhsFroAnuhfZJ1cDBtjMWDUbjCD2Djxkc01ahpBNTGNAD8YqykEE0OomaJXBt%2BNBlqijYICPb7%2FLGlsJU8hz5yzTBW9pXmg5wAy6pWzb0PSvQB&X-Amz-Signature=a51a07b787c2631a8266251598a4284e0229715fadc773e902d6ebe7a90a821f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKY5HRPQ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T182215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGQMfC2PIfmCRsUlNlARfpWXdtPIFLF4Of5xEZoVX4ktAiEAx84I9yzra8tI9jTX99FVbt%2BJAmzHKuiPYktvi3C%2FFjUqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLX35B9NkKRIsgq9ryrcA4kMvTG%2Bn%2FdnXsQJl1O2c3TPPLAt%2FzL7h%2BXTUmnHGGJzRPP4zWrMj%2FsWv7vqH81Vn6F81yEaN0Hd%2Bkpn%2FSRYIRKJecWXacDkumpGA4kIdsN4eC29lCSSWs12Z%2FODgRk5nQtJcJum5uTwg9K%2BUOWsXF3%2B%2F0D%2BW9siS1W9i07ebHimGgH8CfnQlCx%2FDq9LLg03qN7l8ozc6wEj4mMNmyimLDdvX0g4uS3ZBAvUhnumJEH7Oq%2BcnJRas9ch2DXAXoWagG2XTOBheDp3Fqc2Uowv3H7RHXelSPUOjWPtQ%2FYxS417t8gcG%2F9qJ2WeyndHAnrycYvnIIUIn3krxoa5fC98S3RI%2Fzkw5ZXF%2FcRPPwvzOudjZUuhpXVpLAHQLAA5QjrW7Sam1tRJcqdrQ6EcgOEmpNIjBu5tNe9CqZuGly9N27MtZLLfUc%2BI2O4rRpHqoQe9ZIm1tgRTvddWx0POP0V3oxlC%2BwuznXt%2Fmt6%2BH88AKLm4vP4VG1y8yRivLwVfnqO6N6uKcsUXll0%2F45y2NYSMShO0lk8Woe%2B58jCXE0E1SKU1pusQ%2BiPvFPlgrrHWRsd5wfNYnfOpDpQIqKsyVwpMFPKvcgp5gL3embTJlxyvWKm29E%2FRs6rxBeQzzc%2BdMPeOxc4GOqUB9EIwWhqBrnwJ7h1rf4z8zQQSDxFZ8SjOOYaAlBweayr2Shk4H6axTCtQpLJ9KHLFazxCY29bpMsyYhRyjL3VBHDFX7qB83fM75hiV2u0qr3W1lFhsFroAnuhfZJ1cDBtjMWDUbjCD2Djxkc01ahpBNTGNAD8YqykEE0OomaJXBt%2BNBlqijYICPb7%2FLGlsJU8hz5yzTBW9pXmg5wAy6pWzb0PSvQB&X-Amz-Signature=a51a07b787c2631a8266251598a4284e0229715fadc773e902d6ebe7a90a821f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFGKYXDJ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T182217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCG4l0OAy08Pm5U8k1121NYLt1fLPNKcKLS69A42YEJZQIgINYk%2BBzY6oCIVKFAS%2BD6WO3CxCr%2BBYa5WByh%2BWIEJQIqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDjhCBq4OLbZ7j81%2BircAygv4UPvwuuYRHPLavhhBexMcVkSMl3lLKhCw%2BFU7MoL0bdBF1WMFS0cQcAEZySOhUbnxi5ilB78WyhTamlgCZwCL%2BwHpKuvWQMg7GcRlHcDO2EFEFRj8WYr7sOOZPSFfb8GHT4KOLet6wTAh4Gyhuydgcsqh1xz0p9Q5P2C5TW1IKBOjCD5vovwfQ0uaeS0mU0BWTNmC0eSuaelFKA8aYcG4cjGHUAriYt3B0%2BS%2BSyRuZtkln2AwL83Xw74JD1mDU%2B1LtJvCFab%2BUMO1EDuez%2Fb56oAoF0oqVxt7HV%2BnOfaweoV1VQPRjPmpUWtFrozgRnrg5vk9saV%2F0HHLcSv69RPLoaoOxJlk40Q4LquGBQ%2BLA72Cz9kTOocHXszz84vYWh8hOWmwSdeX2eukyXmc%2FG8vPYP%2FvRxcBmK7VwKQEUn46ebprhp02%2FEfa5jXtKmxL%2B0fFaHlzIsbhois%2FG6HXZ7B6ByIuDj89qnPzh3ObenyldXiu7LCj5SgdDAwDVWNA7EPc6wziF4J3bm3MazuwkSvAAvB5TaR%2FKwfgd%2BnDNdKLXSDRDQWElmzY88er8is3ti0wIu4AkYqoF7XtV7XUsrKG9gt99uU96j4Rx5u%2BHWS349%2BdvZKOZgOBRSMKuMxc4GOqUBRB%2FDlHTlOalKc%2FcWPVE8EO3E6TN0Jo7Fvtlso4TIbRKaXu0c8upkQMyDUqkTyx02lvel3dI605cWvXKRxYU6cTG%2F8o5uwUQjSHQL4S6PUHs57axCDwPDbpQO5YNkDegVFgCwMD%2BuOP10Phl3U11L6HfBi6XgBFH3g1x%2F0dMODt9ODPmjFApziJgC0P5mkmNmMSYdx2Dj0bky9RkFKdIsT0Z0BroA&X-Amz-Signature=4bfb51a768e427f542420b941eb430df7958ec9496736bb851066bcde4f72e95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

