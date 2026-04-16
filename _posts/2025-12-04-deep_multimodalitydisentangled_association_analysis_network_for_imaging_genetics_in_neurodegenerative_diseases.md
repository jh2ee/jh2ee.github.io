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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QV2WPLDK%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T161158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDz31mlTcInrL0O6snutAsBCW9%2B1cy07JLQKC0K6f61RAiAQuXEoADuf26GZCCcKCVHxMCZOHW1JbiMPnZD6eSqjkSqIBAjB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMe7UggkmYoO05UY4TKtwDTrpnrO%2BlnuC0BmOfH9wQJObLNDK%2F8wMJYpzpn3Xc5uZCIJJ4WNAjVrIsW1Rpwgtl1%2BP8RPL3B8FiCMXBzUVDstEZ4SrsemHU6cnYkN1bZJpEgX3IbrHVwNa%2BeMAl6FUWeM%2BQeZo8QchKl6vBhBSOFDhY%2B6NnoSNMsUbepFLdgvr%2FYfamoOdiyfAIkoWefTvx48Kam7RjpZhVKc7CI7WsyFeycnLJRHOeSMuyysJREMKMd6WHpF6Ju3uvO%2Fclny9OKXgaMHHkGgVLhClnqtq6Sv91OHX88Tr49Bjpvjt1ojfu8TafRbbhoPKspgnejIabE3sdL%2BSrZM6u2brw%2FWL%2BOpcIUUAXYZEf4UHxMM8X2lWvflsYjyWgmXpJ7%2FeE7ht%2F4USZuZFiHWQzM3GPUe3uiaH7mV%2FNhtsGBHi%2FfaqJqEq8u%2FqSrdl%2BOgubT0V2niNrFSRwIybzpIKlyn0o6TnCNyJdhnKlrjoZT3ehtFq4MaXZEeycJ9UFsB7aZj5EhGr0BC9CKO6k14PF09z69xsViXpvDxilhKDzjjZcP%2F1TR%2F4hUVe%2BYb6fjQ2%2Fxk1UsT%2BQpFCy0wYUBBWt2KoZR69v1s%2FiV1OM9GPwRqbxciWpuIN2If2R7I8kWEyVPy0w74iEzwY6pgGbmxf7cN%2Ftj24ujdmgtESi4E%2BxEaxH%2B8o22YP5H3783ClDpjqrw89oAlu%2FH1mPoY%2B0SF%2BD4cGLrJdC11TKBS35t5QQFZHoOVcdrejCos5AzY09hsTJqa1FIWI3PPZbEBCod%2FISyfHYAPV9GDQqfL5hkyV8D5fKWjxejuCAxNPOjwW0r%2BgFvrz9PCjGyx7pF%2FxvWbJTjriXDDD2LnqxE3s9Quu43Rtn&X-Amz-Signature=c1355a409925e62b375acd9a3f55a0f1ac2463079cda43b422cb43380a13dda0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QV2WPLDK%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T161158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDz31mlTcInrL0O6snutAsBCW9%2B1cy07JLQKC0K6f61RAiAQuXEoADuf26GZCCcKCVHxMCZOHW1JbiMPnZD6eSqjkSqIBAjB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMe7UggkmYoO05UY4TKtwDTrpnrO%2BlnuC0BmOfH9wQJObLNDK%2F8wMJYpzpn3Xc5uZCIJJ4WNAjVrIsW1Rpwgtl1%2BP8RPL3B8FiCMXBzUVDstEZ4SrsemHU6cnYkN1bZJpEgX3IbrHVwNa%2BeMAl6FUWeM%2BQeZo8QchKl6vBhBSOFDhY%2B6NnoSNMsUbepFLdgvr%2FYfamoOdiyfAIkoWefTvx48Kam7RjpZhVKc7CI7WsyFeycnLJRHOeSMuyysJREMKMd6WHpF6Ju3uvO%2Fclny9OKXgaMHHkGgVLhClnqtq6Sv91OHX88Tr49Bjpvjt1ojfu8TafRbbhoPKspgnejIabE3sdL%2BSrZM6u2brw%2FWL%2BOpcIUUAXYZEf4UHxMM8X2lWvflsYjyWgmXpJ7%2FeE7ht%2F4USZuZFiHWQzM3GPUe3uiaH7mV%2FNhtsGBHi%2FfaqJqEq8u%2FqSrdl%2BOgubT0V2niNrFSRwIybzpIKlyn0o6TnCNyJdhnKlrjoZT3ehtFq4MaXZEeycJ9UFsB7aZj5EhGr0BC9CKO6k14PF09z69xsViXpvDxilhKDzjjZcP%2F1TR%2F4hUVe%2BYb6fjQ2%2Fxk1UsT%2BQpFCy0wYUBBWt2KoZR69v1s%2FiV1OM9GPwRqbxciWpuIN2If2R7I8kWEyVPy0w74iEzwY6pgGbmxf7cN%2Ftj24ujdmgtESi4E%2BxEaxH%2B8o22YP5H3783ClDpjqrw89oAlu%2FH1mPoY%2B0SF%2BD4cGLrJdC11TKBS35t5QQFZHoOVcdrejCos5AzY09hsTJqa1FIWI3PPZbEBCod%2FISyfHYAPV9GDQqfL5hkyV8D5fKWjxejuCAxNPOjwW0r%2BgFvrz9PCjGyx7pF%2FxvWbJTjriXDDD2LnqxE3s9Quu43Rtn&X-Amz-Signature=c1355a409925e62b375acd9a3f55a0f1ac2463079cda43b422cb43380a13dda0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TCM44ZE%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T161158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDVL%2F9sA3KG3ofeDHAA%2BY8guqDDtiGn%2BK5y9PcdBRqxNgIhAK%2BzjTu0LQ8%2BnH2kbbzT5qtThFUgxSIRfjl0SVXwwEpcKogECMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzL8Z%2Fkz2faYwBVJOcq3ANNnuiY4x%2B7HA9JDHyFDQN4ws8qUJMrUgjsBECeMjg22TqpDu1zteFjZN0EVegLfIQQ55CVnmhggw%2Fqm3%2FOg2tV86FO%2FHboY%2B5kXHvi9SYzuvDMyhjIZBlytb6DLVnLQ1NMjl5cszhqobs9wGOUgemhD7ON1Bd%2BQwwBDldwGxL6%2BqNgqUpHjYhUzxV4bhSlo%2BzR6%2Bb3%2B944LYSNgdL5kPSnO5MazmOmWMfcxJW4%2FjgPXpGHfet2Yxd7n6prKQCBj665BbOzaiOhYl87jEz4AvtXXd5Paoz3olPbOpfuqnMpLGJ0nQ8h5WdjdGDk06Bw1GfcF0Qeaj99VzrE8dYzut2gNzgwDAxpwfd%2FUtYS9TJtR8cWbl7ZxpGSwpsVaf462niZLs8puw6tHlSYN8RLMRBHyIhZ3bkcwGXqpBMPd1IozQRm1oIIwJP8gs8atEFRnBv2FpnxK3huErdagXde7VEUoTXVcjMcCi%2F5swHvsKhtQUtMgFlwSHCifZmQen8kqI30jsNAkj7%2B9T7YuQGusniu%2FZeOHDMRDyyHCURw8LzV0eeY2x66od7xsPQGQd682B8tyr6ZmMd4RNUivmGDlsMrT0hlzu6IVpOQfM5OEZRtEKATfx3wCe7jrQfT7jCnh4TPBjqkAU6puSD%2BwYXuPODJDA1MZIoftQpiyTmPfAJSqH4QwbSDml4iSYy7Htcb0DPBDAMNNlvsANsnjs95DTqvgo54VGJqVcgpGBoAMdKYLWwBnIafVhYCCDH0audH2eGww4Y%2FpnJmaK6OQnJD3rnQEDD0SHiv83OItiSQv9AvC%2FVb3D1ve4hBjAjSoEsKNmdGHqt5%2F8mMIRv8OAfF08npKcn3vTuP%2BxLi&X-Amz-Signature=8697c58a96c4986a7d9f1d9e17de97903f510b335188b3a93f60767532dff815&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y76J54QW%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T161200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE%2FzLnEfgq1lAVZ9I65lKAcsD%2BpMm5%2BSKABsaCRJiAv3AiEAnuJcwQFKaCwxd9vZhQQKq%2FMh8pxQfgrRqKl8roix49EqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH3jIk7M%2FAmxL8i9ryrcAw5MT8fBsJyETTwqhdIIRkyycmqFjGnCPeJ6K3mROuOlklCNBacSK7X8TCMbkCy33W7ai5DBvEmQeGhpW4R6Ps%2FG3KiBysthWufFi10PM58ww5asMzX%2FKOWwq3BSIrMsRohebu3poM9z616aBP9oifsjqjZF3vjBUSMWS%2BwJsb6HUqS6pGC7BjE6WgD4pEEAaFlU%2BOSswTSPThJ6bYQ8mSkqXmqUxrTt23AMde%2FCOkOcQ%2BOb8qUoIStA0Z6HtvDAWv1H1ug3xUymIjDGKoGNtjhL1c6llXs%2By5ec%2BQjGQOzmVNNkUNTWF2CY9yXl3BGo7pSCorlTlQ9BKvKFq9JK%2Bhlf%2BNAaVmCm68yuJAZ3RUjelNELuX7MWY0Gb2jmWxWu6thKhAHAemFhBPLatvZWBHFAA2oISUahWU4HbYKHjWpNxI4lNMmZ9QwO0%2BQRU3n4FPSKhElLFTXGUGRAlkQElm68HzJAD3%2BWoCiVspusZMHVawNAXh0oAo8mkjSKc5Osyos1JehSpl9CT%2Fbdm8fe5DwbS5QyCMkjPnPosZBpgp8Zp8VuhB5ThxhtSboo5LVNA9gxDqzd%2BTj2U%2BwMKBEaEk5%2BroAMCtklPlm%2FXjYWGBw4%2FQj0FYbFzGd8CjfhMPGHhM8GOqUBUNUf7r16airnq6zXa8nrM3rZvrCCmbsOgUojBy8PlpujZgx9GgRZ%2BnnWLfZCvXwikd6E31dQDjM9z7KdtWdbbZe%2FNkgTk8FsWoXye65sAkJAIEPpfYb3v871QIM9JOxjvqvV%2BiQnfNrTdoExWmzqSUO5WIkJo1txaWBY5dRoCTrhcMQ4XxuKAx1u7c%2FszQxsSV%2FYEM%2FzP4a6WxzumHXnhT5R%2Bvqu&X-Amz-Signature=053bfdadeb276ba0c60037ba512ff3cc1552cabce8d803fc9b31813d0ac29ba0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y76J54QW%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T161200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE%2FzLnEfgq1lAVZ9I65lKAcsD%2BpMm5%2BSKABsaCRJiAv3AiEAnuJcwQFKaCwxd9vZhQQKq%2FMh8pxQfgrRqKl8roix49EqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH3jIk7M%2FAmxL8i9ryrcAw5MT8fBsJyETTwqhdIIRkyycmqFjGnCPeJ6K3mROuOlklCNBacSK7X8TCMbkCy33W7ai5DBvEmQeGhpW4R6Ps%2FG3KiBysthWufFi10PM58ww5asMzX%2FKOWwq3BSIrMsRohebu3poM9z616aBP9oifsjqjZF3vjBUSMWS%2BwJsb6HUqS6pGC7BjE6WgD4pEEAaFlU%2BOSswTSPThJ6bYQ8mSkqXmqUxrTt23AMde%2FCOkOcQ%2BOb8qUoIStA0Z6HtvDAWv1H1ug3xUymIjDGKoGNtjhL1c6llXs%2By5ec%2BQjGQOzmVNNkUNTWF2CY9yXl3BGo7pSCorlTlQ9BKvKFq9JK%2Bhlf%2BNAaVmCm68yuJAZ3RUjelNELuX7MWY0Gb2jmWxWu6thKhAHAemFhBPLatvZWBHFAA2oISUahWU4HbYKHjWpNxI4lNMmZ9QwO0%2BQRU3n4FPSKhElLFTXGUGRAlkQElm68HzJAD3%2BWoCiVspusZMHVawNAXh0oAo8mkjSKc5Osyos1JehSpl9CT%2Fbdm8fe5DwbS5QyCMkjPnPosZBpgp8Zp8VuhB5ThxhtSboo5LVNA9gxDqzd%2BTj2U%2BwMKBEaEk5%2BroAMCtklPlm%2FXjYWGBw4%2FQj0FYbFzGd8CjfhMPGHhM8GOqUBUNUf7r16airnq6zXa8nrM3rZvrCCmbsOgUojBy8PlpujZgx9GgRZ%2BnnWLfZCvXwikd6E31dQDjM9z7KdtWdbbZe%2FNkgTk8FsWoXye65sAkJAIEPpfYb3v871QIM9JOxjvqvV%2BiQnfNrTdoExWmzqSUO5WIkJo1txaWBY5dRoCTrhcMQ4XxuKAx1u7c%2FszQxsSV%2FYEM%2FzP4a6WxzumHXnhT5R%2Bvqu&X-Amz-Signature=f3462a693f85dda345363cbe7d63fd7eabec6083f42641e2e4645e45332a6a8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYMAZZIN%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T161200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDjhXnMY2dl%2F4e5uUrEHKAdMSmGE2dr2rgxIbgOCA%2BpwgIgI1jiBXUWQ%2B%2F6SRADKt7HLj5MS5gWEO1k2JH6EEkdPj8qiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMHCjM%2B2eSaUodXtqSrcA4GxN%2FwviDpXWPcVvtjlZ4xtcryYKhL62Z5TbuwdPky%2BXz3mOoCi8r9H%2F5lxCyLkNZnzFSpqBvTjnXr4JaVQOsI%2B5rO3wjNkejIJlRqCDaW3ZxkWgbxa%2FHilaARZH871Qh9SxDhTdHb0USKa1TRG2xP9sQWJBpwqA7JxPwvXvZkBFylHu7QErkRve6QDyOi0eTGN1euSKR%2FWYMKq1Zs4pJAX%2BYH81hyuwjHaCdG%2BkznazgoDGi2wH%2FbVRqV03%2BioCEbUiUGvdVkGx2XBX6Csaj4Z%2FTNme0rCZfnFc%2FIIsFVSuWMxf5PuWlnijQOzPRwgibGwPsLT%2FlVowwMw3PEghRUQjAfGK5hHmcUycpyxjw3GrZCQr%2BPuHdyiQEqBmWOqWgOKY4YzYU%2FNAkNV0UK2uhdEzbyDLsZ6%2F0ChNtsqeUxS4ULSKX2nl%2BGzKzQH2tVi725a1g7Ah05ih2%2FH9LiKRnJu8Yk%2FeEhA15otUr0bWwGL4H6l652mApiWhJf2DRrYPcTRxJR9DLF636Xj57Z1tgNDoqXHiXAOPvEr9Pg3GHFhjz0yX5lFBA4y6kN31RPFtM6SjiZe1n11e0q4QCcPoDkjhqAYMW9EAGawmepRWdWC%2BtnKYf7%2B%2BYyny6NgMNqHhM8GOqUBuTDeLKm6rvDJvQKhBxRuauPtqsSRqkum4sMSURvpzGMGZK8vVqaCjPazEJNs02Az%2FeJe%2BfstnxUgnpN4EKIELz6zhbclk0mnNPHMeB2eQP2msJbEe%2BSJWdvAdU4JSBT6wgN7VphsbyAmzxvJ%2FUbEVJWC2jil1%2BvbIzoHWy3CmmNNfmesJnnSC8Y6hIXM%2FJ3%2FSBtqT4Cw0U51I35S4RJ8zPp5E%2BXo&X-Amz-Signature=77fb70bd6662268fd035377f31568dcc0dfe1890e4a8efcc822392b3fa6a2fc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FSXNMKI%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T161200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD4HSE2zC%2FRpszFDXiM5SvgJ7x%2BsIOO88UQ%2FfCYjI8vhgIgPMgiv5ewTDHC7pgJLtWt46AfJuVEiq3MTC%2Fk8YnGPtMqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNpVXHiYvPOhWMS64CrcA7UVHFhl2VZkbl5DyUkw73cZd2zKR09lNT3VQ58GBJj5v%2FG6baSA6tR4VWwSBv0N3kz2AAXa1Y7rR30qwV%2BB23e3glbECrGuudFu%2BCt4nZ754r%2BrMNYyqd%2Frc3tiTAZpJP6d99CLGW9AT3kJMQ%2BxMxfAKBnGd6dfDfPtYZ8vePGLhBbASdkdW%2BgAsokiK9pYYtDVpY1qDQtiSKj1qvrsA9z95%2F7zddOsYc8R50I3YWJky3lB8%2FQoRYpR9UiSW1t5AIwa5%2B3EbuGBXP%2FDazgmw9bU1xnsYgsbCBxe3ihvX5Zq2E%2Be3oXre0AhU7ExcL3UzvfUDP%2B6i4pLya0VbKRTmmrscKXelGAlB9pf7u1xo9mnth33PqlMCq2anT3hh11pB5SRYr8V%2F3aJh%2Frn6jGXWOQc08bEXn2Ipw7Vm3eWmVBjxT8W%2BKIo90f4HBI5Rn1GgPqaYDv7nxYv3W8GJpLYBaIgw2ngivX24z3iTI8bgR%2FDpE%2BJEmLNTxO2n%2FkQsiiMUmecUqzhNy%2BTKmv3ySOZcfqHdm3FsDoW3SlHuLshijoHLUD7jSc6HHGe3iydgPZqvZjGV53dmUt1Ge6XNjb7dhlpxutdQQLxC2Fl3CTugcwKaCPO2vrlTFI%2Ba0RQMKaHhM8GOqUBC65qzBzUzb7Gss4zLaTgziVZGTX64r%2FfhPLwZ5Y3UfcmOOuBQulMawscPUugg%2Bqt2hfZz70Dn8oLZ%2FsaBr%2B1p2zn7CNpQSg3ZqdNQ8HAcI8hghZD4puDLqPYRsdzBQsvrvo17XXDE0z6WW4uS1dX%2BwmHUoOpFoM4Qx37bdz%2B0WsxTgOjIJhBa%2BxEi%2Fp%2BD37JU22Ha%2Fl%2FFjbt3XNBC0bIrQmp6ZBq&X-Amz-Signature=a4cad432365bd0b529327a7ed4893d9892d70b87aade8ead709028b4cbec4c0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666L5O6MGV%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T161201Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHo3Mngjt8ccy6dDRsSpcBQE7Mr%2FhA3ePKPVuNy%2BJdQ9AiEAmGEfYcjuMsGjJJWYwduHA89X3siGOHZbtqEJ9bGSDXMqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNHkCQ7z7XD8AiaAgircA56deFyEnRqwWZyC6k7UpWIQmOdUIx2cuHpnjSNpUq578OD8U0lcZqS1dhQukqV02werLZzH8%2BF795VrkGO5tWS9xhdq4MY4UtM4yZhFUizNy6B2nOIXdAgE%2B6%2BfDKk%2B1JzNiWOLwyuMfew8JqAcyz1iI90MTEYQlFks86W8e1o4d%2FBZxaLcCNb0sRoRxaGSr1jcXkZDiDx17C0ZhUaoTEtXhTwoNdyQxUkV6bzTYHEKf6B5M21VRoKp%2FjCg07EA29UJ%2FxfYTJTQDQJMAsg1%2FudEGTyNzNdCdq0xZr9Gq6vLu13Zf0DAckiBK5DmRE%2FCBn1vHLf63e8VHQ0jD9BIkOETuTOnDYb6vyXJvTM90Y7Mqzssjdslg8GP%2F%2B6Fjj%2FL1M6QCc4nSVmIoDWuSoKNCbjKQ1rhuHayCRzDU6nKB%2F5PkA5VpSVHD4SgfTspGODp6V%2BMRxE2FPzGSCdBOHlvDLzIf%2FOHE2ejF8L%2BUJZG6HXYSyFs466z%2FgyiGo8%2Fspngy%2B2x8U2VrLsQsOFf83eqSoapyT77H9TMYR98ukXexwEhwkMQkXUSc4tb3mudIHRtDUnOuWzDRnAT93dBk4Tlia3dJ8%2F7DuPpu78T16gsOLxGOsBLylSK4pJzDAJUML%2BIhM8GOqUB5AfNU1eEQTMTfarBsCrlCM%2B5M%2F5rmzHTcZsiNMjRY0Ghm5nWrTa69tEx45aa1F%2F%2FIVQOdUdo5HQ%2BtUMhekEmvDPGU9I3UCSw8n0%2BE1js7xuBVDWd01CACr6IY85PQTHBLUvr%2FPom1vRTO9rxZHZEHBsU8eEHG6H1A6g1tNJkQaebQ0K5u9wh5bN9UFzJk%2Fie5fbYgLoPvAP%2Bwc0dzC%2BNzk5ceGwz&X-Amz-Signature=9975dbe8c07c4d9e7bed562443c46cf19907fbdb53a681bc4b50955b5f7bf6c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXY5QXNL%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T161202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC5b%2BifCQRmYu0i3qY1qg2sRtzDANejC0jMSx8Y74ZNLAiEAwr%2FJ2Fcp%2FnhtNSYp3QMMqbKd0dhHDjm3Xak9qwwRt5IqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLYaqruYe5KCEXC8xSrcA285Nfm1zRo24nwm6V1mJHH82edSbtCQ%2FpY%2F7%2BqK1KhmrdRirEeYNvf55%2B2D2MTtLoRJXTRgg0zBdMo7LCQnL98bOTuoVWCoZ8QVwcwZ%2BbFmIz94rou8Si1p%2FYzvBN3yaUNREyT1DAnoM3Fsh25npT%2BSzQp5Zp983a%2ByozFgsNfocnFzysNeD0H3rUU0DzegN9rM3foBhk4HucfKg8BFRDebdzAy0YPMTp7Gw%2BrcviU7CNZVRJTwwAhi2SgVXA8vYEXI%2BjsPcYQJ1i6sVm6aiDlvBrza90h6jOwPasZUVxiQte0ATk5XhjDK72%2F5seC80NVEe38cV6VHE2Dk9fg4PC0xTi6Zr5WojUN6mOs5pSXF2jQIdZhPIEybSqZZ30mrz%2BaO3lKOVLqTbWpJU7dvzJQNBEjTpN1Lpd90xlGLiQjLdjkQ2wm7zyDZaHvBNiQQgXfWUjP51%2FOwAIQMLVWKqOycDneAdPQKP1eimz09wN5NQlmOMSGXYFUag%2FrAzZ4J4b1NvFCRh4McEzd78xZ3SB%2B%2Ba26DhHqr9T0Ou467DKadf0Tnm6aZJ7fuMmlQ5xLGG8e2LwYsCCNQinWarvtSrOUAYOmIHT%2Bp3Fz69NjNAHGdkXUDFzD4p4k7HSKfMNaHhM8GOqUBFY3H7%2BJSYajVAnm6P6qfxLitENHwaP9Ueg7Fu2STSXICa0zZ7SYP6fV%2FyW5NOSEjndqeE2yqAnJR1HCH74GkuGyD0QRce9lAoQ5ifgDjF6UjyCounwyVZGXbWKa1cYINh0UOYtszglgIk2uzMvo2voM5hxJL5zqweGLz0j5Ssgft%2Bp%2F6mlLNWjw6YKTGJILpsDgxlRpO798WjgKFB8p%2BvbM7JTuh&X-Amz-Signature=b81adac8be27118776440e0efbde112835b12bb8d7b14c6ae9b439b4c42925e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXY5QXNL%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T161202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC5b%2BifCQRmYu0i3qY1qg2sRtzDANejC0jMSx8Y74ZNLAiEAwr%2FJ2Fcp%2FnhtNSYp3QMMqbKd0dhHDjm3Xak9qwwRt5IqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLYaqruYe5KCEXC8xSrcA285Nfm1zRo24nwm6V1mJHH82edSbtCQ%2FpY%2F7%2BqK1KhmrdRirEeYNvf55%2B2D2MTtLoRJXTRgg0zBdMo7LCQnL98bOTuoVWCoZ8QVwcwZ%2BbFmIz94rou8Si1p%2FYzvBN3yaUNREyT1DAnoM3Fsh25npT%2BSzQp5Zp983a%2ByozFgsNfocnFzysNeD0H3rUU0DzegN9rM3foBhk4HucfKg8BFRDebdzAy0YPMTp7Gw%2BrcviU7CNZVRJTwwAhi2SgVXA8vYEXI%2BjsPcYQJ1i6sVm6aiDlvBrza90h6jOwPasZUVxiQte0ATk5XhjDK72%2F5seC80NVEe38cV6VHE2Dk9fg4PC0xTi6Zr5WojUN6mOs5pSXF2jQIdZhPIEybSqZZ30mrz%2BaO3lKOVLqTbWpJU7dvzJQNBEjTpN1Lpd90xlGLiQjLdjkQ2wm7zyDZaHvBNiQQgXfWUjP51%2FOwAIQMLVWKqOycDneAdPQKP1eimz09wN5NQlmOMSGXYFUag%2FrAzZ4J4b1NvFCRh4McEzd78xZ3SB%2B%2Ba26DhHqr9T0Ou467DKadf0Tnm6aZJ7fuMmlQ5xLGG8e2LwYsCCNQinWarvtSrOUAYOmIHT%2Bp3Fz69NjNAHGdkXUDFzD4p4k7HSKfMNaHhM8GOqUBFY3H7%2BJSYajVAnm6P6qfxLitENHwaP9Ueg7Fu2STSXICa0zZ7SYP6fV%2FyW5NOSEjndqeE2yqAnJR1HCH74GkuGyD0QRce9lAoQ5ifgDjF6UjyCounwyVZGXbWKa1cYINh0UOYtszglgIk2uzMvo2voM5hxJL5zqweGLz0j5Ssgft%2Bp%2F6mlLNWjw6YKTGJILpsDgxlRpO798WjgKFB8p%2BvbM7JTuh&X-Amz-Signature=afcddae3e0839778b7afe4a636b5cac6bdf6696e08bddb66f29744202a41ec97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AMVSXNQ%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T161157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBBIVodYKYBE30uSx%2FvaR7FAYvGotoGWNbcYhMkIBUG8AiEA8A4eRbfMUGiwfjgMCqQtl4S57U%2BwEKmRB1KzZEWSj1AqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNRMy%2BlJ2s%2FY6Kx3ISrcAxak0yn4dzt0YdlrvPW63OPVprV%2BSsy1QNaVugNkhdbO8SUKRmNEuKiIvpQ6AUFjjErIJjHqXfFamcXsDna%2BnNlAlwClyn5F34UAmBKNvLJCDYoUkMNCEgdksLP17WTI0idwQ1exyCylFHZzG7ybA7F%2Baud6jSwjvdYJnL12IjekLzcHQHAKY2gTRl1dfnl3rDwplFkjncn4B0BfNBYZXU3T%2F6xQjcaqU84McqZb6O6rdQoz0m%2FkvGMZ26gQP8IzrdBtmUfoUlYS54eWFE%2Flhn4BsMSCw%2FUnGV88KXq01UM1t203TEKDsRYDHrgt3iGIeX9rkSR0LnF7%2BoTzMiUZDE4sEJdkKwLC00uo6o55qdo0xPsPJ7QWOD%2BBu1ljCEjQknqGq1Bz2Vu5bMQlmmg6qyZb4A4OVGXa7%2FpjOmxUhhH0WgFNTa%2F62Nj8wP9OdMFXu2UjX5YivDIkBMl9WTIPmaIwriLNe0QC1Vy5dz0vkgQTRDJU%2FJjZea%2Fb7L66FspPG9RQ4xmYgHjItdo8YX2CykY3ZKbfV1%2FP%2Bg3Un5%2BbrvrhrBI9i2WzDQH3y5f%2FR5eByIXTSWY4z%2B9TrfmrMYxz%2BIhe09JF0IbGzUsoxMDK8DEoUzB7RG5gqS9nGjv7MNOIhM8GOqUBFoAXkQ99mC77sT%2BOt0eXsSyA4Vx5UvpNy%2BhtFC%2BtZRyXiFjliUkK8NI%2BaEMdZyvI15%2BGDR6RDCLrG5h6tnRcECfeKZh0tAwnnBUa4JmRG72rxQGDI3Khw2b6c%2FcXi0NZMdQ6kwqwvVx4FEH%2Fpc%2F55eAmFYxXZzlX4OVLU9hpndy0qyQsEi0a2LdgmlDi9VURRkN04frzV1BA9TQcIipv8ulVwrdK&X-Amz-Signature=c6c28b51c05e1dbb79f02349c2a286d818445634cad5b931abca466adc7c5866&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673BXVRMO%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T161203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICIQ2GQYS9dcVRkp%2FoD24Auktgl%2FwVtXR80yqfyHbOoCAiEAp%2FCDPgkpq9V%2Fkq4%2BThT3zxKhMDpNXR6zwssPguhfooMqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFvJ2CVWVXwu7CuMbSrcA%2B8yBRfbQ5p%2FCmg4BIueZuiNlyqe5H6Pe5hA%2B2XbXBmlF22IiULHf75JZdHRhWd4abl0wiYOXTBo1Nz49NzmEeLdcxK2bNJoLRuJjcdybaXN7wWn25QD7WVb2iviiyy5Ff%2BX4%2FSaJIcmHrR%2BR3hFxPIMzORCoZPW1tLhzJITRct91IA%2BHaTke%2FgtWCjMDknekT7%2Bjy8a%2FWMxRRSq18YsC2SHHdBRcOb%2FC5FDotlOXYgQ53xdsZRIfP5dRJH%2FKDTVcRO%2FixTIo0KgeDdEMXtgGIO%2BwPllspudhG4IY33KHPd5G2qtv3tpWy6UO4ZtxAenFfyPcNoE%2Bbxpa1tXVtZVXV2mdTCQWBFvDsIuFi8qm3pEz2A1XxPN%2F5lgP%2BpkdwFoa9d9iEWpDH1t6UrhBt9GHHAdFdR6TOgQ1739NbaLqXzi8OSJQtW51%2B17N2AsnoEKNVCmemphU3%2B3EUa%2BNG9i29nI9pJHkWID4hKrTP93PaSH%2BbMBWHirUkHrvSlDY4Tq8EXsT7WOyMADNBCv7LMJv64qM4Vqh23FCZseHUqrGwhwPIpsQd%2F8mcL59fwenVsVH0vo82d0r3%2B6ycl34JHPLTGCKEkDoW60qT5fiodfkS7xo3OXPw9%2F8vhggqA1MO%2BJhM8GOqUBxU7qOyT8TQ7KiYvl1YgnOItOcc9xZ0UY75pXK1BZlcUkSxGg%2BzUIllxR0opDW6SQN2g%2F35NeRgXzl0onVw%2FLcKCR4mggu8XYIVlcMjn9jaChD3SivB8yG9HVRJpNnkAbWjmWpx%2B%2FjL7jbwYljqNFxcTt2dwxeBfIYQl%2BQe9GxYyRAz2R71TzxOgtt6QDUulrm9a8jDPRUQVZrR0co5ToBNMozPBy&X-Amz-Signature=2126eaa372164a6ca700140bafac11189555968edbfa50a12a2c6751ecf5c204&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673BXVRMO%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T161203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICIQ2GQYS9dcVRkp%2FoD24Auktgl%2FwVtXR80yqfyHbOoCAiEAp%2FCDPgkpq9V%2Fkq4%2BThT3zxKhMDpNXR6zwssPguhfooMqiAQIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFvJ2CVWVXwu7CuMbSrcA%2B8yBRfbQ5p%2FCmg4BIueZuiNlyqe5H6Pe5hA%2B2XbXBmlF22IiULHf75JZdHRhWd4abl0wiYOXTBo1Nz49NzmEeLdcxK2bNJoLRuJjcdybaXN7wWn25QD7WVb2iviiyy5Ff%2BX4%2FSaJIcmHrR%2BR3hFxPIMzORCoZPW1tLhzJITRct91IA%2BHaTke%2FgtWCjMDknekT7%2Bjy8a%2FWMxRRSq18YsC2SHHdBRcOb%2FC5FDotlOXYgQ53xdsZRIfP5dRJH%2FKDTVcRO%2FixTIo0KgeDdEMXtgGIO%2BwPllspudhG4IY33KHPd5G2qtv3tpWy6UO4ZtxAenFfyPcNoE%2Bbxpa1tXVtZVXV2mdTCQWBFvDsIuFi8qm3pEz2A1XxPN%2F5lgP%2BpkdwFoa9d9iEWpDH1t6UrhBt9GHHAdFdR6TOgQ1739NbaLqXzi8OSJQtW51%2B17N2AsnoEKNVCmemphU3%2B3EUa%2BNG9i29nI9pJHkWID4hKrTP93PaSH%2BbMBWHirUkHrvSlDY4Tq8EXsT7WOyMADNBCv7LMJv64qM4Vqh23FCZseHUqrGwhwPIpsQd%2F8mcL59fwenVsVH0vo82d0r3%2B6ycl34JHPLTGCKEkDoW60qT5fiodfkS7xo3OXPw9%2F8vhggqA1MO%2BJhM8GOqUBxU7qOyT8TQ7KiYvl1YgnOItOcc9xZ0UY75pXK1BZlcUkSxGg%2BzUIllxR0opDW6SQN2g%2F35NeRgXzl0onVw%2FLcKCR4mggu8XYIVlcMjn9jaChD3SivB8yG9HVRJpNnkAbWjmWpx%2B%2FjL7jbwYljqNFxcTt2dwxeBfIYQl%2BQe9GxYyRAz2R71TzxOgtt6QDUulrm9a8jDPRUQVZrR0co5ToBNMozPBy&X-Amz-Signature=2126eaa372164a6ca700140bafac11189555968edbfa50a12a2c6751ecf5c204&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FGVVMLS%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T161203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNQ7dPhMvAyV%2FLZrljGiBnSMP1ktgrTSZXQWuCdzeGJAIhAP2q1e3GPjMaCkTJcTdxp%2B%2BB59j%2BCoi6WzBVRT4E7b1fKogECMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxhKBfk8ME4AzTOL%2Bkq3APAvZHExNNN8PI8k37j3UoA4m5%2Fsu56uI6cMBBvmj1n7FBB5%2Fh4Su8zEX0fGRMaXQyrZA2t%2FLlaSWvFeglFawwWqPF9DHVuYdr8MhjieGwSia64FgvC5pMLrjAj7kUPbU%2BjTAvNw29JVW623DnJ%2Fuj7kvPwvbNuS84K2we0PlmyFhMrUm8wFCikes4ObapvIbl4NmsL%2B%2FfVdtE%2BNe8grZL3EjkYBD%2FhX9B%2FK2OQ3b1%2BalC%2FCUh9mLFOhGNzOY64SKFLezPSEQFP1OB0eH%2FXQr6cYwsjDPNmP5bogLVIDfuQelRaADS1b49tCAOEhVO83UKZ1mH3cuLy%2BZBip1bjJkjHP8PEDqFLpjKhgNSciOgck%2Bo6mZaB7f85SuHYfHZub4oKjbUbMpQoSt%2BRcm5oMUaxmm2gH3fQz2n2hf0NfGGN%2BIR%2BoBu20V6MdMg%2Bo4mp5SbcTdwtMFPReVa0SGorjfKzTjshmcDO4VM%2FO%2FVcsFh27rXEbQ99YUosdIreCTi3PdqEkeiuf3KlXvXmks41m%2Bz07sE91rqnYCHx9R9vY7J3JngA0Vxf0u0CKWtZGWEF0jxE8r0KNxnaK4iULgFRkDGy8H%2FKf96F6yJNDNgJCbJN51f7ADRYVcC86J4GMjD%2Fh4TPBjqkAe9g9I8j7bvPew89lrVHwUx9JcM7n5P5rxm0jGdxYL9FwKEg1wz7c8s2PPP0EzFgJgVC9tnGmpMvEiWHfX34xVQyxKkoiDL562pcf6dsZupRoNKC%2FFb98C06E1CIgSQV%2FjWMN6Jnilrfw6unzJ7ABah9OAEeFK7s2myJfYVWHX6YqziSWeEHgrB2Tj3xF%2FtJj%2FA2uEbkfClRZZnk88WyKnlyas9N&X-Amz-Signature=67ba13ee091d2faa77005f019d8bd28a46772658dc3727f91eafc240ebee8324&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

