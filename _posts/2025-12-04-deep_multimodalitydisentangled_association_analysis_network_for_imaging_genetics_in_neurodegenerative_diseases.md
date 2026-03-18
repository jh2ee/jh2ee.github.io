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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEN5BETD%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T183952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCICfgp5ksp3JC3fbvH25QAnGBEdHCxv5jF1vyWtzqnOCzAiAlHYCBJwGKmOGnqAHAeYlvWM%2Fzmvyrr5vPZtjfsA4SxCr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMdUpAuiSG68BEfmalKtwDJZNHFuE9upAYzX2H4UpK001G84gXxxJlFOQzWt5CWm4VWhUz6VfVZUrvX9avghs1nloh2R7CTi8BZOh6FP6dChhTdIoFPprLTadQ1CwW2RMzxmm6LD69WkD1I7lFjNKH5fEKpX1kADrwdT%2BTcxxY6BjcWW2WRjUxH4GsGqA%2FcbbxAzKmlk16XrIxoIdRS5bObBnhNTveYay2XNhPu5V1nSHbpK7aLvCXn39ihjrixpfgfuyT4V9U6b4K0hq4DnCb2ZmFLzeU6jZCEh8vnN9lkKK99GV2rOd3n5QLJL1P0LOLWbpT05SCIAAiyoppc%2BevaRmFBsOQpd8JoE%2BXP1T6yq%2FxnlJutcAvZUouK0gQZ4oF3r2QDTsnz2jVeGMT3BKSVK%2BrsOJlCApeQdANRuC4L%2FDhhhEgiU%2Fw4xJVfmNZA0FkTj9ksGc0Y1AzbLmiuj39SINR0pnHtNpGmZMQoJqu2LVFcCab6VfaQxZJQTURUWFakJQielRnty3s5Afi9tcsJxZTrGn8%2F6qah97EFPPEvYrABQbVxbmaUZo2IfZdF%2FcaQGy7m0bNRGK5jCwOU%2BHPLez7j6U1q%2FZshgqTRFaU2zQIlTtzcPadGyOamOJVtIqmPRsoBKkWnwOUGzMw1qbrzQY6pgFjL0FnTtFACQsR9diU%2BqjioRebuwaWx%2Fvng5YKXlLliaaVf6vLr1R0HScn51UHLto7NzWf%2BJuUpDnJhZ3HEE0Cr0ubIlV3zrGljl5avF3wYCzowqbyDPb4EI4Hmb%2FvVrA1ooj6rqJaOnuOBngSxrQA3fldgMciRh4V20HWfh%2BGpK5X7dMfanN1seN8007PD7NzfjSGvs95Knk9lON6PZaityuMwcyk&X-Amz-Signature=8aaa3662fd01d280222e3f60f9a1741271bf75a331b397e2859c9a6bbafc5ab9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEN5BETD%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T183952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCICfgp5ksp3JC3fbvH25QAnGBEdHCxv5jF1vyWtzqnOCzAiAlHYCBJwGKmOGnqAHAeYlvWM%2Fzmvyrr5vPZtjfsA4SxCr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMdUpAuiSG68BEfmalKtwDJZNHFuE9upAYzX2H4UpK001G84gXxxJlFOQzWt5CWm4VWhUz6VfVZUrvX9avghs1nloh2R7CTi8BZOh6FP6dChhTdIoFPprLTadQ1CwW2RMzxmm6LD69WkD1I7lFjNKH5fEKpX1kADrwdT%2BTcxxY6BjcWW2WRjUxH4GsGqA%2FcbbxAzKmlk16XrIxoIdRS5bObBnhNTveYay2XNhPu5V1nSHbpK7aLvCXn39ihjrixpfgfuyT4V9U6b4K0hq4DnCb2ZmFLzeU6jZCEh8vnN9lkKK99GV2rOd3n5QLJL1P0LOLWbpT05SCIAAiyoppc%2BevaRmFBsOQpd8JoE%2BXP1T6yq%2FxnlJutcAvZUouK0gQZ4oF3r2QDTsnz2jVeGMT3BKSVK%2BrsOJlCApeQdANRuC4L%2FDhhhEgiU%2Fw4xJVfmNZA0FkTj9ksGc0Y1AzbLmiuj39SINR0pnHtNpGmZMQoJqu2LVFcCab6VfaQxZJQTURUWFakJQielRnty3s5Afi9tcsJxZTrGn8%2F6qah97EFPPEvYrABQbVxbmaUZo2IfZdF%2FcaQGy7m0bNRGK5jCwOU%2BHPLez7j6U1q%2FZshgqTRFaU2zQIlTtzcPadGyOamOJVtIqmPRsoBKkWnwOUGzMw1qbrzQY6pgFjL0FnTtFACQsR9diU%2BqjioRebuwaWx%2Fvng5YKXlLliaaVf6vLr1R0HScn51UHLto7NzWf%2BJuUpDnJhZ3HEE0Cr0ubIlV3zrGljl5avF3wYCzowqbyDPb4EI4Hmb%2FvVrA1ooj6rqJaOnuOBngSxrQA3fldgMciRh4V20HWfh%2BGpK5X7dMfanN1seN8007PD7NzfjSGvs95Knk9lON6PZaityuMwcyk&X-Amz-Signature=8aaa3662fd01d280222e3f60f9a1741271bf75a331b397e2859c9a6bbafc5ab9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7QTMFFD%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T183952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDimP5GAp2qSYyO7JlShk2g7wkxbGB005LKB1CronFB%2FQIhAJAdhWtqY8aiu3eryVT1JhoW3iXcbOMJ8Ik9EMNLF8m7Kv8DCAoQABoMNjM3NDIzMTgzODA1Igzt6HcXHHjFMwoWLsgq3ANpeYu11oLWedumWirc1hy3OU2rKN%2B%2FliuYyDqu%2FVNyjZoEm5Cwzr2cmx6VBMZGw%2B8TxVruKHzWVp66Th9IO8kDG14scaHI29XPLFajW97nMqMCcwWPxfbZLOTW9R2%2FWVuFnf360OlgHZwoadIFuD4halQcZ%2Bmz5VBpRX3RMQmuvUNiJxrorshIOjwtk84PoSx9L1CmfBvbLuMtK%2BuXF4j%2FwAaO6BUpkbvgZN6LTlVSYkKnIASZNzNHx20dXsiFvo%2BXftSoiArYSsh8nqHv7eP08d3FahJpdF3RTn8%2F4Ve5wK0It%2F0WsV31eMAwDP0fpIX4DHS%2FVF0X9Y3JmrXo2H6AeKYcektxGSKB5jYOszyCsCd1VUnEwF1j%2BIfukpqoKYklW4UaGpvHWjcZpNIkoLauKnDPge9VY%2BTu0uIbCRp9lVhc%2F36SxsiE3KtYDd466s%2B%2BW8UdOUY453FnOKVz2h1SVZn2J%2F7uBjn96ER57%2FDX1J%2B46mblrX7zBg6nF39uzua5%2Bbzy%2FqAtcCqp%2BTucBvbY2%2BNi4pOtKlLRhHM%2Bh0WdLkYvJsIdZiEEz3ciDHPG7GyzSsck%2B4duJjHbEHf0ApQJTcCEF3fNyB0kkAGQGPlqfAN8SpYc5zRBUZ3g1DDZpuvNBjqkAQXghbc0caBOMUx9fbDHFqAv3YDa6fqPS9MsRCaooUPT%2FEarXxXPfeuCvxpnZbMeymDFnhodpWuM3xNf%2B6OhB18VbbjG4i7G1yFDtiOH2vco1r4b2Esx8riVz1tIb6R4BdCZaIXdP%2B0mhWBd%2Fl3odqsvLkFIbnp81L9EgKTcIhuSiAPJA%2FsE0Og3R3UR%2FPkTx8PTzY%2FrXsfayYXuwaJ7iGuE%2Fhjo&X-Amz-Signature=485710989e173a14f04dc4b52c419308e6871c6ba9c6eecb766f95a8a35b4f76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAT6NYYQ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T183957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDVkoQtURXn3aTlJIRtrYis25QHXecOdd0BYwM%2BrAM2UAIhAMd8UavqEYV1CXnQ77NqkrQhQH441kDAZxgArNn5mC4KKv8DCAoQABoMNjM3NDIzMTgzODA1IgzpWH%2BQQfYwFOhOsSEq3ANZQKwIxeDH2avL0UjJEfr1td2yWPuEIBa1u%2BETBkskyIlG0LQVsteQrekLyfuJbaJStyJ9iznSvUEyHcgM%2BPcfyV2Gp%2FcEjhOqVWlOvilgU4VLASmM94Hd41PQ1824VVbgwmG0Fbvj9MlxCS91yCGIKoIW6IX5QgyOohNpSiD9UDaRXat1B6F5lLsRA5lm7qoE4wn8qeV43%2FrUiy%2F9D5SufBpQ5BWm%2BbUEspWbeOY%2F6bqSg88PAvPSm88w%2BJLkg7eYE36MuOaKLpPSZr3NLSY6w8pLRH6SY7EpeY8B%2FxreAg%2F59peX7n4in3g6buPolg1rD7sK08Ol1f18RmaQN73UQsxxZLOI%2FECOywiz%2F2AP1sNqSWpxi2Qf1wA8b7ykOUCRF0%2B%2FYyvze5qyHgJ5HAo8gFAahiZpGT3wQivyOiA0HSG6f2ZKaaZYxIEv%2FgORUJ53ReED2OpSmWUQMF4E41KujhmQI1M2nbUn37TsRCQnnSrUDMPu2k6IA2WecdiSjELGxr0Jk6svF7pk%2FmdDgJHGxiXSGfzYFT8zfWF7P3Bv3IDnvA3PaqcHZ02nhGgNkentyhNM5hRu5LO1HRfNQDEc6F8Xl8FhTFNVs4fvSXjkqBdOq%2FtAkl9mBWDqsDD1puvNBjqkAbTYG6oEMll%2F7YqzvHaUflt67yjbnjwNrEfl7ggdsZ62CzGdpzQF2x7PQdYiUG76FbvCBrXO9c28hxklvbk0VehQQDaSybCeMbqLFoYKtq3wcmw2Le%2B7DFfSVDxyMjvtwcWAdcaNQGrUcWFktu0tP106w5Axas5PqwHpqNrSwHKJFBT450DuRgIBKLaOu819jpPCBa%2BYjRpnuNn1dtB0bNUl%2B2aZ&X-Amz-Signature=bf09e59096edbe0fdaa9551e3db9ec455caeedd8546868da60c84c9e82399e49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAT6NYYQ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T183957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDVkoQtURXn3aTlJIRtrYis25QHXecOdd0BYwM%2BrAM2UAIhAMd8UavqEYV1CXnQ77NqkrQhQH441kDAZxgArNn5mC4KKv8DCAoQABoMNjM3NDIzMTgzODA1IgzpWH%2BQQfYwFOhOsSEq3ANZQKwIxeDH2avL0UjJEfr1td2yWPuEIBa1u%2BETBkskyIlG0LQVsteQrekLyfuJbaJStyJ9iznSvUEyHcgM%2BPcfyV2Gp%2FcEjhOqVWlOvilgU4VLASmM94Hd41PQ1824VVbgwmG0Fbvj9MlxCS91yCGIKoIW6IX5QgyOohNpSiD9UDaRXat1B6F5lLsRA5lm7qoE4wn8qeV43%2FrUiy%2F9D5SufBpQ5BWm%2BbUEspWbeOY%2F6bqSg88PAvPSm88w%2BJLkg7eYE36MuOaKLpPSZr3NLSY6w8pLRH6SY7EpeY8B%2FxreAg%2F59peX7n4in3g6buPolg1rD7sK08Ol1f18RmaQN73UQsxxZLOI%2FECOywiz%2F2AP1sNqSWpxi2Qf1wA8b7ykOUCRF0%2B%2FYyvze5qyHgJ5HAo8gFAahiZpGT3wQivyOiA0HSG6f2ZKaaZYxIEv%2FgORUJ53ReED2OpSmWUQMF4E41KujhmQI1M2nbUn37TsRCQnnSrUDMPu2k6IA2WecdiSjELGxr0Jk6svF7pk%2FmdDgJHGxiXSGfzYFT8zfWF7P3Bv3IDnvA3PaqcHZ02nhGgNkentyhNM5hRu5LO1HRfNQDEc6F8Xl8FhTFNVs4fvSXjkqBdOq%2FtAkl9mBWDqsDD1puvNBjqkAbTYG6oEMll%2F7YqzvHaUflt67yjbnjwNrEfl7ggdsZ62CzGdpzQF2x7PQdYiUG76FbvCBrXO9c28hxklvbk0VehQQDaSybCeMbqLFoYKtq3wcmw2Le%2B7DFfSVDxyMjvtwcWAdcaNQGrUcWFktu0tP106w5Axas5PqwHpqNrSwHKJFBT450DuRgIBKLaOu819jpPCBa%2BYjRpnuNn1dtB0bNUl%2B2aZ&X-Amz-Signature=5881db3632a13fe6e6932cce7cc89ed7c0a0a8929923b59a303e2bbb97531adc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z523TXLJ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T183957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIBm6VQINRbJ8k3U4vbFb3ia5ijUvcPjBPOTX3AS0qdxGAiAR9HPDNKr9ekHDy9d09jS1VdvPKt4l6gKcVBgNH9%2FSUSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIM4AKZcGJXnY0DjHuoKtwDHLV0kAJaMKPo68GTFJpzU5TWNqHM0xsGRuIb9SPpB7is3YBjiKdM1ZibLnCJCnxQtHctFvevq6azhDjZCb3zWI7NfLoSL1brllGQtbqR1mwMOe27rgdWesUTveVv7dhfO5%2BZGtLVLg6e2Zh60ycDLs3S3fXsPGNd3Od8gqPZOnKHrs7xCdaVzCgBRDMmS3PxSG6zfoj3ZCq0qgrC4yuJRB7FutI%2BTC%2FfVDf14g9dejo6rMg84VK4w%2Ft3qYCSieCLZ1Us14VrLZsQshlnBB2lwWkzxhlRocP1M0HASOFAlDRjGtYGrVb03qU2fcMDzE59Is3cUad%2B%2F8Vb%2BOHFherdSgFrH5gY6nedNBdWPZnX4ffb%2B6arZIM1%2BzXI6rGJ%2Bj0Q1k7xhSAB4hzQ7gLKtcynyedEVBCpZppCpwcZEV%2BPIJpzNI9EEbX2xhw5gyjroqmkNS%2BGfZ8O4nX6ZyKDraIJJStei96Wwa3d6C03l6bUq%2FLIBAksOM9qbiVC%2BD0WQlM1uuuqtkWJW%2FGeG8ivIUIQF136OqYOpQS5GF8rUrfMW5CWVzjLeiffZeIFI4fnCu1yJvRlepay8%2FZrCUARhMfNu8daEBEzdq%2BQPx9qAnDhEQoXGrYCH2rBRAot5U8wmaXrzQY6pgEc8nLi7I5pAFQ6uuFG2sio0KvszpUHx5wCB8mIOvUPPDucWH9P89qEEpnaQuRCs%2B0FKdJMyUQsLvN2dn1T1fxzk4BgH3hWv6ZdGWHcr1XEDlpXr%2BMXo4VR5vFPF2wb9NgDwLrZZU7p3hnoTix1Cihi3zxnqkRDcZrAf3gpIQnUoVdnzm1%2BJ6rJFP9k3i9oxYADaoVznvY9JQUAiKEHQ0Tf0SYm67gF&X-Amz-Signature=64698668e6bedda376f335bbcdcb640d769e6a52c932892135aae3e33f059251&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJ2HMFPM%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T184000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIAzFNq6z%2FwGWoRsEpPPjBRrf13bLpwMvUJx%2B6ZCuG%2FcXAiBqSTFsRaQ%2BXqVq3fm05%2B7puIHTvuNlFpAohBFczFjmRir%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIM%2BlXRmmPp4oEdrl7oKtwDV2%2BRJHs7jUi%2BHdol19h8qmChCeKrPVS0qjEacrVDFO5fDhqY2emppGHB7kwfc%2F830Dg%2BpDk4jXR8oeV9f5bo5eH9vZJ1RunWnLw%2Fbs5ZqmSlMRgUoD4Ob4ePPlQJYjJN9krI6yUm4TaIL78lAT0r2F%2BYu%2BJ20KZTPoR0LyiqdHJEOmOoaQuTpaOHuLkGOZkR0Tw%2FrmNz2EJ4mK47igvXUOPBcqot%2BTZ2xnpabdI%2FUnf3A%2Fx8wWBP%2BvukQ%2B4JmvAnmvkPylKnHCTmnD3%2FWK0m3UzabfklaPK5ftnB3Sr8sue0A12tIbLkhIHuh1XCULgtqh%2BH8iRBJJ%2FFpz8UHfTnogRsqnDioQudsvLh214dCJMu%2Bqf1Ur7ainFFXkP9IaClIN%2FIiovtz%2Fo4cWq0Yq5HvwsJr0VtugsHXC5coNUsbafh6%2BcfvzONB0FZ644BwC2AE%2BVhENtg%2Fqt7hJ7yuXkg%2BuvN1T%2BBfJcbCn%2FIywOivJ4f5LXHOb0PLS0t%2FvB%2BlQmQKV3HyAtuuFfg1qDTVKIVddQOhA1uYD41Dd%2BZ%2BQbaFQFya%2BxYrLqhWFYxOILwwbifNUgP%2FxsHU7MjU5TgRP%2Fg11iBGLWAXP5YX1YMJXzx0aRMRvobbrQ81gckjRkwmaXrzQY6pgGkw2bcOk8H9ISSaP7F9xwktbdWq9maKwgAp4xo3oyEN5I0ZGcDgstuFts9ZydtggLEWinTvF6YJGmhvpGGRNjL%2FJi49yHwHlgt1W0apeqb6K9HdIdZCW1QmoCLCvHMWLNzddwuyaiHpk8UPeMfQKC7anMNGqCF3p0QWP6YlytRliVJnFmZ7ZHQayqebzW2AS0MVV4lOoTEl5cgpcjglhEQP56AbibF&X-Amz-Signature=c1528dd165fcf0f2405e103309c223036985c9ca9e44bf4bcd1098fb91805a47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XONMZ2PZ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T184003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIDfg5zJFJckm%2BkH4uD310ZUPeHbGVZizbVwDdGkkwkYuAiEAqK8Nrj1d%2BDsED3UJ8%2FcDxBg62y6nTxikhpbDFpqo1l8q%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDGv7K914An8NJ3bJgircAz4UraNbM7Vv2h14F5j4rkqj%2FRiSuuSbHHzTh3XxC1FNw8e12Vs9lZUbR5%2FNQA6ekev9L%2FqNb%2BsjdTWIXBNC5lCs1yg4sRcRahyxA9g2GKq%2B%2BoRoF3D2XRRo%2BPbm0vNKdzILo7wqaK9ZEy5YyX1UqxPNOEIGDbJwX1Mov7PaZTM2xFQZSRETWntOiA1Q4re4fT%2BOHa3Epl75hFKZPVzC7H4j5aDEodeBLNT5JMqlpem%2FiyKn%2FKIM%2FyZtIbk5G3bFfyyMcVvjxhCwx14Z9WlxkSD%2FY%2FBMn81e37EzyYwRHVIbVB7JG9O%2BgblNp6l%2BR5wg7HguQ4H9ZzqILF3QdbmBmYrVB9stVXP0%2BdBuYv6k8Y%2BORoSkxoo8bu6cU4jXI88AZGZXlcPsMUVDtNv9yy6eV%2Bi9I98gfK0PKPHEbAzOcaysuFtIY2q5PuWGokVdNjGWz2we5NfDpRB1kYBAvN0Xs54mvt%2FIEO3zxZf279l%2FifhvuNQ8Ye6s1IKTOk2jw6exICrFzUGfovGQgBxccmemUq3U6%2FMFeiMYgv64B0YSw7qJ0V00FqGiD0il5ZpmDK4DXSP3LhLS3l7iwNuo0H8GDABVajxFaYgyzWA8UAEBdtZfT9mAinhRjKQB42ypMNel680GOqUBARBr3TpRTWKT0PayZDLb77Bu%2BIDna788fYUG7VaAdWvPfJoKu0QlhckJLpT6XbtbHUTy%2FyYein%2FmTxU%2BF5GWzRd7Gz4B2Clbt%2BPhYakI%2BVKCFdrH%2FW47gHn%2BcLoooZYVEUOuK3qAhyap88FmRn9p52RoDsTyQcsoGeUG0Z%2Bq35%2BdMMtozCr9UuvXlbKtaJQWEUVdcwQOl5qxtIVYMju6UGcRkM%2Fu&X-Amz-Signature=27fb184783b5e7e7c51246a71b4acfd2d5a2fc90399f21d959e71ee38bd30811&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WABZS3Y%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T184007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIBXgSbDBZL9nHek36hLchqFiv97NmQrbzZCJuent4bpHAiEA2H3gqRDDJdxH20SFfS%2F%2FoGRc3c1UQO6OekNT0IXmjqoq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDKZwUL%2BRVI7eBDv6DyrcA%2BJxqlZs%2FWe9Qe3r85RtKGQOZylrIV1K74mFUcAj8VchUmlCSL7%2BBe5JWmIbtk39N6Zg1zd3XW6TVPL%2BJ4oNRgA8uPIqtQv0vRJwCbCa0iCNr0pyi6GBVcjRWYuhXjcSxBN26fwBnSlY3s8fhf4NIclPaWHmDiSNf97QAi4G6KrKCnjHjtmtss1ifEcetDiruiJQFSYski3K5zA%2Bunq2YTzu%2Fy3jX86ZngR2jX8UUgQg%2FRE0458uYONWkLfZbTIYPTbiSS3rrX7Oes5RjnmG3p5oT5J39gLqUEIoFAVTMJSwSMQwx8N58mrXpExgT1rL1evu09jXiT7yqRpuUt03R3Ttor%2BJ3Sc8PD4z9sBjw7hagRkwusSQdFeu7qCVgDhI1%2BpBfN8xYKkWcCp9jIpAY55K2CYwh2V4j5f9u8gr%2BpZz2Kv9Ca4WK%2BH2he%2FfXkQSJIkDVNlZO89XMQfGohk6rP6m68ZKf77luYWqkUR7EwZhrvV44qrQZpqpuTnNBnWo3FNnUAn7iUmtnxEljtjD67vQgapXdBZynpzhTi9URb6aC2tOAzHT%2FPnxR8v5g75i3Z3GwGt91BNLPKZuuv6d2KasB8XOPNqs0V40Ol2g49HvnNDzC8R1NyayA1lgMLCl680GOqUBjYz13zAkX9eeTLedL2vdT4FPh72MCnJ9fAyFlvdxUlvHYf4xuFDRjc%2Bd2pp4UMWZ6Q%2BiLMAxH1cXQ%2BbuCU6kibsJkjnIAQRJ1MMIMgUjfD0%2Bw%2BKfAtUF4l15vCtCUP4SClaxK%2FZSSsQZeZ8isYJg%2FKmz%2FKCK00Idlqgq4kqBIjqfvtEZh%2BHzdKkY2IKXwCXBXdGTRO8NJ0nF6q%2Fvl%2BNRBdu8xfSJ&X-Amz-Signature=f1b80d6788aa10c0182db623b20956590a12b733bdc2beff1b15b0f0f6c1cda7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WABZS3Y%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T184007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIBXgSbDBZL9nHek36hLchqFiv97NmQrbzZCJuent4bpHAiEA2H3gqRDDJdxH20SFfS%2F%2FoGRc3c1UQO6OekNT0IXmjqoq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDKZwUL%2BRVI7eBDv6DyrcA%2BJxqlZs%2FWe9Qe3r85RtKGQOZylrIV1K74mFUcAj8VchUmlCSL7%2BBe5JWmIbtk39N6Zg1zd3XW6TVPL%2BJ4oNRgA8uPIqtQv0vRJwCbCa0iCNr0pyi6GBVcjRWYuhXjcSxBN26fwBnSlY3s8fhf4NIclPaWHmDiSNf97QAi4G6KrKCnjHjtmtss1ifEcetDiruiJQFSYski3K5zA%2Bunq2YTzu%2Fy3jX86ZngR2jX8UUgQg%2FRE0458uYONWkLfZbTIYPTbiSS3rrX7Oes5RjnmG3p5oT5J39gLqUEIoFAVTMJSwSMQwx8N58mrXpExgT1rL1evu09jXiT7yqRpuUt03R3Ttor%2BJ3Sc8PD4z9sBjw7hagRkwusSQdFeu7qCVgDhI1%2BpBfN8xYKkWcCp9jIpAY55K2CYwh2V4j5f9u8gr%2BpZz2Kv9Ca4WK%2BH2he%2FfXkQSJIkDVNlZO89XMQfGohk6rP6m68ZKf77luYWqkUR7EwZhrvV44qrQZpqpuTnNBnWo3FNnUAn7iUmtnxEljtjD67vQgapXdBZynpzhTi9URb6aC2tOAzHT%2FPnxR8v5g75i3Z3GwGt91BNLPKZuuv6d2KasB8XOPNqs0V40Ol2g49HvnNDzC8R1NyayA1lgMLCl680GOqUBjYz13zAkX9eeTLedL2vdT4FPh72MCnJ9fAyFlvdxUlvHYf4xuFDRjc%2Bd2pp4UMWZ6Q%2BiLMAxH1cXQ%2BbuCU6kibsJkjnIAQRJ1MMIMgUjfD0%2Bw%2BKfAtUF4l15vCtCUP4SClaxK%2FZSSsQZeZ8isYJg%2FKmz%2FKCK00Idlqgq4kqBIjqfvtEZh%2BHzdKkY2IKXwCXBXdGTRO8NJ0nF6q%2Fvl%2BNRBdu8xfSJ&X-Amz-Signature=9e2680dbca0b4b8f5edf4373aa7aa503630e6fcafc4f6911b3f5ab1807b8e5f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664POZZH4K%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T183947Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIFXrlrTH68bXVGoCTUjnV3VbHDmFMuAYQqvYT7fcPkpKAiEArmokZJ9D62iXkN3qm6zjAEq%2BjSjA8Wc3HkkHbdBIxbYq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDJbFKkyk2BLY7CraLSrcA2Y8TpwYettQEAPyoLiLtpump%2FZt8hKQC7%2BUeeC47iqhIVcwu1rn9wKOLvOdoe4wbOsD61zm8MgrtG7vKTLsFst0sT%2FSIoarGGWZt%2BfUOyuUslZjzGohJLQWTZ5xU2XM8U%2B6fuIdk76ajD1lyhlJlTdqxJABDkzYtD8zuFe6uc0o6bT%2BNVpQCkAgcAI478iY6kQUqnrp32IO0Mcr%2BRAnGksFVwDg2wQQgd6myzSRs6eZdwRZpWW3ilBuBVurTLizuaMJI3yYeUzarY2vA6rjMEmZ2Iyi2RBzH85hjfomqglxsqfe5CLuFlCTacOAQvemtXHcBFM2dSGsYpo5MPXF5EcEw0qVCnWenGVyLBvC3n8O4rD1oFJTe1VrAEVWPHQpgfoBvo6d4Tv2nZp2fRr%2BxKdPU7V8XJZikyxbvUJHk720ZRPfazmHWDr2wYvrZqqY8HOVyZXYJa%2Fu7CZQ18A6DaKni7FNv2KuJgklMLS3yQmSb8KKCYYfkQJO2%2B2gRDTHyl4ZbRQaq8ZHGpgBjHu5JcAldoCnfN9BjT%2FYbnWdWVxSuMvuLatUS0odMfPrFRzKWjmtJ7ZYTkcNboEX0g6PcQAlEkAtnH02QuWj0s2cgc4wLi4NV6x5BaEaBZtOMKil680GOqUBgRhK%2FarwtK9MGRguEgjRKeyPKa71ozMsxkUEY4c8xT9t5YyD2UAK5%2F060F85RhqGs9y1geUK%2BIhk46Bf87LOto9pCvop3h5uGz1y%2BDGtObmQ36UxiGkEECZZReVRe%2FCL33%2F4jbqDDTCnZRfwefnpApbgGkrBJs%2ByMUQKhnX5ZinHyRmsV%2FQO%2FDSEuTc%2Bn5dLFG4TSu9obpiiizf8XQgJN7u%2Fs19k&X-Amz-Signature=acadf8b800023aa2208be755cbaa21e8291ce983b9bc9da64244ba9acd65cd0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKWYWINE%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T184010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCICzDtryc6hOct1FY8G9ZWKS8eZdnX64JxKeTOxlk%2FDeYAiAn4Ns1n8HmbWJlWI%2F%2BWxY9SG5850597XfcFvq8d5mXFyr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMzCGtS3iqZS4Bx5AvKtwDfxNl27bh1mezOGTmYhsyujFdxwp%2FSlZhyPJfW9tIki%2FlwkPnofnBxlMi63l%2B6bgRLYYZbGfBwt%2FvdC%2BkyUzQ1xLKtGTQTGtiMQJmWsKKG92KCrnRE%2B0OrRmpMsGTWYThvIKUqw1r3FkDIp6JRtmu8Cd5PPVSGpggG%2FFnmuSx2JHbhPzt7NFqCDEO57R%2BkEB%2FhxF0X2lD17cLDS1Ke6ENY3kTy6SxbJHoubjMN%2B67QWfB%2F%2BLyT1uBoM1qvJiyB92wpOKgw0HrU4QwI18HuAmPf3dKUSMGPbxm4ixPGR%2BhhnPxjYXrgtFZV4yLa%2B64YyQU90I%2FRcMQJ7cj7Ml8a8UWcE3tqu%2FXWmqgMX4GRDQppN%2B9H3BZDEFhd%2BD6S8V1JuudtQ3dn33JBqfo0CYtg4HpsiOu4KUraaoIJYTJmNA0k%2Bjd0Jw0SAjU70pR0NWfAuDvnlOGBFubClo2GpnF7vRri06qbgJ8RRcii3Nitlp9FTj2sLw8B7o8sa3NqPRedizHxSJ01%2FE1AUtfZEEkyi0HTvcwZY6S8v07vCob2V7kZPnYFKX1zVnir0LP0uIYZhoryLlDeWers%2F%2BYeIr1VdP%2FNR73nMyfQ4Z7Jrsuw2ONMCHi0mY2%2F4YR%2BnPK6AIwjaXrzQY6pgE6zwodyKarnU8C9XOKyZ4HInreZepocA7Pr8s%2BDVz2Ctt4M3wnZD4NKqPyTAGjeH3HFxJ3XG2mUrFvjelJMzbI3O%2B39nnRZUQeEkOYnF78eAHogNXlu6xXOMW32zaCZ93YfktXvVSUvgO3ZgIZd9V4INl3WLCzdL1atVsJryAijmG3EtsIoV%2BHIsSSzrM8kXKTyq66v5a7ihWcFQNUyiEZipkOtTLh&X-Amz-Signature=00dc1c4e21d1a37e0e4df57eb928621199fc99d8198b3054853c252017dc3ea7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKWYWINE%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T184010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCICzDtryc6hOct1FY8G9ZWKS8eZdnX64JxKeTOxlk%2FDeYAiAn4Ns1n8HmbWJlWI%2F%2BWxY9SG5850597XfcFvq8d5mXFyr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMzCGtS3iqZS4Bx5AvKtwDfxNl27bh1mezOGTmYhsyujFdxwp%2FSlZhyPJfW9tIki%2FlwkPnofnBxlMi63l%2B6bgRLYYZbGfBwt%2FvdC%2BkyUzQ1xLKtGTQTGtiMQJmWsKKG92KCrnRE%2B0OrRmpMsGTWYThvIKUqw1r3FkDIp6JRtmu8Cd5PPVSGpggG%2FFnmuSx2JHbhPzt7NFqCDEO57R%2BkEB%2FhxF0X2lD17cLDS1Ke6ENY3kTy6SxbJHoubjMN%2B67QWfB%2F%2BLyT1uBoM1qvJiyB92wpOKgw0HrU4QwI18HuAmPf3dKUSMGPbxm4ixPGR%2BhhnPxjYXrgtFZV4yLa%2B64YyQU90I%2FRcMQJ7cj7Ml8a8UWcE3tqu%2FXWmqgMX4GRDQppN%2B9H3BZDEFhd%2BD6S8V1JuudtQ3dn33JBqfo0CYtg4HpsiOu4KUraaoIJYTJmNA0k%2Bjd0Jw0SAjU70pR0NWfAuDvnlOGBFubClo2GpnF7vRri06qbgJ8RRcii3Nitlp9FTj2sLw8B7o8sa3NqPRedizHxSJ01%2FE1AUtfZEEkyi0HTvcwZY6S8v07vCob2V7kZPnYFKX1zVnir0LP0uIYZhoryLlDeWers%2F%2BYeIr1VdP%2FNR73nMyfQ4Z7Jrsuw2ONMCHi0mY2%2F4YR%2BnPK6AIwjaXrzQY6pgE6zwodyKarnU8C9XOKyZ4HInreZepocA7Pr8s%2BDVz2Ctt4M3wnZD4NKqPyTAGjeH3HFxJ3XG2mUrFvjelJMzbI3O%2B39nnRZUQeEkOYnF78eAHogNXlu6xXOMW32zaCZ93YfktXvVSUvgO3ZgIZd9V4INl3WLCzdL1atVsJryAijmG3EtsIoV%2BHIsSSzrM8kXKTyq66v5a7ihWcFQNUyiEZipkOtTLh&X-Amz-Signature=00dc1c4e21d1a37e0e4df57eb928621199fc99d8198b3054853c252017dc3ea7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663OBXI5WC%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T184011Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIF%2BM6LXs%2BWW1ws6iJ%2BuJlGgFKqEnnIyNEo9NPcQQOB6aAiEA0rHUGKDvg%2B6CUyJdMdvo%2BJqLWVP32VwkfdSGHEOMpacq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDDS5%2Bd20lVUxOPxacircA16rovoI8IcsghNI5DfBcjxQ1BISA7YL8qyj6iLcUpIhIxsZKjgZSjsMxXIvVqOMMaKRkIlN8zSKq0xNuGpPZSyNy763fGeF%2Br8JpYRQjEfcox%2B4ovdnaHHLKio6E9unWTOi0ki3CbqwOMGTR3c0N0sUbly5ur4MaJvl6ltYOPipM6Lbe5QXo%2Bdz0wh6bFxIuDRcYrqr%2BqF4CtRQ3FWm9efhSEH8DyhY9CkDQ%2FUHsYsYIzKUuCn6%2FCb7D9auUho2J%2F7MphQ2Fy00pmtFNFDfIxgnicT0oVLbRVmuhJYL1v4I5p%2Fzvjm2zq2mSwQuJEzDqEkT7hhXlZ64P7zkZjjWzfMXaUayOQZa5NLGAVkk1Io9skosJK41OrBfZOsjV70HohssIm3hcCPII2yTqCeYL7tYD57%2BjZ%2FUlVfobL3PZATM%2B7bS5nq3jjy2ZEfXj1j95bJZAFjr0YuS9TWobpmRSXji3%2B2gL2oQdvzUYd5Og9QAI%2FM2uCjcEBssy135KSCg6WDVwTqRo5y3M83jMsL%2B%2FPs7olOUQt0tpNy7%2B7Ea9yUlxVXl02pHG8rswRvMAzW37hnqClRzOU99sLlQGiunZDlQ9cBz7TjWxKd3XX8MDfLrzO1hWW6AB0zS99WuMI6n680GOqUBH7JpBtK6MN6TijjWEFwKbOfbE2ytZj5KVwpJQ4tkKUcRgpBY1K5UFiz2%2FLO4qDp8s25MU9Y88hviflV9b1hj49gKD%2B60sjw7HOvjRlkOnODdL7Dbyttv7jduh08PYeLe5JXdX2p9%2FLnqGqoCj2RvznGyK0J9lNlhPAKBfQe3P2i91GqBChIKvkntXO8tiCUlET0%2FmGcuH4LxGE1RB8FsHL6kzjWr&X-Amz-Signature=786ca288cd14a83192a63995a399a9daaec7b467f5089e01e460a90d6fe829dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

