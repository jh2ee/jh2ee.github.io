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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SAQ5UN7%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T231731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQChbPYbkiQwWtpC267OgYvdEeZhsv3LSRE%2FSPCkuWnLywIhAMq%2By5xme3zb%2By0BYDXA7oEVEo0rr8QpseLGkqoF4Ck7Kv8DCAAQABoMNjM3NDIzMTgzODA1IgwN2IixA5nPRzNSVfIq3AN5tVn1EgEBhea063Vcb709NxyjvGjC6BjGEiTc0yXnLKlIrUqosug9hwbMIFme3Q%2Bb2zV8c%2BOzbAo2mEvLnGGYUARk3Ay%2FXfmF9T0Xox1TjSxdwnRQt%2FKUR4eR3Pq1fbBQiCLXV6j9HmAChU3dLNtmG7Jl21B92g%2FJz0j8ytcIP%2FOM6iNMNA%2BRe2u9hj3feOCGVhqkVQp0dOnTKqGW92yLEM3vxTJ5NwdhEJWFNGqnS9cMjkGneZ3akV7cFt%2Ba%2Fkew98tshc36CDIzQLgNzHfBfQcKUHIO1RSjv5WrmtKqAQOj1H5AUx0g9ZVa4KpW2tKwf8Df1FapvTFs6BF9yl5%2B1eih1cspFTtGBL5vYDJ25p30XUX%2FM3JUWANmQ1EuVmA45ohESRmtDFIQNwtuv8s7TZUGGjUA2WX1ZpKFHMd2uBgaYmlEPaURTJFoGdOApQkc4DQ1KE7DgJ7wqSJIQEWMhLfQHec2XO7S6P1GNugsWxiZXXHWpGovtCRly%2FV%2FnLvmtF6%2FO5J343wlGNM6R58WiU7k9shRGZREEc6rGGtxjO7AUrXFr16PT0FJm3CM0YoEj%2BAGzDTRX9ZVZpnPECsB3l3eVjUMwH6eI5gE%2BJaSHNF%2F5BElPCOSKV9ivjD7vaHOBjqkAUAwrngcker%2FWthaYKGC7pF2FepmyEcj14F8eQ5NLLnO2tCVsc900xbSr%2ForVk4tXeHkBzMlPkoxSqNopLu3Vtj6EhItM2RILp%2B%2FOhm%2Bqlb7zwbOqHGp4XA%2BD%2B9%2FlkWd76WJt1Gn4yitkDYBwlBOTcBTAQZVjubzVs50Z58IJt1JIVlbmjLYv6SmAtE0GtnA2nJwEMCkkA9PKpWZPtB20JvaRRmv&X-Amz-Signature=8c1ae83a4a7ec1bb922fb417672a7f51be293ec941db915f41d529c0b9dbc7a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SAQ5UN7%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T231731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQChbPYbkiQwWtpC267OgYvdEeZhsv3LSRE%2FSPCkuWnLywIhAMq%2By5xme3zb%2By0BYDXA7oEVEo0rr8QpseLGkqoF4Ck7Kv8DCAAQABoMNjM3NDIzMTgzODA1IgwN2IixA5nPRzNSVfIq3AN5tVn1EgEBhea063Vcb709NxyjvGjC6BjGEiTc0yXnLKlIrUqosug9hwbMIFme3Q%2Bb2zV8c%2BOzbAo2mEvLnGGYUARk3Ay%2FXfmF9T0Xox1TjSxdwnRQt%2FKUR4eR3Pq1fbBQiCLXV6j9HmAChU3dLNtmG7Jl21B92g%2FJz0j8ytcIP%2FOM6iNMNA%2BRe2u9hj3feOCGVhqkVQp0dOnTKqGW92yLEM3vxTJ5NwdhEJWFNGqnS9cMjkGneZ3akV7cFt%2Ba%2Fkew98tshc36CDIzQLgNzHfBfQcKUHIO1RSjv5WrmtKqAQOj1H5AUx0g9ZVa4KpW2tKwf8Df1FapvTFs6BF9yl5%2B1eih1cspFTtGBL5vYDJ25p30XUX%2FM3JUWANmQ1EuVmA45ohESRmtDFIQNwtuv8s7TZUGGjUA2WX1ZpKFHMd2uBgaYmlEPaURTJFoGdOApQkc4DQ1KE7DgJ7wqSJIQEWMhLfQHec2XO7S6P1GNugsWxiZXXHWpGovtCRly%2FV%2FnLvmtF6%2FO5J343wlGNM6R58WiU7k9shRGZREEc6rGGtxjO7AUrXFr16PT0FJm3CM0YoEj%2BAGzDTRX9ZVZpnPECsB3l3eVjUMwH6eI5gE%2BJaSHNF%2F5BElPCOSKV9ivjD7vaHOBjqkAUAwrngcker%2FWthaYKGC7pF2FepmyEcj14F8eQ5NLLnO2tCVsc900xbSr%2ForVk4tXeHkBzMlPkoxSqNopLu3Vtj6EhItM2RILp%2B%2FOhm%2Bqlb7zwbOqHGp4XA%2BD%2B9%2FlkWd76WJt1Gn4yitkDYBwlBOTcBTAQZVjubzVs50Z58IJt1JIVlbmjLYv6SmAtE0GtnA2nJwEMCkkA9PKpWZPtB20JvaRRmv&X-Amz-Signature=8c1ae83a4a7ec1bb922fb417672a7f51be293ec941db915f41d529c0b9dbc7a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663H45TCZP%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T231731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIDK%2Bi7V7SCh5m9I8BTjiu9Nj2x52vaJ5EbWYygc9yQ%2FmAiEAxYlzC2dOb04lFQG8WblcAEz%2BICnMaHAghHu8notgV4cq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDOvXLseK0AW9Wpx8LyrcA3vzhuNRq2zzAtQ76DhHNpUQ65iZFVkYNzRyPztBlsMEFshg%2BOf8Qm33xc1KGJu8t10%2FojadM0g8QfVTGwfZpu5OPVllN7VnZxv4if0MSM5JyYTLUmileoOYkh%2FUfXWSuT4bnsDFjt7x02IxvrRefTRVRf%2FdkxZEKx1MtIG49%2FMnZITMe399jI%2FINvFZxGNOkPJsMi5opAZ8tJw6ZEAUUIguoJLmeSPHCkL6suw6RGToBiC9ZsZC%2BQXlsk3IflFfTlVgPcGrAvkEIr6Ysc0Yy7YgxmpgFVyqqv5LXEFPePtouBsMEWIsm5YGzTy7YdaIdL0Sg0jnd52Od27aXIhiclNjb%2Bv0qOIMLal2pWZBerC2AONlZqpTl5i%2FqmLpsoNPArUo0TPpPSeYMOETHnP%2FMJdZYsSsQPZwxyF9gSfRYAb9hOpqssOu4%2BF7ho08mq4K%2FSbpu6xJ5xzXRYRQKD0H5K27aygmGs86TVZrmU3x%2BfCKbG%2BliUJxJLuaubrJDdiAag1WmSnkrN5GB5wbGuZE9J%2FLoMog8zc3264XV8l953bjh59O5WdMtY6Cwaq9cp8jFKXmAYLsRvMWX26O3tx3ZRW5zwLUcgBePP72B7PmOeoRcz9hvKBSFgIyHq2wMMq9oc4GOqUBQg05lNH6PY0kOXKOvRhrrestNbtLPi0%2FtjXVf19ZH0caAK7RDqigG0eBAnPXQw2zemoFpAs3HAqhJtxzuFQWKTpRhtzF2LuwmVrENW38TjkSF2R%2BeI9jkBnHw2qA7jMPjA%2FaIjUMiVUlI7LP7%2FtoEsyxQoz1rKW3OWRRRifIB1zyzOCiCeke%2BTDK6bV%2FITqloJdKd0jiwjS7XuV%2F%2FOktiTMrmVb%2B&X-Amz-Signature=462ebb0968f4969eeb70545a86941aece1935b6effc2c0cbac04d25df52f44b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDAI3RT3%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T231732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIBQxqarwVk1K%2FpHMhgpx035LeQ3dgSyZMk86wm8bONDcAiBWiW%2BUjxz4RnqRvI4%2FN8oB%2FnFqBrA8yDUjph7oXZOW6Cr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMoHWaA4HQPZKIFnQIKtwDNdvKJTwTx3X3ty%2FeSYMVQUSB%2FL6pnt04YBDFMw2cFoDZUb2N9WYi%2F58FZphQtXtn%2BgEoHTIVbIrB1TAeaX7RbjoLY6QScOvw6N5H5pQkp50IwVUJo6zk9II8slez%2BslZYO0k3DTNMBiGFFPDHBNm34DgQ0pzJdbC8VVdLGhJBQSuYLIoA1cPZ6hMUDcQRlH6RckxA8CKtxDg%2FUXMNz09dXQiyuvWnI9655htgY2N2hwLg50wZ7ZRhRw1563KfiwMblgyw%2FjjrMODMVbkZRgtOmbHMa41EdqHaKUGGmcZHx%2BGt60jUkr2qfzQIs5pKV56iPJPDhwXmsumyyOk5T4GGrhepQg9F6IDSKyC%2F8kezo87%2B5jWFQtJ4lRiGoOKlbu6Y4y3G5PzHtfC48mP%2FwpgjgjKsHHCxE5pRqrokhLCoCj9o%2Fc7DZu6Qaxc3VDcgS8OPyesEtqD%2BKepP56FglqFytwswUsWdHIyZVgBDeSrkiWgGYLAIzFeu%2BREywEXXPqzAdwvZVXCyT7FAjjeE40t%2FFSGUJolrPgwAHWTNMpTD6RX73Ft34eyYM0Fx5i3PYctT8YzvdpPrGnMUXtLnYxU26Vec3NmXerWTAbOW5Px60zxCGvY0Q%2FnEN9bwtcwmb%2BhzgY6pgHRmx7TCIuvL%2BYoj9r36iEq3Q4whj3FC7ZVMuw%2BXrdcwz0cwmMYAh%2BwUZnvwAVTKSEAlnUJHYpaUaGAa28tZNQn6hFF4k0CUnSpUHtAxXaHDBeEODGDkOfxpM0Q7y9SjHke9SqjSAzkKAB5m55GJyoHg6iDLkv6KLhHBAAevy%2FQMfL4vwRSr%2Fg6iSDN2Wsuhf%2BQOHh4fzEPNYYGxvs1C5KcPwSbN0br&X-Amz-Signature=ae554dd8cfd6c6f7f4803736703582a6ec7362bc9b762ff87b36d4243fd75e3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDAI3RT3%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T231732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIBQxqarwVk1K%2FpHMhgpx035LeQ3dgSyZMk86wm8bONDcAiBWiW%2BUjxz4RnqRvI4%2FN8oB%2FnFqBrA8yDUjph7oXZOW6Cr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMoHWaA4HQPZKIFnQIKtwDNdvKJTwTx3X3ty%2FeSYMVQUSB%2FL6pnt04YBDFMw2cFoDZUb2N9WYi%2F58FZphQtXtn%2BgEoHTIVbIrB1TAeaX7RbjoLY6QScOvw6N5H5pQkp50IwVUJo6zk9II8slez%2BslZYO0k3DTNMBiGFFPDHBNm34DgQ0pzJdbC8VVdLGhJBQSuYLIoA1cPZ6hMUDcQRlH6RckxA8CKtxDg%2FUXMNz09dXQiyuvWnI9655htgY2N2hwLg50wZ7ZRhRw1563KfiwMblgyw%2FjjrMODMVbkZRgtOmbHMa41EdqHaKUGGmcZHx%2BGt60jUkr2qfzQIs5pKV56iPJPDhwXmsumyyOk5T4GGrhepQg9F6IDSKyC%2F8kezo87%2B5jWFQtJ4lRiGoOKlbu6Y4y3G5PzHtfC48mP%2FwpgjgjKsHHCxE5pRqrokhLCoCj9o%2Fc7DZu6Qaxc3VDcgS8OPyesEtqD%2BKepP56FglqFytwswUsWdHIyZVgBDeSrkiWgGYLAIzFeu%2BREywEXXPqzAdwvZVXCyT7FAjjeE40t%2FFSGUJolrPgwAHWTNMpTD6RX73Ft34eyYM0Fx5i3PYctT8YzvdpPrGnMUXtLnYxU26Vec3NmXerWTAbOW5Px60zxCGvY0Q%2FnEN9bwtcwmb%2BhzgY6pgHRmx7TCIuvL%2BYoj9r36iEq3Q4whj3FC7ZVMuw%2BXrdcwz0cwmMYAh%2BwUZnvwAVTKSEAlnUJHYpaUaGAa28tZNQn6hFF4k0CUnSpUHtAxXaHDBeEODGDkOfxpM0Q7y9SjHke9SqjSAzkKAB5m55GJyoHg6iDLkv6KLhHBAAevy%2FQMfL4vwRSr%2Fg6iSDN2Wsuhf%2BQOHh4fzEPNYYGxvs1C5KcPwSbN0br&X-Amz-Signature=123654d88507bee988314f3f8a3ae6ee4b9f2f8ae295bb6120d81be5fd5374c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T745GFQ5%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T231732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIHX83emhgbAN8Hm5dLmvcKQ7JUhHNDMMk4iDX1JWaokiAiEA%2BA%2FwAR577fzFR0OCGl%2BEB%2FRlJWeR9I1S6oFX98FDI1oq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDGWBNZyrPS2S9X5c0ircAy5M0vawcG517oHbc8FnhTXltM2LzUsLSg2qikqzQJwHzq%2BuMK2ZiP54waQxGdqyQSduqCsPyD2Mb4Ljx%2Br4%2Bl2b4xeVm53s0D8torz5f5Kf1GeeMGyIJr5iqvNkzOpBpyTta1TB7nXkm2y14%2Fox45ceQOfdrn3RfHl%2BpDn81%2B2frwbuheJzvgs%2FcgZ%2FXXaQGkmGyFicdUPoBncpvgPUFW9dwzCCd1mJI98LBEw0JMWz%2F2XL3QuK4i1TxvhqeciRcG3tkH0Gm8EizYkwIbk3vlzr%2BdTIub3%2BycoYfzcGwhBDNEr4J3QYGFQu%2Bsz9XawolEDeMm1zPJiAshwU5nJPbAFcEdwf1vZtavuXENujpntloaISGqVc4S%2F51v7vn58tkcPdEz8AIT6JedDbxidDRWQMKLGBBCYhrKzozVl1M6p0hAv45t1Swa0JR3sr8a%2FAz7wxSIx%2BisFFHYdhZLIcjgamuSdtnXV6ADzeXjvdskHjRy56NJw2KRGJPC%2Fdpur%2BQIqENQPchqgRtajXXGP54O9k8NTCehNPVjwjDeVajTuZ65K9JEGwGwdBpSJx1CnLAsIBdymq1jjb013vZQq0IOa%2BnNIHhQHz80SQa7%2Fm9fuEjSHdUU9P5U%2BvNpacMPu9oc4GOqUBxRMW32zz%2FsgTF%2Fykx6z%2Fh1CQKT1PNQXIWsUWs%2FjdoNhoTOddOMQeHt%2FSwnaHRHIGF9b7a8%2FK3BMf1ZGDRyIWPp%2FoKX9AG6NzwAnSodqRVmfp6qFklsySnwwDAtEI7paTbkMRO6xcJP4xq80AJhCZ4NnoRs8GF8j6zywXWXf33vJWUBtLV%2BxMkYUVKh5ElpoVVZrjxrAc1ockFLFi0OSFTxEv819Z&X-Amz-Signature=cdec79986e8b9e8009aacda422ef15c6a3c70c1a54c80bdd95013071dc2914f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TVBBFCX%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T231733Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQDxirYV0do6dtvMkJEL7CkyxNw%2FNdVaejwuU%2FAvSRDNUgIhANeR7b9rf%2BpOHgTPD2juTMcfxAl%2BASU1rlwOwdV76%2FT3Kv8DCAAQABoMNjM3NDIzMTgzODA1IgyLM2UEQY67AXnSHNsq3AN5q7B5k5mnR5GZYL0gZjYPUoT%2FqnLi%2BCsW7TSIFDfJLrv2FfdHH%2B8p4j8M1JREQgrUR4o0Umy9DCAiqpPfQJ8OrAWnFs9kJl7cRZHvzZKL8Z2W1sNsJ%2BuotndSe0fwYducb0Sy8570M9VaU%2BeX3%2F%2Fh1z93zTl5%2BJYvVaI88CatiKRmJPZ1JkEzVZ%2BLyIlsmsgp5CgQ06lCIBgQDyLpF%2BDL3Bg%2FtVGFjfBCrBSoeBPo26TKxDx8cpwdpI9lqB9F8EA1%2BEKnlq0uC1XZRc27F5eUI0AP0MILVLLOzCswvai%2FZCawH8h5XXXW%2BT%2FA56fdsU3MiVwcgqPGODRaWiv4gyrbmOUgJuiZRIg%2B%2Bx67KcP97HKhzBbPWJ6k2uuYpk%2FwKaBFMzqOPIAl9dWKMzRl%2Fu6iBsQf1T0D%2FsOai66clmHr%2B5QZQbqDABP6BiuHhZxdCHEDVU8EfACTpxpbwYEyjGe%2FGq%2BhPN6wRSpCin1k15qcaGvvvJ8NGX6VEF8JvAWw7e3fkHGjeooCVzj7FuQv9cRh1iQ4sojZE5Pqk3G1mtxO1kc3WBxNXF2wASvpfruwC04wpGJteaSt3TXNxc1lzye0uS23mFF6nPWjTVSr28OGrXPjv5d%2BHkjsUS4hyTDlvaHOBjqkAdXHNgNaKH528WDPH4adgJIIldxLUjSpiadNWCO2HDC3sl4wDH3TeVii1b9EXgB34nO%2FEfmZh6HB9JRE29xfOe4GI0Suwhci%2FV%2FJwX5Iu8JJmkMraShwaXFFKyrNMbZif%2BlnQN0UDSQn7xXWN6XXYmXUHniwmaWYmJgUBKuIUoklGez7Pn%2BuOXGpK9qgkYCUHZ1l3vfFxmNpQt2TketfW%2BzSAfT3&X-Amz-Signature=244d39203702a7cd295b1b9c9f637f786812627a2eb303ddd6f7e0cfee2e430a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVT27ZI3%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T231734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQCvvUUVFzOmDmCMkSB%2Bn6PARorW%2FKzb1r3uMf6LXApc3AIhAO6Gx8pjAsVm8NBKE5CkaiTqCum25IEBqo4TL%2F0Hqh3JKv8DCAAQABoMNjM3NDIzMTgzODA1IgxSRHCYFzi5ol%2B%2BONoq3ANfRx0ACNSQViQHv2pTXbbTdciOaUeS1bX15hReN8GgkZgIyFkoiPYEIgrRuJ00bue913ER%2F6Rp2KQPdaJNAbH%2BiNrR%2Fgh29d7KAZUrVoK4a1CZZ9AS7B%2F4L9jzyRf%2F8H7pFzmdVVKQxb5nrYyxgjwIv%2FkWmxFlcIBVmz1o%2B7ukx9xUhykL5DFk1YHH5tAS1cqhsE9OVqidoxFIGbLxhRPMW2Qhi4CJ89ObHBuwcPKHuE1CFfi3c9%2BU3YPGkWwKS1T1Ihtdi4vcluYUBj%2FXR03RIRCiRvPxWXzVZuWc4QJuifKRiV7AZjO9tnHfbLnm27%2Fbtkkn%2FGVjXeyQsK1%2Bbai6KVF3ut%2Fbei%2FnqMEU8oW303AITBt5AAlPzvqNqGYZ1hMp1fY5ubhg6emL54MkTivDWau2cM0pwi%2BsEpftstszYBYrA2M6Dq2rkNw7aXAZqBBFfxf345ZWeWGwXISCH%2B7Zfsevnxv32S3Bd4pMD15U5S62GUKmGpUAS4tqfk6gYZfYGO0dv%2BMXfvHH7nVyUuXV4Mod2%2BbZkMIuZQXciqfwWLMtzPLfR8%2FdNLDPxrBU0TuzJEtCO6v2wx%2BZqMq2juOzRIJVW4svGcjOlxG81dF%2BFXPq2EM6UUw1lfZPNjC0vqHOBjqkAbGNasNWHpVa6Q5wWPXCmWzLyT6lpSyLWBqwSqhaCz70nGKq%2BtGTR3XirHVzrH4oocsLXWEA9NFtMhDtq4op%2B76Wd4RMSZEtF6oicxRM5VB0I7ug3KdRoxGuRNYVxwn5JeRcxaAsqv2oMCW5zEfVjfhzbWAQZEA0KQGGgxHlmOlKccIhnIt9fq770h4Mwo9%2BCEK9rgE5LERwD5mgH49KokQ8EDcW&X-Amz-Signature=733d4c3c717d7d27264a28c5731f650897c64ffc538b0a4c8a97e9621b1e2324&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CYAH6NI%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T231734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQC6xp8oUWXbqfHNokCgPbPMLcW2fx3kuFe%2B%2Bnwv4H4c0gIgFjKYRzd8SXCbPYX0J15C6BKDeqalzK9FFg%2BNKjPr%2FSQq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDD5PJ8ClaYfUS%2B8HvyrcA1OZrM2iVW%2BoBNl8rk%2BD%2Fe6bEIrnGCstQbKeV9%2FzEWV4Rt5fn%2B4UAwUnTOY7FcHpoQ2bSyEATioEMO87cDgnoPnQAUAkc5KZ3DI2KNa0TktTSeqxk74tBx20RvRaRWlq7uPoPBPK%2FmjIxUQGTCU3KktV92WaQO20jLjzrdUx0SQ%2BcnWR5TFS1UBP1y4vicuhQx72UMSr1EWWrwyLYcu6r7mSmJOovdmx%2Bb0%2BokjsmffSe9TJYVY7MIZWQWc0QCJuIgHgyX8N%2F9pw285QS1rYQIxuH%2FdjOnsuoaMB3WZ3tY9rR0XHDnw1nt2tLDEgUHUVHuDRNyIl5jYg%2BF3f5gIfmRKzWGHc7HPlEovTNhsbqyadnUlYKJhmYvbRPa7AooOS60LtM%2Fq%2FZ6bkDp4BLj8%2BRO2EfWeRCzakj%2FdVMyYdi%2BB6J3Tq4OOoAi4OHOGKSBtLephPSC3%2B%2FZcYa1dBooUHlC9KXndIWyrjkiQcerd8In0x8ufSU4WRk4YT5GU7oJEhCUYZO62o79LvAXMrfX4iTOVxw93tZRcKrGU7yKDZ1k0xAoZwtGlhAg8IbCR9YHvTdDw1UoCmBr3YKlGtgLRWiChn407X%2FwDkrp4nGxk49l7wLmtRbpGgEoP0mGcaMMa%2Boc4GOqUBpZGM4Sz8TP4Mr7FBj9%2BEUpcTUtpkuYWPm330xkd%2F%2F5CAPmw6WAzvwG7Pj4zVlppD85%2FcA5CFhHZwL52TxrLejWwl12YzajmnilsQtKq%2FWBQpm0znL5F68FtsH8OlNoYwV9CGlqed0%2FBzUWdzV9qnxksp9w8ikryOMMTrYxZ9TsLWWfV%2B6HTxSO8Zgy54bNaVDgn%2BOlvGq5uurFBJTl1jZydGy1VP&X-Amz-Signature=0f5d385f70efc0ad7107d38e45a404d836f1ff19bdb48ac3fa6063758405a6dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CYAH6NI%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T231734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQC6xp8oUWXbqfHNokCgPbPMLcW2fx3kuFe%2B%2Bnwv4H4c0gIgFjKYRzd8SXCbPYX0J15C6BKDeqalzK9FFg%2BNKjPr%2FSQq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDD5PJ8ClaYfUS%2B8HvyrcA1OZrM2iVW%2BoBNl8rk%2BD%2Fe6bEIrnGCstQbKeV9%2FzEWV4Rt5fn%2B4UAwUnTOY7FcHpoQ2bSyEATioEMO87cDgnoPnQAUAkc5KZ3DI2KNa0TktTSeqxk74tBx20RvRaRWlq7uPoPBPK%2FmjIxUQGTCU3KktV92WaQO20jLjzrdUx0SQ%2BcnWR5TFS1UBP1y4vicuhQx72UMSr1EWWrwyLYcu6r7mSmJOovdmx%2Bb0%2BokjsmffSe9TJYVY7MIZWQWc0QCJuIgHgyX8N%2F9pw285QS1rYQIxuH%2FdjOnsuoaMB3WZ3tY9rR0XHDnw1nt2tLDEgUHUVHuDRNyIl5jYg%2BF3f5gIfmRKzWGHc7HPlEovTNhsbqyadnUlYKJhmYvbRPa7AooOS60LtM%2Fq%2FZ6bkDp4BLj8%2BRO2EfWeRCzakj%2FdVMyYdi%2BB6J3Tq4OOoAi4OHOGKSBtLephPSC3%2B%2FZcYa1dBooUHlC9KXndIWyrjkiQcerd8In0x8ufSU4WRk4YT5GU7oJEhCUYZO62o79LvAXMrfX4iTOVxw93tZRcKrGU7yKDZ1k0xAoZwtGlhAg8IbCR9YHvTdDw1UoCmBr3YKlGtgLRWiChn407X%2FwDkrp4nGxk49l7wLmtRbpGgEoP0mGcaMMa%2Boc4GOqUBpZGM4Sz8TP4Mr7FBj9%2BEUpcTUtpkuYWPm330xkd%2F%2F5CAPmw6WAzvwG7Pj4zVlppD85%2FcA5CFhHZwL52TxrLejWwl12YzajmnilsQtKq%2FWBQpm0znL5F68FtsH8OlNoYwV9CGlqed0%2FBzUWdzV9qnxksp9w8ikryOMMTrYxZ9TsLWWfV%2B6HTxSO8Zgy54bNaVDgn%2BOlvGq5uurFBJTl1jZydGy1VP&X-Amz-Signature=12e531109ba7adf6cdae46a448a5f5a37c5914f8c586e6572b3f8c5cb727c67c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJI23YVH%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T231728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIG0QJLNN6eVjP76BOAo0VBMUoF6X7Bgjl6C6QDbbKtCyAiA4C%2BlxXer%2BjkDoBJnVtMvUGXXS4zhA93s4rPZ3K41ifCr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMkuMzDuR109HxDYCHKtwDmH6ymNaEPJsJkkiudFb7056ZM%2FEPxA1XBLJ9Fg0AHsz9bmjQQ%2B8YDIPS1YyrvfFX7ou790%2F7YREaBPLIcG2uqgErG8mJwNnBoe9nl4ECGLLEnO3sV4mkWX2ujGvOa9FIefv4wJwPdTvOFCABShjTypJ3g1gl%2BP7oDAWFfRBQzvn4hkFBUTb4Z9FrWmf80G%2Fj74GUUiq6oDoHJLbg5DqDJS2YCbjeTynE4G403L%2Brcc%2BD1Tr7poYBOE5tQmw1qSLwzioDU%2BvOx%2B%2F7COY2SobvqP%2BoJlCgTHjTQGwHDdXESVuTYNwpkhh2giSSzlOjq4KyQFwcS8EcgGQ6%2FMV4Hu%2Fmr7ojNVdLUy5mi5AWYAeW20GMrZjsGbtCUDlzoDDRMpd97%2F4hz%2FWI2MdM3S1XtsNYOaNt%2FO46swDtd0xAGYpC74SsDEhXZ%2FcZg6lR9M%2FWGisa2Ryzlwg2W1m%2Fl%2F0zSnLOR3TgmW%2F%2FRkHk6ITDZidHZb2DZM1PSc3Wj4YtKHcnr48fZyLFxW1L5CcDlsB8jsPns%2BWKV01JX95dzWZMBld6u815uqJrvmqaC5MVPa1dGlLULvrqriLMfOFd47bPPDUexC5XfUp86qbjE9q1GWDroGGDMovq3SVy3Jnatwgwvr6hzgY6pgEhkZfjBqKLr4imaEq2CL0%2BhCIDFF50jqFQHnh%2F4vj%2FWwxA8IeTFTNIm4OOa0DHu%2BmE1hVL6KfQzfX1vtlEt%2Bqt%2BCDxnqTYe00Yu8Yr59GT4p87Ac83hPxmGJPQWKso9unwvGj3wC6cSGOXDb2TaE3okCSNEPBFxnsiOZHAyFwWWzGtfsiAK8CpGnYaMUcMhdhTANn1w9FtZ6WjqIoNsrR8ESXGcUWq&X-Amz-Signature=4d5c8b7885aa9f02e50c0daa3c19a75c5efacd10f4b39ce7cc8ef5fff265daa6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKBNM46V%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T231736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIDRj1RmND0rg3RV1yzxS3yPNWtc2oydJAHywWQurZkRkAiEA%2FYmUFrZZ2uL0NJsSS1C5jh5s52ztXV%2Fo%2BsiRtJgMUhMq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDCrIy9wOfuR0oXKoxSrcA7aylEZIVzrA%2Bkf2dOOgLmTh4abrlNNLU99WWtYJGhaNdkhjLykaSbMhZj3FxeEQhvbFpxVho6SYebHXF8ZRXlUXx4QvEgM1Q7nki2qfCRrVc5GZWrBf1GXZmqlHXZfwcbXbCvOV4DY03FnxZzg9ulE4jtbSdyDqb6fDIyD9muKWLiDqobxFD5MWsaCX8O3e3EfRzaK0KhtPNgh7e9ChdE9E%2B7PBRTW2z72hzJfWJMe47I%2Fpuxy3Dns8er7iL40B47i%2BekLXqG1UDlfx%2BoINGN%2BO0uBLY3Z7LIa8etrC2uB7IzRj94lOIh%2BRj%2FJldVELIVqBII6YaFlCYkNiVSYEFdTLlPnhFrsgayNOCNlL2kYlZswPdfaaP6haiHPboe1KV2mVueEcu%2F8xq46yxX%2BYmXHTtDs2SKxOyHnKsL2%2BBV7%2BDlsYlb9rFYvd7fn9YDONi9YnFmwR7tVe7dl%2FQIgOjqx6FBWGA0NP2fqtulK0C9XzC6vmExbmzZZMKibYG9LZPHLaf5O%2B7B4SAyclWogNKPUBVN4AGrKiv37bQsdWbPsbdXX1XFELY5jXRp8Ndk3IbiM3BaVkN4Q0q1mVLLBeMKRb5E%2BtBoWq4icDkFrx%2F15H19hwbjSjjlAcJLHXMMu9oc4GOqUBIVP0IHd0HOR9Ag2AoL%2BGXAnHWtiakQ4G%2BVL7oBTOIVM8capibhLrt%2BOwiHdnYIKOEX6J4OT56TMEPJL%2FxbDDAFWVydg%2FVXzaQj2CPd0RWkekqvtbCYSK39eC1u1qii%2FAafga60kQhOTb4SZlVK6ZSFknjiPIeShp0%2BOmk9oagLVfUgFn7KpPC68wvFycbvK68K3poY47tOLhKj0OQorXneT%2FQ8c4&X-Amz-Signature=32a64d6e2fa08e87f9186aee58274c6caec15cd4ad141a9df248d9b0322f9676&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKBNM46V%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T231736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIDRj1RmND0rg3RV1yzxS3yPNWtc2oydJAHywWQurZkRkAiEA%2FYmUFrZZ2uL0NJsSS1C5jh5s52ztXV%2Fo%2BsiRtJgMUhMq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDCrIy9wOfuR0oXKoxSrcA7aylEZIVzrA%2Bkf2dOOgLmTh4abrlNNLU99WWtYJGhaNdkhjLykaSbMhZj3FxeEQhvbFpxVho6SYebHXF8ZRXlUXx4QvEgM1Q7nki2qfCRrVc5GZWrBf1GXZmqlHXZfwcbXbCvOV4DY03FnxZzg9ulE4jtbSdyDqb6fDIyD9muKWLiDqobxFD5MWsaCX8O3e3EfRzaK0KhtPNgh7e9ChdE9E%2B7PBRTW2z72hzJfWJMe47I%2Fpuxy3Dns8er7iL40B47i%2BekLXqG1UDlfx%2BoINGN%2BO0uBLY3Z7LIa8etrC2uB7IzRj94lOIh%2BRj%2FJldVELIVqBII6YaFlCYkNiVSYEFdTLlPnhFrsgayNOCNlL2kYlZswPdfaaP6haiHPboe1KV2mVueEcu%2F8xq46yxX%2BYmXHTtDs2SKxOyHnKsL2%2BBV7%2BDlsYlb9rFYvd7fn9YDONi9YnFmwR7tVe7dl%2FQIgOjqx6FBWGA0NP2fqtulK0C9XzC6vmExbmzZZMKibYG9LZPHLaf5O%2B7B4SAyclWogNKPUBVN4AGrKiv37bQsdWbPsbdXX1XFELY5jXRp8Ndk3IbiM3BaVkN4Q0q1mVLLBeMKRb5E%2BtBoWq4icDkFrx%2F15H19hwbjSjjlAcJLHXMMu9oc4GOqUBIVP0IHd0HOR9Ag2AoL%2BGXAnHWtiakQ4G%2BVL7oBTOIVM8capibhLrt%2BOwiHdnYIKOEX6J4OT56TMEPJL%2FxbDDAFWVydg%2FVXzaQj2CPd0RWkekqvtbCYSK39eC1u1qii%2FAafga60kQhOTb4SZlVK6ZSFknjiPIeShp0%2BOmk9oagLVfUgFn7KpPC68wvFycbvK68K3poY47tOLhKj0OQorXneT%2FQ8c4&X-Amz-Signature=32a64d6e2fa08e87f9186aee58274c6caec15cd4ad141a9df248d9b0322f9676&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654HHFQYN%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T231736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQDFSY%2FTiZ8k4SfF4EZr0P4c6olkw2ogMJSQVxO%2BigEMRgIgTDLqxA4UPYA8IHE25tNBuC6qk8oeE6IupxOdwGqkPPIq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDJVRNyPUowpJ70a63CrcAzCcRD8jkgabxQqokaS0cHfWMP60tLhXFzxTPnRXduc7o33%2FbsIkuSeLvqtlwwKGVYdgA11xN1eSX3Ug%2B7NT9Lt7Gu%2Bxo4hsHQnqSw9p%2FrexvGnWpSV12KWd2y4YTh7gDfw7%2Bh0Lal7KA5oyzqD8oTMbCCCVwLhyV1fRbqSNavo5EX%2BF%2BTsqM07n4zYl3rHiCtqd7EXzQlIWvpIODJ0TKsaUKskQJYgecuW%2B52CQzvR%2BGxFBSmxEBQ4s64Iq7QN2O7YFqsVULlrZkv9VIGRv5J6kmg7JnzDAd5J3YePbv2d8%2BRlerRw8K9e2aT9oddIttFu7uUQVsNcgLvUUUm%2FoDzwRQVnn3YJFg76u92OcOr%2BLjQgbMHF6E6f5jywWt5oL%2B8gEBMfcfiR0ob1cWrv8a08ELUFh4TkAY4joCPQu2uAf5bvnM%2FqS0JbPh63KJsh6opZrT0RkdwGdsycy29ylxTFntA%2Bp6ZpCdZsf0l2kRaoseo6ARSUfD%2Fd3yK66VM5Az7C6UoXRhguuVUMDjKz%2BxMVHHqKzGGucfIufOSBvqfADuzpzfJl5xoumR6uHBqtOOG5MHzARRytrlPbhK7Z1YiWNkUf%2BvKepPMLtIwyBW8RxUfXZaigQcVgDUAK%2BMKe%2Boc4GOqUBKCa7jV%2FWpeuQ0YZbYezctSivpMtLpBUHpWTJXQKG89egRRDRUzB5I3PS6Nw0stPmjuirIZbMQXY1HfEpb75W1UT%2FnErNpYArWKbQULbSaAw7J8WTZY98qo8TA0upnHl%2BEUs3V986a%2B3QDFh9KMWQDF%2ByUqTgs9D%2Fg0CO%2BZ1KimcDD0W1wQB7DFzYDzUGsTZjBMTOndT9JhyJ8V9mraF8wZHuBZt%2F&X-Amz-Signature=c64cb80f70dfc1a18486defeb86c766e5626daba8822f36278c5fddb1c2cba14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

