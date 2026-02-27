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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2PTXQDZ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T201544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIE8Cown4e1wt9rAIiyCbIWohexVQl7d5m0MtPe%2F7Yn46AiAtw0bKogJxtHvMESQYG2gFPRmDwYIjWJDQMVejk1QFASr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMuNI%2BsFTZMTKBnLTDKtwDiEYQE%2B9AkuTW0VDQMM9YHFOvZ%2BX0jRHGFBsUqT%2B2Ndx3C6%2B2MegqAj64ElPhfvD5LlQEjhdYUChfwlCi2KWQ6nryVg6OC9PmfFdRQKv14jYWn3N0suSRoy82shrvHPembrps1pgoNGxwSWwkCQKp%2B5sJha5cQETVs8%2BY7SXM4i6NHUmiU2l5VKTkvqOEwTxnbQ43dbPzA1dXpE%2FrLOQGiG3VrtF%2By1g%2BzJnHi%2FaCjsjgsLsOYJUCF89gDHt4Gx3ohDE2taPCc7Th3KEyGuZcaF0bbssFIoMNCnf%2BBuy%2FXXoT%2Bwpu3CSWNp%2FA93KGBdiEwmmOTP4LIgV2A77%2FsmDkKa0jWO48a8zPb7iKH0AMpdopAjyERx1drjuChdFGbA05Nx6UvRdS9ZK%2BWczGEY7WvW90A5wSswvtEMTYfuqlWQyiekkteyYxlVuOc%2FO%2FVn1VRdPk7DYCNEew2tHg93qjGrg%2B0iN0%2BY7Df5gRnalSigN9q8OGwfEit5Di7wG5gD0rZocQN8bZ58Po0eUXNrbyKGOsInnbJl9yO4JU19uQV%2FayhzjjJakzVsK1iv%2FYV7kE%2Bz9b5yLFkFR6bL%2FdH8lHtlOxEk3r2GarblkmVOLcAExkQhHnL9i8LMBNY04w5MSHzQY6pgEA0Ur%2BgGpIoAVL6thnT41swF1bWTVaNiNKXllUKfl2y6%2BcZOmdZTV%2F6AV0T0TdUSIDzPcelAHtLRAgM7tDNUAuRdfQ4lKjbJwOIZ2MYTQ3FFeBHfXPFM4Humh%2FBKdJJ%2B2Av7NhaEX9bpq4LS%2BXCkyDuGtPp00G%2F%2BMkjV1Rwojg1cAwIuC%2FeRhHSItX1uDsfYi3SrBqYvk8m0gzv48UcyolmCuZE2%2Bl&X-Amz-Signature=a4f77d042ee65edbc72971e2f3c1008c4b022bdc78733a26e601bf8d716927c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2PTXQDZ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T201544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIE8Cown4e1wt9rAIiyCbIWohexVQl7d5m0MtPe%2F7Yn46AiAtw0bKogJxtHvMESQYG2gFPRmDwYIjWJDQMVejk1QFASr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMuNI%2BsFTZMTKBnLTDKtwDiEYQE%2B9AkuTW0VDQMM9YHFOvZ%2BX0jRHGFBsUqT%2B2Ndx3C6%2B2MegqAj64ElPhfvD5LlQEjhdYUChfwlCi2KWQ6nryVg6OC9PmfFdRQKv14jYWn3N0suSRoy82shrvHPembrps1pgoNGxwSWwkCQKp%2B5sJha5cQETVs8%2BY7SXM4i6NHUmiU2l5VKTkvqOEwTxnbQ43dbPzA1dXpE%2FrLOQGiG3VrtF%2By1g%2BzJnHi%2FaCjsjgsLsOYJUCF89gDHt4Gx3ohDE2taPCc7Th3KEyGuZcaF0bbssFIoMNCnf%2BBuy%2FXXoT%2Bwpu3CSWNp%2FA93KGBdiEwmmOTP4LIgV2A77%2FsmDkKa0jWO48a8zPb7iKH0AMpdopAjyERx1drjuChdFGbA05Nx6UvRdS9ZK%2BWczGEY7WvW90A5wSswvtEMTYfuqlWQyiekkteyYxlVuOc%2FO%2FVn1VRdPk7DYCNEew2tHg93qjGrg%2B0iN0%2BY7Df5gRnalSigN9q8OGwfEit5Di7wG5gD0rZocQN8bZ58Po0eUXNrbyKGOsInnbJl9yO4JU19uQV%2FayhzjjJakzVsK1iv%2FYV7kE%2Bz9b5yLFkFR6bL%2FdH8lHtlOxEk3r2GarblkmVOLcAExkQhHnL9i8LMBNY04w5MSHzQY6pgEA0Ur%2BgGpIoAVL6thnT41swF1bWTVaNiNKXllUKfl2y6%2BcZOmdZTV%2F6AV0T0TdUSIDzPcelAHtLRAgM7tDNUAuRdfQ4lKjbJwOIZ2MYTQ3FFeBHfXPFM4Humh%2FBKdJJ%2B2Av7NhaEX9bpq4LS%2BXCkyDuGtPp00G%2F%2BMkjV1Rwojg1cAwIuC%2FeRhHSItX1uDsfYi3SrBqYvk8m0gzv48UcyolmCuZE2%2Bl&X-Amz-Signature=a4f77d042ee65edbc72971e2f3c1008c4b022bdc78733a26e601bf8d716927c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667B6BFRNZ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T201544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIANvecamLj2oUuvv7PJGoLMlD12bqs46v2U2DjuK6XJQAiEAle1voDnAXJ92LMA1ly9ZuBUb5io44PZYUwU63w0nh4Qq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDMLCNhpR9LHTWAMESircAw%2BHgsKyPjerVtrLUZztxNVjauicPCokI%2Bo%2FTd%2FPsoRhb9LU5Bn0mSIGmlnJneI0Fzz1HOQofBx6iwWNFy28eI4TmCrbReO%2Fy8vZxeUxxt5L6JwVnN36sHEL5pJcj2%2By9OpvUJ6%2BW3DQXYg47cFuCsa1yEEwCoEYzMQUoM8Hvu9zpi8ywF0aJ9DEp2eONbk%2FUbQgDJjXZkDp1V4TMCnf4jcoAVeRd34I5zJRJcyxx2zBhYICrYa5X1WTmX%2FdupBeNJ%2F7PyDOQ%2BukNMfX4jSA5VY2rFZCoucVGZpfCukMnG4u3ldnp572YSLr3IAmxWWCeT8QnWmpyzv2RddBipw27J5keq%2FHtcveR4ueFYI9bJV28PDsLqJUf%2BYmDrzdNxX%2FYdqWVkT7E%2BnU10bcT5xjk7cRRyKEegZiZnTlZgVySuCTpLbSHfkxYkRX%2Fa8E0xwww0DHX2uWOT2f%2FV4jKCDBPf7bcUQe%2BimIi4qq37l%2FEW2dUb2R8Rw87xZ9hhKJjNG29X8sNJ%2FvhwCNR1k92OdS2kCUUvtvdWIE7taZSvqyRtd7kfmg%2B6ujKMpiYW3hhSa6pExdhT6qRywPeFI76F53vqoN8p7IuGYtpCpWxn8ZI9M7bp%2BwWExZFO2AeQFHMNTFh80GOqUBpbEAytL5iZsNjtlpwRuO86reRrLW9nPXiSPE1uwCB0sQp3Q1uhPEFO0xDW3JN%2Bif4jq2ePvviiUYR%2FKnd3wdETmjg8gbUF%2F%2B8tAmzlGA%2B0l8O7puVO8kzk12CNM4vTNNWolgSe7nTlEI6I43Apbn%2Fm%2BjTDLObPuxfLUz5q6CiZ%2Bmt5n5oyQuy3ltITinHoSvI8P9VllPnxKR59AS0Tr45wRxWpzo&X-Amz-Signature=a21564108740479d08fa7dfeb1affdd2beb93918d6e21388ce7483c4dd51c8b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662JWBBK5%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T201548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDxQDtCORlTt0DKtIjHTwtnL9JaBAumyw1SUvCjS%2BYpGQIgINrHtfJoF5ktaJ%2Fivxi3r1mQhrpUgTRdgEFJVB2B%2BGoq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDMXNug32CAfVZmNqMSrcA5S6pz0fn6IJcNopQt2GvLgaS%2BzXxql0pmzd3c2XeHagL5%2BmlCvVEpjAgUjOsO23YM6oNceZeMsVScjSTCju8%2BadoYASmiR63PudqmpK00EDucG26AsDBHFKld%2B4UVz1kCnPdOA3K1cPn3Af02Np8y3%2FWFeCPW2qcz5AheDRbJXidRWgLg6qYgfbavXvsQcDboj7QBhTOHUq6GBgEnYT0U6wOnDbISMO8GG4tBm14XbVm5k9Mmcce5aTISubVXXESiewYOlvo59EoLD4wBeTxPoAyZqOYvfUqf4COoLz9WHIUoJUn8paGYOKeiOW5hUwYRnkK9dWAabYeZyvLDHfjQPhTDSCbWekfe44P38cENP4kJ6X%2B5%2FQJOsfnbttjBCOV4St3WveXVKB2yZkg6jhbeULdODeSZQ8QCj4HRoTTi%2FUvy6qVkYbbxDuye9P7TvRc2fHGSYIb90yR8wSmK1zc%2B1IFlOfh2HswAfK0S22F0%2Bnm0DvpVnEG%2BifrMJ7WXlZZL%2F3JKavNu61l%2FETXRlSiUgOdCzjjjuoyXVgfByBYHM1zuXcRa2nZeasNk9REHcp7Boubog9%2F935WVBjd4g8i6Si9w%2FBf8lsWQ5%2BgtfkvPgo%2FeyGoQ2ud2NNhjLlMIrFh80GOqUB%2B6M6Z2pgMHMeHeuFDwJQygXwA3LQ1aUrmbYHjTstyTOnzDUYlnm9j1NLav01vzmWBb%2FgPrEARLn6fYjaTGkChCZoIXoxc0KLVvb0mY9LkkDKDnsyxEYLp%2F%2FbdFc%2FpgmNYqP1bPzWHARyD7X%2BX%2BIf5o1sasBPVI1JIMNyms7pD7chev0NEB114RVSu%2Bxo%2FJAzBfDm7hITrTA7K8%2FuBGanuE%2BzsM9b&X-Amz-Signature=83dca9bfe34058558fbea7825c6636c1a10316599ba0852f20d5cd0bec849b5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662JWBBK5%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T201548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDxQDtCORlTt0DKtIjHTwtnL9JaBAumyw1SUvCjS%2BYpGQIgINrHtfJoF5ktaJ%2Fivxi3r1mQhrpUgTRdgEFJVB2B%2BGoq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDMXNug32CAfVZmNqMSrcA5S6pz0fn6IJcNopQt2GvLgaS%2BzXxql0pmzd3c2XeHagL5%2BmlCvVEpjAgUjOsO23YM6oNceZeMsVScjSTCju8%2BadoYASmiR63PudqmpK00EDucG26AsDBHFKld%2B4UVz1kCnPdOA3K1cPn3Af02Np8y3%2FWFeCPW2qcz5AheDRbJXidRWgLg6qYgfbavXvsQcDboj7QBhTOHUq6GBgEnYT0U6wOnDbISMO8GG4tBm14XbVm5k9Mmcce5aTISubVXXESiewYOlvo59EoLD4wBeTxPoAyZqOYvfUqf4COoLz9WHIUoJUn8paGYOKeiOW5hUwYRnkK9dWAabYeZyvLDHfjQPhTDSCbWekfe44P38cENP4kJ6X%2B5%2FQJOsfnbttjBCOV4St3WveXVKB2yZkg6jhbeULdODeSZQ8QCj4HRoTTi%2FUvy6qVkYbbxDuye9P7TvRc2fHGSYIb90yR8wSmK1zc%2B1IFlOfh2HswAfK0S22F0%2Bnm0DvpVnEG%2BifrMJ7WXlZZL%2F3JKavNu61l%2FETXRlSiUgOdCzjjjuoyXVgfByBYHM1zuXcRa2nZeasNk9REHcp7Boubog9%2F935WVBjd4g8i6Si9w%2FBf8lsWQ5%2BgtfkvPgo%2FeyGoQ2ud2NNhjLlMIrFh80GOqUB%2B6M6Z2pgMHMeHeuFDwJQygXwA3LQ1aUrmbYHjTstyTOnzDUYlnm9j1NLav01vzmWBb%2FgPrEARLn6fYjaTGkChCZoIXoxc0KLVvb0mY9LkkDKDnsyxEYLp%2F%2FbdFc%2FpgmNYqP1bPzWHARyD7X%2BX%2BIf5o1sasBPVI1JIMNyms7pD7chev0NEB114RVSu%2Bxo%2FJAzBfDm7hITrTA7K8%2FuBGanuE%2BzsM9b&X-Amz-Signature=068595546448a7dee8d96850c6f04b1170436b5fd2a0ee048a336222d56b6d70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZM6MH6EQ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T201550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIDjlB8nsjsMgXI12VjYl%2F8uYE4wpYmHTr9xQcA4VygGQAiBSb%2BINTOt29ijQr2UFwzWpjvMtwQ8AqSPQIQ5dYi8RoCr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMwWK%2FcdSp%2BwXti8sAKtwDsTP%2FiD%2B9qSo3iP%2B4l%2F6hQJqCaQ9fhB%2Bi3hHU7lmiTKrx12Il2nIc9ZYmo0SIVJOTTDqFWbVJsom%2BZdTcA5o5G9klpo1Ir6N6KulSyi26myZwYqrSlzXFpgPZQZ8ac4tG1VnZyf9btq2QdDIBTqJb64iKqg%2BQJY5k3QUQFN6fQ4gPcSzA3zgH86lELfihVyYTwQDX%2BueuHqxv%2F%2BjmQ5WtkB617r6C8b8ZB2B8Kj3i1AjnA%2FboUhbVQbBU1OZK9mToPblqlsU04y2IZVOVS6jX2KGGs75FNS3RGJVD3aEj32iiUltIDwXuUtu71fIz0pGq%2F25UbDdvgYHK5ZZ7H3HbOo9OMmc50b%2FXufwDUkGNU2v5VJKYZ5Tdd0AHUI8WcXFOO8kzE3zJPVN38W8p5IYLOvr4HOqzkKAPS7LPSOItT1HmCSZLwhzJdfQDt4fsZKZBZJfKdypKgm1G95bsLzpGvEnY6NdF6Yg6Vw%2FShOvEE%2FRa%2FUy3rPIV0q%2BsLa8lBwBhO1DkENZG9dgpOCBArjM0rH1vPV1l8SRSgIRQjv%2FN2baZ1S7M47FQPqgJyl9LtQgOQ9lcFm9vfFUUAs1v%2F5gL4fp66TBG%2F1HfB%2B8dhFF4vCWqZzDgjB4HIxs5N7kwtsWHzQY6pgF3ZQwdf9CQDaIoihHdiveelMm6I4H31kIm3ZTBgT1tz7e1JM2eCfCXBwWmkdbhk4Nyt%2FIQXhRWxMNuSAO5a8YipIdTAV1HTi2qfWrw8zANdA7ZqnLLImMdeUzspXGgTCEGwCPc0r8A7On9VTaeJ93rmbgjI0rcVldO5BbAFUqFO%2Be6Y0K0STm8%2B7fm6fqfEznuw6G2uCIYRWALaduSSSQ3fgt68TnZ&X-Amz-Signature=007121c6ec6544f9f0125040bd7ef8a4401bd2313b437f383644e10e39d503ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NYPP2EQ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T201550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIF4hps9OCjJzqeWZW%2BycqinM7Q4vTudxVzlth60BHhDjAiEAkHrfhoYVuExSCWcLexK%2Fd711pXFqGnJ4oZGVK7UD7tkq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDJW0%2FTEtNkR%2BS%2F%2BgiyrcAzilEGoZa7JsuTDmFk3fAr9WOnuEC070quWJHcpvongSsScqfp19GURCbAmMduwmPiSFyudaWBM%2FTmzmEgX58dhJc6MkfoJnr1v9fsBVaw1ha8G6ex%2Bss%2BW98sxAKY9%2FKtoSH5sq1KmTHJU4Hxy5qiTfoMtYjl0JE1Ld7XZxbJ8UuQWCIrshIfjzd3KtPHAH7SeXwcVTLhRlTkFU%2BDGmoyDA4J0Z2fxdCGrjW%2Bjxhqovt3TatRju6Zw66qnk4Y7laWaDkiEBYqWeLnzeWfEMJ%2FQ1UBHAbnmcVks9HcrcEAt339mLH5X2lMLsk9lSUiWQLYecTKyzcDti6ulpOy2KOObH%2FYzAHkgr9lMKrnI93sNFxDYRZVVsdwG4o9MLE5ROxy2TROLEFQqVDX8hFXpgdmtYm9A8npJqrSzXqjj9JiSiNAq5eeXTfdtm7k5%2BS0s7MMdriGfOHvVzOmf1%2FQvJxDamoxRAEIS1sccs5885%2BNXrT%2BChpdLsHvJ2L%2F5tu3Ry98Zg1bi3awS3BXxDGq%2FHZYpxBU3BMThDoepLLhtWH49aL%2FzUqgYn0EcCeJ2t2rqmvElV6K8c%2FEGHyE3%2FB3rwSyUF1%2Bl0XwLENtAFk6UnFGrvdapd%2FwTSFl9Ew7IOMIXFh80GOqUBXQzvkCMklfaSXefKa4f3WR7a8Vd1eDcz6TS8oyFss6eHg3k2SMToIyg2j%2B6gqr4QH64j4Tt6C6%2BVYDhHMj54PzhkCxpg2TnIgi%2BUbx%2FdMDO9CH%2BJhThLq8gymeQMQFosdAN5duFkzlICyvqFkxUGDF5mQBftkgg0Pw9y46bL5VlSUiRTobNAlCZCWv2PfsAy%2BSjD83tR3lWsfbKi%2BepzPxDxai5h&X-Amz-Signature=942da118e6e55d42927811224ec1f0690065a2c4083b0f999597a6563ed04991&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662XNWJPK%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T201551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQDgtwq5S9x9GURb%2Fk1kQARo4W1WiU13a65GHZn7Zp73qwIhAPwzsblq0RNLy0jSAFZGv0JPytzMqoYJYuRkZUiatf3uKv8DCEQQABoMNjM3NDIzMTgzODA1IgxRQoaofC01B8MwY0sq3AOnM%2BSKAc6trIvevBom0sjKpQNAnwdGWUGXU4d9r%2FfP%2BldBVL2CyA9%2F7UMxzbrclVgMCY%2BuAeeNQV40bHtVVVpApUJ0YXUiMbEASxupfhlZ0cS03M5bviMv30XHlUtZiNXsU6RNUUA2f2aUWBT2uNjct9Jriiaf1MLWOly%2FMk2GHthRwcwIjVDbbbbbRbSG0i7uNNGq4dkusu4apCZ9lYgbiTw4PnV%2BhZqZNptk8dhYSUc2eTM4cgtqz3Y%2BLUR4BJrkSEYKX3maFbZWw0AN%2Fhpquw3E%2BgJnDLX5anOaI8Dbx5X6N5F%2F01XRMlrpue%2Bq%2BYLMWAtQ2GSS8GvM8jhA4%2FZb7BUd5FviuhlETihdByiIoGSLu6%2BIHfbAOe2RM0o7M6kY2%2Fw%2FkQYBpCeESAWUcFddzEjHlTWtCg6oSPNamMVJW6Y5jswmOX%2FebLtBvwsPta5jXnguRmM7s59NGBc3zOhvrvtlOnNnfzj5U8LUiEUYTEch%2BlfaWPdZCbwD8W9cT44DIs7R6ibRySLylc9AByeExChKVbL%2FHTgElFdChdvScidUQfp0PYPEoLii63mmqiL8lkc05Y9TZA81lC8FEo%2FMz5xEdlIIOxgKk1R1NiL0N2ZNureh1LXpUeTEvzDjxIfNBjqkAYGpbOkMx0xMSRBz7tkI13RJMflHRDHO%2FRyzFOj%2FGjChpQzj2LkdJLfYZ7o1XB5%2BztKAbrtUPJ4kcZTY2LWWgVFnhp854IOUqu%2FXZ3Rhl88WD6Yh1sQirk7Mb%2F31PSOI7W82qd%2BIrSSurOUMnPIgR4MIOaJ9cnopoCWbgRR%2F5Ez8t%2BZAUfnVo3Kwoxl6c4v%2FFCd1QyyiyehCbk8kGVMSbD7abGrQ&X-Amz-Signature=5e6ae21ab09cc25506f59ed1e638ce9d5c644145068a22135ef8c56d3790b19f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HXY3UFA%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T201557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIBWpPj321kgUfahM%2Fi5hV7iXIEIcyGOxKQK%2BLoE13E4jAiEA%2BjCoibVSfnYHwKA%2Bax0%2BKRW1uPpkd8%2FI66P3iOaLYTAq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDOOXSQnox14Ma177KircA4ON6K%2F92ITBDQ%2F%2Fiz9Nz1qKiOTO143tPCbfUsCvgJ3JzinYOvET6FOEtev7h8Zupa96%2F9QebIHFvJZHa5T7eTtC7u1INVFApTmOYhd10MSf1bHojvHCm8qxH%2Fz1S3JadwHtX9x8dLd25vM3cm8Q0B1hWxSkaEzg8gjm1sY4jQVl8Gjh9%2Blg%2BW0VtH07UNfEW%2BBock1o5QPDCmTGuYF6XQAvXXKdbLDF34smWp5s0EUNlLTIsRl%2B2Dcp8axt%2FfjAJhPNDiJ%2FMDXYF67Oc7QpC8AsEUuUvBcBtclT%2FxPVUZoXUQKoAV48r%2FGcGSe9tMbzsw1NYdcEnGTpjMWS9CgdpbAsmfqZME4tgezGlMZClPy9eUqxz14%2F4UrwOL151Blp7Vpx2NUeGprmfECMylBXjcOx3Veeg0IFIWwA8Ng537b0n0gs463w61pc%2FGAbtpIcTsJH0UNuccrzgoJ9dDHZZRDieTzE4WLHTDC5tEeDKmHFxaE53mm0uiYzkuV7A7rQixaSI%2BeQfIm9UssmTqD8hulvtV2%2BM%2BOAX1%2B%2FRgdgBrB5kqAhlhb8%2FpmZHkXVjYcjs9YndrEJ9yocKlnJoZyBhS27MuIvB7H1TauRfNCYvh6q6KtuSfTMIAvjUAg9MJbFh80GOqUB434HiLsPtvYVNwpKDOX9k7qpPz7dgVehozFTDZcCB7utaVO26kYg7iyvbP2bz6mTpPdBSqjYsN2BuvGXJsSn6Qm8qR7XsuZFAoBasNknnG1gJNY7XpkVc7Kkms7EHPiCTOrHY92aTGK79fgKtrbhbdSBSNghspgbwhan2qr9ioI1s0nHO0V%2BpExmz4AUNPHcyM%2FzAog2l1nyUMJlhwqbVAFTqqiP&X-Amz-Signature=b02dcd805ced56f7fa24f1e90bec069c7e9d87a220d6a7b776d0e0b954ef89e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HXY3UFA%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T201557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIBWpPj321kgUfahM%2Fi5hV7iXIEIcyGOxKQK%2BLoE13E4jAiEA%2BjCoibVSfnYHwKA%2Bax0%2BKRW1uPpkd8%2FI66P3iOaLYTAq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDOOXSQnox14Ma177KircA4ON6K%2F92ITBDQ%2F%2Fiz9Nz1qKiOTO143tPCbfUsCvgJ3JzinYOvET6FOEtev7h8Zupa96%2F9QebIHFvJZHa5T7eTtC7u1INVFApTmOYhd10MSf1bHojvHCm8qxH%2Fz1S3JadwHtX9x8dLd25vM3cm8Q0B1hWxSkaEzg8gjm1sY4jQVl8Gjh9%2Blg%2BW0VtH07UNfEW%2BBock1o5QPDCmTGuYF6XQAvXXKdbLDF34smWp5s0EUNlLTIsRl%2B2Dcp8axt%2FfjAJhPNDiJ%2FMDXYF67Oc7QpC8AsEUuUvBcBtclT%2FxPVUZoXUQKoAV48r%2FGcGSe9tMbzsw1NYdcEnGTpjMWS9CgdpbAsmfqZME4tgezGlMZClPy9eUqxz14%2F4UrwOL151Blp7Vpx2NUeGprmfECMylBXjcOx3Veeg0IFIWwA8Ng537b0n0gs463w61pc%2FGAbtpIcTsJH0UNuccrzgoJ9dDHZZRDieTzE4WLHTDC5tEeDKmHFxaE53mm0uiYzkuV7A7rQixaSI%2BeQfIm9UssmTqD8hulvtV2%2BM%2BOAX1%2B%2FRgdgBrB5kqAhlhb8%2FpmZHkXVjYcjs9YndrEJ9yocKlnJoZyBhS27MuIvB7H1TauRfNCYvh6q6KtuSfTMIAvjUAg9MJbFh80GOqUB434HiLsPtvYVNwpKDOX9k7qpPz7dgVehozFTDZcCB7utaVO26kYg7iyvbP2bz6mTpPdBSqjYsN2BuvGXJsSn6Qm8qR7XsuZFAoBasNknnG1gJNY7XpkVc7Kkms7EHPiCTOrHY92aTGK79fgKtrbhbdSBSNghspgbwhan2qr9ioI1s0nHO0V%2BpExmz4AUNPHcyM%2FzAog2l1nyUMJlhwqbVAFTqqiP&X-Amz-Signature=a8ed356a001b8867365eb4688b638b2814706f35547a29ba1f49cbdb43c4d7eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6BCZT3D%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T201535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIHWuzrYfojzJBjPkC3OMczNRYUTb%2B%2FPA%2BAFwg%2FiVpkSnAiAm56gwLoFMRwFdvnKyTMqdot2TkH2Yz5NzfVV5%2FPg2mCr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIM5MM4cBSqIsgs%2FwvZKtwDiNruEVE0J8Lo8OXFHx2gef1FfelqgrIEnNju9TuQ5RFA3FkFVGc4hY6oTyHIRGC10DG7OeHz6s3OfLd5MHv2WXxZYI%2FplSMNNqzfn1DCYtG%2FHvEyIu64UcdPEj2ZUvozuDb9dphxpfpsfOce0zDLot2ix3Y4m%2B93YRq6rgbGrHj8hg2Qf%2FzN7ODLuATj%2BrHKlR0v2ZF369KqFb7pbYyHGJc5jCx9frkS8MqO%2B%2B%2FhId%2FI%2F0A6dkvXo6XIRqrnWWWv6aQbfEB9InuD5CNl9K8q3LwNgZgd7Sqn1mgqqMC456KzPBgzpaauEd5eNj1l4vozxSznYu8uRGt8xWp82zSrdGBXdGnXyjiOYIC9PK6L3cXdiKyoyibyqF%2FLHVFYqzyMwEuBo4yv4Klm9CFep9DyHRZAN4Kr6EZiH2mDe1vr8qAIyIeFlAmVKxW4PSuhB39hioiNQAvzlHRLfC%2BlvE2MPTnuCVO%2BcD6LrfGfSNUSzTum6pjAJ93lyI%2BUEMkqtekgbO9SR8mpz7Uqbe8DfXIhtwlRtIshLj%2BfTARgSyGbTkbV4c0LaAQS9HbQkrE7UqYiq%2F5YI%2B23KNkeauKAwrPnx%2FXcdFlTpVs%2FO%2B5XAstXYy5h%2BStcISa57%2B78Q5sws8WHzQY6pgFUEb1oZuzAS4n4y0Jw3kaodrAFJQMZtA28m1%2F75kwgYbiFyk37I76gHKZTSC2GCd6lbKVMwpFiH1WU9wB%2FQ8K%2Ff27LjUP5uD8GGPMMIGBmR3X2krK5g0qqEqoLPiYu32%2FN03LcVOEpO7kU4SAf1zsRWBUW0oppazbd%2BawS%2B0YQ47heWnPbE%2B801kKpf9%2B3XMQd8N0UojQHDlCuYEQ%2FNFk%2F7qrQrEte&X-Amz-Signature=dadba6b97ff5dbd4b993a5db6fec71fb041b368c617965d4ea0a23baef563653&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTTQTVBA%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T201559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQC9XSBRiyKS0Yt3lRN0xkPiJT0qw7yZTm8uL8XYQodsvgIgAyxKZ7R9corZxRUTshMwopRYM6Pk3Viw0a%2FyOiPTghwq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDLAJbqt8s5ToWRg%2BoyrcAw3dvdWRHlnK3Vd86FP6%2BXPo0r5klezeAmio4EhrB7BPLuJxXUhge6W2VNlUCU2EZW4eVl4SPUMH1vsnpWV8B2Ty0LQbGoMjFyTVxVguGuLqLiiqUstfHCHyi4hZIGGYsyDNaYed5F5UouIhtUBfchBSRXdzPPA%2F8hVOHiVOPhIFgKkzyIP4Wvm3ZLpj5kntqNjTl%2FKJGqbJTYdoheEo5uahsJzpeCerBI1Iz%2FdlhzvugLb9J3TvmZTBfudRRLWFncJA6EGLbOEACFhVrwazzPsSrublSm8sux0cfHwwOe24rcTNnYLNVou7xfWMoKlaUAw7FhKrxvmVNKt0aQneLbbjAgWx7H0z7JqlmAIqZgAdaM9vIOO2omhJ5sJrsHtpZPyFPeiu8VFcHsHjbeZPGDsEjxgjm8v%2FopMjXX7M4nGes8QikHChvZs6UYtSTeBXvMUaafUTI4kXIaq2oqoViESus6BfnhDSnVVkMHAWB9zXvOFoGYo5vBQPLVvKKw97Rc9zcOHOgAICRcoIKhAsVJD%2BY2C%2FtE%2FI41iv3SYiMrMxNkqdInnGzK9Ui4lhu4riZSilQ7c%2FHgAhnQV8qr0YxOFGBUh%2FI3LGgRy%2F7lWTiQbIJ1rf7r7COBJSjTUhMIrFh80GOqUBDS9vyBmJxp%2FCRkgctazTLgQQTOnZKRnnfqifBvad%2BMZB5Upa1lFO5yxRWSWpYQkReNC%2BcRIM1vuK0C%2B%2FtopqNrmmSbCYEkQTT3Gfx1PIZJUyC%2B5teQu7i3dYA2XhhG1FWpwSL00cKcolR4ZTTNMtW7BuQD%2BxTEMJbqxjjLaOu5cgUGpgkn7jO2gWS12aG8RCRuTZQRMb6xoam9B2PBjqVDa9RMsS&X-Amz-Signature=5b9f448c54a36c505fa3b4985e04db0f8227c674c5b7ad5e14c74850f94e6def&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTTQTVBA%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T201559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQC9XSBRiyKS0Yt3lRN0xkPiJT0qw7yZTm8uL8XYQodsvgIgAyxKZ7R9corZxRUTshMwopRYM6Pk3Viw0a%2FyOiPTghwq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDLAJbqt8s5ToWRg%2BoyrcAw3dvdWRHlnK3Vd86FP6%2BXPo0r5klezeAmio4EhrB7BPLuJxXUhge6W2VNlUCU2EZW4eVl4SPUMH1vsnpWV8B2Ty0LQbGoMjFyTVxVguGuLqLiiqUstfHCHyi4hZIGGYsyDNaYed5F5UouIhtUBfchBSRXdzPPA%2F8hVOHiVOPhIFgKkzyIP4Wvm3ZLpj5kntqNjTl%2FKJGqbJTYdoheEo5uahsJzpeCerBI1Iz%2FdlhzvugLb9J3TvmZTBfudRRLWFncJA6EGLbOEACFhVrwazzPsSrublSm8sux0cfHwwOe24rcTNnYLNVou7xfWMoKlaUAw7FhKrxvmVNKt0aQneLbbjAgWx7H0z7JqlmAIqZgAdaM9vIOO2omhJ5sJrsHtpZPyFPeiu8VFcHsHjbeZPGDsEjxgjm8v%2FopMjXX7M4nGes8QikHChvZs6UYtSTeBXvMUaafUTI4kXIaq2oqoViESus6BfnhDSnVVkMHAWB9zXvOFoGYo5vBQPLVvKKw97Rc9zcOHOgAICRcoIKhAsVJD%2BY2C%2FtE%2FI41iv3SYiMrMxNkqdInnGzK9Ui4lhu4riZSilQ7c%2FHgAhnQV8qr0YxOFGBUh%2FI3LGgRy%2F7lWTiQbIJ1rf7r7COBJSjTUhMIrFh80GOqUBDS9vyBmJxp%2FCRkgctazTLgQQTOnZKRnnfqifBvad%2BMZB5Upa1lFO5yxRWSWpYQkReNC%2BcRIM1vuK0C%2B%2FtopqNrmmSbCYEkQTT3Gfx1PIZJUyC%2B5teQu7i3dYA2XhhG1FWpwSL00cKcolR4ZTTNMtW7BuQD%2BxTEMJbqxjjLaOu5cgUGpgkn7jO2gWS12aG8RCRuTZQRMb6xoam9B2PBjqVDa9RMsS&X-Amz-Signature=5b9f448c54a36c505fa3b4985e04db0f8227c674c5b7ad5e14c74850f94e6def&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6SDRM3H%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T201601Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQDOXXDLouuAVSauMTLU6%2BToYIf4unx4Fseag9TKo2U35AIhAJEoie84%2B9zB4g6IBik%2F8NkE0Kye%2FNO23vY6CFLTKM7UKv8DCEQQABoMNjM3NDIzMTgzODA1Igw3PG9wtCK1Akano8Yq3APp%2BGsm%2BAKN5U66Qimr3922Vz0Lqfg%2BLO7ob7x3wjomELwPbTcA1et6fH5K9M3xVLQPyE01PSyo5WpG%2F7XygFUpzoG0ge4n3%2FICWtIx%2BZZno8JCxPBQR5DIjgomL%2F0wAydUr2JqTUlYg3JeL%2B4DBrP%2BWeVIFLNi91Tgyb7Fa6YCCzHoGFD6wLorCo9Pqxx0OVQ6eUf%2FWjKv2lWf%2BYv%2B4lgAw4BhH9DjIKsCVBZ5kg9rkXRLtXcxyVqOqQV7UBwpsOw3yBKuTEY59Tx%2FgnOsAa550l%2FpoAHyL3oPUUzC5cH%2F5FJKg321fPAV0Xpz%2Fgov6mpCp2Xkl%2BOFrMcw0N9%2BoLnugf2oY8Xm0ZMv%2FqfIL9NUbe2DoC%2FhGpPTln768ayZ1pW80bf9khU2DEUD%2BMhmdfT7fwzsdJL06giGmH1SRGX%2Fj8Irm2dtnK7Yic86F8ZLlXWGrCUH%2B3hyj7gn%2B2bkHfb4M6%2FiwJeRTwAw8CGk5Va%2BdvP1365%2B0Q4NNPjqDqw0WlOBYIuRYP%2BVxxCF1KXbNICm530VjHYJKastQb1IXgNcr2hnive%2BWVdDINsEJXloAHpWXQjp1guiYpNRNtGHrYLiAmuvgpEx%2BXgrhSjH5XVBCas2qjP5ZoFoOHhtCjCcxYfNBjqkAUsDZH27%2F9vgAo1OTAOW5xwhjfBCkfqxaW9Re0IErFzk%2BxqCrdErLC165Z46QiSvFuO%2FNLVIV6btUdMRK0Rc3xHJm%2Bdxc%2BCGSE5WRcRCrABqXSF0KQGSwQChEROsud%2BMPRM9BianJuV6OD2bgeINPZnHl%2FANaejHaJRoMkMLnUWsqvDewhUgG7x55k3Jd8bFvMzgvxpXRGaIhcXfcbgi9i8fwI6Q&X-Amz-Signature=68429db34a3aac88f094ff6b85035201c82e38514e9fa2c94007edcfac118306&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

