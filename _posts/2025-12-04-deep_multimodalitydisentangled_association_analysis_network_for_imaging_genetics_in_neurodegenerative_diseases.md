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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGPGBOL4%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T152109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIGfJhyvBY%2BRC6KZxXOWsFlN4onb%2FSRh1IdHxwbwzS9BSAiAtM%2B8zb5YTDnoMsKd2GWEbL2p3yfrK%2B13rU%2BJZA4oItyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIM%2BESqM35In6rfkh4EKtwDv8eZSEl75ZZJrT3RjXRo69TDaORrOM5CZp6b8VpRx3%2FcWbS0SjnmJJz%2BMS35%2F8gxLQItkJgxLFg2%2FkWxbThzZmg9b0vwF3KqdQ48gFgJnAV7iaFCUyMV6pUX0aCas7PXgdZRs7aetzJ2Q9FMlB56kigCqBovYDgYWrQGzzyxGrF3pyCGyKIhglAht5xaYqiDv3HZblApdVq5t3jrgQ50Q5e0j2Es1gJINb0lGdlRReaPD0ZQnJa5bJaZ67yOgtVenXiXTRs1dPTUUVkHieCF9Q1qL%2FAyIGutLwxG9922Lf6QO2sF2ZFljj9g3pxpSgvhF8ICr8uUhn3VGr80eXEK5VmwcZcSxIRpRDYNX26fhz9cSQsMh0pBLWXy1PdZ3UZyiy2I1QETAI5XAqFnaq9jwKgKtUxUsZG1lyOKt5LzhSXpMmPeGYknvY%2F5F%2BsSAYEJL%2FX0v3LZuImJX2Bog9gR9IFvl0%2BkX3X2fT5cYtuAe5JH6A4wMt2RY8LpULVR63pi7%2FXifqyhwLinYkJShSOn4YOR60QmPE8qpgMkqHwBMbcqZ21bGCWPFvnm%2Fab9AOzzGvO4eoFztBiZvt8iwYf8VE0h0JC1fk3%2FI%2FBtZbbx862VSbiXXVkw5ZQ5Aykw3K7ozgY6pgGkGhxM0OzNkx5i8Ve%2BfOIXdoIvVS%2B5wqEbAUy85cjHoHeYZ%2BqwzdZcv5xea0xZISgPN%2BPv6WGFniuR%2BLNN0lezuIbivpvW%2Ba9j7cmgbO9SnIBjUlhQet9BbwNR68LqcS5kohK9CsXKsFbqYSeGHw3GMxU7H0JqX8rYwFUh2h7FivtWswFiWDgA4PgrhiX7H%2Bu%2FkjgEy6DCN%2Bjt5Ap90SL7d%2BsNqPeX&X-Amz-Signature=29aa2aac339d01a24f33d3637b9184cac09a05728cbf5e460922e3f636b42e29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGPGBOL4%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T152109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIGfJhyvBY%2BRC6KZxXOWsFlN4onb%2FSRh1IdHxwbwzS9BSAiAtM%2B8zb5YTDnoMsKd2GWEbL2p3yfrK%2B13rU%2BJZA4oItyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIM%2BESqM35In6rfkh4EKtwDv8eZSEl75ZZJrT3RjXRo69TDaORrOM5CZp6b8VpRx3%2FcWbS0SjnmJJz%2BMS35%2F8gxLQItkJgxLFg2%2FkWxbThzZmg9b0vwF3KqdQ48gFgJnAV7iaFCUyMV6pUX0aCas7PXgdZRs7aetzJ2Q9FMlB56kigCqBovYDgYWrQGzzyxGrF3pyCGyKIhglAht5xaYqiDv3HZblApdVq5t3jrgQ50Q5e0j2Es1gJINb0lGdlRReaPD0ZQnJa5bJaZ67yOgtVenXiXTRs1dPTUUVkHieCF9Q1qL%2FAyIGutLwxG9922Lf6QO2sF2ZFljj9g3pxpSgvhF8ICr8uUhn3VGr80eXEK5VmwcZcSxIRpRDYNX26fhz9cSQsMh0pBLWXy1PdZ3UZyiy2I1QETAI5XAqFnaq9jwKgKtUxUsZG1lyOKt5LzhSXpMmPeGYknvY%2F5F%2BsSAYEJL%2FX0v3LZuImJX2Bog9gR9IFvl0%2BkX3X2fT5cYtuAe5JH6A4wMt2RY8LpULVR63pi7%2FXifqyhwLinYkJShSOn4YOR60QmPE8qpgMkqHwBMbcqZ21bGCWPFvnm%2Fab9AOzzGvO4eoFztBiZvt8iwYf8VE0h0JC1fk3%2FI%2FBtZbbx862VSbiXXVkw5ZQ5Aykw3K7ozgY6pgGkGhxM0OzNkx5i8Ve%2BfOIXdoIvVS%2B5wqEbAUy85cjHoHeYZ%2BqwzdZcv5xea0xZISgPN%2BPv6WGFniuR%2BLNN0lezuIbivpvW%2Ba9j7cmgbO9SnIBjUlhQet9BbwNR68LqcS5kohK9CsXKsFbqYSeGHw3GMxU7H0JqX8rYwFUh2h7FivtWswFiWDgA4PgrhiX7H%2Bu%2FkjgEy6DCN%2Bjt5Ap90SL7d%2BsNqPeX&X-Amz-Signature=29aa2aac339d01a24f33d3637b9184cac09a05728cbf5e460922e3f636b42e29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3JJXVRK%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T152109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIFZl%2FEuXIDm14DiwuELqWCcywb9K57ddJudRaMFiUPtBAiAoF7PTiTkEEkQrxsPIJLFJU2IcD9uX4o9wCtODKFqf7ir%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMjS%2Bb86up4gi%2BhjqHKtwDTueNiH3Eu%2Fpo5QMKPcx%2F0JGeHgnLIJRzj0tLTXKAyg%2B0TQtmxbz3UHEhhxBYjAAFNz42sFjI9n5sUx%2FLzuS2NuAqWGcukAHOrdbF53SQuZ9yaVSuGbjbqz6AiixAtxCn5fFxPXfGPj27anmBw5c3k00q%2FRT3BHlr7ARf5eVkfKHU6DHQRDogFrml3C5CozvG5VrkzceHel6RCf65dVcp7ysck7Ox%2BcjTGoeG6ameEO5ze769cKl4Y%2F7AVpVNHEyAdVFJz1atvLEwsuoYBgYWc5ThZcrAUZ3IDo%2Bwwy8QvgwflRjNdt1jyFivd4YWsKpSaSapNukwhMls79wsOTFst9vGw7OoiqriH6Sf8SBlHm8o4xfesta0CVxG4pCowNP8CKnaElDWyeijY63cc0%2BSo8uSNAxekXOOwgZuFg48Wo7RRf5Vu4ByP9gZLN7Rjtg61vfLqnmUd%2FmPboAQJUsufA2cBAOfktY4%2FSgJZUvPdzLp76ONSf90iJWwrIc8r9Et4LdNFDrPGyvygUCvbY2Y9Yawx%2Fn7%2BTVvvhX4bSu6J4qrN8lkKI0LhulX%2FrBojvfwAWNONg4P3Q%2BzVdBxS%2FRYA9Es0%2BWfgMe0%2FwpDTTodSs%2BhbF4fbB%2BCE4nt%2Fzow467ozgY6pgFecxS6AbmlLucyjltKZrcwydK12j4VGSwnapN8wQvpZ3BUjGWSyzr602XlMG6lHlGa%2BxEL1sOimYEIxC5TRPJ5Gt1GtUroR3FCXLojpBlj2S%2F74RsGSkiItzIfZ%2BqLeeefc8zfmQHo0vn1XSXix0vMLLpGYWGPYe0m7799%2FSsL91DW2r6p4JY9D%2BLyS5fj9Orm2ejuHuHf1x4oy%2BZbj4GMPCBH9uCw&X-Amz-Signature=ac54a9af61044c90c96ad5754c7a14dd54b3bf0d9802905580bd9de73f880fa9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZB2NWAJM%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T152111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQDocY%2FcuudbbkeZcXtphX4VbCKOYI%2FmN%2Bpas9IjIKKwHwIhALBxS0%2B5WrNc8Org9XMS%2Fhab22KCwhMCVO77WvVdkRNdKv8DCEMQABoMNjM3NDIzMTgzODA1IgylBSVBJmIHNBI784Uq3ANznRNG5WH4ejnVsscfyq%2FgFwp0wRFC%2FhZX98qQm9JdT5brBNCreQnZ3fHxMMhIJ0ldZ0CfnC5wr%2FKc4FPby2dC3sFZ16z%2Bem2ToPYCFs8%2F7Scs%2BA5M%2Fm6aIFBsqGz1mgbL00R%2Fg8v4G4%2Fo%2BPVNLJ0rfY0fdeieqWjAJsbiltDLQb1S3nW7KrHOVh0quJ8OvyJBj8AF4C%2Bk%2BHMS4f1kByRryyXPPfUGEXw7WAShCfsChogBWlyUAylEbcGtmFwmzHBpVmx6%2B1BrvLgJe5C3SRm5ul%2B6dHm8cwXKh1UwP9JmOGx0hhffVL3ez9N2pLMWbtJPZxvQhzWZqNJYqoXyCbuN6TRt1oB%2FTnsfgpgUrwu9HXAo2u6d6mwCYm1Dtdm1r6W7B8oAQELcd1UIaUdyX1NRgpDRYjtFGdxL615i7d46q1XlvecSLyQCauBnrfEpTmDHmK6XaoVz0yj6R7uQzAUCZ%2FvIEBjS%2FCd0ygYgnc4t2%2Bocw63L%2FV94tMw8N4sOQa4GrDZ%2FDvLEtYO6S8Nq8p9PyMwdnhSU4KAGOu4deWJYSFaW%2BmVPgNBKo1FhVpqELv76NvZogmpgK8hw%2BIQyibiUsLVGf2dJC0CdD7HvIcuL%2B6ToiG6Bk8CQf7O%2BgjC0rejOBjqkAWvHjns7HNdEu1Xo%2BTqU%2FXwiAFP%2B1nvLjbhc%2F%2B2iUKNwEfJ4L5pPBFwiLBXq6fdfqB5EULhUG08BLNY2gLbgRAiJ9kEzDFoEtkKcQYIpDBJHTX4MCkwfaN9UXlY%2BiPhQY3k1Xw6H533SFz97T9RzvtR4zgNLfpXJLS2cuOJ3TqgkFyLaW5EQ4MKT9jvCzD9c%2B1jcmsNE65avjf4zO6Zlt2AFchLH&X-Amz-Signature=bab2fb281cf0586a729bf792bb71fab27b8db4964e292efcb4073dacbf673192&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZB2NWAJM%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T152111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQDocY%2FcuudbbkeZcXtphX4VbCKOYI%2FmN%2Bpas9IjIKKwHwIhALBxS0%2B5WrNc8Org9XMS%2Fhab22KCwhMCVO77WvVdkRNdKv8DCEMQABoMNjM3NDIzMTgzODA1IgylBSVBJmIHNBI784Uq3ANznRNG5WH4ejnVsscfyq%2FgFwp0wRFC%2FhZX98qQm9JdT5brBNCreQnZ3fHxMMhIJ0ldZ0CfnC5wr%2FKc4FPby2dC3sFZ16z%2Bem2ToPYCFs8%2F7Scs%2BA5M%2Fm6aIFBsqGz1mgbL00R%2Fg8v4G4%2Fo%2BPVNLJ0rfY0fdeieqWjAJsbiltDLQb1S3nW7KrHOVh0quJ8OvyJBj8AF4C%2Bk%2BHMS4f1kByRryyXPPfUGEXw7WAShCfsChogBWlyUAylEbcGtmFwmzHBpVmx6%2B1BrvLgJe5C3SRm5ul%2B6dHm8cwXKh1UwP9JmOGx0hhffVL3ez9N2pLMWbtJPZxvQhzWZqNJYqoXyCbuN6TRt1oB%2FTnsfgpgUrwu9HXAo2u6d6mwCYm1Dtdm1r6W7B8oAQELcd1UIaUdyX1NRgpDRYjtFGdxL615i7d46q1XlvecSLyQCauBnrfEpTmDHmK6XaoVz0yj6R7uQzAUCZ%2FvIEBjS%2FCd0ygYgnc4t2%2Bocw63L%2FV94tMw8N4sOQa4GrDZ%2FDvLEtYO6S8Nq8p9PyMwdnhSU4KAGOu4deWJYSFaW%2BmVPgNBKo1FhVpqELv76NvZogmpgK8hw%2BIQyibiUsLVGf2dJC0CdD7HvIcuL%2B6ToiG6Bk8CQf7O%2BgjC0rejOBjqkAWvHjns7HNdEu1Xo%2BTqU%2FXwiAFP%2B1nvLjbhc%2F%2B2iUKNwEfJ4L5pPBFwiLBXq6fdfqB5EULhUG08BLNY2gLbgRAiJ9kEzDFoEtkKcQYIpDBJHTX4MCkwfaN9UXlY%2BiPhQY3k1Xw6H533SFz97T9RzvtR4zgNLfpXJLS2cuOJ3TqgkFyLaW5EQ4MKT9jvCzD9c%2B1jcmsNE65avjf4zO6Zlt2AFchLH&X-Amz-Signature=b3d2f8d1530678e833a44d8c799eaf24fbe6aa19e068cb12b997083d8bd70dfd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZVZIVLG5%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T152111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQCGasbfMfdbEKHGitxDDP9usViyANUGaGNiU1Ccha9xCQIgTaJ6KqwVfWRIuvzApx1yQpEI3s%2B9CvbdoGQcoggbdRYq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDNo1ay22w6q%2BSxEkTyrcAxd394l4lr6dhCn6xZ%2BIp434g%2FOS9c4dNBV3WYj%2Bjeerr4Oa3Lj2IGHWhy1YtD0tsMNQqovvIfdwGDL%2F%2FvMR%2BvH7int9kmy7wBZyXoIhTBzt2EsysAtKw%2B1b7JVE7hEBu%2F7GjcgcHvNcxlOe4XQVhKIf2zX10QnqcrXWvt28EV24R3yeIKLuhsUsLzgM2Ud2G2O%2BuuxKDaQ5UzJyXRM0TvF721CuJQB4PedvvQEO7rYOQKPIjq%2BdhPP5%2FnnKyRWnMWD5sGuutbA9xTXxjVst7DhgE84A0eyJBBaJ%2FZNDB8lVb5L2Hv930euZm7hpS2jaDs%2F7uNheQ8gTWCsSftHINjS6smy3k%2BTUqgqk2Y24VMy66jQxk6gnMxVpnc26aIj3XcnoUuQ8lP9Caspisaxkz4VKvXYror34w0yCaNkNbB6mY1LEn5O7b6M8Y0QNah8k7WI6GPTLwgxthwjti1ViyrwzDZrhdfnRjd3QJILVEfPV68M%2FmY8ytLoFUkmBSMUqpysbMpWpOZWg0go%2BsI4%2FE1msOTnqRyfRdLSvKnKw6A9AEYJb%2Fiq7ZrptHg08GT5xFV135xzo3zqsKuTypLemBxWagpIwRdkTKi3Oafop1n3ilJ8HghuTzXShmdvMMOKu6M4GOqUBsmVm9pCmAv4P1PqiVvRCg%2FfD%2B9v1dANdp2ZVSUE8h%2BIwVdYVO%2BkUSauNxYZTEF9IKK6kPSv%2Fa3hpdJfTk5TTt4E1ZGqzy2zWsG%2FRGcGI5x87faYzK2nF6kVvtG%2FI0WBDDnob8kqK7xzab254OZMwWoINJmgNtI4XqNyP9y1ogCt23Z8PGi5hI1gu5%2Fvl5N67bY1htDRBI0vCmmdped1Bu7ok3fnx&X-Amz-Signature=331c19fa7808e3bed38c45f07a12bf5c0495cfc5d82a0e41b817297b429b2b2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WG7CXIDV%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T152111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQCju3Ect7cpcHnOFJ3aYMXijuMc%2BKTcQ5WgV3DMGIVq9AIgRIcL7AzOi33UykiO8sLcB%2BeDdfImuNzWNW%2BCRKPxNZMq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDNyKQY%2BcWobpx42jZyrcAyeMK3Pf7y0bj7ES4%2F38pGlhECfU%2F74x6ZRSPYWpPqqNWPGD3FVWjOS%2F6NKnZLv2D7JuAsi8ogt8v5HqbE5u3cqZhh3j%2FDgGRkUeF2OfABTz83Kf5mFJek5snXaXer90gjICmk7be%2BqSG1gNgl2u55BkCD9tNB4w1X9chW0LIovQFgta5GKnRmBaBugtkOtwb%2FIUyda%2FeLWPLpwVIcF%2B5G2K%2BAuhy6Qb5gHnhPTK%2FhLsvrvLk020TY%2BaBzlCp5OcJQ9CqKxpjorc2HF0XUenPyybrChDR1zc5aMwlv7M2fyEotri%2Btc%2FQ3grDY2liCXg%2FrrthinoZk6Jx2g%2FDJINgHPlzUglFKPD5T1%2BQmk8dqJAcITI3VA%2FZFSkZTAXpW7STt9rm6V3gPzx9AWTeTsuSgaUd9DJ0C%2F4p5hYvTq3kndyIjYsNjVQd3NqEbZQjrqPArJhWDC%2Bf5Qdw%2FwEMDZJEoadWhyHIPd0Cuci2VJFJ1GkKq0pWR4q4He6hGdZAsK7%2BgPNTHMRu1cY8Uum%2Bo1RLi1i%2BZxsre22YNfdCsoGHlZ5VCvdfsKCRgLQCfQclu3OjEVuU1ap7XNcHURN9f0yTpuG53L5m%2B%2FKYIpAGdE5Ij1w1ZvqI2AEV2JHTtSwMLat6M4GOqUBcdhbiMEnJbArUBmfT1po3c1qcGo1NtovdmfAN4N%2F%2F4CZcGK3sHf3K7zVRClYNisKQFtvemZqCQX6Ap2FgNLwKeNVOeF7vI7K0JJt48NatxNDcV%2BsWsvwTEHeYk4rQq46GU0GUnThMREdzJ2Uo3zruHc9kVvDlmwNE%2BI8q5z573AGN%2B6pNCgYDaVlxi88ZY8gmUUjMn%2Bptm67SkOowB7bpiv5UGk0&X-Amz-Signature=da9feb259ed6b63db7eadc1a1aa9656b87fed99ec986fb1259255350835f83bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6MWDTHR%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T152112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQDXeAnlfPbABNVdg%2BxyemrrhpwaLkdoNwHRMT1oWvJiaAIgasTIRodfVmvGcgPMfJbMqaZep7RD%2FohRWxfNVwqdihgq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDJHfKI%2FhjVbtLhTruCrcAz3t5bM8nxZNAv8haFF5KsMW7LQJA30GXjlfLo%2BfOEiyOr9xWLy8%2B3wxXCFvSqPEKQQWMexnKvIwIu6AHlEFi945HibUDoJGrYoqwkZKrk1KflOx%2FEe5pEuUdx1X4y%2FE4EUmevH43KNNbkNlBXZQ4atCur%2F4%2Bnui5Gs0GoKS%2Bcn3g%2FVevTMeAGA0bEjHqNbpeuf2IG%2BdpFZsrQVWolcE10y4MNl6iUOPYug7ojzdAauaXCO4h2WRdtADwmc3K9HHQ4wdTqAdQfbv4%2BVjBirOOqnHxtpzuYiSjnCHpzMCjoUAUAEjjCL%2FEEsuj%2Bq3fNmRVrXdrX1gOmMUoOsT%2BG8OrxPVJaKbZUh7hICosVtfM%2BdXb8xDA9YJSCn%2Bhwq7IvvoPicT8dlU7NamB8l2QL99q6gGRicGnkIe7vjrc%2FxZCjdiq%2F9yX3YM7m14BvBo%2Bjx3bFNnugnVEebkHJ8eQLlrFO6VgBH10%2FyKMVl0NiGXEGzBbD8Ecp3uAa9C5TbossM9FPl8D%2FgLDgTEKTkxVGoDWxeLmWgcIX8gmsMCYNI%2FLeZg3Ww9yMmlOmwqqkv89CUWLxRMhV5jyINlPmD3%2Fzkx7TWHDHgHN0ZnbLbV4c0fLhNndPlzAn4MAF3%2F8uHQMOGv6M4GOqUBvSA%2BasS9ykqjfPR4dHkHQEidE%2FBYSvWg1MVuGqYgz4Q34hpNo61WbswtB4LJwbsjYt3q5JUH%2FvlDIidl20YcstapjUXPiJS0IcNJXmoc5zscpyhTFtDKxg0gj9cA6sZQk7eNThEzlkGstwfpgvnPTzOQX55m%2FX8fgsUYnE9BTvyXfnW3mQDeTHX45vSp9ChpGOqAi1WJqgRTYoCcIOz9zdFbaXEJ&X-Amz-Signature=c39df46eb0f401e8fb3f0f50e74e6ec7b47c32688f139b558a12885ab271e0b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HAUJNI7%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T152112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQC1xaYeXro0Vp42kmPYYVvWYGFEFhd5S0J8C6KoumDCVAIgIZOl9zF66DIh4FQNZDuVtqPieqp9QIJR4RyDSYMAC3Yq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDApxuN0a6u%2BM2EdNiSrcAyFDlMhwXAwI3AqzmC0E9ANqrmr0PpH%2Fw5FRQzw5QMDLshdJad7cZPVulI2IdwLR0%2B9QLR0%2BYTqxjtwOqZNxZ%2FIVPrWFhQ9iHx2CUntAarFtXQVRrwrOW9KKIexSnD8agY5EN%2BE530zcXplnmZp5h%2FvcihWmQBX2uR2%2BkFCl49YwqaCT0qpMB63bnCssDMCTbgZL%2B2%2FWRNGHb2J5nYFB1MaVZZvfNfP8DQK1guMFguJsJZzbwqGldCZpHnVi9gTROLEfTCGNgcW19LN6OBQWPPQM8VeE7OtG1imZITO7hJmRVPI6GQ%2BqZkJLzQBvaUKkaUd%2FRONwwcB8YkRm1kFskNN%2FeOlFTekvnu%2F2D1wt5Z5WUeU10ScRP0aVRn71nJLBFlO%2FF90arFSMjJ1kOrjqOWHNKHZqJw%2BJV3hGJ7VfnSUVInd5kRdzJb9ZqrTb74wRaHVvAvmThIZ30imINyYJkm4tMDvt8DYrFW%2BTBof7e0mpYP0hs7uhLjK%2FF25mjH6DFYiSuZsWTIGXp9J2ynUynu904RuQFFVMC8939%2FjEmhZ4yziqvVhnoDIKKsHVLju9LiVJAWg2tyGoILdVEk6R5pN4HRnfOWu1C8mU38iJK%2F6Ean3bZSIKHst64QgcMOOu6M4GOqUBTGgLnOB1IO8oMlC19LMg3grCTI4nnnuzncdTr%2FbyS4xkei%2FkPdNAJIkjMI4nvYrf7NpK3GoNXl4kPg%2FhHZioauEH9j7%2B15foUDN37kIvRSTIp%2F7aQZ182TsPDb13lCg8WiKMLputU%2F6YJozCiCgaPLCoLFe9qjV3BLpQp5GqQ8r2TOQJihZmp4WLWIXN7nI9pNUpwjAtbe2TmGpt9Sh79Xpr9LWb&X-Amz-Signature=aafae2d17326767819dc6312c793fce3ccf1c9483227dcc67b8da56b677da390&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HAUJNI7%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T152112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQC1xaYeXro0Vp42kmPYYVvWYGFEFhd5S0J8C6KoumDCVAIgIZOl9zF66DIh4FQNZDuVtqPieqp9QIJR4RyDSYMAC3Yq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDApxuN0a6u%2BM2EdNiSrcAyFDlMhwXAwI3AqzmC0E9ANqrmr0PpH%2Fw5FRQzw5QMDLshdJad7cZPVulI2IdwLR0%2B9QLR0%2BYTqxjtwOqZNxZ%2FIVPrWFhQ9iHx2CUntAarFtXQVRrwrOW9KKIexSnD8agY5EN%2BE530zcXplnmZp5h%2FvcihWmQBX2uR2%2BkFCl49YwqaCT0qpMB63bnCssDMCTbgZL%2B2%2FWRNGHb2J5nYFB1MaVZZvfNfP8DQK1guMFguJsJZzbwqGldCZpHnVi9gTROLEfTCGNgcW19LN6OBQWPPQM8VeE7OtG1imZITO7hJmRVPI6GQ%2BqZkJLzQBvaUKkaUd%2FRONwwcB8YkRm1kFskNN%2FeOlFTekvnu%2F2D1wt5Z5WUeU10ScRP0aVRn71nJLBFlO%2FF90arFSMjJ1kOrjqOWHNKHZqJw%2BJV3hGJ7VfnSUVInd5kRdzJb9ZqrTb74wRaHVvAvmThIZ30imINyYJkm4tMDvt8DYrFW%2BTBof7e0mpYP0hs7uhLjK%2FF25mjH6DFYiSuZsWTIGXp9J2ynUynu904RuQFFVMC8939%2FjEmhZ4yziqvVhnoDIKKsHVLju9LiVJAWg2tyGoILdVEk6R5pN4HRnfOWu1C8mU38iJK%2F6Ean3bZSIKHst64QgcMOOu6M4GOqUBTGgLnOB1IO8oMlC19LMg3grCTI4nnnuzncdTr%2FbyS4xkei%2FkPdNAJIkjMI4nvYrf7NpK3GoNXl4kPg%2FhHZioauEH9j7%2B15foUDN37kIvRSTIp%2F7aQZ182TsPDb13lCg8WiKMLputU%2F6YJozCiCgaPLCoLFe9qjV3BLpQp5GqQ8r2TOQJihZmp4WLWIXN7nI9pNUpwjAtbe2TmGpt9Sh79Xpr9LWb&X-Amz-Signature=c0544a07b1fc61cbdf7c029a243e8170834ba33b4fc6cf432c720fa1d9998905&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRWBJOAB%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T152107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIDw1XtvUpMFjkTKCox3WJt7dbqSwYLZTFXjGC1HvjC54AiAuYEFVS7UABkSS6jbGMaGt6CaOj%2BRfHxWQ1StX8APIOir%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMbpzQQ85jXeBDPZu8KtwD0ec8WkU6wGReqlHNAgckmOYiXhSGfAH8uDIhjHZ3E1aQOg6WERBaDV1Ly%2BKZxQCX5YtXItz5JrMqYyzJ%2BVQz%2FUSrGjURvp61mxIB6dmZAOgvP%2FJ0X47F4ISb247I5WS0ogGPfBmi53veO67bMx9srxnH5mgdMrxVDB6EUnqJCcBlnWPFXwliqktEepo5sEvX1kqpLLLuxRINmh7e7%2BIGvSk7SqYngwkIkjndRoY37pIm26G%2F3NhEbJp2rPz3DTlhtCGiBmuEBg%2BS%2FEjmy24t9g36KyX4%2BQW%2FRbPX0d4vynESMHGSBCohL%2F09CNoWx2v4ESACu%2BidYb9b3keW0b4JLQKdv6xaD0JRKSKGXBEc6fHboWOakbn9KUuWDBMxS4SVxaC3d%2B%2BN2D9VAJtP0YZ3tgTwa%2B%2FLfQSfzLGzYNoGxyb0lX56eKhGmvxWnxHj3%2FJadlQnHdkcZeq%2B6ZYBiIjfMGCp7pFmw98DT112RtcNCjf%2BVL%2FwmDLKazlXWgSEZRWfmg5E6zuHt6xd13ahd6wfewopQ%2FAsV%2F1jtART5YLiLJbhcJM2C3h4abn1IDmhRrIkNMNdMUyqFBQxpF%2F8mumVkRGqWits%2BumqycdLF9Ef6ndmhuBn0oO1sf2lM6gwpK3ozgY6pgFoA1DMv20xs3qS630k2gm3OZgEo50jUJEewzbodujScqiPS2x7ON7XNHd9mjlzgyD3U0r37GqHVakKNlwCS2nxvqzKEIsPK04qBvWz3yXm5zk1KP1gd8oF8Uv%2Bs%2FWHz0o17%2BW7Eq4%2B1rRpgdq0oNZx%2BWO%2FVt9FTXwWdiEKmN4JZYDAcQC2jirZmQi%2BM%2FpCZbD%2BwwBtsFHKoFz2%2FNxW9q93Jw%2FNBiaZ&X-Amz-Signature=7db70a84bbc2dacd9a27956198f0b0a983310ebb00d82fccc5b2706fd0577724&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCEXVM6E%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T152114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCG0Mtc1uI5MnQwwtSR7LnETgraSFasbhEvnMKFs4EFRgIhAI8leo8pzd75uFgcx0SW5U3eGnAyapLhnG5f%2BMnjeLefKv8DCEMQABoMNjM3NDIzMTgzODA1IgwshTuijKMsDD8QgoEq3AP07CSMuP6rg5nTyFhJTymkF9qak7ZCA2jIbuQ9%2Fk2JZI%2B0qeC6YAfuWPmuddvH8%2BUTlZl7QKh%2BvHKgfCLqtUvaV7EItdWU6050eVSQEXmxy4PqZTqwO4SCSFEiES5o2fCFusU6WVvyF1UhH2KZ2oBolK6Wg%2FA3s57V5maF0J2hb1W%2FuquC%2FgFtaptWWwTocaVTf9awGbl4euCIUvTrtIIkTj3ZlN16q5nvEQDI%2FF2SWv8rXU%2FymhxJzSGwnNVyGpyOpRDNzt5DmDOlROYB01n2zEudkygQF3EcMEdPx4Y2JDB%2FN7R0agligmmdyRhHNA9T0grDnGy7JpM7Tiu30MapPA%2FfK%2FjiNY0aNGBYG%2B4jhiHH8j8pxHE9bYL6d4qUqFvSq5ztgf1KZ89uCJNTGygrqNpWMz2OjDLdP%2Bw8gRNleLaZlsxqFAK4rn2kfh3EAPZsFjSmolTHO90X7kuyYpUqML1Xk14GhR3UH8b5EKBHnTsBj1DFxwCtdsEWLy7WI1z4fHWzuKtLRACqNO1VcHjlccJRYE%2B3asbA1IaKafz4xNebRDKCxjPcdfEqZTLnea91RcsvsJsJMAM%2B5a4kBHAyW3VLFfOYtoglETm9onZ7ZyeMWJ8px8ZalLP9dzCosOjOBjqkAe8XtybBWiXUzCLYXMEyTkCFuLkQeJ%2Fuu6lhKVhG0I9ExWk8CEx5opBmoVY9wx2gcmAm%2BXoT8Sn5rRNeo1HuWKL072dclu4DMn9zsCGtCM6MaHmyQB0Fi2N1u1PDrwJAo6Zi%2FdmIIrgSMjRQT0b%2BDadivHV4DWTFN%2BP7J2H6%2BPNa7boMRfiOi9k5dUCrzDjH7g48S9DCDNXxBsG%2Byc12XoLrhEiX&X-Amz-Signature=d16f0b44be35f9d162b538b806f464b9769a75a60be5311fd2485046b264261b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCEXVM6E%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T152114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCG0Mtc1uI5MnQwwtSR7LnETgraSFasbhEvnMKFs4EFRgIhAI8leo8pzd75uFgcx0SW5U3eGnAyapLhnG5f%2BMnjeLefKv8DCEMQABoMNjM3NDIzMTgzODA1IgwshTuijKMsDD8QgoEq3AP07CSMuP6rg5nTyFhJTymkF9qak7ZCA2jIbuQ9%2Fk2JZI%2B0qeC6YAfuWPmuddvH8%2BUTlZl7QKh%2BvHKgfCLqtUvaV7EItdWU6050eVSQEXmxy4PqZTqwO4SCSFEiES5o2fCFusU6WVvyF1UhH2KZ2oBolK6Wg%2FA3s57V5maF0J2hb1W%2FuquC%2FgFtaptWWwTocaVTf9awGbl4euCIUvTrtIIkTj3ZlN16q5nvEQDI%2FF2SWv8rXU%2FymhxJzSGwnNVyGpyOpRDNzt5DmDOlROYB01n2zEudkygQF3EcMEdPx4Y2JDB%2FN7R0agligmmdyRhHNA9T0grDnGy7JpM7Tiu30MapPA%2FfK%2FjiNY0aNGBYG%2B4jhiHH8j8pxHE9bYL6d4qUqFvSq5ztgf1KZ89uCJNTGygrqNpWMz2OjDLdP%2Bw8gRNleLaZlsxqFAK4rn2kfh3EAPZsFjSmolTHO90X7kuyYpUqML1Xk14GhR3UH8b5EKBHnTsBj1DFxwCtdsEWLy7WI1z4fHWzuKtLRACqNO1VcHjlccJRYE%2B3asbA1IaKafz4xNebRDKCxjPcdfEqZTLnea91RcsvsJsJMAM%2B5a4kBHAyW3VLFfOYtoglETm9onZ7ZyeMWJ8px8ZalLP9dzCosOjOBjqkAe8XtybBWiXUzCLYXMEyTkCFuLkQeJ%2Fuu6lhKVhG0I9ExWk8CEx5opBmoVY9wx2gcmAm%2BXoT8Sn5rRNeo1HuWKL072dclu4DMn9zsCGtCM6MaHmyQB0Fi2N1u1PDrwJAo6Zi%2FdmIIrgSMjRQT0b%2BDadivHV4DWTFN%2BP7J2H6%2BPNa7boMRfiOi9k5dUCrzDjH7g48S9DCDNXxBsG%2Byc12XoLrhEiX&X-Amz-Signature=d16f0b44be35f9d162b538b806f464b9769a75a60be5311fd2485046b264261b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623MAKLW2%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T152115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIAS9Ldo8WhFxq4QKqapDJH%2B8A%2Bq%2FF7rR9MqSfg5prSx3AiEA54wvi8ZP2BlftibqqFBO1y3p7tm0OeMEYuHZBQywZlIq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDCchru6v5S4HpxOmxSrcAxWdgxfzmQs%2FCPupaFgucLFyJcN9hzQEweeIisfMVAOdyQ1Sqi%2FEsZTt0dOGWgDE6%2BLCGHX6mZ%2BD7llArx4pX839b8jzWmFpDiVe9oUwgLIdsjgsnx2GNWezUM%2FF%2Fuan9KEZQaikjRcFfBYK5flo2an4cg0JsiT%2FLD8wlbVtiuKWH8L3uTZNntnEXsCYwUaQQK8Ax%2BHkDp0unfDB%2Bgz3p2t3JdzLPV%2B3TWhM2A4TCu18NR6QlKo32o0rno11XIzkAFnPMatMX4rHy0zpI%2BMPBcn%2BHge%2F1P698qEQfOCD9q60qHvwXry08F%2B3hGFgOviOUVnvJqB3vyAkxRnXyZWRWwlWr7GaU3ZKxy00xb772fmXzC5wkrqxl%2FKqEP50rbhsXjS7CFXz39XAnijeP6%2BO33SF8XrMJTa5seA9SNLmvL3ofp9uaDfYNQXvfcS4uSBfoM3%2BOYHTMohJJ9OWrAiBhP%2B9s%2BQcokMFsQSqz%2FJpqfm6BpgIMaFW5r9SM5dX2yfR5RzHWjMxlu70AgxehRTJrZZQ7ScEvJhCA6aDArbCDOhek5zcct8xQw9q3bqCjLwInWSo65N2Oo8rf8VqTVw45K15Q6QPjCx%2FhbEjMqo5cBu0R82eu1Y5D0hKCkhcMP%2Bt6M4GOqUBsbckJYmEIYrSDAcH8z30cBBUR9g2QFpD%2BIk3Uo9CnkOTY%2BlE3dGWiQZpK6z35GYXJqU3WGItfpgbgHmo47Rt9QGOvDVYH8f4Ugpr8k702%2B5iov6LvC%2BGuaCMOlkImVQjZMTO5QnsZ%2FsI08WCw1GXT%2BD5oHLZ0r%2FKyWTFoG6DVmjUlAlpzZhj85LYXDj%2FBF7NfVxsxN04QzONJDKB3oxN0ZwfnOen&X-Amz-Signature=04fc475b1fd62628c647fc002fe2572553e5d378e10ba3954468838051ee9843&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

