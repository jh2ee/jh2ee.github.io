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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQSDH4PQ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T163902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIE5ak5b9bruLcoW%2BQMFL3KL%2Fd4MU5ONLgZNwZy9%2BUplxAiEAqHKNGyY5BDGnE65%2Bh3ZzEpzsj8syqRUKfeEh5%2Fd8AzMqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLj8WfAjodQ0%2FHrLpircAwEdz%2BYuNPOSIDp6dQ3sjYLmdQfhUQERo6L%2B0Sjl0ElS%2BIaQHbnp4svLGY3BWpuptoAZZHdUCu9R4styr6itu3xDaD1Uix8ao8Jzm6PvQF5Wj516pOpMx%2FJ6XUfy%2Fu%2FdLzFchQ8Td8hh0ZnjPgVDBBp2xZ%2BxDgGfk5%2FDV52sXEUF%2Bt5EgQXJ9tjJJP%2FUTsbWaBE8Zr5qJ0a6ZPYxQ15onTWXBWxUw613vzrUvP%2BovcZZWQGxjS7USL%2BDvpg%2FMjQ6zfYpGqIXkTGHABXnjSYpM6lj0RB%2Fyt%2FuAKhYSC2zkddAgaE5uHKz9RCa1jS8rhGsDO%2B5s7o5kq4qadrB%2B1T4L5A4frftRPI%2BR5AaAsysjdPNPlHhD6WlsfHtiNZquuTUtouDhfk13JOeMwFj0ljjilE9GxSTpzQ9nyI2xU2NDLw7RWylq4AP48DwribUczvAYivsfPJ7bCsTGSXR5BWPTadUcEzPxqfkGxVAICFnC%2FK0IHBwTiyIXa%2BrMpxA57Jz4p3R5ldVkd516sI7DbVCyqecRxLVikSH5mb5S4rUcFCKyViqtsfTVnnDyEA%2Fa0bEQF07V4Z1J3XFap5jVMOHU%2FwOpEOe1qE5dzOikIz%2BIC%2BlTmmbYNnLwOYDmuD1MLjhms4GOqUB3RtjptrfUz0ChjBLX3zjV4zLMRLnLLLzAWtcg4USc57Tf7KFY0y4%2BFIjuGlfJEbxK4%2BfQhMOzBQY4I7UEwHUu7z9ZFcui7thmO1jCx%2Bk7uD%2F1GybJT1KzvSd5tEJlOMXsfwR5gy5TzXAU1%2Fzfu7%2Fs%2F5M6L9Qiv%2BTw6laE7lSoS5EGTTYWDwilzemX5FHSYFsXwm7L52mrkcYaBW8oY4yCdpe4z5t&X-Amz-Signature=d6ccdfb3c11916ee727390891084991faeb738e033b3904ba306faeee7828637&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQSDH4PQ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T163902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIE5ak5b9bruLcoW%2BQMFL3KL%2Fd4MU5ONLgZNwZy9%2BUplxAiEAqHKNGyY5BDGnE65%2Bh3ZzEpzsj8syqRUKfeEh5%2Fd8AzMqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLj8WfAjodQ0%2FHrLpircAwEdz%2BYuNPOSIDp6dQ3sjYLmdQfhUQERo6L%2B0Sjl0ElS%2BIaQHbnp4svLGY3BWpuptoAZZHdUCu9R4styr6itu3xDaD1Uix8ao8Jzm6PvQF5Wj516pOpMx%2FJ6XUfy%2Fu%2FdLzFchQ8Td8hh0ZnjPgVDBBp2xZ%2BxDgGfk5%2FDV52sXEUF%2Bt5EgQXJ9tjJJP%2FUTsbWaBE8Zr5qJ0a6ZPYxQ15onTWXBWxUw613vzrUvP%2BovcZZWQGxjS7USL%2BDvpg%2FMjQ6zfYpGqIXkTGHABXnjSYpM6lj0RB%2Fyt%2FuAKhYSC2zkddAgaE5uHKz9RCa1jS8rhGsDO%2B5s7o5kq4qadrB%2B1T4L5A4frftRPI%2BR5AaAsysjdPNPlHhD6WlsfHtiNZquuTUtouDhfk13JOeMwFj0ljjilE9GxSTpzQ9nyI2xU2NDLw7RWylq4AP48DwribUczvAYivsfPJ7bCsTGSXR5BWPTadUcEzPxqfkGxVAICFnC%2FK0IHBwTiyIXa%2BrMpxA57Jz4p3R5ldVkd516sI7DbVCyqecRxLVikSH5mb5S4rUcFCKyViqtsfTVnnDyEA%2Fa0bEQF07V4Z1J3XFap5jVMOHU%2FwOpEOe1qE5dzOikIz%2BIC%2BlTmmbYNnLwOYDmuD1MLjhms4GOqUB3RtjptrfUz0ChjBLX3zjV4zLMRLnLLLzAWtcg4USc57Tf7KFY0y4%2BFIjuGlfJEbxK4%2BfQhMOzBQY4I7UEwHUu7z9ZFcui7thmO1jCx%2Bk7uD%2F1GybJT1KzvSd5tEJlOMXsfwR5gy5TzXAU1%2Fzfu7%2Fs%2F5M6L9Qiv%2BTw6laE7lSoS5EGTTYWDwilzemX5FHSYFsXwm7L52mrkcYaBW8oY4yCdpe4z5t&X-Amz-Signature=d6ccdfb3c11916ee727390891084991faeb738e033b3904ba306faeee7828637&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USFMXWZO%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T163903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQD6lz3LfO8Tbze0ZpXE4a8J2tA69VcvuCAF9wG7KWLTFgIhAOsF0gdlv6lrXkpai8imXWDapNDJI84bXuj0b%2BImNxieKogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzjOZeIz8lAe1EJDa4q3APsPs6yrvIUq8gyhwPoUv59M29p3yral9P1GsJSsi5O0H6x%2BhK4Xbc1VmlfDgF0drxdVWMAIxk1VxwoJYeLH0Ckaq%2Fw2kJLNDw0kpSjfEV6aSgKCT9tSVgIODNdWMehWu4cdODJvSAGDgKWnMeZ%2Bo%2FE3dkSxNS9P3KELWZVCE4452sdiDroXImzhNPEUKNWFS9%2FCexsJ4CaH2T3Ps0I%2F2mP%2FAGHImUojs%2FNFgfZY0MMBFvWn0hXS8mWWn7MWAYcZxf7cjqfR8n2RIKgRAnEbhUlgMJZdc%2FxjVYcXfsedgPJDfuftXOJzhadDF2cKmOCkkna8VdcTfcvTK7x2t%2B6lksNnB%2BBdbp68FrhVYc97nfpd%2BtOrui6pyNyYuaapNdbrR6i6ajnjMA9nPAX5hCemdxpI%2Bw%2BkDAlBtzU36vm3Ze15ldiePNYjg2nnsZaG5RACgOFI5%2BXxHrcVtcr5UO%2FuQDueEPZc%2BL3mOZhDMZtP0o94I5QfISua4V00FFm5wO6LeDmNp0HKGBRJsLeyjFz98786TGkJrEH8Ywgtx1T%2Fl9rD84hjSNUloFAfcnhvlZ8SQ3eRZ3jcB9jPoUNT2C5Lh3x2cX%2FXRaW614jsOtnbWdT50kK9%2FCi88GFSPdolTDO4ZrOBjqkAcDijX0WV7xTftwQK%2BHAbFL80FCuEfWHxrbSrLujYdHFMuDHEECTLZu3mYZesJwEc4buZrEcuwBGqab80gC3QK8oen%2BAtDlWSbfn1u86WN0qWtohW8tx1S1hAbjDfJyn5uus2uf0S5yQ4F0e7Jgjkd%2FYxzUSkRY2cWgd6xSbaOd9BLox1aRZoGmv6Midr3ZQuqePSSsDPvA0%2F7B9LLjxh1oDZAS%2F&X-Amz-Signature=b495f12c597dc357fa92418336879f2ef16f2c9cfc9d8119468d0d07b8814f30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XNDC3IJ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T163908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCIF7Up%2FNxUo6wuUhT51II2olplAmEs%2BjBDmGyRewxHNysAiBcQ%2BakAKeikQ43JXjU6PFNs8CM3DPNVw9rgXSb52BH4CqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMFjXP%2FaxaS9hPpwsMKtwDRbemF1H5tpBdnckuU9ql2tmPcAxUPfNHEf6fjbmd1Ta3SZzchUy%2BHRbqFnZbx0rt0azED4cUbDFJexL7X9nSAKHxabZUfIO4FMHVVreBhnVbgMx6NoNhjICrTbHqeh%2FZUi5dV1KHJT6JIuYXLIInLNg1meFw3LmQEViF72UDwx1iLaqZQ13uSlw3fT1utA%2FCieyc%2BhQLkP6aZPoS%2F4gIqdD1rXqvj4UiPkPNNN2H6NZiESIVstR%2BsbQyWdnkOZqsb6DhuhCiLbnAGBzchYXjlYlhicLYAGgHe0u13n000NBWOBQUJqDARZDIqifFhbpT7aEsfliXJ0GIF7JRRkgo7H7sdtDCQLV13woqPUc2xqHzTfx39wbuLZJtpwa4EcHkg83daLMTDfOHm3KUSNZKG1zuuHn8S7FsI2HMi%2BWfmnM%2BqbgzwkmChM%2FsZAnIKt6Vwrq5mxQuc6I5jjujZdaU9n%2FiccYRQxPYzxNBvV%2FmJz%2FQvKrC5vKGQMmyTbwFhP1PfU9mOkVdPPAoegu6KTxw7pQ4Q9pD8sigSANAgbrirseS0gNwOtMBPvZp1ck4OSU2jzrflqG%2BRYPtL9djAz7FyWCTnNVbsTwAEthbiTbQiW1jZpNPYSqzlyyj%2BIowy%2BCazgY6pgHJ8jKSVeKvOY75d%2BW7cgqDktfc0fmzYMMXfmO5Ad1zqLNSzPdtvQe6%2F9bE8SBNhrjAwigbXVF0%2BR%2BMSyE5jpLqMapEB8aT0gC98nciftv%2FoUcZFR3pUK%2FDLu8tP83ZWlatAk3jGiXM%2BYk6Mwy9tsl1OoffO0RG3Nl%2B%2F8FXU9SDLUFc6W0HntGdVB%2Fg7vIzl9LbsYxjc%2BZ01iQGnINRdTF7M1BDgX8F&X-Amz-Signature=d203aebf97d873141a69063487ccccb7c117639e14cfe30f41f1274da36ee322&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XNDC3IJ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T163908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCIF7Up%2FNxUo6wuUhT51II2olplAmEs%2BjBDmGyRewxHNysAiBcQ%2BakAKeikQ43JXjU6PFNs8CM3DPNVw9rgXSb52BH4CqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMFjXP%2FaxaS9hPpwsMKtwDRbemF1H5tpBdnckuU9ql2tmPcAxUPfNHEf6fjbmd1Ta3SZzchUy%2BHRbqFnZbx0rt0azED4cUbDFJexL7X9nSAKHxabZUfIO4FMHVVreBhnVbgMx6NoNhjICrTbHqeh%2FZUi5dV1KHJT6JIuYXLIInLNg1meFw3LmQEViF72UDwx1iLaqZQ13uSlw3fT1utA%2FCieyc%2BhQLkP6aZPoS%2F4gIqdD1rXqvj4UiPkPNNN2H6NZiESIVstR%2BsbQyWdnkOZqsb6DhuhCiLbnAGBzchYXjlYlhicLYAGgHe0u13n000NBWOBQUJqDARZDIqifFhbpT7aEsfliXJ0GIF7JRRkgo7H7sdtDCQLV13woqPUc2xqHzTfx39wbuLZJtpwa4EcHkg83daLMTDfOHm3KUSNZKG1zuuHn8S7FsI2HMi%2BWfmnM%2BqbgzwkmChM%2FsZAnIKt6Vwrq5mxQuc6I5jjujZdaU9n%2FiccYRQxPYzxNBvV%2FmJz%2FQvKrC5vKGQMmyTbwFhP1PfU9mOkVdPPAoegu6KTxw7pQ4Q9pD8sigSANAgbrirseS0gNwOtMBPvZp1ck4OSU2jzrflqG%2BRYPtL9djAz7FyWCTnNVbsTwAEthbiTbQiW1jZpNPYSqzlyyj%2BIowy%2BCazgY6pgHJ8jKSVeKvOY75d%2BW7cgqDktfc0fmzYMMXfmO5Ad1zqLNSzPdtvQe6%2F9bE8SBNhrjAwigbXVF0%2BR%2BMSyE5jpLqMapEB8aT0gC98nciftv%2FoUcZFR3pUK%2FDLu8tP83ZWlatAk3jGiXM%2BYk6Mwy9tsl1OoffO0RG3Nl%2B%2F8FXU9SDLUFc6W0HntGdVB%2Fg7vIzl9LbsYxjc%2BZ01iQGnINRdTF7M1BDgX8F&X-Amz-Signature=9b8bbd0f99ead6d3044486a3e764a245dedfc40130bf155d751fa079f588b076&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CI76VMI%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T163909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCIHR1MS4e0KwmuMgiRV9pPHdqjMoLe7NC9MXBCrGkZ5yzAiAEfWmxrSD%2FHDZGqWg6j0hCdzH7SNcEjC%2FTtsBJlxR6XyqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FO9MwnB%2FK%2FEn3MGqKtwDURe6wCSH1hWhIduDwC9itxcCrka%2BCDw2B30ZH5XG4rhkG6N9tvj2oOy1EK2ucVUx4oBZoY%2FmB%2B8Iba5nxlRnkRYJ7pFFM%2BPzqz9SPY322k402MkQfWsan0ndY5WR2wFkIEMb0sMmEyEfPD4%2B2Le7f4GhW2wLpCpOx3OMC2s6ETJ4NXwEeeTmIlluvUBSqwXJ%2BqSmv4mTVAAVzsyq%2B32p09As0ZfWH%2Fad5qciifVRphovhk2S1UvXprfPSa66GGijgNkE7VZUoFuo6WKiAYxTCDZJALhlmW8LOKtC%2FzXWN6PVxbwxesba5bGbduqGyXsc%2BSdyd3opj7PXKwyblAAV5X8oa%2B%2FfeoVjJFO997fwM0gNpWh3JIwfLCeBiEtEVGSguOq%2FsHwZzJ2RueZG4mTxSaR0V3hjK3bfWvRRxb0vYIqB4QL%2FZOwGo86SWQEfWCedd%2F1gi350H9lGhdMnsk7eb86tEyPAhqkGCiAnKRqkNTDd1juQXycTDIiu8EW6LuhJbhC7bIQEXNQcOGZ63lRvaT3WCr6xHFhediwBnXIWhP9ZqCgHXoZXFHZdsjUW6KlBQFpFEBcnCTXp2Qg7NimmGCOEkO%2BUAaWzro9yI0JTRetXLUlUISw2OQtTQfow4OCazgY6pgFMGo4SiwHa9Db26kdGJKpel6pK2w8Jv86SuTgb4JJ85EPiBiib3EBOKE3cT1Lrir3Bz2%2BxnWc6f2JPQ%2BuHlZn4Ma1Q8AoL5pEmyeOes8tFzrnNJSuT5hSvzKiaoUTN4MzkDiz5EfIPLu5%2BsB9CT4NqjSqGMM8uatOHbF2dys6BYH3wAmVrSegAzzxxDAnQ%2BBvwRWNP5yT3Kzsjk7f6RZchtEKAdm%2BW&X-Amz-Signature=2944258310f7c47b91bd065188138f796d78263ed63c1c1c924c11579e725512&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWVUQHJ5%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T163909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIE4OiN1cJpPNopGnAZQQBg3EdAndk%2Bpl%2FMKoVWZBYXARAiEAr5fhUPzovJ3m3Q7zKNRNKxdgl%2FoPxkTbNDwwkZrM5GYqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHL3SgQcu2BTyjAUhircAx4Viik%2FoCAWiwTXG%2FhnL%2BAjHgFEhxL1wIo%2FweqH9GScfmeRfb2heP2PDn4eL3EmF2xo0ztDjC6jwW3PDwvU4cG1NRK4szS%2B3hoIyc4S9agsyGCo4V5zZDiElln%2F41muEe0BMg2l0L%2BijkM3l8nIJbbOigsJlKl94xjSaPfaqKVxXy7Yl88bCyAM0%2FimIEdKuEAFMSZPUFQlJLsB%2B91Y0UzJtRBiD5H6yH81aHpYBOkxXMp4SPabfyYaCGforg5FX3RykK3a1%2FkCiCb3QKvOeVsr6vrZgD8GKTaIdPGOot8%2F1GTLBUkPoHuRns32kLtaJ7%2B29xohOeafAZaLD7%2FeWItgmyPHhSRxOcDSKZIZuERdJ7uIASVkfbT3bjs5LgXFTqN%2FafJlnpszoSvEIxuk3cBhG82m6BcJqq5ZdCRG%2FmxqDLDRDfBb%2FmpcOlgZ%2Bo0OFEGlGlYLb%2F0moh5Ga0PE1TigXbs8EvRbiEPWBq409FtABk2K9aV6C80DTi7mK%2BIiVaKG7n4ERtD%2Ba2LkD1WNC2cMVXNbvWXOqNimMOBvVJHM9YrQYSN9IX%2Fwcid%2Bls%2FFdYyHJEL5OrxWLHcm%2FWZz4VBlj9DP3xxrIwVpC3im%2Bn7I0%2BZVdi9My2hD8f5vMNjgms4GOqUB%2FX%2FuMcTYsAraYMFqOatu6UdE%2Fqpb2APT%2BMNjoJ2I3ee6eTfX%2Fub4Hm1htUatVbD%2Fs6OaagS%2FJXLMk0dUXYyA0KinowfPoVVa6hv%2BZ6jGY%2FuiMrRO4PgkxdZl%2BohUuf2DEE9EeiPNyMZJE%2BDlCKxz3m3qmMQ6TB%2FFZDA71CN7NJ2nqUkCL1KSyp2Vl7%2FNxxk3DyUQ6Vh3hEvXsvBQJ7MIWB7ID3Qs&X-Amz-Signature=71c8d5d34f6b14af873600d36c52e666336295a9f3a8c25c0b89ddeb936e7b24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YZNIQHA%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T163913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQCvEEECRpoUHz%2F6AA2sXaSOjcmUjHdfD2QtLCQnCGzr0wIhAKO14OInQUMbnD9Re%2FuJd2VIdEqdWcU3563FoBqjByTxKogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwk2FkgtCwdlTIEi1oq3AMCOgLCF%2FoFeD9tLjI6AqPtFpIpSvvipKyT0kfVJWouwbBWrWHJZrkWnxpqq0sPlnJo52Vc4Sd4xanZA%2FtPErKeLmyj4Z2ErjcuvQ6lVQiYZUvvqiMa83VbUUJ9a%2Bt6ry3U%2FpSywR%2BUL8fWjg6Bt4guLdN04xV8o3m5FuGSHXnxJOJt1W%2Fi%2Fdi9NxeUtQ3NHMmr%2BpFfLEf2%2FTxg6HASJAfEXjRofT%2BYvfPjDPrNUXYIRauI614maLa27DTda2c57RT%2FAngYkg0EnWmR1NwOZI872Z5wLNyOeEOgacPd0r5CiAqeuGWPDsJ9WuKbZId6JUJ4w7Joo5O9o3NtvlcNgEfbGUe5jIVP%2BF0AbYFiLs9Qc9FozbeHmErCEga4TvfdvJXcHKiQrziQKHDA1zOUkBD56Y5kDMZvuxH1V5Fon7EeDtHhSsoMULWE%2BYkbqtdcOo%2FyLoH6cnHodVIaVgb1zIp5TVVEkTH9uQNKqx4ddZ%2BgfoLeGEugGHzHUU1sxbU9Gsmd54SHTl%2BPHK%2FC3pxKUdM8vp%2F1WTCyGqWX%2FTQFNSUo5RHUKqKoSR9Xf3i3oaj4WnLAXe2xfsvtskUqKm5wn94GVgPkdt4DSPp8AgsYK50qsFWNxpA5SJNjhuO%2BnTDo4JrOBjqkATq2bYxoMzr2I1lDajDZ6FwUeYp85N1vnRULnnBN9XN%2B8qp1BgNFTs3u0IZ%2FV19uWt91wrBooBjCA0F2PK0W2%2FdfywLYu37LYF8oW5fM3U5DMFZzMZvzWwBQWrQZ2iyKyba%2BRw5OBf%2Fwl9znfPGC%2B21nXN0K36l51ek5MniwqmFrIuzF%2BHtWCcg0cHgodgI6oqyYSyVUu8coT8fxrnnK%2FvjXmj3P&X-Amz-Signature=0170d8631007960243854eb06eba0e95d923ce0e747e1ae8c646ddd13b6d6186&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUFTM5EQ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T163914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIDbnpHcFhtk7VHj8Mn9wz8tjVQN6wkJk9hw0yyu8CCASAiEA95iICooMoiQf%2Fc%2FLQKhiZCMXPkeM0Qp7l6KTCYla8xQqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDJ59Md0GuJohRPfpSrcA0rQNcAWIC8wibwtU5dhVqCYc6yiHJ5f%2BPrgUZUBP0jJgJZ1oD81W4zIa0GVpYbPOmcPAfInpIm9rXWj8%2FswD2S9GRIBeRZlcnjw2BiYkz9EG8oBDcx9hJTB4jlXSRJbSGeZ6scu4w5tpKx8yl%2BwJiItoRbFD9gxgqZhsElDvi3otbB%2FypdPStraTmeGyKoWTnC2DSEa0e6wqqCQm2ognS1AgHom4sQTMc9D2DIdG6QUdlPgb5TlLZ2uDsqtlEcKYyISVlR%2BOrWsppHTujlwe2IVptCMntOvyj%2BTzZ%2BOLXdvPTjiNtS63qsFtICKm8Sb0iZVb0N6QHPRFE66EGhw1J%2B5CD5ygpWKwIg72r%2F4eTj9PoZzzUVPxMB%2FllavrpX87okSo78J4qzxmCSfAEFpp74zWFT352X4sVtNbX2QY2IUfAyFmLVSdQ6MwvjCYioXKTqEiwIfv2UuypwTogyUFb8u4e3oe1V3rtaswwJ4COmGmOfjxrEJpTaw3dspYRLDDFW%2F9CCpWskbkSUIVDaN0AhIObvfaC5V%2BslvN8qfcfu9ADUgQ9RfoKKWNUwwRV4%2F1y%2B5ooVMDLRCwhgdEX9vTiULPe5ji0sUumTYpqKueRV4zJCxfJaPYT6yz8XKMMTgms4GOqUBS2D4H89tSiSENt%2BM%2BAi7QRiBqGRcJ9qHQNOh%2FSWyt0bYqHNKZ9x3WhMieJCrmkg3Z742dfxHEnghQzCZ6YYT2%2BfgqWyzPMMpjatFn5XlJx8gpENV4oBkYRN0D4eYHBBjh6ec8MFJ%2FI8ieDD77N%2FVfBrZQ%2BK74qtbHUtc6G%2BPio4n5%2FYmYLuMRNox5wlRUzGm%2FIHnSXJE5jTvZZCaa7Jp7BCUXMok&X-Amz-Signature=1315394f6d87a4d9d5c7abb18d6c6bd9359fe9599d523fe5fbcc5b0d5cfb9263&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUFTM5EQ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T163914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIDbnpHcFhtk7VHj8Mn9wz8tjVQN6wkJk9hw0yyu8CCASAiEA95iICooMoiQf%2Fc%2FLQKhiZCMXPkeM0Qp7l6KTCYla8xQqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDJ59Md0GuJohRPfpSrcA0rQNcAWIC8wibwtU5dhVqCYc6yiHJ5f%2BPrgUZUBP0jJgJZ1oD81W4zIa0GVpYbPOmcPAfInpIm9rXWj8%2FswD2S9GRIBeRZlcnjw2BiYkz9EG8oBDcx9hJTB4jlXSRJbSGeZ6scu4w5tpKx8yl%2BwJiItoRbFD9gxgqZhsElDvi3otbB%2FypdPStraTmeGyKoWTnC2DSEa0e6wqqCQm2ognS1AgHom4sQTMc9D2DIdG6QUdlPgb5TlLZ2uDsqtlEcKYyISVlR%2BOrWsppHTujlwe2IVptCMntOvyj%2BTzZ%2BOLXdvPTjiNtS63qsFtICKm8Sb0iZVb0N6QHPRFE66EGhw1J%2B5CD5ygpWKwIg72r%2F4eTj9PoZzzUVPxMB%2FllavrpX87okSo78J4qzxmCSfAEFpp74zWFT352X4sVtNbX2QY2IUfAyFmLVSdQ6MwvjCYioXKTqEiwIfv2UuypwTogyUFb8u4e3oe1V3rtaswwJ4COmGmOfjxrEJpTaw3dspYRLDDFW%2F9CCpWskbkSUIVDaN0AhIObvfaC5V%2BslvN8qfcfu9ADUgQ9RfoKKWNUwwRV4%2F1y%2B5ooVMDLRCwhgdEX9vTiULPe5ji0sUumTYpqKueRV4zJCxfJaPYT6yz8XKMMTgms4GOqUBS2D4H89tSiSENt%2BM%2BAi7QRiBqGRcJ9qHQNOh%2FSWyt0bYqHNKZ9x3WhMieJCrmkg3Z742dfxHEnghQzCZ6YYT2%2BfgqWyzPMMpjatFn5XlJx8gpENV4oBkYRN0D4eYHBBjh6ec8MFJ%2FI8ieDD77N%2FVfBrZQ%2BK74qtbHUtc6G%2BPio4n5%2FYmYLuMRNox5wlRUzGm%2FIHnSXJE5jTvZZCaa7Jp7BCUXMok&X-Amz-Signature=7a9555b29ba8ec8720fcbd98c21519a702c792d2a5a4dcf20ee893748187be8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHEAJBEY%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T163854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIH2HPBIVAPH9ugXB9A2JPsdogONa5TscNYuernaBPebVAiEA77l7bZ0EZagC4UOLz7ZdQ8D2NUdhUW6DvuglLiH83lQqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCghUTvJAxgoCk1HtyrcAyDYundhGBbpmeI7jy%2F0ksloB8XiY6U5Oju8VxNvXSG3BV0z7wD1JQAideZYO6uTL0ZkNR6E%2F7wUMYwP%2BN%2BtwDCCzp942Oc2NkgsZpg8RV%2BMG%2FoVlc%2BEyCbLfBWJGNwDZ4LvY48lclv%2FyogwEW3KZXIw4iwi4ow4AxyN6LNfJ88W2lFtNPaQ4%2B4Y99YJq4E9t6Zm%2BSGBj%2FAAaDmEgZYDh4Vj1DOt1dt1vBwk4IhoTSvyF6kND45yOwio1Ac5ik2FAs4gpOWFD4EeTP13axZUXyIugN0BBTQrb811gY36vU22O3pQAdYnRgbI%2BLb6M%2B3hg9GSZRFQ28dUCrbvSbQuZDDALrBVp7zbT7iC9ZyS%2FSY80oEjf3fvmPL5NB7vHutAz3FwH8FQv2vjOM6QtRFJ9BCp1eH8QDUFTdLVzdVITOgqs%2BXixZGWS2K9ShvbFtPj1eWno6vo8t1jXeBB6Qa%2FxYqhY5CjQTU6XvjJqp7TiCl%2FIad1bdAvUcyXxeyg80cfYwLAyOHsYjWFXE0ir%2BnAddDG4dljI12UrA7yQ1uKvtLzI6FXGnUpj7MfsI2BSRE4nMhlsUTTpNLGFpoBg%2BfE7BMHBE5REEvmGO9f6oKaDlbDngBxD91MzUxQUsKIMNbgms4GOqUBma5UrCVyObu0UQcoJzEUQqpbP%2FJ6ekzr5ZQ3Xu59hXZsUsWpqrTWGajQJfOSrORxcmpS6vBWdrwLL00vhXzfTOPWO2TayvF%2BJyTGYt%2FgKBjStJ%2FUgkFH18VpHgZVx%2BYVxtVBGFUWC2l4ehGXg%2FWsSSq9W%2Bb35WCwxrkTRKZfDrWaixh5pyrgejqv1JQHPE7VRVwUgf9fSVrX31FG%2BKb%2BjvyhN%2B9%2F&X-Amz-Signature=de73140d6e91632e7d33fb1ca2ed43a52dd174ba0df67f132ba54830d885cb15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUFTM5EQ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T163914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIDbnpHcFhtk7VHj8Mn9wz8tjVQN6wkJk9hw0yyu8CCASAiEA95iICooMoiQf%2Fc%2FLQKhiZCMXPkeM0Qp7l6KTCYla8xQqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDJ59Md0GuJohRPfpSrcA0rQNcAWIC8wibwtU5dhVqCYc6yiHJ5f%2BPrgUZUBP0jJgJZ1oD81W4zIa0GVpYbPOmcPAfInpIm9rXWj8%2FswD2S9GRIBeRZlcnjw2BiYkz9EG8oBDcx9hJTB4jlXSRJbSGeZ6scu4w5tpKx8yl%2BwJiItoRbFD9gxgqZhsElDvi3otbB%2FypdPStraTmeGyKoWTnC2DSEa0e6wqqCQm2ognS1AgHom4sQTMc9D2DIdG6QUdlPgb5TlLZ2uDsqtlEcKYyISVlR%2BOrWsppHTujlwe2IVptCMntOvyj%2BTzZ%2BOLXdvPTjiNtS63qsFtICKm8Sb0iZVb0N6QHPRFE66EGhw1J%2B5CD5ygpWKwIg72r%2F4eTj9PoZzzUVPxMB%2FllavrpX87okSo78J4qzxmCSfAEFpp74zWFT352X4sVtNbX2QY2IUfAyFmLVSdQ6MwvjCYioXKTqEiwIfv2UuypwTogyUFb8u4e3oe1V3rtaswwJ4COmGmOfjxrEJpTaw3dspYRLDDFW%2F9CCpWskbkSUIVDaN0AhIObvfaC5V%2BslvN8qfcfu9ADUgQ9RfoKKWNUwwRV4%2F1y%2B5ooVMDLRCwhgdEX9vTiULPe5ji0sUumTYpqKueRV4zJCxfJaPYT6yz8XKMMTgms4GOqUBS2D4H89tSiSENt%2BM%2BAi7QRiBqGRcJ9qHQNOh%2FSWyt0bYqHNKZ9x3WhMieJCrmkg3Z742dfxHEnghQzCZ6YYT2%2BfgqWyzPMMpjatFn5XlJx8gpENV4oBkYRN0D4eYHBBjh6ec8MFJ%2FI8ieDD77N%2FVfBrZQ%2BK74qtbHUtc6G%2BPio4n5%2FYmYLuMRNox5wlRUzGm%2FIHnSXJE5jTvZZCaa7Jp7BCUXMok&X-Amz-Signature=212ab2c28d2735d5aafa073af7e0acf6e31ced1f6b230afdfc40981968b33799&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUFTM5EQ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T163914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIDbnpHcFhtk7VHj8Mn9wz8tjVQN6wkJk9hw0yyu8CCASAiEA95iICooMoiQf%2Fc%2FLQKhiZCMXPkeM0Qp7l6KTCYla8xQqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDJ59Md0GuJohRPfpSrcA0rQNcAWIC8wibwtU5dhVqCYc6yiHJ5f%2BPrgUZUBP0jJgJZ1oD81W4zIa0GVpYbPOmcPAfInpIm9rXWj8%2FswD2S9GRIBeRZlcnjw2BiYkz9EG8oBDcx9hJTB4jlXSRJbSGeZ6scu4w5tpKx8yl%2BwJiItoRbFD9gxgqZhsElDvi3otbB%2FypdPStraTmeGyKoWTnC2DSEa0e6wqqCQm2ognS1AgHom4sQTMc9D2DIdG6QUdlPgb5TlLZ2uDsqtlEcKYyISVlR%2BOrWsppHTujlwe2IVptCMntOvyj%2BTzZ%2BOLXdvPTjiNtS63qsFtICKm8Sb0iZVb0N6QHPRFE66EGhw1J%2B5CD5ygpWKwIg72r%2F4eTj9PoZzzUVPxMB%2FllavrpX87okSo78J4qzxmCSfAEFpp74zWFT352X4sVtNbX2QY2IUfAyFmLVSdQ6MwvjCYioXKTqEiwIfv2UuypwTogyUFb8u4e3oe1V3rtaswwJ4COmGmOfjxrEJpTaw3dspYRLDDFW%2F9CCpWskbkSUIVDaN0AhIObvfaC5V%2BslvN8qfcfu9ADUgQ9RfoKKWNUwwRV4%2F1y%2B5ooVMDLRCwhgdEX9vTiULPe5ji0sUumTYpqKueRV4zJCxfJaPYT6yz8XKMMTgms4GOqUBS2D4H89tSiSENt%2BM%2BAi7QRiBqGRcJ9qHQNOh%2FSWyt0bYqHNKZ9x3WhMieJCrmkg3Z742dfxHEnghQzCZ6YYT2%2BfgqWyzPMMpjatFn5XlJx8gpENV4oBkYRN0D4eYHBBjh6ec8MFJ%2FI8ieDD77N%2FVfBrZQ%2BK74qtbHUtc6G%2BPio4n5%2FYmYLuMRNox5wlRUzGm%2FIHnSXJE5jTvZZCaa7Jp7BCUXMok&X-Amz-Signature=212ab2c28d2735d5aafa073af7e0acf6e31ced1f6b230afdfc40981968b33799&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHF44XJ7%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T163915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCIEdYBDGYCwLeYlo4vR6656gZ9XGEd4VnhdkD%2BOpyLqUCAiAJQwjoqvUdZAZ%2FxTlYrRXn%2FEQme0xZeovkjxYz9HjsCSqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMKS57lE2JJrdyRMP5KtwDVUp8AtyP7HiNPHS85lp2SmlYIkHRY92SzBwToHdX9J0MOJ%2Ba5h0jieaKw9%2FBrzb4X6UTdpKDkO1jBD7WK610EbYe3BWkone7f2YtxXBB5pitJrRUc2msFHnscofMRrHkptcKiNAA0qOU%2Bon3lqHw4gS%2FF4Q0KHmBGJgPgOiDJXiHinJGpBXM5W5SqiW2n1MotsDANc28PpIIwOtOIugiEFpZHhFhHr9cZbZhXw3UxbE8pmCIuEGxBJLCxbjM2zA%2FTNvog5kd5vaKpd%2BmiRJ7srzYv9Kyd9JUS0hOQIPCtHtwMEsMxWPjR51mFmlsXTtjEAk%2BweVjPWlWhkDuK6ZvORTVw%2FNyZreQuArhL%2FNtcVGP4M8OUZ8vtw%2BLgX%2Bqq80MIyW9z5w8uNPlPIwX6xVfoXdgPwXj1lrwjB9ImILEYIao5jlT7XYEm8t6FF5qpgfyXSFvdqjjifEJBGKcF3lniBj%2FWotnDjXKdcFtD7WrfHZfvOrRcUjmLAM2VJ8YC2o5gATtqQiEGrImX6e9WZQJY%2FztzLm8AnBQVplGqYGFec2lwAqmzAYJcCt0pImbnPJkmVJAIx3UwnUiJnH5GBV4%2FmMhXqjUyM%2BoMYghD%2FFtDXQ2wXyhW1JfqIRDN4UwjuKazgY6pgEFQGufDkxAYjx7VTnC0e89p7TMqmcPZAKFwdRckXNRLuuKGRo9ie9Bqtvyf40g5zmY8Qp%2BgvBV85yGOD49wB7ZL3Nbf%2FYdJ63%2BgfdykbYMC2FfjAUtDpYCQgtsQnPoIt3C7lt%2BlP6VBR5p7XbgSc1dYmtStTE5QwGPpxqYipeRYnSlqxKnuPa9x9B5rM7UX89zmpceY6km6zUQuEuXothFZh198BVE&X-Amz-Signature=6bd43db65fb02f8c2d49c7fd390e397c5f37ed0dd873457b50842cf7f46ee99b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

