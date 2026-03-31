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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMMMYJRD%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T155512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQDXOlImryMZAru6hocfDslmdl7OaWm7OkuLXpnq8RE5JwIhAL3m6e6Xmj3Ydw4I8pCNP0gz%2FPL5cWD5s7wxz%2B2TPgj3Kv8DCEAQABoMNjM3NDIzMTgzODA1IgzpS1EJoF2SGf5gpXIq3AOlCfEY%2FeCamjz2N7b%2FJur10%2BAQB78bSaHyGZy01%2F73WXDoz1enTBXEFUmmpzaMkknCWCiqi46%2FgJPkITEPXvbybWCgGByylQCv%2B6xZf1nuFfGvdp2SQCQs9HiaE7Wg8ezZ%2FP6igdk23K2tV7uD4gzhml2Xwyio8PJTU4c0M9Od9%2B8kkOTFo6sJdZO2FXFt736mW3c%2FcD8OHpXs3gh%2F302waJ%2FxKHa73cJLx5KQ0hJjbZ7rckdrIh6fv%2FmvjK8GC1dI25pWu4er%2BW%2FVL6hcy7BCiLgCbiYZByrsVAV9r%2BrT%2BF4xiOsfKRJDyxHW1IDJqECkannc3rMeVhiaQD91Xv9dAKp2Le93MhDomzfNPgQM8u%2BpQQmW7Bh6ag6bbeAK1bEvc90joifY1nlkBcuBnDVhVeKgx0TKHKmCVP9%2FpgkbSMhvXcSIxfkxOfh%2FdfXWUxRbjEFAInGM5T91JFLZXEBwoifXeqtncuDMs6lYTFa7Du3xFg337W5ZmeZcbcW6mcVJCSOdDVY1VO9p6H96jSUTKtnVx3JP%2BjX05vsr9QIKlTttRmS%2BVlgDnuMA5QxR0asJJFXlybdBJWqA%2FHp%2FDOXxNXXCYMeNg%2F4Owj%2BCHCR7HLFSYYdTwPzwMZHFdDCTu6%2FOBjqkAZlOPUxZqxIEXOe7WXfn4MUq1clOKzM9lKLufxS%2BjSu2DOPI2f45Oo%2FRWjg%2FUyNb2xVPJSTyet34l7ndk9DFQSxzpyKCxkJYkj5dRkmzxAHu9GLCygBIEOdLF%2FEQNAbDUiWPkswgMAaJGnO0YalxoJVVa1Bim7nVtEcEtZO%2BSuUzqw%2FsAkV%2FJPOcXrXYrbZrelaaO8qp0MNG8xXMEGnIG6TTTOij&X-Amz-Signature=c1134820876adc7f29021baba507a86d0a183f1d8486c2fec598b4789fa8f6ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMMMYJRD%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T155512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQDXOlImryMZAru6hocfDslmdl7OaWm7OkuLXpnq8RE5JwIhAL3m6e6Xmj3Ydw4I8pCNP0gz%2FPL5cWD5s7wxz%2B2TPgj3Kv8DCEAQABoMNjM3NDIzMTgzODA1IgzpS1EJoF2SGf5gpXIq3AOlCfEY%2FeCamjz2N7b%2FJur10%2BAQB78bSaHyGZy01%2F73WXDoz1enTBXEFUmmpzaMkknCWCiqi46%2FgJPkITEPXvbybWCgGByylQCv%2B6xZf1nuFfGvdp2SQCQs9HiaE7Wg8ezZ%2FP6igdk23K2tV7uD4gzhml2Xwyio8PJTU4c0M9Od9%2B8kkOTFo6sJdZO2FXFt736mW3c%2FcD8OHpXs3gh%2F302waJ%2FxKHa73cJLx5KQ0hJjbZ7rckdrIh6fv%2FmvjK8GC1dI25pWu4er%2BW%2FVL6hcy7BCiLgCbiYZByrsVAV9r%2BrT%2BF4xiOsfKRJDyxHW1IDJqECkannc3rMeVhiaQD91Xv9dAKp2Le93MhDomzfNPgQM8u%2BpQQmW7Bh6ag6bbeAK1bEvc90joifY1nlkBcuBnDVhVeKgx0TKHKmCVP9%2FpgkbSMhvXcSIxfkxOfh%2FdfXWUxRbjEFAInGM5T91JFLZXEBwoifXeqtncuDMs6lYTFa7Du3xFg337W5ZmeZcbcW6mcVJCSOdDVY1VO9p6H96jSUTKtnVx3JP%2BjX05vsr9QIKlTttRmS%2BVlgDnuMA5QxR0asJJFXlybdBJWqA%2FHp%2FDOXxNXXCYMeNg%2F4Owj%2BCHCR7HLFSYYdTwPzwMZHFdDCTu6%2FOBjqkAZlOPUxZqxIEXOe7WXfn4MUq1clOKzM9lKLufxS%2BjSu2DOPI2f45Oo%2FRWjg%2FUyNb2xVPJSTyet34l7ndk9DFQSxzpyKCxkJYkj5dRkmzxAHu9GLCygBIEOdLF%2FEQNAbDUiWPkswgMAaJGnO0YalxoJVVa1Bim7nVtEcEtZO%2BSuUzqw%2FsAkV%2FJPOcXrXYrbZrelaaO8qp0MNG8xXMEGnIG6TTTOij&X-Amz-Signature=c1134820876adc7f29021baba507a86d0a183f1d8486c2fec598b4789fa8f6ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYDLEHP5%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T155512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCID%2FixMMhvKSr8AlyA2vBW6Z4xTZUNepRf1E2T0ztxCnAAiEAr7swCC68KN7QCNrHqBLdDXt6eksgXB7%2F8%2FpaXmGohWMq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDIqVBAm4AavlBqMxjCrcA%2BbuxW%2FIAqGE04BtR5%2FLWAaiB3bEjbJdleHgq7lQPyNgG7iZTpeXRWN%2Bmqz82eJFLy26WhE1VIXJoMeQVSVENeZq%2BvPMXsN874GTfXyGAazU1kWTeQL%2FMhHcn2wVW9VXFBv4kaAQvaFLj5cR4YEEOkU49F6QrH190xsnTQvRmveneJQ47i6yZpqPzr9AHJSS66ClVO4X0B2156ggA9pje0Ng1M3grutNOZ6yielx%2B7AK%2FO76N0KUiAHtvNVgFpRQ%2FQ4j83KsMFBxA4GYxjLcrmyO7O%2Bt7nLLlWtNNiUkFiyTLhAeckeez%2BLvAEQF2viJ0%2Bi4zdpBdY24K6S93aua4wjMRlKI9qe72QQtvLKvLdIJHZ9ioYFp0SmYyZinF1AIBYUmnatIiXe4OOF%2FSLx%2BzGOtKyt3HdZd%2FALgo2xXKhDRV%2F4K%2FXWrO4DiGzua1eqv13%2F5fH8LUYC0T5Pb4d1g3KUC5ZS1DGHKykYkxoBZVUyqpL%2FZHsKJ2LvqcRliCDronpWSMW0G3jX9SyPMnoU0P6c%2FIKSudjAJ%2FOQxF3huZO7sHhHPcW4tH9tz%2FMUO7KO5GOTKLTxJrwioy%2BaccMrwWD4dIwBvbyWNTVsWLBjMKAgShuVC3BXZWTe9ufCiMNq6r84GOqUBNPKP4bQBhCK0kRs6mm4PMLU5dsiVQK1BKCa%2FJ7zcURv1xcZpIFr%2BGOwIVfBfl6X%2FcaXsBIQRadhOimm4iqk5SCqYna5Dq48%2BOo8OIjoLnoQVY2SHOvX6We%2Bb8o0qE1f6cTqgmM9fC60WHwH3WLRb7xAwaOdRr19CpA%2FuFaMUXVcIKw1cGso%2BaQOjEV8VqP%2BibVBmx%2BTRrv060IAUNDpbFdfRDZ3x&X-Amz-Signature=1627f3ea9af24770cb45ddea63e803f03bb3648382cb339ff0b9ade718d388aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZVM5FJ4Z%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T155514Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQC8GW0hGi4OAtgt2Bf%2Ffrz6XFlnmu5AkM7kZOJNGw%2Fc%2BAIgKJOQijAeaSpDq%2BI24rYHFp62rQyPj7XSRAcD8ePJ874q%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDA82TipkyFpDFnbk9SrcA4dulVia1CDd7g5NMf1oktmpuetSYOa0KFjT5dd2fnB25Fww3R3tcZdLjdfqLBEE%2BoOEwysu%2Fl%2FE4zLqKY1W7zVpboY4jRrOuC6h%2BBA%2FynfAUWvJ7aodqNFog76WGMXo2IBQ1E1pHLfS2sIRfdho%2B%2FECliPXBemqKp29lKmriaCR6iQl1Ke6HUk%2FbiPxMNaBxsA78xSQMJSu7IDxWxysJusugTv0fx%2FuOYS9nXQZ4%2For0vl4NW1Rd1C8kTzvHFFnLvn4EVeabjebsU%2F9DI2Y41L2Xts2YeiYhIzQ5JXptXcnUPEWPAHyKgdB7poPcXuDUnk%2BmB2EIO9XST5RLoz7CV6nE4QNqXEZ%2Bc0gZzhhboe6XObWsciBzNbq1C5WDfvVT2wch7AUGkQyf0d9GgN7YwZzeu14nfDLuAZesAFtFmWMysWXcDhCc0I5pWVaSo9weY3%2BOBZioRNfzXDFRBoXkjBepp17VyJRtIqBo6tFDbVh3LvfhjRrNv8C931cQGCrErrCZeIZyQuF3VgN5YamR4lZSnl50AWQ6HEW%2FdCeiQXMd6TR1A7QWOVDkmLqDVqXLAtZn1VPLfhSUHPAoQ3TxO%2F8TvuifIZvbKnfgsi7Nl%2B9zcKDFiMO5c7IqbVgMI66r84GOqUBd91nxqWiuH400ZAbu6i0l9Ib%2Bz7Y2rGUEkfvQK80j%2Fik%2FHhiG6xQsw0L6FyIET0pUG13APCXBNZz5QvqdsoxhnallocQDq3qW1ylduJ0wtiv%2F5qIAU8Wbq6PgPL%2B9LkOHxzfSVFz94uxrnG9fCikKNMg7121FljzF8tiIy16LK%2BH%2Br42gYeZboSYKYFQ0eZenDSIrxO5JXn23P0yybSuXPFEQn3o&X-Amz-Signature=150e01cf24ae58d2807e860263f708dbd1984a42e02295c4291f32eef25ac6fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZVM5FJ4Z%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T155514Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQC8GW0hGi4OAtgt2Bf%2Ffrz6XFlnmu5AkM7kZOJNGw%2Fc%2BAIgKJOQijAeaSpDq%2BI24rYHFp62rQyPj7XSRAcD8ePJ874q%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDA82TipkyFpDFnbk9SrcA4dulVia1CDd7g5NMf1oktmpuetSYOa0KFjT5dd2fnB25Fww3R3tcZdLjdfqLBEE%2BoOEwysu%2Fl%2FE4zLqKY1W7zVpboY4jRrOuC6h%2BBA%2FynfAUWvJ7aodqNFog76WGMXo2IBQ1E1pHLfS2sIRfdho%2B%2FECliPXBemqKp29lKmriaCR6iQl1Ke6HUk%2FbiPxMNaBxsA78xSQMJSu7IDxWxysJusugTv0fx%2FuOYS9nXQZ4%2For0vl4NW1Rd1C8kTzvHFFnLvn4EVeabjebsU%2F9DI2Y41L2Xts2YeiYhIzQ5JXptXcnUPEWPAHyKgdB7poPcXuDUnk%2BmB2EIO9XST5RLoz7CV6nE4QNqXEZ%2Bc0gZzhhboe6XObWsciBzNbq1C5WDfvVT2wch7AUGkQyf0d9GgN7YwZzeu14nfDLuAZesAFtFmWMysWXcDhCc0I5pWVaSo9weY3%2BOBZioRNfzXDFRBoXkjBepp17VyJRtIqBo6tFDbVh3LvfhjRrNv8C931cQGCrErrCZeIZyQuF3VgN5YamR4lZSnl50AWQ6HEW%2FdCeiQXMd6TR1A7QWOVDkmLqDVqXLAtZn1VPLfhSUHPAoQ3TxO%2F8TvuifIZvbKnfgsi7Nl%2B9zcKDFiMO5c7IqbVgMI66r84GOqUBd91nxqWiuH400ZAbu6i0l9Ib%2Bz7Y2rGUEkfvQK80j%2Fik%2FHhiG6xQsw0L6FyIET0pUG13APCXBNZz5QvqdsoxhnallocQDq3qW1ylduJ0wtiv%2F5qIAU8Wbq6PgPL%2B9LkOHxzfSVFz94uxrnG9fCikKNMg7121FljzF8tiIy16LK%2BH%2Br42gYeZboSYKYFQ0eZenDSIrxO5JXn23P0yybSuXPFEQn3o&X-Amz-Signature=47b3901e3431cba9da25a3d382cc6f597bde2f24e220bc8aaed5a7f4fca36a78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EUZ5UZR%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T155514Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIB7H0jFtRIMb6%2BTo%2Bnbe1MVt1rAojDZe4PE34bmyuJ%2BCAiEA07NsJyYACFYZH4o8tIvMO%2FpmJs6Hdl3tvcWGACPOY6Aq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDD%2BsjtuQLH5g6l7mPyrcA2jO%2F6a4QiBCNks%2FNY%2BSjqIV8i%2FiVZoHP8WCY4gApHcvhNwaZ3AJX2FgsNwJRZJaG32Ri%2B6CDhcjfZAa2dUpWUauHTKdsA35RAXAYxUHLm%2FAiubnAiT1d9lry2WW0DUB9maDDOYsrKpXZBbTipyAy5H5rojI6b3AuBmnjva8F%2B7Jsn%2BfbwNB5nKaBNXvWrzDRFGa0ukCR9FikTW5XVeJa2Th9TOqYolKtHRfRjanhNV1OjWtCJoRXM7lCxwdJp7RYyycSvE4xR5%2BefzUaZF1M95KgXFYMGewRx%2Fg6BC2aRAGR6hoP0Xmtl2oO1jHCrNUqEtcP7orcuMkq0MT36wMjegYE5c7u8KVMKesXnpWQ8ypPWRzk4KOFWYdGvvrSApRlugQuECRTX8w576KVL5bexXgNyaWdl857pkn6mQHVclOkX7uzRxcRDuThGg1rEsQDqncwgrWQFtEN0zm48sKk0LiYg7Heim6UhdVzdsl8f%2F4W5S90TOvpUAprebKlJibtD8c2i15exGdvoGq2jHz0IXiOVnvH4GNO1uqPBw9NgVK7tf0HcjVKH8K3pJa4sSjABkuLABgr45QHGV4HXUcdJ1L0BAfLrnSqTuGUnugICtJXPXRmsmdh%2FSr5fW9MPm6r84GOqUBiO2KC8uqeBBSpLGIBQWHE3YkXHIdsxS1ex%2FcWTWI%2FagCskLb4EgKJq8LHNwPt3xoR2pYzVDSjLgwnTWYjfA94UeVUx7bQss9CvBUpatK9BCoRDwe9p4h%2FhEV7kxHKBlgD6ALgb5jtjvrVcskOH%2FhlZN9ffmHq0un0%2FoFGOHSL8mzTDG3VskHpC2flex74kGR9XbJJtyK15wUwa3xUfiZNzrmjSPT&X-Amz-Signature=ced588f8f826d908e42955cf4c9feebd84310c776f78fecfed3c6e3f3325db7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UO6LQDPH%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T155515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIHCZwhM7nLGubK1dK2kQlDPFEvzcrcrghqZ%2BBB4S7r7SAiEAlTXcr7f7O4ct392lqRB1LAHiVYfrPNL%2Fu3lC7mCjWkYq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDKawD34CJONAMylTgCrcA%2FvjB8VGiFVDaZSuGC%2BauLHxDJVyBAtFUTpXpii2XKHY3PWGFw7pbcndaEm%2F4Ip9SolIlNcGimSuP0X%2FOHJKzsE5nEeQqCIbVo9KQQsxkflG6T%2B7qV3axJcMLp2fV7hK9H%2Fb7tHMPSOENa7kTwuIRHXzASzONhZLffn1XYxRUORjwN0QpeWksp%2Fa6hvFgJ%2FuS0QdvrLJF00hKPAU7NnWjc4twrElMrO8DZp4j7A%2BfmKwnhO2HY3KUlNi%2BxzqBmVDuW2u7O4tcI8nFJLCniHlak8LdBu0bX5sLxe%2BqtPQ%2BjPasBDZIBNfWm4%2Bo6nCyDPOqV3lTvRrFxxAx0K1nbVEHQUTWNIgkHWoL5EvhQH8a3mYFL%2BEw5qZJRG7J1MjjUuoHWqML%2FNEr57wsQYmbBoXEo2GRK8pRpX1Zo3jr%2FjWGEwuRLAP9ne5polm0sMEfcv%2FL%2F1N1GVLSzLhPNcWhjLGzyrEw%2FUljEJpzdXAHvsf7WNj6vNafdA%2BPVL7CGuCtLBrecTJ9OF%2B0nWQhVtL2%2FHdAqXA8kim7zTG9Dzs3P3490Sa0OdpLp%2Fd9exd1qYPMC0K5QRnl8KXl2WQw3GM6woSwx9upZs41OAMLlXXXCCWjXXfICecCM0HJy%2BAnF%2FnMOy6r84GOqUBGA9gt5sR1Y7Ho1ENJGycHT%2BOBYRXH7iunvtSRaDEoIzQH1s68VmOdk74%2FyTfLdbiU26nmRDg3UGI5fOj2UWuz%2BcLcB3Dmx9Slly3Yv2rULvAVwStCu%2FrhyizF6BVW121tzTXBLNM1CTa5Z82QlqDjSqsyC7l8SYJeI4uttfX3FhE%2FF6gJmusRfYURuL1l8gBMpP%2F%2FtPRbgwn7CSSETL%2BGLn2YSXa&X-Amz-Signature=c0c648dc2569db3705b58f13abdfd41ebc2c2fd5618bea74315041f8797fdf43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2O4K4XL%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T155516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCICkzYKwEPUuoqNO3gq%2BKKzqD%2B6D5nqoPgq6Wp9rrmvK%2FAiBjX1yZa%2BmnVS01tmXb%2FbTG0t2ugiJ%2FvTfrxEQ04h96oir%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIM6KRK6LAEUras0mV8KtwD4M2ksGfkw7zOM5tqRxMzkcGM%2BO%2FOmOYU5D1FyRkftrBD%2FmYNRa8foFbuB2uXquWK8h%2BpaYGWVu0nv%2BW0lnVB6dyGInhPa7uKFeRYv1Agb4FFJQSsrO9D2EH7FzOxtWlSFvCxNsFGrjyz2PVLqDx4aEBnR%2FpCVRVC4dww5AyFjZ6qLA%2B%2BgIO8tRHzSQQ2RsmNDANyHBSlnbnN%2FxunjLo0i%2B9o%2B8o6q%2FTb0Fk7fKio6JygrqaJWVkYTi71XP0yYL5IgIxgtFdtzKBffctpVyRJSgAItISQcc8NbkUfrEkKUNDASGoNTxx9k8GtAk0GpMLUFmz7xZ%2FnT1fmTBNFr6olTJR1sHTTIZoCB7VH9NlmOCYDjnQGGUgWkQkPoXfqARxtBsDD7Ikne8FW1Os4%2Bwusygr8Wzdcty8Ou9w9EkHhyGkgpc5%2BxA9vWkul625aVo3CBgxA4WqOrjQyFBWP%2Bm4TcpvdO5sgeMGpKiFtKdq9J%2BueML3GUB5mV8x6b2CzQi2PUbXLCCpW8ahPhkhjhy7WUCNCUkmQZ7JaC0byWm1UJDJ4gewQEWKUfjFKHmpNfXnx4DPB%2BZc%2FFdZICaE89SWaWNFSHvv7lUoXaIZWgr7NNstFRL5nM6aTQFJF8SowrrqvzgY6pgH1WFz9KA2kF9BsFDo3bsP9bHWdAz2r099DxQ6jV1ZCcFB702kSEj%2FPD7A%2Bi3E9vGnZBCFezuGAVd0wMmQRzFtjkidUvCjhZOp2LZ%2Bvif%2BTZhXDcl5craEp24NWXCrEqbnShzsqD%2Fm7gmvuCmaXzHMzZL%2BUbarXSAYgbGDvL%2FNfCJTxYyGhT6mcsKDbswGinRWztn5auVoGW9i5gTzkfKkGkD%2BBr46I&X-Amz-Signature=68ed726b7112f6c6ad3e2ec57273b288af61e6f74bd2b8a2ef33f08a8d2ec2db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWIVMCH7%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T155518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIHstMv%2FUs5gn23w0aHLERkMiDDG0g7cQTx%2Fy9W0ilHljAiEA%2BWkGALRM7vcFE3eDHprEvhbNoG5l%2FJ0y3B9Dak16Bckq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDN39bGkU3UqloiPYCyrcA%2Bo9I%2F%2BVd5fX2ruZccwFpu2oPwExFnqWH1IYrLSPyigEGbl5jAY%2B2Y0dCxteSfLaR%2Fq7Anf5q%2B1crlINkXouVQpFfaONpoyyd4NxXIoYfJ8I7WMH7ugSQUeC%2BH8HxQZYOKE9EayL4F0%2BvJi5Gy16GAU3VP46EBZo%2FxuSZmvdacGkpPtEPTYbV9TSCR9eM%2FewvlLbP9gJZj3zgJMa96%2BF%2FKYsmEKB1SbhaZn9SBQYHNb0VqpgPajYjlxixb0PRT4YmnByslCsh%2FIFJaZaVYT9QGrAEqjVwVZwiucnBVM7j4rP3qYsrXg0g8IMxAgSHeR6%2Bs69fnwZglqRG25HeJhQE46VwMHbXBa2dEGWBqM%2FwrqNqkCWDBW%2FP73tGDRN1OCllJS%2FjWSfNpYwwn9arv%2FRhoPX%2FvrN8sZ1dB1E572bwTroC07nlelyKvCMhqoT85kbjjzAyDV%2FX9n%2F5VMmm9glZ9hWgkYZa647HvzyrHSOMRG3Hog2WN4aOj%2FMkBNxJkOK3cs0w5k0FyENc%2FBmPGO3%2BiV8ujFbdZL7I2sIzoYBAc1%2BkU%2BXoVw%2BSQo%2BNBj%2FgE3GgzNfOXwI%2BL01TOY2HxQas9Bo7LfqJ4WsoRXH1IutJU2u5q%2B8DE6hUifgnk%2FxMPe5r84GOqUBCc%2B5zLeCkHu7B4L%2FqKV%2B0J1i%2FbAYfjPluMwTmevXIv7rnsWzwZ9%2FpjpGovjsY1xLc5kbvtFOjNH6k%2Bd7d8D7wNoZ9iUoZeyTHgGCS6BVLUDDBXeTsa1eaDcYDdjs5J2L9aEUfKMduUAxqbdDx20ht4cusLFmbCUzr4UPlQiA9eshS9F8bmRfJNSepNLCjesxhQN6IoR50GglTD3hfMmTByidqsFl&X-Amz-Signature=2423cad043de83689e27fdbb81fca722c13b68cbd8f45474d2a9016f57387881&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWIVMCH7%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T155518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIHstMv%2FUs5gn23w0aHLERkMiDDG0g7cQTx%2Fy9W0ilHljAiEA%2BWkGALRM7vcFE3eDHprEvhbNoG5l%2FJ0y3B9Dak16Bckq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDN39bGkU3UqloiPYCyrcA%2Bo9I%2F%2BVd5fX2ruZccwFpu2oPwExFnqWH1IYrLSPyigEGbl5jAY%2B2Y0dCxteSfLaR%2Fq7Anf5q%2B1crlINkXouVQpFfaONpoyyd4NxXIoYfJ8I7WMH7ugSQUeC%2BH8HxQZYOKE9EayL4F0%2BvJi5Gy16GAU3VP46EBZo%2FxuSZmvdacGkpPtEPTYbV9TSCR9eM%2FewvlLbP9gJZj3zgJMa96%2BF%2FKYsmEKB1SbhaZn9SBQYHNb0VqpgPajYjlxixb0PRT4YmnByslCsh%2FIFJaZaVYT9QGrAEqjVwVZwiucnBVM7j4rP3qYsrXg0g8IMxAgSHeR6%2Bs69fnwZglqRG25HeJhQE46VwMHbXBa2dEGWBqM%2FwrqNqkCWDBW%2FP73tGDRN1OCllJS%2FjWSfNpYwwn9arv%2FRhoPX%2FvrN8sZ1dB1E572bwTroC07nlelyKvCMhqoT85kbjjzAyDV%2FX9n%2F5VMmm9glZ9hWgkYZa647HvzyrHSOMRG3Hog2WN4aOj%2FMkBNxJkOK3cs0w5k0FyENc%2FBmPGO3%2BiV8ujFbdZL7I2sIzoYBAc1%2BkU%2BXoVw%2BSQo%2BNBj%2FgE3GgzNfOXwI%2BL01TOY2HxQas9Bo7LfqJ4WsoRXH1IutJU2u5q%2B8DE6hUifgnk%2FxMPe5r84GOqUBCc%2B5zLeCkHu7B4L%2FqKV%2B0J1i%2FbAYfjPluMwTmevXIv7rnsWzwZ9%2FpjpGovjsY1xLc5kbvtFOjNH6k%2Bd7d8D7wNoZ9iUoZeyTHgGCS6BVLUDDBXeTsa1eaDcYDdjs5J2L9aEUfKMduUAxqbdDx20ht4cusLFmbCUzr4UPlQiA9eshS9F8bmRfJNSepNLCjesxhQN6IoR50GglTD3hfMmTByidqsFl&X-Amz-Signature=5268ce37d49a52aad55fa5abd8932297b03c884d01e46c8f64e6f7cac94188b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBB3EWHP%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T155509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQC0Q1pHFqm8OPEGGd6fJr1RmfrM4ciCFFUt4ts0FDeQKQIhAIl3ZBZlofXMsr55TQDwSDPHNdxfOqIK1H2Ez%2FBohxBCKv8DCEAQABoMNjM3NDIzMTgzODA1IgxPTFuzTfq11Fi2xoQq3AOssmlSWCxl71g9Kk7OUVskqLb79ZCl3fCIYBShfVvcFaAQgRSUy82fjh6c60lT%2F%2B307c1dq8DNq%2FaL69x4cDZYSQDBJnhuU%2BLFFqf%2BZEsjcQiZrZ0pfFTmB2YPHzra7a17m2tQauRSuRGLM6VgvNV7Spf%2FhJjaC5JhsEA1Us5Z3wxHagmMSGVUQsmslZrKvKHEFvsFZIwWZSjHOkATA6lZMENtrXIHTywz2YVFMixkX5dD8B%2FTavScq%2BefPnx2%2BabnVzkmhhO7YI8uiikudY8dFXyjbCiIJ7YMEZt0dWgxFfCh7s8wMgPs9eLiEX1tSqshM6oszw07jC1VYJh4m5FXGQQrDsecSSBatAQcorzsFQxt2aS8WWH1A7%2BCFXYKCQIfwIelBvySct8pJvEpVI5uEZ0N4GYfa9XWK7Jc9kQDzzOEdRJ0nuN2hAWD5Ow6JUueix1aSCv2Z%2Bn3XaC6pNOZekhoq7cU75Kkb%2B7bO%2F2z4JlpIfSa36ThVmX0wqdu8FDY%2BN%2B0JswPVB6OHshaJVdUCmBUHZJBF6utKNcWiHiJhErvvQ3jRNfN337XVwlfRGDqKkXy6zAR5E%2FASNEbOg6w0eyy25WHsynZTxqobuSb7OUi6lnsMDlhcqzpczDZuq%2FOBjqkAWVOoNLrNW6Hmki30ZweH3UsxTCKAv8WGnxWmVQ7cl9rfIIDE2qQweTqzgbdWbGnSzd%2FHhuvMN98Ft2VVtExhJGpxrQ6hbd1wPWd1w6rYpTmp2yUmTyyvJPgP5oX55%2BV%2FQ%2BXwC6vrQ%2B%2FGJ9zjEyi%2BhhHFRgra30lcHEVsje6ETBoIJcEYAAT6lbUjTulK5vNiiwaswO2wX3vcpXD60OgIO9azvTi&X-Amz-Signature=b82bc284c3b1ffa9b5f05d77d3a4211e5dc6a0aa0ecf0df80fc216e3a9ebeab1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGWUDOZH%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T155520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIEHYbQ3MZNQAaWZLqrKmPO9J72LxyyI%2B3%2F0669eFo5hJAiAtFxo4pL2uQS0KVzGJEk7SmM%2B%2FqYZPsHURl2PKMTKTSCr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMkJrhYVhWza8yYDxEKtwDN%2BBhb73gGschq%2Fe6wgKLmcwEw2o2aO1otaesGvAmWKD49OW%2B%2BleI8oyVn0o99X5hoJ8vEqW8oVrcVEHTu9ok6FgKQhUqIABj8dXlG3404fIHnj9wgHuiy4Afg9SzZJL4Wg7xNAfixvcKDFsfJMa93FkiWOL8l0ssZx7OmnunkOb9jvtTafDnrgafiFouJ14r%2FyDDuq%2BT5MobqnioQABFOf4TLezv%2BJX3Ddl2u%2FJFrHZ%2B4sT9fxCCxLWVbWlWuY5SPXZckOOVTkrzOQog2MoLXGT4CLzRHQUfdpuK66P4YFewgXNopW8SRqjRsIIFp2af%2BXXTtqVeCN1jZFZKm9SD5J7XffLcuJdKZfm6Uph7I3f2kBOnjDE4VokbWUebIZHZbmXpnkBJrgXgeefgniFrbrdrrLvSaCw%2FaMeW3%2BbcckfWAxyWVXS5QPCGD%2BH3Vb%2BGZueJBo7yDgcmSM%2FuHRHqt1X1fJJv2CfnjrzFzCvDIQ7y%2FeHEPDYgrjcVmQrYWARCVRSovc3xFMQQE94hiO61N62XGqEfheYHK2Vjg5gjuFfDBYah2lGRemDr%2FY8avyZnQ%2BO1JUR%2Fmole7iUD85HqLKC0OWDbANgmbQDWiTnAuEiOGXW2OslcQYSihVQwl7qvzgY6pgFjKPcOldI8LdzIKsbL3DBgEnGtr35vZyq%2BYYH1Twd4IAt43BzF%2Fd%2B70t30f3JDprx1Nj8iWVsM1YFakSpKihJnEuWHTp7EfhQIc7QnNiOPuYJ2%2FwdRlXGSSBeHAsVlSGrp%2B5WbXMyled27UoX7jGHHWiYxm4aKi%2BaYlRHM%2BvjFPERJWAURFPQ3CggZMANSHkT5uEb%2B62xJqlWmPfFBLbM261IWG31V&X-Amz-Signature=588c2e40204e7d17ade2cfec842aa6ef1796b2976e44a33e19c10db7d231ed0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGWUDOZH%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T155520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIEHYbQ3MZNQAaWZLqrKmPO9J72LxyyI%2B3%2F0669eFo5hJAiAtFxo4pL2uQS0KVzGJEk7SmM%2B%2FqYZPsHURl2PKMTKTSCr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMkJrhYVhWza8yYDxEKtwDN%2BBhb73gGschq%2Fe6wgKLmcwEw2o2aO1otaesGvAmWKD49OW%2B%2BleI8oyVn0o99X5hoJ8vEqW8oVrcVEHTu9ok6FgKQhUqIABj8dXlG3404fIHnj9wgHuiy4Afg9SzZJL4Wg7xNAfixvcKDFsfJMa93FkiWOL8l0ssZx7OmnunkOb9jvtTafDnrgafiFouJ14r%2FyDDuq%2BT5MobqnioQABFOf4TLezv%2BJX3Ddl2u%2FJFrHZ%2B4sT9fxCCxLWVbWlWuY5SPXZckOOVTkrzOQog2MoLXGT4CLzRHQUfdpuK66P4YFewgXNopW8SRqjRsIIFp2af%2BXXTtqVeCN1jZFZKm9SD5J7XffLcuJdKZfm6Uph7I3f2kBOnjDE4VokbWUebIZHZbmXpnkBJrgXgeefgniFrbrdrrLvSaCw%2FaMeW3%2BbcckfWAxyWVXS5QPCGD%2BH3Vb%2BGZueJBo7yDgcmSM%2FuHRHqt1X1fJJv2CfnjrzFzCvDIQ7y%2FeHEPDYgrjcVmQrYWARCVRSovc3xFMQQE94hiO61N62XGqEfheYHK2Vjg5gjuFfDBYah2lGRemDr%2FY8avyZnQ%2BO1JUR%2Fmole7iUD85HqLKC0OWDbANgmbQDWiTnAuEiOGXW2OslcQYSihVQwl7qvzgY6pgFjKPcOldI8LdzIKsbL3DBgEnGtr35vZyq%2BYYH1Twd4IAt43BzF%2Fd%2B70t30f3JDprx1Nj8iWVsM1YFakSpKihJnEuWHTp7EfhQIc7QnNiOPuYJ2%2FwdRlXGSSBeHAsVlSGrp%2B5WbXMyled27UoX7jGHHWiYxm4aKi%2BaYlRHM%2BvjFPERJWAURFPQ3CggZMANSHkT5uEb%2B62xJqlWmPfFBLbM261IWG31V&X-Amz-Signature=588c2e40204e7d17ade2cfec842aa6ef1796b2976e44a33e19c10db7d231ed0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSNNJWEG%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T155521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQDHjyBVDRgcb0boV36P7nCG%2BUnmn6KyncXBKwZj%2F4mulwIhAPNCBIYHP4YX65wW%2F7Meb5LUCSsVYokeFO0tGUABnorjKv8DCEAQABoMNjM3NDIzMTgzODA1IgwT5IMgkqGp5uOBCFYq3AN%2Fx7gSgvp11SwLaDhcTZY%2FSvbwGnHnmfysL79bDZt083SeOhArorGCzyO7prSzh7C8xGcR%2FdWaLsLemCaeJ1xPTwpnlX2SzTq8vv%2F6sUrPNh3I9jgc6q%2FsnLTvS%2BcBDRNWz7Fh82cNN4XMnzqNXA294YiFrMOinlJfzjMq7IhJ%2Bw%2Fpc2aCTTq9BhLRbNgyys2OPVpbJl3At3rW270evEXeW8%2BhnKKz2o%2Bu6DTYzXtO4D9kbh8Q9QkeZ%2BeI5xmNUUXpWeZTGCyMFtOz0N%2FetnTrpBKwSVB%2B9jQOgJmxZa8kQtZdCTH1mUact3l5v7nbvmz4WUNLiwo2xLobDFOHOGUSjUa1p7u3lmJxIUrXhXpQWFtftA0rzc%2Fu%2FDVm%2BNOI91rahIa%2FnvG%2BDO%2BF8FcHH%2FuSWKddvM0AfvGQNpmAm42Tdxg%2BPmZFms2ggZnd8vEdJV5eQdRXj6mWiAQPrurE9AjjFriyXKifJbXci1D7XAiRl2alJTmsZwG2DNUjM0F%2Fn9c%2B5rPIWsBoLdogGdVlpk79kDjzbSDg4koG0TJFYmJR%2BTcQZOlKmyhKxF5LFKFe8uSxMKM6d6BropcJKUUkJvY7BLm1QMOJAGaBMJVP936cQW3gfAGOE6wo337RQjCduq%2FOBjqkAY2Usf8bonnfa885eFPNhGd8MS3Q8AtMOVeu10TwaIIfLVNEMVm47J6y%2FdWQCIbWIZ%2FiUhJJpYHBNZLIUuVxvDMMovAIkTL3wr1TvXEsJIrYxzk9Aa9VdpPpRf9JjtX0BSbIPQKHetf0%2BWXgxZHNe4G2X4Om1%2BYOZ4w4O%2B%2FLPv0Ybxg0LuyrRxmsWH5uq9CSJBczvVDo%2F4iqapxHSeSrBLOCNcKa&X-Amz-Signature=963389377ada35544cdc969593c056c2890418deec5e5c8860e6dacae327dd4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

