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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHZNUZNU%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T154226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCIAkEbTOBUr%2FxJ0EtX13xj30VgKBcU6xOElxosstNsmk2AiAG3Hm5bTiUeVg9aZiG4NIomgHJ9IBbUUCV8OP9ZAX1biqIBAj5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM83i3pqxvuKx3aKDYKtwDdTQNLx6HJ%2FRGI7wDu4Tjz%2FkYEQZu8S2mFng8WpdHsS2FKGtCF4dlxY568gP%2B94bRhr8DMt%2Fh3tgYYjTnbOWZ3I68WmZB8dQ%2BBaMT6F9zdX0yR9BSsZoARmFpR2U2LAmn056Appoc8TaUzLbwvR2Y6yh0gwX2dl2l4ypJOg2qdjBP8Gt04d%2B6BRz5yBFDCF%2FcbvQn0GC7X6EeYpkzoIpFFK%2BIprhHVseqG8Wl5seUbZyTfxGw8XrbgaTTUoHtwdaNNjdzNhravdhaIwHEXyV7u8kGcpjwSceD678TAxP0CkjBS6aIuxUEjcXeYp%2BemEIOadTb%2Be6dBoO9XGA2u1ccE%2B6xlH218pwhNBuOuOPv6WWb9ioHB1wcTJpYVwGph5df7ipv5EGdarpRkyxAMjGP%2FM%2Fs%2BVDg1DRwU3X9qh6vrlb9SaAewpBTE93KwuHsjBXeuYFKCs%2B1zdBeK%2FJnuu7ljza90z5MC1D%2BxbODo1BZ%2FcnnIo6ksH%2FINFav5bz8gzCnc%2Fk2nHOKzu4HFGut%2BylWI80zbCEZjUXT6uEktbIFWmZkJqv8zfAkUxFxqBmRYT8ZpAA%2BZp0YMr4FfNRmrk6%2BCBQpHn964RQXnR%2FRz1C7MUEbsIWgUrj1qE6iJHUwq4v3zAY6pgFqtF5LUFJvVyIbIICmj23c3Fc1O7sM%2B6ps%2FEeFKbJ35JesID5yq8ESKUxv1opYzioznCXsXDG8wLJ8Mb2kxOfPlwwrlIwkAP4NpYOVH7J3oNIpWxhgU1z1otcdbvIJ7W1jPIfIOpl%2BinPjRBtq0kMO2moNJOcP20fVi9XZXywdupSfzLKC24WV6GukujdlyB9vW5u%2B8V5D%2FZQ21ThRT8GYKW3HyfYh&X-Amz-Signature=2722f2fb52763206e83b261d35ea7e9e46fae49dc0e42ee4a4f5abebfe38c790&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHZNUZNU%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T154226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCIAkEbTOBUr%2FxJ0EtX13xj30VgKBcU6xOElxosstNsmk2AiAG3Hm5bTiUeVg9aZiG4NIomgHJ9IBbUUCV8OP9ZAX1biqIBAj5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM83i3pqxvuKx3aKDYKtwDdTQNLx6HJ%2FRGI7wDu4Tjz%2FkYEQZu8S2mFng8WpdHsS2FKGtCF4dlxY568gP%2B94bRhr8DMt%2Fh3tgYYjTnbOWZ3I68WmZB8dQ%2BBaMT6F9zdX0yR9BSsZoARmFpR2U2LAmn056Appoc8TaUzLbwvR2Y6yh0gwX2dl2l4ypJOg2qdjBP8Gt04d%2B6BRz5yBFDCF%2FcbvQn0GC7X6EeYpkzoIpFFK%2BIprhHVseqG8Wl5seUbZyTfxGw8XrbgaTTUoHtwdaNNjdzNhravdhaIwHEXyV7u8kGcpjwSceD678TAxP0CkjBS6aIuxUEjcXeYp%2BemEIOadTb%2Be6dBoO9XGA2u1ccE%2B6xlH218pwhNBuOuOPv6WWb9ioHB1wcTJpYVwGph5df7ipv5EGdarpRkyxAMjGP%2FM%2Fs%2BVDg1DRwU3X9qh6vrlb9SaAewpBTE93KwuHsjBXeuYFKCs%2B1zdBeK%2FJnuu7ljza90z5MC1D%2BxbODo1BZ%2FcnnIo6ksH%2FINFav5bz8gzCnc%2Fk2nHOKzu4HFGut%2BylWI80zbCEZjUXT6uEktbIFWmZkJqv8zfAkUxFxqBmRYT8ZpAA%2BZp0YMr4FfNRmrk6%2BCBQpHn964RQXnR%2FRz1C7MUEbsIWgUrj1qE6iJHUwq4v3zAY6pgFqtF5LUFJvVyIbIICmj23c3Fc1O7sM%2B6ps%2FEeFKbJ35JesID5yq8ESKUxv1opYzioznCXsXDG8wLJ8Mb2kxOfPlwwrlIwkAP4NpYOVH7J3oNIpWxhgU1z1otcdbvIJ7W1jPIfIOpl%2BinPjRBtq0kMO2moNJOcP20fVi9XZXywdupSfzLKC24WV6GukujdlyB9vW5u%2B8V5D%2FZQ21ThRT8GYKW3HyfYh&X-Amz-Signature=2722f2fb52763206e83b261d35ea7e9e46fae49dc0e42ee4a4f5abebfe38c790&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RONU37MT%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T154226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCICOIQd1B7fhwSLRPSeCEJhnhMmL4j%2FdFZjURwlyyQ3VbAiEAuGqZ%2B4tiRcqKTMdvTCo4zc7GXWl5m15Li9JO0puZEpMqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLngBdIyb3oJUZ%2FRCCrcA3YIwZIKRZox9y083Xl1l5HhgXuV0sxU%2B07uAbrCaVE%2BQrrTVmYgR1KFsgAraA2G9lTBO%2Flce3zVtvfPoIsaFcS89us7GgjWCx0uaPFJ6Ixmpo0E1Gh%2Fi%2B7beqdto95QAQHf4spPUWoejby4ixS35LyYm5bwWjo0oj78UqGgzxB8nmsQseTBfuUCGVm0bVZkzOjY4AcH72nN0bNHn%2B1FlCrsNAuElFNel8XvdqGOYNI7v4bcrJC3pC948KeIgOlS52BXiSr9w2zh%2BD05I%2BWWx8MmBillRxQttzsWreSADVTcWQyAQZC6F7A5hegURm974AzaHJDc3yr7TZN2sNIm1m32pCQjcmMVoViAHRb7hPeHT7ctnjGOZYFsauRgyPzTVXO0GEth7vrOruWMn16iyIDAbYuKEpwht0QvM8o547rRystpY1LejItGXG3cN8%2F7IBkU07czZAOfD8D5Fp6XxiZN8%2BHpN8KwGTeff7PDcrwHWjjN4aTZwPZKAsEnRpD9Xrf1eIw0LFdaehTrOgqTLFl7qW18Js6Y9A6owcmJ3aK1ojin2%2FEky9CCN4TGz69se2WHJNogmDcgq67cEmvWpq8eCGEEhyTr1Nc6L33cooXiRnaUExQTJ%2BK%2FG9O5MKWL98wGOqUBJsivQ6tW8fcioPIWo%2BBgIlWS90S%2Fn%2F6veh9%2Fj4xnXD8kjicTUhwvvpCIy3jWpEvrzV8AsLw48vAPZhaiR%2BM3KqlyB%2B6q7Tnzbg%2BKosolNye%2BVvmndcH1VG99DTJufy6rwboKpQVTM6ie3oyZIGsn2Muf4mwA%2FrgNO5EmA1NLw5bnhtk%2FcXjF37%2FrkGifr8emNVvkeYHYK25O5tfc6KWukSWMVfh9&X-Amz-Signature=2106f939ae110c8b7acef3c31c1a566180d9a93397505222f18c8a6d26d4da43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TI5ZCQNU%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T154233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDK4vTlou%2BGI7fTiSgewRsz5QvOnv22ou6X%2BLQdlPaNNwIhALNnzCw6fqoCrAz4QT5YEB83LAS3kRYbzdYIAW%2FI%2BNQAKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwlj%2FCvHdfzDHhJ0aQq3AOtS5HrHZsHaXm%2BIouLr2wfX9TY4VrkWxjgaZKJT9VODY3v%2FnYXSujvFnyEaHeQVc%2BmrxSvGrzzvXElnw7BU%2FF4gWO8Zeob4e3caJg78A9VKNsc%2BkswO%2F6ovhYnypLIJTFgNe9jOMNQdsCK07A1TpebS85iesLq18zyHIo5z1gYgTNoU3KLGNDYlnYclcUVbFNd2sCHETgxvwlWwiDDavp42Tl0LLpcnyld3GjvutBVjXHtq9LbNBszjHFt2tWBYkfwi3G2Ypr7uDXMHMPi4wctWSArgUZdnas2ztWK2dSzPcP4TAArEgwZ09TTNruaBSHccF1D0Iovj5rj%2BPSFhqNig6iIFh9C6KxHe96rsZh6ebxMBen2jYK52d3CoDWD2q15r6yxwGIbH5umqNfEUZpeQLJ%2B247B3FXg%2B6IlWvx4a%2Fo3Uzsa3qiakoRgYtX6XS5OknfC7G%2BFa702reX%2B4htEUsRjcWsiYVqUV%2B1WmAFJY2yTy7Jh2%2BQmIXzBe70sHj389CZApU6GLMTFLI07j14KrROqu7GH%2ByxO2%2FhYDFylbusD9HYbB8SwLGtR6iqqgitxr7uZzC6CAO1MHqL2zj1039ach74sxtSeEmgAVxgR2WENhlffrIesehs3QjDNjPfMBjqkARBF%2BrzZGWDPFAyEH2IW4000rekD%2FuBgoZpBgLrfo%2B%2FXqAaIeJuH7kW0kYI%2BmvEeMaNTudEHd0CvKFnSkIXaQPQJ1q6LpUjCIV3GrNG8gMfWAlErUba1ayG0tWE1z1UsxmhiebgVJIjPSj6Bw8PIbm%2BXXdFf433Zq2EJB7WqzN1ahfx47TUSYGa5libYcwz254r99LOgazUOHxezMCEZ%2BYNcvGtW&X-Amz-Signature=2ab659d66c846b119fb469fde8f70be674152da161d7a7e7e0d58a057af509dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TI5ZCQNU%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T154233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDK4vTlou%2BGI7fTiSgewRsz5QvOnv22ou6X%2BLQdlPaNNwIhALNnzCw6fqoCrAz4QT5YEB83LAS3kRYbzdYIAW%2FI%2BNQAKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwlj%2FCvHdfzDHhJ0aQq3AOtS5HrHZsHaXm%2BIouLr2wfX9TY4VrkWxjgaZKJT9VODY3v%2FnYXSujvFnyEaHeQVc%2BmrxSvGrzzvXElnw7BU%2FF4gWO8Zeob4e3caJg78A9VKNsc%2BkswO%2F6ovhYnypLIJTFgNe9jOMNQdsCK07A1TpebS85iesLq18zyHIo5z1gYgTNoU3KLGNDYlnYclcUVbFNd2sCHETgxvwlWwiDDavp42Tl0LLpcnyld3GjvutBVjXHtq9LbNBszjHFt2tWBYkfwi3G2Ypr7uDXMHMPi4wctWSArgUZdnas2ztWK2dSzPcP4TAArEgwZ09TTNruaBSHccF1D0Iovj5rj%2BPSFhqNig6iIFh9C6KxHe96rsZh6ebxMBen2jYK52d3CoDWD2q15r6yxwGIbH5umqNfEUZpeQLJ%2B247B3FXg%2B6IlWvx4a%2Fo3Uzsa3qiakoRgYtX6XS5OknfC7G%2BFa702reX%2B4htEUsRjcWsiYVqUV%2B1WmAFJY2yTy7Jh2%2BQmIXzBe70sHj389CZApU6GLMTFLI07j14KrROqu7GH%2ByxO2%2FhYDFylbusD9HYbB8SwLGtR6iqqgitxr7uZzC6CAO1MHqL2zj1039ach74sxtSeEmgAVxgR2WENhlffrIesehs3QjDNjPfMBjqkARBF%2BrzZGWDPFAyEH2IW4000rekD%2FuBgoZpBgLrfo%2B%2FXqAaIeJuH7kW0kYI%2BmvEeMaNTudEHd0CvKFnSkIXaQPQJ1q6LpUjCIV3GrNG8gMfWAlErUba1ayG0tWE1z1UsxmhiebgVJIjPSj6Bw8PIbm%2BXXdFf433Zq2EJB7WqzN1ahfx47TUSYGa5libYcwz254r99LOgazUOHxezMCEZ%2BYNcvGtW&X-Amz-Signature=c109f81697e18045745e090706c392a4e60db21c74ba6ade3c8cb46d781a4e25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466375AB4IN%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T154233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIDrfVKV94D%2FPuyaG703eceIqyo6sxAu%2BOA3gpY6iuAUqAiEA%2FeZmAdMSqj9OBUfY1%2F%2Bj%2FfTgTTrcGmPN9EkkD9MKJBMqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL85vdZUtNWiXBf8yircA4v9MjF0fulWq5ZOr2nArdq3%2BA09Csj5CzumFWluGjf2FMJHNEppYjc0MYRSkGtlxbGt1qZFMaBPoJfEMqQrz4tXKGybG5hqLEcpNWJTnBj5QMhbcjW17CzNlVKRgh%2Bdm6jh4EAFZ2oxSa1nblKB%2FCi%2F3%2Fy2sKveYEVQTlbaL5JHb4m%2FWgHlUYXJVGeSpViwly%2BTfX4qQJtoPH4ZntpbLQ%2BFUS1NeSzr9chyzjU0lKUS0RdlN2pAmnJSP7swnN1lfvrMz3WWRPBmSqtmk3W05X20b%2Be%2FihTzzol1sTc2UV2U4MO%2FpUo%2FLC8wUoqAVHffObQ1EUDJsZGmGRSJKKX%2BLrau5aFvEdcl%2F8QifyZc73DLjyuVx6abRYAACAZ2e%2BdTRQDGnsHbgftBA8fDGwqybkQG%2FAPEK%2F3zl83soVqjGK5WNjOuSN7P2qpKdITimZVIEQuG%2B4AVbrL8AcBqv8Zy2Jd6DxTppi5NnVn10e%2F3GY38QE9fplObTxZqN%2BubjjsbvqKHcF1NpCWkW3nOcInvoojan63LTAC3iZWIz0%2FIUTyEBNnyrxIBur4DgF0Atekkzo%2BMf95gNwdfdFxcNUBK8QWNlCcPP28B7H%2BshX73YYgNKUXs3cbZK66%2BKACLMM2M98wGOqUBR4yL3fmGn1um8aucPi%2Fve33RZAk0v0KFtOt%2FcOJCS6zZqC2nKZaI5Pf367SmAWI8A9c7fYVB1jmpp3q1uwVFB46SQU%2FCbLHG7DCM80ivu9zpZk5dCexhQDqmTuutT79iDNROaImQkscOHYbw%2F2vtRlY0nD6cdtIlrmVt1wwJgA8hzfJyffYaKk9Uji%2BIKz2U11cfFimQDjtFdHkhNJBhFMKsXR1Q&X-Amz-Signature=977ea261c50832958ae479039feb822553fa814519e53256d90dc3ec11cc00a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636LOK4VZ%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T154233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCICug8r38oSRCPThwNMIOHNgwKkVNdxkIDtWun0F6ODS%2FAiBROu%2BKMi5DhphwlWHgnOgBchXgQh00EhdulY%2BsYq4FvCqIBAj5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMC9HQfd2d2pTvrYvAKtwDRsiQRyROT4lqByzzbn6SFbXosmCo2wThsXQsmCi7R0v2dOkKgHvZqAsNzfSSG3FSCpzqF1jeHXMr5WbjQkUCEiYLM6CzZPTxTOO7xgAe1gKwRbf4ZAeOuWaTpAi9zjuSn5yei5Bde%2BPt3a9csorFUgHhC7iEYRK2q2Z0lhwFvH25t7BH0eTqDz2DfsrFLSaSzWIew5wCUPjwm%2Ba6I57WFMNZXPr5ZGR8oK1wCZzAmvywVDSZTdNlTAlGP%2BvEQbMsaDfHwZbG%2BNkrf%2B7aC%2B5Y4010%2BNliFmQw0dRIJcQ27kS3UYloN87FQcleqJi5vcZa%2FXUAScffIi7geaINUxX4oQJUE8YSsyeRP27CxfFLiP64SRxOjdyGPeLP1vGl8LRMqc6HDx32Weyo1wO3SlwLQXWWO4qCPkcaYYdiSwzEWIuh55EwOvJFP5p3pc6MlqkHdvYxEY%2FVdneiZjswJwMAoX2FjLIQwPuC6yEaQBuU20vqYoN5r%2FEAdH%2Fg3msekXWsIu7vdclxDBlsEQMj9F3ch2LgISfvqHlpHWF41tQyQukeF7zKAybIs1zuamxsg%2Bse0azEZzghIR2i9V3KPu0W3l6UUIInbokDo5%2B5lMUmAieg9VmeLdx2YRB2AjgwuIv3zAY6pgHD%2F55JKCvN1IN6ehB%2BqQ6nz5pzYJlHLVEn5nlrenrdw7D5%2FV7CB%2FLWrhesgvb9mxjQy%2BAKxjt4304NyAFCtHdLuEYKA74Tdn7WyTkNyqMGMtdP%2BzZmF%2FtZmcdzImbphaSGcBTUScCtkRK3qU84SfSoCIr7B9uOQyC7Ug1rObFzWp0xAtzFsUj18yOKBr55B4U0CvyXfv55GDWqS9LM6hwElo6Hpn54&X-Amz-Signature=dc55eecb65a5f61fb888544ef3006c7fcd3e29385b9bacc154a1401f35bfda37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZL2MFYXL%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T154237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIHpGgusQsDNdsyvXCWvC9pEVe9z0Gw0Qj%2FMirJk8wE7rAiEAuEqrDEuDYsV8QlAiG4Lmw9JktOxXGgGM1CRe8gfbuCIqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCydxoKDYFMitrtC3yrcA%2BBlIdFWGzcVLQQ8wRLin7DhAcYRHlABHeONS2qmRsm6Y3hel0W1yCZyqprhw9jFx7hTmdcAo9ex9RABV7JiPMT3FIznijOYf%2FCDJca1aSv%2B%2BGiUu8M4asxCUrg3HjiHPnvH0DVwH4yhSnrgllZ23Xhoagbr1N4ZNprdfbaOFPKMDzdkAZ1rdNO46LVSjKWm0o3QfzpTevO2r0poZwdKzQqcgA6at0660Rb2lM6FJl5pwA1%2F8Hdv1rxPkyvzyo5j9VplvjeuHZ%2B6oJ5pqaT05PKTxxyDthMwJZosNF45n2YS6hLRGDlXyPSLL0d40sLgapRXVbnJPK0OmkUsxEu%2BR%2BpqigwEp6rOR0CV3lAateZqX2zSIT0lGHeblcKSl0l9I1DGPo2Zu8Ssa1FG007RqLCKpD2dJGCe6edrwJqEMjW%2BQnz83FK07IIr2eRCtOGqlb3ZcI05dK1NWWAhE0hid3iOpprO6XT9hpdC07AuOXEcEc%2Bc0MKntcaOKOf%2FZ9GMkCVmSH5oAG6XXJWGI5OR19Li3aFzFj9pM5i5OII6SSAN5zTpE3rthYlIX7LZ9OLO3k%2BPUitG%2F3bZyfbWl9quo8cD8ua%2BjuUtC9wzFNg5O7d9ZckSaScRkpsnnxOgMPKL98wGOqUBNqempDn47aKWmDtJhpG%2B5dffQpZb49sK2Nzig%2FAvy8Btazq5jEZzVMls2mDil4M6s0m%2FCA01GO6Lf%2F%2FJzjn2ju4uZivyxZtjL3nymdOrByvwC0CzQ%2Bt27tO2yXGOOpDtWYPz3%2BgPFY5C7lunaAUOFBmlEdd7ZTgo1t8mIGEiQENEmVi6B3IEnMp%2FR%2BNGyzql3cKH2QhKwLnkQ6yuIrTP3G9A%2FinQ&X-Amz-Signature=d05cb189ac43deeb9851e1877db78fbc41c3c1501cca093462fd5420857e6032&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSVIG76V%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T154239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCIG%2FJFrSMdXH%2FRnwjWMVovtawZeRxsS0RVb0qZm7d%2Fv92AiANc%2Be%2B4Hq4ZAzrla1MTV4QyvhR2oX2vldHT%2B3xnOyatSqIBAj5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FCA12Ye4UXxzcxmUKtwD9ta3%2BLSP0dk0Ym%2BAzkxJrxhPN7HAGUqhXZzpwxc%2BxdpogooJZpNIEzIJIsScS4L6AtRrciem3WNjBEmYcneX64GE9rCSkjX1N9vWF9BU%2B4IT6i%2BF%2FVhmEDNEsD6gKdGMhEKN21kWDcwVmgRlmDdvoJ1jYIMaNfj0ZskwIRZRSFIaEBc5D%2FCJmH1i9iiceKoOpViyT9SAVKQ1V81SSumG1uNO3Lf1mNWRvjxeVJirbTrHkca%2F%2FFIz3F86K0lP5A%2BiGsqdKsy9v9sDf4zDwPawrSnOIXaZsoV1771niCbjCHYL2NimZqC7r74djWWaDWsEPIkSrw44wm3pHZLc7Ic1Bar%2By898GcXY5cHYsqUMTnsPuPpAsXsxDvyLSzLu7nKySFNHMUldm3TaFCT4hWkc6ZWvXzc%2BCqJuO1v1VStQtQpqcwN0RdBp0n7pX%2B47u%2FJML9ELBS2g7EjkcXrKFt7pSOFJ0CzdrlQ%2BL%2BHZ2DwNUyem1AWLiaSaiveTXLGH9DB67NE8auQb7BPBx8IHE9NM6xiV8rAKy55nCLygt5Iyrzpnd%2F2oGZekSj0f6Ez0ZHNhotpLP%2BkPvpgD6ADeW6SPuC6TANnZ6gapXZxZbbuwa7Aj4EZp9%2BLeA5kflBwwzYz3zAY6pgE65gp5bIdOFU1kIDN32WJBZbZ2OIoZeVPnup2PQSzjAVzqv2pgyYGKTYVEeCJMQzfelrDiE6qABdluhNymmMRxekXqVKbcGcnofQiuy%2FecpE0bpF4UzzPVkfKPYQrN34Ig2ybSge7F6Fz7bquJIRiopMOI7RdmRucczzgJ3ToRRTxcJVIazd2ni8bItHRQ06Y9vsdOBo8OZo5ZMVmPT1jAlPLtP0Va&X-Amz-Signature=86f3c02de0fbaf1700f861f20b6e614d3c916f05f86c574d4d752f64a9f9f065&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSVIG76V%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T154239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCIG%2FJFrSMdXH%2FRnwjWMVovtawZeRxsS0RVb0qZm7d%2Fv92AiANc%2Be%2B4Hq4ZAzrla1MTV4QyvhR2oX2vldHT%2B3xnOyatSqIBAj5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FCA12Ye4UXxzcxmUKtwD9ta3%2BLSP0dk0Ym%2BAzkxJrxhPN7HAGUqhXZzpwxc%2BxdpogooJZpNIEzIJIsScS4L6AtRrciem3WNjBEmYcneX64GE9rCSkjX1N9vWF9BU%2B4IT6i%2BF%2FVhmEDNEsD6gKdGMhEKN21kWDcwVmgRlmDdvoJ1jYIMaNfj0ZskwIRZRSFIaEBc5D%2FCJmH1i9iiceKoOpViyT9SAVKQ1V81SSumG1uNO3Lf1mNWRvjxeVJirbTrHkca%2F%2FFIz3F86K0lP5A%2BiGsqdKsy9v9sDf4zDwPawrSnOIXaZsoV1771niCbjCHYL2NimZqC7r74djWWaDWsEPIkSrw44wm3pHZLc7Ic1Bar%2By898GcXY5cHYsqUMTnsPuPpAsXsxDvyLSzLu7nKySFNHMUldm3TaFCT4hWkc6ZWvXzc%2BCqJuO1v1VStQtQpqcwN0RdBp0n7pX%2B47u%2FJML9ELBS2g7EjkcXrKFt7pSOFJ0CzdrlQ%2BL%2BHZ2DwNUyem1AWLiaSaiveTXLGH9DB67NE8auQb7BPBx8IHE9NM6xiV8rAKy55nCLygt5Iyrzpnd%2F2oGZekSj0f6Ez0ZHNhotpLP%2BkPvpgD6ADeW6SPuC6TANnZ6gapXZxZbbuwa7Aj4EZp9%2BLeA5kflBwwzYz3zAY6pgE65gp5bIdOFU1kIDN32WJBZbZ2OIoZeVPnup2PQSzjAVzqv2pgyYGKTYVEeCJMQzfelrDiE6qABdluhNymmMRxekXqVKbcGcnofQiuy%2FecpE0bpF4UzzPVkfKPYQrN34Ig2ybSge7F6Fz7bquJIRiopMOI7RdmRucczzgJ3ToRRTxcJVIazd2ni8bItHRQ06Y9vsdOBo8OZo5ZMVmPT1jAlPLtP0Va&X-Amz-Signature=96d07a28ee776ba977e7bd88f0df30f8a7c24e9bb57334b21c1a73f7bf98dfd7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEO6TVWO%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T154223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDvRq4zMJZVRGX9WOjuIfP3GGj6%2BRCsFgeXpT1oIq1uawIhAJn3%2FJu5098gOg8N%2BZdHdyoQvaF9yPp%2BeuVEcBRbpDqjKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzsRHNelhioT5UsuNQq3AMBJe9EG950ul2gkl8EC9M3agQ7%2FvRlISu74xagNqBKg0bczy%2BxllA0peWwWx39IdDIWnlx8e9cIBx4py80jXpopsE66Y9rzwIY4usvoRFFkE4mvLbk0f34OCOBADho0qU2gKKnHUxWXCubthpn82hHOT8i%2ByW2Kvkssq0Oh7cfAFZqWKlBS9QQL%2BySMBQ2I4JEAt8PB2SUmqA8b9tMHZ4nqBI6lBIFa2gzjl7XKgRAIvjJVtARmBXZVA%2FPZb5q9WhBfnzXfrhgNMs0DCmiRDau7xmwventK1%2FoFXpTkJpDCjTCmBeAGNRxelFj%2BsNT%2F5cOlbo08IzMRTAZtGhFtLearyeXG7ZZWpjhVFBh0w6VUkUFmAN2QGJNSHbwEhVhdyBZPdlesAfB8gYjE0V8bzJzZE%2FR2owCFL7XrJTw7VSXZOebL4Z9ImS1RkbHrR7Cs%2BWiqhyNfQmfOJ3C06olbO5zHM2FP6%2FLQArg%2FJ7lyeG3imY%2FgwZP8VBSIJ3e3%2B7AegH4Ink9CMQ%2Bhd01%2BO5cTaCxdE8GFcYQ6QVEFVceGfyNslZ3jVDQfNhPzN7rl%2FTFgCnUuf%2BLBx%2FePZYGLkKtaTsGQK56FhXDWPah%2BFUHLtj%2BFmcHdlEyuKtBkDvV6DCGi%2FfMBjqkAdv1qm6shybLmtzgF2O4Jf2g5al5D2%2FXY7HKd%2Bz7jOvADP5iNoeS7ry%2Ft97k6aF%2B%2BfXd5AQleihg%2FZi4npG4Xhs6UW2VHUkyz8w%2Fy1LOQNPajBs7d5699ZGRxwRWGgxfCb%2BHOLPxKLlp3IsnYBNojVgGRVirMZiK75bTiu1LLDVQ7sebW6H3WSuXHVhIsXJviFu9ZIkp8Hvr9XOS70NKsVyIymUI&X-Amz-Signature=f6f31aee21798c9ab049a4d62fea2f969baf1343e561f2e4c422015c38b37cfc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JX6JPPE%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T154241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDxIJmq9BOhucf2OBoX8Xpbix2%2BLiJiIOjYd0NtpHONrgIhAPcrhOMNY9g%2Bb9JeBl76%2F7eikopZuE4yLs%2BJOgEDEmiiKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz0AP3Rq1B69Nu%2ByY8q3ANTpZ%2Fld0i42aQo4zqUDRVlNy7HcNzMtcwhgf6EG3H%2BLgEvr1uTRDni%2Byc83IrEbibIOS%2BDnzZaV91%2B7ysv6iQ6PhP9WyX%2F77gvXi6v8EQew5qaNaaLgKumFd3369TQwmELs6KT4%2FveiN57Daqrt%2Bir7bOQjSaCF7cJEBSTuyusGufl%2F7Ys1yteKAHSzzlWE64uoMh4t%2FrOadTLFasyE0t4usLp%2Bv5INO4ceqfOcXmBlzRNbXMhz%2BYvWDtimkkJJI0yPEul4tUGzOU46lufS0jcknZpR4tK2zZFNA%2Fmw3I9zr2r4KL0NsgmB7R%2F4FSELx0XZKCQH%2BEgTmzJveUFT3NZ08KOaCESP4NHi%2FC8PuKH02VBmPvYBDC3ZouNcqNQsCRzgEXCAcycBVwEZf4eDPA6VMQnXWbdh1oz9x1sn5J%2FJ4LE%2BkaIRgT%2BjFiVCrnWos2mXBhbQwRpGAa8RCU9GChYTJ2nsHLXgyTVW78ntxVdz67hyognqSCFAu5ba0a0%2B7lEGyMhReWbK1lH31RyQh3qNCmdOeiP07yrq2BIZPQp2zER4acLnT%2F0xliavUN3ishtb9y9ZWvR7w8O7T5LSgd1McM4LCHhiT4uTjIlIrb%2BHuVpjywBITkRgYdTSjCMjPfMBjqkAXCIcVXoVj%2Ff7why4%2BJzBMyTWCVaUXkbxO7IV1W%2FKYUXIsC1%2BJ3XoQk9N8mmm7%2B5Lp3%2B15fqMwnPHT3zuDQ5gdN%2FBMo%2F5NXp1zFSYk%2Fq5pW9AYq7LRJDU28wr20jyJs4IG9Gbg4tsGD3gu4dZBYEo%2BwoX3SOe4NU%2FTj4vWvYWXbxu83KvSZVNNbDZvjL6PDemcvgi9rb5nXPUBqtmtwZcm1u5x90&X-Amz-Signature=0e4a7eb1167d3788c68ec22e3020630a694eeacef82c21b2c17956a6651a3022&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JX6JPPE%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T154241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDxIJmq9BOhucf2OBoX8Xpbix2%2BLiJiIOjYd0NtpHONrgIhAPcrhOMNY9g%2Bb9JeBl76%2F7eikopZuE4yLs%2BJOgEDEmiiKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz0AP3Rq1B69Nu%2ByY8q3ANTpZ%2Fld0i42aQo4zqUDRVlNy7HcNzMtcwhgf6EG3H%2BLgEvr1uTRDni%2Byc83IrEbibIOS%2BDnzZaV91%2B7ysv6iQ6PhP9WyX%2F77gvXi6v8EQew5qaNaaLgKumFd3369TQwmELs6KT4%2FveiN57Daqrt%2Bir7bOQjSaCF7cJEBSTuyusGufl%2F7Ys1yteKAHSzzlWE64uoMh4t%2FrOadTLFasyE0t4usLp%2Bv5INO4ceqfOcXmBlzRNbXMhz%2BYvWDtimkkJJI0yPEul4tUGzOU46lufS0jcknZpR4tK2zZFNA%2Fmw3I9zr2r4KL0NsgmB7R%2F4FSELx0XZKCQH%2BEgTmzJveUFT3NZ08KOaCESP4NHi%2FC8PuKH02VBmPvYBDC3ZouNcqNQsCRzgEXCAcycBVwEZf4eDPA6VMQnXWbdh1oz9x1sn5J%2FJ4LE%2BkaIRgT%2BjFiVCrnWos2mXBhbQwRpGAa8RCU9GChYTJ2nsHLXgyTVW78ntxVdz67hyognqSCFAu5ba0a0%2B7lEGyMhReWbK1lH31RyQh3qNCmdOeiP07yrq2BIZPQp2zER4acLnT%2F0xliavUN3ishtb9y9ZWvR7w8O7T5LSgd1McM4LCHhiT4uTjIlIrb%2BHuVpjywBITkRgYdTSjCMjPfMBjqkAXCIcVXoVj%2Ff7why4%2BJzBMyTWCVaUXkbxO7IV1W%2FKYUXIsC1%2BJ3XoQk9N8mmm7%2B5Lp3%2B15fqMwnPHT3zuDQ5gdN%2FBMo%2F5NXp1zFSYk%2Fq5pW9AYq7LRJDU28wr20jyJs4IG9Gbg4tsGD3gu4dZBYEo%2BwoX3SOe4NU%2FTj4vWvYWXbxu83KvSZVNNbDZvjL6PDemcvgi9rb5nXPUBqtmtwZcm1u5x90&X-Amz-Signature=0e4a7eb1167d3788c68ec22e3020630a694eeacef82c21b2c17956a6651a3022&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7YLAEJ2%2F20260224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260224T154242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIE6vAlf4TN8E9fKVFCfeXn1s8czpr%2F0GOMvz542GLp%2BJAiEAs1T2c2mTxw2yJCHW0oexwLhwrF6RgKe4lrXDsNJBc5UqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJsyAfAuGl1w5IKk7yrcAzPuvBDK0oY5I1rfJFl6OL88fyqoTLHZUHTg4FPDLEu6VzKQKGaA%2FVQOJCWbtm%2Fuip%2FLxgbxk%2BjfNg3ONhuNF8mIe8HyAGfvxhByJMCP4CVpKbfSkoZe68X2j1JdtRZlh39dTWSXW%2FAMWWS0ur4Lj3nLcH2t4ixk53wW4L5ENK7GVbmplPYdCZtPljILV%2BONEZ4VfRTbaDwnCYhrapUV59XaYgGmzQwK57k9DnqYYFZIGaiAZt67kDU%2FlhIk7eJpEl4NiixNwUl1J4aP9vV1KxlMhX3wENLPLXK3WRUkC28qTQjRAT5l9X3Mexw1%2F9KZHIFlbWFrpu1NlaY1EjbjWQFFzOmrA0E627EXV4jZkoaKEbtC15kgJz9rEeSNA6bUbT3eU8QuyzRveMPEMmhh%2FAQMdgaYVWY6Bs06op86KO5O8bFymitHw0r3iqTtypOfyTv7Tz0hCo5sGa2vds%2BRD4EkVcOjcB0zm5ttWbjMZIJhNX9K4UeyPkc%2Fx%2FbZOZVLRwBjPgOCuRNfi%2F%2BH3a2sFwzKncL4GY24jg%2FS2xqNt5%2B56JOFNE%2Bcb2Q1Ordvt8PrKqlfj5nsFh0g8695cx2HMKVzTwfYocY%2BWFPWx30B2HoRJYH89CxZOpi4vESkMLCM98wGOqUBo8uhzWYCuyLNffd9H9VIbsgmKZwZhKCbVFyBqKOG9sxP3SVIq5q1mgvQkFuPXYHfA6XcLJF4ihZjPZZL%2FeA1TsEP3IlHyqv%2F2egRKwbKSQwtZN%2FxoHMrCwlJrgRKZhk6dldmrnp5Z2xWtIGfeIYhxsmaJ99Pxlb%2Bk5HjzUcGaezKhwu2CQodZ2j%2BkkOvvRgbx%2Fw%2FTM2N7N4EcnRncSBYAiN5CH5k&X-Amz-Signature=6abb0b707a15733c4ce5f90d36fbfe1b3fd1b0572e3bf3f03af90b801f6177be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

