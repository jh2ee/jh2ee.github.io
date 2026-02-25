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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3QJ5S5H%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T144822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCICkywxh4HxWEuU9%2BwP6FG8VVKTlOacjZAorUPCMz0weFAiBPXpPCK0r9WzMrKR9n0Z2SZY%2BEbAqVZ7yZ%2Bm9Zvogr7ir%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMLUGuRhb0EaQb2tshKtwDPLFvJ6oshqv%2BenMorkNXK0a59GA7osFu%2BHoGRbUoTNvzJUZrGlgx4ed5q%2BgNNb%2FBTtKWm6LTrvY0qEFL%2FOw0dRzU%2Bx2%2B5S90kI5QSYvnJqUm89%2BDXR7I0oJkMqczxYSicnrGUEo%2FGXLySklX%2B%2Bm%2BeFu4NfF1diG6HmGmhTgvlJiNFfGItizS8yulf1Rn45zn0%2Bv7AzCn0Pj32oCpHJIMfuk4u43OzwHNdDj%2FI41EmiS5qq%2F9%2BzkoqjTKRZ8MBnjR4jSIx%2Fn%2BniHwYUMYQP4TqlXZJHEzkAHlwYGJVHuKsMw6I851mGJ0g3RCxkNvUpvlxH3fU9VYpmBkaAXf%2FMbWHb6UxrA%2FU76IjAXBs%2BXMvojgXfRSajQW1pUKLvb6Kxd9v5UgiW5hPdcfpvupEI%2BMJMrMMpJzbO01k%2FjObO0XTKt%2BTcMkz%2Bz9yemJlY6RCjsHpI%2BwOSdL6N90UzVRNDIh8NaAbM8EIQFLCEn6LYMPjKqlDdaqQrO5gJPCUmmmOHNZVJDEvts1LcpTtntUZAIJfekIMYzz7MN2loTgOe%2FP%2BnR%2FTdd3TyivQ2fagFm91e%2B9il7lMA8MlkOcM1JLGYAyusgkGyN%2BgQCnICD8fu8UcIE6Gm7LNVyvYXV3ROMwhZP8zAY6pgGOti6eoSD0Pxp9HESiY6GY3hsKkJ5OrhB2SbvPiObkKtszWu2GeXMt%2BV2YzNTHZMoleqXc2YTuApsP0XebmY0HT1shljzX54CTZtdMmy%2FY0qUSPjq%2BKVDCZAHAn1rNyupGB6tY0ONvv5j7e3YdDrL4k%2BdHvIXXGkwSGjQi1VeLXiiO2j8gnP7TARMezTEyvDE09j3tUTE14wjCM1ZNVVLU3rLSZ%2Fz%2F&X-Amz-Signature=d5ff7f5ee80dbb7b3686daa40fd7f08d4653e7d56d4f2ac388ac86ee1fde8c95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3QJ5S5H%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T144822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCICkywxh4HxWEuU9%2BwP6FG8VVKTlOacjZAorUPCMz0weFAiBPXpPCK0r9WzMrKR9n0Z2SZY%2BEbAqVZ7yZ%2Bm9Zvogr7ir%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMLUGuRhb0EaQb2tshKtwDPLFvJ6oshqv%2BenMorkNXK0a59GA7osFu%2BHoGRbUoTNvzJUZrGlgx4ed5q%2BgNNb%2FBTtKWm6LTrvY0qEFL%2FOw0dRzU%2Bx2%2B5S90kI5QSYvnJqUm89%2BDXR7I0oJkMqczxYSicnrGUEo%2FGXLySklX%2B%2Bm%2BeFu4NfF1diG6HmGmhTgvlJiNFfGItizS8yulf1Rn45zn0%2Bv7AzCn0Pj32oCpHJIMfuk4u43OzwHNdDj%2FI41EmiS5qq%2F9%2BzkoqjTKRZ8MBnjR4jSIx%2Fn%2BniHwYUMYQP4TqlXZJHEzkAHlwYGJVHuKsMw6I851mGJ0g3RCxkNvUpvlxH3fU9VYpmBkaAXf%2FMbWHb6UxrA%2FU76IjAXBs%2BXMvojgXfRSajQW1pUKLvb6Kxd9v5UgiW5hPdcfpvupEI%2BMJMrMMpJzbO01k%2FjObO0XTKt%2BTcMkz%2Bz9yemJlY6RCjsHpI%2BwOSdL6N90UzVRNDIh8NaAbM8EIQFLCEn6LYMPjKqlDdaqQrO5gJPCUmmmOHNZVJDEvts1LcpTtntUZAIJfekIMYzz7MN2loTgOe%2FP%2BnR%2FTdd3TyivQ2fagFm91e%2B9il7lMA8MlkOcM1JLGYAyusgkGyN%2BgQCnICD8fu8UcIE6Gm7LNVyvYXV3ROMwhZP8zAY6pgGOti6eoSD0Pxp9HESiY6GY3hsKkJ5OrhB2SbvPiObkKtszWu2GeXMt%2BV2YzNTHZMoleqXc2YTuApsP0XebmY0HT1shljzX54CTZtdMmy%2FY0qUSPjq%2BKVDCZAHAn1rNyupGB6tY0ONvv5j7e3YdDrL4k%2BdHvIXXGkwSGjQi1VeLXiiO2j8gnP7TARMezTEyvDE09j3tUTE14wjCM1ZNVVLU3rLSZ%2Fz%2F&X-Amz-Signature=d5ff7f5ee80dbb7b3686daa40fd7f08d4653e7d56d4f2ac388ac86ee1fde8c95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SFPRBYM%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T144822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIDZxMlWoYFPSSgfDw2lPasvRkDY2KBUrA1nO8QwGokrKAiBi9FCokx72SKSObkjFbxy13YXb32OZ24xgwdEUdubwMir%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMi7mmSjoX6k9VR1PGKtwDOoiJreZI0G2Od9a9k9gN0XlUR14U86ANs6nTf2lvxfOc%2FnZ86B9oLwW0FN2P5EPraoP0evCDJq7APt6gqJxeh2DNwzNhi1eECyrcVD8nJM3z6XevxGhtcinyhAmhP7Z4oXUrA9xi73Ex4F2gftB4WZUpdIwafHUHFRd233%2BHGcgtDul6kIDEcXH1lrPhKytJ2%2BOiN0V7%2FX1b1UcpV6LBHuP2bDGNR2bAaOSj8w5QSUOubSzlx2fbxJraCIO0dpbIifcGY%2Fecc8NlLi4aqaDCEwP5xRFrei5%2B%2B%2B2Te%2FBNaE8D0xUliiVlUCgyteanYrp8eUQS19FnsZSfLmbC7m7GwluRI%2BQLQ%2BfgZ8ZInidnFrHitS3Vi%2BycVEElWQzRab%2B8D8RTt6mxmrNyot6x1xezqXEWNGIjryOk%2FRAVErd6bL7ImY2OcVBiYupPu7H8Ap1TQ1ZIfzc51Vuahi371ZZvl87eouAa7q8K%2BkbCir%2FW2au9sdaJnMzluz9karhoyuakQdqyevwiqwOQnHeXfVjAvRjfmxUtntFdM%2F8OhOxca6xXhpa4Rm9Ue0H3NBkhSVNWxC4rWaFjtGFmjBv6fTYHV9apulOjwEXH%2BTFgGYPoLdQjk%2FJUSuL7lh1%2F%2FuEwkZT8zAY6pgF9OWNmgSUBCspG8la7V%2FS%2BJ5IAB7x6fc0SW2YcolpcHTfoPUUtapCgZ7%2FfCeucU8MoDLUPKM06eaXPXIXpfxR4qW2uQMXRTIrP1Uo1PYKtYYjed7EYU0NkEBHe4fbGxBG9XVz7QwIuvomlzYElSMmZrVSxgodLUsPkkYy6QguZOkLFQ10aBYzE%2BM5Vxa2aq5o95NDLE5RuA4tQL%2F7IVOS0vP9qftmP&X-Amz-Signature=d3d847a6375ee5db2f75c0b5c9528d84ac4ca19a61e205e5ae4ee8e4f0b350a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XV7II4RG%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T144824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIA1wcxmRcUzqWBlTt3ASLCun3Bs5IePGPgHROtS7MoBmAiANv44e2iTWnPn3%2Bedoox%2FV17rE%2BDNN0xH5gwG0NBtMbSr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMZER%2BDbhJfmycGAxjKtwD76pYmaD%2FdvratIqpuNuYqFIxqFwMZA8HccSv2mNHKV0HWRf3Sd8edoKOxognn3vGWA1H2QH6qWfMbL1b5BTbyUC9SKEAqUAnB3fNVzZ860h2OQzXkiu3j5AG6F2oM%2B71TORfuSK012RjAE6M8kKvxLLxBPJEFaIemvU7tuAwRGbV55Suc%2BeJdBdT3VgAjLUYCS1kxXgZPedBFLKZxbuWl6a6dRDvTxjL8XcjYe5ftC0WovHbn2DWlpfHRKdGJw8cEDZQjLZYZgT0IPC9J0q0FDgcJ5HNKRFD29RyS7eGNvuGyB7Rc7IK%2BcgkVowxEMFWbmo%2FDJCdtwMgBjOX94ytdHJ88sHB62sdlGGvyA1lcXcLxUoW9FdX94KHws4UOyVD2F6GlHQ%2Bw25ShBlu8Lqod3IIZl2pQLJroC0xgP8Y0eHqlKV7VgYVsXruD6wY%2FfZAf6jJX3MUh3LnQDbbuB6giYD5v%2Bu1xc3bgHp9Hxwtt%2BqcjBdZc8DOj7Zze1mYvE3ju4inb%2BqUAp9XJhasMrHxKIP9iKElRSHZF9ufh79ca6nZkNeL86w%2B5plFtsYqmW8QletyC3DXaF7UMNo7JL3%2BhjKgZtK7YXx80RnfIBLbnImJ5qAzF1zYqMZgdrUwx5L8zAY6pgE4dUM5Y%2Bpqf%2B0A1yhjXCoezYBdW%2FIKZWONM2u6SxOvPjRA0Grrr9l6O1z9pP0Q50h0ubI1whsSNSPj3pNO0KsctXhDojG8oeXO9MSyv%2FqjKfHg4MQwo70c5PcdhzCN1C0iq76s6tRTTLzFnxWPc%2BDxnH9X9gH9TY25TJftOHQKv7qfO8Lis1ASsETxUGUKo1%2FAFDBRJK5RvpD5PLG4OO3NsrEb9Fpw&X-Amz-Signature=520ab74524c945f7687eb5cc393ea9bad6e80320a602886d441d536a2a9ac597&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XV7II4RG%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T144824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIA1wcxmRcUzqWBlTt3ASLCun3Bs5IePGPgHROtS7MoBmAiANv44e2iTWnPn3%2Bedoox%2FV17rE%2BDNN0xH5gwG0NBtMbSr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMZER%2BDbhJfmycGAxjKtwD76pYmaD%2FdvratIqpuNuYqFIxqFwMZA8HccSv2mNHKV0HWRf3Sd8edoKOxognn3vGWA1H2QH6qWfMbL1b5BTbyUC9SKEAqUAnB3fNVzZ860h2OQzXkiu3j5AG6F2oM%2B71TORfuSK012RjAE6M8kKvxLLxBPJEFaIemvU7tuAwRGbV55Suc%2BeJdBdT3VgAjLUYCS1kxXgZPedBFLKZxbuWl6a6dRDvTxjL8XcjYe5ftC0WovHbn2DWlpfHRKdGJw8cEDZQjLZYZgT0IPC9J0q0FDgcJ5HNKRFD29RyS7eGNvuGyB7Rc7IK%2BcgkVowxEMFWbmo%2FDJCdtwMgBjOX94ytdHJ88sHB62sdlGGvyA1lcXcLxUoW9FdX94KHws4UOyVD2F6GlHQ%2Bw25ShBlu8Lqod3IIZl2pQLJroC0xgP8Y0eHqlKV7VgYVsXruD6wY%2FfZAf6jJX3MUh3LnQDbbuB6giYD5v%2Bu1xc3bgHp9Hxwtt%2BqcjBdZc8DOj7Zze1mYvE3ju4inb%2BqUAp9XJhasMrHxKIP9iKElRSHZF9ufh79ca6nZkNeL86w%2B5plFtsYqmW8QletyC3DXaF7UMNo7JL3%2BhjKgZtK7YXx80RnfIBLbnImJ5qAzF1zYqMZgdrUwx5L8zAY6pgE4dUM5Y%2Bpqf%2B0A1yhjXCoezYBdW%2FIKZWONM2u6SxOvPjRA0Grrr9l6O1z9pP0Q50h0ubI1whsSNSPj3pNO0KsctXhDojG8oeXO9MSyv%2FqjKfHg4MQwo70c5PcdhzCN1C0iq76s6tRTTLzFnxWPc%2BDxnH9X9gH9TY25TJftOHQKv7qfO8Lis1ASsETxUGUKo1%2FAFDBRJK5RvpD5PLG4OO3NsrEb9Fpw&X-Amz-Signature=12676cdd1ab5c8b986498a1b9e8ab7ddccdf690efc4c17871748b9230950434c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667P7JGGWQ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T144828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQD1c7oy4c9SIuPwAYh1sUsveFgC2oClCmdtuIv2Fc2WpQIgG%2Bvb%2BKSKO043QSXozfX%2Ft8%2FR1W3ucAj20J3qGq1UWSsq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDBhddmV62rb4wetsrSrcA0uZYCvsIV%2F3NXRqnBOdZHHtNLwe166GXVsedWGHhi6q0n%2F9GTYZFNqtT2b2dA7vv13HE6S8E2%2BNAuh0pJTpnxAEnPJSBJeum88Q4ub5fgAcgfvEqgH2EGX9yrjB2PE5BtW%2F%2BbQeMs6JVpSkR5OjAYgOC9hnrPb8XnhFXqNtN%2BpokcezDz8ewIaC9Iw%2FVb5U0FBF2R04yooYfZ%2FxHSwuAX394sZ7j3%2Fx2vzanlAPCs1HRIeu5SHrWTVrj%2B4T86H50bGS4b98jxkTSfPvdxyGZfp5MnXMvTrDjcNGCy0NGI2O2CO84jynyyXiIMhvNoIASmZ0R%2BHGIMRHQyZn%2BYtiUViV70QqulyVklW89m4IrsiKfAXv6InMWcyNaGGh7Fvfw%2B%2BkfNj%2Fymdf53w6jNVRRwHOWf7AABWauZewOoFYW2LVrZxyo1UYlc99CHjpriuQVQeu5MgDHdpTL5MqQdZa7BtsAYPDO0Ygew%2F4Wext%2BM5H7jXkk41r%2FZoXNO8JKtrm3J0AflAtxxbuh58K9eA4Oeg0YK%2Ba%2Bv6WNdE7A5A%2BIjkp7GGgmXTd8YQlGlpWLJrUiLjFm5D4KCHeqrBfIktSBGilKkyKTsmB0d0MpyvC%2BkvzKSZumVzsTuUItzCbMOKT%2FMwGOqUBQioUl%2BWecN5euVtUMXGro1io3zxIgvnA3%2F4y9hTzaQ90DzMlP4zCkdE3lmMAraDC2vCNYF%2FcDYzkMGiZ6uP%2BzYpD0QS5IF%2FCVoiaeiGa9%2F3XJ7RXmcXr5lsEDTQUfbQ5%2BbscjOlivwMYtHhykS1%2BmEY4KrUxCiSpDbdnQZDS0bKPA%2BiGfiWnkrDgHB6MvANzd5TngMNz0mN5%2BWjCwEdoSrOClL0X&X-Amz-Signature=ab674e97b82adf024353d7a88d752a4bf25c36808dfeb5676bc6e5f0a1982682&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VBHCJOA%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T144828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIGiZIVSjF1BKPZPUbjTrjzgHOQgb%2B7ZmcbMeG8pND1%2FtAiEAoTnUsVegTj18YgfFCx8j1s6hA8FrF9JSo7GaSqC1kyMq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDHCSwtJEAiJowBDteCrcA2w2zmieW1nXFWqiCyOnClCW9DX7ED7TWTc6FDAO%2FzbU7n%2FPEMMRT13cWKo8Ma3ASpNNYTrbk3fVAqns4bL67o6MZFvUebAJkCMCeLti5G1QZ9ww16uZ4tYNfNTv2q2uPVAlopTYcE%2BcYWSJzE0cH0SMXciWA3wz%2BC8le53ksSTXFAbxb1uoJEAgrYR%2FcEmMaAq33gcOpyTJoj9zi2JLnwICDCPjSEHEx6x%2BQa0GENQzmC5IafTJVrISOiZOD54KFIYr2E0G7n4Pn51SEfeGtZwBBoJdhTJGNkt%2B50EYHffaSXBs%2B4NgUBT5ta5mMMSHgzAAxNNm1yg%2FkJOaO%2FX1IzuG2CmS0MFz100EEfkfsDZGttbnUN6vd%2Bn5Dmel9vcWScYOBPOCUKxYzsGGb9u2nmZTduOPIIPL2aDLlKgGpwZLn4CPWQ%2BgtQA%2FBmax9z1gceZ9LA7%2Fzc0nfAZY0FrrcF8uWOcuOTi0CMx6UqqbIQnE7s%2BqDv1%2FjRenOWJK4k9inaSKV3cMSHIz1gzXpdisE%2FaRvmNuS6Bee4AU6xwO%2F369F3%2Bygr0mCwRqzdPQoHLdJ%2Bba1ewJwWx9o6Q%2Blc%2FzUfZGRERHnl47YRiprgxsEiCqwBSptgjqzhjHeGmRMPCS%2FMwGOqUBxTJNTBixY5kq0Xy%2B0xBjU5Nqs4PZL0%2BkyXEsWbrhoHxOrfiR6AIwDaWTro2tB0ItIu5uE6quc4qEGL6js357HQHegeVXgeG%2B0lESw0l%2FhpBh0LQTFZBPgW2uCT7aIC7i0s%2BJ0ffzDNuF4P7tS0prRo0bzWMTWedCjHpGqyAH9bWkzBLtepBGbRYBdPIBnCzMzrMmIAM9P2u%2FysOvgUnDrDpFHPJw&X-Amz-Signature=bdebd9fbd55fb0c512a146e2ff1ac423df9ea9f3cf89872c6b07673a5aeee9d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RESHQOXR%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T144830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQCfHcJfMVFBW3p1JWq%2FW0n8JisW8Q6TXxuHbphI5Lk9JwIhAM1BV1d%2BvLbjCQ3iECXNf6EwnkFxh%2FJGaF4UKqotSms%2BKv8DCBAQABoMNjM3NDIzMTgzODA1IgwRO%2FoIdhFNyHxY%2Blcq3ANCKDMUJQiY%2BNR4nYSEJbehOK1u%2FZ%2FtnS0qqohewRTIEsfr%2FyUJC88tBYc%2F6Zycnlly90dkEauwnSTd0ArZmkqz36UB7J3yFj0cjtHOiznJvYalaCDj3bzftDegWYfElFkghS%2B8Ost3I%2FXhmSPKuC9s3cgCT6TUTP9vSA%2FEKsienaLbQU0dBwzHFFfJ%2BB6FaK%2BIIJMP44WW5H3I8FD2x%2BS26TRVQGo2Xlc%2F8IZ3FspHqKvYT4bJ2nh0yS6ufQpJYvvvV5UTxO61yCxp5aNryhXyS8HFfgE5phmhx1wGRkv2Pa6A0g46iKlOAdPwWMLg9rbUFLnLtuROUMMyeycg2MQN7hgQok2u2AlveN6Nqa2hqjR6skkKpsMolGZnhNU5VWPmzjqANC8WogCaB6spT0tUFgmd%2FOHnDlkCf5yIFqDdrO968ae8MJV42Kn9MgQZ3OUsDZvUOHTSykWu1An%2Fk%2F%2F2EchSorPKDriKNKTprrMBWiy3vrotEEQVodXyFZVt3DiCeXwcw1geaGChgKU9w23xiLV3nnqfc%2Be6aQhHCvHZx9%2BSpbbD7yeALw3YLJcqsGtSk2DW6poZ4O8g2Ctm49oQbfYfVVHWzZXrQkPVPoWuRaORE%2FJ%2BJoASgWkTqzCgk%2FzMBjqkAarzHbhVj%2FFF1uTcNNUZQ%2F%2Fbqconj7fS1kWyY%2Byd7%2BCNbbOj9lbuw7jCR%2FBokxrOgIho2jBCmOVY5Z3yU5IkCodPSgJwfbvLvh0hkDPnh%2Fff4yCmd%2FsppxDIoTi6ZTS92Ep4zuT6MclrG8RlvI15HmnpmOUq%2BcYoVrg%2F2W%2FvILHhvg3xgdzfio%2Bnv%2B5XqZ2taPNH0pJ9%2Fj1DCaKRtjMe3hrk7Br2&X-Amz-Signature=30f4e9fa1b8f9713aa51bb62e4cee97f50ca5065e902741bca77f4b829b7241b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJXIFH5Q%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T144830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIFy6JDNTIGpQqdxpyIfFPeXW5UAToWINVrSDy2Dy8yFYAiATUFcoy4FuchyymUpaylvAHytlrUuyLRj1HF83qLlEiyr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMMQdmeXAS64UzjvJdKtwDAwCyKIwENHqSJ8EvHX%2BpiorpRTX3WDmQS0GkJs1zQdAzYUBKrvyNJzzgCLoXCI%2FdtSALRGWOY%2BFV2sdoE5UmFxYP%2BR4KwcAliWdQjRceUEZ46HAzoS9E8lPnD7wR%2B8%2F9MW0ap77lHDDXRQrJFTTn%2FBC67eJ%2Bo3WqgJOqt%2FEesy2LIqFqLtf%2FsVuq8JdoHckC94zQPftBhcJ33tvgzkZ1AvMTcibsNP9hTdZS1TpLni6UwOblCgfMk7PLz6u3KeWmohnWh8KJv10pLvVcpzlRJeYTIw0s7IE8ylcKkOuS3msSy96dY%2BFMxqgARgujlTTPDn3uDqAfoPw1hOiR%2FqpPJEPo%2FysOa%2ByzF79xSR1YeoTzP4QfBXj8gwCDrX9yXkk44muANcQ8rpLOhwpsnpogNVRmAH%2BF558fmz%2BxhqBAZpzRRF5t2z92ZDoW878jiLsYKWjgHFdO%2Ffn7vC44e%2FklY4BvELH2nej0M8UWAqizxeaKknw1fNQpYOxsJGNQPsoUx8SyNYOALaD%2FnaAo7OG4YbX6OQcgzIzGCGcLgBFfw7XTwwHBM0flOzni0h19gHKpJuI%2FjbsSUsTKaduJPluDS%2BkqoZ%2FONgW1NyPNyOqkWivbY9SHJooRzBawHUwwj5T8zAY6pgGoFyCAPaRYgBQszNnAl8l6ZnbYlpoY7jnfx7ejAbI45JRUvZbf1EEncH2tgGGPgly1VYE%2BJP1Nyt8ZbrB4MPFNH%2FC1%2BhbY7fqt4c8WycHnm9bfZ2rQI6%2FtE3GQlgBO2ZR2u9Gb8%2BWCVo3sozS3yAKPCoZ4Kl6%2Bi8nx8KzEU0kiHEtMiWVbx17ldH2FHCCgsGYEkIOx0AGezQOvo4bc%2FaS1T1fOCUA5&X-Amz-Signature=9b0eba2bc3148486be2c112e272116c71ec08f3acd3453e6acef74e43e50d8d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJXIFH5Q%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T144830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIFy6JDNTIGpQqdxpyIfFPeXW5UAToWINVrSDy2Dy8yFYAiATUFcoy4FuchyymUpaylvAHytlrUuyLRj1HF83qLlEiyr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMMQdmeXAS64UzjvJdKtwDAwCyKIwENHqSJ8EvHX%2BpiorpRTX3WDmQS0GkJs1zQdAzYUBKrvyNJzzgCLoXCI%2FdtSALRGWOY%2BFV2sdoE5UmFxYP%2BR4KwcAliWdQjRceUEZ46HAzoS9E8lPnD7wR%2B8%2F9MW0ap77lHDDXRQrJFTTn%2FBC67eJ%2Bo3WqgJOqt%2FEesy2LIqFqLtf%2FsVuq8JdoHckC94zQPftBhcJ33tvgzkZ1AvMTcibsNP9hTdZS1TpLni6UwOblCgfMk7PLz6u3KeWmohnWh8KJv10pLvVcpzlRJeYTIw0s7IE8ylcKkOuS3msSy96dY%2BFMxqgARgujlTTPDn3uDqAfoPw1hOiR%2FqpPJEPo%2FysOa%2ByzF79xSR1YeoTzP4QfBXj8gwCDrX9yXkk44muANcQ8rpLOhwpsnpogNVRmAH%2BF558fmz%2BxhqBAZpzRRF5t2z92ZDoW878jiLsYKWjgHFdO%2Ffn7vC44e%2FklY4BvELH2nej0M8UWAqizxeaKknw1fNQpYOxsJGNQPsoUx8SyNYOALaD%2FnaAo7OG4YbX6OQcgzIzGCGcLgBFfw7XTwwHBM0flOzni0h19gHKpJuI%2FjbsSUsTKaduJPluDS%2BkqoZ%2FONgW1NyPNyOqkWivbY9SHJooRzBawHUwwj5T8zAY6pgGoFyCAPaRYgBQszNnAl8l6ZnbYlpoY7jnfx7ejAbI45JRUvZbf1EEncH2tgGGPgly1VYE%2BJP1Nyt8ZbrB4MPFNH%2FC1%2BhbY7fqt4c8WycHnm9bfZ2rQI6%2FtE3GQlgBO2ZR2u9Gb8%2BWCVo3sozS3yAKPCoZ4Kl6%2Bi8nx8KzEU0kiHEtMiWVbx17ldH2FHCCgsGYEkIOx0AGezQOvo4bc%2FaS1T1fOCUA5&X-Amz-Signature=832d4bff1c0280cf5c0ff47fa95259463782eb0efb3adebc331a6161d84508ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLE34QQ3%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T144820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDd7N%2F%2FJ%2B%2BCpAJTP%2Bo4I3wYzuawwzhydSOGRHwnBo54iQIhAIOqwJE%2Fq%2Bo8QkUYqItwQySfH8Bks2m0yRZUiWVxaIsGKv8DCBAQABoMNjM3NDIzMTgzODA1Igx0X%2BiAlxuRTyZuySkq3ANxppASqQIQwUM%2BEELr0KOu7cEiPgyLXq9veeUiGigt2RRvAzij0N0eHllEZen5D39KjPyEtW8fDGJMslTPD9nc4NkrP7jOqZxlN%2BQWpv7Rml%2Fwpieomaugtpb61SLUO4eG86vlvxoexnyzYuoEZiv%2BDdl8if9Nh7HFzTrl6skfVTVB5MIew9prGl5DExBlC7Z0jDWQlIfXeA9bRgLG%2BObb48qtlFz7xWzqpe7MVgb98TRwjcfS9umi6YAOgN80A37qniCHZQ3%2F4LIG2PcwnUBk%2BhDaQoQN0YlDvc4pgPgZfJn6LULV70emLNaBXmDWZthmgu8Wbb6oMtenUUb%2F9yR%2BiRqsRZsx2jWl4GUpDHWl%2Fi3vh1d0ng4YvqWMy0SAKECX9ZYGxkRmrn2g%2BgPi86qcvquKkf3AGC4MWTIDhc0VzhJGMPIn51tTBoikj%2B%2BBLW%2F3I4Nf2WX62yuvrxQIlDUpWWEH9YFFklmMFajs5H28Z2X5%2BOnOSkXsPbw1rUlJ301JXsVLuKgEg5Ty6Pfu88OjmJQpzaamdlhER0mRHocqVr19zU9Bdpd%2BI7x7D8sEN7%2FD9wOo%2FqtwS3XstzjRwxIE9mHucttCfKKkXg5iNGYAQOHMTnXfvTZQ%2BFXlYDCBk%2FzMBjqkAUvVHdoG28irwiKdKatfLAxP1V3rtzwptUuNTjVKDEaSk8t%2F%2BoROpM2ZhH%2FBYe3%2BBo0B8BIVFUH5JRoMVARPK2Cw%2BDNnd4vrEKAs7IssndKjU9X0r%2FluOiCWKmiG4lHpm65rQtOqKF1y3QOoEP5fk3ab2E2YdfejCEEdYiQgYXMUrJ5Xjg0Atk8iiiLk2BU9SfY1m9cWBg6SbVR6zFgyBH6Gb37m&X-Amz-Signature=29a9ed36535df919a7d5c93d28cedc607947b655e1b84cbcf45549c63e09650b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XR4XO4AG%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T144832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIF3BV04y0qGaN1M3UZdVePto4W%2B1TCbUWt7H6pHWDgbZAiBDwiTiPUnnzuSoGh81HPqBYEorLLUos3LyGoT%2BgwlZaCr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMk6cVNqia0lrBJ%2FNkKtwDkFpSdSvaHg4WQ1wCKTHxhwpN1UGmrNKj2SvvQqFAPLVDZHxtxLISI2CX%2FMvebF37eGqRgxWqaizmjE2OqrJ7ZLFpSbQhwnUoDrhGDHBnRkrQioqhUR9mpr6utA7tEw7qTrHI8mPYg9tYdNEWsg6jkCNZ3if7%2Bnch0nhf6XQroJMR1mwCw%2BfuyUjJjNjeg7tjgWiN29UfdpmS2q5t%2Ffeec8VOZo6LceccU3i5xKd2lIPtnerQ836xMQILpIXHuylwwepfTPIQweTnT8pFFb0MvV98vU%2BzzzvhtcWwCMY2H6%2BTjZAJ%2BWtiSiXZA8%2BRmNk8zp%2FLCWsczzK%2FtaKik2K%2BSbsyk1kIxLOY5fmhY%2BYjvyfqsuHctRe%2BmvcJY%2FtyWt6KABqfov6sDiZbjYrcH3xQRDpmaWUQnpGJOgtbW%2BWCOnjxmYXlWp7kRBf%2FNWdCgpHCO6Vz3boCJIF51qlbldpK7hBrz7lAgMlFwK6QBGLyF6lcLN4JLwBgvZ3vtnndbyvx4xWQxH7ww0sa29kS66N7QsobXcFQz9PIgOIWpzI8B6tlhG1ROELixACmqvrEuzFeUWYyeluwyD9HT%2Bd%2F8bOTF96UjnUt%2FFxfnmjR%2Fmwax4r44B0%2BaPGOAUx9jXIwjpP8zAY6pgHEKJvLURxO9XdNqyUafvSpE%2FUBrvI1w53NlTsX6kpjNWi0UtQ2qclgtpnlEQiGlWogb5fuqcIkd01PaFmKqff2nd2ar1kJBh6lGb%2BOo7th3SHVkJr%2FEcH%2F%2BNfRjuXH3VnS%2F8JqopxQUx2AxDPe2vOv3duTnRAYaYvcpWzTKmuolVB9m%2F1IlrTlOUZtoLdeZAvEJMtsXflPj4Np2wDFCQonsGPf7CCm&X-Amz-Signature=37345178264490efbe8504e6fc8750c8097130fcc75ad7e2a798b58f6136cb08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XR4XO4AG%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T144832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIF3BV04y0qGaN1M3UZdVePto4W%2B1TCbUWt7H6pHWDgbZAiBDwiTiPUnnzuSoGh81HPqBYEorLLUos3LyGoT%2BgwlZaCr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMk6cVNqia0lrBJ%2FNkKtwDkFpSdSvaHg4WQ1wCKTHxhwpN1UGmrNKj2SvvQqFAPLVDZHxtxLISI2CX%2FMvebF37eGqRgxWqaizmjE2OqrJ7ZLFpSbQhwnUoDrhGDHBnRkrQioqhUR9mpr6utA7tEw7qTrHI8mPYg9tYdNEWsg6jkCNZ3if7%2Bnch0nhf6XQroJMR1mwCw%2BfuyUjJjNjeg7tjgWiN29UfdpmS2q5t%2Ffeec8VOZo6LceccU3i5xKd2lIPtnerQ836xMQILpIXHuylwwepfTPIQweTnT8pFFb0MvV98vU%2BzzzvhtcWwCMY2H6%2BTjZAJ%2BWtiSiXZA8%2BRmNk8zp%2FLCWsczzK%2FtaKik2K%2BSbsyk1kIxLOY5fmhY%2BYjvyfqsuHctRe%2BmvcJY%2FtyWt6KABqfov6sDiZbjYrcH3xQRDpmaWUQnpGJOgtbW%2BWCOnjxmYXlWp7kRBf%2FNWdCgpHCO6Vz3boCJIF51qlbldpK7hBrz7lAgMlFwK6QBGLyF6lcLN4JLwBgvZ3vtnndbyvx4xWQxH7ww0sa29kS66N7QsobXcFQz9PIgOIWpzI8B6tlhG1ROELixACmqvrEuzFeUWYyeluwyD9HT%2Bd%2F8bOTF96UjnUt%2FFxfnmjR%2Fmwax4r44B0%2BaPGOAUx9jXIwjpP8zAY6pgHEKJvLURxO9XdNqyUafvSpE%2FUBrvI1w53NlTsX6kpjNWi0UtQ2qclgtpnlEQiGlWogb5fuqcIkd01PaFmKqff2nd2ar1kJBh6lGb%2BOo7th3SHVkJr%2FEcH%2F%2BNfRjuXH3VnS%2F8JqopxQUx2AxDPe2vOv3duTnRAYaYvcpWzTKmuolVB9m%2F1IlrTlOUZtoLdeZAvEJMtsXflPj4Np2wDFCQonsGPf7CCm&X-Amz-Signature=37345178264490efbe8504e6fc8750c8097130fcc75ad7e2a798b58f6136cb08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUA6PGAI%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T144832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCICULEgvrYT%2BhzJHW9YlqUkxQuZXt%2FvTfsNtd5I5zDi4LAiBfaGsIl5%2FmEcxz5B2ZVuGmzBdb%2FS%2B2JbmGalOlkIEfxyr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIM8XPlJoSj8YJ0XDprKtwDfxsYP2gSz8wwVhqpnmCCagV1uE13s0fCny2tgpP0GfUg%2BK9aAfB%2BH8dYoiIZYDXBzW0n3azwJ6ckPrVP%2FVDTyPOKfa08RGGCOx46tibAc9DWMx8UlrrpWGZW8qDDJRmQdXojmWv1WnEUK8R67CIhQEFS5q5j7Dnb2LU%2B4oYSaC1XyoAj2xFGVj%2FAb38DXpQOr6QljBrr9yvhkTonTowM6rtJPO9eKbVGSNBEo9rCob2qq6t1QJpr0KPewmF0o9OMnHlkFHW1aExktFaj1CLZGbVAmswOTET0SDpAW4CLte2kig7CGG%2F%2FQaDUjaF8EGlsZd5d1uh1UVBFuQJcZBDNZkG3SrqpRSe7hgeAFDRAwkMJc5synuUy%2BD3i30BGoN51WIlBqG7vJQamHK2HE7w%2F981vAG950sd%2BRnwNXAY6RZemAdzvn1a2%2Fwk9WTOwJpEvJBRx4CwCIRhni4pq6D5xZp67JspSncJOZY3I1NfzmjvxtSvXR8CorLkwi2cG4fmpdB7Hh%2BigIqOnSGpYlH0KnZ85hPwcyTDLOecG2qOlJFsQaJJClzxqeUm8upESeqcjP4a4yRX%2Bt%2BQ3JED%2BPhOLM%2FcHw%2BYo%2BiUPgaMZcJiV39VWgxJJDsZQ9zElwkkw1JL8zAY6pgGa4OqZRZwV%2FZac7dMOlLAlCoWwHNfG8rZGatT7Hyjid3%2BwUiersey39DcteHjLs93i8ShGyyQPGdBC1wA5FZ6zbmSKkv1Dj2pOuqzUD2m0f%2BYeNnFqhZTKtpuOZGZmkknVHV4FTvcdXr8w67gHJ7L7fe3I6qLOcsMJsvouPLVhoPcVrpr%2B834YYODR8f2AeXP13JDHYSmBEBY1Nrp%2B%2FY82ZD5C3G%2Fm&X-Amz-Signature=4fef78d5ce95b7f2aed97793ccb6c8dcf1bae259df1487c6ab5a3712cd89213c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

