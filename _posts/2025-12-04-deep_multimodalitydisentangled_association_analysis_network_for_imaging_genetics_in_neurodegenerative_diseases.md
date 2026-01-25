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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HGSEIYM%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T150116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCRVhhQOtdR2JM%2FnMojd6U31zs%2FXWtmDjh%2FqSoL152mpQIgPivcw7rHQvrZJtYdLZBqv%2FS6hI8BwwM6RFOea7yX%2FUsq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDIbAQ6M4B8YHn3%2BUHCrcA3QAxYiGgQG5DxVlAYpCTK8aSHWf0oOyv2jnTgT1L4pJjYVNDtK3uPyoAmpsPSWlWSKuhM0roxp1Xr8EBNSqc7MumSK0ydmF%2BWIVzl69ArqPLYONBZUv0NU6swKTJyWqCj9gZDQfgtqTbEERPKBuQfnr3lEfoLXXOhyV6nORYbrjQjbcnn%2B6tnBBtztYnarcstp9FHYHqJ9s%2ByLtUPsJUjlTJIuQ8acsPqssxKeL0E4BWnWGdwUdsynP4nGKv3U%2BrruvsJ0xs1usLu9d3bDeQDag4VUKqySxbAocRqTkcM6KK37q3ubK1WkRfe841rvr7gDfdvfNPaTcHcBBezZr%2BnXC4KD97vtmlLs%2FAVbyEP0g6nX%2Fm8VZvNyWBB5l8CBaUA%2FSufbHkJysdH5B6NY6qSKFnHGVOrDzvjl1JRN50V8jAgs2oatT0%2BjZ3wJkZGIHAH9P3bbOeTvp2c4pGNYF0inC5BXyL8CfjdaXxy219kjm4FsDZ8hCi9QDjAyQCbBSnuWi1swnlnqlPSIfpiajQv8oBBuKL0l1A8%2BJgjK7kYHYSDOX5xWwxPpc%2BAZLJDch89rTbXKIHIAwLVBc%2FES7npszR4Bkq2gCAiV1Mt5b1tT6AWk%2Fq6Y2ES4X10beMIrJ18sGOqUBE3nViWvizwbSLN0KPl68D4rZ2fhlZIRWT8o67JnEa9o2U9ko2M5lBzrqKhSZL2UtUrTSJD6LLYmZ6yga2VywLVAPmI8jxcZRHTsDaO0Ope9byXlN32DH2%2BcLGGcdpqxzGnvPheAyS7XOVQqKcTBAXGuNVvQ5s2bDSCnv1hHqJxDTz7%2BlD6BdpdXyq4FIfDt1e2oSI2Q1WtucPWd%2BX9MwYaJDRrkV&X-Amz-Signature=136d3da3681a76f316de461950bbb43c98e1e48ff3b6994fcc2ca23f001f5b75&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HGSEIYM%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T150116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCRVhhQOtdR2JM%2FnMojd6U31zs%2FXWtmDjh%2FqSoL152mpQIgPivcw7rHQvrZJtYdLZBqv%2FS6hI8BwwM6RFOea7yX%2FUsq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDIbAQ6M4B8YHn3%2BUHCrcA3QAxYiGgQG5DxVlAYpCTK8aSHWf0oOyv2jnTgT1L4pJjYVNDtK3uPyoAmpsPSWlWSKuhM0roxp1Xr8EBNSqc7MumSK0ydmF%2BWIVzl69ArqPLYONBZUv0NU6swKTJyWqCj9gZDQfgtqTbEERPKBuQfnr3lEfoLXXOhyV6nORYbrjQjbcnn%2B6tnBBtztYnarcstp9FHYHqJ9s%2ByLtUPsJUjlTJIuQ8acsPqssxKeL0E4BWnWGdwUdsynP4nGKv3U%2BrruvsJ0xs1usLu9d3bDeQDag4VUKqySxbAocRqTkcM6KK37q3ubK1WkRfe841rvr7gDfdvfNPaTcHcBBezZr%2BnXC4KD97vtmlLs%2FAVbyEP0g6nX%2Fm8VZvNyWBB5l8CBaUA%2FSufbHkJysdH5B6NY6qSKFnHGVOrDzvjl1JRN50V8jAgs2oatT0%2BjZ3wJkZGIHAH9P3bbOeTvp2c4pGNYF0inC5BXyL8CfjdaXxy219kjm4FsDZ8hCi9QDjAyQCbBSnuWi1swnlnqlPSIfpiajQv8oBBuKL0l1A8%2BJgjK7kYHYSDOX5xWwxPpc%2BAZLJDch89rTbXKIHIAwLVBc%2FES7npszR4Bkq2gCAiV1Mt5b1tT6AWk%2Fq6Y2ES4X10beMIrJ18sGOqUBE3nViWvizwbSLN0KPl68D4rZ2fhlZIRWT8o67JnEa9o2U9ko2M5lBzrqKhSZL2UtUrTSJD6LLYmZ6yga2VywLVAPmI8jxcZRHTsDaO0Ope9byXlN32DH2%2BcLGGcdpqxzGnvPheAyS7XOVQqKcTBAXGuNVvQ5s2bDSCnv1hHqJxDTz7%2BlD6BdpdXyq4FIfDt1e2oSI2Q1WtucPWd%2BX9MwYaJDRrkV&X-Amz-Signature=136d3da3681a76f316de461950bbb43c98e1e48ff3b6994fcc2ca23f001f5b75&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAMK4WTP%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T150116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDaXhRp2GA%2Bro1TbKwEw%2FbLIJ7tQWu%2FB8IAaTUAaJg%2BQwIhAKG5zFfIl%2FAGNV2xxjCIJC0fGO23Spizf%2BTijdM9LE0RKv8DCCMQABoMNjM3NDIzMTgzODA1Igxzdq2mLMTpGRNB95gq3AMnb8sZpz878m%2B6xUjoNrZu1mmu9ZqXvkK7R3MHn1EkHsZJu%2B5R8Y0yA5aw5rvjDmYqdgOnEEE67YkScCoTQzXcOdNPNUCKmdOYgqhwKjAuctAsuwphbEg6h92jNS7esXAl1V%2BpU23vttQm9wIDOT4wYTVQdaclEO%2F%2FFGetYLToOZCKy7AkHYrxpoGU8K%2BBF7OE7T1O0n%2FmATztZi4TMLfIiKt9y0pwddopF5sfwFgppNEKWwPLTNJJZNmrtpAnxkUFmdID6%2FFBEVj574YTxxKZIZKBCo5Ii8lIqXkhNZjN3hMs2tSjvfg3S9%2B2bhWtUHz9hq8V%2BRfMrQrHLUIm%2Fi2B%2BhW5hWYR9jGBWMrSfHNeOOCqVDks4p5961PlzY8zqiIihN3eAwb%2FR74YUVDWJmkbS6%2FvGbsg%2B1ZdH7EB1nsGjiOzQIwtZMVN1HizVnuVj0nw6zpolrEGplTgFjArgsXKY1ZtwI%2FFH%2FUKjNAodLskguaqoUYp%2BTa4hZN7haPcvNp68AG8C0ob99hXHXEnTOpLqCt1VciDC%2BLYHDDj1U8%2BUCIiO9YujvGcXQnJdBDL398RbRhiQ1WDzla1WO2ts0RHMiqYc8n0eFiKWk7joX838nUxSos1r8FCsaq8sjDgyNfLBjqkAbfZHMiEzOXCYOCo6aepU1d8Jt8e4xYjNUBkuapKOolaAoiCsdGyy4t2qTEs4SiYZRMFRLmAdm9slOYtgOqqHMb591Gokm5uYiUYHCIWdIdAQ3ARbzXltImtRqKHOGvloA7NXHYnbgBWw8xMl6Dq8pI83sV8g4asubn%2FmWqvObELqbwgVLofHYK4a2goU4TqS3VeDwk7LID8Ito9m5pAQNYt3DIN&X-Amz-Signature=a923b39387246e0d7b8a0de28ef609e035fad16aed0b96a6cde47c2555796b57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QK3DDK2R%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T150124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDtuccOs15XHBnajmruZAbrYIflv2lWpUZwAy9DwRiuVAIhAPMg9i0yRzaFYsa8D80Cyz7WXVrFN2xG0JuOOjDxvDuVKv8DCCMQABoMNjM3NDIzMTgzODA1IgxLMbQDRa0DsiO7Iv8q3ANb%2BNrWafmL8d0N3zTxnoJ%2Bj0tx17izLUp3Z%2BoyBvXP4ZcRc%2BlFMlQa%2F%2BI0vn3yUGmG4AjQjXim9MQuoI%2B7BP6ynDOkytg007qFnz5GVxOrzjfOMAihEH06YUUfj7jN0hvkdMg4YMv98WJKwuCOPzbKw05lcIBYYLE7yUqcvBsuxxUn0YF2gnxRGILi5IsnopvpsxIPKD9jKeMnO2iUXDgcjGryoRGpcQWXAIl616BpTQYuvCiFOGgv%2BjqeFcOplAmLoRHorv575iAORCMlJInv1y%2BtdVNIBBKWKvFt7P9G2PzHgOEQwg%2Bbz9nOi6XyrJIbc6H9QLqBuR13tBwm8%2BD0WrvwA9EQ1O1yvdkRh0RILVRWJU%2Bw9nUwMcyMhJch%2Fm0Khwx9U7plRaU%2BeKJHAy1Z0b1K%2B6n0VRhoJxkP0VccEPzmFpfPF%2FAkTtTkfSvMoMSRg8fhMQ2NvHbHzFtTG52DcBjy5ne4XATocdLmYJHSoPy86QnVXBwMxPM6pPVw0jCjfgoSNNAklDjCcA2y9M%2BV6xAyE8lAH%2BsZp4jIRmMm8ftmvXrR0x%2B39yh9cgczCAJ%2FKD0XMTn%2FOkgVaRoaNI%2Fx8jCSgNhUzhoCR6UgwsvGwxWxo7g2s97AQzb7bTC4ydfLBjqkAYFj3r2274z2N%2B90%2BuJreG6Uo%2FLXa9iAZwR7T1X8yHjGRImkzjbUy87ljOsH95Gk0LcA0PbmwTL7C8mogQvUiJjURrPB7SGxwNCZK9q0Sqwz5E0AanIYTxiRmBcdr3jaCZSt6hHCzp%2Bm7ic6RNMGdJSChDH21rCBg2NQyGphY4rWGX6mLD%2BpRjqstIuk%2BzYYSqFopO9Dr08Qpn6Ssp6TKEBDf9s%2F&X-Amz-Signature=be3214257a7a94553f1a89470ca31590d140aa9aedbeac1bf645a65c4ffa1fbb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QK3DDK2R%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T150124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDtuccOs15XHBnajmruZAbrYIflv2lWpUZwAy9DwRiuVAIhAPMg9i0yRzaFYsa8D80Cyz7WXVrFN2xG0JuOOjDxvDuVKv8DCCMQABoMNjM3NDIzMTgzODA1IgxLMbQDRa0DsiO7Iv8q3ANb%2BNrWafmL8d0N3zTxnoJ%2Bj0tx17izLUp3Z%2BoyBvXP4ZcRc%2BlFMlQa%2F%2BI0vn3yUGmG4AjQjXim9MQuoI%2B7BP6ynDOkytg007qFnz5GVxOrzjfOMAihEH06YUUfj7jN0hvkdMg4YMv98WJKwuCOPzbKw05lcIBYYLE7yUqcvBsuxxUn0YF2gnxRGILi5IsnopvpsxIPKD9jKeMnO2iUXDgcjGryoRGpcQWXAIl616BpTQYuvCiFOGgv%2BjqeFcOplAmLoRHorv575iAORCMlJInv1y%2BtdVNIBBKWKvFt7P9G2PzHgOEQwg%2Bbz9nOi6XyrJIbc6H9QLqBuR13tBwm8%2BD0WrvwA9EQ1O1yvdkRh0RILVRWJU%2Bw9nUwMcyMhJch%2Fm0Khwx9U7plRaU%2BeKJHAy1Z0b1K%2B6n0VRhoJxkP0VccEPzmFpfPF%2FAkTtTkfSvMoMSRg8fhMQ2NvHbHzFtTG52DcBjy5ne4XATocdLmYJHSoPy86QnVXBwMxPM6pPVw0jCjfgoSNNAklDjCcA2y9M%2BV6xAyE8lAH%2BsZp4jIRmMm8ftmvXrR0x%2B39yh9cgczCAJ%2FKD0XMTn%2FOkgVaRoaNI%2Fx8jCSgNhUzhoCR6UgwsvGwxWxo7g2s97AQzb7bTC4ydfLBjqkAYFj3r2274z2N%2B90%2BuJreG6Uo%2FLXa9iAZwR7T1X8yHjGRImkzjbUy87ljOsH95Gk0LcA0PbmwTL7C8mogQvUiJjURrPB7SGxwNCZK9q0Sqwz5E0AanIYTxiRmBcdr3jaCZSt6hHCzp%2Bm7ic6RNMGdJSChDH21rCBg2NQyGphY4rWGX6mLD%2BpRjqstIuk%2BzYYSqFopO9Dr08Qpn6Ssp6TKEBDf9s%2F&X-Amz-Signature=57352fe6cfe6c6a76392823813de3352e8e0d11d319d34e23487b1572030a5e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R6ZUX3GT%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T150125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIChl529p6GJIQfH09Qq65MgNV6JKL3JxmrV8pGoX68QmAiEAts2RU21ghRzODVeez%2Bznm%2BEszx%2FgazB9JFvUZVvOn0wq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDFTndX8wwZ3Zi8bzCyrcA8d8I0NWTafp1cm9elnEWqjErJ9fGgfjPxe4%2BE5yS8q1pplsinMuAx5tw1FQeqT2SiEWENkWod6svpypcvKwpX%2BF8Ad3qhsmqauEaQOYdGsKcAzUnaDnYO6aydLg64am%2BEwZj10%2BMCdaPIWaUuML6mGvWuWFsaEBiOLjurrNkgAHAKWmcmdH3ndxj0IEqP3pmEDSLeRL7GaOlBYu2GX68ixo%2BeDw66VTRHxXM7FMz%2FUBZJoF4UY8%2FJvMsAreFQ%2BwB0TeLLh%2Fu4RxdFzIVndTegWR1%2B%2BKTPlG2s4SbIBUDRYi9LrlrmEy88WC%2BcEj%2FFq3UOZaHh2LoL%2Fqmn8WvVf7f8zwk4QmZ%2BvN0bYKOQE1gIGPu9G4Nd4fZwrd2uPvo8iAKI%2FpnYQVbvPq3vCIE9DwSUJZ6XAumLjYeAqB%2BTBB31qIi3zBmu4C%2B1mbHcoIq%2F1t67%2FTSnw7%2B05fEKHR0rbwQxUQyCOYe7cNc0T2%2BlZGypSSvSIlCrdns%2B9Q5fZCf3IdlZLm7xSbLMRwzy5E%2FZw%2BXkrhEmC3ET6Nvl%2FMpfTc9KvBMwskQuAxJtsvc8QdEujyqPMK3WodUea8QB4r0RobXJXWsBGQT6U1ROPqCCTBs1im%2FfOZOrEGaVSTOJmiML3J18sGOqUBW%2FJ88FNsEVNIW0Z9yqRW3%2BiFUPdmwyWOMKQvtparERGCh6Wzfbg6nRQ2ummhK0G0Tdr4JFLSopVk6eqjE8f2%2Bm549mHNuo4zvztCAPHV0XPZPCKRrrKTHpBT5rzNs0GC%2BKEbNY9jCzImmU5S6uVO1hJJutq6VwcnCm%2FA0rE4fzHTT6kEHg9XVPgSsEXym3Sy4a5P9biqbn43fng9c1x7wJcyzC7i&X-Amz-Signature=049fc4880a8d716054333e84ed59ca92ed4894d76f41290223f109feb388ee06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X72OR2DS%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T150126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQDHqIPa19JxprCOgJehvtwKmsCCf5bdhOtk5CWIsdhgmwIgCKy%2FBBuN75YLKbQEtRUP3Hp8lWz20VQLuaZg06gxeU0q%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDIWjBZAvwHqnqDhUgSrcA81%2FvGAh0fNFsT4RZL07o4L6EPYHgbUl4KnyvuxGBRgu0qUG%2FifP%2B%2FPJJuqR6XMz07zYaE1TgLidvLtb8YOGlJ%2FzLheqpWYkcd9WO7kGSJvCNCPjbGAep6n982inBmpUyGvj7bh0Aep2W8N%2FXQcM6gXgSr%2Bjvqic7CIRDJ2hjYJHu11BVUA4zoCKlEDVW1wsGAnUas6tAfM3yKZ68yCnmbeHVo%2BffUf%2BIb7pCtRiMMNrZwibpq3o5OSQ18gn3ISEo2n8G%2FrHSwcshEoNt7Lsq1nl6kBoKuME4yhZDO57hcZgE7V0lSH6oBOYpkNQ3S0bnY2vjP9QSHx04%2FFPsxkqNJBwtgpQYFzvL4UzL9usiPmWUYO17ZGui4xcVFT0%2Fv7blvxmoI74RHyslT6UkiaiwzyvsjKfKg4tY%2Bfw2TlFa0bngWfo9SCdSOlHiP6nBJNJyrqJZlvxJk2jGVI0o48%2BxUcJBcBGkl%2F%2F0lM7%2FdVSSN%2BDzICzOkEdwD0%2FtlTW4pk1t4BFSlIYQzhRpeJ1tL4vSqUKeO%2ByO7iHkpdh3orebvp2RiVGDrmNfxBy%2FJTgvgMJN2Ft%2BMChsmvGFd7hRFFhiYdTgyVH8EF33m3BkFDF%2BA5rfNcr1AygXfg8VsvrMPPI18sGOqUB9EKNbXsvLc%2FqtWVTJ%2FrH%2B7gsF3n5Q4QetxskT53o%2FK80kXUO8VGzYx7%2Flsn3YE%2Fmq4eUXw99cGFCEDKSEBdvjsgqplTJrkxBMMMfD%2FgVTiAAwX2x4aS4lcTg5OTpPSUlzxM03MiaSFJua9qn4E8sLoXvP6Y9oAzE3k9fgJbMRqnY6k00pQVwTAPD3fZLn2uHiXj6G3f2ae3jvWK%2BjCMfH69QMP9D&X-Amz-Signature=b9e1b6ec7e501955292dc8585b385887fab9083955399514841412b9f5ec14da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEB277KU%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T150131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQChteoes5%2Bt%2FUY9Msc5MpTQqD1CwjXTALc0Dd%2F%2Bjjs2YAIhAKu6xDO8qv12zqWnKVKbdFNA2Wg%2Fqd2QpF8aU%2FioN4PZKv8DCCMQABoMNjM3NDIzMTgzODA1IgzZRDpyOHSDrCTYpjwq3AMLYvIVftfkUch2PNiJLXY3I64nKMMOC0kGNn55VCWFyM0AGNT%2FxOBzAmVCJsfqJulRrY74%2FgQYK4pILmtaTW4SKSd9nR979E7uZy%2Bc30zYTKVwe6F%2Fff4i89Y7vmSENjZhNlwboqZoDbteQmx8Kxhe1PyZL5x6iguJjHq0Laf3OhzsmT7lQw0GAaVDwnSlJGM7gjRDr9SuufZqjRPDX62XbAqsv%2B6aTD3BXc6K%2BzV5O3k7ttQ3NElhKOaf%2Bpy6SRnpjqeCsiFZPcxtmeZoJf0Y0dVodZTEta0qYymNfgS3grotKFApMFTPaCGA4jpefqjQg%2BZBS%2F0%2BkZA%2FkOLS7O%2F%2B%2BViTszQqeSWWdip5ycQ14t9VNmlLOrB9scVACrFjALIOV3Y%2F%2BbTKMggHRO1O8fdhcvxBJofktuq24hYdQCJEQX98BRKNBOsu7VsKJAPTord54sXE1dfZ4FuJHmzIZW4Opm%2FA609cN%2FEHNP%2Fmd0%2BHE26W0Su3jhFaRB%2BmGRlrEouN2oJBd55ap7C6N7g5Z0ndbOf%2F8p1h3nVKHO0HOfTsa%2FZTKEs%2F12pRiVmVm8P5ZoLioKtFRvbjMQTAfA8UedbZCPmSV09t9bZBPx4q7LOTbgyBDVjLQemW%2BvvCAjDpyNfLBjqkAVtWaNiIzYuznYbYlb7dV65suh1Nx4%2B3xTpyn1bv0T0oGAblNx8UhB2vq7tjbjL0424utiqEsQPdUb2ocGGw6SmE%2BPTGiqT6Vxgll8m6qClQDgRnKALKKvv0OWKuzCNy%2FG5FXiPJ5bwKJXLijtFUYmc4gdzN7klEkHr0%2F7Z1qQ7rCMwtS0LnRc6uJ8qMb2ClHNfLEiLvenrPMBrOnuFc2fx2xWCg&X-Amz-Signature=2f9d114a06b666de7b3b5d811f27c5cbc0f7ff80d46ab1b1c91cc8788f781742&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SMHRKEI%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T150132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCHX4Brzo39y3gyA5DgmNYX4qoIxCOEqtYNWMUcL3Ap5AIhAL8TPisWRUyiFqBIvzHMGB5RRJPXjASmR2SIzI9OwfN3Kv8DCCMQABoMNjM3NDIzMTgzODA1IgxvzKjGidp37CSY4%2Boq3AP9Y3NnDwaOizq9v9f3ZgaIfwcQmCxxLwXQHer4244xY1kMpXoHCzaejfJqAK5SKIfHx6T8PIutNV%2Bdh5Ci7kVvENz9DpQ%2BphG%2BJX9VMLi6uJ9PNarn%2FFYgUE0%2FvBuQhacgVk5fWCy9FmiUBipKyE4a1L4oirEzWXADjfkyiUnm3aTnECe3vr2aGSqeuABn2JrhV2pF%2F2MTAe3bi3TSebwXqjhPcGSQtTPjcjcqspFvJJVhz6c%2FGodHID363N5CJBUw7sP0xHWT11E5TWErYTQgPkzdsXtk0DloKN1X8NsFvAbFNYovyDmvmW8%2FuMAS0c6b77oOyZp1sjluHdCkXIDC6YYTzlG%2BBoWo759Wr8ISZuNhavDViByi8TNjIk%2BdWQPAByJBpjHcxs2Zh9AdV0mGfAhyLGuzQTlxRCR%2BHwYiBANI7TDVg%2Fmmot61lhi2SVswSOV1YlQG2jiFml3jhpBEWWKmUus5zDGLSi8xCaT4jbMerLmA4Aet1fmoqu622dHdJcehZvNt8dkelKskXl9I3u7Xwuf6m6p0bCXRVqdaPho3GZt46apr9J0Eq4%2F58RK2zoKHRwTqEYAuW3hoy4K%2BgciFpqSqLxZG4J87bN6vmtZtv%2FzOoWaxaOmKLTCuydfLBjqkATne3DJ%2F4XVX1Sst8vLLvHzZSRyRwvGwZ%2FiRHDVzhpKx8XBxx%2BK7uV9ZdiZrKcG4ul4ifab%2FPzz8Cow%2FzhF7gbq5AlHHuhYg9TFe%2BwvGZNB8SBPjUIi79aW283adpc%2F9NqACcGSBmV4Emhxc2p0zQCuoTE%2BNGnJpGgZV7kDfjm33bmcTCqilDRVYHoEYq5rp3WzUYdSUJQux6BxhAepC%2F9IcojnZ&X-Amz-Signature=71866576e18cf549b216cf53353657fec56596a3ab224676e4b39d124b526d50&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SMHRKEI%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T150132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCHX4Brzo39y3gyA5DgmNYX4qoIxCOEqtYNWMUcL3Ap5AIhAL8TPisWRUyiFqBIvzHMGB5RRJPXjASmR2SIzI9OwfN3Kv8DCCMQABoMNjM3NDIzMTgzODA1IgxvzKjGidp37CSY4%2Boq3AP9Y3NnDwaOizq9v9f3ZgaIfwcQmCxxLwXQHer4244xY1kMpXoHCzaejfJqAK5SKIfHx6T8PIutNV%2Bdh5Ci7kVvENz9DpQ%2BphG%2BJX9VMLi6uJ9PNarn%2FFYgUE0%2FvBuQhacgVk5fWCy9FmiUBipKyE4a1L4oirEzWXADjfkyiUnm3aTnECe3vr2aGSqeuABn2JrhV2pF%2F2MTAe3bi3TSebwXqjhPcGSQtTPjcjcqspFvJJVhz6c%2FGodHID363N5CJBUw7sP0xHWT11E5TWErYTQgPkzdsXtk0DloKN1X8NsFvAbFNYovyDmvmW8%2FuMAS0c6b77oOyZp1sjluHdCkXIDC6YYTzlG%2BBoWo759Wr8ISZuNhavDViByi8TNjIk%2BdWQPAByJBpjHcxs2Zh9AdV0mGfAhyLGuzQTlxRCR%2BHwYiBANI7TDVg%2Fmmot61lhi2SVswSOV1YlQG2jiFml3jhpBEWWKmUus5zDGLSi8xCaT4jbMerLmA4Aet1fmoqu622dHdJcehZvNt8dkelKskXl9I3u7Xwuf6m6p0bCXRVqdaPho3GZt46apr9J0Eq4%2F58RK2zoKHRwTqEYAuW3hoy4K%2BgciFpqSqLxZG4J87bN6vmtZtv%2FzOoWaxaOmKLTCuydfLBjqkATne3DJ%2F4XVX1Sst8vLLvHzZSRyRwvGwZ%2FiRHDVzhpKx8XBxx%2BK7uV9ZdiZrKcG4ul4ifab%2FPzz8Cow%2FzhF7gbq5AlHHuhYg9TFe%2BwvGZNB8SBPjUIi79aW283adpc%2F9NqACcGSBmV4Emhxc2p0zQCuoTE%2BNGnJpGgZV7kDfjm33bmcTCqilDRVYHoEYq5rp3WzUYdSUJQux6BxhAepC%2F9IcojnZ&X-Amz-Signature=e03cd554334d7bdbb90a1d258b5ca6d66d8c6e814d295963dbbd6e3d81b32335&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LSDMUBK%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T150109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCnoazONftmsMEtR7j2S7X%2BZ2u7MWTnoVfFSUnNauPv5AIgIm8xWL7bFaEWi3NMue5m8SqimaiZOX40kVth3pBPg%2Bgq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDBXMn5vvYUq1Qf0gSCrcA3mz4lFzKHV%2ByZGR37nS10R0GWBoKJB1%2BkhlK%2Bjl316VZ8EkKWU%2FX5bqWzCaT77FfIpiI%2FCxg6adoGPWZe%2Fbwbu05a4%2BpxEOsOPzfofsiunxWeruj17gtJaKLOiIIVODoCKW3LCwEtoALOnjwnv%2B7hRyhk%2FD17eL5eK4WvkLe7LHF2pgrfjslzO1%2BusZAohZ8VJCI5flys7bkySgI%2B23p1RhOvbF0pxSvjV7I0nI%2FxMp2TYJlopteRqI3cVivTIgCH57UhLjlacNY5Nco2qeIndIsQF7yiQTvy1J6zyf8dNITkNI8kJXi2GxO0khxQDbwy6k7cTSTI4bpfX19TuPxt5iTqiR6WU%2FN3uOZeTDE806ojoLlyzAeH%2FozNt%2FafqDlICFiuvtSn1C0Wbs8jH%2BWtoYbGSQ5IH4w2gVBVClASiBdRmpS3a2bQvHljWgAT%2FCkEu0qzbjHbEQtItS0zNeFY0MHLnBs8MCiPo9it99ebsK95iUkMmynOSFjglJfkIM7bqedr0eXC%2FC3CruXZoVE1B1bpzS08pD2w9Cxj%2FDMAQiyFKYf3DU6%2FxMwR17BwZthpvHakelw1O9w75HGU66myHMcXVz6LvZUs6Cyi9GW8EM5ph5gz2HdGRU3TLAMNLI18sGOqUBGS%2Bneiw5EYtRVS%2BHgkQU%2FHzitu2pAbGi4mt%2Bn%2Bv9fLWmKBOpfhW5OyOouYftbYIAV1wG2T%2FDxvK5KtX3dzxt%2FTW1k5qI7NZPsqnHqszqZi0t14ZusljO0vboHf0B0SPTpt3XlTSAr83iOPG3Y7I%2BPF%2FoZwD6VmcVaDOF2GcXpsYPWQAdDeNoNIc0Yxl3Y%2BcJDGxdVFM96SlUJIhBRjLv5hrrP%2Bfo&X-Amz-Signature=e9a348d2819cc641257692e2c2ca368b6f5a8aec4397094ac4441b77a913153b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WE6UTRA7%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T150133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIEABHJgRyOGS0t8soGPH4ZumBvjAhLn%2FUKjLC4A5jk02AiAXyCnMB26P%2BePzkpY50EjOqzvmTBOrIwknzrr5d2s2gyr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMAU95mr5o0QqBAMQBKtwDR%2B6Y7dVLNO6qz5ho%2FzLfq34uoDVfhnmimuTgklhZa3iQXgkHeDm0RhTlwhF7edeygcBPjp9tUW50%2BX3CZzL4g7O4cRnNY3eNA%2BPdV601HasTDuYhVaZ5K%2FX3RLIIBWM4mqQA886xeUP9lfqfzqJ5UyrErb0OziQDL7zfgea%2F3oY7OxNAsDT0rnhZLeKma53ACQi%2FyaX8rEWVPlpp7wrR339XsmjJPYTwiUKFvqae4q%2BwH77nku9%2B220sVYwmG7SnuixichAT51G4Ovb8oktWlEtFYiaDpmQ2HsutjJjuy1yeQzmKjUxR9yGF8%2BmcYY770%2BpTucKic%2B8rx0evOphV8HkbdSNC7dHgnZphH76Q3y%2F7t4ReJRnAMmOkMQ1I%2BaArEZ8xwsrw0O5uVpclcGAtWqqIX9qoltdhmgM6rHnzWPihuk%2FnyR%2BsSVtg89VWIBm45iOdomJ1DVbtO5pmIJn%2BDkWY7K8P%2BvDWMU6ffN64scgrD9ckaqHrlrOrL1TebUfDxWxarLGfXbk%2BFgYm9ph53yeD99nYgBxmRm6GQ7Ipaw4cAvcaGPpGx1vVVxeocaQb3fuADASpyrwJYI2u7T02Y3dztLpD81TrxTchEP4Z67a08F2eo1TXIAg5KEQwrsjXywY6pgExOaZ3aKdumyYP52T2LyOPKRcL%2F%2F5GZ%2FdMdOTQPmWqd3MoScZW6egj1FV4bkU82h%2FasrVkOZHxyZ%2Fp3Iuri%2BKi6HgZyvLE7skhCPB9g1fml%2BKY8geCBuLXMqm0JEHUqMZe6vQza1smwRdLEM%2F%2BK1iZfViAigU6FdTZ2D4F8AS1yORHnSW6HqqyNxaamwPxJzxpWkDX7lzsAp1zUJpJwc4siI1lzlAD&X-Amz-Signature=7cceae1707a0beb39ae3918dcb8984efee2dacdbdb5d3690f1d8878577bb0641&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WE6UTRA7%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T150133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIEABHJgRyOGS0t8soGPH4ZumBvjAhLn%2FUKjLC4A5jk02AiAXyCnMB26P%2BePzkpY50EjOqzvmTBOrIwknzrr5d2s2gyr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMAU95mr5o0QqBAMQBKtwDR%2B6Y7dVLNO6qz5ho%2FzLfq34uoDVfhnmimuTgklhZa3iQXgkHeDm0RhTlwhF7edeygcBPjp9tUW50%2BX3CZzL4g7O4cRnNY3eNA%2BPdV601HasTDuYhVaZ5K%2FX3RLIIBWM4mqQA886xeUP9lfqfzqJ5UyrErb0OziQDL7zfgea%2F3oY7OxNAsDT0rnhZLeKma53ACQi%2FyaX8rEWVPlpp7wrR339XsmjJPYTwiUKFvqae4q%2BwH77nku9%2B220sVYwmG7SnuixichAT51G4Ovb8oktWlEtFYiaDpmQ2HsutjJjuy1yeQzmKjUxR9yGF8%2BmcYY770%2BpTucKic%2B8rx0evOphV8HkbdSNC7dHgnZphH76Q3y%2F7t4ReJRnAMmOkMQ1I%2BaArEZ8xwsrw0O5uVpclcGAtWqqIX9qoltdhmgM6rHnzWPihuk%2FnyR%2BsSVtg89VWIBm45iOdomJ1DVbtO5pmIJn%2BDkWY7K8P%2BvDWMU6ffN64scgrD9ckaqHrlrOrL1TebUfDxWxarLGfXbk%2BFgYm9ph53yeD99nYgBxmRm6GQ7Ipaw4cAvcaGPpGx1vVVxeocaQb3fuADASpyrwJYI2u7T02Y3dztLpD81TrxTchEP4Z67a08F2eo1TXIAg5KEQwrsjXywY6pgExOaZ3aKdumyYP52T2LyOPKRcL%2F%2F5GZ%2FdMdOTQPmWqd3MoScZW6egj1FV4bkU82h%2FasrVkOZHxyZ%2Fp3Iuri%2BKi6HgZyvLE7skhCPB9g1fml%2BKY8geCBuLXMqm0JEHUqMZe6vQza1smwRdLEM%2F%2BK1iZfViAigU6FdTZ2D4F8AS1yORHnSW6HqqyNxaamwPxJzxpWkDX7lzsAp1zUJpJwc4siI1lzlAD&X-Amz-Signature=7cceae1707a0beb39ae3918dcb8984efee2dacdbdb5d3690f1d8878577bb0641&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQCJUFGO%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T150134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIAjMupT8LdZitAown7a8KjVSPBCdFw6vvyAq%2Ff9M6G9tAiAJf%2FIIx%2FwVbVu0taIIgBFh7boJmhOpbE64pAqRduKFsir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIM0YmGzWAV8eJuThBnKtwDB9iu8v8PTt9o8rXktWLweuvkhJyMLC4HZKmdhxt6knxfcQVdKN47up%2FCmF3LA2Ij%2B7FJxWNGuABxyApoRV%2F0uelpMyf7QWSFUI3gOggIswC%2BJlTcTuOrTQMtoJ2WXyqTLULKbSPOo6596zBcSs8KVtCw9o%2Bk%2Bzge6quTgPL7mDI6Osjp%2Bry8SOm%2Boi6xq4eifawU3aqL3%2Fbg%2BCpR5CYa1d%2FjWW2lxgeaJ8PmVhi7p1SiwYnoEs0a6S13g3Qfb%2FCWLDFIFpS6wSXMzBQgXmdCN4K42dCMFw5S7O6cWRvQS0XcNuiZ5Z8Zh6fhxVO43UQtFllGTTaePSZH2IR6Q9BPQ3MjH8okRh2hI%2BfGBDBwHdb2hxbezRq%2BrPHwaNuWk5pLdhPWoCNGmL43lNhsxxZ5o7VMxU8UolQ6nonua34vYkUvtYZUZQ0P3JZeXOAoatK%2BMJmO2nAune8Lur2C13oygTaoTCgVveB0yZzkn0GW848rIQ%2Ft%2BzE0nzRvMZCSPe2vs6YwmiEVdREM%2FopDWVr0%2F7xM1HoILaW%2BjlDGi9kDDxBFVAER6aT1%2BaU8An8Aq2%2BBDXjJfxPDUPDki994nF33CzS5z5WBvglAOj3n1h9uw2Uro5l%2BcQvTOeyQw0cw%2FsjXywY6pgHSp9%2FsY2XTaXigIPTont9mTIhWoKilnAjmJYDXaGLGUWdJroCi5tZaN0gButcWLB2eQVvqxr1nZiTZnLHr45v5iU3qhkmfUgPpOlvxp0x9NDmcB%2FVaQDpBrhkNN0PQt1FkXHs0mDIHyKJniF1dyc9VrmEWFpo%2Fn%2BlUnu2eiqTziQUeCHjMCi1XNCuRdpFThd433jkAvyB%2Foffqi4Dwwr5crKOOk1ff&X-Amz-Signature=89e2a1e51b553d38d5b491ee8470ffb5a4ad43dd9841c83699998470112fc1fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

