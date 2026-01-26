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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNYZHRMA%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T141658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIBHw6aBFCCLGvmQl7xhE9WrqBcjRUjv%2FNgrMWS3zFvOfAiAapmiALGH8xmdE4XpYPGVarSqt0QOmI7rvFKQ4FYFY7Sr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMBL4WkYKAFphgQW3kKtwDS0UuzJjGIZOqq8uR%2FF5Ou0Ay8zVwpiUFk2D23axnDd8DThEiwBPZjel%2FCuTrLadXftjytT8bZnIWORQfBEenPVKOvShvSuz%2FVkOQyrIhFfg3JvJAvNFTaSlLyJNknpnJKOUMl86XlAVEMy5QtJPYedkP0SJ8OJmbuOtZXXni%2FiLcXBF%2Bd1CzoGbARfsW7B0Nt8ZgHVu1H4hXaFgIz6oU9wqUYw8dDBUqGPido9%2BBnwxywuJs%2FkVG4w5ea9%2FPy8x5%2FHKWFmRmk%2F2gEr98d0Z0qpxtPUnhv16%2FcERkCxIl3yut%2FOdiUXKUJGW2QlHDCsC4ncpS8p4jrNb2vJeQx%2FKXpFnM%2Fxrb7gK%2Bgk%2FKfdR%2Bxb2q8weut9XxyXvkP6DgQF4Na2kOTBqPmbA2fJJl1kwypGBHqwMLBcM9ILedLQVtHnVASarK7%2Bi4tJbGWykNDOmBKsc%2Fa0DI89v%2Ba1yP5WPbkdPDPGrP3hniilATsgEiWS7epYMH%2BdtKzFIcbsRSZOopzsCqC5UXBO5utsW174Rj1kW9GsT3o6Tl7vVWUK1vrrdZULNS%2FPlt%2BMIvSX5HdhHV4XibM9%2FRWlTlv3JyCD0jJ9mNdNIDyaSLCxhZLYXb37D%2FT9%2Fq7NTiZcPsy0Aw5t7dywY6pgGEnXhMk%2BvkayUADPaLac%2Ft9ul8EMVxYRMAmHY6SwrgY658GY%2BYzH5WVbhY8WE8v79G2Fp8dBnF6RcCQ8n%2FaxMN39Trh7oGKE%2BVA%2F268gjiBfqxyOITcOaqx1Axh%2BpjRzEv%2F29Y9M%2FLoj3guZ9NRCxb1WbKHSfATUo1%2BcKxbgUdFHVuH7PTKr6ZvzHKPReWR51Vo1D2Cp6Z%2FQZPh7gpKIxWMGFZynNf&X-Amz-Signature=a5178b941835603b7ec62d801b85ef33eec1836006b68a54807fc35696715b66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNYZHRMA%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T141658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIBHw6aBFCCLGvmQl7xhE9WrqBcjRUjv%2FNgrMWS3zFvOfAiAapmiALGH8xmdE4XpYPGVarSqt0QOmI7rvFKQ4FYFY7Sr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMBL4WkYKAFphgQW3kKtwDS0UuzJjGIZOqq8uR%2FF5Ou0Ay8zVwpiUFk2D23axnDd8DThEiwBPZjel%2FCuTrLadXftjytT8bZnIWORQfBEenPVKOvShvSuz%2FVkOQyrIhFfg3JvJAvNFTaSlLyJNknpnJKOUMl86XlAVEMy5QtJPYedkP0SJ8OJmbuOtZXXni%2FiLcXBF%2Bd1CzoGbARfsW7B0Nt8ZgHVu1H4hXaFgIz6oU9wqUYw8dDBUqGPido9%2BBnwxywuJs%2FkVG4w5ea9%2FPy8x5%2FHKWFmRmk%2F2gEr98d0Z0qpxtPUnhv16%2FcERkCxIl3yut%2FOdiUXKUJGW2QlHDCsC4ncpS8p4jrNb2vJeQx%2FKXpFnM%2Fxrb7gK%2Bgk%2FKfdR%2Bxb2q8weut9XxyXvkP6DgQF4Na2kOTBqPmbA2fJJl1kwypGBHqwMLBcM9ILedLQVtHnVASarK7%2Bi4tJbGWykNDOmBKsc%2Fa0DI89v%2Ba1yP5WPbkdPDPGrP3hniilATsgEiWS7epYMH%2BdtKzFIcbsRSZOopzsCqC5UXBO5utsW174Rj1kW9GsT3o6Tl7vVWUK1vrrdZULNS%2FPlt%2BMIvSX5HdhHV4XibM9%2FRWlTlv3JyCD0jJ9mNdNIDyaSLCxhZLYXb37D%2FT9%2Fq7NTiZcPsy0Aw5t7dywY6pgGEnXhMk%2BvkayUADPaLac%2Ft9ul8EMVxYRMAmHY6SwrgY658GY%2BYzH5WVbhY8WE8v79G2Fp8dBnF6RcCQ8n%2FaxMN39Trh7oGKE%2BVA%2F268gjiBfqxyOITcOaqx1Axh%2BpjRzEv%2F29Y9M%2FLoj3guZ9NRCxb1WbKHSfATUo1%2BcKxbgUdFHVuH7PTKr6ZvzHKPReWR51Vo1D2Cp6Z%2FQZPh7gpKIxWMGFZynNf&X-Amz-Signature=a5178b941835603b7ec62d801b85ef33eec1836006b68a54807fc35696715b66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZMM77D3%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T141658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCy8ACjlB4GYSEt0M1LUdrmr9ltIepJuan6xUFNARIZdwIgKzA5D1q6gC3NhoGE0SfNbhFUf3Yz2YdOf5UNM432vHMq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDC90%2BNt8iBBbmLA%2FQyrcA6auuJwj5JIS6TLzemrN9yZySq8hdBe5ZRZ7%2BcnwybTa1Fxv8P96uhXAmxSf74P5Iint8b6I0krsC2XhJGwD2i0LounN2hoptwb8N4U1orMw431jQCkuAgLb8wKWGmCvZeV1z1t3Ab8g62K8ZcpxJYG4CThuXhwzNDtpIk7Fr4uuTjsOraArEbsRLtgQpZmZJu7Uxoo1tHMMnDSw1bnaDkuSb0pHK12FysMvcH3eETQsZZeyWnYl4dHDx%2BTeWInxSGqCDhF238S9aGC7UYZiBZYHWTv4mkm9RHN4dyg6XAf5yJoDAt65Je9dsDuChkEJU33Z3uBu%2B0MtQXMXl8AHDv%2BZbdIWC7q38Rfirlqtbq3X%2FzWS7f%2Fkszdpho5NHYOXlXMmbK8YKSaTLZYyI31ZkMK%2FjSWHHykqXy62pkb%2BRnUMeFYqteMcOkMVo3Yf7QPBLo7sd2Rr6cHOeZ4h4WfypXFfQTA74NY6%2FA9euVB%2FHvSJGwOAjIcy09kmmhdpXtUnmgmI1SAlSUPC42EwV2NWg%2Bwzhm0ZpMKCEQAdL7Dkq1hxz2s9WxuekQN4FEMcDUuNpaPZfkW8ZwlmSWhI0F3hrZXxfzQmvyQ22H%2FFm2dVuH1a2MLkzdJxs6pgL9IxMI3f3csGOqUBget3JHivzneMu5Ygpt8SHrJhhEWaZ%2FOV0q7afgCiQe3uFY%2Fw1aOGtgQYG0zYi4GL%2FFOkkon07o9%2BV67kqeXfvrCQ1aggLrDNBKa9qjLk13q7qmWjOnA4Pd9T2GLjXkjdhmLZwcilqOYBLBQC72nt%2FuwYu2%2FoMD4tGHx7XsnTDGXhY6ux58r9IptQl9UL1RIx%2B%2F9kNedRs67RXoJY6iiUqPMMnUTl&X-Amz-Signature=53c4fb88934f7b701d0b363cec1b6fa3d3d879222fcd117f307eb6d0d8406171&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLLCIFCF%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T141700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQClzEtMNwMLK6oZLVXhX9dD2jFey5uwaxJJev3pogNYXQIgIMCDDy1HrhitG0g2jMgdsy8w58Z0lAQk0SyMLMEEl94q%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDHXoUcxZxrdioiVPcSrcA0TclfqWMUax74b2R%2FRzcqH%2FNEH3TIu0igYTFP0CktmFZGuX7v9vlhu%2FMbyO4zepY2W5euIw7NJ%2FMfThrf0QrChG4bA3ReXzP8sRJkjXJVJEiin0DeMH4jAbBiqu60U877qP6NJ91zkc16fKzMNuEBqemyXmYIHd%2BFa%2B%2BK16WeC5nh47L7OtWibljc3YwtDJCARhiZXpNE3y%2BETMpcI8CZrMefMgllr8bJXVrTe8ptU3h5KU0ak3r86Z4RHFxmc9yRiIroH5y3h9QhcEQ6VSEF%2FADdIq0%2FIO2jfDGviL61fWUYKtMShw72djpbLD6TMxqmpvRO2FXOhGc5%2FCauUxubqUguK1HERu18c4P5H4%2FddrOLUb0c51Z5nDsSw6IqPNBELZ02y5cud5Dy7%2Bb6knV6%2BHqkl7x3%2FgvcgAnNO4Xr8eaK4MTYl62bBNPkl03pCByaxv5ZSQuWK8pxL%2FHGzBK4%2FCxKWhDlLSCiVrVpXhdf7QnsnujPPMU%2FqwFzqs1r89wUTtOUi12ILsjSH0obMnTDnJnvYSzv%2BW3V2RI809RX9l4NDzXnde9XJydi0fgCvw36HXSlU14nQ9%2BMcrQqnpnIxkjaZMzyowFfvJX3tQoUKd0MMO3M2rTJyZmRQRMNjg3csGOqUB0%2FU5KOe9gMa160mfMHg2gCMfLWktPnsQGwlDveT5ruEmEwVClohNsZ5hrYgAtMsFvYnN8%2FZvd17rCDSnro2xQhigpk9elwvmBcd5wYyvU0MztfstnNTDb88r6DYoNBDHsvsw5bqAnmitG7UatqYOhHesMseumcg5%2Be6EZmWH%2FNCLDSO%2B1XQ%2B%2FSzAKX4rbfEBbgXiDxKB34NItCyHYc3XVlhXg7C1&X-Amz-Signature=0c66cfc32617360e70e84a689dcba0488cff46cf14552557e865d1490c211203&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLLCIFCF%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T141700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQClzEtMNwMLK6oZLVXhX9dD2jFey5uwaxJJev3pogNYXQIgIMCDDy1HrhitG0g2jMgdsy8w58Z0lAQk0SyMLMEEl94q%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDHXoUcxZxrdioiVPcSrcA0TclfqWMUax74b2R%2FRzcqH%2FNEH3TIu0igYTFP0CktmFZGuX7v9vlhu%2FMbyO4zepY2W5euIw7NJ%2FMfThrf0QrChG4bA3ReXzP8sRJkjXJVJEiin0DeMH4jAbBiqu60U877qP6NJ91zkc16fKzMNuEBqemyXmYIHd%2BFa%2B%2BK16WeC5nh47L7OtWibljc3YwtDJCARhiZXpNE3y%2BETMpcI8CZrMefMgllr8bJXVrTe8ptU3h5KU0ak3r86Z4RHFxmc9yRiIroH5y3h9QhcEQ6VSEF%2FADdIq0%2FIO2jfDGviL61fWUYKtMShw72djpbLD6TMxqmpvRO2FXOhGc5%2FCauUxubqUguK1HERu18c4P5H4%2FddrOLUb0c51Z5nDsSw6IqPNBELZ02y5cud5Dy7%2Bb6knV6%2BHqkl7x3%2FgvcgAnNO4Xr8eaK4MTYl62bBNPkl03pCByaxv5ZSQuWK8pxL%2FHGzBK4%2FCxKWhDlLSCiVrVpXhdf7QnsnujPPMU%2FqwFzqs1r89wUTtOUi12ILsjSH0obMnTDnJnvYSzv%2BW3V2RI809RX9l4NDzXnde9XJydi0fgCvw36HXSlU14nQ9%2BMcrQqnpnIxkjaZMzyowFfvJX3tQoUKd0MMO3M2rTJyZmRQRMNjg3csGOqUB0%2FU5KOe9gMa160mfMHg2gCMfLWktPnsQGwlDveT5ruEmEwVClohNsZ5hrYgAtMsFvYnN8%2FZvd17rCDSnro2xQhigpk9elwvmBcd5wYyvU0MztfstnNTDb88r6DYoNBDHsvsw5bqAnmitG7UatqYOhHesMseumcg5%2Be6EZmWH%2FNCLDSO%2B1XQ%2B%2FSzAKX4rbfEBbgXiDxKB34NItCyHYc3XVlhXg7C1&X-Amz-Signature=2eec706d52d2c6d9d63dc6d18bdc26181ee23b6266043ca609816977582a4a55&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZW53C76%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T141700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIEZe3QaC6hx789dnglPTq9k8WZr9rpkDBtzvAwe71dlRAiAVPV9Cdujy6da1ZuRt9YndtmbnkcxoGfaHRW0Cz0NlTyr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMet5KEei6g6BtR9M5KtwDRXtD70KI7fhqetNVh3EI4xhAbDCvPINd8vEI50bQGfPislKeDVVlPxJRKlIFRX7ucPUKAYTbWGb9nN6hl8dCZllnypYmEXdDJoKL8T19%2BG8kjYqMguDDxPHuB4VhbpaH4lMEoqj3KvyUdHZ9Ljfoi8nIbvB7Q3R3pIHXAOmjthkeL%2B%2FGbGtoJ0U7iUSr9R6pPvG9cu%2FExBD4YNeLjpoPvSf83B9L3B6eFZ%2Fo%2F3acRxYMoODiJJhxY%2FRDHHqTMWB2ATI6H2Ae3RbwgvDARAwD2U2gsfZDHBA%2B77h8fQbiSTkcOrLW1tN0VrWvIQ2V2lQgFByquTks6ABAxAT2%2BmEsthIs%2FfwxEJq3nMLG1IMOTOEFb%2BTvgcW2xauP9Q%2FE%2FvUiKkIhHkYizFFTqOEQfxaX%2FdGL1Heuppf6GM3zLE%2Byj3aT7HJyAxt%2BHc0LuMkxEP3kNZBFJJW7plHtq%2BK15QeZQSNZxjDhOb81qictH5RH8qjxe4EfqapUgFIzCW4qafUNai5LKBVRSshWxCsbI7WsOslDRe6XFGJJPGi6RNBohCnjAvKDx%2B3DMQiT%2FQ4TMPuYux5Ab5IPkF%2F1jtK89PaTokiDVZmsFrPpKUjBAcZXaQAhKRBMhDkiwQcpLcEwmd%2FdywY6pgGZ0gpPCBbTShUMbCRWpCCt0fXuU3ZqickcLZzpU4rcpywNSNckduvnKpl05VNMJXV59sF%2B5KkdjsO0N0FdZK%2FLf2N4yxehXkBnDMp1BQA39hF8vbKoBIrGaHTJuRGIg58MalJxGWGSwvllmYhdE4hTO51v%2BAybVB270lmRPLclnkxqU41iMw97w2h78tP0Dae%2B7dtsssseaXal0T6eVdr4jICKfAmr&X-Amz-Signature=ad0dc06adb8b5de530a6e5300a8cc792851ab7bc6a97855f4967804a376db86f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMATMK5B%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T141701Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDgRNZAjZRyCRNGxVHQvJVHHdtjKbfDjtN7%2Btnr24iJQQIgPQzfv%2FJ0qq5wnOGEZ4lEjg1ewyjT0lf74VswtEdWpR8q%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDNB6DdIQY9pIdJLB8ircA8m7bKAsLCyJ9ZbvvI1b%2FHEq2trk%2BU48oLrid2rYbtns5VURYcJP703jkqPKtlmrEhqT3z7ty4L1lsZrgeKH6b9pjdSb7BIAdcPYpwVzYl3Ojq%2BDiV%2B%2FrBEEvBAu5hIVB14fmGrZ1VT228GRH%2BuQzONl%2FQuRsl%2FtjxhNpDK9pVvF1hx4A8An%2BxlHQzSGREbgBHnVO%2FHg5yVYB%2F%2Bz3bxsrrue9bjn7eqkeoUZGU8T1b%2FMQIep2mgqWWB0xxZdI6Cs0z98S%2BfP9DMiDM9TdyeYhNWw4mCyVjD%2BkhI%2B0yl%2FN8eSrjLl8B9anzwE83Kmhti8itN2WuQtTtXWgFrxRtEsTiIHW0NCyF9O4go%2F9SjXL3VKNQaAPtk5tonwG6Ps0LnR%2FK1ibRgnlQhi2k%2BgHs9WCygLiRJzydzpou6pM5vygSPM7uHpZr3A2xmJFFldvDdpV5M1rTyZTp1AcEUSZHeanjGDFcYbF1BGtIxi1%2FybnS%2FcaoeWqHL%2FiPfgdMW861l6MT7ZTNclK%2FauynwvIRXFo%2FP%2Bm2onlPm5NCfkXIX1Kusp99f1sv7Fuyi9UZq0tthEOwob%2BY3n%2F6GNkq0nzEL8RxkcRUaB4TE%2BYth2n1SFXXbM0RN%2BwLFO1L83zBz2MPHe3csGOqUBwE2NogmhfTOghRkUCsmsQCbbAToZURoY7EJSX1k%2FOSI7XKxX%2FfHkY0vfFrNaoVWs%2BdJ9zXphOFmdEZzs2C%2FP4oQpTJPZ1mib8kH1y5lFA%2F0BCFcOCUiy%2FJD8yFq2sdLKFNlm%2BlVhSFPX0%2F6ROggh0GgQTMD1IvDv8DA2hK5wYEsxsDTyejXznqWf7378Hqz5Ou%2BT5q0AH1izSn7htCwmnvgQ8V1N&X-Amz-Signature=f52e14fde2c960a85de3a81c26b7ff9b677162394a9c029ba369ddbecc881a9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPS7XAFO%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T141703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIBy2OiiVPtY0P0LhJf0%2BKjqfS3bDaSqafPfQHOvWs6ZIAiBvQGWa9T71lNW%2Bnk5Gbndmo9LQh5lGBU2vhXHKbV5qgir%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIM1dC6MW47enpL6hnEKtwDOtukkdG%2F9Iu%2BcpSYRWI8YWAKsdC%2FgIvU8IxGyjPoxi0sbhf%2BMARdmR7YpfT1VO0I3K7FvwQBf9H%2BoQx8vtzyUZyPS9enoDnDTeS9SjeSwhVIC9mgXRKUpI%2F9VXt4rybdK%2F9J9sY2P9d3zxoipxJ9xfLVDsIQXK0F5B2QQYWvAn3UtWNKXdmMOD7Hwx72LnUyCb0yfM%2BYm5mucn5zB%2BLznC28bSbKj9WZq3nX%2Ffk%2Bqyvsf%2FrU%2BhvvUlT8lkIkoOViXoWGq%2BhF5Mp0ZfrvUngpWo5QGgW3xS0n3upk0au0eiAtjJp15gmhYtXCCIjrN%2FhqruDeIAQEXSmWQEkFsTZ24BCcUXPF9maf1TNtwIB8Rz6MTfJEk5kIF0VDtffijTdU%2Fqp%2BVEqAHPzSDRSxSbDdlVBkIVMz14OvO8%2BgJZJVFDfbv8a5xR4gMMgk3egLE47RhT2Bkby6qdosEEuvY0X%2FRk6SIFt2eSxslBsZgSpiPVBhuzxG8UK29wIJaI2ZrLkmovzwGysxDYVttdmymph4dvLAXh7O0XOU1qWDJPfDyDOSS4BIUehaUtJ5xynbvuuqy3XgFzWU3ql848R%2BgtQ6jrkNCjCB1k7eW%2Bj%2Bj3tQ9z18hZ5xyhru0oDMFhMw4eDdywY6pgHSbEBkHlSBL5M%2FPXPCd3JLRrp8mDX5sxGX23LwPuhdiienIUSkvFcZ%2F5eEBbaGEv0GFLxZKlp9p4lFrgiEVgxKYzCgHoTTnl2AEBfIWYF6mdh%2BYRoO4WtMBPCmqLY9j1SQXaswXS6Y4cZjaVWMkrhFXYnFgfvhhz3VfJ5CHcCtc2y54dDH6J5VN9GpovvEb0KynKCVsulePGcqI6KYYACc0qMcH7z3&X-Amz-Signature=f207534e950675b0b948f906177006f6c0a0dda7543c30ff0b3d86dab0f0ec40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656OITY5R%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T141705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQDUYHwVMePyemnQLKYiO2ycBgdpY5UsbC4N8UbWjarTXAIhAP6tQ2QsYruksWJduJCXez3lKXyvZxZg9MVae3aMIxDaKv8DCD8QABoMNjM3NDIzMTgzODA1IgysceGOWsMpUXdDqvQq3AN772uwzEDoEjHwHhga41dlZoStXN1wCvfJdbHpv%2B6M%2BmZRmvUEG3hUYlNDnvxkjr6%2F5T5iz%2Br12eJdSjfQC70qp8u%2FiLm%2FUVGE48nfSGdZ%2FN%2FFBcB9etB8N3hwkhF5zF2Xdn1diOOcUwzyMxTutRWmWF8ewY%2FHDdYRH8I%2BCb8Anbvr35Cwjk%2ByrD3ZNQsD6kSXLdyGr8JLQ1nFsKZYCdRfAItBdzFjJhRy53hCNlYWHFuacRf%2BXsjpelyZdqWfHeZqSZjmHw8oQA0yG%2BmFCkFLWAr%2BxDv2IqHOAF2CM%2BGG8HathufxP%2F1UsEhn8nm1GK%2BTLkF%2FaDVJC3y9CWQ5GQN%2Fr23Q5ovN9rl3PWxq5H1cq7YBIoF2wPT%2F7XMphx51VlyedBXsAx7ad4u2yRUMbYTOsg1MpOyEvfEbmiFN8y9HVlSTeW1HaR2%2FQmB3gtqMsA3sZB61hieIrbygW2YkcwYwiI0HkLClocdBeF2TsLkj7ulmT571OKdYhTlrDht1GzNjWdRE90LU70pkXkiqy68uOthoExs6xFfamoEFELviHx4hfjrpik7Ae7f%2F0rnrZDSQ33NBNXKbacY%2BOM6K%2BuPWMfp0D%2BUFcC%2FNo1NLRScOKv1%2FAJiKPhM7BeXxtzCD4d3LBjqkAbiCNu0mSFuQh%2FFNd6QMcI8tovFwyMoZknDoxlAd4SOB4j4ACp9MkcrHXYQZKNBfEi%2BA%2BmH1omUWr4rkTFnvWcZmlrsGCgqtX4GspU83wzFsxbVC61sHBH%2BxcJSWhidN7YmeKWdB0okiYMWp20L2UnX1i3N%2FuPBAv%2Fe93fjFEA%2BDK%2Ft8Hr1Td26yUMbekjEPyKwUNImgNm1EbszckeBpfpR2jDhV&X-Amz-Signature=5708bee86f4bd129a54fe4929593b6d392db446b258b261c0b20cf6691d4520a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656OITY5R%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T141705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQDUYHwVMePyemnQLKYiO2ycBgdpY5UsbC4N8UbWjarTXAIhAP6tQ2QsYruksWJduJCXez3lKXyvZxZg9MVae3aMIxDaKv8DCD8QABoMNjM3NDIzMTgzODA1IgysceGOWsMpUXdDqvQq3AN772uwzEDoEjHwHhga41dlZoStXN1wCvfJdbHpv%2B6M%2BmZRmvUEG3hUYlNDnvxkjr6%2F5T5iz%2Br12eJdSjfQC70qp8u%2FiLm%2FUVGE48nfSGdZ%2FN%2FFBcB9etB8N3hwkhF5zF2Xdn1diOOcUwzyMxTutRWmWF8ewY%2FHDdYRH8I%2BCb8Anbvr35Cwjk%2ByrD3ZNQsD6kSXLdyGr8JLQ1nFsKZYCdRfAItBdzFjJhRy53hCNlYWHFuacRf%2BXsjpelyZdqWfHeZqSZjmHw8oQA0yG%2BmFCkFLWAr%2BxDv2IqHOAF2CM%2BGG8HathufxP%2F1UsEhn8nm1GK%2BTLkF%2FaDVJC3y9CWQ5GQN%2Fr23Q5ovN9rl3PWxq5H1cq7YBIoF2wPT%2F7XMphx51VlyedBXsAx7ad4u2yRUMbYTOsg1MpOyEvfEbmiFN8y9HVlSTeW1HaR2%2FQmB3gtqMsA3sZB61hieIrbygW2YkcwYwiI0HkLClocdBeF2TsLkj7ulmT571OKdYhTlrDht1GzNjWdRE90LU70pkXkiqy68uOthoExs6xFfamoEFELviHx4hfjrpik7Ae7f%2F0rnrZDSQ33NBNXKbacY%2BOM6K%2BuPWMfp0D%2BUFcC%2FNo1NLRScOKv1%2FAJiKPhM7BeXxtzCD4d3LBjqkAbiCNu0mSFuQh%2FFNd6QMcI8tovFwyMoZknDoxlAd4SOB4j4ACp9MkcrHXYQZKNBfEi%2BA%2BmH1omUWr4rkTFnvWcZmlrsGCgqtX4GspU83wzFsxbVC61sHBH%2BxcJSWhidN7YmeKWdB0okiYMWp20L2UnX1i3N%2FuPBAv%2Fe93fjFEA%2BDK%2Ft8Hr1Td26yUMbekjEPyKwUNImgNm1EbszckeBpfpR2jDhV&X-Amz-Signature=4897fe2d3dd1302465fa8f8082fbf247e604d01da0e8c67b6839319d8911dbb3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FGVR66P%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T141655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCPLmOj%2BthL0v8iLb92PsuFpPY0B1rz2G0XhSkbhiPRZgIgX8A%2FeTCYkdKeT32gEBw7lSPEEZLVqc8m%2FmMsC9pUuD0q%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDLnSh8rnSHniCLlAsyrcAyChHZfLyApkvXomSsyNIZ9gAA5nViauhVw3m6rxxd6Ky1X5UH96ttgDlPxDVC%2BeIdR5F0JV34hjnhXepBciEuo0Dc%2FRoj0ven6ZPpqFCtwwRy8P6QoNIFtQqZ%2BRqSYZ5%2FPdsdTp%2F5GBqmbDKjM8qUS93eJrynAqT2MWVnmO8BrnddSUibXELeF3LjG9VE6yL8DYli5RicyH0evtqu82SItmoCignncbp42rGArC4noGUGskVvbGtzErLedJldahD6N3DTnTBiag13jcyP6NKTEBNW4ybKcOaXiPN7d%2B9U1T7f3RkMoF%2B7MBxz9Aw8xlMkR88LeU07gS8ApHNVS6tNLyONJ2wdNGq4kAstJQrCoJi8w0TPWhvJy1b%2Fnth9ObGSJ4Ccwq1FTYEPa6QOP2EWPxsOW5YNrpOkKbFrQQnCA556h6eDjvexBgaQ6LsVstVP73vrvUIU9ReC7wX1Xpl8xX4MFj8jFlQCiYT%2BaIxL4PbgtDLBPdbLFaeHhl3RA9rQXb5I%2BfLOwbTdpZYyfdoSEOf0D3zG4Ak4Udk6UZlTLVcsfcDa0OLVIWDrS9x5ksZD2uqxOUsi5%2BBDsGYBDdsUdB7H565UkMMMKoeIjcFuaK4Waf6rXoztz2GqWiMO%2Fe3csGOqUBpPPNFPEcflU4lARhHHJWit24G5W7YyCI5GYdmP0PsA%2FKByFNEnoYtuIQu7q6HoNii%2BYtQ8YU0ujCRLQfcvX4SW38%2FI1XUQoZcftU8V06ORaxK1LgsjU4iEpm62%2BvPmXBC%2B6GBmNxfb9H%2FtAoCmtgPJuj7rVQXJ1pVd%2B%2BLYmy2cGEGpx36bxKFjom%2B4RDaaXWaqSdIoa0aQ2hS7HKzicS5uEJt2op&X-Amz-Signature=cd6dc44a62ffa7d41065a9372d38e457fd5f5fe488125cca4eec2c4e76be0915&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GNWOO6X%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T141708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQC2kWcUzHvleYRUgUeV%2Bc8vrndy8fKIepLR86OqbXmSjQIhAMrlPi1%2FVsdSswj5v4lN5g0iOG5PjaEbX6PGtm06d1bWKv8DCD8QABoMNjM3NDIzMTgzODA1Igxcshbauqz64ZwS4Wsq3AMOIVjiH%2FPl2heeG99B5MsPiapvvUjkA0xEJ5rrC%2F1Y%2BbZW8abKsMpOJ3rWHHF9G%2BnCTf6gKkF6dabacjCReHlumNeIAvRGWijujdw1zDkb5%2F5Y0d%2Flw4fK6XaG8JpTVL%2BElzbpebOF3tF86QwtSOf%2BsOWuaFWncfsmI8PQTXOyNKnH2L2u4DdAcFQ%2FJhvSckU5bfOKNNRp4uSPlJMB9kIaA3wWWL7hODv94qV7iehjmdIHzn8%2Fk2ckZb1L7FtOCQkCTC9xAYg0fZJcnwRBPekQQgavEfx4pvJLX4PqJuappqOoHzs9jOWDBBtd0tCz7HZ1b9dq5jUWqvB8ZNfOXqT%2FgkpGHhIB2ZqrhsToNNr%2FWfcMiWPeYaDvA69cDrW4J4P%2BsvVCSSezc%2BKTpa1UlceUOjxirxK50780UoW4rtjoKqGFreKV9fcPg5rYRqKlD0KZHleRgR0OoAUeo9XFI2rDK%2F2ezjZ9RWBRNrUykssPs36jhyKVahgc6j2MWucJQHsDSACslSAY8Q3baEjjKpT2e5%2B%2Fw7IUGuAQ5Yc1fIJJcLcGQwV1%2FNwcvvBNu9p8%2BtVu4t682TKtz30qEvKArSEokbptOXPJXULXuTNNPhhQShNfzH7O7qW6yZ1hgjCR393LBjqkAWmyygqvBtgme24argvqDneekrfZg0rnAxBte6Ht0%2FkeacxQRFPTcjs5J0COSH7B%2FD7TazkKCiPqQYBuq459LTEMJzsEtjwzyGnrf1jzMyEvntzIHlqj0mLlA3C1DRvQsbKNjdn67sThzqyg01JaY3Kh6PEMdWAo2G9FsDGPNCXSC4V0BtCDVOREzuqEaax%2BtQO2G9CH1w%2FrJXOi3ntQnURYgm7%2B&X-Amz-Signature=dc11f24a4739236f8989b3f5f16b2afd4354caa9ce3922648876055a56614924&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GNWOO6X%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T141708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQC2kWcUzHvleYRUgUeV%2Bc8vrndy8fKIepLR86OqbXmSjQIhAMrlPi1%2FVsdSswj5v4lN5g0iOG5PjaEbX6PGtm06d1bWKv8DCD8QABoMNjM3NDIzMTgzODA1Igxcshbauqz64ZwS4Wsq3AMOIVjiH%2FPl2heeG99B5MsPiapvvUjkA0xEJ5rrC%2F1Y%2BbZW8abKsMpOJ3rWHHF9G%2BnCTf6gKkF6dabacjCReHlumNeIAvRGWijujdw1zDkb5%2F5Y0d%2Flw4fK6XaG8JpTVL%2BElzbpebOF3tF86QwtSOf%2BsOWuaFWncfsmI8PQTXOyNKnH2L2u4DdAcFQ%2FJhvSckU5bfOKNNRp4uSPlJMB9kIaA3wWWL7hODv94qV7iehjmdIHzn8%2Fk2ckZb1L7FtOCQkCTC9xAYg0fZJcnwRBPekQQgavEfx4pvJLX4PqJuappqOoHzs9jOWDBBtd0tCz7HZ1b9dq5jUWqvB8ZNfOXqT%2FgkpGHhIB2ZqrhsToNNr%2FWfcMiWPeYaDvA69cDrW4J4P%2BsvVCSSezc%2BKTpa1UlceUOjxirxK50780UoW4rtjoKqGFreKV9fcPg5rYRqKlD0KZHleRgR0OoAUeo9XFI2rDK%2F2ezjZ9RWBRNrUykssPs36jhyKVahgc6j2MWucJQHsDSACslSAY8Q3baEjjKpT2e5%2B%2Fw7IUGuAQ5Yc1fIJJcLcGQwV1%2FNwcvvBNu9p8%2BtVu4t682TKtz30qEvKArSEokbptOXPJXULXuTNNPhhQShNfzH7O7qW6yZ1hgjCR393LBjqkAWmyygqvBtgme24argvqDneekrfZg0rnAxBte6Ht0%2FkeacxQRFPTcjs5J0COSH7B%2FD7TazkKCiPqQYBuq459LTEMJzsEtjwzyGnrf1jzMyEvntzIHlqj0mLlA3C1DRvQsbKNjdn67sThzqyg01JaY3Kh6PEMdWAo2G9FsDGPNCXSC4V0BtCDVOREzuqEaax%2BtQO2G9CH1w%2FrJXOi3ntQnURYgm7%2B&X-Amz-Signature=dc11f24a4739236f8989b3f5f16b2afd4354caa9ce3922648876055a56614924&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667B7SPLI%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T141708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQD9NKHFVMOUTtJ4oGNmrv65Y4A2MpVWihSqMCpQYGHQzgIhANppkQa%2BCvI4BrdBk7oARsGxNbqzMJ9Zv%2FPZESuj10EZKv8DCD8QABoMNjM3NDIzMTgzODA1Igw10bSMAyr1zDWBCtMq3AMikWdaOZfEq0%2BpVuNiKoutdxLgRe%2FooPZFwchU7LZ8DuzItxUutN7jtU6naRYpVJrbnzOX3zw0rQx%2Bcl94oKK3lugmWN6jesQd4YGs9tMsA%2BBxp8iD4uVgFxBWY1snDXLU8drSUxaFLFHtB1T7KB3ntso9WqgeuoWGrU0zdMnQyNxriav8Fsqpah6sHnTcqmag4Q9PRtayOMcS67jmYqu1ij0nqbhrFJ2kbzGuS%2FgN%2FsHp7NkH1jhjU4lnxt%2BFhdbQvvpfdQkDNvJXgWj7MTgYo7BRm6Bu%2B4oa2%2FJ0qv9gW31McqMHNoyVan2ww27ylE4Po6Nfinw5n8pRz11V0V5OY2BRT8S6AC8pUzqvfktAP48I4kcxWycoqEeB65GuNOM1rSCipbY77jlVIyzQOu7Lm2a4Ah7ShJx2MBG%2Biewuk8iIrKmgU5FcY7lEgmipaZ3b%2FKTezD1bS2K2jkiasDmCbXQHYvdykYejXBhq6YFkQgji0DC%2BWYrm%2FvlcujGXx3kDc8CPAUzS8LQ1zZ%2Bk8cfHK0adhG%2FUXNi2XaIlDtAfYJNP%2BtxiRf%2B024MQWb2wKNtaP5rzxnnJnrp%2FatIEb3UfHAlq%2FxF689VIKFI4v8r9iF0ZNbWPt9Apj%2BuQ6TDC393LBjqkASrNZ1FzEJnUCyxln3WKjbC1Z40MWMXFEyNbEGOiZsG92zQ%2Fuuk4I7KYVqUI1ciZMEehu%2BXNwOCfdB2TW1%2Faf%2B1MmED3yV0vrjC6taOkk3wBbg6ztK2NOCZ3zaCKIYjRp3JAQCNUzgFDfz9K5lGzinhvWGxuNAT6cn6xip9AZKL8FeVRiFR%2FApGTZXQM%2FZZs3Fvn77Ipt%2F0pZtZ%2FVcKhqNaampw2&X-Amz-Signature=b6c69c89c8adef93ceaf585091148a38478528d7a5c774633994deec78131140&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

