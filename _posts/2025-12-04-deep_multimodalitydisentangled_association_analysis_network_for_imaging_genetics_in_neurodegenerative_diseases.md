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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662O6Q7UOU%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T080104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQDw8AJrH5VZ5%2Bp3ytnSsN3XI3wbzc6w4CrI3sRz8b5LTwIgUxhP8maRbUQKa0Ny1WkStJat9LeVqQ3yFR7K3Pfk7X8q%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDOgDt1WQfgNQz6JfwCrcA%2BHYPvYTImfdGtSiE2X0iVHbY2ujbbrze7Gdey1DlR1EXmoTjAUwlYWVIbI1Xjw7NDLzg98I6p%2FPIJ%2Bg18aHKnpJte6Rt4Grrp0KRBkz0INkwcxdOpbJE9mSVk4F%2BVlGEDHVVMvBBJQdTXpyW1GyFy6yW%2Bdx2Wz5Rphe2zq5xLVatMpTssRD9eneQPRHQftp0t9VAwh4t8EjKPac07bHSlmoyClLse2YI%2FlTy1v%2B3QBuQnVS9wbxr%2FK7s85nyCT7q%2BVC0JvHH2ht6doh6omCIAuVIuxiKhO9Ug706unbB8QVJJ3X8HoBRZUvm7IEhAUQqhrHh45WSWupBRxAc%2FLPLdqLh1j%2ByFX62QgsE%2BnLz%2F%2FdRf1%2Bzg2hBb1fUA6ytT3dpzwS9iM%2BlJuz5Aj2%2FLXqrK4%2BiKOwNokJAqyGnDW9MQ5Tq2qQMmc%2B9M0k7rqo8GZbeyGChBzqhXwnXL2y09ug8sojrCazpZhToTw35IlvSpXypKTSlxG82PMD6JEyplJ%2BhgtcvgKvnx4vgIgQVVyN5fllMrdDgwrdAnaw0XQXpbtTdYnORPxisxrfJtE6npGOgqGvi24FzmVtY8HUl0U%2BCmzcnm6bSF1RgLNXw%2Fd%2FWfXd3bxXG0AP7LgSFmQzMPCZ18sGOqUBeqIN85EoTN%2Fxofo42Ioim1ZVfZA%2FWuae%2BjpAjFqWS9ejpZ8S4hDbwzMhK%2BOcA8w%2FAbMDmRhMtQXipooEiR7zq8YchTOf28GOrZldF1Z1EC8Q7%2B5Aug5btL3sLRDJ9qDEnycoO1TwP%2FrA0k%2FlSOzBoK5O%2B26bvsYlu94ShKeUmEzUo%2FpAEHA7I5xCp0qcWaaqnGmtV7VHIVdxeutSjat9jsTXuV4t&X-Amz-Signature=4228dbe809d50c08b68c8bbf60cdc5580d345408bac81c0054ee00565730d0d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662O6Q7UOU%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T080104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQDw8AJrH5VZ5%2Bp3ytnSsN3XI3wbzc6w4CrI3sRz8b5LTwIgUxhP8maRbUQKa0Ny1WkStJat9LeVqQ3yFR7K3Pfk7X8q%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDOgDt1WQfgNQz6JfwCrcA%2BHYPvYTImfdGtSiE2X0iVHbY2ujbbrze7Gdey1DlR1EXmoTjAUwlYWVIbI1Xjw7NDLzg98I6p%2FPIJ%2Bg18aHKnpJte6Rt4Grrp0KRBkz0INkwcxdOpbJE9mSVk4F%2BVlGEDHVVMvBBJQdTXpyW1GyFy6yW%2Bdx2Wz5Rphe2zq5xLVatMpTssRD9eneQPRHQftp0t9VAwh4t8EjKPac07bHSlmoyClLse2YI%2FlTy1v%2B3QBuQnVS9wbxr%2FK7s85nyCT7q%2BVC0JvHH2ht6doh6omCIAuVIuxiKhO9Ug706unbB8QVJJ3X8HoBRZUvm7IEhAUQqhrHh45WSWupBRxAc%2FLPLdqLh1j%2ByFX62QgsE%2BnLz%2F%2FdRf1%2Bzg2hBb1fUA6ytT3dpzwS9iM%2BlJuz5Aj2%2FLXqrK4%2BiKOwNokJAqyGnDW9MQ5Tq2qQMmc%2B9M0k7rqo8GZbeyGChBzqhXwnXL2y09ug8sojrCazpZhToTw35IlvSpXypKTSlxG82PMD6JEyplJ%2BhgtcvgKvnx4vgIgQVVyN5fllMrdDgwrdAnaw0XQXpbtTdYnORPxisxrfJtE6npGOgqGvi24FzmVtY8HUl0U%2BCmzcnm6bSF1RgLNXw%2Fd%2FWfXd3bxXG0AP7LgSFmQzMPCZ18sGOqUBeqIN85EoTN%2Fxofo42Ioim1ZVfZA%2FWuae%2BjpAjFqWS9ejpZ8S4hDbwzMhK%2BOcA8w%2FAbMDmRhMtQXipooEiR7zq8YchTOf28GOrZldF1Z1EC8Q7%2B5Aug5btL3sLRDJ9qDEnycoO1TwP%2FrA0k%2FlSOzBoK5O%2B26bvsYlu94ShKeUmEzUo%2FpAEHA7I5xCp0qcWaaqnGmtV7VHIVdxeutSjat9jsTXuV4t&X-Amz-Signature=4228dbe809d50c08b68c8bbf60cdc5580d345408bac81c0054ee00565730d0d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLSM324M%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T080104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIGVl75xqIAWeSasiMr5r6067sV1epQxE04E%2Bk5ELkFh3AiAdTUmaQ5L1UFWL63sqKpbE1BraXxgN9WczWM99kvDyfCr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIMIXshsfLDBxIxx1R1KtwDogshdO76WF%2BnvfUEpAgTowisWk6tDR%2FKcS0SfklaNPO4v9eMn01w5RvBZ02P%2FeZqB3lM73nT19ViY1%2B%2FHAjkkj%2ByQcMJ4leAUTwwITmtcttlyyPMDEAv6GgqyTpzCwyyT5ENZXzaaYcD5I%2Fv1NUofDSTm00%2BNgpO2lP2Z9GhfWfZjFUAJ0FVZVd3NpCiaG1fX5xY8Uxr%2Be%2Bv69HKWafQdUtrEQBI%2FLnoiO%2FCubizULRRKBM5mtZcL0XZrPBJuI7X6yEqKpPxaCD5EofsIhGVJwYjV9emwCP86mPJzM9Zf1MocNmOKdnBkRUn5eGMEZEDeroeBlZxIvJAFztMnaUhuiEddg2rLNm49xZEu5GPY7QncS8oUwLhGFZtWJ1k5AROlR1F2afHeIZyuDQAeoIeanCOP53G1Rl9wzVxRKnZDkmMGHGwLBD88z%2Baww5TI7DH6CnO2Treenqa2yODt83fd8p7TnME%2FiP8wM2U6mxcnhY8EGwlqsWZj6NH%2FhnXI9xyt7yxp4Yr%2BawNUKMl5hJKa2%2FRcqKMieEk6XvEPcnPNZ0PivwKYLDcCAMGR5DMW1W%2FSn69OXpGPuISF7cFIpiyeSHl4kbaI%2Fh8aTsD1QqLiNeQzkXZpvKVJhiZNQkwlJnXywY6pgHeSS0VtKUYYQLbDejwIHiFhAdkXL0M5lIbKNRs8ws7mkSULBgFMRIrUoO5MSwKmftM14GvyrTScxrEvWeXK8p3X%2FBAkvvVxmw3jWn4amBP5hSg06Os5oBRz8wJhrMsKuD3dEDFA4%2Bp0GI3wpRCrzqkvsrJjShh8EWVn0zZNf4MtDPfMQbjZ21%2BH8xkuj5Qx1robmDd314Upbq1eVcx%2FCaJ%2F3RGU3GD&X-Amz-Signature=5d43493ebeb2cd1ff42117e94623055cb861a6a510088c5b622df1137b040ca7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KCTX6MR%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T080107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJIMEYCIQChmCI4UHtWqJLG97I5J03Tr%2B6wVsGnJVydCvhA4xuaNwIhANu1UIWM%2FKgo9Xq752Q8I8Af3g1Y%2BXccgd3T1LWTiCi0Kv8DCCEQABoMNjM3NDIzMTgzODA1IgwLGSDK0vk%2BiMX%2Frwgq3ANHyadfUQottfIZXhG90Qhf00N4ipVJ8bqfUV8p0OpPlFW4TV9gGgWpNFY%2FFPUE0Ziuz7JKpuhOStEGxyEkqDXgCXVd4xSiioyPr%2FolBPsRMwCDSEIlScM%2BwJKsbSImeDsm2yVvesYUFYakftohizL9g%2BWntHiuo6%2FFPusYL7%2Bvrp53UePiDGAwxeWp0gs4KIvSIAs7YzxUi82dY3Ne7IUpZBbVPDj57A3%2F%2BsnxTIIguUIGBodM36Ss0iIjS9ro0Oi%2BaPilExbq8vGm4B8qnDwnSR%2B2YJpIzCJN0YBwWzcJXFhub2ko%2BD0Ih8%2Fe4zV%2BafrLHJVES%2B5DmJcgWefMhJY7okWm2Rp1718taUcw7QqTIttza1whhAN6ryfg7I6voF0h7dDcT9aQJQ6J3IMDNx8QNwI2fbxo0dJpTlpilvCstSzkLNhMlhB4wm3LWFWI2Nm4S5u7ffLtiuxONb3l%2Fl06ygK%2FVzKAVyyYinERp612SsIIysBbZYPT5laXpPYqwW6b3dXtzJQ%2BPV701C3roH84GzLqqWn1NO%2BJeiS%2FJLeBV299bF40rhAcZXNHmMZPleiWy0JUfL0z%2BYDOrdLboyafs0HZGSuR4irB6He20iIqaYdgMUKLdHYT%2BBDyWjCHmdfLBjqkAeUlE9Aw%2BDrqorN%2FXnsuKQ3RUPSB8aiYOooEdpHY2ljyb2ii58nZDot9fnPeqSiqZdoiAg8Y4fR63hgGOPS42ayHOxg0%2Bd%2BihTjACqlKYMhxYw8V0vAECEhokc146J8wQPiO1fYw1OorlL%2Fp70Nq6pOSeRuRxhzrsDnLqlsnsDew%2Fzykcg4xYNs%2F0ebBRyg1kdMotVbYVINJaH1hCcwSMwtJ3IY4&X-Amz-Signature=4aad33dca9f09864042deb4c4e882e5e416897d818d2237da9ecb9524af871b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KCTX6MR%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T080107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJIMEYCIQChmCI4UHtWqJLG97I5J03Tr%2B6wVsGnJVydCvhA4xuaNwIhANu1UIWM%2FKgo9Xq752Q8I8Af3g1Y%2BXccgd3T1LWTiCi0Kv8DCCEQABoMNjM3NDIzMTgzODA1IgwLGSDK0vk%2BiMX%2Frwgq3ANHyadfUQottfIZXhG90Qhf00N4ipVJ8bqfUV8p0OpPlFW4TV9gGgWpNFY%2FFPUE0Ziuz7JKpuhOStEGxyEkqDXgCXVd4xSiioyPr%2FolBPsRMwCDSEIlScM%2BwJKsbSImeDsm2yVvesYUFYakftohizL9g%2BWntHiuo6%2FFPusYL7%2Bvrp53UePiDGAwxeWp0gs4KIvSIAs7YzxUi82dY3Ne7IUpZBbVPDj57A3%2F%2BsnxTIIguUIGBodM36Ss0iIjS9ro0Oi%2BaPilExbq8vGm4B8qnDwnSR%2B2YJpIzCJN0YBwWzcJXFhub2ko%2BD0Ih8%2Fe4zV%2BafrLHJVES%2B5DmJcgWefMhJY7okWm2Rp1718taUcw7QqTIttza1whhAN6ryfg7I6voF0h7dDcT9aQJQ6J3IMDNx8QNwI2fbxo0dJpTlpilvCstSzkLNhMlhB4wm3LWFWI2Nm4S5u7ffLtiuxONb3l%2Fl06ygK%2FVzKAVyyYinERp612SsIIysBbZYPT5laXpPYqwW6b3dXtzJQ%2BPV701C3roH84GzLqqWn1NO%2BJeiS%2FJLeBV299bF40rhAcZXNHmMZPleiWy0JUfL0z%2BYDOrdLboyafs0HZGSuR4irB6He20iIqaYdgMUKLdHYT%2BBDyWjCHmdfLBjqkAeUlE9Aw%2BDrqorN%2FXnsuKQ3RUPSB8aiYOooEdpHY2ljyb2ii58nZDot9fnPeqSiqZdoiAg8Y4fR63hgGOPS42ayHOxg0%2Bd%2BihTjACqlKYMhxYw8V0vAECEhokc146J8wQPiO1fYw1OorlL%2Fp70Nq6pOSeRuRxhzrsDnLqlsnsDew%2Fzykcg4xYNs%2F0ebBRyg1kdMotVbYVINJaH1hCcwSMwtJ3IY4&X-Amz-Signature=027ba7a1d29ad303ab854e45bdc9713b263bd080ed723e3177884c8928d2126c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TN3U74Q5%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T080108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIExBbsxOPe8dpBp2Lg6MDM3dNGq1EFMPBdghrJwW3y9QAiEA4oDaLbwi8jA2vqjTpE9zj3KeLOBFbdRlLoyi3mksYEEq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDJqfdOiqAh625g7K7CrcAy%2F8sD%2BWnvTXkjC%2Bbz5RTGTZPb8tuh8fjp6WahIx5lLWKnHqb3getznetuse0yc3JtOVaM44%2BsVWuLlVwl4HZrnKdUPipKJPgA9MxA20a1zcGcDzJQMRDEkpBJ3nazzxVjy9mnxcpA41TkVRCesHHT4ReLDFVoMqULgu3aX5scK9ML1TCBChtrKKbGXXBVDta%2F9i8Jq9zHZ1VEALXELRPiFV0DBH1ibiBdA62Zhapm5W1OgLjiOjsFf9qgftch4WtYv5nlAjqMi8uAG0Y4BmCIxtVRGSn8X4iKWyon3ehYo0smRbuycGpORTGc3qF9IbwdkKyBEW32N8uDSXrY6tA1Wq549uJHnQwjONAvAFQGmm1sbKUWEkT8dr1JP97h4y8EOUTBe9kMlss27lSp%2FtwGFj%2BuNRftfPQ79Pc%2B9FcIz9e%2FibQ0YA4y7CcZpCTITwq4ImNM9tqMzUWmbLGbtWLBCIFDTZp1CcF6wXBy7eiKWAUj6izftbIY2ce9PvWHLSXjU7MlMhB9oYAjp%2BPj7heFHibvOJ46TB%2Fd2%2FLfSsIY3hAOfymoS4uwfJ3KsFzdzTb%2BQ64DZ%2B3DKqToCVwfonIPPt%2Bfr46nZX92YxQqzSfyoEwE4HADWxhFrdTmMqMO2Z18sGOqUBKrD4Vqac%2F7ho7rxHnCYZ8l0bqEFoKmLAOZ%2BkJcvikxJCEZfQrYMaRZWx4LySp30a1tPeewtQ6uWnMYzEuYs%2BKMuh7RWNNy3xa2fwr0vUFauiWsX6Iv4Tv2AZD3vWH%2BPrjBudI1XERP%2B%2Fnb6tybOeDsDeGetuq4lMAn%2Ff%2F3LgqrwO%2BaZQ7iZg7Cx4%2FgNB5X%2BrHOTA3AeW1poVM6d8dxmK5kFe1gvy&X-Amz-Signature=2320b21a055f0b4ac4e3f160f61551ed94b670e58706cd3deb31bca510488338&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4AWTBSJ%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T080111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJIMEYCIQCZilPoLJFvFdu5a1GtVQi%2BGnx0iBNN%2FVg01OQBdkBrAwIhANL6SlEuDilXx9OKJgbUykztd%2BQzpVBeEgCyC0XunAqkKv8DCCEQABoMNjM3NDIzMTgzODA1Igz2wrTwHHsynresMBUq3AODvBC7E8WPur9wWb1%2FZ2Sx0IujOJ4T%2FpJddh5NjYHaf%2BdC7sZN6jp9OwjI7xkCQxMVku7Mn3Nh7oSeD7IZqhvs3vg8DyQEg6MltLiGSrBtmcfuRiDJYhuqd0Nkf6z4O%2Feoj%2BoGFGZ5349kOBro7rP8vf5SOBhc%2F4lijOOrHJ3hz4S17bBrgAh0KW1oJwgTrhEAozAgNZlndNcdK6feAkRytdA1Dmpx65gJuEdMYaIVsF7LKrQ3Ke%2F9eSFrSQqklUfM2I2jQn%2BEO8pIYFF8NBdX3h7pS6G3ID49FT1N%2Fqf4MH8UI1v5FphRz%2FuQzu1bQWu3eu%2F8sDbdGRUf9ehzVIYdWTKVtT7xJKDz%2BKH9OY9HJqibPDryNoWEFUwr9lg3CBvozDfIXBauQ2U3QVqYb0DZk1YQ1AT7QhnCEcawzFi6yc11p3nlVmp7p3YxvXZ4rKdN5IixHA78Y8p6PSdQ42XNIu1N0DbBqo90pTVJ3hOnjTRStg5vBlqyE0xi6nicuItCj4eEbrPOXDogy%2BLj6m5A%2FAkG85aCciNUsE%2BLjZ9EHpmlDlq1w0tzmKszXFuv77UPZfRSz%2BmCpq4%2BPHDNzFCD75de4gDWPacDOAg7xeZkPa0HJ7rqoxc75b722DD8mNfLBjqkARHCnACRmPLBLNHc7OKvIWXE1xIE%2FPbI12WqMP3zisjH8ujp9d3I66sM8fqFSdgV40gY9KnndG3UAbujt7ewxeyS9gCkrWSNp%2B52CaHlpbP5MmfJB0BlzgyLwE05T9Dcc%2B%2FLFTT%2FrI9hdrC3Sjb%2FjG0N2tmZv0kiUAT9RU75EkjoMeB5XmC8J7BtOn%2Fqxba9kzNWkzk5dWrlJTl%2F2I20xvjxizPQ&X-Amz-Signature=204923d093625a1f5815fbdf9c42f8835cb0f33875251fcde031777f0725fdd7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFXG2OD5%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T080117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCID%2ByuTITuziG8fgOqnV7tdeQaXpULvJYsZaGUK5Bw%2FB6AiEAmSJTZtteAwDAkhdeh6oGnz3oz6eRbyyZbJpKlZXFZncq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDPHr7j349r4EqCEQvSrcAyoxrbKZouWAvjxxe1GmSdOpK%2Ba67%2BM2tfAkCBKlmVsbhawli58aYGVgSZt4LCdETgLbPI%2FIN%2F2Wagd8h2%2FlLky8DNv53XjrOJ39ngvwq87gVxXXywjPq7%2FGiVULwkvNX%2BnT1ZvPfL52wM8roM4Uuu5fzquvjXTr364mLRoMUtWbXOcHkb%2BP%2F6yE%2B4tcdNdUL8st%2FBiuqsAlfSP3BMBGDob7PnLHJtisoWjWVtLm2OgBRbTQjYWftSh8Gw2vOzIlu9WX2dhu6iydVkBIajQh3NsiWgbfVDnx3kYr%2B9tmM7trJXSP4mHnYaqgi%2BxB5yvngy9EaZSe%2BTp8JHF5r7xEACxDcvaUDDYxwYbn%2FRQAklg1poe86ybBYI4TQ%2B%2F7Z2erkjHltUs3wQrl1dOiaoWm0dDoI4sU5iZljrlA%2FsjzvZMZOYZEioo0eeRvtP5fX3YVGCBh%2FrdF1r5BRnqQjZZ27gU6WFDz7mFIOq6MneZ8Go0pLKNm0JaQ6MrWg4EGFYo22kgUGU9BdGoN5r7pwEL%2Bhf8QTf76XijKA845S4WsRhyUF1WL%2BQOaKv3CzUd1rFV8u0yFXwPQ5NdwUbMH%2B4SzP%2Bh09Yb5wpl49SHQQmg7sFVXXuKAszUY4FAeuRTbMPyY18sGOqUBM1NlwPwrCe5Bz8xDJ2GiQ%2BcPQHaH%2BH2zPWQt5jzKIK75wcIIVJ0QU2Vg9sK1WB8HoIwaOyvGlnxj%2FOaM5VVd%2Fr612N0Ip%2FVpOSWwPi9fOO3tihu5Kqw4lT67CEoIzkAz2D1hQjdu9i1yTp2lH4mqBOC8TykP0LhxTEr571STqDW6dsnoTPIYKd%2FoRG10vV5dehD8JLl3NATReSSegBsfHuDS8C0J&X-Amz-Signature=2fb3703fbdd969ea3d5f9373b7379a65497e5e526956748143f22a45f23af284&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVHMKP2V%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T080120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIGTO2K2plOETlQYc4CfMuHaLXCzRzREkYEfwFUJTS07NAiEAxILoV8GoNU755zyL2PA2G7JFjNx1kL39miAxj6MWsewq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDK2DhLb8tPjcqi04yCrcA6d6a%2FXyH0lICdR8B8%2FhWxwg0ZtxE77JUd3rFKR%2FkkDliRR4qUGboVbFHvUWWKA8uvRhem8yGoKEQC%2FIvGRPFEi7agd%2BK9tgXtzEdvFYqPvCDnbthcKKMS7p%2BF7c2GlyxExYmT1M8rIYPIyh%2FPwnh%2BBHeT%2FRwWPb8I78o%2FLyqd81qP%2BUVRquWoux1Oq3jZo2SfHEkCnXm2AtLZ7eOA1ihixqVkTOvk%2FkTbP0XupRzWL5%2F%2FI9DfaENq%2BBRUQ%2Fjn0%2FQ9tc4WT%2FKDw%2B%2FqdTGMF99gcVfUSBAyuXrDbKtb%2F3JbS0tNlCT5hvCL5ZMVcTRVP3uVlP1RgMvLXx6OZFJlV4gA3zmpayKkiM%2BMNU5lgXadvI8x8tEvXYalcimn4K88RXZ%2FFlCHu0X5TOKpQ4Irw%2BrndFqwr%2Berf9AFAvPuTtDc0o3V79p7jVz%2B3%2FnPu9RSS%2Fshi%2BtaSks5WP2KwKudBZOGe%2BOh5XF9LtmWZr1uPZpGkma5DDWfpN8mYVWIoN%2BHFQ0FFwJuSW%2FSiv1cfTWL3s7PsyfRxoESSWt8Ww5HxTMbkU9Dgj10vK75mhIDxrEjBRxT%2Fgh%2Fko1sAPae4Rz1Lo7en0KmYfROfUXGDF2vzCLICfNlH1%2F89ZVSarAPvuMNmZ18sGOqUBRMP0q1%2F3Zw58U2XMBovl8heY%2BKM6jdMYTEfTEuquQajl1WiOhIazzlhWv7YS5AeZ7mQkrF2VElx2Ta8saSu9S0QZmXTnODwhpXQU5RD8OPK%2FAOSADdeK9k1Yz2wBRJGXPFLfhG3V9p4OwAdHratzPd%2FemDdRY%2Fhewo2QBOvg%2B170ejIGyxnRikIegZ0Kpbpdc6KzOatbDqUOZbUetHzz%2B17JoJ3T&X-Amz-Signature=cf37c9ad488df03236a1cdc4015db229a070e004ecbf213f01a54de8616cf8b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVHMKP2V%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T080120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIGTO2K2plOETlQYc4CfMuHaLXCzRzREkYEfwFUJTS07NAiEAxILoV8GoNU755zyL2PA2G7JFjNx1kL39miAxj6MWsewq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDK2DhLb8tPjcqi04yCrcA6d6a%2FXyH0lICdR8B8%2FhWxwg0ZtxE77JUd3rFKR%2FkkDliRR4qUGboVbFHvUWWKA8uvRhem8yGoKEQC%2FIvGRPFEi7agd%2BK9tgXtzEdvFYqPvCDnbthcKKMS7p%2BF7c2GlyxExYmT1M8rIYPIyh%2FPwnh%2BBHeT%2FRwWPb8I78o%2FLyqd81qP%2BUVRquWoux1Oq3jZo2SfHEkCnXm2AtLZ7eOA1ihixqVkTOvk%2FkTbP0XupRzWL5%2F%2FI9DfaENq%2BBRUQ%2Fjn0%2FQ9tc4WT%2FKDw%2B%2FqdTGMF99gcVfUSBAyuXrDbKtb%2F3JbS0tNlCT5hvCL5ZMVcTRVP3uVlP1RgMvLXx6OZFJlV4gA3zmpayKkiM%2BMNU5lgXadvI8x8tEvXYalcimn4K88RXZ%2FFlCHu0X5TOKpQ4Irw%2BrndFqwr%2Berf9AFAvPuTtDc0o3V79p7jVz%2B3%2FnPu9RSS%2Fshi%2BtaSks5WP2KwKudBZOGe%2BOh5XF9LtmWZr1uPZpGkma5DDWfpN8mYVWIoN%2BHFQ0FFwJuSW%2FSiv1cfTWL3s7PsyfRxoESSWt8Ww5HxTMbkU9Dgj10vK75mhIDxrEjBRxT%2Fgh%2Fko1sAPae4Rz1Lo7en0KmYfROfUXGDF2vzCLICfNlH1%2F89ZVSarAPvuMNmZ18sGOqUBRMP0q1%2F3Zw58U2XMBovl8heY%2BKM6jdMYTEfTEuquQajl1WiOhIazzlhWv7YS5AeZ7mQkrF2VElx2Ta8saSu9S0QZmXTnODwhpXQU5RD8OPK%2FAOSADdeK9k1Yz2wBRJGXPFLfhG3V9p4OwAdHratzPd%2FemDdRY%2Fhewo2QBOvg%2B170ejIGyxnRikIegZ0Kpbpdc6KzOatbDqUOZbUetHzz%2B17JoJ3T&X-Amz-Signature=12e8bf66e636f8bc886279473c29f6385ce85c7c0602bc9364d3157018745d65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAXT63PN%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T080058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIHAa7mssSG11WKmOixbTuFLzM0wf717fsRvCNCbym4KVAiA%2BYfTGSyPDyhw9943jJbJozbAPWlPnT00DzUG2tYU00Sr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIMO%2FJL%2BLCq4UYPOjHeKtwDN6Dq7CvgQBf4eBNuo9q9pP4BMtxW2dbISZc0KhdPDewEm4qsdXqINwJqMg8sf1LeJVnPJVG0eze0cfnRRd7S23LTOJBDTt075U0YR%2BSl5SulG9SM5HW47PWhlMP6hSD8Bqulgs1ou1lLrkEYrUsE6o1LP7t3QCeKqlAq3atkxLokg0rgZ87QYrABaGPLYOuoYMdSQdEPb00gZAaKmnSKmqzs8AA70iv4Zp5kHvYymj%2Bprk3gGwBJmgW%2BTjFq7PI0GTbSZD2BjFubpcwTjRc7rFUUXjI3pdv%2FOEirEZ2ADJm2G92bsXpmI6WgCOsCetNbFCT5Mn1b39vUIEHHHCIUq9sRchRpiDtBmXy7NU1PVhCpCPEYzE5DmL3yB1ZtVQci4JTY1Ukxsunhhz94UrGZw7pFTzPLJdYCRZvmNcByRlZLQSypsoAgkTgMS3KB1pjsPM6rmZR2hdf0AKm5FClWZa3Du5tSpGjGn9wEG20RpevbHO2a%2FIUkS9rWbVQXGne6yQ%2FPpDjRiZjj3ETKsmg3NK2AAShCr6DYITkcigFsfUirg9aImCXj%2FSGa2yeEgHnJUeIbqXLqzCVE9AVk81IIsXGKJDqucdw48veJ4c0khwgqoDbFHshti3jtEQwwiJnXywY6pgGIwL1utic21ffiWPMu9hiH6uSNsbkX88xIeLxNhuOt%2FLVjKL9%2BtNAv4GAsAbPpOeNfCHGgrfmivGhK5wGCiYqvki85MXuFIzIQaWl2YHOsjLGNJ%2FyqJBkRkDc4D1B5IO5UW6VB2cuszroObZDmPIZqTgkiyaK0%2BEC4zcYWc8b52ydqYsnxiUtdWv0Q79ixJIeQZ8QsDQP0fgcFVP3GdyXZD59bc7EB&X-Amz-Signature=d480ff20c9191d693efff5f3a7caaf45a25ab6499ae719d2d891e5af4db0075e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NA7LNBC%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T080121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIFauC0a5Q6oxEjWT3c3tfkbxgcaJxBum0rlILjxNfKc9AiEAsS%2FOl%2FzUBum%2BcbHR17HXUK6AKzPl90IW8h9Ny9xd22Uq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDEZlz2fd9oxV8nRriircA%2BrxrsxhxJg7qRS%2BWI2ogeVrxhlFPHhkELGen6ZYshF09pt%2FbzVpfmM5fKHHigUhijkrCtkG1ul62MUNEZKtTDGJML8jm%2BRbQ3OsxPz6jx7CB4LHfELoGi9UROmfHtw%2BLYp0G9iNkQoCj%2Bg5UptaP6FVKhA76v8hFr5r%2F%2BvLTKCvJjmWa5fZpEeLBy09oRT5EeA%2BEXX1D0BhiHDWl%2B%2BEqkQlzkEfMvAFO3PVcoasC7D2ICSfyUq1DmIkgHPmy%2BQfpKq8TVL%2B1VRRv9AVhEI1d%2B8SmncIj8HNb2GdAa5TvVKIHmOsrE3ZNDsJg65%2FzMczYh%2BzUgOG90LKK22a6CgZDHzxYYD%2FKkLcT4MhRt9JODo0ycV9AWW6Ij2gNqBDkkcD89ZnsAgUeClD614Hu0f%2FSXACAS1yUJqpSOT1gS7UZSw%2BEuc9s7OSeCDqaxgH0xCDyHp%2BA%2BgZXxtzb9REwrs45gJRgrAeGrRBE02oO9iEQgH4MkYOUK99R%2Fhf6F0K1rKyzXlhloCGk3wCP7cV5IZzTh9aonA7SnMseWI93SE1%2BvFQDFBsMdLw0iZZve1d0ePXPe2v5sDXrAYVe97IL7oFJI9fpjWl9Z9oLjpKohb%2FBZkN33LHCkEYs33B7uBQMPeZ18sGOqUBTgJ6%2BoPa651%2FBam1nOrt%2Bapvud%2B3Ok5CvfJOTEEvn182RbeUKLBMPrzZS7Dc9F5mwCuJvwRacSMECfYri3UOk9zqA2bvGB4NHJVzlnvBT6nh0wa82rYdI%2FTumhiwMnXLc79aBs5KRJIAeaI7SEL4iKpLGQbCucldYO9viJlI0B%2B4Dl9ZQWeBINsVE0kFlX5m0ui%2FsyeAHNvNvTXt0zOyePbVZGPp&X-Amz-Signature=85e77d6c614dd379d777360d13b966de5bc3c8927362f991880089dec620c6e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NA7LNBC%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T080121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIFauC0a5Q6oxEjWT3c3tfkbxgcaJxBum0rlILjxNfKc9AiEAsS%2FOl%2FzUBum%2BcbHR17HXUK6AKzPl90IW8h9Ny9xd22Uq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDEZlz2fd9oxV8nRriircA%2BrxrsxhxJg7qRS%2BWI2ogeVrxhlFPHhkELGen6ZYshF09pt%2FbzVpfmM5fKHHigUhijkrCtkG1ul62MUNEZKtTDGJML8jm%2BRbQ3OsxPz6jx7CB4LHfELoGi9UROmfHtw%2BLYp0G9iNkQoCj%2Bg5UptaP6FVKhA76v8hFr5r%2F%2BvLTKCvJjmWa5fZpEeLBy09oRT5EeA%2BEXX1D0BhiHDWl%2B%2BEqkQlzkEfMvAFO3PVcoasC7D2ICSfyUq1DmIkgHPmy%2BQfpKq8TVL%2B1VRRv9AVhEI1d%2B8SmncIj8HNb2GdAa5TvVKIHmOsrE3ZNDsJg65%2FzMczYh%2BzUgOG90LKK22a6CgZDHzxYYD%2FKkLcT4MhRt9JODo0ycV9AWW6Ij2gNqBDkkcD89ZnsAgUeClD614Hu0f%2FSXACAS1yUJqpSOT1gS7UZSw%2BEuc9s7OSeCDqaxgH0xCDyHp%2BA%2BgZXxtzb9REwrs45gJRgrAeGrRBE02oO9iEQgH4MkYOUK99R%2Fhf6F0K1rKyzXlhloCGk3wCP7cV5IZzTh9aonA7SnMseWI93SE1%2BvFQDFBsMdLw0iZZve1d0ePXPe2v5sDXrAYVe97IL7oFJI9fpjWl9Z9oLjpKohb%2FBZkN33LHCkEYs33B7uBQMPeZ18sGOqUBTgJ6%2BoPa651%2FBam1nOrt%2Bapvud%2B3Ok5CvfJOTEEvn182RbeUKLBMPrzZS7Dc9F5mwCuJvwRacSMECfYri3UOk9zqA2bvGB4NHJVzlnvBT6nh0wa82rYdI%2FTumhiwMnXLc79aBs5KRJIAeaI7SEL4iKpLGQbCucldYO9viJlI0B%2B4Dl9ZQWeBINsVE0kFlX5m0ui%2FsyeAHNvNvTXt0zOyePbVZGPp&X-Amz-Signature=85e77d6c614dd379d777360d13b966de5bc3c8927362f991880089dec620c6e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2DP4SMG%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T080122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIA7CZlfo5U9gop9Cm7B0nhzJni0xEtiHyqwnljfGWExmAiBhuAXmffOy1D66kBO0NH2DbvGb6nZHhpLwfB4nkR8YlCr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIMY%2Bn%2BUfspgnynLXaaKtwDPBQ0iMZzoDuIErDz3PZUiKmZQ7PXcCVQjP8t0VntR8WZTwUbbqCMJdJarkesv%2BfNIOW8GkuNllIpmtVAiHlcZgH4gVJSmobJUY%2BEWAYaXoZyKo%2FAuT3DU%2B1aNdoX07LCtp2jhZ3cjCo0uZdFWteoiyMc2iAXR22pfLYecqTnbEMMV3F1cUKP5FFxfVaP3ghV2ZhI3kpqgVLOyG3bCO7vhmQ8vXXjB1bZKqO52n1kWBIUO7e9P9rKBzOk5O4mNEIpXlSFZdvyM8HpQ8yXZHXxP6kXZ9sFONmFXGs%2BJndxh7qJvIPjYxpxd2MjlSLsN%2Fu5Cf2yu7zwbg%2BQVwx87PORfoMj1qxU%2Fzyhjfab4zcWQRyQCS6RWGnnldwAU5wG6sbeXFygydBnzr%2BgaT%2FdapwCTbagnhx179LoBChuU14OyvXm6yTtRkn6ep8wzpGox0pLusgZIW7vDVXoF0C%2FNH4J1V0YlW9%2FEfl4i4wPOVRCgKgihG3iF4EFNjNYuLXNyqhnNJh1%2F7ALmqDpHhibMqDNvrSKLAkclf%2B4JHFhTm810IAuWYTZwQFCvX1wknFN1DQHT7jHmJeUBl2ry%2FWgd%2FozZ11Z3t2Axphsew04LRTsqBIoXolhC0%2FGpqguWiMw6ZjXywY6pgGvbU9XqgKSMVY0h5SGg0qx1gr4wTh2%2BKIdMek4NsJ2r2KLQm9LtgbFVSa8ayCHyerKicddzgqn2S32PUV94ypWcQ5mj%2Bv%2FmLjeT3kF9Svf3sBm10dVIjBPIuUbGyL3h7d8q%2BtfhxeENBjkhyXQObxiwjgKiEeO7OcTppGTfHZGDgCEoRSYqMJ8rHcUJpvH9gS6%2Fr27A3696QIqnj68tfwbAL8IAHu4&X-Amz-Signature=e279fa67a89a61d8577cbd0ad80834164c933e39c17775977da4abc4ec3bf086&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

