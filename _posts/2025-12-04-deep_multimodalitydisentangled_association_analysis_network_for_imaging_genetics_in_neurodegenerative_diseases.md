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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVGOBHV7%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T043233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIHsLM1WbSYY7tGFggz9%2B249BlEvnD%2BgEC3rrHfei476MAiEA4ugYPmbg5fYhTx%2Bq2paGkrf3hnGYGrkr14QJRB%2Bhjy0q%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDOV5iq2oEt2t%2B0QPBircA5zPLZzoaQASZnyc%2B%2B3LVHSWD%2BWXAyv58ujQ%2FqL3OTkZiPI0zOdKCmR0Jx4XQOkjv4jk1sxFP8I94FT1IhbdrJm%2FoYHA1qH3AmgT3TcQFm2TLyCbk2zQeRu3mBWmd5W5%2FakfATj2TtrKQaJgnayu0MJ5ZhN9FjOfbMsn5NSfuiXySfdXKamT7hQfTFSG%2BT2fGoG60ADxRcM5uAgy6XtrmhdpYJfKTyRj1divPe55lmixqEykjIh16yJtNBHxeZUTqAZlnyP0fBvQ%2FF5HZf%2FVZNBISzuzKCh83wgs15FieYck3IVMtSThLYsPgjOt3BTUbeXnyaFsvYqmd7UPscW2CQZRyCPN4mAxS8M7twG2ShyroOYCyuRPOwyxA2QyBdCVQDJXYPg%2FbyLWu%2BS%2FCtuS9GNsUKkA%2Fsmjs7YJlQAiOZEYCA9Maxby10wRj6luqsthrrG%2FXuxD49Y%2Fv5bJomlC8kzsB3EcrhqLb9ljCpR%2B51oQGLECwYu5%2Fbh08KA7%2BqHr%2FwUnOruiVohrNyMdkUby626A9YlsyX0ZLZ2qt9yjb8n9chRJ16TfpIj4prRCE8ZOM1Up%2FnT7I7w5yFAAleIkfKe%2B6tuYBOV4cOuOeYAg4pQokX1aJIih0ddiwWmEMNjmp84GOqUBstxykT8YNlLYZWKykLvFPIfc7uio09vQezTdrArFXqVtGLGXLcK1%2BFEMTeYb4eejSJBcGkHb9A4xk95BfUtbi5GTvcrbZsLNND6Z5lbRJKEQPHDrGjgZs8mqegr%2FMbHgqcALQBXTd2Z1NhJAXXaN7Ja2lVZjQBd88OOXg3sbyY3FSxQD3pI6PRd2Zc1pbFyUs1zRQRGxN4uXZ73lq7OgTnIEjAaN&X-Amz-Signature=3e65f511665186f598275aaa9a87a0367db883b2125d63513e4f0579f224c8f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVGOBHV7%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T043233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIHsLM1WbSYY7tGFggz9%2B249BlEvnD%2BgEC3rrHfei476MAiEA4ugYPmbg5fYhTx%2Bq2paGkrf3hnGYGrkr14QJRB%2Bhjy0q%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDOV5iq2oEt2t%2B0QPBircA5zPLZzoaQASZnyc%2B%2B3LVHSWD%2BWXAyv58ujQ%2FqL3OTkZiPI0zOdKCmR0Jx4XQOkjv4jk1sxFP8I94FT1IhbdrJm%2FoYHA1qH3AmgT3TcQFm2TLyCbk2zQeRu3mBWmd5W5%2FakfATj2TtrKQaJgnayu0MJ5ZhN9FjOfbMsn5NSfuiXySfdXKamT7hQfTFSG%2BT2fGoG60ADxRcM5uAgy6XtrmhdpYJfKTyRj1divPe55lmixqEykjIh16yJtNBHxeZUTqAZlnyP0fBvQ%2FF5HZf%2FVZNBISzuzKCh83wgs15FieYck3IVMtSThLYsPgjOt3BTUbeXnyaFsvYqmd7UPscW2CQZRyCPN4mAxS8M7twG2ShyroOYCyuRPOwyxA2QyBdCVQDJXYPg%2FbyLWu%2BS%2FCtuS9GNsUKkA%2Fsmjs7YJlQAiOZEYCA9Maxby10wRj6luqsthrrG%2FXuxD49Y%2Fv5bJomlC8kzsB3EcrhqLb9ljCpR%2B51oQGLECwYu5%2Fbh08KA7%2BqHr%2FwUnOruiVohrNyMdkUby626A9YlsyX0ZLZ2qt9yjb8n9chRJ16TfpIj4prRCE8ZOM1Up%2FnT7I7w5yFAAleIkfKe%2B6tuYBOV4cOuOeYAg4pQokX1aJIih0ddiwWmEMNjmp84GOqUBstxykT8YNlLYZWKykLvFPIfc7uio09vQezTdrArFXqVtGLGXLcK1%2BFEMTeYb4eejSJBcGkHb9A4xk95BfUtbi5GTvcrbZsLNND6Z5lbRJKEQPHDrGjgZs8mqegr%2FMbHgqcALQBXTd2Z1NhJAXXaN7Ja2lVZjQBd88OOXg3sbyY3FSxQD3pI6PRd2Zc1pbFyUs1zRQRGxN4uXZ73lq7OgTnIEjAaN&X-Amz-Signature=3e65f511665186f598275aaa9a87a0367db883b2125d63513e4f0579f224c8f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRTEFMDD%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T043234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCICLYXW1Uo%2BeJefReNk8tr8IQoBu3x9pKSAQxeC%2F39d8EAiAt1HdjgfbyYQOdNxsafcHsifuEcUlB7Ih3oWQxPgFyfyr%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMJmZsPVils67OLifSKtwDeW85cUXlF%2FFXb0Kkxmu87N%2FAlC1zwjjEOiFfj%2BevoBcFYaUE9WqFLujcQQfp8V4ysXmwAoGnSZ%2B8XR162t4jh8Myrze8RVhqRVTU3u%2BuwD6alNGK4VtXUL4zbxtabd0xHsSgdogn8aTTUtG3L%2FCtmWTWewh%2BOYg4%2F%2Bji84dx3WJq3E%2FHSmFs4AtKMfeuQ1T9ljZRiPDCfhtStogF7%2B9UhqPZOQ5jGoFUcTguWSB2C6qwzVngtfBEyT5W0NA2VUtJ1QeKLzngmeqZFhMZ%2BBL2JhSUdSVS9bU8aGRJquodd0jH42T4WlJlL805zLuMqxqhyj6R3UyIxF%2BGwnu6D7i1VaZyH%2FoVbJrVQh40T%2BQs%2FWNtZhb6W1I7n5U9nvRny5ZRhlBEDgSX9MVygWgLpE3RZfJToCnmXbO1MixvjW1yJ15%2FaCwasUcJYHL3tMA%2B7XQFrVMJuMe8VHFXnDOyGEbL63jiSupHDhicctlYt3v%2Bu6cuyMHTWzt%2FrIFT%2Bt1XhzegyQt5VZmnDIFFbdussfCHcHkzMjmksNfh4qJF2IqnRqzEOKM8rbn6ixvzNi45UPxuKTdSh7KBYyMyRGt1B150N5%2Bw99AJoqHaCWk0sYAqNc%2FwkaEdojfrEmhJq3QwvOenzgY6pgEKPUgDHgCIf8VtiSietifuiQudGULJMzJNJ%2FleazxKKhOsY0zygCQUYhfV1K1NFPSoNjuHI9%2BU7hIv8QZZUC9lRJ8RgYJigrBuuVOmQLLz5jeU756RpAFKQrWO3oZSq%2BMFVmq%2FO35cVU0%2BO0g%2BjY5WXWquMWyLP8G0MiHsnTuQC%2Bx3xKnC46nBo4SGC4NMFf4mCLY3aXWpxzRazMwcz1dFeSN1RTJM&X-Amz-Signature=980a558912a2ed2dc9129c73bf1517282468784a318384720ed3cf5a7d876208&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EV453VV%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T043236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIQDgNgln1orSVjF3dpgjtbx0laG3O68bcur3su6OoY1NOgIfZYRW75s5niFCCyg2AeI81r1FY29GhSa23V%2FnGMnjfir%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMkTo4HjNTlWsD60zvKtwDtjmTzoOaArLFoWaFLYApJhJqO3rqMKl0WBgIAHDUJWrGKN1oNtVK%2BqUAdIviVzA8clM%2B3Y2tK0Nt01EAWazqcGcxfztLTTr1WFcZmjNq6547TClSVcG7eSny1%2BIzENPIyHAzDALX5rK7ztCenvYQTXmosZkxCzuNGM9Qechc6r4mSaaoV9g9DFRAeM9birbVQ00o5%2BPWJkRlFmudR%2FI7nZhr2SBYos2EBhFDMYokxH2lMy%2FFdCKHxbpNUCsOjJgPgPQMnT8NUohbbdbE2Hk8OPNAwAHA2y%2FC3B8s60zd54Mkc4gRhZphQGeVvkN1ZmkajGpdT81NcvgCv7LQI9SF7qi1TT9BFtAEdvnaNUxI3AlkB%2B0yZLG8pF5Vus2TAvJDiqrDmNqNwpmXC%2BuJcOZm9%2BCXwczARS1%2FWihJe2KRSgkxVVqr7BwKQglsK3ZeUx7MKaJiSEu1xPUsXDAZMoEcmBlruQ%2B%2BQRaXwbU2e686droKka5zPpcdVe1Ki%2FVSkATh3%2Bg6DBoVGTWkfmFsf7yYwbgON%2FZn7t6kg1Kai2QfzqKAJ6NuX8Xexb2AcQNcPFZ7HlyOr%2BYdQ4N0Lm5QGx8SsHDdbYi9OE4jJIA183v1If0uVU74yElRi1OtokgwzeenzgY6pgGMRMr4e7Ijhaun6%2FyYsgc7P7mk9DElr6QbJ4QBYSSyhlP4CGSJf%2FXq0uQOy3qHl%2FwcONwbiTP4vIyZZUi7KNQuvCDu%2BIEW4TcMMuBNNBe3sIs7bzBKRfUcwREFVOZaPQcKC%2Fo2Hx27iwVDL3IurS0yvdVjKMoUCKpf6REPNLxit8%2BH5LK8YDMsg0FNBZkGKz3lJ9T8Ob%2BDk3MpWzF8%2Fg9xnKDedO6w&X-Amz-Signature=c2b7fb435939dd6619d49c6f9186f0bd0a37cd3c4404331d56691471c0916387&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EV453VV%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T043236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIQDgNgln1orSVjF3dpgjtbx0laG3O68bcur3su6OoY1NOgIfZYRW75s5niFCCyg2AeI81r1FY29GhSa23V%2FnGMnjfir%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMkTo4HjNTlWsD60zvKtwDtjmTzoOaArLFoWaFLYApJhJqO3rqMKl0WBgIAHDUJWrGKN1oNtVK%2BqUAdIviVzA8clM%2B3Y2tK0Nt01EAWazqcGcxfztLTTr1WFcZmjNq6547TClSVcG7eSny1%2BIzENPIyHAzDALX5rK7ztCenvYQTXmosZkxCzuNGM9Qechc6r4mSaaoV9g9DFRAeM9birbVQ00o5%2BPWJkRlFmudR%2FI7nZhr2SBYos2EBhFDMYokxH2lMy%2FFdCKHxbpNUCsOjJgPgPQMnT8NUohbbdbE2Hk8OPNAwAHA2y%2FC3B8s60zd54Mkc4gRhZphQGeVvkN1ZmkajGpdT81NcvgCv7LQI9SF7qi1TT9BFtAEdvnaNUxI3AlkB%2B0yZLG8pF5Vus2TAvJDiqrDmNqNwpmXC%2BuJcOZm9%2BCXwczARS1%2FWihJe2KRSgkxVVqr7BwKQglsK3ZeUx7MKaJiSEu1xPUsXDAZMoEcmBlruQ%2B%2BQRaXwbU2e686droKka5zPpcdVe1Ki%2FVSkATh3%2Bg6DBoVGTWkfmFsf7yYwbgON%2FZn7t6kg1Kai2QfzqKAJ6NuX8Xexb2AcQNcPFZ7HlyOr%2BYdQ4N0Lm5QGx8SsHDdbYi9OE4jJIA183v1If0uVU74yElRi1OtokgwzeenzgY6pgGMRMr4e7Ijhaun6%2FyYsgc7P7mk9DElr6QbJ4QBYSSyhlP4CGSJf%2FXq0uQOy3qHl%2FwcONwbiTP4vIyZZUi7KNQuvCDu%2BIEW4TcMMuBNNBe3sIs7bzBKRfUcwREFVOZaPQcKC%2Fo2Hx27iwVDL3IurS0yvdVjKMoUCKpf6REPNLxit8%2BH5LK8YDMsg0FNBZkGKz3lJ9T8Ob%2BDk3MpWzF8%2Fg9xnKDedO6w&X-Amz-Signature=fcb8f405d00095d14c2a508554c8b10380ea9e2b1e8b35116350bc6c9601ad6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJ3JQPCG%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T043236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCICoZG0KYh5ccLX4CtklWog3FSGi7idYTAAuwfgPatalFAiEA6rWKm5xbJjLBKjZxUSdquNHBywFr8EHmaimu9CW1AAMq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDOe7P6Sek7LC2xcpYCrcA5caODEB7Li3WJnOCI4e2LpTOajQBoJzxz7tqtq957tUW3Kob9nHyCaQTaqyNCeCsrYUvgEOhbW9iVY6dDctcrTHVuKwOluaH%2BqoBuw3qZ8AiZEvD%2BYjK5cnVo5Jodc%2FV%2B1TSK699Zlzf2JoCCVhQQ%2B5vR43TVjmYXm3QCI%2FF0%2FXOPswIcTwdEXlt1CSjUB85WmNnbLfiLgCkfJ4vWOtCgyZ%2FefhF3XhRbDK2%2FGGfw8It4zneQeGHQZtpJt47OtAH1XkdEYCFbYtXxHI5qX4T2WTRqc1vfgOlcDNG0tRdK9FN4dZizinAGMQmUO2WZq%2BHCnUnjD4p5m7EvR%2FkzkUCRwaH7bGbN8Jvlsy5J8nYNe%2FkVZQp5AajWGpDsk5vd%2BcCUs6MYE7mwE3WeIKGbm4NcAaJncQ30C7fyPBVvbWLvUdhMp2vUQe0B6shElmSQe5Z3qUAiL5SQBzniTlYGEC5akWTstFsU4iUqfPfnrxd%2F2BdqWEcSpYT5h35FxJk6qrrc7nxytH2erqwb3EsdWIJhsnmoSSHCewCrfU17F1yr2dU1FPQGReWck5%2BQL0p8k0%2FKPmcBEPBduNTLAwpYxxv0plYxcqNM6dytT%2F6BX7HMcOH%2BRgj6Z097DviJnSMIrmp84GOqUB12xGiBaM1E%2BpStHzvYuqgB5fU8NiqQLPyafDeaSBEm7SmwenUhtZCnqK8NjqRbQ%2BpleIqXSu9ns5PfK8bddVHtct8R2OPgYvRWlTsAQSw0%2BNGxMLkX4%2BHiSg47Nmq8dd6xGpbsGEgPre0Tg8UbUZe9fdJYH4BuNKo1bjt1VF%2BITLXzROgt7LzU6NY12iIEztPsTSp%2BrtnfbkHI1jsjQxTyUEFCtU&X-Amz-Signature=399794ca15ff21d7472d72174cf445977aec9884140a8bf71eb3339cc4537a73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRTEFMDD%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T043236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCICLYXW1Uo%2BeJefReNk8tr8IQoBu3x9pKSAQxeC%2F39d8EAiAt1HdjgfbyYQOdNxsafcHsifuEcUlB7Ih3oWQxPgFyfyr%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMJmZsPVils67OLifSKtwDeW85cUXlF%2FFXb0Kkxmu87N%2FAlC1zwjjEOiFfj%2BevoBcFYaUE9WqFLujcQQfp8V4ysXmwAoGnSZ%2B8XR162t4jh8Myrze8RVhqRVTU3u%2BuwD6alNGK4VtXUL4zbxtabd0xHsSgdogn8aTTUtG3L%2FCtmWTWewh%2BOYg4%2F%2Bji84dx3WJq3E%2FHSmFs4AtKMfeuQ1T9ljZRiPDCfhtStogF7%2B9UhqPZOQ5jGoFUcTguWSB2C6qwzVngtfBEyT5W0NA2VUtJ1QeKLzngmeqZFhMZ%2BBL2JhSUdSVS9bU8aGRJquodd0jH42T4WlJlL805zLuMqxqhyj6R3UyIxF%2BGwnu6D7i1VaZyH%2FoVbJrVQh40T%2BQs%2FWNtZhb6W1I7n5U9nvRny5ZRhlBEDgSX9MVygWgLpE3RZfJToCnmXbO1MixvjW1yJ15%2FaCwasUcJYHL3tMA%2B7XQFrVMJuMe8VHFXnDOyGEbL63jiSupHDhicctlYt3v%2Bu6cuyMHTWzt%2FrIFT%2Bt1XhzegyQt5VZmnDIFFbdussfCHcHkzMjmksNfh4qJF2IqnRqzEOKM8rbn6ixvzNi45UPxuKTdSh7KBYyMyRGt1B150N5%2Bw99AJoqHaCWk0sYAqNc%2FwkaEdojfrEmhJq3QwvOenzgY6pgEKPUgDHgCIf8VtiSietifuiQudGULJMzJNJ%2FleazxKKhOsY0zygCQUYhfV1K1NFPSoNjuHI9%2BU7hIv8QZZUC9lRJ8RgYJigrBuuVOmQLLz5jeU756RpAFKQrWO3oZSq%2BMFVmq%2FO35cVU0%2BO0g%2BjY5WXWquMWyLP8G0MiHsnTuQC%2Bx3xKnC46nBo4SGC4NMFf4mCLY3aXWpxzRazMwcz1dFeSN1RTJM&X-Amz-Signature=0781e96331d6ddcf96ec6177da8d6987b31ec79907c0ffdbcfb8906f8b833b75&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XP725BGE%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T043237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIBqfwns1ZFtJiiw%2FGtvQy83Z8WOUsgZ%2BMeTUucs936HfAiAByXX4LatSjLFhXUCHdbrpIKuSQNFv%2BLeX3rMJfIdZzSr%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMM6gI1W19yURi%2FVlsKtwDFbI0CKRwamB7d2PtAI84L%2BFHI4QzpWb369qZK%2Bv8M1ow14ZW683rntIPqsw84Rz%2BMqf5%2F%2Fvzfg5Racs7PXRNCQ04gOUx2aMw84SDXA0a%2BwN8Ysha0x%2BKniCiBk2V%2BVmugKeM5P3bZ7JIXIfhfOM%2FANYcgiiC9eMbC3RXYmdGQ24ZQ%2Bgdg1%2Fhsg2sWBEziwl1pMkdkX21LvawIaNFLTanq5d1JIzMAcNiP6pAvjmO6x0sZr7o6Lcg06F%2FhhdJ0WjEDMe4vd5e01zpbYpDh6ljrdYbsYnRrQl%2FKWCYONMhlHEdZvvTvl41TXfTOP2P1pqn7mNAOwCIbFP3htLQqk1s4loVlpKWDVa7Ang2yBLMwJ8P%2FENQ04nl%2BctgoSxMtTOmkHejhUxWsg1NoKLn36Oo9%2F2cGPWMSicJk%2BkcOODpoxc46se5I%2BDzHxNwdO2tr5x7Vdh6o9ZxsXvQJRTIZU1u5g4KKy6nqm%2FmVjG7rd69Vmr5ABMEmURvazc9xLOZV%2BTH8qAYLspsaMHayS5n7nv%2BR9MaMIl0mZZTKxV9g%2F94EIkmPppmDEcElAggQ2tw7wmfaVov5L2xVZrbTLY6WgLiAgQ0%2FtSlEBl%2F%2BvONI%2FNwLTe8AUSulapzrln9Kd8w7%2BenzgY6pgGvKUJj2cQgGd8qrXs2CCUhj00Si3GrXcdnjpv%2BnDK%2Bw98CFgrxFjApkOFIyaAInHJ1jY2o5XkTO62fTDfhQ3Ls741tyFvdwC1zaYQ1VfLgB6oiQ1D5wPZhqhkHuwRCTqGl0OzSQdrICavYbrhF53z%2BZ1Bsm7spqCZkH5bhDSfIX5JF9XjeHlpm6F8WGO%2BadxrxqxcyPCxtClJ3bjwIv3gd1shi6Q%2F%2F&X-Amz-Signature=e61038e7ac46038bd03d3c54ea015ac5f2d84e4191deb229f4879fe1e5c733a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3N6BDXD%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T043238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIEnzxXY5WYJaPU6aartgegyMlZseB1%2Fhursyol%2Fgtl9DAiEAqs4J1ELjXe3WB%2BvbIG9LcpdTa3OmsmIekLKJE0XNsgAq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDC9kaybl77jhlOfrwircA17onTHTY0B%2B%2BaQoxYZTZwS8UEbkjLpROirGxF7UhwOMDQ7nBFDZ0av3Fwf271nCTP0k1vlWS2gLWstn9e3JQlF%2FHqKuWmSRQ4N3Q1WjHxtEqtCCx1vhf6whS2nRbUzTQbqQNU7OmDW9mbwDVA4VSBGeAUwYO2%2BRV%2FmX3vGgDzQ0MGaR0ZdFfbYXkcP1guUVt8ZK5bw6ySwmKJQXjUzp3ULOzYBfayP2%2BwdlcOySj0sYTXMAHXzQxhBA%2BV0AnOPQZEO%2B%2BhsYzjpEiJsGetIMKtmI%2BdHBMyy2gxKM9QAGCE2XoamXXOPrcGDhjTd1D8Ptu4WOwJ6X8KIsFBarWii3cXBNwp5DCAAFZUZvs7n6oIjpubZfR7Lo6KB4pvzSyXyl5gwPttNe3icdkD8Izu20hgg9VzOlNmHqXhyjqCGf6hdID68oZCW%2FgjSpBIgTFkJYBycT4r%2BlVQsnPHkiUIWXFLcE2FFJlUON8rbHIWXWJHDjXEtctu2YUrkQp2KqMR55VUpD1KcyYLB4pPEUg3XmtyFXz58J0iL2vMdz%2Fue%2FLQKvXH4HYowwdbAhE87AiabMSFRkRq8nrfJcMC68AE%2FjcGwOH%2BBZh7veZIK5zgdhGrgImFYmami7YJoLju32MITop84GOqUBzfGaRleOMLiIsyyZN7TCPT6F4CKTAtuDPfiMCty5fYKlfNIZi2NbQqHMRQYW13uZceMQmsMPvhnam3jNIAnDevbMktt21zXMe89I6nTU6GBCxQjWJMG3%2FHCRqyvDe1POAHFsvzkkkGiWp92NJEn%2F4iEMla00nWtZR6%2FfLjPTKHi0bIQC6rXG4C%2Bb0iXqdLCIODvTaJixM15tJpiiaoeH8BEs%2Brkm&X-Amz-Signature=dc8c129765d7f2c9a095cea85ffa56e647a5d16ecfd664649506c729fef9cc59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3N6BDXD%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T043238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIEnzxXY5WYJaPU6aartgegyMlZseB1%2Fhursyol%2Fgtl9DAiEAqs4J1ELjXe3WB%2BvbIG9LcpdTa3OmsmIekLKJE0XNsgAq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDC9kaybl77jhlOfrwircA17onTHTY0B%2B%2BaQoxYZTZwS8UEbkjLpROirGxF7UhwOMDQ7nBFDZ0av3Fwf271nCTP0k1vlWS2gLWstn9e3JQlF%2FHqKuWmSRQ4N3Q1WjHxtEqtCCx1vhf6whS2nRbUzTQbqQNU7OmDW9mbwDVA4VSBGeAUwYO2%2BRV%2FmX3vGgDzQ0MGaR0ZdFfbYXkcP1guUVt8ZK5bw6ySwmKJQXjUzp3ULOzYBfayP2%2BwdlcOySj0sYTXMAHXzQxhBA%2BV0AnOPQZEO%2B%2BhsYzjpEiJsGetIMKtmI%2BdHBMyy2gxKM9QAGCE2XoamXXOPrcGDhjTd1D8Ptu4WOwJ6X8KIsFBarWii3cXBNwp5DCAAFZUZvs7n6oIjpubZfR7Lo6KB4pvzSyXyl5gwPttNe3icdkD8Izu20hgg9VzOlNmHqXhyjqCGf6hdID68oZCW%2FgjSpBIgTFkJYBycT4r%2BlVQsnPHkiUIWXFLcE2FFJlUON8rbHIWXWJHDjXEtctu2YUrkQp2KqMR55VUpD1KcyYLB4pPEUg3XmtyFXz58J0iL2vMdz%2Fue%2FLQKvXH4HYowwdbAhE87AiabMSFRkRq8nrfJcMC68AE%2FjcGwOH%2BBZh7veZIK5zgdhGrgImFYmami7YJoLju32MITop84GOqUBzfGaRleOMLiIsyyZN7TCPT6F4CKTAtuDPfiMCty5fYKlfNIZi2NbQqHMRQYW13uZceMQmsMPvhnam3jNIAnDevbMktt21zXMe89I6nTU6GBCxQjWJMG3%2FHCRqyvDe1POAHFsvzkkkGiWp92NJEn%2F4iEMla00nWtZR6%2FfLjPTKHi0bIQC6rXG4C%2Bb0iXqdLCIODvTaJixM15tJpiiaoeH8BEs%2Brkm&X-Amz-Signature=7899db6e89d042e16156e059a901e95c9f0106ddd0e8a589a57f929d5a8f5fa0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPUB73WG%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T043231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIAaxMMWp9Ywn2UdJYlQgjTf9Mt2m7nWFWt8VlRoL%2BgEZAiAtd34fTWyJH%2F8O7FzvtTeVbRb0abNT869g86AlibkqtSr%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIM7zQWL4HhtxOLBNjbKtwDlay%2FFH%2FjMLwL10SZZiFcVFpZMpCfGQdNBf%2FsEwJik23pd2gyW%2BpvZ5%2BrnMcvfD0AWd21dmYitgnz0ZsGFIK8AHYy6H23WrvffKFPfdi4PqGwhPlfC%2Buc5p9WjAMk4OAxpIjnULSts%2B6fIVVGwzbGOEB9wkFB%2FF7Y1fkwUy97raftvChAeMMKC%2BPfWc5QaWOOg1L9doShS61Y0nO3r7avAt%2FMpwYIod12tYlIm6hw2cwoVH1wm35J2v7RTj1ERZg5ixP5wuatKSBUauKyOYxMXU1GjqiMFMOLEGKo8KO2NGx9z%2BnpMNpudTD2YO4dJ4erpvrONUyADvCxq02ggGHseTWwKlrVq67czgBYWmcTzYwk6yXvDxE2Ww1Foo7ds8GhXu9zsUkzWu%2BwzHtL28uzGk1PUbCo9RoXF94rLnH%2B5PqdJrMyVU%2Bv3p4KF8Ska1T7Je%2FjqvIr10bkaYdSLukaUduBGKzXVVFZ45nMJLkAvr8ACp0XGIDv0f6TLyfPR9KdslY20RuKGuOvNlhJrpXg0lrXhEh0K2n5IUra%2FeBkPJwO0mPNeDJPwe6LyErMV19J5opTsmcoYuL585Bc9NIcY8OFMLPCB1dU4lumfyu0a7xkIjlMAQiFA0DKe8MwoOanzgY6pgGOZEtPxQMEBsxufEnhxPvRJo0GOE56c1oEYes0isXfyJsphKWaRRKoOFNezjVeNKEdBbB1gxpUiJfZL4l1ICE2Igj3cgTT1RcD4IpdosbpAedhvJK2Jo7F4mvHgGpIBziiP0dKX7IlWUop%2FJcJYPt34GsAyPY2Tb3PhOXHsuWi4m3XXYHJXd0UQFAkWpmPirYGqHBB3NE5mm0J375YNHLvLXsaH%2BeZ&X-Amz-Signature=2ec6d4d49c5da947f5fd57a4bf1a9ff7332e2005197876c289cd111c919556f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QP2UDKR%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T043240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIQChtyFC6IDFIYWcODImSBs9T4ViqLsSCDqP9drT%2BSvpTwIgHRHPAsRVhYH8GUIffyYqznRg3sCjwlq10JkyRcdYzfwq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDGNQU%2BkcTsyGS7e%2FgCrcA3HVT1hBZi%2BPG6gwhquNxgVOdMfW6f8u194hdD4VudFKIDU7Il0UVzggv3noItjYvL9gMM1tFiitNiE588%2FlG8l%2F%2BvdzCmyYM%2BupQlGxHBcl6Jny6jTRmJIxm%2BQ0aNwqZDWlbgEI1htLuqXVSiN9kT77u7cZYmZI4Vg2DQrxqo%2FWtXQVycCh1rXexueSVf2Gn%2BX%2BE%2BCMHNZya1JgUnk6yFniqVPjM2Sp0rw0LFXmO7LroFWaH3MyAFceOcVnc6ludQ88qU8SvwOB9bs4MhpFoeQMxh064FzapDEUW4rWTVB6hG7OeVFrijZnrcAii8592au%2BNv7cErnYzMhtnHHzFkGIs1PusjHpOPGqRgD6Sd%2Brl4%2B89ATNsfqhln89hEaiDsjBXN9JM6%2FETHanYjxuY9GNeR0Dk19wuJYDp2PSZcqDnJ8hM9w2rNeI5rUSOp%2FnhZb31OaUtczmMLC%2B%2BY3tLzoMX6v8LVdgPUoFCZpoqSxLaxTjPcFRzGHrVIYWRFgrUk5sWxnUt8FfxI6Eo7G8TOc1rKONMBQy7l3RixCC0ibwU8zGWbulDxXgUnroOVCbK0VnNXsMZT8wJQos0Au%2BgL5acWdDKmWGoREWRKALTbXxsqbfi%2BVHmAi3PU2fMObnp84GOqUB8RRlCyjLUbP2%2BxY5vmTI2Nd2waGevVvMhddguz5De4YTma3UhdodLkTVH%2BMzuWi4g%2BifH3LxmPckUK%2BZRR7ER2sQRdcpKpw5zp%2BFJUYKtwgx%2B0Zh1NUZWQHWPMUmgcab7L7v51cz8Y8Q7gauVUSu9L9KDd2lM95fM%2Bl9yoysVN0OL67atcu7CWmdRxCDVSp2gHGD75ub3Thf1WjI5G6Ji%2BsVw0Vy&X-Amz-Signature=d04b0553ba8fc86cecb096cf5874663c66a7e993b7f33a1a744f4d2ec245ed29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QP2UDKR%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T043240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIQChtyFC6IDFIYWcODImSBs9T4ViqLsSCDqP9drT%2BSvpTwIgHRHPAsRVhYH8GUIffyYqznRg3sCjwlq10JkyRcdYzfwq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDGNQU%2BkcTsyGS7e%2FgCrcA3HVT1hBZi%2BPG6gwhquNxgVOdMfW6f8u194hdD4VudFKIDU7Il0UVzggv3noItjYvL9gMM1tFiitNiE588%2FlG8l%2F%2BvdzCmyYM%2BupQlGxHBcl6Jny6jTRmJIxm%2BQ0aNwqZDWlbgEI1htLuqXVSiN9kT77u7cZYmZI4Vg2DQrxqo%2FWtXQVycCh1rXexueSVf2Gn%2BX%2BE%2BCMHNZya1JgUnk6yFniqVPjM2Sp0rw0LFXmO7LroFWaH3MyAFceOcVnc6ludQ88qU8SvwOB9bs4MhpFoeQMxh064FzapDEUW4rWTVB6hG7OeVFrijZnrcAii8592au%2BNv7cErnYzMhtnHHzFkGIs1PusjHpOPGqRgD6Sd%2Brl4%2B89ATNsfqhln89hEaiDsjBXN9JM6%2FETHanYjxuY9GNeR0Dk19wuJYDp2PSZcqDnJ8hM9w2rNeI5rUSOp%2FnhZb31OaUtczmMLC%2B%2BY3tLzoMX6v8LVdgPUoFCZpoqSxLaxTjPcFRzGHrVIYWRFgrUk5sWxnUt8FfxI6Eo7G8TOc1rKONMBQy7l3RixCC0ibwU8zGWbulDxXgUnroOVCbK0VnNXsMZT8wJQos0Au%2BgL5acWdDKmWGoREWRKALTbXxsqbfi%2BVHmAi3PU2fMObnp84GOqUB8RRlCyjLUbP2%2BxY5vmTI2Nd2waGevVvMhddguz5De4YTma3UhdodLkTVH%2BMzuWi4g%2BifH3LxmPckUK%2BZRR7ER2sQRdcpKpw5zp%2BFJUYKtwgx%2B0Zh1NUZWQHWPMUmgcab7L7v51cz8Y8Q7gauVUSu9L9KDd2lM95fM%2Bl9yoysVN0OL67atcu7CWmdRxCDVSp2gHGD75ub3Thf1WjI5G6Ji%2BsVw0Vy&X-Amz-Signature=d04b0553ba8fc86cecb096cf5874663c66a7e993b7f33a1a744f4d2ec245ed29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662WTAWG3C%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T043241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQDjl%2FudpgGdFkYBDUhbOkjpcSC7lYcKhH3IVOdTj0zg%2BgIhAMQFwCg%2BWVdS7TN1mZUy09g%2Bw4%2B4bD8ZgQ8%2BzrXUWdV9Kv8DCB0QABoMNjM3NDIzMTgzODA1Igxi4kOfzDsO%2B6q%2BhOgq3ANbel7%2FTY409OqIVmHZQa%2BMEWCQtaFYWG%2BD4wc7eR1FwC7mvrg%2FiQwXrrdXV1r9Z6YlQXrvI2eQDuaWK3sCKpO7xE0HhU8Cmipfi0tRWtHbDoVVuX28BxE%2BKjEGsk3b8mUEJXyMn2FaVab4mzIc32XiUNoLEjgh8Kf0810bz22WKe5Xw6UNVyJGjkr0UiKonx%2BDjTyEv35dC8pLEAidVHaxTGOYHswvY6pZqaDoXBGSP%2F02WZ41%2BesFTOIslH1zteT%2B33onUyLIVcbTO4Gu9UL0NMLl0NuJ5JMvlI6xPnFcxW0xWYQYU4iq%2BRz7sptIeZtpYHbUKJ7DlJltDKkkaeXD4oX8J6C35Dop2fuKbuZdD0SgdzHehuDNKhC06EtFdyumXNbODdR14COqWab1QbeWK7KCxeK2EzGvu3EBr4PncmQT%2FdGPKrxQ6T8RQiZB7PSlLDtqgYPzByh1mmhSzt4pCZkA6qYegMJgamBbbzP1DgQ3XI28SZBT2BnEdSnn0iqKI1y5s86FEuCczcBkbivA%2Bm3%2FKi%2FMnc3fCaPvj5lY4l4YHcDgihA1%2BjK2MFf2lmAoYWPe7TlZHX88iidFWFCVjnAApEzSmA55%2BHFM85NN%2FhGbF%2Fx7CES%2BRGqDdjDg56fOBjqkAcdwCN3hNdAywoRBwBgQ0waPwKaVsOBaKHUbmhThAuotHmoAwlX60fpBU3EZh%2BYesHghwzE9S0rcQ3Doml%2B9bhVPAlOqL6Z7qdCDoK%2ByTsrD1YiezDh0hgQ8lj9BHIGfjtQpxDKpR1XxdZh0gUvhiU46Y%2FJd0c99EDAJdrx6pxzJKK1iXjZE0WmqaQ4Ou0NxwyUZFjGxpFAnQ6esk%2B%2BJw5cnebuV&X-Amz-Signature=827ab5eb1eb864742edcd159ee23975ea9183417a0a3a69a2a45d65fc61d375e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

