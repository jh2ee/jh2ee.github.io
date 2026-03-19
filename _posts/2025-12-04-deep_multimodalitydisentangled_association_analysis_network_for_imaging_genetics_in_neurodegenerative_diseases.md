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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTV2GM7E%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T193755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQC6UWnGgd3Py0WZdZ3DjudPjNIR0p7pgo%2ByJTn8AXN4UwIhAIiMnv9b1GDdCpWsm9R050vu9t%2BOs2BYCd%2FHStPqctdQKv8DCCMQABoMNjM3NDIzMTgzODA1Igx1sJFYb42I0YmVhSUq3ANnNQ%2BhtTm9IXtE%2FzUthOwvmLfPICE8aOOC3jGKGbp%2B9lQ%2Bg%2BIFJIYAJ0teoLfYtPB26X1Asi%2BEbLxoVVjM3O4veFkeu3TWrAQq2sN%2FDsUG%2FkG6iQ%2BuYsSnyXCmnFIh6ANQJRTXOa84Jk9mgx19ItBaYCeu78BTfen590s9ExgCmvI%2Fh0KHI%2BdOnOsOC7y9gVSt7RsvypQCN1XwH04cFP9l6vbxturgTgMGcvTNSAsRjnCDzE0n2TE%2BQ7HhBp%2BE9%2B6v5o1k%2BgedQhQO24DRH4avTeh%2Bg%2BE6%2FAfczv5qz8BlRKXot0KrYCPADSKrxrfpFFsvVMwvTfjJjJEYIymq%2Bta%2B%2F3QX8qOJqFm6CTAluDMfGEKk9keDsaObP%2FNWTvTaNMXxQ9vem02FHYkaxoA3RsM644yT3vPCar2z0OEkPvURfVhPfIFi6bfLVlXrLR%2BQUXsr4noUtoskMyaI7MQphvWQJxatDs1D%2Bg%2FQny3BhxZ1gwgkQe1LTJqexV3Nl6C050qYV99YTkUDxQjUZSE5K68nc%2Bz6t9CoWALiJlUouQrL3fqe1v8oYgRaWrCCfwQ21xCCHyIBsBM9X%2BnswqahKXSCPn4hPUVUk67CmStE4q81usjG97hXqnAIjSK3kjCS9%2FDNBjqkARNTPtNkGr1yam9EfaqGr%2BKML4jhf%2BptiCbeL0OrNGSOkEZxQ2n1pbxp63JLxu%2BQmeBSHDvM2sJfDxga9QDV2KJk7ObjYudGZwhX6naHFkXgpjNWvwWMnwcpWEKNgfqN50fDjrzcAtoolE%2BLHdTqL76Z9xFIreXkNksMZPkrd7r%2Fie8FO1AjY4xHoxKG4Nhwhy3NAz59soDlijMuCtTXF93l34g7&X-Amz-Signature=d6b205b61c1210547f7f7cf96e8fa772e1034f90cd7ac3cf66658e2ef0bc8054&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTV2GM7E%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T193755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQC6UWnGgd3Py0WZdZ3DjudPjNIR0p7pgo%2ByJTn8AXN4UwIhAIiMnv9b1GDdCpWsm9R050vu9t%2BOs2BYCd%2FHStPqctdQKv8DCCMQABoMNjM3NDIzMTgzODA1Igx1sJFYb42I0YmVhSUq3ANnNQ%2BhtTm9IXtE%2FzUthOwvmLfPICE8aOOC3jGKGbp%2B9lQ%2Bg%2BIFJIYAJ0teoLfYtPB26X1Asi%2BEbLxoVVjM3O4veFkeu3TWrAQq2sN%2FDsUG%2FkG6iQ%2BuYsSnyXCmnFIh6ANQJRTXOa84Jk9mgx19ItBaYCeu78BTfen590s9ExgCmvI%2Fh0KHI%2BdOnOsOC7y9gVSt7RsvypQCN1XwH04cFP9l6vbxturgTgMGcvTNSAsRjnCDzE0n2TE%2BQ7HhBp%2BE9%2B6v5o1k%2BgedQhQO24DRH4avTeh%2Bg%2BE6%2FAfczv5qz8BlRKXot0KrYCPADSKrxrfpFFsvVMwvTfjJjJEYIymq%2Bta%2B%2F3QX8qOJqFm6CTAluDMfGEKk9keDsaObP%2FNWTvTaNMXxQ9vem02FHYkaxoA3RsM644yT3vPCar2z0OEkPvURfVhPfIFi6bfLVlXrLR%2BQUXsr4noUtoskMyaI7MQphvWQJxatDs1D%2Bg%2FQny3BhxZ1gwgkQe1LTJqexV3Nl6C050qYV99YTkUDxQjUZSE5K68nc%2Bz6t9CoWALiJlUouQrL3fqe1v8oYgRaWrCCfwQ21xCCHyIBsBM9X%2BnswqahKXSCPn4hPUVUk67CmStE4q81usjG97hXqnAIjSK3kjCS9%2FDNBjqkARNTPtNkGr1yam9EfaqGr%2BKML4jhf%2BptiCbeL0OrNGSOkEZxQ2n1pbxp63JLxu%2BQmeBSHDvM2sJfDxga9QDV2KJk7ObjYudGZwhX6naHFkXgpjNWvwWMnwcpWEKNgfqN50fDjrzcAtoolE%2BLHdTqL76Z9xFIreXkNksMZPkrd7r%2Fie8FO1AjY4xHoxKG4Nhwhy3NAz59soDlijMuCtTXF93l34g7&X-Amz-Signature=d6b205b61c1210547f7f7cf96e8fa772e1034f90cd7ac3cf66658e2ef0bc8054&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q24RECRF%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T193755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQCE6aDZXfgcuWEHZve%2FkPtxAKitvhWZEerBxmbG%2BPrvKQIgPKaLqKYt71ziQ5vBYTevk8fwjm%2Fx6VrE5twigujWXhsq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDLi6FpzGl%2BwVXweyOircAywT%2BGYAVyghEZvDRSYQBO9FU5rfV35zRFGmXeoL7ief8qtnrxCILZrlJT73ppinzi5gBrF%2BWNrHxuPPtjiTEhHqiOuSEKdXrk4XlR3wqhQ2pvlF8IIJE97Y31WMdjC9OpWylY7b7KmWJzq%2Fxf2G1nCm0gX%2FMjTMQyO8vNCeL1TOgL50nBIGyF1RWJ%2Bvmq%2FPvYzMNSQ02F14JIkqmSBpOI3bZdkWM1DlX1cUsFNgbnb8P07E2pKyt39Zb93FKq%2FowUC0oYfijpX71JxbzFUnKOq0ZXnirIeNFe8XDizhboesZvxmzpZimBAXsbRBborU1FqZLlPwRSLw8dISRQosL6EgYxgXGtdQKqcOiG4c5Rga6e8PE%2B7IR2Y%2F2nzJTQcXJLaD6Lf6Z37D0LhEEDOy6JoQGMxo38my7lDsafhAzXsZqxm%2B3hb7yuIgusUnfdW5QAjTQKMfAkbTV9JN0m8R0wtHMy8rIJ8Yh9H4nFw%2FtIryagRhAPYf%2BHWiHUs%2FDqyhK5HSGx53UPJaWC970wFQJ%2FCY3rajSnp3bBTe2Sg%2BTJgS940wHMnQTmvtyrA3m8voz0tqDx10MwnxvIoZtGKh1OBNGXjHdRKBdzlJy%2BnHmlEEYh8jDw3NKVIZZiSqMJ798M0GOqUBkRjKLJWSCVwHSYYAWhWf53Ku%2FywNtaHqFzSmXMuoGwYy2cMU%2FWx5wOatsiWIHiqxLUAmJre9sJneFVg%2FD5f4ruLCUfK4uXqGYG1vdMrizzDadiNEFfAmGI6YA7gsN4H7DKSxWMgYc9BB8q2abQhiz5BF6lBP%2Bc2wlB5BmsprnTRw%2B2tYVN8K6%2FJg5OX0sY1keJqSIa3sg1eksNo%2BuESBJxLPncWh&X-Amz-Signature=1caaeeb8516c438bda6f445f1cc9a045da829684b6df3712e66ae944330aa82a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWQNW2GE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T193757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCICMKxdDVR3Fzpvqli58VClu4m8BF2u09StRLQHpMjFcIAiBNMOS47fXHUxC00%2FDpi35p7lgwW8%2FJwLwpz%2BUXqYXwVir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMCASSt%2Ff06Dgp9lioKtwD7xLUrMzjGx5BCHkBHTvO2w%2B0%2FYY29ufjJlRPgi%2Fkq9r0OJqU7REwSxcmqoo8PTt%2Bmjyv2McM5%2BukElkxnqod2BmYVVIsCZy0T3s6A43urETRg3ThkIy61wR0WHuvFerzKPCahenYSbq%2BaIcvBV7Ol7utz2k6sI1gjkLLR6GkRKotHvwGy3eEP0rxlIvEGEwN7RAN2NsXpaPaSjm16qtu9CI5j%2BKYsat2VtSGehOZaQwQ5M9RcxciP1VqJTNWfhdByRBX7UrOVb62YuJRTmSvQzJVoAThuOs9Im7TPYlHxzsewCoQbhjUQKHTt%2Fcl4%2BRZ3WzHR0rJB4lUAXXLiWUUqUBYi2jzFoBW3rc1HVICo13rgXBw9NVQSpUo9z4CewD41V8%2BggVN3n%2FkgO0jSwTInapk7OrmoiIAyO9HOshLOnQC7mlXSt9%2FcS2pdOR2HvpJ6y2G%2Bfqs%2FXugASWaz7v4fJBjzxCi%2Ff2Djz9jfiO19E8e0s3JVAnzOhrq%2Bd%2FIfsZD0XH3mAwGiX1vAP%2FZgs%2F9OkSvrDcIx33Vo1vOtq%2FdjpToBcmUB7ZtyJx3fBoOp0yPziixxWd8C%2FSNJ%2BQ57UG%2BhPHEKwIsDBcVO0Z5ZUpjaf1o3U19%2FJEGYJ5uBEsw5frwzQY6pgGTGcT0yVfdv%2BOGOVM8JYq8zcDRzFs93eoJur6B2u%2BQJGRGuLdGQzBAmmN4s3%2B7MquvscDYMmXyoYa%2BQCB%2BkokpibrzmmcBwoDzaq2v0tFeOQAJqxs%2BrleEeXFZJ1mC0bzgkxSUOcLAnXdursQe9kCrDTzMmEoxruOmNvqlU0J9ZIYeSdPrXvR09mhWxrLuqCTwr%2BOP2g7K%2BbKaaDc4QLBwTUpjLeo%2B&X-Amz-Signature=e7a3ecb527c43ce79de68cbf034eba9034c36880344e092ca048572332d7c01b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWQNW2GE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T193757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCICMKxdDVR3Fzpvqli58VClu4m8BF2u09StRLQHpMjFcIAiBNMOS47fXHUxC00%2FDpi35p7lgwW8%2FJwLwpz%2BUXqYXwVir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMCASSt%2Ff06Dgp9lioKtwD7xLUrMzjGx5BCHkBHTvO2w%2B0%2FYY29ufjJlRPgi%2Fkq9r0OJqU7REwSxcmqoo8PTt%2Bmjyv2McM5%2BukElkxnqod2BmYVVIsCZy0T3s6A43urETRg3ThkIy61wR0WHuvFerzKPCahenYSbq%2BaIcvBV7Ol7utz2k6sI1gjkLLR6GkRKotHvwGy3eEP0rxlIvEGEwN7RAN2NsXpaPaSjm16qtu9CI5j%2BKYsat2VtSGehOZaQwQ5M9RcxciP1VqJTNWfhdByRBX7UrOVb62YuJRTmSvQzJVoAThuOs9Im7TPYlHxzsewCoQbhjUQKHTt%2Fcl4%2BRZ3WzHR0rJB4lUAXXLiWUUqUBYi2jzFoBW3rc1HVICo13rgXBw9NVQSpUo9z4CewD41V8%2BggVN3n%2FkgO0jSwTInapk7OrmoiIAyO9HOshLOnQC7mlXSt9%2FcS2pdOR2HvpJ6y2G%2Bfqs%2FXugASWaz7v4fJBjzxCi%2Ff2Djz9jfiO19E8e0s3JVAnzOhrq%2Bd%2FIfsZD0XH3mAwGiX1vAP%2FZgs%2F9OkSvrDcIx33Vo1vOtq%2FdjpToBcmUB7ZtyJx3fBoOp0yPziixxWd8C%2FSNJ%2BQ57UG%2BhPHEKwIsDBcVO0Z5ZUpjaf1o3U19%2FJEGYJ5uBEsw5frwzQY6pgGTGcT0yVfdv%2BOGOVM8JYq8zcDRzFs93eoJur6B2u%2BQJGRGuLdGQzBAmmN4s3%2B7MquvscDYMmXyoYa%2BQCB%2BkokpibrzmmcBwoDzaq2v0tFeOQAJqxs%2BrleEeXFZJ1mC0bzgkxSUOcLAnXdursQe9kCrDTzMmEoxruOmNvqlU0J9ZIYeSdPrXvR09mhWxrLuqCTwr%2BOP2g7K%2BbKaaDc4QLBwTUpjLeo%2B&X-Amz-Signature=d41e6a8baf734b8cee0f4502375ee028d1631802b28ed9a48158c2fd63ac2abc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X2NEK4GP%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T193757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCbaKk6t8opV92vTJ2QFL7TdvXZwcvwTRTf6J1YAhK6UwIhAOzs74lmPD77GHf1Z8R8c1CB3xN3uBPeD2lALNkr9gQlKv8DCCMQABoMNjM3NDIzMTgzODA1Igyz%2Fyod3NL1S0wVCEAq3AORl8gm%2BJUqY8UrvqgrA8zvO9nAClHIvBsEfjl%2FLHxPDRorNrFJ1wrq7hCciTJPt5vWEtTkEaur%2B3jWfxtk4DiKHeVz4VYY1XTkKdCVmaLoHwlTUCMf5KZMv6noanPdNWvAtx0o5SVts%2FDGwZWLxPS8Xcwx9NWgyhJlmNLFy77bf1uNU64OZZP7bygLgsZbRc%2FzUWMSNGV5GmXsDVu8Oa8qo1qXzFAZFKOo1yKAaTqL%2Bz27wvsNV%2B3Bwbi6UmmR%2BJadGYTn0xo0zjhsRlICobvpCiIllYmW4lp8xpO3munslXbGdqQJJzcnfE22e2FVYPzAyQ2Pk%2FgPt6wNy3PEHjryGoxaiGH1wMfLJsjyoUxmf%2F%2FSLl59BLgCsCy36Py%2BmMPePwsUZxIJcRtCsst%2B2weP5M2kA5cmPtkWWYU43fnWlbIH8sMz41YJM5tMpPcJk5ykW2iE2c%2Bal8sGTA6cVhH6bAHpY4TcQ1tGz%2Fy0JVzc9ZrkRWZntKRGXDK8sCanEjFEGlmoPmpK8ZGraaPmRvYrtelixcQmFSM%2BQH1nJJgEgeoLv4137bSpX8HTPPjvAEWCLFlKFKaUBmvwb3ZVkUut8NAxSjmmD0pA2pCwZJmSq%2FCk3yJXGs5rEcJnATCl9%2FDNBjqkAaWQ1uGuTcJw6jd01TC2gIlPPSbKm%2FvayeIK2wX6rIlk6HoaG0k1vCFElVPPxNKfSSeeLJleUXWTgQk8FeE3Kpk4zOHUXktpTb2dkH8p3%2BQVRQ8vQSDbS4CiPmzbfKuU9FuIeCzsCnJwtQkI6DZHeeMtcxBBZO9ZpW9IpMK%2BYPcwftl%2FStDbw9YSe2iZoFJIwr0eBcD5%2BQLwxQbyrnNbGV0oingY&X-Amz-Signature=25e0ceb193763b6dffb25e1ce2ec2fb50ab4cd1f96dfac8bc19f14b255985a8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664OD5O4M6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T193759Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCICp9A72km56lbOn8ZTnILWRMvICfW2Eb0Pv20ksG6jgUAiEA4mSubb2DN%2FMgwtazIlNtFkB%2BJWpzP0cjvuMPrJgOIWYq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDPie2HiIQlpW5Bj%2FkSrcA0fKBFX5aSNENNMkj4QwIIc4y%2ByYPDNrzCNREyW5bKRb%2FXxRy0bE2Y4jJ8cZzoeknS5j5ahtBKwOkQbAMUWNEiPTlNiBJfvLSpZgskkWDg%2FI7gMa00DjSR4wOBy8ZOpVgY9C4OhOE%2BDrMOW3naDOFESmLyVu%2FOnehkx8yPCdTn%2BW4YpZFiPxgwthZ9qSPKCbGZxkTBmZZwS76EU75meoNyZ9rqhf%2F%2BkEtTK7lbflcYYHeLJB0nqzJKlCA1oZjVYHv07X6H3FPh4IUlVPKRIB6FLZNACpAe%2FLM34hVzB4ojT4Sk65kAZ9t8s3MfrOr6NZX1KtQwXTxheVkcbzaic7MJ9cfEPAya6B8xRsYUT3EV4nEPiGINBjoP7xTV77JeboMT8nHp4eAot0ddUv%2Fs5wNjI5z6I2k%2BhX%2FVB5KMKtUBY6Ak75oISdCCj61aGNbgpWWt7W0aE09fmtOXGJaI2sevqxWDlbo35WvKIBCTsPaysxBVMdKvCUmiPL%2Fhn2zMnqsR7PsPftWCMdKEFWQMZOXZcuMhgU0DNxLY1GNZd4LVzQUZWg7kecSJL3%2BnYH7Won4ec4J8XrQAFP1VHPkOi04S%2FQ%2BGqb9XmTiDGladN29uspA0Y2U0aNEklxVlaLMPv88M0GOqUB7%2BqkOId4nTQdMR3IAJEQzqY3KnklxT2GzRb%2FibzhH8RXCBUf%2BK7rUgemd35HyJEkql2jD66iJk%2FtbUo3ZjOF1EtUVRIxjVjSCW3latK5h%2BmlkRYG6x7McMB%2FyoF8DbsTC9XotCFf3gnj7h%2BLAnHP4fGA5kXQvwI5lJA%2Fy6cYqC4yI7GLRDiW68KlpR58CRTcasO90WVXFtBpZW6djhkCjfQmbb05&X-Amz-Signature=4425200b64f7eea60db1e0a01f869d47c9713b995a0b91eec0ad47e637167550&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YACUIAE2%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T193801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIHN2f0WxgIkyNKcJMHdzMAHVIhsY7SREkQFTyysp1JWoAiByyJk9eTsuev0moqY0IZUEiCoitQiJTSwKgKvhmRzNAir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMU9c583uduJdZN4f8KtwDR2qtZpTlQK1pPvbHdZmCSaEEtApfB5RWB%2BRRma8ZFASF5MN40AWMHNGZlLBAznXlv45V9vKBJxmhbT6p8vsWyzsvhmywDztjL8tSsB4YeU3Ft9j3MUgz4trA6J2PF%2F%2FO2aIFLgTEBCyanwyzSkIgVbs6D82VmcNdJMtF83Y%2FB04TLA94Ej3lDCcLJjCKzBdxsXdtojFQNGMSmu2kTmfgHsE2mpIuNU6o1IaQVtKZcTmNvFU8zIxBJY0flYA9U4l%2FiZlZYhODkTsWvhCG9pKQb3I0CDh4P%2F%2FDbN%2FHwC3cESfUr8Lc4ozk6xwKqdwzuSD0%2B8wm7too%2BbHpuyD3Ro6auwvuP%2BlwInia26K9iV7696SM0dlVhY0CgWfhvpXNWgoLfKFk0bYk1g%2FB38yQzNaxtz475NYuZPsXLN7t4QwyTNqTlJ1f6XMjUuQgLwYFvUjcKS1Q1Ai02rm40cDLOZo2iygYSuK%2BIYgVoFZyqBKctu8uh1fJsE7SKRQ%2B7tyHpIk3pSIYas%2FIW87Gf6BAPLs7fcpLKAMhjB9fv%2Br2izBnQQxb0tf1sWVa%2BN3HEPwfhvFrEdyIgf6RztLMvT2B1T9DJ8Euhunu3BFIMxpQdE9ruB0zvY7StvYZzzoHtTMw0%2FvwzQY6pgFS9Rm11eZzipLNaYshK%2BwQxKdhVSbpMyo8MT4MtLQ4wRRbLAUfrjZ4BBljTxiHu9%2FFXJ%2FnLfR%2BdhIc6tD2wFZI8rWLEXLbhSCgY7rJx7K9vJg%2F19hDetvKjRJ3Tpfbh949yAopBEwyK%2BkQbKtfp9RtzqT7rANB7iLM1blbjwCr1isNDsBg25tRN0vXuyLY8Y7Eo4yR4kYY1qsIpb6JPzsEOyh5Q9Bu&X-Amz-Signature=f51471b0c2e2f218887ddabcd3dd97c9da412fd89afa6177746022c1b968c80a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JR5IWMI%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T193804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQDUOePBYZOs%2BQeoQm54L0XEXNHmGSrApRxcosqKynDPnwIhAKKbhmNmYuA8lp0pXiXfbFAxUyAu%2FmLQqu5zAjxj1yq9Kv8DCCMQABoMNjM3NDIzMTgzODA1IgxNgWURJHmrZxK6Y%2BYq3APj0Tyt%2BV4vsvvgkulYzNLgxtEdLvPfiEjBnUAfcxiIfPlCsLMiCc7fwZpnQpFr8F1yuMyOdpq60LkOFjVbfh28560RXFlUtpFYt8o8ZxwA2CHGIpUTuTIHdrwh9rPTmAIuoDxa54OHqfRIvMRHBkG6mwueooAlYC1wi3yWxah%2BjjE3d%2B7fhIt3bxEZGcVvIQ8DG69KFZ2vVMhKZ2XbD2eAwRT%2BGcOit%2FZ1twX%2BMbDz6L6yV2zFiwD%2BoPjj%2FMUowJonhaBRw9JVFvLtJkYgRfgtPFGPhzd6kTD2K1ArjP9ogBy3Z6zsrhOibeMGyvg%2Boxi70DfqgLhzkp5%2BOKDlr71hPFOA8mKpxHNFQd3wEszG7L3k8icDzEPDm2qurRAMyTprJdSbmx%2B0Cd6mSGrRpxwyQy1DLalk%2B4vEMtQestZGe4aVoh03DCXJvB3V32rMI1TOLYa1yUrDJ3E9LU1fyOzPdLa7T6pUsPxajfR%2F%2B9Yo%2BosJfzKh84ugokJX%2F2wbAzoqtv7wRGCwjHeRfjV9hx0otV27TN5GMXj5Rk6ZTmf2NgAKD4X2KGPPFgBZ%2BhodRgV4ghkmz7oT1xlTgdGkXZadwf%2F7oJGK%2Fq7zjtAEcCxr%2FVKA5JUvRgmzTmQ7IDC5%2FvDNBjqkARLjMLeHwzXC61CYRiQ%2B1EsTJYNPPCT5VAHWrspPSqEKKO9j5v5CjHiDYaEzMf5HL%2Bzxp8i4Wd8YbLcvT5pRcmHgVj7MHXLacfrTDchHjIRPLB25u%2Bb9sGBGojgs6UmYoImEO4BW%2FfokFP26D8xtBFe86Ts95vpnglpAtW9gW4IjOjwOp7HMTihnultAMfbeme0dZLWNBjRrGl9niOr%2B7YnDJp6C&X-Amz-Signature=c9a16995d29d94bd5e07b97ff5354f6c6b9171526f30ebde9446ed52a3579dd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JR5IWMI%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T193804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQDUOePBYZOs%2BQeoQm54L0XEXNHmGSrApRxcosqKynDPnwIhAKKbhmNmYuA8lp0pXiXfbFAxUyAu%2FmLQqu5zAjxj1yq9Kv8DCCMQABoMNjM3NDIzMTgzODA1IgxNgWURJHmrZxK6Y%2BYq3APj0Tyt%2BV4vsvvgkulYzNLgxtEdLvPfiEjBnUAfcxiIfPlCsLMiCc7fwZpnQpFr8F1yuMyOdpq60LkOFjVbfh28560RXFlUtpFYt8o8ZxwA2CHGIpUTuTIHdrwh9rPTmAIuoDxa54OHqfRIvMRHBkG6mwueooAlYC1wi3yWxah%2BjjE3d%2B7fhIt3bxEZGcVvIQ8DG69KFZ2vVMhKZ2XbD2eAwRT%2BGcOit%2FZ1twX%2BMbDz6L6yV2zFiwD%2BoPjj%2FMUowJonhaBRw9JVFvLtJkYgRfgtPFGPhzd6kTD2K1ArjP9ogBy3Z6zsrhOibeMGyvg%2Boxi70DfqgLhzkp5%2BOKDlr71hPFOA8mKpxHNFQd3wEszG7L3k8icDzEPDm2qurRAMyTprJdSbmx%2B0Cd6mSGrRpxwyQy1DLalk%2B4vEMtQestZGe4aVoh03DCXJvB3V32rMI1TOLYa1yUrDJ3E9LU1fyOzPdLa7T6pUsPxajfR%2F%2B9Yo%2BosJfzKh84ugokJX%2F2wbAzoqtv7wRGCwjHeRfjV9hx0otV27TN5GMXj5Rk6ZTmf2NgAKD4X2KGPPFgBZ%2BhodRgV4ghkmz7oT1xlTgdGkXZadwf%2F7oJGK%2Fq7zjtAEcCxr%2FVKA5JUvRgmzTmQ7IDC5%2FvDNBjqkARLjMLeHwzXC61CYRiQ%2B1EsTJYNPPCT5VAHWrspPSqEKKO9j5v5CjHiDYaEzMf5HL%2Bzxp8i4Wd8YbLcvT5pRcmHgVj7MHXLacfrTDchHjIRPLB25u%2Bb9sGBGojgs6UmYoImEO4BW%2FfokFP26D8xtBFe86Ts95vpnglpAtW9gW4IjOjwOp7HMTihnultAMfbeme0dZLWNBjRrGl9niOr%2B7YnDJp6C&X-Amz-Signature=30f77279fb34411069da6eab8afa980fb58ec76aeeb65dc86b86009543a93d4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LEV3GZA%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T193752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIA2WPk9z0nUSF7QSOroOE6yTBdoTnUCLUU06qNTog7IxAiBS7RlRGfaabS71H4yxoE9MtPeZI6NW%2BnHKMyTd10%2Bcjir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMUC8d4DYY%2Fm85E18%2FKtwDvDF2IQIla1VpX9fsGvgLXLPcnvX9N4JsheOl2M1KiCEic4OcYJp9PrcRbseP0vOJZSQU%2BSTwATSWXnnPUSUijjWdCD4lO6su8M2aExDMJHPdN8r01Q8IzhMleIstEBEaI9q6IPAhc3EsJOuEzV0diodSWElrCEu%2FKTg6qiOfGbm4kGIH7%2BO%2B%2FWKvn3GyTBE468RWtuMC%2By%2FAUEQhJDy6jvmn3i3xuE1gAcc3%2BA19%2FNozxneW4ZD0NjuQAdF%2B2%2Fge6cPC7YGm7KVMkmO%2FIOGTXioubhrUXrtMFDpVH7SZiF%2B%2B6M8qkxoPuT4rlYa6mF9vMpaweYeXdLv4UVt9dyuw86HWDPS2N9FlC29jZm6WwdxBImLxHYALZg0LH7FrZzqOqXDSk78Qcf8X9VD8XGxnRnFk%2BEgmYBQmBBrNwRLlFDQkIVu98sW%2BRN4TH3CUUPLA56EN7UtIL8w4JTn09%2BZpBTRV9Py0HhyYagZvnOEmvR9IKllKbrM6q4L%2FjiVkhyV%2F1FiU1v87svfgV5JfC%2F16S%2BclNMgrpWbZ8SYUi%2B5di%2BWcve5Xl5OGGo%2BXWZMz9RooHOZLftUGlTJnpKwJPM24FYDlb0GbzHfh4sPx%2B8Kl5EYAIwOg%2F79OnwHN1aUwr%2FvwzQY6pgFZtoRDjXnGeISzQtdLYIgII%2FCDQH3yPqVvTFFF8fp%2FGQR2UJa9E9h3FBWahft8m5PhKNh1GXyFXgkk1onBdiBsur%2BQW080q%2B7zGphlP%2FmKEOHRIkvpNVuPBbqcRr72zOYlW0V5r7fn2bsiN%2ByRB2kX27efCIUXN3TlKTdmR%2BBZXW%2BnbcBVHRxwk8UdiShOiiKL2sopZCPDg%2BOY7Wov7u7uAc7LxW6R&X-Amz-Signature=cce77368691e566e73feb964f0d912667674ab09d5e6eff38da93ff47451f824&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNQENBJV%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T193808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQDp1ik40n8o6NJZmolCtIEjlm3isAZkar4BU20RIq6FEwIhAPH1TzJejAwJLQyXFyWPuNu4W0sQqruFBWCF%2Fg4WUunaKv8DCCMQABoMNjM3NDIzMTgzODA1Igy3VjHPHhVjRt%2F6odoq3AP9BokJHGwBZJiE7iDV6jBoADfcJmt5%2FggzMxSb2RhMML%2FdK98JzC%2FuMuzpTnfl05QZWvhf1VhXkMc87o0Mka06NMos36MgAk5Ky3ZSGOk8vsGYZ5AujyiaN%2BosFqw0RJO%2F1OWgKIZD%2FJqxU7kf9xoVrUi6wE9JgCH1J5cv2mk%2BTggEx9PES%2Ftc5aAoieB4xSr7%2BO34EghnsBWsE5S%2F5pexloxxGKoZRQRUdV8B9tm8f%2BEsxbyiGNtbcSoKQyCdhpnKCmh2CmMFRADX70c6iwDwPFBOAzqLvF1TFkqxxk%2FwQikwqFj1crXsd4yTOMj4PnHksanzcMNESRSLMgTY%2BRLjsvcKSeOZeP9ptPV1dTiqQLwmHP%2Bpl8bGoSGr2FlbpbS3WYyBPnEQ%2FBfTAyjhlxkKdnB6OmyGE4R3usZuuy8gtH%2FV0s7lYEu%2Fczn0IBIB%2FzbYAAofaPCv15MXN%2FjgrKNIVLREnPiXfluS%2F5qXz0Z4OLS22As6zsdb9ifkr5URg4ft0BT0ioENgosLFtgzErjVrkzCMGzgulJqJahAuPbwzihBljr7%2FvwSUDu7bjqFVkVK1pG7Mgudb1Eotpvf%2F4loSryRK%2BSsNPmKurDAzz731okzzXuHbXvOdZzLKDCe%2FfDNBjqkAe00gExFxwYsn%2FURC92oXryvtTHz9HTw07wCEk1Nl2MsH1ZSDKIG0YZvJrUqw3ZusCGL5LSh%2FaT%2BoVrhRnNJn8bwwMk8Pjx2h%2Fm4aphNOArEMjXy%2Bhs8QI4e5AbgQ2SAjE9o2t3p%2B8AnsG%2FXLW54oDQT%2BUkQSyNqPBYvQtWwmiYB5GR65bcwLhzk3HfIr8MOZHbe6NBZ%2BYDjL4Rdmrhp%2FqCgAlGc&X-Amz-Signature=5cce66b277c28c4f0dd60663d07b8b289bf06fca247d06cf5cc65f0c9a8f70e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNQENBJV%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T193808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQDp1ik40n8o6NJZmolCtIEjlm3isAZkar4BU20RIq6FEwIhAPH1TzJejAwJLQyXFyWPuNu4W0sQqruFBWCF%2Fg4WUunaKv8DCCMQABoMNjM3NDIzMTgzODA1Igy3VjHPHhVjRt%2F6odoq3AP9BokJHGwBZJiE7iDV6jBoADfcJmt5%2FggzMxSb2RhMML%2FdK98JzC%2FuMuzpTnfl05QZWvhf1VhXkMc87o0Mka06NMos36MgAk5Ky3ZSGOk8vsGYZ5AujyiaN%2BosFqw0RJO%2F1OWgKIZD%2FJqxU7kf9xoVrUi6wE9JgCH1J5cv2mk%2BTggEx9PES%2Ftc5aAoieB4xSr7%2BO34EghnsBWsE5S%2F5pexloxxGKoZRQRUdV8B9tm8f%2BEsxbyiGNtbcSoKQyCdhpnKCmh2CmMFRADX70c6iwDwPFBOAzqLvF1TFkqxxk%2FwQikwqFj1crXsd4yTOMj4PnHksanzcMNESRSLMgTY%2BRLjsvcKSeOZeP9ptPV1dTiqQLwmHP%2Bpl8bGoSGr2FlbpbS3WYyBPnEQ%2FBfTAyjhlxkKdnB6OmyGE4R3usZuuy8gtH%2FV0s7lYEu%2Fczn0IBIB%2FzbYAAofaPCv15MXN%2FjgrKNIVLREnPiXfluS%2F5qXz0Z4OLS22As6zsdb9ifkr5URg4ft0BT0ioENgosLFtgzErjVrkzCMGzgulJqJahAuPbwzihBljr7%2FvwSUDu7bjqFVkVK1pG7Mgudb1Eotpvf%2F4loSryRK%2BSsNPmKurDAzz731okzzXuHbXvOdZzLKDCe%2FfDNBjqkAe00gExFxwYsn%2FURC92oXryvtTHz9HTw07wCEk1Nl2MsH1ZSDKIG0YZvJrUqw3ZusCGL5LSh%2FaT%2BoVrhRnNJn8bwwMk8Pjx2h%2Fm4aphNOArEMjXy%2Bhs8QI4e5AbgQ2SAjE9o2t3p%2B8AnsG%2FXLW54oDQT%2BUkQSyNqPBYvQtWwmiYB5GR65bcwLhzk3HfIr8MOZHbe6NBZ%2BYDjL4Rdmrhp%2FqCgAlGc&X-Amz-Signature=5cce66b277c28c4f0dd60663d07b8b289bf06fca247d06cf5cc65f0c9a8f70e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZG273VHZ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T193809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIDnVDcugrtuuGVJ4XhqaYmEbRQtFh3gwuQ%2BZkBYzI8SfAiAcNCyAwRoG%2BJU6066qCZb7YaMN8iM8C06RbPQpkZOBHCr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMI318ETtZvkJfich%2BKtwDhe09MF3REQ6Bzzlux3NXYfe1GPHReZGdiT3NDXRNHKiRkBmI%2Fc8%2BiI9B%2BrDQq0r3HTOHM%2FOloe65h7CIrPASMkEPRz2ZaFsf9pRlpDZDzyBpPamuHTxS7UBh0Blxkg9SipuxXqPq5Hww%2B78ooXDQpGBaOfcKfCmAlKJoJ4gwjHBxeNMwlkVO%2B87QCaf6r8S0NjAk51EuyVVWM7I6tTzFX0J3JDF3qLTtJGGGKIfwvJz0NjguTdMu9akYN0Fg08uTt9qMu9tmF8yWdVeUVvZlhJOyAsOvtIYOlcdQXML7wfexGxOJSCJhc%2FoUUZRercwX1CoycWk0NyStQzCYRxP5l%2BzTTrH1hg5m%2BeQhL2OiA%2FMIW0QcBei7G3JtB%2BttTRkxZF%2BvWOZvgQmtki8V1b4nTLwtOt4JQRRBIq0rRbMjlcbSt3FE4TeTcsEUJor7ZO2EMJEK0eVM5Tck1WpEXCy0K0XKdGj97IbPBynFY693faAHYNTCRPY8H5sPIliF8FiObBOYP1%2B4cp4Rhgb6oUCjkvYJ8xtTUJnvxAtVIsTmRmdgezVmL0M6qRpP4bczwW5Oy%2FrLB%2BDjRpYs86ooyubjN2QqMbTe7Yw9l%2BqQ1txsNFamJvz6Z0jcesTcXO8wt%2F3wzQY6pgFPEfZy5mR2m%2F6akgX4qk92KCGVhJ5llHwV7abB4%2F%2B%2B4mAKmGLr48iuntRhA5C5TaorcaKDVw%2BxsjKPYPrZ0FOKxXHm8Mj7ca4rHtMGFAA4FsoT%2Bmkz3Ob1tnFHrGzYD6LMTyfNDjdTdteSsQcOZb31fZgUPQENJ6eWgKzoJ51EA2MziDlRcU6jU5Cw2xG9k%2BSE7zhfGW5bapMjMxcC7VYrUh9BVSo%2F&X-Amz-Signature=b58cf6f650cb4d9c3de23ac90b542205b3d17c66e28d93cbf0c77a2ab852218d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

