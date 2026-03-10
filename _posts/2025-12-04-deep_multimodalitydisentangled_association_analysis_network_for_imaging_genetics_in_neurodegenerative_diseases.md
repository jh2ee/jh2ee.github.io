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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637VS7JPG%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T183114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHC1n18kJM%2BA%2FeOZ49FvO1KSGYuBGFmHvG2FTmjc4flkAiAJMrMg%2FH19pW%2BkVX%2FGZvO3jdw4ljQVQdTAjT8Ur76E0ir%2FAwhLEAAaDDYzNzQyMzE4MzgwNSIMw05d6sqoqHXfRYyyKtwDO6FiA79Y7O9QN1rI9bzLMTD7nNGEtM4u8iq3wYdFKDmUwq4K2z%2BRBscBZ1%2B6VZJjNBB8E7XPFjxlfAAYtdghTJA5sPODvFhuTUOAGYOm0JFK1ZkfDjGFh%2BFnTbXH7QmKvz2U8j%2F8hQo0WaDD%2Bn6iDn04119O1zoSDw%2FBURyz6WWM0ERxKaGS1I0is8OcW8j8Fp47ccTFyQOCh%2FTzvlYlGUAY9kU7BqVDcTNp4axvUkcTuJTjOzybN7PiLmtIhwngnwDI9FbrC2lixrXSG8x4Tvy5cqkXCnqFuzNulZyU6BkwdZdqH0PhnPqaixR4aav0W%2BbC8JdnYCSB3UxhQw2xPYLINnT69oMrTL4KoxN9fk0vamg9b31b1JCD5VK0V33dNoMWcTc9TBAenSdXOM4hYU6Aunp%2FUpkOGG%2BFUDvSCtL1EwtrxwVv0wFU705TUOvsEpAunUZk2xNCLHLzSts7MYRTSwz1yMYggOR3EplVFuhQSzJ1%2FD6w5VpoV5HBIhODSQaEuEojzO%2F6xA%2F%2FVT%2BlHhl5gJ9%2F%2BM%2Bg2XS%2BDe9YfBzHtctJVRyBKKA3sZQD6ACbv7yrKxR%2BLEv0ReYAMAJRqBXQgxSrvm1I5ZCqqx7059qQJzyBjE%2Br%2BPlHczEwvK%2FBzQY6pgGNqH%2B6aC6j96XrhZQrCeGPmwtRSn2OrxMqSxWmMbc%2B%2F%2BqCbvzUdBEVp%2BmKL6OqrTObgeMi%2FiyP1fZYkVq833B9Fp5w%2BNEON8R0pgqRIra80R3BH00g2HWhkmU%2Fw8QjizhnnkvflinTag%2BNjcIb458Wzxgm770lYHXhUMqIx1OJuw0oLJ9j6ktjMVuwIIl8pspDnXkv%2Bo32lMwakUb5J4GXA7XpuNBs&X-Amz-Signature=1ff213db30a63cf1f9ea7b8d524a6b239e9f3596adb1c50485d2edebbae3e226&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637VS7JPG%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T183114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHC1n18kJM%2BA%2FeOZ49FvO1KSGYuBGFmHvG2FTmjc4flkAiAJMrMg%2FH19pW%2BkVX%2FGZvO3jdw4ljQVQdTAjT8Ur76E0ir%2FAwhLEAAaDDYzNzQyMzE4MzgwNSIMw05d6sqoqHXfRYyyKtwDO6FiA79Y7O9QN1rI9bzLMTD7nNGEtM4u8iq3wYdFKDmUwq4K2z%2BRBscBZ1%2B6VZJjNBB8E7XPFjxlfAAYtdghTJA5sPODvFhuTUOAGYOm0JFK1ZkfDjGFh%2BFnTbXH7QmKvz2U8j%2F8hQo0WaDD%2Bn6iDn04119O1zoSDw%2FBURyz6WWM0ERxKaGS1I0is8OcW8j8Fp47ccTFyQOCh%2FTzvlYlGUAY9kU7BqVDcTNp4axvUkcTuJTjOzybN7PiLmtIhwngnwDI9FbrC2lixrXSG8x4Tvy5cqkXCnqFuzNulZyU6BkwdZdqH0PhnPqaixR4aav0W%2BbC8JdnYCSB3UxhQw2xPYLINnT69oMrTL4KoxN9fk0vamg9b31b1JCD5VK0V33dNoMWcTc9TBAenSdXOM4hYU6Aunp%2FUpkOGG%2BFUDvSCtL1EwtrxwVv0wFU705TUOvsEpAunUZk2xNCLHLzSts7MYRTSwz1yMYggOR3EplVFuhQSzJ1%2FD6w5VpoV5HBIhODSQaEuEojzO%2F6xA%2F%2FVT%2BlHhl5gJ9%2F%2BM%2Bg2XS%2BDe9YfBzHtctJVRyBKKA3sZQD6ACbv7yrKxR%2BLEv0ReYAMAJRqBXQgxSrvm1I5ZCqqx7059qQJzyBjE%2Br%2BPlHczEwvK%2FBzQY6pgGNqH%2B6aC6j96XrhZQrCeGPmwtRSn2OrxMqSxWmMbc%2B%2F%2BqCbvzUdBEVp%2BmKL6OqrTObgeMi%2FiyP1fZYkVq833B9Fp5w%2BNEON8R0pgqRIra80R3BH00g2HWhkmU%2Fw8QjizhnnkvflinTag%2BNjcIb458Wzxgm770lYHXhUMqIx1OJuw0oLJ9j6ktjMVuwIIl8pspDnXkv%2Bo32lMwakUb5J4GXA7XpuNBs&X-Amz-Signature=1ff213db30a63cf1f9ea7b8d524a6b239e9f3596adb1c50485d2edebbae3e226&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WD7NGJFO%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T183114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBQECjCcGwDQPm7Z3jJZf1dlDDG9ilDPM23pogdeg2VFAiBETUNMm%2BnHVZW3h2hzJ1v%2BL9B8oQiYUOxSXqHZGJKcrCr%2FAwhLEAAaDDYzNzQyMzE4MzgwNSIM4IQJyBBdFpD5vhmsKtwDPRoXl07%2F%2Bnnkto9ybOt%2ByfOTwV0c%2FWu%2FfodDYQQDdCmfIdgHx6OIYJY2jAlOgJNWe2vayjZKL30QWAUFMMw%2BkqleIMuTVp%2BkD19fgqAl3McVItx2wSftggomfLPxh3znk9iuWDe0ysdx7Osxiap6g43LdU9z7RagoBNqUVSCt%2FCoEjBe4SUA7nZCBCJ4%2BCwrnOV%2FLEz4LOCYoZdGK63TWtIvaRBNGYz5eRLBhYrfAtSY46GE7GvVBNTGj55DgO7%2FGg%2BpqvLjGvuYzysAiYNVxAu%2BtlMAouTUihCteFNcCStM7FSK1c8rO9VlD00Gojj9jggmwgaihoYnq13V1S%2BhahdIHkP25I4cT0a0ZDw%2Bwedchduu4X6LmxPgvQyfkB9egZNVczn5MFeHxN3nqYUeHO3883nZpFu0NoH5e8Crs5phIxShxOLvii%2FJwCUXdKdGfY9iG%2BhfKWnVAT79ZS%2Bf4yA5%2BTKghZXmUHYbHmtw4KJMfe9kfi3NDKzifWodavVI8nZy2VOCUNDG8JPGBOkRnrOHOYp5w9yYIb3zXT32YS24n640ZkLYFji21iUsjJFj8JS%2F21f7n6YSKmiRZfwELdLZm6ltwcCsV1Jb54rTIGT1pT5L7j7z22HdfGYw%2Fq7BzQY6pgGzKSSOfFWXNNp72IshPYCd10ZrX6oqjqbLgaIEG%2B4uS%2Bv5AMAGeYrBdhyiOoVU0rxwAOcFGW3H7sPZVAMb6EtvQab7p4awa4EcM%2B5%2FpwDzMNs%2FgpMXhPysI9ZpaD%2FwVFh2zBHlmio2C6M1e%2BghGtMQEPh2EbLdB%2FLiE0zkuDS7PgcsKLNIWVxexUzoekrNQtpWkE6tvtHmZhtegWUqWadDJlr2KF5w&X-Amz-Signature=59ea900023ed285a43fb75f6d1df39ea7747194fb3b90a88c03137a693eeffcb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7UVNVWU%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T183117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHuR0oxXtuxmhnmQtq1DMqtXhvavsuCWcFJX0q46JRDoAiBYKUzfDdRP1%2B2Z%2FuEa8GPnyqSyq2LzLdAxA1FVMhll9yr%2FAwhLEAAaDDYzNzQyMzE4MzgwNSIMjHSComLMGyUeq4j7KtwDy%2FNpgFQaxLPWgGz0bG7yiGGPTkBK1%2FU9gBL8mRJI2z%2Bttu1tIyKPiKcEP67DoY5XjJ0x%2BwJzbDp9SrOm9K9j2%2BlsKf0PS28pvTFpUY35lOPTi%2BxK7ES40GJUQaNttzp1okej81FnarQsmWNaXWABFa%2Fn6pSK10CWueNGb36JJzIZXVgTkXqTenFwM7RBpprvp3IVJo%2FaiJZU2SMxOT3yYa82dkyApRFqp%2FLcPtdMefk0mzYr74%2FRCvHfurJbHPpuxe4Q%2BjnVMEbtC%2BnsTJyPmMOPcWSXM3eScSMGrGiTeVN38nuebwXQo%2BCaB5uP%2B0ipocunkaJR5fz%2B1u38cjHNR3OlCOd2hjnAiw50tWWi0a9hxolPZxva8ArqHO2h7rf%2BdNVxuE0MMAqPRbdzea6Do8iTV3aJ0EV0EVjZOw07L20MLQ2ywd%2FiPGYb7GuHxBXus6%2Fwqm2Ja42CJTg5aWGOEHHrrzpKPsxhjFAFwCRQ2AB9GRMok6qVw95sW1N45OW4HxrvYiDi9NebGHpdPBtfP%2FzS7yGaZ5g%2Fz7cJqS0hqm5dR%2F9DOlKsQVsCBW0MgP152%2FuSETMBAYch2%2FRujURDIgEklJXKRWnS%2FFXGaMUeJ4YggxJHHktlJc5%2F5EAwwq7BzQY6pgH%2FHAIfpV69okp9kGxO%2Fc47Q82IPw7yVpvEozFKdk6DlPImq01cgV%2Bbo8%2FyTxbvP23jInDV6kqh%2BAzw5EmlTKu9p51%2BgGCmUsOuSZjzbSPCXW9bHCg7LeV7ea5jqiyBV3TDV77gaYBrB6w44QSQtGvM0BIVrQTQQo%2B7hIb95%2FxIatwIVLRKkJGPIU%2Brcwi7LqLI5Gl1IDbwBdC0jWg8O1UMJYVFYj0e&X-Amz-Signature=800faac2972d177ce1e4ed16925e7da8bb0ebb8d632a2f72b811dbd6e53ed8f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7UVNVWU%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T183117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHuR0oxXtuxmhnmQtq1DMqtXhvavsuCWcFJX0q46JRDoAiBYKUzfDdRP1%2B2Z%2FuEa8GPnyqSyq2LzLdAxA1FVMhll9yr%2FAwhLEAAaDDYzNzQyMzE4MzgwNSIMjHSComLMGyUeq4j7KtwDy%2FNpgFQaxLPWgGz0bG7yiGGPTkBK1%2FU9gBL8mRJI2z%2Bttu1tIyKPiKcEP67DoY5XjJ0x%2BwJzbDp9SrOm9K9j2%2BlsKf0PS28pvTFpUY35lOPTi%2BxK7ES40GJUQaNttzp1okej81FnarQsmWNaXWABFa%2Fn6pSK10CWueNGb36JJzIZXVgTkXqTenFwM7RBpprvp3IVJo%2FaiJZU2SMxOT3yYa82dkyApRFqp%2FLcPtdMefk0mzYr74%2FRCvHfurJbHPpuxe4Q%2BjnVMEbtC%2BnsTJyPmMOPcWSXM3eScSMGrGiTeVN38nuebwXQo%2BCaB5uP%2B0ipocunkaJR5fz%2B1u38cjHNR3OlCOd2hjnAiw50tWWi0a9hxolPZxva8ArqHO2h7rf%2BdNVxuE0MMAqPRbdzea6Do8iTV3aJ0EV0EVjZOw07L20MLQ2ywd%2FiPGYb7GuHxBXus6%2Fwqm2Ja42CJTg5aWGOEHHrrzpKPsxhjFAFwCRQ2AB9GRMok6qVw95sW1N45OW4HxrvYiDi9NebGHpdPBtfP%2FzS7yGaZ5g%2Fz7cJqS0hqm5dR%2F9DOlKsQVsCBW0MgP152%2FuSETMBAYch2%2FRujURDIgEklJXKRWnS%2FFXGaMUeJ4YggxJHHktlJc5%2F5EAwwq7BzQY6pgH%2FHAIfpV69okp9kGxO%2Fc47Q82IPw7yVpvEozFKdk6DlPImq01cgV%2Bbo8%2FyTxbvP23jInDV6kqh%2BAzw5EmlTKu9p51%2BgGCmUsOuSZjzbSPCXW9bHCg7LeV7ea5jqiyBV3TDV77gaYBrB6w44QSQtGvM0BIVrQTQQo%2B7hIb95%2FxIatwIVLRKkJGPIU%2Brcwi7LqLI5Gl1IDbwBdC0jWg8O1UMJYVFYj0e&X-Amz-Signature=22cd0037f6829685358bf62f36bb420aa1064e838827a173927766eed9c0010e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QEWN4CM%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T183117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG4EaWgeVG8Uo45RE2mk1lu%2FztS2Q2mPJWUF4adpDLRbAiEA%2Fk%2FOYz66Y6LFQqXBxCvoqQc8UIgAxfwp8JB7fdu1kSQq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDP1ii7HVC%2F%2BJQEwXZyrcA3jcMPkM%2BSLm6vGG1Sh3GEWFS4TMbedASyx5OCn4UGk4lOmbradmlljVh8wup%2BaT4b2h4muaU4x0fC3dEIrd7Fm9KpAABKJcY3Ad8eAL7Krd4Usi5YHJ1%2FK60olcndDWYCgV3D4qdckx4wM5txoMapzXdr4v5Q%2BukKERhLH0NYclDK01RCfX2HQe0Vs%2FRWOPTPNs0UxyHJGZSS5hoe6JO4RBdcJnsJthPGt60EXZ1iQwZTi%2Fv%2FZsKHlVbvM0F3w1S%2BHBJW1Jxnpf%2BVq%2BLmV%2FPLJcuvz4npiC9X86T087XPyZheQzry%2B3Rj9sh01UFh6%2BFmlDUebd4eYRgcp5yWycQbgH7EP3PftrV%2BmNG0xNl%2FIVBr%2FpaX%2B08znkUPWXzb93BYymkHSaEaD5sP6jEgk0m5F4B4yMHYmyliX%2FtmKqkP6%2B8qZmFwfybF2bzV5%2FnVQkmuY1QH3bO%2FMUpFY8iQdE8yCZI0xqmiY1Kr9xtyFYEAbir719C4QIbHm%2FlnzACpeu%2Bp9fVtjOJknyt5v2Jv77sOZg%2BLiMkP7syO4qNJyGOUJFdk%2FjxG6BvCsp20gay9sj2xQYiklfxdouH7Fw82MkrJudaw6b%2B6hBAC%2BSaqpML8FwzbQ3CoV5ZNk%2B%2Bz%2BVMI6vwc0GOqUBN7Nr6XCBcltEgAdjCWe2rbyzSPRdxPQaHUFlLF0oicUzu17kqOQnpQh39%2FjAjyc2qqrfpA%2B4LQKIimn91qqzDyfYsy9y3b8jexdknim4T2T5TzuBtk6HG2iTKZE5V1E7JCUqW3QaGhHi1rEpLXUwMCRCQBvBq3Md6CoD6ddrLDkXqgwCvR%2BpdIeQUYsHsmAHo88HudXOJmAUDYy0CJ1rERrR6Xjg&X-Amz-Signature=1ac62c4166650ea44a06e75a9e03d6124cf30533fb23d5cea4304aac0ccfc2a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XTDRGI6%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T183117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCABcOFQ9ucYVr6ZTe8TpRTwDUlUIKqQen7DOJEnHgEbgIgE%2F5i7zh1fsBkBY%2F7aZumJ45%2BW2LH%2Fzth6pgjgW42fR4q%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDLn1Yj4rYNDPaLMG1SrcA3VGM0r%2B7mWuGpEgzuai5JOAgXJRnvL0WVGKdqDb2cLUVJsI4%2BW5bovx9FTgYCv2QXIqfUKNTLAn7R0ooLHKJaFEacaPP9LxWVAFxosfU6yKF16D%2FOQxNFSfEd%2FhksKbf01oADotXiVstjSWcP%2Bh967hu3aK7JlwTnWtdJBJLeEeR6vVl21NHjXyhJQl8A5p9weQXXJjv1dyHdFtnOcdbZkiQJf4sYgXDaKzBzvmSVvuiQTJVOafqcaMTHS8YdIvDCAio47KbD3kR9zo3XUlSwSE07GvQsyD%2FsuoHC2fUA8iYn3axcKIMYyNe0ZalMsQfP59bUtUCimvFpsD3QK7kEWVNMGhZFTXudDf%2BKFmG1ZaD8vPuT4vX6GJ7CjOmnFgaY9F1QODm8oqYcYNWcV9%2FdKGaRzF%2FnGBJbJlhIJY8k6fwMHjkUKCkqvqtFbSbsb7L1IdNGkVwZRNusl8A2oSWhXPQN9Xr1v67voqtsvC5m%2BbSzCGokYfK755%2F%2Ff05Agd1ws1vg0ohRCh4Oe9Nz%2B1mYtohMXHDqmnE2szBoIR3QVe0A8kpvr5fDsr%2FDEQrhwdi2rshCcP7Lm13gQ4G95F2RK0hZVaXGykXsuRN3LkKXndPN35dlYXlJF5TcVNMKuuwc0GOqUB%2BD0H1Mk1RSQftkPy3OG%2FdfL%2BAYOJUUIO%2FOKknN5lFI0718KYgyOh7rKQA6WxjOmefF4L99Tz2Kf7Z71Qe0PU6jKRHYWWowKph2a0I%2BkvseNT6cNoIdmHA1iqrLMo%2B5rFovd%2BKALcOqbmeiqZpfAt7xVDY4W5EAbMrS8XaTkF4OUyxwMZqh6b2LOQ1VmrCTBoYUotGO2LWtw%2FEElmeHmgYvVbzM2A&X-Amz-Signature=4e0a9d428602d0866a9a85ef4e915bc262e125045869dc4bc591891ca18ef619&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XFGALDES%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T183119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2B4EbSA6%2FqC6LiO86o2RZzfeQKaIPDkukCC2eHfxqWRQIhANp3SB9jD46wFrkUAUwa7%2FPOiUWTwI%2BgodKPmfxkCN56Kv8DCEsQABoMNjM3NDIzMTgzODA1IgwshJxGxg0AKo0xL%2Fcq3APU5Pmkyxvnq6pID7MfqXi5Qx7AsoZBCKZmo9GsPCrj7vFPcfEvoZKK4kj4W3s2yJZiNvM9Jjmni8HmDbdiB0dBt47Tr%2FYLw2ggbi5%2BR1dihQQ4m%2FrXJ2HYD3ZxeLS44FF7NB7JNN9FBvDUlNft6Xb5RMcHYoAacZr%2BnzC16P5fmoD55zfSSBV6j0ago%2F2%2FrffyFJlWks4lh4JD6CuvnDmuJsfds7ZKrN%2FOMTybbzhGjoHj4K0JniC%2Bmr4E7yBJg%2BhtlvPmg1jIBKdJ9qdWmgcG9RLDyf7TStqnmLoJPGRLAb2hbkM28WPp%2BWc7cwG9MOJvv1Sm98Jr%2FMxfuNcTNKUNe5NApdrYa3ivzI%2BgMYP1ydMUPL7ZuYinvUDA3CeTBLNuVAkKdWXkFY6EbceY%2FAcPnvYkgRMz36lDP9YSJ77ZHsqCRG6XhDjQzMJ1RDmvBiX%2Bq%2BlzJU3q4hDVSd8L5AhtarVmb3IyzuRtxjq%2FOhbpBdn7cvAF%2Bg02FFpL7b5lDsSFToLL5kCK1IXwSdokmjcz3ygX3f9XJhe6XkUx559WSBymjNiP80M7ODXLGSYJ1khS1VQF7wSLSreSJgVMVJSF8NrOZYc3dMYJVS8zUFOfV%2BGKU5kAPGhh432OHzDFrsHNBjqkAREbXCs8wqRTnOJoe%2F2uGStfnSPx3Kyr562oh7zZEFtb9mL0u1nO9PGwispYvJ6TPym%2BxpvshiMhFGREGGQN2vqNAXTF%2BUbQ53jhausaRCPvXVMSsL8ZqAHVzkknf2Hw6LgwuICQciY2n508wJVKpctHY5y30N%2FjTdvyNYyoCuhAZ3GWDZ%2F8NK6xFECznMlaZPoFXkWKFxiuzVwoJ6A92l6aGn9v&X-Amz-Signature=f8ceace2b2232293d012d3c32e5f1c25745e18c474280cc1ba07796db7d155a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PBUE3PU%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T183124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDXbQoNf9oxNDZldUyO%2FGNa3nQ5eiUZOfX4n8r5UV6MrwIgdnt6BuAn2DP%2FWDcWl2kNH%2FZYa%2BQTvfzcaxqN5eF2OZAq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDJLBfkxf8dZoajso2yrcA9cDQzrsqWcMJli8MaqSYGmNjnxaqLIXajunhayUHI%2FZBzExPxTpRtwdbDXEJe88uqHlzfKarAW%2BD7YfDf4GqQdjSN3FJk8QPD9sCrjl9DUU80YRpDHrM071DDFfKIxzUOPWK%2FnDjVfROfbMJC55F2Mr26cV5zSTE0EJCt451qElPORXr6CHTmG%2BBMJzvWEj39V7HDBGjLq%2BHXAGUmBgG62H6WsY29w8DIM65A2duQ4TUedaxy6FEQjf9JLiTcY4QUoTlzVbHtX2Y4euMamh4TAD0jVPr09YoCDDk0TguWn4c0%2F6FOr3bMm502lX08H7FZwgx7gmGnshiTTcJjF7bVpbv5lgQ02%2BzPRnjZNiCo7LooCVo5AR6x9QzhyNy9JMrUUnK7XyYWHToDG%2BEvY%2BOB07PvdDyoyjV%2BSVIr%2BwPoD6EExa%2BW9%2F3vi01uoips9J3CgQuZGfO3Si4mqu2%2BXnd1b6adIN3lmrQfPXsAPQ1HVvgn%2B4sp9Jf7GTsjrz59%2BvaAJxKQi1SNI5QK4ePqgVzk638KmN0rHc5zZfla1sTqPPJdil4sD95GR3O34mPSRxiOq6Baf1pOKR37FhnMMyE97%2BUs7tL9gKhky%2FLMZr%2Fmll5Pyx2a3M3Y%2FMSxB%2FMI2uwc0GOqUB6fK3ZJQBxjngpaH%2FJ86efghb2AFN0ScXOmfWgB7vZKkBN%2Bii%2FdGn5srBmth2D%2Bo2U0x3bc8VHKNxFFVQXgL9O7gDkqBB4fKpBA5LCB8JB2ha8%2FKAQXzkgRozRHBHHaWfzkDqwTprImaEPxr0stfDYAsF%2Ft%2FjNRwZ297rTkkK2hZoSM71%2BD3ByS5Fsx2dAWM6UCIOYwjn1cASF3Ne9N%2BSpO0JF7yz&X-Amz-Signature=7e31843f31720d65e0a85044f90fe9f34d3a33ef5f1860b7e0fe0b6a3070dee6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PBUE3PU%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T183124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDXbQoNf9oxNDZldUyO%2FGNa3nQ5eiUZOfX4n8r5UV6MrwIgdnt6BuAn2DP%2FWDcWl2kNH%2FZYa%2BQTvfzcaxqN5eF2OZAq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDJLBfkxf8dZoajso2yrcA9cDQzrsqWcMJli8MaqSYGmNjnxaqLIXajunhayUHI%2FZBzExPxTpRtwdbDXEJe88uqHlzfKarAW%2BD7YfDf4GqQdjSN3FJk8QPD9sCrjl9DUU80YRpDHrM071DDFfKIxzUOPWK%2FnDjVfROfbMJC55F2Mr26cV5zSTE0EJCt451qElPORXr6CHTmG%2BBMJzvWEj39V7HDBGjLq%2BHXAGUmBgG62H6WsY29w8DIM65A2duQ4TUedaxy6FEQjf9JLiTcY4QUoTlzVbHtX2Y4euMamh4TAD0jVPr09YoCDDk0TguWn4c0%2F6FOr3bMm502lX08H7FZwgx7gmGnshiTTcJjF7bVpbv5lgQ02%2BzPRnjZNiCo7LooCVo5AR6x9QzhyNy9JMrUUnK7XyYWHToDG%2BEvY%2BOB07PvdDyoyjV%2BSVIr%2BwPoD6EExa%2BW9%2F3vi01uoips9J3CgQuZGfO3Si4mqu2%2BXnd1b6adIN3lmrQfPXsAPQ1HVvgn%2B4sp9Jf7GTsjrz59%2BvaAJxKQi1SNI5QK4ePqgVzk638KmN0rHc5zZfla1sTqPPJdil4sD95GR3O34mPSRxiOq6Baf1pOKR37FhnMMyE97%2BUs7tL9gKhky%2FLMZr%2Fmll5Pyx2a3M3Y%2FMSxB%2FMI2uwc0GOqUB6fK3ZJQBxjngpaH%2FJ86efghb2AFN0ScXOmfWgB7vZKkBN%2Bii%2FdGn5srBmth2D%2Bo2U0x3bc8VHKNxFFVQXgL9O7gDkqBB4fKpBA5LCB8JB2ha8%2FKAQXzkgRozRHBHHaWfzkDqwTprImaEPxr0stfDYAsF%2Ft%2FjNRwZ297rTkkK2hZoSM71%2BD3ByS5Fsx2dAWM6UCIOYwjn1cASF3Ne9N%2BSpO0JF7yz&X-Amz-Signature=81a2ce34d760ea6dd67bc7d11b7510308c527ba824a73bcaa3244ab4f72374bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QD43UFGR%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T183111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBoENSpCgzfQ8Z4Fyq3hgU9YnOcUXYbxcnqSz4cWLG7dAiBjmAOzhyGuEsom3GjR2nKqoDUvc1oPIEueKSiYCEqW2yr%2FAwhLEAAaDDYzNzQyMzE4MzgwNSIMmVAj3rx3X9jbIrqpKtwDAC1Mg62cRvH%2BfQQqtIi5sWOo3yz6tnp9BW1nu%2FkVLKzVpW%2B9zpjOEWYP7%2B5mv866Lt5%2Bvjy%2B0BwTOoCo0%2BATvo%2ByWM4GwcIvOgYjo3xufXP8CuWz41Jm8BwLfn%2BFoOTF3RGg2O4dxFUnnvFisBgcMtINHxx18ixIDm48Ikhuons3SDbBesmt3I86rsYponALMwcuCbg7zwhi3X68tEEiGSqmpcGzQBA7MBuTAPEbZMutWs0tyqQzUpSg5lr9LtxqchCe%2BhmmLfiiumxfZQ3tM%2F%2BsldBd7OPBGbTBujcZHqeOcYdu6qUDl80WwZ%2BAQXqQFbYcIA%2FnQZj7jQjjRxeCEWb4tkff%2FpwwVfsFKelL1%2BKVBIY7OFLDpUfGH1rDDU9SfqyZIv8gxpkZSRHbpOV8FMVv9qVI7pgy51%2Byl9WVUP8XFue7KyNaphunFsqBTWfpCSELDx9d24t9oZyqjBM8hW8r1r5pNlNXtslxRsYvH%2Fui6exQ0LWlaP86uC8U%2FPcjGJyU9ViLGsXKiMh9%2FqgI3nIVAao%2BcNo8JuScquJzqcV3nXEKbmvfFzfd601IgPoDq3s2fwjM9JaZjb1iEfi9YKn2tut7F1qeIcmBH%2Ft%2FpF6vfVStcLC9BuLMqLAwtrDBzQY6pgFn%2FYGv%2F2fNWDozclTcoaG0Ymvr3epmsyrWGn1qTvfkX5vsAkT0KbQ85Qu0Rgm6yMLifznNytNX5JgOTIjCVavopoVmLUcAR%2FJZFROF7tsLHI0lUE%2F3FFKR7JAxzxX0MQcn2%2FqBpT9ySeUufAhtvC2wHv1sJ2z6reZTGkPqtzhdlAaYWFotUpvWlkCIOJQey35WnEKVZZtwy6TeBsetZ9ePAJ1hLvit&X-Amz-Signature=0cfde316d9e63528c15f1a5ff76b6c3438ef176bab755a0e1008372fdba7980d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLMCWFRT%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T183125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHzVzGz5wy4gJbax1gfQsRgnEuQepbydX1ZWoUnNbWzuAiEAl2ORsg6SWbs0Jw6z%2B%2FdI1M93zL7aEBeVD7wnW%2Bd4%2ByAq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDL8%2BM7BnhBxRfGEdnircA44UEXB4W7cD2KqFj6%2BpUdGEkD2HYpOQxzo8ADGDfNl1S4%2BrAbcCsQ4dIQA5PIMnuHbSaZ4dCDlyFtcHm0%2FjM%2FBbYCQKXBDv83MnTZFSoLLeMWRNrziVxNQ8ou9eL8yl%2BomXWB4xfUX2mDzibr%2FGPwptFC46rhDmvxpLCtNPDSQk%2FdRXMsalrAy1jYdRNMVvQ%2FOvDtD4GfrCqO4EO0Ap7Fcso5cfw4i%2FBuDXozMnqmUZSVOHLFJGhzB2v3%2BeCXbPmZMNjdSfU%2F6PY9roNuIL1wYd3eXCQtw8NmAmPslyCwdXrCEMUf7uXRh7c7mpuAxQkuYtIbuAs0aPxCBGmZnd2pPTLKWdSrgaMRa%2FgFKhafULpV5gWcgMrz9x354ceyHksisHmzlr5KcX4SVfBX665llgm4N6LHLCmUESmCFbrB%2BPq%2Fg%2BK%2Bzeng0tvJPZ2ySK9lL%2FxgZvBgj7b9kxVxS3EuOx9C8RfZMhEa%2Fj6fuhaC60bJAvrADDTFv09ne53hDwEoNSvH4mXGswzKY%2FfzGxw0L8Gmur20VHmP%2BAXVE1Cl2CeEvFTdRPBg1YhXNDNWWvS45fR%2FHPTdZ%2BnG7xKSlGYkGotQ7dLJXdPlXf4aTyk3BjMRHEAzzSgCOl0Hz1MLKuwc0GOqUB1JsOFJFMwW%2FC%2FzKXxQ3iE2X1y1MqK74Cve%2B8yZ7RWToE4CuTbQfqBMZqcRBt3fmwZ%2FHkdz2ksdSD8E8fAg8KayGVSia%2B3lH0q7fRf22GhX8vn9L4eACcWMhABOc0pCnYYSuT9LZQkv7A4fDfQQk%2BkkZlb4abWjWoon1H3WbQyNsPJxMjVus06Kp5IdQDf7JW2aV6RrLvzDsQTM%2FZ5WEm0sm%2B%2BV8D&X-Amz-Signature=2a2226c0daebcb49419182591cabf8ce78e67f692dd18ba353625e60c30f8cb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLMCWFRT%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T183125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHzVzGz5wy4gJbax1gfQsRgnEuQepbydX1ZWoUnNbWzuAiEAl2ORsg6SWbs0Jw6z%2B%2FdI1M93zL7aEBeVD7wnW%2Bd4%2ByAq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDL8%2BM7BnhBxRfGEdnircA44UEXB4W7cD2KqFj6%2BpUdGEkD2HYpOQxzo8ADGDfNl1S4%2BrAbcCsQ4dIQA5PIMnuHbSaZ4dCDlyFtcHm0%2FjM%2FBbYCQKXBDv83MnTZFSoLLeMWRNrziVxNQ8ou9eL8yl%2BomXWB4xfUX2mDzibr%2FGPwptFC46rhDmvxpLCtNPDSQk%2FdRXMsalrAy1jYdRNMVvQ%2FOvDtD4GfrCqO4EO0Ap7Fcso5cfw4i%2FBuDXozMnqmUZSVOHLFJGhzB2v3%2BeCXbPmZMNjdSfU%2F6PY9roNuIL1wYd3eXCQtw8NmAmPslyCwdXrCEMUf7uXRh7c7mpuAxQkuYtIbuAs0aPxCBGmZnd2pPTLKWdSrgaMRa%2FgFKhafULpV5gWcgMrz9x354ceyHksisHmzlr5KcX4SVfBX665llgm4N6LHLCmUESmCFbrB%2BPq%2Fg%2BK%2Bzeng0tvJPZ2ySK9lL%2FxgZvBgj7b9kxVxS3EuOx9C8RfZMhEa%2Fj6fuhaC60bJAvrADDTFv09ne53hDwEoNSvH4mXGswzKY%2FfzGxw0L8Gmur20VHmP%2BAXVE1Cl2CeEvFTdRPBg1YhXNDNWWvS45fR%2FHPTdZ%2BnG7xKSlGYkGotQ7dLJXdPlXf4aTyk3BjMRHEAzzSgCOl0Hz1MLKuwc0GOqUB1JsOFJFMwW%2FC%2FzKXxQ3iE2X1y1MqK74Cve%2B8yZ7RWToE4CuTbQfqBMZqcRBt3fmwZ%2FHkdz2ksdSD8E8fAg8KayGVSia%2B3lH0q7fRf22GhX8vn9L4eACcWMhABOc0pCnYYSuT9LZQkv7A4fDfQQk%2BkkZlb4abWjWoon1H3WbQyNsPJxMjVus06Kp5IdQDf7JW2aV6RrLvzDsQTM%2FZ5WEm0sm%2B%2BV8D&X-Amz-Signature=2a2226c0daebcb49419182591cabf8ce78e67f692dd18ba353625e60c30f8cb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4NBEWXO%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T183126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCbgxbPXIpVzuL2MYWNxecl%2BXr020pRwJ9yeIWTOd1C%2FAIgWh%2Frs6BEynG4qGMJd%2B38e2%2BmWSPvXtEzG5uBXM%2FFuyQq%2FwMISxAAGgw2Mzc0MjMxODM4MDUiDIZQw96f%2BpEBq%2BQCDSrcA2vWkMA0WDEPaVts%2FjV7gDMV10mIOIeXJfzdW%2FGfuQFfBLX6V36UBt%2F%2FlRwVGG0an5h4cw0aHlcEviXEuQKB1iljwBEHLO0Eady8DBKf1Mi%2F9Tlynt2RnAjfe6AQpmI4A%2F9QT0HV58DFrPzWvGputkSszAlnt5XTWAxoBQ7zOXCMKHkhEO14n3J870Z2DIcNMeaEf2L76lgSYiSLZaG%2BKIEryiJ4y3uVzmGnhFrXjDxzxWNT2nFYtqCqLs0EvqsIfNfJQSqo3iTtvn8iU8C8xSVOzlGS4aS3IsbNxmlK0%2FmxQVQfHX4Za1VufPDrTTZt4flBVsnvlLdlo2IM8547cKW%2FlfqzlDcoDy3uIPW0q5PQeQK8tpMMnVNfoeOY1zcqKpiofciDHxIgpior4nCYNN%2F6jogQdX7zi4HJmypwlz5PZU1kFieCcZPHUClasnItHUus%2Fud7YHl%2BkD2vtEtQbTzi4WKn8hSXrKqQwCjeulPmy%2Fi%2FJui1hCYuYd9QqZ1GLdByo70m26gOdkgqpShbM1Tc6COqoc%2FZhq8n6vNcGwrIi1QjptW%2FR4AJw1hZKMlvLJ54ZuVUQndskqTjz3ZqzAjuAQiRTVrgWi%2BLU%2B0sAxvbsyWcCozD7ce2H4JGMKSwwc0GOqUB0SEBDRPxJkcHO2ni5AsgNI97xOey0%2BmRoegp9ltO1b3bu3hCvm0hU%2BnHruhaj9wh3WsNaKOMW1Db1S3OZZB3orMjGd4Q9ZlCfaO1Sc%2BKgFjBgx9gB6Yn5xbpxt8uNWGuuoupzNwa3BnlPzDw%2FsU3EzAQ1vGoEBw%2FK44tFQpg7OvY7yutoeRWkfcXkfgB7fPKzd9qbb%2FTorsecTWpL4hczwrtFsyt&X-Amz-Signature=919c2c8dfa0d5a3a96b9103fdd4199708de33370a69b3c3365f583fae3edd14c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

