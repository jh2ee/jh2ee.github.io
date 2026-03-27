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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCD6CEND%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T010400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJGMEQCICuf4OVQtimJJfSL0rMYiFes3Nv7TQVS41pINSBImhLuAiAqwjUfMZXB3EHCI4xqz7W%2BVO0PDHlqvWpblnwUBeP0iCqIBAjS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM74%2BZQRqWjUxQ5Na5KtwD7%2Fmp4V599WE4UyD%2Fgu0O99IZs9%2FDm0effyNA71PEFFFw6wY%2BnPYt6tEn1j33dj%2F81ik9geW59MF8N%2Be%2FAuLqFhcS02i1d%2FInFaaMpJKbeaf8tQAPsT6UXfOCqlGoD0fBq%2BQfE7I09lQF0fmMYW49mALSWdifu4Bupodf4kWOyTr5ydg0sjA3A%2BAgzPuOD0f%2BKETVsVruwTeC9W0nqR6DD941eWH4E9Mifvg0KgO3kH8qy%2B8fbVxmWxAGBJVllQfvdamjD%2BUJ4w5YUh8rVG4XTWuHaUIBOfoEPNI6NvHs8brcY45FxTGbi0RGhGvZNLHTaIwsuo7yyvsbW511bUt%2Fy33WXJdQYrybKfmEA9dBaEkMUOYP9uyTmy7B5qqFsyrOhMbNlCgzTrVM%2B0YKVwVgq4ur1K9kauufWPExWXCRjAR98J6Z%2F2kEqmYSaBS1arfCZiHLneTB9Ia7lO1rodEO6%2BLgAsFE4fIa15gXkcvl8FChK71I6LoTOqry%2FbIXybXxLN8mO6yoEKXuM8HlLWKgin5jSjbMeXyY6stRdA5uxkg98Jz3TS8ZgXvZu8De2kMigIxddIpw9KTVTGVVHzzuV7DaWFIME%2BcQ8opY5KOpWygL7Sa8zJBI%2FF1ZHHYwzJ6XzgY6pgGlaN7JWB%2FZER5K%2Fc0b5y%2BFGIWU2K5FK%2F0EO9rHbFOufM3ynydAyaTUPAHRV8wUSbBidxhocCQF8qKFohX3GIEd1rzT%2BublfaC0YKWT%2B%2Fq0QhvSQUySJ7qp3XlneR0FRxk1lSXeOS3EDz7STZ7xBBIWZcXWj55gz8xCIZS1CkyDSbuyTL%2B%2FODM3FzQn63VPMEsJfRf%2B%2FkTG758ct%2B6YsuPxoUHwrXmy&X-Amz-Signature=b0297f3b3956e08d2e62d0d3959a0851c06a52671b7932625ae93c53f9159883&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCD6CEND%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T010400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJGMEQCICuf4OVQtimJJfSL0rMYiFes3Nv7TQVS41pINSBImhLuAiAqwjUfMZXB3EHCI4xqz7W%2BVO0PDHlqvWpblnwUBeP0iCqIBAjS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM74%2BZQRqWjUxQ5Na5KtwD7%2Fmp4V599WE4UyD%2Fgu0O99IZs9%2FDm0effyNA71PEFFFw6wY%2BnPYt6tEn1j33dj%2F81ik9geW59MF8N%2Be%2FAuLqFhcS02i1d%2FInFaaMpJKbeaf8tQAPsT6UXfOCqlGoD0fBq%2BQfE7I09lQF0fmMYW49mALSWdifu4Bupodf4kWOyTr5ydg0sjA3A%2BAgzPuOD0f%2BKETVsVruwTeC9W0nqR6DD941eWH4E9Mifvg0KgO3kH8qy%2B8fbVxmWxAGBJVllQfvdamjD%2BUJ4w5YUh8rVG4XTWuHaUIBOfoEPNI6NvHs8brcY45FxTGbi0RGhGvZNLHTaIwsuo7yyvsbW511bUt%2Fy33WXJdQYrybKfmEA9dBaEkMUOYP9uyTmy7B5qqFsyrOhMbNlCgzTrVM%2B0YKVwVgq4ur1K9kauufWPExWXCRjAR98J6Z%2F2kEqmYSaBS1arfCZiHLneTB9Ia7lO1rodEO6%2BLgAsFE4fIa15gXkcvl8FChK71I6LoTOqry%2FbIXybXxLN8mO6yoEKXuM8HlLWKgin5jSjbMeXyY6stRdA5uxkg98Jz3TS8ZgXvZu8De2kMigIxddIpw9KTVTGVVHzzuV7DaWFIME%2BcQ8opY5KOpWygL7Sa8zJBI%2FF1ZHHYwzJ6XzgY6pgGlaN7JWB%2FZER5K%2Fc0b5y%2BFGIWU2K5FK%2F0EO9rHbFOufM3ynydAyaTUPAHRV8wUSbBidxhocCQF8qKFohX3GIEd1rzT%2BublfaC0YKWT%2B%2Fq0QhvSQUySJ7qp3XlneR0FRxk1lSXeOS3EDz7STZ7xBBIWZcXWj55gz8xCIZS1CkyDSbuyTL%2B%2FODM3FzQn63VPMEsJfRf%2B%2FkTG758ct%2B6YsuPxoUHwrXmy&X-Amz-Signature=b0297f3b3956e08d2e62d0d3959a0851c06a52671b7932625ae93c53f9159883&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CIEJ3RK%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T010400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJGMEQCIBy6v8QoT775ASbP8qlIfli%2Bwsu9knyn84Y4ZkF%2FVBgKAiBgm3pFbZ46jHKZzqtYxTYPZPE86bjDrDj9cDJgmWcL1CqIBAjS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJsjM5wcvktdVMKoHKtwDpIq4Q6CeeSBKiJx1WW7FwzwXxeyaSpGkSWwsEYHjCNY6E8RYFT411w%2F9pbXetLn1RBoPX7TS8rveQYymMa5u7%2Bupu%2BNdu1irwU90w%2BwLdzsEG%2FQVfV8Oz%2B1xw0Ax1Tnk3eAJqkwsT5FjqG1KSg8T3fIPeL15Rf8YDTUBjz0r8Iylt4ow4Q5fup68nMEpXRXHMJIxPvZv%2BaJofu6QoJ72g2abkImTCa4BvdNCFPFCW3aLx6cOSfpOHpcIwgrrR7p%2BrBNdEpRP8XIQJ6kBIxdStXbAyCzOvNyzNERY4vtaXdWCIFN%2FW4tVc4YGJTDsQBp9RE93vqB%2FT%2BAv3hLHOksNEzqdNkINa%2FoqJS7rf91A3NxL0zjDLVtPpjkt97TTmYxgCt6Ih%2FOsKyKIFK6HX3SbGJd71OH3liYSK0YYK3OLY4%2FPcTAsisG8IUyOa7YxeHKxi2qeNuNA6fyL99e8kteeb6TmZxRSuN57Grb%2F0LMvu7mO%2FkzJt5lGvEsltnb4IgnuZkIvelOtC0MKpqerI3H4T61ZRK%2B137oINsi1WD4ajTIi4CT3%2FqZBi%2BHk238yH7HqlxoCXMdFMFUP0Xn%2FyGBFwHgeehs4EqjJPjMtC4M%2FqJ05eG6bxUNV%2Fh452UowiZ%2BXzgY6pgFdboMjuyRGoPYhW7wp8wmm%2FpJ3niHIeydQrN8W6Xo5i%2FMZWRxGPrJHCAi2d8C6kYFdUdifzrwErN5i1CkOQbU4PetCFfX9dk%2BT5gOYeEK9Ct%2Fs5TRoji7dBYzKjOtbaNJMBiQlJS54lZabA6N1Ho7ecM8pexikmCiUwk5sc3zaIuQQSZ8tXBxT4ZKiy3t%2F%2F3ufJ7lkWQwDhP6Ys6e225pI1sKYaRFE&X-Amz-Signature=e3bfcf4f9e6f875771dd106c36ee45ed6b397ffaac93ca5783df15a4b97ef5cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKVCLGZ3%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T010405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQCCiAXowpLeZUBfL5DxSwIocfEc7dFshdz1wgjAKScuogIhAKMCB58%2Fp72jedkghr%2FD%2Bq6Q6P1J3BuQOnODc08v7A0CKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxWF4Wzx9K5nS4A%2Bncq3AM2t8ouYY6W9s%2Bd825mzdzSV7hKyU3mw3bmieJw9kY%2FtwQAoXSsSbUAg%2FSXEf34iHqynTezYyUz%2B6%2FwVSrEJrrx3BhWJS2%2FrRIf9hzZIFlK6jUIRJpKdtMf4ORpsFHSqtlvoZb3Q37ByEpZT%2BidssV2G8WCSOLw33yywDT3uD1i805uSw8%2BdEpFrxjJjOR6j1l92SsgEC2N9sSZ51RdFfGET3LOXflaulIrGRUxOCbP%2BBx0rTDixrSvc2zGQ%2Ft0LatnpmRdS88d3O86g%2BuJPdC9%2B435V4AqwH8%2Bcy9XTeEmuJ0tz3I2NlhzCKi4E9r6pBAUU8JdE%2Bwy1TuAfrp4I6Vaxw8h8YomuN2VW8V0IWao5umu8lgsVR6dWzcjdCGsFnWQ%2BZNAzpqL%2FJiXOgskdCz3nhlqDk1hgo7gGshjv6KsOPD2%2BsVxFOS%2FicsrhGhRhT7OJkJH4LL%2BUfbcbFhkW7Y3LCbDZ5Wbg%2F3rNkrKXGw7CUKzxJXuR6pyi8TYbAtoDHWEt40cZBJJM8osS90Tq%2BedD19h9saz4vmVE%2BUefhWe9aywXSHuk47wREcCWhTFAU0yjko1nSLpnI3hD%2FKjJOGKEb7aC%2FnLHExTFfc8cfgJcwXB06GD8BGFibwSljDOnZfOBjqkAfOJ4SQq2JxveBTx5284DjnDB6K5f90kCQDLCA4JAOPvDi6Kfe%2BY0Ho%2FpLuO7wfXEnGTrPJh%2Ff0Tn3%2BHg4p9GMGgjVNM4JZLc1gCutsXLUqaLhsoAbp%2BBph3%2FdHoc7D9wH6HCI4%2F%2BJTXGlWyGTwhznaoeoFybjBxPbUrPZq2JWuBXvhVBkb1ZGz0Ypc2AD7ujx2CE8ArzfTKIh3E6t3wVrPdMqE4&X-Amz-Signature=bd06850690c49612e3778c66f6052edb2ccb4d0e359cf9a5f5140b93b5d90644&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKVCLGZ3%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T010405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQCCiAXowpLeZUBfL5DxSwIocfEc7dFshdz1wgjAKScuogIhAKMCB58%2Fp72jedkghr%2FD%2Bq6Q6P1J3BuQOnODc08v7A0CKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxWF4Wzx9K5nS4A%2Bncq3AM2t8ouYY6W9s%2Bd825mzdzSV7hKyU3mw3bmieJw9kY%2FtwQAoXSsSbUAg%2FSXEf34iHqynTezYyUz%2B6%2FwVSrEJrrx3BhWJS2%2FrRIf9hzZIFlK6jUIRJpKdtMf4ORpsFHSqtlvoZb3Q37ByEpZT%2BidssV2G8WCSOLw33yywDT3uD1i805uSw8%2BdEpFrxjJjOR6j1l92SsgEC2N9sSZ51RdFfGET3LOXflaulIrGRUxOCbP%2BBx0rTDixrSvc2zGQ%2Ft0LatnpmRdS88d3O86g%2BuJPdC9%2B435V4AqwH8%2Bcy9XTeEmuJ0tz3I2NlhzCKi4E9r6pBAUU8JdE%2Bwy1TuAfrp4I6Vaxw8h8YomuN2VW8V0IWao5umu8lgsVR6dWzcjdCGsFnWQ%2BZNAzpqL%2FJiXOgskdCz3nhlqDk1hgo7gGshjv6KsOPD2%2BsVxFOS%2FicsrhGhRhT7OJkJH4LL%2BUfbcbFhkW7Y3LCbDZ5Wbg%2F3rNkrKXGw7CUKzxJXuR6pyi8TYbAtoDHWEt40cZBJJM8osS90Tq%2BedD19h9saz4vmVE%2BUefhWe9aywXSHuk47wREcCWhTFAU0yjko1nSLpnI3hD%2FKjJOGKEb7aC%2FnLHExTFfc8cfgJcwXB06GD8BGFibwSljDOnZfOBjqkAfOJ4SQq2JxveBTx5284DjnDB6K5f90kCQDLCA4JAOPvDi6Kfe%2BY0Ho%2FpLuO7wfXEnGTrPJh%2Ff0Tn3%2BHg4p9GMGgjVNM4JZLc1gCutsXLUqaLhsoAbp%2BBph3%2FdHoc7D9wH6HCI4%2F%2BJTXGlWyGTwhznaoeoFybjBxPbUrPZq2JWuBXvhVBkb1ZGz0Ypc2AD7ujx2CE8ArzfTKIh3E6t3wVrPdMqE4&X-Amz-Signature=3ece293da5b8a594272f55f04ccd22c3f965e157746973c8688f5a96b48c0cfe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUQXV65E%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T010405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIGuwUNIxTMGl0i1UUNSZ5uTwBII5JvSvGNcESCjCSTz9AiEAzHPsPLSS7H0wsQgtkRBMC1D8scgl1AkbRWtW9xwxLL4qiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHSW63DJLu%2F2AKKi%2FSrcA6bziqrhW7vUW%2FgVdKojl8roAYeZ%2Fg71z8dkmV1FNEt9JQCETMqCzWwmdBz5eDpeUZ8QCsf%2FqVR1Xv0XBsBXTKh%2Ba%2FBgxqoSgPD3W3qU2YhbL6yDXGB86ZGXgdXsrTUnCkqzquRj5aDR6V%2B72LEmbwyDMwR7HUESsknLXUah8iA0GT1PmBxxaxaFfRe%2BsbScrkri2ZjUkfKRcJGS91dhv9AxZb4neo3lJum%2BePde7Gy35veys6Jfsg2vaDIB2QxUhnnRUN2whQL%2FqZ411be5p2BeooWpi6Zojl0noOVTYBOu2UYVpMlsFR69jDSMcDb9ZKFDhpeXoB8cXDoM07aXp%2B4vJ3QlefY2Dxb0y4KM7RNBTVG2Qxw%2BnznhqY1QegUapjPqjGhWDciANeH1uzaBgs7rEDVBgXTL2vqmNpGw6DogJ4LvkxriSHpMOdu5uv3nvP%2BvECeGjXduy7BexyxhSG48f3JWKO6LA6Jol2L79klfLXWsyFDnziB%2BD1SXowulu98zlluYAac0L7lOkpLqmlAWKp9XZGXi4xpdd9atuo7Oq9u%2BcRbBn2yuSetWGIicCDbkvfo6l56ed%2B6aVtZeuSC6t93Z%2Fx91XaItQa0kTQ9e0uA3ACh8pCQ0eDk%2BMImel84GOqUB%2BHT9m9zCo6IX%2F8JmyCLkYHlbCtt7HsUXkgcNHsEz6LVYh7VWl4%2BmUJqvUx2MM0eLMvp7gpSELxbduRQJeu94JuGwUofweioKv790kHobyIezTeOb0qo%2B7iDY0wazyD41sSOes00cac1YzrzImgaOk59wvxiFiF9BrY8ia7Idz2oRIaMlyHQq5cXqkE8x%2BvZV4Yk5Nodj8mfrhs1MV6vcknPuPBIY&X-Amz-Signature=e7a0765b133be2d93d617b4384ae6f445a0ced2c432ef610117cd597de49c0a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDH4CRH7%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T010406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCICCk85QkDtxxJif%2FNkxnJuCaBUVNsCE5dOu0%2Fa1cvmxhAiEAixG1TyVZD1bIwMgRLQLuqGY9D7o6ZTLu6lFv%2BWcie6IqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIrRuSp1wsU7SnDMJyrcA8SAS9bFDe9nAJ8KX2xCXdUD2eaep24gM3baxIgD2uGbDONuBIJidTjEeCn86MGSp1DCKvyF6jbDZzx4kaU7rB6dUvcL5gvVoiMQxQn2IrcFuF7%2BWCn%2FZLdklydPVIBAIh%2B1rkoxdJ5DTGM59GgPdU%2ByIKlIP8CqhS61BPTI5BO2omWas8eP88avykTVri%2BbBkDrTwnzS%2BlHFI%2B5RHtP5pyybxpHrw8ePKRSGPx0XKwpS6w99MEkrP%2FJOZxdSKbEp1ASoFugzHovGl39ncUvSPzFW%2BBdeWJBsTPtT64Or%2F3VbJTSEmChrEjzu%2FzmYs1AEKUbuLoqKoE%2BvS1W4YAZpT67O8DSCPxtbsWQUUvxpBkvbkncv1D87F5xyUTM8%2BaniGxMiMS%2F4T%2BPAkHuvRLHkEjd3KUcbuZCs9MUtifDnHoYNu00%2Fo8ZeVKoJ4iS1LdGVFO22rlYZC3niPh3XUU56Ow1TRckEJk1tMJDzIpGBdW9UXiawJX61LuEsEhNrCpYsBkA9u5ETJaz8NLLU2S6McmDo2XQsuEFMmQIS3T5JwRNjTAlCZWrkceadUfWXK6l4cUI7%2Fs6ABNNDjuDLzVIFcS8kuBNYn00l5YF88yrUT15aXif3Ix1ZHAlLQ55MPudl84GOqUB0ASiv8FmVilJ0903R3WForCY8Ne2Z1ux4sVVFnjj0Ewhq1FPcdFCNF8dsy9nFYWU9n3aoHnPndVEi7QluS7NRrNvALOe9JmdTN5XamjOUZcXRdg%2FkWm1NkghadL4gX5mLkIilTPQ7LR0MPkpC8FpQO0MyimIqYPxywnhaMe2HTEbxy%2F4enUzClnIE8B3nJxeUOJImZMCvpB8uoxh%2FHcDWbu4M3M%2B&X-Amz-Signature=a71378871bc19ba7fc66f28080b8d8ecca025efe548e93ba79fcd903a72a353f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHVDHNKU%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T010406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIDRSLot%2BGAugrEzY6Oj9KCXEQZWLXU%2BHrwtipzlhbcumAiEAqrsjzk0SETvxDHekvpdJ0Spbe5%2Bb3Q57NRaBqSuekBAqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDvKUqHnrvZEGLw3ASrcA4nF7nyntB416DgK6OQaiLOp2%2FqHb%2Bh%2Bg6jeLuNqMznIkLl%2FsCxj%2FDu%2Fl6IVIKhheHlHyPyDukEDB%2Fg8jfQ%2FPL0Z4zkhnDU0wqqbBXmGknkLovN6jDOSjrsMrTa97Z%2FAff7rozal9TkcpBaNFRLqfu7W23wORpT%2BUg0di%2Bgp6%2BZWpcqh10e3ioPVhrbsfRWpnMG7RECMsf8lO1nR0l7YafItAn7zfvSBlGL%2BU6UpeZYE9mKUiWt5OngKhK8I87WiQoVuu2rDFCfR49a89LG8ofRUvFfxJqO4ydHIxJ71M72XzojlcIxNQLZddtxv5MASsl%2FfTdxSZfBoW3Ol%2B3MTBTWQjorMLfSQ6Ed%2FBkmu2qAi9pgtEGhTudMdZBJBbCGrpjfcvIK02%2BIUJvdCVzgQgYE8bwrVSMaA8VT%2B11MdGz1TiwN8K51qmiyIku%2B1NQxRooJXO5p7e7SKyoY8mfk99M4%2FLCaXMEcYLrPK1z5uf%2FhsybAhHeubuhbb1O3g6OnOwivv1ZfOdIARfHJVazgdic1TfS4WB2SJD%2FhJofC9r%2B6En3GpOdoibSLv0VVNe87St7wG%2FQBcrx0tioOdORvQpZcsEnhW4sbfRkrZPAGOIAJ0y5UXQ0oyMex%2BpZbzMPKdl84GOqUBCrXI4iiucMhXz5OiSv%2FE%2F5JiRYEyW7qC8W13tc%2FtSMGtuy8iwAo5fiq1N7inb0kWtU135SowMGDeOmaRBHRLaDrB9gXD%2BIAKUef7qK8mc%2FmsqvCP%2BRFlvG2QBA2rPXWh9zrKWWlzlHcTYDOGE%2BGsIW3gAo509zkTFk%2FqeIMQHFKMrpScRqWDNQiu21BohGKP2Ng49fwa2C1ixDHzJepAXzVPrXJx&X-Amz-Signature=4d8926a5abbe0e695e35cc501972f44fbdaf3b64311de6e13e5e78c33177ff45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5QWC2L6%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T010407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQCPS4QZto4m6UeIBINIoKUaqHMn7AtbMGBnsbRqapPi0gIgWQK5WRUSqfcR8KYZ%2BYEc8gB9EJAunFt9s%2Fy%2FwmOCChcqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCwqEIGBXgeStVA6syrcA%2FVWlZa%2Ff%2Bu8YsNeiVHGB584EdbwZzx1IUuA5zDTLBGDl9Z%2B3b3tZZs50FVzSICr1OutG5zYlzlPwzrP3axi7oI%2BUMgTL4bVTlYcfQhXAdSxiWEbBMyo%2BsHQobTXzH3EQvZwXkfqric%2B1vAMgaJlJz87Jr7wTyYDcwS21Rd0CvnV29Z%2Bb9tqaevtF2yrJCeksYWpQCQB%2F7OIbG62PWZu%2BjRXzbb3rrdOsV%2FY6te007GfgSnVDgAXi%2F8Gp6uPLBIp%2Bmr5FgujBxLI0V4RhzLXqXwKpB5QLT4%2FAYfVacyQsi%2Fbp5R%2BD7EK%2FUISAG2LAX0uJi6RBYZDYyRyDo7goXVj00IeAl6GBOqKNoV%2F2GfpHos%2B19kKwaKhmroDv313L7zC4DLm8bpNJZ0rf6ogtrQbmDgjU9WCU90QxNsKNiUP1NojOnIX7kkBh%2FbkoxqgMTSVKWBXUwd3lPK1lEl6025kgtU0GK%2Fs0HSVk9y0Q9%2F7u%2F3nHEQF1DAd7PEwP6gsGAgeP0zrwW%2BEtzE9g2E227hiA3BEdpBL0sdub%2B6moZ3l%2Bib5T9ed3v601NijYK51bvr7jY6NZ5ByvmoiUqUm%2F%2FfA4y8XE%2BZw45930avM3k7%2FjjjVWi4gzfEKEQMZqMdAMLyel84GOqUBDim0Q%2FumowajkL%2B121aNIm4%2FSlBugvcYsk91BXfv5Gct7m5tjNQ%2FQtb7FlZiwjZoDRL4Q6Qkt2bF6dR8ESQR6tTXo%2FijDXO8qEZQuruZq79%2Bc90GJ382LvFjO9%2Bn8kgdM3nLHGE3mqTXm1lkc6OjIFQ852k%2FQM65N2MCVfj1C%2FvT5tJVMUjG3viTz4FGN7KeP8%2Bqpv6GdLUXJ6HKUkkIuwcXRtub&X-Amz-Signature=3370e39c4bdfc54e2cf6264995f9693c09fa4aabae5d19aead3767758a974a2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5QWC2L6%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T010407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQCPS4QZto4m6UeIBINIoKUaqHMn7AtbMGBnsbRqapPi0gIgWQK5WRUSqfcR8KYZ%2BYEc8gB9EJAunFt9s%2Fy%2FwmOCChcqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCwqEIGBXgeStVA6syrcA%2FVWlZa%2Ff%2Bu8YsNeiVHGB584EdbwZzx1IUuA5zDTLBGDl9Z%2B3b3tZZs50FVzSICr1OutG5zYlzlPwzrP3axi7oI%2BUMgTL4bVTlYcfQhXAdSxiWEbBMyo%2BsHQobTXzH3EQvZwXkfqric%2B1vAMgaJlJz87Jr7wTyYDcwS21Rd0CvnV29Z%2Bb9tqaevtF2yrJCeksYWpQCQB%2F7OIbG62PWZu%2BjRXzbb3rrdOsV%2FY6te007GfgSnVDgAXi%2F8Gp6uPLBIp%2Bmr5FgujBxLI0V4RhzLXqXwKpB5QLT4%2FAYfVacyQsi%2Fbp5R%2BD7EK%2FUISAG2LAX0uJi6RBYZDYyRyDo7goXVj00IeAl6GBOqKNoV%2F2GfpHos%2B19kKwaKhmroDv313L7zC4DLm8bpNJZ0rf6ogtrQbmDgjU9WCU90QxNsKNiUP1NojOnIX7kkBh%2FbkoxqgMTSVKWBXUwd3lPK1lEl6025kgtU0GK%2Fs0HSVk9y0Q9%2F7u%2F3nHEQF1DAd7PEwP6gsGAgeP0zrwW%2BEtzE9g2E227hiA3BEdpBL0sdub%2B6moZ3l%2Bib5T9ed3v601NijYK51bvr7jY6NZ5ByvmoiUqUm%2F%2FfA4y8XE%2BZw45930avM3k7%2FjjjVWi4gzfEKEQMZqMdAMLyel84GOqUBDim0Q%2FumowajkL%2B121aNIm4%2FSlBugvcYsk91BXfv5Gct7m5tjNQ%2FQtb7FlZiwjZoDRL4Q6Qkt2bF6dR8ESQR6tTXo%2FijDXO8qEZQuruZq79%2Bc90GJ382LvFjO9%2Bn8kgdM3nLHGE3mqTXm1lkc6OjIFQ852k%2FQM65N2MCVfj1C%2FvT5tJVMUjG3viTz4FGN7KeP8%2Bqpv6GdLUXJ6HKUkkIuwcXRtub&X-Amz-Signature=151116e63419919e22a56151ff8e9c05870aa189c32d7baea824dabd16ebc5de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GTU5OKZ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T010353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQDT7Dy9piImzs37vEyUK2kkXrdsrR7Ou5IL6eI8saKqcAIhANaggair9uA4N8VcO%2BcR1N%2FUj3UyOBXwU87pSDZBRMSDKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyO9Y7Mz%2B1Px%2FItm%2FYq3AOfyNA04uE8kzlSS2rzgk%2FLbdik4LRcuCn2V6t3BmDsaPwPpHWRCmScTnzdTKsdmG5Zgr%2BcZi8T3W3dr4xtDpeb5wBIxl6ZifptSeePiZVZkAD0avUlk6dB%2BsswvRoZL5cIvSElx3ymHD%2B4RYWd8aAEOgxg7%2FpFsIWqTzqNKiC69Ja%2BM3Obws2B97o1lgEqJT1RIWY2hzWlPenRiPq7oXJreGTf9SHdc36qjJ1XOp%2BNMQe6Asp9Sp2cxXv0vcKoaxx1MA6KnYUE0G71PjwAV2PZU%2F%2BjX8gX4stE%2FVPd2yesGUbzoweaibF%2Fx5kRNtsfpBywSeLJrxBF96n49O%2Br6T%2BPtXhMjz%2Bb282hZXalQq206feK8EyJMuwYO6pnY5mvqhncOfepJh1KzIqmtT0wy09J2ETklY5u6g3pyyCjPJauWAmDxo39JXPoLCWsQjmIuLMQ%2Bx3g%2BRKX0b9ql1npDqTbKSThf%2B4QUeeKxriMm3TlvR3JovgGvc8tPDPNCMkww8zPRWxmrSnxgr86LAHI15QdL9ajYXk90z2pfWPiq%2B6ROgk%2BM0HQwursOEVKuXvLmsef075BFVbC9hiuJWYFJTaV8FuPrMb5SC2ft56d7G1uJES4BlhLtAOopG%2BimjCRnpfOBjqkAXyzmRsyLxVWGc%2BrudxWsIiyRy91L4VPqrkAoN1rptg3DOv0I3evansD3icaeUUrACEN5OqS34z0ArwFJTzsXykt1CoOMifl8m0ooNQeSVPeCGCjzD0ao33yj%2B12xXlgGpAhGDgiSsrnNO1mzoO5rocZpDgofLk4cerc7qlVv%2FDEhASePIKh3u%2BepVDOgvhJEDmmjiLCUX4J8CZscOqoIS4eRjW7&X-Amz-Signature=7e21c7b8dc1c2985e2115ada64baa736bd151adb120188ac52faa6851c4ef3f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466US747QJG%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T010411Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQDTrteiLrrcvo%2FXh3TymjW0%2F9x5anCRwWq5%2FABUVyHlAgIgAWKSCGywQhKCdNfa%2FqNAf%2FU4HTw7s9Ce3yqF7C2Z7%2F0qiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCQiqMvDIFXjJTxr9ircA%2FLBNjyUuzwShGJ6qi5mMW7G9yl1CWr3aVEECBzO3iqmZxjN06%2F5d2OQeDoABfEGiRTOaiMigWH5MnbmPav2Dze%2Fof7X6I2MVTz93iKuDUZlnXkiPlIitG%2FIcAfu5tkRyDQThr%2BlPqFewfOM%2Fd3ogxCrbG8ArVQqlaZnSXdmKmTDt3Dylr6NA7Tzr%2BLdU78gV0F4k06OdPTAg2FL1dyn0p9npqReqYZkmoxgGvj3UTCHqyPBW8cqbseuqQoY9X81y%2F1tsT98KlFpTiprSOXk48x7RWbqjiacS0EohGvo3FFGmoIBI7cLJLkdDJqPcQvpvzLDeVVHwbLVT4eMikifmfPIfZoow5vx2ktvZtLsIEmq5WuqsLufFj5VYJZuvaPNvinHeJhFpMVSLgpqrMZNcGUjsI1HCcagt81IifwnaT7yzz2D1GwbZ4bvf3ebraEhXQOFwNG1u2rQfhF8sNeZcGKT%2B5V2ToOjM2qFwwMRtrHJQSCnVmPtTDqiIPFE7SK4cMtWqayzbDemV4UNtQrvmcVb0LBp9CKLnSYtGrZEPEdg6RZwuhmgElZ8aK4RGzJSH0CiZiR%2FkuqXCvfsXEmyt5M808WrqQPpZ7L4nf2eWJafYzXfSX2I3wbiVP4PMIafl84GOqUBUHzRsTU2Hqb6Z1%2F1p%2FosrJg0rXsAuzmKUvuukW8pZSUB1C5B68ZTvyn79Dj4dPzFOkk7LP5gSLlgw3A5nzmIaz1Bal9ag40i1CQyhFr9y4MSIQhguOd6%2FY1wxkvvKZ0Vpg%2BVbC405hMfUH4RyY92Tm2DvChI1DmvvCx4TFRKRUaPAyzsHTr%2B1XDJhRUjFNm6Kc3K88Lf25yf6WS1wV%2BsD%2FkLiZWB&X-Amz-Signature=fd95fa97a367d1b0715096d42702d16c5528acf1c0a08589144f9b53e90e1c7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466US747QJG%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T010411Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQDTrteiLrrcvo%2FXh3TymjW0%2F9x5anCRwWq5%2FABUVyHlAgIgAWKSCGywQhKCdNfa%2FqNAf%2FU4HTw7s9Ce3yqF7C2Z7%2F0qiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCQiqMvDIFXjJTxr9ircA%2FLBNjyUuzwShGJ6qi5mMW7G9yl1CWr3aVEECBzO3iqmZxjN06%2F5d2OQeDoABfEGiRTOaiMigWH5MnbmPav2Dze%2Fof7X6I2MVTz93iKuDUZlnXkiPlIitG%2FIcAfu5tkRyDQThr%2BlPqFewfOM%2Fd3ogxCrbG8ArVQqlaZnSXdmKmTDt3Dylr6NA7Tzr%2BLdU78gV0F4k06OdPTAg2FL1dyn0p9npqReqYZkmoxgGvj3UTCHqyPBW8cqbseuqQoY9X81y%2F1tsT98KlFpTiprSOXk48x7RWbqjiacS0EohGvo3FFGmoIBI7cLJLkdDJqPcQvpvzLDeVVHwbLVT4eMikifmfPIfZoow5vx2ktvZtLsIEmq5WuqsLufFj5VYJZuvaPNvinHeJhFpMVSLgpqrMZNcGUjsI1HCcagt81IifwnaT7yzz2D1GwbZ4bvf3ebraEhXQOFwNG1u2rQfhF8sNeZcGKT%2B5V2ToOjM2qFwwMRtrHJQSCnVmPtTDqiIPFE7SK4cMtWqayzbDemV4UNtQrvmcVb0LBp9CKLnSYtGrZEPEdg6RZwuhmgElZ8aK4RGzJSH0CiZiR%2FkuqXCvfsXEmyt5M808WrqQPpZ7L4nf2eWJafYzXfSX2I3wbiVP4PMIafl84GOqUBUHzRsTU2Hqb6Z1%2F1p%2FosrJg0rXsAuzmKUvuukW8pZSUB1C5B68ZTvyn79Dj4dPzFOkk7LP5gSLlgw3A5nzmIaz1Bal9ag40i1CQyhFr9y4MSIQhguOd6%2FY1wxkvvKZ0Vpg%2BVbC405hMfUH4RyY92Tm2DvChI1DmvvCx4TFRKRUaPAyzsHTr%2B1XDJhRUjFNm6Kc3K88Lf25yf6WS1wV%2BsD%2FkLiZWB&X-Amz-Signature=fd95fa97a367d1b0715096d42702d16c5528acf1c0a08589144f9b53e90e1c7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667D7SFRQD%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T010412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQCcstzBcyZFjuq6%2FTwMrsT%2FlUqEOM6qBICLebzrMGm6VQIgcev7ms4XuXgGXH9kiNH2gksvJMJ%2FW8FGkXxHthzTpPEqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG8%2F8wLmci%2FnD1lrnyrcAzYwHz72%2BrSc%2BcWSd%2FsNVDHd%2BPZ5h8eBt95YetLPSlbbdFGLVjP8z%2FuT500k5KTPgs%2FEKaR9KlQGOGTtekR3XAjmgzUyknVgNrldWSRvp1KQxkWv%2FpWVbndrevL7eB3FVvdxThTRh18CdcAi%2BixaP8tMXuc7fd2rYr1t5ZfwUiubuk46kUdURc8i6aEt5Nvn9p%2BwQ1Zt%2BWBzm9HRPG1x%2F2Qa%2FpRtrNEYVb3EBS%2BQRO4peuwj66NUzLyv4Iw2A%2BPpAe486gOytHH2RUTvmz%2FyCSeX4Sz%2BEzJ%2F4%2FDRYRSZXJ9P3RHfqEuafYVHpjJ8AxP7Lfk2ewX7X5NmJTSTOC0ureyeO2x0W2%2FUERBD%2FDrDYN0fAtCUYmrc5d8dGQU1AV7aALGBnY6iMVeNlV3cRq4jxYKc4vnMlhIRD7vqXUUNxk3yf0L3UX1%2BASoVmZuqGwfdPjEmj4iQkQ%2FuurNzUevndwUs3wBhrInQlqzXKHQRkQnEz%2BolfVdLSN13Y7bqw%2FcJOaY7U4wwTNrqEUcMbZbcai1hfeOX9R5tDBwT0ehbn3XP7rNSEV1h50ZpKYGbGvTwup%2B2rjQFzPYyRnfncKMqsmqI6BCR%2BQ07j2eR6p7RTSLSTFqHe7X0YxvH8j1xMNael84GOqUBJ1NbYeLl4EJefdH7wFuHFMhfVAiY%2F4%2FZ%2FgjHskusRuCVQqwYyaVD3Im5UL0njmHJ2yMsGoZuKMq%2Bk0e07foL%2FRlQCMqamhAIQzoCARO4D6RFcdmonAb5OV20Bj4pav1pxoxXwLae%2B%2FIUijkmXmBEPBhBvXJxwnENdxv10wpDomdJP3D%2FWlR%2FnduLTdXfoWvedjX6y%2B7aOmKatfwoz9xW92eF9hr7&X-Amz-Signature=e1d30a524fa3ebdd330ccaf003074beece8ca61e71950ff633572a2dce4bc3b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

