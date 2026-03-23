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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VI4JRNPU%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T154739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCrhnbh0%2FqWZ8dGKihYEzSrAZSOfF5YI446kvbmo8vgzwIhAJdtgHerLW1O9cAOaJNH7ZNLnC54jtSd%2F9XBqSeYw5RLKogECID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzZdw3yT5TPvNzRhwwq3AMwP3lOosg3UNoqrLvJNXCagVVlHH%2Bxg3Ti%2BWghgZvu%2BFoiZTdoc94trNIFGZK9QLzxNw%2FGLyYSra3EDXLDi320y%2FD4Qdryattuw5CqvelzZBTSy2RFkJYz6orzKvaPeKlCyz4vBjAqTS2U10naz3Gv9LL6ldZaoN6GQAvkd9dziinwtQhtEVrTgDcu8EhE3MIUw%2BJJ2nM6BaET%2BESasJEQTht%2Bo%2B%2FwUGp%2Fw%2BqzruKpp0QqQyoKr1JQ%2Bn1%2FM%2BaVkSSG2mj9uuXtIwOLOD62isFHnA4rDnBaWnvD4PViZszmWlcOX03KnPofdXYMfp9ydmcnxwW2HyfjWLcbZw3EnQbzRcGZ9UvekoeLFt56SinT7zFS4JcfORoqkDncDSmGh5b0PvuI4aunvoKr64D8EGTfZsBsM8%2FH5l3iw3%2ByyYKOHm900zC4BDlZrsT0BZo1uOW%2FCKGJjHdCubKQUUqAeqgPpXdXtmeOysmXy851oqKJ2B1KUogIrcK0%2BPLBXG8dyK8VgIdP316qCnbbb4xRfKfB9KFbIvLqywEXQvAcYjEYo1xW0vg%2FbCm6QYA5S8HTeN81DnDwKf4DnIZaAPQ0WClD86jnSJPm11whXDlXmPaV%2FRH1U9u2ZtahIEaXOjClooXOBjqkAd9rtfYxIwof7F1GQs%2FgYfif8MKjucYFLSPfp02ibcFkuFpQF5Qjhthj0zoeaRtV5i8MiVvd2D9C9wsv3frU8RF3VjDWWAq%2Fa%2FwJyEF%2FUksQAk26mqxPhGOumKeISzAsJpmwrppgcO1sJOK0gFvPTabEOHaMLZdcQPSCaZSnKY%2BMjs7clWhP1lATQ7mMMV%2F6uPGsn4jE0wFWrF7RWSz9%2BkHcC5v0&X-Amz-Signature=28d1f4ad49a110106a0f47558352f5c755d56262c5f9cfefc1fb14b3c0a1de99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VI4JRNPU%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T154739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCrhnbh0%2FqWZ8dGKihYEzSrAZSOfF5YI446kvbmo8vgzwIhAJdtgHerLW1O9cAOaJNH7ZNLnC54jtSd%2F9XBqSeYw5RLKogECID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzZdw3yT5TPvNzRhwwq3AMwP3lOosg3UNoqrLvJNXCagVVlHH%2Bxg3Ti%2BWghgZvu%2BFoiZTdoc94trNIFGZK9QLzxNw%2FGLyYSra3EDXLDi320y%2FD4Qdryattuw5CqvelzZBTSy2RFkJYz6orzKvaPeKlCyz4vBjAqTS2U10naz3Gv9LL6ldZaoN6GQAvkd9dziinwtQhtEVrTgDcu8EhE3MIUw%2BJJ2nM6BaET%2BESasJEQTht%2Bo%2B%2FwUGp%2Fw%2BqzruKpp0QqQyoKr1JQ%2Bn1%2FM%2BaVkSSG2mj9uuXtIwOLOD62isFHnA4rDnBaWnvD4PViZszmWlcOX03KnPofdXYMfp9ydmcnxwW2HyfjWLcbZw3EnQbzRcGZ9UvekoeLFt56SinT7zFS4JcfORoqkDncDSmGh5b0PvuI4aunvoKr64D8EGTfZsBsM8%2FH5l3iw3%2ByyYKOHm900zC4BDlZrsT0BZo1uOW%2FCKGJjHdCubKQUUqAeqgPpXdXtmeOysmXy851oqKJ2B1KUogIrcK0%2BPLBXG8dyK8VgIdP316qCnbbb4xRfKfB9KFbIvLqywEXQvAcYjEYo1xW0vg%2FbCm6QYA5S8HTeN81DnDwKf4DnIZaAPQ0WClD86jnSJPm11whXDlXmPaV%2FRH1U9u2ZtahIEaXOjClooXOBjqkAd9rtfYxIwof7F1GQs%2FgYfif8MKjucYFLSPfp02ibcFkuFpQF5Qjhthj0zoeaRtV5i8MiVvd2D9C9wsv3frU8RF3VjDWWAq%2Fa%2FwJyEF%2FUksQAk26mqxPhGOumKeISzAsJpmwrppgcO1sJOK0gFvPTabEOHaMLZdcQPSCaZSnKY%2BMjs7clWhP1lATQ7mMMV%2F6uPGsn4jE0wFWrF7RWSz9%2BkHcC5v0&X-Amz-Signature=28d1f4ad49a110106a0f47558352f5c755d56262c5f9cfefc1fb14b3c0a1de99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOCOM3FY%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T154740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD7FHoO63EemBg%2FLmH1BGgQXmNIsb1%2FyRtukjlzEzPAmgIgTpua5hppdVzVjKdP2zQrPhZTCOEKg7EQf7GT%2F1kzXzwqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNeKUySqKC2K%2FBcaJircA%2BNUQXW7fpwWp2GSi9Zyzu0gevJRkVpI%2Fb2tJBzcpkbLHG%2F8ljCl9jdUlG%2BTd0LVs23mx0vUlXPX2BPA3vOQ%2Bo6QfxOyQI%2BJ757cMdhzVRXgGtrbT7sDjgf5P%2BgC6hZ36e%2BN%2ByI%2FIAJDLbZ8d1mgy9KI%2Fl5q9vf1beIXsJE19sXdQpFgP%2FDPVSbOZk8P7JRY6NRyXeBJRLz8IRXyluCBykf1YDlxn74tPgXWvjnGR%2FsCw6zBFl6dZ4kcyZfqztBMpRtmaU4itW6FpB%2BHyejB9HupWDDBXGiMicQTwgSkmY8dJvItNeLrX%2B7gdYwTKOPXjJEE9Ud6VARDW2NjCU4ok6U%2B3F%2FCc%2FrR8rFIovg0hfZsH7JblLzXjJWVMs2ekgdDTa%2FS6DoR%2FLgK7bRPuTk4l%2F7MqMhRRNojkapuyvqF2wo4Q7QZqMuMnmrwUIXJmVsMeVZaSLGXOaIrKP5K9%2BmTwItE9rxBdl2FTl7won9NHFek%2F%2BmVh939fjwadNxlGARkJgJIxQlmoLtgcEHyMnJC27oqGf9JuNKeyRP1Yk8eA3hQbeYEWivd0G5wLk5SzoPlGLZnkq41J6SE98Z4fJONtrIgE775Y%2FG6scuU9PxSu2eGJDtr3vdLKXDT5uefMKCihc4GOqUBHHkMfttouDXU5tB3zyP8JtuIFcqxOJ8W1qiPiSArEK6qAx3AcqRH%2BqaX1P8%2Fb5Aq%2Fu%2Fn4htOFMAgI8CU82cEJZ0mAaqGjdp5D8CF00PEe4a4%2F%2B1AWUehUEqSOOPKpN68Ibi8z4ALsgaMYgUm9YD%2Fe2FfSgzJSvBnDaUGXinbvjnAxo4XXNDP3fEQ5K7dHfOkl5trQ1mBpT37o3MVGQG9JD4FCKIN&X-Amz-Signature=555ae6e82a4885ec911748105a72bf4ba2677a27b7026bbcf5e73ca2289480f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCBX7JVS%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T154743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICCBEBZAc4dZmDF%2Fr6jx8jVrWOHHxnWAAAc9YlZHdPoNAiAoMgztHwlIXQnAE3gejIT1v5bTW8fCj20ql77AoY10pSqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLZ798Rw4012vjqrIKtwDw9MxiWf6uMnSSfjSI6K9%2FxzNVyqG%2Bv8hE26IeqdimbPTwJbArRboYmeH1rjxPJ9q7ygWYGT0eXAeSIioKiWhBAYwXtDd1a0H%2Fsb%2FB0p4kWMRbgNIapZT4pNr9fB0tvN5Kz5TbWJ8L7LZ%2FuV62IoXgySLFGQhu24o0h6i%2FwYGeMnOqAowqotqB0xITIokimMbRxaj%2FJm%2FT2EYTikkbFLokHxcThsunNZPh6qQPSeISUYsMqPvDbmbyV2kWolYeM%2FPg4BI2aG3WEGiRE3sJOpvHZD8Q8UmCQ0UHTk2A5b0%2FO3KAjm8PiG7WCyvP4jnvdcvsHwHDG7sXZbTYmFyLJ1m8L0d4C8t3lGdbbBhVPeIptMzvD0KsV3%2BsSG%2FZaJOTnDQGyzFTjTXWm6X95dcedxvc7g%2FuHycyanzw8t0JcOi8cAiJKp%2FFMf1RdGfpc3GGD9Bp3PgzieRGw4hU41LNj4dThMZT28I%2FhV9G8xBUeUcQYQZqdZTr%2FL8tFFFnEoYrexI%2F56TTqeJlXyfXWkjV3WGAcVvQtosaGWL2rJI716RPiJgaZwtwBJLB7n0nkJVP6JLoMQbP%2BJoDu8kO%2FKep4ErEMb6tMWST9GIdFaHu%2BqNpTdno%2BWtf53fwsn5FRQwx6CFzgY6pgHvaTtl22nvx62Afo81FusFQ%2BNoSjQyHqcOgklG7FmV8iupzo3P8DhsxS3mT%2BB30Z56W9aA5gdXCQYQRxjk0UojOXN0KtMhbV7U26HXNPWK8FAlNnGJ7EKYpKGH4McS9OTZUSPqZuGkiPKUZrEelL6iWopLOvsxeu2Gqs6nTta8P2CZmTDBzZv2oFdPPn8vzbC0M6WWqDvjRDfrVA%2Fa1NO4gAAD%2F3EP&X-Amz-Signature=6096f99573ecb78481d8dc1b4fded741ba03ab313e67bde9acf6d937fb017821&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCBX7JVS%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T154743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICCBEBZAc4dZmDF%2Fr6jx8jVrWOHHxnWAAAc9YlZHdPoNAiAoMgztHwlIXQnAE3gejIT1v5bTW8fCj20ql77AoY10pSqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLZ798Rw4012vjqrIKtwDw9MxiWf6uMnSSfjSI6K9%2FxzNVyqG%2Bv8hE26IeqdimbPTwJbArRboYmeH1rjxPJ9q7ygWYGT0eXAeSIioKiWhBAYwXtDd1a0H%2Fsb%2FB0p4kWMRbgNIapZT4pNr9fB0tvN5Kz5TbWJ8L7LZ%2FuV62IoXgySLFGQhu24o0h6i%2FwYGeMnOqAowqotqB0xITIokimMbRxaj%2FJm%2FT2EYTikkbFLokHxcThsunNZPh6qQPSeISUYsMqPvDbmbyV2kWolYeM%2FPg4BI2aG3WEGiRE3sJOpvHZD8Q8UmCQ0UHTk2A5b0%2FO3KAjm8PiG7WCyvP4jnvdcvsHwHDG7sXZbTYmFyLJ1m8L0d4C8t3lGdbbBhVPeIptMzvD0KsV3%2BsSG%2FZaJOTnDQGyzFTjTXWm6X95dcedxvc7g%2FuHycyanzw8t0JcOi8cAiJKp%2FFMf1RdGfpc3GGD9Bp3PgzieRGw4hU41LNj4dThMZT28I%2FhV9G8xBUeUcQYQZqdZTr%2FL8tFFFnEoYrexI%2F56TTqeJlXyfXWkjV3WGAcVvQtosaGWL2rJI716RPiJgaZwtwBJLB7n0nkJVP6JLoMQbP%2BJoDu8kO%2FKep4ErEMb6tMWST9GIdFaHu%2BqNpTdno%2BWtf53fwsn5FRQwx6CFzgY6pgHvaTtl22nvx62Afo81FusFQ%2BNoSjQyHqcOgklG7FmV8iupzo3P8DhsxS3mT%2BB30Z56W9aA5gdXCQYQRxjk0UojOXN0KtMhbV7U26HXNPWK8FAlNnGJ7EKYpKGH4McS9OTZUSPqZuGkiPKUZrEelL6iWopLOvsxeu2Gqs6nTta8P2CZmTDBzZv2oFdPPn8vzbC0M6WWqDvjRDfrVA%2Fa1NO4gAAD%2F3EP&X-Amz-Signature=8bb77407e905282c1509469f4a2dac7041a471a1a317cddf50d5470c5859ae28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGV3MPOD%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T154746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDJeWwsrTc%2B7rtz2BaYjQL%2BpYaunfl3RmdGMV3RJAXNhgIhAIID9sv56H8wp%2FhTIclpouppCABGS4%2Fhk0iJfdcK46hsKogECID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxc2cXZdbAjbLLNMCYq3ANZD36kxRjUVkTC7wOkFyZ2rlwCYdV1toefSrNDpApiis77nV3c%2BklRqHPpQeFtWjJCfbgcSgBQfPOEH0MoNQeD8vRfua%2BntkmjV%2Fjv9MVr%2FmAmzZdZ5dkob6o%2BinmkEWXsTFFZpmcnjdSlfkSzCFOVS9a2uPDCls3P%2BFGglhXNs2aqCefQKkXUEJLM5uiB%2BsXGHxztWvtRyKRc93CTVji1rHUc4POeXek3%2FdOtwnJHN7ClFLRSVcFEPmXf%2BZaFHc2xirTGt74lqc5VLe2i2WQWN74lcGQE3TQGOWlWjQN1FZkc%2FsYJ6H1XAJyXkXoDtux8csvEpOBJxPNfJ%2BII6TFMAQrampTxp9Ffn%2FIhaM1rAo0n0lDbNdYIMvbLLsaWYkgrw0FqpiF3ruh4dWPW2T9zIXM5K%2BaEGuAj1aoY9G7XBz1fyBh3%2BaZ9%2Fwz1lxVvWWPXdN6vsms5yFJhe%2B%2F3TNizdgYOgWFybvQDXGweiGNfTvd%2FeAid9P9K%2BJVZ6Xr1cXq3SQOnxwMlbrH0uSXvwiyDNW2eZ3L4O%2B3Ezh5bP%2BJEFTcYCxfC34WgBx0k71K6aRqoUrAUlP%2FjMiVRlCQW9hToi1kWYSkI0LtSZo68Bf0YOHmTVfwDRVitDzYA%2BjCeooXOBjqkAZy6%2F%2FJV8NlDb1xvdbv4ZbY0SG1rPr5rmS3jZnc515PUbs%2FBEp5POgAdQYwZyz20Geq3PZg%2BdTk5o2uPBRgq4tznLEHnj0mUZGAEF2jiBZCrzY6aMq43KpHOR6mssrGu1zq%2FdwKvdtwcyzhyf4oD32w4FWcbXxVo5H%2BEHcuquQYmcIi9TazSusYh0qLCMioWb2E3rIcnm0IZxwUoA5765yxspXT0&X-Amz-Signature=67e407b11c7fa6e8d22e4ac4d90d9f29a3cf50a60f7bc342b8a63c3d4579aea2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664G4YFTAD%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T154747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICBPZ%2BBGHe57kMEef2bn2pt2ZjT4a1yd2uZvkqP30Z%2BcAiBR4Izn9FCY9Jypr05yvPiYySIhuBfiIo1P%2B5p6b7%2FDQiqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNeDjOe7P9XBuXRonKtwDEuKHEl1xqaG4zchkJUdE78JO9RBtFgY%2BP2ee58buwbOGhQ8rwFKbXGxj3vs1MTMKKUDH%2F9OoaU%2BI7XScjkLyaOnMO1WChygZRQNqUSqNtIWo1pjkArDra2CXhr%2BEC2ScSsvyCfBtjSu7EbGD9F%2Fih9A%2FXaG3Hcl%2FsQZg8SF%2B1F7FdXji50gmiaFo9F%2FCGwSrAskvyS9QFQVB2lXGFkMeBSdA8bhfRBawMadXZcE08xIcv7Zl1Sr6aLnWjl7sj9PeIqc%2FjErJHXu4SDv7aR3WVOHd64Rfgk%2FYdW9V51JYYI4XoF56Rhxw6aRns3ec%2FIFctBTGWM4IgjdNyDt%2FRJW6WcLwk6n8nVagccy2L75ajg%2FvEN4KW4fVgmqxQIB0U5KHbnCyHtryeIVE68h2jClMxcz7XTyydeSfmla5y444%2F4zAgusd4YJPFSoVItTgEtm0EV4IETtM1xCtOENDALDZleXIG9xx0lrg65GU49v7DbWkxAdjirmG0y8zvelkO7KUoj2Tuf3yU0khKEgDVHoFcoZwdgE%2BPTdacIhlnRjZ%2BVo9L8fGA6KQuRR1CP9dAxrkGRTMq2Bfl1ruaNxa0RFQ%2F1L1dJGiXLCppeDGTJXRhtznXhJbrH5BTxwOyc8w%2BaGFzgY6pgFGp7%2BPZxZ5ZEttThzp2hyxMfpzWXCACMcbH55Q4L8RBw8DrWAWrL9ubYJME%2F6nlRbinDG8Aa5uu7PvAQs0cAd7fLIK%2FYplbjn7ZX0tXs52DbVuWZmFvQRLGevndeqw5ZcBcJR5DpfC2OUMxn3HCPsY%2BcxLhpR7eohC6QgKbgquXwi6h6ETnOmchvkifcoyRSzVLqa3dCVyrmfkyHS8FBnT18wfxhqv&X-Amz-Signature=eb129a77b695ce8979138ee8fa8169b2549ad1701736969d9a4259e480a871a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667E5ITBX5%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T154750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE1cdyuAI2Evzsp8iAJgW5BKtLA%2FVkqBcCIBE9GjyLopAiBG1sj96HLPiuqZRkVQmGAeMZEFkq0HV%2F%2BOCxeQAyfElSqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAf5gHAJD3gsDFnaUKtwDHZlrftHgflhL3EY6jaV3VXXsiT3IxyihrW9pGO90z2btgqaqssV92jseagLJ%2BXbWR4rwark46x6W18fk9a4mYelMigLyZiUpbLAe4SU5c57sT6FUrOjNsPs5hzfXmw4VGiJdmB8kC1X5BRxQXQKrCXGduXnng5fzCO9i7pa0ESKWIq4GPPw1VI9drID6IRvNRt4E3JrGwImo14GmFO%2B5miAFppVter4OB6R%2F7xTF18yam9P0ma0qGhCzwhzBdAgI6Be%2FVfIJbLxWaR7ww56jHN83T1Wzy9H8EG9XLfHQmCIEfLFv9JVPyICCs11j6JN1WiW81ixvCWB1HYU9IClVviNUxZwp2E%2BUVrLmaL67iy92vxOstVw9ScEq9G9od6heh4Tl9Z58hT%2FgZxgk1%2BK4En8OfClSyogpFy1C%2FroWtNSik4At8cRkygHt2Jgez6pFXz00Pd1mFM9kVN1W7k4ReOgMvBJq0h4Ze21NHaXxEzuDZacfLV10FBU82W6dtug8h6Tx0%2BplVjAjHYB0ipU%2BQDx8B756Fk4hsImxJG33Qh6JuKBHD6so4orLr4poWfl8tPqFe%2BEgCZDSfqc2J3eIdh6I%2FkDprVc6z120I8Ceo9kZzdNyHEDTFtz1tCYwvaKFzgY6pgF%2BBIndZydkDW%2BMIKs9rBmxoPWxQ0hZ2EUvCyWe32Hunqm73rLUb2RVfenAe82tENlp8AmIoR7InxSV%2B%2F9NgqXhjdea2jgwO8bn7KJBg7VGXZburXWO%2Be78F9vnp9kPLEKAX%2FxtDaL02h%2Fcmz7Ofx0lPuPw4%2B4nKKGkcEiJJ8kHwu7JwAfjc%2BAqZNAAQssimfEdJE9DazKuPbmphWUPwzZ3YVF8RxWn&X-Amz-Signature=5b42d2e8feb2ed3cfa520b510b37ab20902f374a75ae01009deb49b4473c0b46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQ53NV2Z%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T154752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC5UgiMMy3pVGR%2Fx0fXAZ2Bgv3HzvgCT%2FlNFUNv8kB4qAiAwFX%2BpBn98S4wWWzIUiY3tLG4ugV0%2FuwhabqGUuFvjKyqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BNwIF1%2FodsCu1Y%2F5KtwDkeqKnz87%2F82iPyF8oooxyVL6aMB6wEeLgI9M8r5N30YqTUMMKAa1LQarj7hU6IgDv%2BxQFKlE1DFA5W9wBpyI0hdVHeE8OiY99rQ12vW7aSzJNcZ6Z2mZXUljTfpkT%2FKbqoaoGVCNtf9ctCizg7eK4JG9YAIOIWnEpaumYe4CCwhOcIgxH8VnYJydZISBgt2ToVFgynZIHXvRh0a7MxgnUAuC3pYU3zbQnKhUj3gjorL%2FpfOi%2Bxed9bFyOCv0hbVb7jtR2Ksr2lHGznEFArpEQwHZ%2B1tDfjbN%2B2hmqTs0a5Y9gbDgNrLwJ1LdCEf3SsZ227tliOe7bcBGeyposfiCIp%2Bw%2FsG5ruaxnNo7YTXk%2FBOh62RAhgl69kjR%2B8vf%2BMVP0HxMc5BtLOTyyFkvTBJo7XcSBdxcb7jAZlRS9kPE3UKTY8JT6ErdiAbRVz4kKBCWJw697DDNoCsvJlqrSjGV4HQfOkExGWMB2N6c37M0vaowE0QCnOKxZFtlkV2JE1xiKWGctgO6Q7IWnHlZpScAYaRlIAJF4TwfLfuBeFrjHaz9i2jMrzEM8onpq%2BvGMnYGYvVtk7q3irxG1I2Skp2FHB3xH4v7%2FP89pQ1wSAp6PyLwd175e7yLd%2Bud5XMw4KGFzgY6pgGD5oildBEQ3kubbocyTvGPkWWooCihDpUguEQhNvPdaxlZ4IElH%2FzqPgSMmDGxH0QhIHGlQYE8TcSmbkymue6MtrZHfw0%2B9sGik4HFH4mpgtEnlkWBkjLjOphN%2BxICndpPAoSxaKQR04u6rwTBa9%2BLKoEriC%2F7u2cwEnZJ5f6z9rlBYVMAzVtrgPhKqX6Yu%2BTuMjxZ0Ixy%2Bzxq9MujVlhJSFdfpZ1Z&X-Amz-Signature=ecb3a32b2c8bf79fac6973ca7cf0fac0b41d7599e04ea43bf2e688105db2edcd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQ53NV2Z%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T154752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC5UgiMMy3pVGR%2Fx0fXAZ2Bgv3HzvgCT%2FlNFUNv8kB4qAiAwFX%2BpBn98S4wWWzIUiY3tLG4ugV0%2FuwhabqGUuFvjKyqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BNwIF1%2FodsCu1Y%2F5KtwDkeqKnz87%2F82iPyF8oooxyVL6aMB6wEeLgI9M8r5N30YqTUMMKAa1LQarj7hU6IgDv%2BxQFKlE1DFA5W9wBpyI0hdVHeE8OiY99rQ12vW7aSzJNcZ6Z2mZXUljTfpkT%2FKbqoaoGVCNtf9ctCizg7eK4JG9YAIOIWnEpaumYe4CCwhOcIgxH8VnYJydZISBgt2ToVFgynZIHXvRh0a7MxgnUAuC3pYU3zbQnKhUj3gjorL%2FpfOi%2Bxed9bFyOCv0hbVb7jtR2Ksr2lHGznEFArpEQwHZ%2B1tDfjbN%2B2hmqTs0a5Y9gbDgNrLwJ1LdCEf3SsZ227tliOe7bcBGeyposfiCIp%2Bw%2FsG5ruaxnNo7YTXk%2FBOh62RAhgl69kjR%2B8vf%2BMVP0HxMc5BtLOTyyFkvTBJo7XcSBdxcb7jAZlRS9kPE3UKTY8JT6ErdiAbRVz4kKBCWJw697DDNoCsvJlqrSjGV4HQfOkExGWMB2N6c37M0vaowE0QCnOKxZFtlkV2JE1xiKWGctgO6Q7IWnHlZpScAYaRlIAJF4TwfLfuBeFrjHaz9i2jMrzEM8onpq%2BvGMnYGYvVtk7q3irxG1I2Skp2FHB3xH4v7%2FP89pQ1wSAp6PyLwd175e7yLd%2Bud5XMw4KGFzgY6pgGD5oildBEQ3kubbocyTvGPkWWooCihDpUguEQhNvPdaxlZ4IElH%2FzqPgSMmDGxH0QhIHGlQYE8TcSmbkymue6MtrZHfw0%2B9sGik4HFH4mpgtEnlkWBkjLjOphN%2BxICndpPAoSxaKQR04u6rwTBa9%2BLKoEriC%2F7u2cwEnZJ5f6z9rlBYVMAzVtrgPhKqX6Yu%2BTuMjxZ0Ixy%2Bzxq9MujVlhJSFdfpZ1Z&X-Amz-Signature=8a8a206a3a803906f0226937465860ae74f42699f3ae7b722e7ef47e27adb691&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XX6XYT62%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T154735Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGQE4iwtzxmUQRd%2BcAzrHEbRW1bc4ZC7v0GabL39IMLPAiArJILiJa4%2FvvDrt4siS5c6jfSJB1vXQjn3DNRpjcDT6SqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMC%2Bj8Zlbzvu9jisv3KtwDr7kY5SnxZiaSieWrTLnGCGkkGj6SXRNaEwwhzEi2Y4zOLRZB%2BeLcRNvCWO2QfTuNFq4ZAHObvamS4dPlf9z5X2dPMIZv5wNm0N0o%2FU1FlqqqmsaI3CmFXicoEEgfcOqKSHCJ3%2FxXx6L7V5FEe0XJq%2F86OnCoOOJ7%2BAETMguJ0gzdN%2BS4Mmwg2EbtLeNFzKqHAlwMlmcGmSa4yy3k%2BDoIpcQMhly%2BBsJHhYAqE%2BBeV1WWAykVTy6%2Bq84YeiFsbGAK7RVyyNA9GjE%2FxqLKDx4WnHbo2dVdWc9F8BnhjwtTNhBOQItqPXlX6vTBH4G9T9vFmpBCuMqkbbT9AJitHWObk2frkbVvvWrZ4JtnppIQam4BSXPIeMw6mI%2FXXQrRzIUAdJQUbqWZ68aVh9OIuCcItMq%2Fg2PN%2FFG7yESMbHAoaPfs1MaUjRranEpcFmlHF9sWjkPoik1xhswt5wOim8FM%2FaG5d99PYzmpPUaEth9UiQ9B1bWR67aEiOhTX2JRVeaLO7QugOv4BzX%2BatykEYJ%2BFERw5tT5NHuswWMuxAHzXPfk069b93f%2BaQznyu5xw6KROl7m%2Fa9NS2Htw%2Fh5nc44SE4%2FvCLeVVfo7oYBVUNV33IwA%2FAjx8Z1kOuq6G8ww6GFzgY6pgHakeD4i8v822CChLuH3wolMdFn%2F7Q3USlLOaQNo%2FVfWn%2BbAOBpSHbl1%2BZkaDcxoMcI%2BkyREmys9cqrdshW%2F%2BCSMBcOQStnMFblXfUn8eJXJOq%2Fgztt0VyJVVw%2BDcyHXZ6gSiUoi0hzhmUZLoPAj9ENBj2%2F5Hl7NdUzFYSsypaDCBXK%2BPYMoay4RcwouXtdPGw3jPfNuUhLjvu%2FauxH5aejZKEVx1vD&X-Amz-Signature=6f8fe1a633264709aed45f055a5bb1453cf95816a344c810749e2a3fcf5febb1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GVEBNBM%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T154755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCNFLtK01JOXVoTASOifIrvv%2FYlEMQdiKIp6dHg23YwkwIgPOclYN96cWnLcfTWuHJ26q9ksMbYT2N3CdZMeszjsKQqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOQq4LosmtOyh%2Fdh%2FyrcAxClybceIjRgRvSw60aWRzINdPDvtqxqtetzwBl4a6FSzvXa0bQxIxj2bohSU%2BI7gFixCiFhCQVmZFldNTSpMhLaQo%2F3Aoxqnx5jy8fH7gcUmu0aKivhvEmE7rLnIROovVzoiBFiJEAl13XxUT37kMs0Vl6qLOWWy0XIMQO4UTDZjpiQzOMJSsb%2FF2Ng99aiNbIemb31fM7cP1RDLiwmDeX%2BLoRsDZloAPzQVrjBQ4StLZ1aHNMXFmMhbiV65JuyuXHfk6xAQkyIzIc%2BjVEvI5dfTp%2FprWNPLtTZ9mdB573xVXyNV3ltnU5O3FUlVXr1yoMGkp2QI7iLqjrqHLwHQQA1CJb4JtQz0sYHm37CZI9Erw18J8hKTKNzAs%2Fe9ZWfrVs%2B3nG1PBqOMpd8zAK7XOEkbhjmEl34ih0fajrgYHuaBhcmLigLHF%2FAjYbYlFP0A2Xm%2BBJEHzrJKNyA%2FFu82yOLfzToqXxeO6%2FUeCHMBuCFwpf29E7yaxwz1X7%2BfOyfIbABPIYtcBeUIZjazdWoWwHshiwGTl2fRnV0SgdmNzljMrKMpK6uOpLhGFPBlQ1jjNPTpk7BMT5icsUgqo%2BrZVJOm%2FAtqOaP3GbsuaeovtR%2BpmfygWGW2PYmI4x%2FMKShhc4GOqUBjmMTmd21%2FavmU%2F%2B5RI7d2DpvZKWo%2BtcVkvaYzRMwhkmcVPsgeXwXaUy9e0NeiWrTHV2%2B9snlYXfMPUGZ6UIQuLLisOeuLdpC7ePk4gZpK4nJ6QDgw31zO%2B0Q4Wy2ZzwKFvyc4QxzDa2s9ow0PGLIGdhk7EWiMRLy6G9HumrgV%2BUoFInZfVZi7W9WyD5Cfmchg5Sx7WrsISw7xrQ5Il88C1xCJyli&X-Amz-Signature=2cd35b5ef52c754ffa0637116e3c8eac6f79cad9a56470534af97aca36236161&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GVEBNBM%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T154755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCNFLtK01JOXVoTASOifIrvv%2FYlEMQdiKIp6dHg23YwkwIgPOclYN96cWnLcfTWuHJ26q9ksMbYT2N3CdZMeszjsKQqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOQq4LosmtOyh%2Fdh%2FyrcAxClybceIjRgRvSw60aWRzINdPDvtqxqtetzwBl4a6FSzvXa0bQxIxj2bohSU%2BI7gFixCiFhCQVmZFldNTSpMhLaQo%2F3Aoxqnx5jy8fH7gcUmu0aKivhvEmE7rLnIROovVzoiBFiJEAl13XxUT37kMs0Vl6qLOWWy0XIMQO4UTDZjpiQzOMJSsb%2FF2Ng99aiNbIemb31fM7cP1RDLiwmDeX%2BLoRsDZloAPzQVrjBQ4StLZ1aHNMXFmMhbiV65JuyuXHfk6xAQkyIzIc%2BjVEvI5dfTp%2FprWNPLtTZ9mdB573xVXyNV3ltnU5O3FUlVXr1yoMGkp2QI7iLqjrqHLwHQQA1CJb4JtQz0sYHm37CZI9Erw18J8hKTKNzAs%2Fe9ZWfrVs%2B3nG1PBqOMpd8zAK7XOEkbhjmEl34ih0fajrgYHuaBhcmLigLHF%2FAjYbYlFP0A2Xm%2BBJEHzrJKNyA%2FFu82yOLfzToqXxeO6%2FUeCHMBuCFwpf29E7yaxwz1X7%2BfOyfIbABPIYtcBeUIZjazdWoWwHshiwGTl2fRnV0SgdmNzljMrKMpK6uOpLhGFPBlQ1jjNPTpk7BMT5icsUgqo%2BrZVJOm%2FAtqOaP3GbsuaeovtR%2BpmfygWGW2PYmI4x%2FMKShhc4GOqUBjmMTmd21%2FavmU%2F%2B5RI7d2DpvZKWo%2BtcVkvaYzRMwhkmcVPsgeXwXaUy9e0NeiWrTHV2%2B9snlYXfMPUGZ6UIQuLLisOeuLdpC7ePk4gZpK4nJ6QDgw31zO%2B0Q4Wy2ZzwKFvyc4QxzDa2s9ow0PGLIGdhk7EWiMRLy6G9HumrgV%2BUoFInZfVZi7W9WyD5Cfmchg5Sx7WrsISw7xrQ5Il88C1xCJyli&X-Amz-Signature=2cd35b5ef52c754ffa0637116e3c8eac6f79cad9a56470534af97aca36236161&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644KKPS3S%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T154756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDy9lb7%2BtjijBp0kqPUBXJmEynaeGjfChyk6zcEWkLCFAIgGNaGrl6f%2FAGqmyngKC9KzY73SwBT7w2AsgdC8TbnCLAqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHO4vaL1Vil0J1PT0yrcA5TYLaePSnLif37gruDTHd4J4f4T0Vi%2Fqsohvagb1VyS7%2BmJTKOQ6l51lHR%2BkiI8cg9%2FrrI19zOZE0aVAOFnCv8m%2BvGB7NIO%2BJa1zddpsKtF6EJjRwNEAIYklTmMS%2FcWyIGoiVQTniIS%2BUtx61rNwYHX%2BY%2BwKoMV07S1SMo%2Fd13l6uN89w%2BAuW%2BrHB7m67nMHEOh9SDtS6Wm5MMMy2lxtxsYJx7scOg6L8zFotnZxvjbcf2EtbTPIuTQo%2F2hUeRGpYH0XxzLw89EcocSLZeCatkiNZBHHZVdkYyCbLthf4WZir11RUKNCH4tNohcp%2FV8MzCPn3UuS5Yl%2FBdG%2BJpODN9W1H4dRF%2Bfl3tsHtyPpoTX6QVf5y0NCZgdWhaMEy7OMZ0%2FuxDJqI5B7s8xt8GrCbF0uES0RSOZ4GQdnz7PZQq4iB1D5CZb4s43jZct9Anaw7OQKsF3wv5t0uNYcXchNGtqq592ql6kbMRG%2FX8VdZgNE2hKNdmDhlykAtOhJrLh4%2BCASFiEtSJsR9Q1vltaVNGphIBlBds7e0JUUIZ%2F07OAfFTo%2BAy9Gc3w%2BktDxLg71liCuLBqbkHrnY%2BeZKi%2FRvlFnCQd7YyBKVFvfQCOcFIhaukap7%2FNLVaH0gfDMKyhhc4GOqUBkdlB3gVOqifVELfcM2uLZTBJM1XRGV19O6gphfPv%2FsomRKPCBFX%2BfLdH%2BRkwC%2FxgOK5fS8JXXKPVqAWln3bBoDlT3%2FaUKvRt5oXI9JcMU%2B9095Ou9K6XlRLGxBiB3xrBQlpgRk4OpyFa3y10cX%2Fa6P2I76QUvldsW1O836QNIJ9eKiPbzDvHVW0S0bK0eirm8Pdi1yeIaa2XukeQZFtNNczUtbXZ&X-Amz-Signature=4b825a8075b07827ba3e514798650094c91d0ce8c8e0d467d9a843ddc1e749b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

