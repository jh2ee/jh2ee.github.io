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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674SASWA7%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T030437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIDdstya%2FSCV3nNM3W2Ff5A9ebbickTD5nKgzF1OAbSpVAiAOOMjBr%2FYrLX2fgUClS8cRo4TMvGtf99D4SfS3ou9goyr%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMAJQd2u5WPwIYN08lKtwD1pX%2FM%2BOUFxW9tt52hOObQxSWLgK4DHio09UyGycYkUrVo5vWekzQ5SskZFfYVyuBWBY1apgrvkgXBqv4tYlErVqGRerLZd0rskCGwnnOuLrb8LUBHeBeyBg%2BeiMfSLTUGl4nhecOUX7r4I723yoQASAv1sXJeVrQFetK53Sjkih1sQq5TObiiQ0UYh5THR7S2Yz1X6kNpIvzPIJ%2B7eul5JQjXvnMQ3Aunrc%2FjtPE8bJuZT%2F7Pu2v0sVg0dXPy419uYGTVYxEKXRDaTQmS8KVnJ1lGtfBmrfob7Z4yVeTINT22VtX%2B0DSgRvYqYAxK3qUySO9K6f9LhgdfuxD4zzE3ohPjA8sutLL1ESrT1c2nI65UE9QsfZSua9EGHGLEfyHdPPUlif8OWZlSvXFPXXGJjxNW32ZStdMuep0RdhWoJkmTFb3Qf7ITkyaUXWTzQZHEtkB6m0WcB10qzWA1lsc%2BKr5QCh1Xdo9klQPLnjTw9ITIJf2kgcrYAVeqK5OG6bZnvaHl5n3kAia2YSq7Fvnhmi6WWTW3ELV7LYSI31cFeNgdIbkjr2%2B70E6FWtw7zwvolA2nhmig1CnFB9IOQn%2BTDEl7e8%2F%2FYRDdULc0iUQlJbGIvASvx%2BCB1%2Byp6swqPTVywY6pgF6cQSsnPBbRO0cm4sWhkN3rX5VshNshAaB2nFJSBtybXw6aPr2S3dqbNAZKKrZOd7DdA63r%2BAzh25F9Rot3YLT%2FQMnmGR2WkaGBzQMNrM7iW7SInIWOK%2Bie7CN00r5ARWwKmbt5e4vkTX8P9krDUvn8fiy0a3B%2BYg%2BctLplkHvceVA0cHfsiMjgJhVlmacOfN11V6TaU%2BW6xHvpWJeORGloHiJaeyV&X-Amz-Signature=8135f4ed6ba69a678cab730019284d26762e8f25397fce4d6f5b2f4b3ccb2081&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674SASWA7%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T030437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIDdstya%2FSCV3nNM3W2Ff5A9ebbickTD5nKgzF1OAbSpVAiAOOMjBr%2FYrLX2fgUClS8cRo4TMvGtf99D4SfS3ou9goyr%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMAJQd2u5WPwIYN08lKtwD1pX%2FM%2BOUFxW9tt52hOObQxSWLgK4DHio09UyGycYkUrVo5vWekzQ5SskZFfYVyuBWBY1apgrvkgXBqv4tYlErVqGRerLZd0rskCGwnnOuLrb8LUBHeBeyBg%2BeiMfSLTUGl4nhecOUX7r4I723yoQASAv1sXJeVrQFetK53Sjkih1sQq5TObiiQ0UYh5THR7S2Yz1X6kNpIvzPIJ%2B7eul5JQjXvnMQ3Aunrc%2FjtPE8bJuZT%2F7Pu2v0sVg0dXPy419uYGTVYxEKXRDaTQmS8KVnJ1lGtfBmrfob7Z4yVeTINT22VtX%2B0DSgRvYqYAxK3qUySO9K6f9LhgdfuxD4zzE3ohPjA8sutLL1ESrT1c2nI65UE9QsfZSua9EGHGLEfyHdPPUlif8OWZlSvXFPXXGJjxNW32ZStdMuep0RdhWoJkmTFb3Qf7ITkyaUXWTzQZHEtkB6m0WcB10qzWA1lsc%2BKr5QCh1Xdo9klQPLnjTw9ITIJf2kgcrYAVeqK5OG6bZnvaHl5n3kAia2YSq7Fvnhmi6WWTW3ELV7LYSI31cFeNgdIbkjr2%2B70E6FWtw7zwvolA2nhmig1CnFB9IOQn%2BTDEl7e8%2F%2FYRDdULc0iUQlJbGIvASvx%2BCB1%2Byp6swqPTVywY6pgF6cQSsnPBbRO0cm4sWhkN3rX5VshNshAaB2nFJSBtybXw6aPr2S3dqbNAZKKrZOd7DdA63r%2BAzh25F9Rot3YLT%2FQMnmGR2WkaGBzQMNrM7iW7SInIWOK%2Bie7CN00r5ARWwKmbt5e4vkTX8P9krDUvn8fiy0a3B%2BYg%2BctLplkHvceVA0cHfsiMjgJhVlmacOfN11V6TaU%2BW6xHvpWJeORGloHiJaeyV&X-Amz-Signature=8135f4ed6ba69a678cab730019284d26762e8f25397fce4d6f5b2f4b3ccb2081&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SEZ76XY%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T030438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIBYBm13FKJ0o7CrQpvtgCgv%2BmSxPKOvW9pJnr8of14ofAiEA6Nmj2BaCECQZHLLoft4QwE2pWpVxffP17JNafrsWZFAq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDG19D%2Fo%2FTgrw9H9a5CrcAzF4jvCocXCDcrXjRKRg%2BQazEjrAV6Cei80SoFO%2BlNw3h1ynijT9qLBareGe6ECXaSVb2m8wHTTwnJ5fFBWnZhKXygjDsNHwaJ92O1ccQjsrWYrF4M3qik61w%2FHg0tlqasFSDrHdJxUkZI6mDOnX2gYA0F%2FSNj3mJaoQ%2FQiLKthX4w1NRdkyiFKPS4XqEcWV%2FHLSk0E1GvOS9Bj2DIgFqKIRHIxt8JEnrY7Ja6ZF6BEEJOwDmJ1utjx2YFk%2BFIglKovcX1A32Af5p11DZFekD0EeRZoSz51vxBS0EAuZm95T%2FiC0DEjeLgwDWVSxXHdkLWptO7mGpCS0yy6yDxxMOf0HCQ3F0rrFre2AuL2nFpI9FEpPsiQsUZ3tCnsS%2B2fr0xLxaHpKjVmT5VMaXzUwEZ9Kls3o1wuK5NxVqFvHtvansYqEQotqe2YsQVD%2B12XysawYtF5%2BC8JRjdxgSFv2f1gl5gn2rWnD5CtVkw%2BKpA%2Fy2A2yV1hwK%2FhMnYxhl8xsQs%2BdoezBfrbHbFIpK9iMfLTQu2xvflT8lO2qlaDBwQWXTb19lm8LhGmKRuUFe59c380RcrrOLNH%2BgMMfZ0bhZPkgDr6kBw2q8klCyA%2Bjx6USPZgY8IdCM194Ae71MNHz1csGOqUBciKJ8KeP05AEn2rWIVt4wd9KPuVPi8fu0b71TNiAGEK7WwgzBF3OYNp7eacLH%2FnYz%2F13%2FaHElr%2BPSfSPHT8j1rTGsMpSEiRhwrGWXJbgth70nTUm8Zzay0G%2FOVvfb8%2BLBP3Ti40v%2Bo3VwPHrhHpLh2ewPrSNZehQDMPVv9%2FLrhvx2wahF0Nj7XXcoG1xBFQnSAPjKonO9VaOXUDaqbr2NUyFucrv&X-Amz-Signature=98dbf2bc9d7d3b37b8a1a1387b748cd5299af9956e25445f823d65cbe89fc48f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZA6OQGL2%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T030439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIQDAFaHtU5cx3vVarvoYLj5GKYpqlFYsKkjiY9n6fqQgMQIgPnqihPf3vDnS7pYg8EYt8xUrhlFjozhTWFqHft1MuX4q%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDNJ75oyc2Z41QeJ4WSrcAxZUVW2Z4EDUkFqq4dRyOCH%2FXoo6GWRkRcVzVw6J6fHGTa7sLa44KYQXC6Wa%2BLkG7c51Nq65cQwMWBQzrUV3G5j8O50eFk9xsbpdv%2BXbiSvq3enFhJGLuLRlIwky4Ugc1TDaQSMY77MKDvAxpu4zjTpYiSsbUhHdAYMT5aXk%2BJjRQwJZhVnc6TdlgynyQWGKLLz2mGUyVNqUerY4vkWbsT59H5M4t9M1Qn9WDlDBRo0sbcwf6CDxAlTCBPEal%2BrbroShXJpQwNN3RlTaJi0meJvhCGKuPGipanDqmsddqmXNwV7FYSih%2BDlQB6DVYFChZS4Ptou99J4%2FSwX92r91fmJ3DK%2FL2q7mx%2FeMk%2FoPFjKxvDNPi%2FrOy8bbP2Z7jwB0wMeSrh6iFpVDdoSnhCrMA8CcD50BFSPOWYCfX4gb2wF%2BMuL%2FQCdpF5OfvteAHNemIgswjd%2BSTAhv7PbMEXBcZnMKGtNSN%2B2DNbGIE1OoSd5ipraIYrFL4lZhHy2oCp93gMFGq6HRhVH6K%2FO2qhMG%2BvC8qnMqADUsuNA2lBcXaa9L9PRhibDtwjxwEdKBMw7vxZ5QngzAxXUBSfq%2F%2BPPpqrnNNKHB0gDtkP619HoDzc9vJ5vvr7MGPQw%2BXWC6MNb01csGOqUB8%2F3LPwlnB%2BnbMLwYBM%2F9vTEW%2BWrW0H8Uf8GY%2BmygEjzN7JFC7HgNZAE7G2w%2BJWs%2B5gj%2B8yNzUwOIQl6AMtva5L%2B6qCfVn1bNET%2BSz5VX%2BKZe6LxX0aRvgnXTwLSFmkIY2kPDst1B9k6GES%2BGRITDJ%2F5%2FCzhbQOpn8grbV7ayEKCC7rY7T9aQPG3fMuWgE0huGeGk6n6y0h5uzQ%2B8hF5mVyoj3X0L&X-Amz-Signature=158d64ab77dc6a9f1530f39b80a84280d4405b6e9baaef38a046e368b4b93eb0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZA6OQGL2%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T030439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIQDAFaHtU5cx3vVarvoYLj5GKYpqlFYsKkjiY9n6fqQgMQIgPnqihPf3vDnS7pYg8EYt8xUrhlFjozhTWFqHft1MuX4q%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDNJ75oyc2Z41QeJ4WSrcAxZUVW2Z4EDUkFqq4dRyOCH%2FXoo6GWRkRcVzVw6J6fHGTa7sLa44KYQXC6Wa%2BLkG7c51Nq65cQwMWBQzrUV3G5j8O50eFk9xsbpdv%2BXbiSvq3enFhJGLuLRlIwky4Ugc1TDaQSMY77MKDvAxpu4zjTpYiSsbUhHdAYMT5aXk%2BJjRQwJZhVnc6TdlgynyQWGKLLz2mGUyVNqUerY4vkWbsT59H5M4t9M1Qn9WDlDBRo0sbcwf6CDxAlTCBPEal%2BrbroShXJpQwNN3RlTaJi0meJvhCGKuPGipanDqmsddqmXNwV7FYSih%2BDlQB6DVYFChZS4Ptou99J4%2FSwX92r91fmJ3DK%2FL2q7mx%2FeMk%2FoPFjKxvDNPi%2FrOy8bbP2Z7jwB0wMeSrh6iFpVDdoSnhCrMA8CcD50BFSPOWYCfX4gb2wF%2BMuL%2FQCdpF5OfvteAHNemIgswjd%2BSTAhv7PbMEXBcZnMKGtNSN%2B2DNbGIE1OoSd5ipraIYrFL4lZhHy2oCp93gMFGq6HRhVH6K%2FO2qhMG%2BvC8qnMqADUsuNA2lBcXaa9L9PRhibDtwjxwEdKBMw7vxZ5QngzAxXUBSfq%2F%2BPPpqrnNNKHB0gDtkP619HoDzc9vJ5vvr7MGPQw%2BXWC6MNb01csGOqUB8%2F3LPwlnB%2BnbMLwYBM%2F9vTEW%2BWrW0H8Uf8GY%2BmygEjzN7JFC7HgNZAE7G2w%2BJWs%2B5gj%2B8yNzUwOIQl6AMtva5L%2B6qCfVn1bNET%2BSz5VX%2BKZe6LxX0aRvgnXTwLSFmkIY2kPDst1B9k6GES%2BGRITDJ%2F5%2FCzhbQOpn8grbV7ayEKCC7rY7T9aQPG3fMuWgE0huGeGk6n6y0h5uzQ%2B8hF5mVyoj3X0L&X-Amz-Signature=6e78bd26034aad2491eca6477b7f7ee703630d8b11378df281692ef6516747d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BW5EOE3%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T030439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIFc8wK7U7tpYboig35d9AQABiQFDoktbAZ8Ode0EuSzEAiEAmUsjLglQhwQKRI5kXaWIz4trx8BFkaiDE6SdgSgkp5Aq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDCOIKECuSvWUzdWGZyrcAyJs3pWF%2FJNwnKxuTgSOHtlD7KqcjDg8JxSFguU%2BsgRcebcdfIAoicyLma%2FokMUqvPaO%2FncgMKKh8hrhRNAMrFSbsYeEvVXuCHdOHNkCJA%2BMxwWdwsIQ%2FwDUYyK1ibds3mt9TqvSTERUHeBqI%2Fyy50sgtoG3wYVUc%2BSlAaaOZOL87WThDYn4UMoRQRynGL0Qulm5KcIvC1zD0BbseSl327q%2BKNg8cg%2BB1BS3IrC1y%2F9RojXQKQlTlXQ5FHd4toMc%2BRK1qxyvvw0h8l5ZrKhsfuQKmoAxIc2qK44702p9gO01hzJgraTsmAQt%2BkZnKSVKP34aTswb1%2FRvWJ%2BqhlcjJrrnFlO4Q3G54lwupoHmWCX%2BEBoorsqrkw23nurDn0b89J%2B0guZI26C5%2BYhcFD6o55jN4cayDN%2F3%2BVDhRVN%2FfJf2Gt7XjqhduXesPApx9SDMwty0cFnpWxS9qxZUx487gddI07SDXH%2BFzrIaSNd%2FpHzq5CCgfi3M08z%2B8U%2F1%2BusoHnw9KgoYcs3ljkL6MFD1WgPZncp5MSfkdCBjvkEX9yzKtiBXH2VomVoDWyg5%2Fmjk7gxQ258dp766J5R7v8VyI%2BvlbmoYAjsGxaryueG6aWM2wbRezDajd2%2FT3WsZMNnz1csGOqUBUzvRj3Sl711Ctq2ulM6oQuJdr6p88%2FCG0pjhsYlvQCMbj%2FORCIJ%2BySdb9MLdSQYkQlesA9nZG%2BLBRGZAkyDFnClgfxJrIVtnRJs%2BLckt7fPEroYEKg3sKZwQuXJgnE8kyXLlWiUpylZf8nWMek1rPlVxsUWd4E%2BOB1rxpt90VEgsdMCd3r2b6wPywR74buLIVfjXuuCLjd7wA1B8MUP2Lj4RCIyU&X-Amz-Signature=440f5d58c9b2a41ff883a1672f9e740df10c96f890c799893dfff801ef4fd696&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7RALBOA%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T030440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIEpBABXuC0pC%2BeD3IyrUsXtTDzP8Bi7DcIBgiCPK7hiHAiBbseiSSqFwKsU2DK%2BbsTH1xephillD4vayUxagimqscSr%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMASs2PfZDeTB7%2Brq1KtwD%2F01wrfUYhDGTwDLRSXuhTMTSPj%2FUzAzW7EDZigfVD459N3vrdN7H5L9nDW9zE%2FAuB9LVoH70Vv%2B2MeuY07uogbUu2vZFP7SwC13JLphlNwVEVioK80V0piFrMOcHTh82niQB30MHZqO1xKoCbzrIRrhMS1EsVBzuiAJwoVbQs6tC7efHypxAtvSjMG2zZM15Ivbz0%2F4ruqVRuesakYCToSPOMSjst%2FL9BSgmkKvuyXoHe7eefOrTuIhdnWCGIVYm6WAvmJEcEB1PiEOvmI9PbDVZ3yZQ0UiZ3PA56pBrt9QLaw2XnpG3%2BazFHpTzWDOpZSkwV1rDTQYmRjwIjBGCMP3QRJpah1ukOcrqNB%2FZ%2BOXAPYy1j274x0fXf2iFLd3Q0WyuMMuSkUH32SUr0UIHyLzxQnoPNvKmJxjlmIOQxo7VZKHsvpTkV8ZHAgDVtV92VpapCfq76HrtQx5fe%2FXVTsbT885w5QCut7P80dz5w5FXpkKpcQ%2FzWkG99dxHY7SuUtinWB%2BJwNFZtmPOr3BVa%2FzXn%2F%2BQFRrN%2BgrSM8Xs9%2FEyHjl5GkyciTHsm%2FXHhQZ8dOeuI%2F5TxUxhd1xk6NXRGFGS2Q4XPGNnUz92bcb5EiiIYuj5shVVe44Dmv0wyvPVywY6pgEitFBAQ%2BmQkVQlBvXdV6ogHYVVDvNOojOt5XJV0%2BdvxILHD%2F65oqAoH052W7B8KYqzTjM%2FuKVewGfQ3vhtxTtRzPqhElrxfR7sV2ro7MeiRh1lTMaVuKrLT2UM4ZcLSjX%2BXBEX3Ndg7lvinUrTaiT%2B43Snho%2FnalqY9OLKCISrB1KKX%2BthSRhEEIgl3K4kEeO%2F%2BKB9DcGouZEE%2FBoo3XgtrlzvedLe&X-Amz-Signature=1d327827a6c54dfb08ab495dad4dd593ee4498af603f7c85ee8041212c9b334d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZCYZRKZ%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T030446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIGZr4Weq8tlcjKg%2BCemhfhBL%2BEJ6j4DyryiUqhg3MRdOAiBYGLltvRL4nvlIaBKXi6SPJe%2Bvn%2FEqeoUDrRvXHHbMvCr%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMW7E7NVOLPoj7Uns7KtwD37CiomGv%2BS2uvKwwV%2FWtn22vV0JC7cKDEyJ6F6BsKqkbtC5R5rLZ9XWLt3NLUGTJD6XHbNpbPiykkFX9GPOG2bFZ%2FnHuZsyl8xmuPTIK1h8%2FsIRTj%2F1QK%2Fj%2B5aH0JwEDMJAcc8L%2FYFhN1zgqdh3hFqx9tBy%2F61lg0D1DyCPyl8SDafmLG5R0JE6gS%2FrrB%2BCLZgrqVGkQEB44GohjQfG0rglakgtjEOLekjgRj16nNBYaCebVTswEdrwCUsyZZE296TbXGLFHorFbtGjr7h5cDNdomyJfPwsvzdUK0Dey%2BrOyCrf6iqZ6i9B30GDY%2FXKeVaeXvmpWAna0LGigYPdcx24zpNjDTSXehAf0GSCL78fgFItvWPLNi0%2B3ldb2i4szJh%2BQhBDsgeM5CUV50qGfP%2BmergF2lPhfNglkW6VSRsXEX%2FLqjh%2BJEJinIQtR274yoJ%2Fg3HSmDjesvukszk5C8OF0mi7yfG3VmPAcY46a4zpeQFK%2Fljl838nJKqT0%2BlpzcyKelEhg0I0utAa%2BlU2cu%2FB9BvGeeFfmV22iLAnPQuS4QpLxe44DOwZmYBnQGu94aCyRR9cgk49J5j52aZ4JegF6tOMNqpR%2FZ2WakKOScht4nlFyJ4983DBnHDUw6vTVywY6pgEkZVOeWqzmWiqVP%2F4e7iGlx%2FB62PEoyEo6xZvW%2F11OLkcaqA%2BHhTfW5Yi20msAeQQMznQrurSoYco1DSPUmNy4LO3mu3ppdMJgSmFf1OL2xUFW%2F6%2Fby906iNwJeA5tR%2B%2F%2Bd0czqYhwqSDUOceNbksWOTIeCBOEUmAXoMTlKk%2BLqp%2BUCPLvS5B30UwQOjdjb1mx2SJyoINFxFfe%2FmvEXaB166HFWm%2F9&X-Amz-Signature=fc52eb59527d330e3ea093536874a6527334cdf0f3babee04bcd85727e1bcfaa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBTFBXAS%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T030447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIH%2FxYcSGw0W89DQvJQExY6MrGhBXst73EBPBbNJCbykhAiBWtWEqiHAmkq%2FDqb8OddV37ojvmfOHJTct3AKnYKdVfSr%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMaVOwStHPqBbrRTo1KtwD3tXsEnRDv7ONTGHGhlYNGvSDtf2o7RL0NQVZUh1%2BYMxUfB4TkmFpZf78xFgCotBaIIxDPTGlGRnor88rRjtZstO%2BKlD%2BYhJdMtFuh1PqZAV%2BiuRxf6l8I8G8FFsqlyEN%2F6JfTDnTv73HOT9%2F41jM%2BBRWK%2BxW561Vbh66PymrH6qyRLam5%2FEWsbq1ui7i8B8hDXGXD%2B0QEFgnZ7Jh3NXyTWERxENjVwPiNroyjMyXkR0cC62aqWXLCgd8ElRVXwQENBFp1%2B8Eyzyjy5rr5%2BYCjF7r7C35%2FrQd3axntiisOgSqvlPu8xfvnMCbalj7el0p7xhRsOw7lIQy3DKaK%2BHxslWqchWsItiPa6GUgdKcY%2BcnC6Xn%2FXaCokwScdTn8AZtJiPeC2fDUKDO%2B8a3vOKsRp256jNUYS60tI3V3ZzA813xS1pzB6p9WMx4NQs4%2Ba12IjzZUSBIGaARZSIXU3LAZKRf9nmqb6rY%2B%2FOUnBiQu2BHJoeWUGvVESsHP1BHoeCPcg2%2BexXhA6CafSNDLACDLL5KkJn4mEjn%2BkBeynZPkzPmRBkHQ77VIx2jxJNQ5h3rOYNKfFGenu6U0IycFC2cX4s3%2FPBliBNSLWfYxXyicURM9DUTUD7p%2BYA43v8wufTVywY6pgG2pd%2FR2mS%2Flq3RLO%2FAJYGYPuJTE8gTNz1kn%2FjB6FWm6clgOgIfce%2FDFUKvVs7y34Ek2nqYcyKU0oPfytGrAEhSXPf7p%2BUYeppQDMPJ%2FZGVPc%2F%2F2KSsWYzwy49KldSYRX0RiySBm32nyJ1EOCA9DEQzaB0USJNkKTCLP%2FwV7rRCEq4JakqOOjU75UVYMfxd2KJ5Z%2B4OK%2FM5YDKHI9w3ltLIWCfb%2FCdR&X-Amz-Signature=767fd54e82a4f6f950685591fc4c42ef941fd82de82fe2d05051fc7f4801a7ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBTFBXAS%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T030447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIH%2FxYcSGw0W89DQvJQExY6MrGhBXst73EBPBbNJCbykhAiBWtWEqiHAmkq%2FDqb8OddV37ojvmfOHJTct3AKnYKdVfSr%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMaVOwStHPqBbrRTo1KtwD3tXsEnRDv7ONTGHGhlYNGvSDtf2o7RL0NQVZUh1%2BYMxUfB4TkmFpZf78xFgCotBaIIxDPTGlGRnor88rRjtZstO%2BKlD%2BYhJdMtFuh1PqZAV%2BiuRxf6l8I8G8FFsqlyEN%2F6JfTDnTv73HOT9%2F41jM%2BBRWK%2BxW561Vbh66PymrH6qyRLam5%2FEWsbq1ui7i8B8hDXGXD%2B0QEFgnZ7Jh3NXyTWERxENjVwPiNroyjMyXkR0cC62aqWXLCgd8ElRVXwQENBFp1%2B8Eyzyjy5rr5%2BYCjF7r7C35%2FrQd3axntiisOgSqvlPu8xfvnMCbalj7el0p7xhRsOw7lIQy3DKaK%2BHxslWqchWsItiPa6GUgdKcY%2BcnC6Xn%2FXaCokwScdTn8AZtJiPeC2fDUKDO%2B8a3vOKsRp256jNUYS60tI3V3ZzA813xS1pzB6p9WMx4NQs4%2Ba12IjzZUSBIGaARZSIXU3LAZKRf9nmqb6rY%2B%2FOUnBiQu2BHJoeWUGvVESsHP1BHoeCPcg2%2BexXhA6CafSNDLACDLL5KkJn4mEjn%2BkBeynZPkzPmRBkHQ77VIx2jxJNQ5h3rOYNKfFGenu6U0IycFC2cX4s3%2FPBliBNSLWfYxXyicURM9DUTUD7p%2BYA43v8wufTVywY6pgG2pd%2FR2mS%2Flq3RLO%2FAJYGYPuJTE8gTNz1kn%2FjB6FWm6clgOgIfce%2FDFUKvVs7y34Ek2nqYcyKU0oPfytGrAEhSXPf7p%2BUYeppQDMPJ%2FZGVPc%2F%2F2KSsWYzwy49KldSYRX0RiySBm32nyJ1EOCA9DEQzaB0USJNkKTCLP%2FwV7rRCEq4JakqOOjU75UVYMfxd2KJ5Z%2B4OK%2FM5YDKHI9w3ltLIWCfb%2FCdR&X-Amz-Signature=ea56d6acddb7f4874a4673b7808e34f3de27aae73e27f77e6781de2d53de1110&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663POFKVC7%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T030433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIChIRxcog%2BTCKTCMKmXEee1fmnNNm9hIMkDjl%2BezjNbKAiEA7LAUZ29iiZ2L%2BDpdT602fmzgHpzL92pDwy%2BWDkMHbfsq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDHT9mHFtZJp1ag64YyrcA3NNlcvF43t1pzhuxU3mWGmkVS6qkdEiceeF9RcKHyn%2FV9ix23rG%2BdUnuIkckrLFl0QnHPPlggsMQ%2FpDPKWyW8XXrC3iU0AuILiYxiq5cN58LGQg15J8rctI26411QpUkO5ll%2FSmyJuZ6DkQzpbMtQEH5BHAqF14d%2F4q6O3a2nGmr9W4SAbXrNtDckUjZDEGCJTO0NrikewE%2B%2B1RC0VcIz0jg%2FZlc2xgeOwn51W7NqiTDZ4buAJYbB1U3aXuee9EM1kSH7IYf2oYYfi9cz5pD8J7xbpEejVh6rK42VcOCOmw8%2F8Cu8zX6rq5P3GQrYkWVzKFw7ZtZTwMfPweDY1sRKBgSApdowaJFFBnGX4mmkiuRPB0jR1O%2BkmfS%2BSlOdv6IEqq7r%2F8tUjtC8kr44inQRAZ0x4sR5UYhTm0l5GJNYqCSuQZ1lqeWsCvFSvACqtkW8Ah0%2F6COSwH%2BN%2F2eaPLJN3tNt70wRrYYjnJokPJOiRrUrgxrOiUWAAVyMPrtU%2Bj6McpcfxPQLEwD%2FkuvxU7Gyiiph1z4%2FxjHdrbH1oVI5i1ORRjAi0dT2HbXfT1gPSHi0XFwo%2BH4XReajBqVa7o8LaKnMgpMEQG7kfa1uc8PH7KXz3kKRuCn5libxDaMJv01csGOqUBQQv7sMPJLUfnft398xsAchktGi6Q%2BHpJwIurGIh82fFzLiLXT8sd2IM2nvQKyoWdNtVC%2FXUqA1XwHEh0KK3lUmEBnHW9yfS4L0AyUWBZ1tPFcxEAmzA5phZ32X5CS98AYRHZjxL5ehUth1vS1X0xEBrhqifAnaK8cso4LalXPfPc10fEvhbr76vbHH99DGRAe0znwR4IQMRT2RPqgxLpFbhWqRkd&X-Amz-Signature=4c9b03d2eb8b3e957d6990da4939efe01de4b2dc1a3426c1c0bd22ab9d7e943c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q45XTNLN%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T030448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJIMEYCIQDSzRwOVCom7NiKEZN8ZswjfiqNmQvM8j7Wb7S7E%2Fu2vQIhALlSkX3jxYrcit2ArhX%2BKaca%2Feq18NrR4QX6CthZfJosKv8DCBsQABoMNjM3NDIzMTgzODA1Igz9NssxxwHZ3k5Olhwq3AMEcPFoJQTEA2HKAwVaGaPkaewLVD8tHTQYNiXnPpemMlundpNjQOQrBBJyD7Hmu2KtbBd42bofj9o%2FqjFvKQjkuzMVU91ex8wxkzM59loiK5eOi%2BFG7lCiOB3085IzuXYijEgYFzzJ54%2BZQn1OpRO7CcSegxxe7lA3IzYrCDVtmLoUV1xfZ0mFO7dDeiuSZsAkMMrKEOWoqcbMKJhOtqJqcitzJaNtSzo5hVLZEzELWL%2BCvXzC4EAcISNHWaSeX6xE5iQXydLWRZsf5phQLWgptCcJJH%2FKgTk8RxO00qhZAchK6b6bwCVoA7jnkhhhC5M36HMyGQm0h9YaVBtnXiI390k79GJYZV%2BQwlyI1eggK0aGLSYiwr%2ByTupJlkrBTQoLP5J5yFYgCaSL3fBNNVH7PdtjEU%2Bzjr0DsMKGwMutqWcZDOEkJRTWWhjcdvjGl5Y%2F3ObhykUcv5ClTy%2Foxpb1nJzwCHwb3%2BLXik31iXOErywgQlhJSpHDSmydzDxrI%2BXkNQqBs2FszspFs452Z2VIF%2B1f2nVJQKlYjkzRNyb9Mb3jDUtuKHC5Iu9xWs0dffz%2BYdK3Gz34U3R1tzCiwjPCL%2Fhp9ftryc7WPZwtN2Cs463RLS9ooGoLz%2Bt9gTCo9NXLBjqkAXHkf9Q%2BXOv1g9fWwcfblVCaIa3B%2FV6CfXvjSkO003DybxOqlVierTKDl58zVFxMjM3Gee%2BV5G4IDYK5NQXtXCErT563pQZvH3hTJVx4%2B1nkpyCfHiarWc6XwbWV%2F1yRvKC8oD%2F6%2F8WrnAgQ9lHTh7pO1baBbR%2BAza3OBxIqQL4S6%2B%2ByVFkShAy7edJSbhj61oMZxoNks8XkmiKO%2Fs%2FoixchChnV&X-Amz-Signature=1b7969a54b6720acaa08dfec3d5b08b84be63effdb95aae3b286c417724179ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q45XTNLN%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T030448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJIMEYCIQDSzRwOVCom7NiKEZN8ZswjfiqNmQvM8j7Wb7S7E%2Fu2vQIhALlSkX3jxYrcit2ArhX%2BKaca%2Feq18NrR4QX6CthZfJosKv8DCBsQABoMNjM3NDIzMTgzODA1Igz9NssxxwHZ3k5Olhwq3AMEcPFoJQTEA2HKAwVaGaPkaewLVD8tHTQYNiXnPpemMlundpNjQOQrBBJyD7Hmu2KtbBd42bofj9o%2FqjFvKQjkuzMVU91ex8wxkzM59loiK5eOi%2BFG7lCiOB3085IzuXYijEgYFzzJ54%2BZQn1OpRO7CcSegxxe7lA3IzYrCDVtmLoUV1xfZ0mFO7dDeiuSZsAkMMrKEOWoqcbMKJhOtqJqcitzJaNtSzo5hVLZEzELWL%2BCvXzC4EAcISNHWaSeX6xE5iQXydLWRZsf5phQLWgptCcJJH%2FKgTk8RxO00qhZAchK6b6bwCVoA7jnkhhhC5M36HMyGQm0h9YaVBtnXiI390k79GJYZV%2BQwlyI1eggK0aGLSYiwr%2ByTupJlkrBTQoLP5J5yFYgCaSL3fBNNVH7PdtjEU%2Bzjr0DsMKGwMutqWcZDOEkJRTWWhjcdvjGl5Y%2F3ObhykUcv5ClTy%2Foxpb1nJzwCHwb3%2BLXik31iXOErywgQlhJSpHDSmydzDxrI%2BXkNQqBs2FszspFs452Z2VIF%2B1f2nVJQKlYjkzRNyb9Mb3jDUtuKHC5Iu9xWs0dffz%2BYdK3Gz34U3R1tzCiwjPCL%2Fhp9ftryc7WPZwtN2Cs463RLS9ooGoLz%2Bt9gTCo9NXLBjqkAXHkf9Q%2BXOv1g9fWwcfblVCaIa3B%2FV6CfXvjSkO003DybxOqlVierTKDl58zVFxMjM3Gee%2BV5G4IDYK5NQXtXCErT563pQZvH3hTJVx4%2B1nkpyCfHiarWc6XwbWV%2F1yRvKC8oD%2F6%2F8WrnAgQ9lHTh7pO1baBbR%2BAza3OBxIqQL4S6%2B%2ByVFkShAy7edJSbhj61oMZxoNks8XkmiKO%2Fs%2FoixchChnV&X-Amz-Signature=1b7969a54b6720acaa08dfec3d5b08b84be63effdb95aae3b286c417724179ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5CXFDNM%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T030448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIEMPoTb5LwgD%2BZxBixJqwiBEheb4ycIpO2ymy5uAM0EQAiB8WYXBswYiATTay3h%2Bb1h1apqufOV5HiZO8pVSPrD5Pyr%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMJO7vm0%2FNRrr9JGHEKtwDVi3tc%2F3ufY9CzTfc08zGfacfaYgAWLGtW6xH%2BrGXmKB4rMEGaPwdnMrejjkbV%2B4qzU7LgZWygjKrJs%2FDV0RPcFkjvx11SOSErZ90nYF5HduFTjP06oiBxn6Mszwdx4li74tdn8RE8RX5WNM3bf%2B8EUXYuINFgpU4ofvZjdIlQZzlzLNW8GkDjMmJQGeKyTlmjpCKam6uDuyjfwOOiIX3CSjoVmdwow00EzPHjjJt23IpPbbMc%2BcHPXfoLDQlGuHFVq7cXf8rUDfwayJGWGH0d2kzPGO%2BxbsMZLe2rgJ%2FtxXL1CH0OLDgINBfbd6Oh1LdNd16c6N%2BsPwKOtFdm%2B70OfjSz2rWjWc%2BpfkMS4cE4oajsujcjadikP5i9Lkq%2FhSuYPGay1zHLR4obxSMOQ2xd%2BFtm8%2B%2BBL21uXgFsjhmIt%2FTKPMeyfnmfjFUOoUFDZLLzf0Ael3RjXAd8zwPqpNu7tgtsslw%2BNBJ6af%2BXc2RiRqQ77jEKzdbOU5lHX01Ej2R56I4v17tUp334QjuFLB8wtG2K0BJz7P0TI0drMWprb80H8kfFcLjsSm0SkIhwRHQyZMimqhl6O32IK%2B2NY1svqHlJBIE50BM40KtBjbyHLitjT9JrRRwOQCPSR8wt%2FTVywY6pgGyxGRPB%2FOvtuOnv%2BPXCXEsQewaJu8aOUzXmQdQt3WdWAsmKMcJx%2BRFJ3kbwPPujQl%2FeB8QSQQf1LyMcep5oIqzmI4j1j%2F%2BL1%2FkvOMGovkvO4ODQpViH4HjnkDhQZKtH5BMONaMwXh04DK3Us1iskw6%2BZeEY2pLM74cxB4y0EcSx2wtEzviuPLd1qi0PAFy2nCmkTELJ2fFckcOUdd9aw4xJ3iBEQLY&X-Amz-Signature=962e32f0e7a216912e9a45c425bac13a2273645c6a5d67281905eaf68777e209&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

