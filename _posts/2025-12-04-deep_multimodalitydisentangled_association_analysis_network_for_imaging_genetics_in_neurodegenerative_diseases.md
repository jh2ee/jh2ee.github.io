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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662THYSFUS%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T135216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIEikVyFndRDL9Iq6ud4HvbDiDWI%2Fk0JfZAkza2nWkvFrAiEAgTgu2tHq%2FxvEz%2BYRoF0TZtLxq79%2FvPUVl8fVwyRJScsqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFv1ehWU9DVYoXSXbSrcAz545wLdzi0mChcptbGjDrzjH3r9VseWp01J2Zju1TleJC5yfTAhwI9fTfComafcd6Jf2T70FVIMMGqevoMUzsnihk52Z7Z56%2FQ%2BG0R8925FNfJLA2N2lau%2F87ul6Z0W2Q39R7Whc8MNIR5M5GhVxJQMk8c8MvXyeAADNlcHewHxFfnb2QM5ZExE2Iw%2BMtejnwKdhXGWUDOZbfuW4yR44CPGXIWIh2ZhmbG0Da29CQ7F9jHrna%2B920Hfd2PVv2n7y4WiG1syL%2FP9viChMK2%2FCjo88xmaG%2FVTbAnwIm3gAbHu5FBj6kVbZCti53VsQzwtZAo7mEFuCNn%2Bdt7KyA0agsEKI0S0qMY1ro9cjEzJJe4dCPF%2FOFktJYvMo2bWmADZFMCRjf7jGvJCtDJM%2FaR%2FCzM0EZ%2BSZhEun1mVQhAQ%2FgCXDEvvwG5RmwJm6Wz%2FRXCfY1RXk0n0qUu9pyshHd8EVKz%2FYf2yvvFz7iKq7okYD2z0YCo6hUNjrT8Yu930GJAFYg83PULm02ZFyH3PaJL56qZjpBvIHkfd%2F6PLMNqOU8eOwbMW7VKOp2TJwrptLJ65ISZSu8Z0EY6ns6gK6aaniU6FWInhHT90hRRJk4lQGiSnSDUt51yAwVzT3neHMNnNjc8GOqUBzPUHAWiOpZnO0XrVvaNaF7FOEIJMYzPHUdskGD7dNJ7f7CQLtCCQGKmiXpFEM0gTaKjHRm9F6LVAeTk34Jy%2F1%2FnybezeGaqELBcQl4KO05r54Rfgl8m8qL8EaaKc69KBCuC1gu7wcfpmsk62889PtA5NxKW9xewKMRXYsTtz5yMIfdN6icVnzo9%2B46ae9ID30Io4JxgsGXoS3ljRHSznrUFrORWv&X-Amz-Signature=65e9bb1620e2bcda732ee3f094f325109158dee8524683cdac528b4fab1d4d64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662THYSFUS%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T135216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIEikVyFndRDL9Iq6ud4HvbDiDWI%2Fk0JfZAkza2nWkvFrAiEAgTgu2tHq%2FxvEz%2BYRoF0TZtLxq79%2FvPUVl8fVwyRJScsqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFv1ehWU9DVYoXSXbSrcAz545wLdzi0mChcptbGjDrzjH3r9VseWp01J2Zju1TleJC5yfTAhwI9fTfComafcd6Jf2T70FVIMMGqevoMUzsnihk52Z7Z56%2FQ%2BG0R8925FNfJLA2N2lau%2F87ul6Z0W2Q39R7Whc8MNIR5M5GhVxJQMk8c8MvXyeAADNlcHewHxFfnb2QM5ZExE2Iw%2BMtejnwKdhXGWUDOZbfuW4yR44CPGXIWIh2ZhmbG0Da29CQ7F9jHrna%2B920Hfd2PVv2n7y4WiG1syL%2FP9viChMK2%2FCjo88xmaG%2FVTbAnwIm3gAbHu5FBj6kVbZCti53VsQzwtZAo7mEFuCNn%2Bdt7KyA0agsEKI0S0qMY1ro9cjEzJJe4dCPF%2FOFktJYvMo2bWmADZFMCRjf7jGvJCtDJM%2FaR%2FCzM0EZ%2BSZhEun1mVQhAQ%2FgCXDEvvwG5RmwJm6Wz%2FRXCfY1RXk0n0qUu9pyshHd8EVKz%2FYf2yvvFz7iKq7okYD2z0YCo6hUNjrT8Yu930GJAFYg83PULm02ZFyH3PaJL56qZjpBvIHkfd%2F6PLMNqOU8eOwbMW7VKOp2TJwrptLJ65ISZSu8Z0EY6ns6gK6aaniU6FWInhHT90hRRJk4lQGiSnSDUt51yAwVzT3neHMNnNjc8GOqUBzPUHAWiOpZnO0XrVvaNaF7FOEIJMYzPHUdskGD7dNJ7f7CQLtCCQGKmiXpFEM0gTaKjHRm9F6LVAeTk34Jy%2F1%2FnybezeGaqELBcQl4KO05r54Rfgl8m8qL8EaaKc69KBCuC1gu7wcfpmsk62889PtA5NxKW9xewKMRXYsTtz5yMIfdN6icVnzo9%2B46ae9ID30Io4JxgsGXoS3ljRHSznrUFrORWv&X-Amz-Signature=65e9bb1620e2bcda732ee3f094f325109158dee8524683cdac528b4fab1d4d64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMXXGUE7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T135216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJGMEQCIBOOZk4GUrvqGMh9Grs90cCEIfP%2Bimwpw6uQx%2BzwZ%2F0kAiBwSyrzaHhlfP%2FwJJ7hXGelPolc%2BE5gYtzFgtZfWIM74iqIBAjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbocisFTI4XrJCYA6KtwDJeiWrHMmqTRu8IGaEZ0rZ2zTk26ZlDH7W9SisDYj917woba3wMTvCa6V31NJR1kaa0JZYzwkNwj%2FLB4K3VDyb%2BXTmtt4qq3K6iSB6H5FKIZ%2BvcTMLtjl7kKsuX2L2gWoifSR9MqvEKlL4zZgdhuLqaO%2FG2yGLwR1V%2FKbk3%2BdyLdRDSmwAYzV16Ed80ZguD1a3BiTvCuTmTPOX18CvVIoP%2ByH0Uv4GQWkX9c%2B9HIL4NJXj5e9doxKUhcm%2B30xz8jpBfQ6T5m6Uyd1LkmIlBW7v1S46nGVdU7wtCycjBc7FkS6aHtSvEDTZ4J5WJuvlH47SdYq8Rh0RWsC%2BUBOZhLXluROZWHoZXxl8bwPZk%2BTMbB3RZBUu%2BKPt2necQ3lt2ORdN0ib1N5y6JE9rvpqZPVx54eH%2B3mCOUIG%2B2s2AVRUYs4R2eS0AiWK7ccYdv94Ww57XqErHUf9dFOMenPTXs66d0CITNnynS6ylCbDvVDDMRHFd0hOPxsHBq%2BXU2fcE0lAd4AM%2BbTn%2BY7QXqW47oAn6mtUAzbGU7OGAG%2F3Q%2BMYDDKZiJbXLBLf70ZijXBM3RW9DYh%2F%2ForlVdIrX0eE8KpUJIJatkGRU8QrerhGj9GQ5%2FvUZyLM4xmln2sdQww85COzwY6pgFsTsj5%2FdeFtIUkRyfXAt3cvNtaMmxhlfRMzYPHq7XnVZe0jmZVCkze2ygK6lZ1%2B6kwYj8dp%2B4sz77JVDxyD9yg9TQ3NHp0skljWq15P%2FxZGcj5oEnq200W%2Fn5cjiG6izMjsyTlXjJwrg%2Bm4iNW3806a%2FQgKjGdmB36UBusBmYnBvUXsKRyAOhSGRpC4ohk1KCWGSEMyYkS7XkTVcwPbj8XQWpHm6Un&X-Amz-Signature=801551847a7a1096cb8a93723807cecfbd4f198ed900affb006a4bdfab6c7c4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCPP64KI%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T135218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQDGtuENzhTKalOeHgBXIU7p0sa469J7j1DcSqTj0OXqIAIgT4pU2XAuf5HH99XbJEdzK7By6391rl13a5eFS3AnF%2BYqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCTYdRoXvQawCbkhHCrcA%2FZXs9b6%2F8pm%2BoBMd4BuTPOsslrxMkv7w1o6dZs1dbYMmmtpkfTzB3IP1TjV7GsDj%2FfYBGijAiZfaVGeCFgi4eK9Al%2BGlHfuzpey58jpM2BTZKpAOT%2BIwvTRXW1hOp3%2Fn442d%2Bcug1BDeCi4mNKYydO43sg02pX3Aa46K4WRWPkfQpKkxeRm3FhqGRWkts4wWfrtZNwr5pgu52ZqFPGBoPWKTYJ1e6Y%2FVSo6xdFCjYkjrrF2A%2FdJDfNq4AzSdM0HG5WzBCvwXekF6B8TDvTetnXRSf%2BqA7iy2Vk7r36X2NvqMSD7%2FnxmwO%2FjcouQsRAPut21ZBSybDTmRykQRrxoNbonqXtn%2FqLUoHKvC3pev%2F362OowuFH7xDYH%2FPJtS%2BYrOA74Vv3u149VZbxUpSSCC5%2F5lI9zE75moGvN%2F8bXFRHqH0FF1XvXnIKLL52j1FE7MdQKzC7iaOWTYF6Wd6OPis9sPxsAwgUYMRsZ7ytLu9BhnnJnvROUEVR3HE%2F1PA7MQuY3KN%2BuJccIVmzJoIFPjU1Y0IXr1rI34TGJ4%2BrAHzHwYX15EXWyFtANsQ7NIcl0%2FVbz%2FvImpo1RrwmWpQIq6uigfZUpqpj%2B9ihCUtCZgNzPv6PulLrEiutGS4NsMPPOjc8GOqUBAeSh%2BaYpT%2BlBsv0bdPzoI9aDG7ZHJvV9yvmbyhjJy31%2B%2FjqMj3PSM8o0L3hiZF8KuHzUSQcllvUyxTzNVqHgwxxQKxfUwipdh%2FCoXPCTxCXEzv8j9GaVAt3zBjw7XSrwLmUOUWlg0Hn4bquMl4OLCKLA8Fe%2B3QpkFV5NPIszVed5f23HMaZGazIIb3pgC5EwEpWRaDz3rGdpwSfrz%2FGxxASYCFRc&X-Amz-Signature=abae1dc87aada7a830420a3042a1a1ae971ece7dea0a380066eb5ece0f557089&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCPP64KI%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T135218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQDGtuENzhTKalOeHgBXIU7p0sa469J7j1DcSqTj0OXqIAIgT4pU2XAuf5HH99XbJEdzK7By6391rl13a5eFS3AnF%2BYqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCTYdRoXvQawCbkhHCrcA%2FZXs9b6%2F8pm%2BoBMd4BuTPOsslrxMkv7w1o6dZs1dbYMmmtpkfTzB3IP1TjV7GsDj%2FfYBGijAiZfaVGeCFgi4eK9Al%2BGlHfuzpey58jpM2BTZKpAOT%2BIwvTRXW1hOp3%2Fn442d%2Bcug1BDeCi4mNKYydO43sg02pX3Aa46K4WRWPkfQpKkxeRm3FhqGRWkts4wWfrtZNwr5pgu52ZqFPGBoPWKTYJ1e6Y%2FVSo6xdFCjYkjrrF2A%2FdJDfNq4AzSdM0HG5WzBCvwXekF6B8TDvTetnXRSf%2BqA7iy2Vk7r36X2NvqMSD7%2FnxmwO%2FjcouQsRAPut21ZBSybDTmRykQRrxoNbonqXtn%2FqLUoHKvC3pev%2F362OowuFH7xDYH%2FPJtS%2BYrOA74Vv3u149VZbxUpSSCC5%2F5lI9zE75moGvN%2F8bXFRHqH0FF1XvXnIKLL52j1FE7MdQKzC7iaOWTYF6Wd6OPis9sPxsAwgUYMRsZ7ytLu9BhnnJnvROUEVR3HE%2F1PA7MQuY3KN%2BuJccIVmzJoIFPjU1Y0IXr1rI34TGJ4%2BrAHzHwYX15EXWyFtANsQ7NIcl0%2FVbz%2FvImpo1RrwmWpQIq6uigfZUpqpj%2B9ihCUtCZgNzPv6PulLrEiutGS4NsMPPOjc8GOqUBAeSh%2BaYpT%2BlBsv0bdPzoI9aDG7ZHJvV9yvmbyhjJy31%2B%2FjqMj3PSM8o0L3hiZF8KuHzUSQcllvUyxTzNVqHgwxxQKxfUwipdh%2FCoXPCTxCXEzv8j9GaVAt3zBjw7XSrwLmUOUWlg0Hn4bquMl4OLCKLA8Fe%2B3QpkFV5NPIszVed5f23HMaZGazIIb3pgC5EwEpWRaDz3rGdpwSfrz%2FGxxASYCFRc&X-Amz-Signature=2fac5d70e4db0b0ead372066bd5ec51ea5508cfc9ff533a1d5e472cb11a349d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XL52EJHB%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T135218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQDz%2BF5W0Ivdk8kwp1JBLvAxvbOxSL7msleSzUKKsDYkpAIgSobB9AppSJo8AWQrp42vA9WoWOvaHnDwrzfaFyKl0zQqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBLkWIDV3ojD2%2FFxvyrcA9vU40UZsW2m55lzYCOAfwyWielAZ1ciB41pyvJw8b5x25EDJviw6AnThvTg1qI9%2FHr0Rjjbyxzn2oc63QvCeHIXXXFI4knMMou14qyrxKkF4kmsjJnxVN1YSW1pFuack1lE%2BSDGaMc9Pn0B7k5Iv5QLxQXyGq8%2FS5qZbGfF%2BByZ9ArDtypzzc%2B3jKRkxUTjtzRKorx1ZpdpAKj6U24OEBpRP2GxcH3eSwhblqI18H%2BfbtDXiYL1LHY4m%2Fy1j4zMlrxM8SG7HFcNvyhJDP0fTFBvt%2BiQxE3SMNnacD%2Bf8rmANE%2BSg7s6fBjeB%2FVcCQ6heNN3s8Qp1Oa1gbj%2FX9WlMLwRflsVp5feFjxYWtjVpVUWWKJB3SZrkX2XjXBXofWR7QOyiQmftbYADxh25x9qhIlyw21P88aKkBrL007DeEsPxfkmHTmSylcvtUmssjxPwgEtZcGMsxlYyrsPETLCfzmGQcfrBViaTWDzN%2F5%2FR0XPn3u7Pquckwxf2cJj2kB0I16ueFDNTihfR0JWuaRsUzgJB9gQSwtvEDwCCGIcaWRnE89V%2BJ6gi3wdkIve1v8omG6hEh4BZWbyAkM6HtCxA2ZZLEQPTLuHSYIeF%2BPbo8aCyUW%2FQ49Euj6ohewbMMTPjc8GOqUB2p7Fni9l9sf31Wtz3ND8pxH3ro0FeA5YV5g9%2B%2FmUp8UGf139NNzDt1ewG7vG6y7tCEr%2Fzg2z2ephc66cq%2BXBDi6%2F7yFPcxRwhAwwvV9Yu7PjaxVUq7dM%2BTFMa7ccIx9jAXbVqduLHxWohmgiNT2jH3D8smGJGZ%2FrxPizehlZkl%2BJ%2Fk2nmfiIF0KIt4%2BeJLivizk%2FMHFyGqpKjElwMI9eM41Qr1uF&X-Amz-Signature=e2ca4a6c26ac180f574c5163baad8c44d82783425f24d9ef4223a98e8b44e81a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZI7RMYB%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T135219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQCJl9W12I5Ze7re1LmoIwFcIIKRQUea7DzEppeao4BIjQIhAIkhN948EQPzrVOTpr9Mgzsh9eTQ5H7eDuUmNnlPjAuzKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzsnt4NfkBtXJmXyfwq3ANFs3n%2BwVrC2iqv%2F88NuzSMZrKH4dQbYpf8QdGHUy5d4vWBqcECpQdfbZkB91n0ykoJxpJhDEr1iPRSjBfNzivLY3p%2FIRrRvkXblqk2nntPgb0ywfJAp0lPPYlWaBcCqHVP2Ro0EXuMJBCUACJp9nvXrI%2Bib9doKDMUe6mlNsCo4qZGJ4pO5GmOjhoYV5qcPVPjmGH%2FUpjaz3aBx3jU%2FDkU36E4woPIrJ%2F6qWFTyURngy9K0FO9c6dyzovi1g5O9JsXj%2BD021oST9rb21Jy679uG3KB88ztAek4JdZN4PCWlxLDNPTf4Ij5yifLbJxQG7djG5g8mSh3c4O%2FjyXfYyvd8Edg1NFKAgSRIzJ5tXiUwq3PfNaMTAMbk6soAP631Ka5YxilbD%2BE%2FKm4zsa96cLferE%2Fv5wH7MUiSUlOQeL3L7fzroyZXBDb5xBMn5pCrQVC0G%2FA2ltjLFS7%2FFlffEzwTRNoxs%2B1rPTuswjNcFuzypT2afkt2A9zFxv4Dn4Njz%2FAh95CrKQ4DrUPaRMEe1TmFqsGh5DeV%2FSLb%2Fyw3CjFGOfUazBZLch9v0C7Cjr4CA3aAoAg1bDssamSBEhQXSQPoFQDc3erdoUzXEVDbCpbjSNUwf7ZUiR%2Bgw9HBDCOzY3PBjqkARU%2FMPed7eAoKYepsSHKeVnNre2r1OiCmM8SU1M6nqWYy%2BydaIwjFlGJhPmJM267728e9X5Hs%2FjrX8L9PqMzyqy%2Bomb5oVvyoVmpjfmB43d7HEcqK0qV%2FJwpfWFcQZapNa%2F4lQHeEQqH%2FfkvxeUlfA4azr8SF9VnLxaQcCjTa%2BpQoeL%2Bz0eKt14KEH%2BABTyhWxj4akw4dzgf1Bk9zoVOdfIOUjHX&X-Amz-Signature=70f949ea8cbc61c5828a35ead0a740563cb6ac800a7e94b86cbf6553535f1028&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632XJP5EI%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T135220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQDMPo2AO1w1qYaUrxUi5Y1lj%2Blly0SHpoGzjq8wjowIawIgZ%2Fa3%2B3xQI1s4YoSOwAQSgKLxLYlHrRxMmcT5H8iMZ44qiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEsxvXfmHIjLc%2BVFoyrcA2rJ79ZdE1%2BNOqJdk85%2FHsWRMQ5fAmYN94C7K0Tb96FLb2Uq7FT874vshp1SvSSRIhAieq%2BmBXpQYL2JGK6do1Y%2BjdOTGBqEvwEXEOLtEY6J%2BQx0H0nZw34TLHY%2FU%2B0GPgcil7Q6cA5fq%2FPE58hzwHXBvH%2F71rg9DC4whG7JifPYztyYe3p6fKMfG%2FxxFvJ0HUvLRNtjwmOulT7SEUqO3CYIvFZLONlcB4HREcmOO5LxICAolJLitwRnlBQQLH9GjYG%2FLEvjPZAKIPI2C%2BZpiE0qJvmbKLvgzbmmRjazK4qOCCoMQBfYfJg4VXfHNE%2FoEc3oGP97Z3%2BhrOdQMQPQo6R6VsQXA5ngKUukbUHTY6C23mjrgvY11HPOEA%2FG%2BzQL%2FfOxgPYlA14hXhfgf8%2F65JMF8mwbqY12Qb5U1%2BB9mh%2FudgifpU591jf0Bh9VxFKstny3pP54q%2BZh6%2BVXbjoQgvQIZaIVhUsnIKi6NkAAU4%2F%2BNzolCWF39LsIFw%2FxD%2FbdRPzUEhKBLHqabiKqWKcdVEH0hrjQI5nTPpit88xRnP0vLluQcCHew%2B5sKwT%2BKxo2f3R2ZgVewcMmPGWAA65xXCzArdCH0m3oDDG5RN6nKZm7CJ3a4UPvhTil8HyGMPzNjc8GOqUBZ5XsS4G8kZ2eB5iAhZ5Pk9Tcc6cX9IaeqFFquFY7OVxDbrnrTMfkqLB86pRzKTrGLPBY68OzqrfswCFA%2BXq5adF8tAyOMfMhEHctbz%2FetGSZo14p36eyEDAxzFvupbXFMWmG7YLQzuqIhyn5XeB4X6ua7XrjtYTXnsEeTdUZYgCS6PCBny6NR42vTg%2F27WfgPTQJue8i3EaVnzASy8FRl%2F0lK5dK&X-Amz-Signature=4d14235e95bc4318ecb53404fc2ae036cef50a1872dbbca6eb1b2ebbfd349705&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HPP5UZO%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T135220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIAk33%2Bbn%2Fi0Q0BRcUSrMarQY8c6Ia9IWnHe2LZWVr7CxAiEA2oCir4Cccou0T5xFp0NHsy%2Fq4RnuKNBQjgA9jgNATHUqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNhpEsC%2BvetUvIegZSrcAzGoOZxIEWZ%2BkISMrzpOEMe7nHG1PJsxZFDn0eX4LFxZmkkKH81V0ep7VfpqYKEMLYSRk4uoRcKw2wfUe9D6Q4aGLaXcpKVKFSzBYL10HQFCUoFwLOpyKr7jMBHwtkCfW%2FBfUmvrRd1nEYvu0y89aXQAs6VB08vBlQXRTKxljP%2FeP%2FYVJgJTRQe%2Bqi5KSycpv804VQAX3BS9Jjo%2Bqj%2FVYTHMwwlKKovRQtbrMT9Euq1omiA6nBiQlbbBQAEkWWY7ob8vTk2VQ4%2BKEzS2g7Y31bpUNAz5ri6Vq%2FM%2FIBICy8z4sY0MozGZ2n0z5jMbI0QnLxTUvq0eo1B8ve8%2BU8K22LnW6woJiruhfgHLNya9x8Q90xzJc7Ap0rH3ZL%2BV%2FPz88wl%2BVbzWc8QuQuwciQo3tDE4r%2B6jh2B9J%2Fp5BdlHE%2FGdsJmFt%2BCLkBOCA%2BKpbwqdJLBzjvxu74dKUfODrQfwc3k2Oip9FG80lrbgjZ81ZtUtMOc3uJx%2BoGPdhZ%2BgYp7ywO%2FYeAVP%2FwTjpmf5ogj77wC%2FWvHqWtZxBWZ%2BZduG3aAqj%2Bta7cFqFUlVlnrI1gQGv%2FLiZcBlMCRIkB39UIXEJVPfYvVzIlVmdGMf9Dsnh8lMQ7lE6Us%2B1CmC25pjMIrNjc8GOqUBCcR1AMyVFozOalrX2P2s%2FUvk0r0l9NEg5yM8NCGeCQ3%2F9u6zj9inBtCDRa4zW%2B5V1AWq5vqT5s9pucURA2bbcK5A5AOlUvBGBgDXDHpKUrl5W2Jiv3x%2BRQzCBH97GIcRmMgtcGVDYgdxESSsxXulEWnRzczqBIuqo2X4Xz3LJHgvSDu%2FumB%2Fa%2FC%2FzCaQTn4Zbp%2FltUvUMZZk81RgOPKGpIkPXTOI&X-Amz-Signature=6c4e511ff0af06192a8c9880d9935bf05f82a473256838390377682c2981872e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HPP5UZO%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T135220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIAk33%2Bbn%2Fi0Q0BRcUSrMarQY8c6Ia9IWnHe2LZWVr7CxAiEA2oCir4Cccou0T5xFp0NHsy%2Fq4RnuKNBQjgA9jgNATHUqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNhpEsC%2BvetUvIegZSrcAzGoOZxIEWZ%2BkISMrzpOEMe7nHG1PJsxZFDn0eX4LFxZmkkKH81V0ep7VfpqYKEMLYSRk4uoRcKw2wfUe9D6Q4aGLaXcpKVKFSzBYL10HQFCUoFwLOpyKr7jMBHwtkCfW%2FBfUmvrRd1nEYvu0y89aXQAs6VB08vBlQXRTKxljP%2FeP%2FYVJgJTRQe%2Bqi5KSycpv804VQAX3BS9Jjo%2Bqj%2FVYTHMwwlKKovRQtbrMT9Euq1omiA6nBiQlbbBQAEkWWY7ob8vTk2VQ4%2BKEzS2g7Y31bpUNAz5ri6Vq%2FM%2FIBICy8z4sY0MozGZ2n0z5jMbI0QnLxTUvq0eo1B8ve8%2BU8K22LnW6woJiruhfgHLNya9x8Q90xzJc7Ap0rH3ZL%2BV%2FPz88wl%2BVbzWc8QuQuwciQo3tDE4r%2B6jh2B9J%2Fp5BdlHE%2FGdsJmFt%2BCLkBOCA%2BKpbwqdJLBzjvxu74dKUfODrQfwc3k2Oip9FG80lrbgjZ81ZtUtMOc3uJx%2BoGPdhZ%2BgYp7ywO%2FYeAVP%2FwTjpmf5ogj77wC%2FWvHqWtZxBWZ%2BZduG3aAqj%2Bta7cFqFUlVlnrI1gQGv%2FLiZcBlMCRIkB39UIXEJVPfYvVzIlVmdGMf9Dsnh8lMQ7lE6Us%2B1CmC25pjMIrNjc8GOqUBCcR1AMyVFozOalrX2P2s%2FUvk0r0l9NEg5yM8NCGeCQ3%2F9u6zj9inBtCDRa4zW%2B5V1AWq5vqT5s9pucURA2bbcK5A5AOlUvBGBgDXDHpKUrl5W2Jiv3x%2BRQzCBH97GIcRmMgtcGVDYgdxESSsxXulEWnRzczqBIuqo2X4Xz3LJHgvSDu%2FumB%2Fa%2FC%2FzCaQTn4Zbp%2FltUvUMZZk81RgOPKGpIkPXTOI&X-Amz-Signature=fa42e2be67752164bfa9999c19cedbfb2b20ee55fe978bec38fdaab7b61a883e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQZNSXET%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T135215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQDTG%2F7yRr4CWnMTt3jJRYpYqDjJGt81SFsznAkVsCApDQIhAN3YnyQPiWueAHPyF4H%2BtA4%2BMT7R5P6TqYAsVh%2BeOEgAKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxwxES%2Bt4gosRvZ90Aq3AMAgyuHMdS6hrS9pCYnJwV8ilPSfpLutO7iDIRBpZgW2FNUy%2FjPpExQ82coz6yCBQR1yDjkFLKtZbPBE1ANOgM7fFyvua9GLo%2FhXPWzOZv80sYKVs8WSDDBAFle%2FA129TC2o3LSpRc0NPbDbjdiJ7aiMde67mPL%2BKGiitnoUf0WR%2FuBvAI9R3KWIxS1CIniFv%2Bwj6TC%2BVz6AQzWUfDtZ7Ngwb5RkYSgocOAe5zXBjKfXWF%2FC2r8XSQlYlmRKmeywBpob7UV0QRAwfdiFW6nDeHsE%2BgckcHizp88DwWbk79f2dxsIHGjRpTmX6FPhf0tIHEhwRXiEcCPjlHVXaMCmqoQ6rghYaweXkt3v7eKLFmkZc1oDb4CeD2B4B61SpmwQYYFpFTNXDj17AmctllY3VnOnZDL9jAss7gGSr9u1STJ%2FlhfR9wXHxqqVejcPTh5NW1hm03CzJFUYQt%2BWc7vkeyijbEXyEgXD4jGAkbOKIXFxAxWaCcQEJnBV1xOkqbd585x83AJZiVndB7uXtHcESzUH%2F1wjYdI442sN4VgwUmoFRBf0Te8Gbjjy6rzN6Qmmy66hg6y5VFHm3NJZa35ytEwU%2FLesp9cpVgx4IjqymhIqznaBHSqxMNvbHWyQjCdz43PBjqkARwo0jHVbkqAQ%2B3Vi6OOZ9F47ggWG1RcDQ3RbLFl4CYsjQ7H6gPr5JBghEiScCS7ZjtdYUY7gYrhTPAQJHmepEA8wIvqw5TuuXSAZKLxHgvctyvM4pfBtdAa%2FmRmdROwtkvqLely%2BVH47hQVHp1MvtQxIBUvUU5EYZy%2F5m4GjBi1082TZTAEpypcQICGvJGh7gXRmrjv2HYC8f6XSPaP5ibYn%2Bcp&X-Amz-Signature=4c7b93c51a02cc0706cc3e1f34650bea49e7b2d6ecdaf2e53fc026eee27eba07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XARD7DB4%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T135223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIEtNZkaONq7lVWqGbzCm6mkHqfOYl5OT%2Fu%2B799G1GJfhAiEAmMF898uh8m1PkkKH4gKaXhPYCVfpvdjcpvSJll%2FVh%2BwqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEF1gTmHv1404QqIeSrcA15SEn%2Fug5n7FytETGx1B5YXj2jke5h87EMugMZPF%2FqATYyEs8gmg6jqfjCeh9d7t9vJ%2FPG%2BZ%2BC9s82KsG9k4i%2FtFC9XSPqxgXVPE0X4YnKh2JQRt4loUBkplI%2FIp7xMC7FihjnVPEtRwe2MAgvHhkGl1z%2FuiHPmElCWTMy7wGlO5yFvdjN5Hv3tcIKQ2aQ%2BHlgqiPjerHLGRZ3LFtG1jV5%2Fd%2F0ylSnkHGa26oJquoQkthGQK4LIVvJBdxrn%2Bpl6dFQMloaXKQPKiCCcYkWhe7ReiG3kR0S5b4Fk9P7%2FLqpYNwRNUqrmGax4jRjmp3VDIiHJd8hxC%2B%2FCigupMDVDIoZXokE9FsGC5GZEF%2BCaBzJmQtexjWWdh9yTL8KXOKeT0B50HVnL%2FraO1ux%2BsXQYf%2BuCv8DRWKbvvpaiRinUhY5jWaW0lUHhf4sEDtXAXUWuTTfX8RiksFZBbW%2FtPU%2BH4096PP6k6xpmHZjxETXPsp8CkE82fPPdiNh95g4GlFyPkM5o1L4ru%2FxizaSdtZFC1MpDFVv48ORHnCeXT4UOFriZ0x9OyF2V6bXFCzooFBir%2FwTS0HQ638S6Ze71i%2FxxKwvcTozWnKmLjAbvc%2FnuqwOr1NH9acPDpw3ddKvGMLXPjc8GOqUBMlITwQwVXBqVRFPLApbnxvlw0DFKkGI%2Fd%2BiOdJqJv%2Bjg2lPDN%2BpBtRcyKF4BtOJKZ%2BdNy1hnNw%2FSgHVb0uAiAzpRbcditYQPYUmgWTekDmnCdYQtwqMO5BXltPlaZZIz2dpRLxIKlEwuEEMs36s2YJRv3GnzxWinijECniW%2BEDZizWDmOk3zZZ3we5IfJuk8weml3hpou3WViTQ7UhHFtDW%2B7GB5&X-Amz-Signature=1f50435fe4553f9daab7260a690f8f99d478de7b5a0058dbbbb5d5b0fbae8c65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XARD7DB4%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T135223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIEtNZkaONq7lVWqGbzCm6mkHqfOYl5OT%2Fu%2B799G1GJfhAiEAmMF898uh8m1PkkKH4gKaXhPYCVfpvdjcpvSJll%2FVh%2BwqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEF1gTmHv1404QqIeSrcA15SEn%2Fug5n7FytETGx1B5YXj2jke5h87EMugMZPF%2FqATYyEs8gmg6jqfjCeh9d7t9vJ%2FPG%2BZ%2BC9s82KsG9k4i%2FtFC9XSPqxgXVPE0X4YnKh2JQRt4loUBkplI%2FIp7xMC7FihjnVPEtRwe2MAgvHhkGl1z%2FuiHPmElCWTMy7wGlO5yFvdjN5Hv3tcIKQ2aQ%2BHlgqiPjerHLGRZ3LFtG1jV5%2Fd%2F0ylSnkHGa26oJquoQkthGQK4LIVvJBdxrn%2Bpl6dFQMloaXKQPKiCCcYkWhe7ReiG3kR0S5b4Fk9P7%2FLqpYNwRNUqrmGax4jRjmp3VDIiHJd8hxC%2B%2FCigupMDVDIoZXokE9FsGC5GZEF%2BCaBzJmQtexjWWdh9yTL8KXOKeT0B50HVnL%2FraO1ux%2BsXQYf%2BuCv8DRWKbvvpaiRinUhY5jWaW0lUHhf4sEDtXAXUWuTTfX8RiksFZBbW%2FtPU%2BH4096PP6k6xpmHZjxETXPsp8CkE82fPPdiNh95g4GlFyPkM5o1L4ru%2FxizaSdtZFC1MpDFVv48ORHnCeXT4UOFriZ0x9OyF2V6bXFCzooFBir%2FwTS0HQ638S6Ze71i%2FxxKwvcTozWnKmLjAbvc%2FnuqwOr1NH9acPDpw3ddKvGMLXPjc8GOqUBMlITwQwVXBqVRFPLApbnxvlw0DFKkGI%2Fd%2BiOdJqJv%2Bjg2lPDN%2BpBtRcyKF4BtOJKZ%2BdNy1hnNw%2FSgHVb0uAiAzpRbcditYQPYUmgWTekDmnCdYQtwqMO5BXltPlaZZIz2dpRLxIKlEwuEEMs36s2YJRv3GnzxWinijECniW%2BEDZizWDmOk3zZZ3we5IfJuk8weml3hpou3WViTQ7UhHFtDW%2B7GB5&X-Amz-Signature=1f50435fe4553f9daab7260a690f8f99d478de7b5a0058dbbbb5d5b0fbae8c65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663O7XODQF%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T135223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCID%2FNTROA5AelwIX3%2FUHGFEXC4UmoxtEKOchnVdOLw7HlAiEAqY%2BW525eGhaoX7YgJ8vI6a6gA2PsAvU5F0R7U0d0QUwqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMpSpqbk7k7pilVRFSrcA893HE6lYjKS%2Bl4zc9rfDkXvqhqQc152cFH%2FYf7gHy0HXL5NjXR4FTk6KrZAVZq4ZaIDROeRqNBAR0wx2MEozNn4t%2BwMBMex9VwuoplW4qxs8jYoLSo5EYjoCTByUa2LbcFSPJ6o1970y4S9xaAuc7TNtc1BaQ8wfNhMOXAAkK%2BZO%2Fvzq1w1drtbgRwXLryNZaY8KrBMk0EmKTAgyJqKQKtZX0JlwCfqtud%2BWQQRZjRDtDjujPXvBTAxJMTzIfQ0SOxOnqvy86E74ocE8L6s%2F70bVwsMeX03vRESg2g6HSrzk3mhsj%2Bms1VVZPc1TcCalxlSiN9fq%2F%2BBTjwkJco913Wko1%2FCgbH5HKwqxiOfKD5kDl0BRczyATQbBwxYmI%2BzoZwME5HQHQbutPQMXmkSOXaX0yRmXqdbuwbjTwDlOTfz8rknwPCq9nQyLE8%2BYpEKayd%2BYqIL402t9qcmYfCqBqISWEh9PW8a2MudTdwJJSGC1Y4652IcHeoUoKTTmQY1nbavYuk0awhoI6HLNaHBaWTAPgIhXUnprfLZfpCo4ZY5ZC04sL3c4B02LTc5cFPhdIKPmlWHU5uph0hdkClt8gD0Jxf6W2kAgIUclkPzTx9eYRvAtA7WsRDLcgU6MJDNjc8GOqUB4vykny7et1IQ4X2nwq9KKfAkp8%2Be2HNJmrfAdcQaoK56QBprNIjtpAx%2BHSE8O17yNJTXK%2F7Rsf2Csy9Z5Pmr5iGwgtUnzYB%2FWPrl0hvMla9MzAICZ28fyYbjfsjwxdpYjHxwsa6jv772gcVuHxVBD8mPZo1O6WWtrUN23V6obmBkkFF7AxUgAkojFmc0wzwdknm6946wu0UiWBfmsFO8iBeVfJC5&X-Amz-Signature=01ea1aadd07e608dc0abc253c60fc4a5c1fa1f87aea32754f40e013d07b6f6e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

