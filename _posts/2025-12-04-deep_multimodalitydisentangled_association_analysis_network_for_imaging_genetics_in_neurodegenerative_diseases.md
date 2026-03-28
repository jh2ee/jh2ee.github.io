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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645AIFETT%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T101847Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJGMEQCIBYRDZLSAOwiXeGxsiEIo9QF96gW777XI1uVSMZYwiwOAiA3WjvY2NR7TloIWjwCN3OqeJ8bPkMnwrx4VuZYMNl7eiqIBAjy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNrcQMM6tKBT8tUyJKtwD%2BwqJ5wujK3m6l2MASFwtlvyzKmUhFySZDbcLVZcgpuOhJcFi0OqjJN2iwI0R7NVyQSsJuAsgb8eZLibXc05jZDvEvWeKcAmowJVw96f0hvYZvxYs5db6Fukmj7emUXYgOg9TRZ9gIh5uLrsTd6hi4zj0o1fa%2BPPn%2BsNh2UJ82dO5wd%2Fesg4ZA0RWnyNabCVeDw%2BcIvCfHVt466afKkCfClh7UUgJFQLug7zYQJWpmk8%2BYcteCvgVV92Tp8lJV8ak3iBZm4iFli5Jz219GiMNEX5%2FRi0V5z9FonCkOAewGRoqosocuYTz0YCzpRGHym95rhsg3FkYrR1aRR1aDxlFEp6v0aQeMz6uZJjm8JcLm8j7L%2B2YPr1EGpM8IzwlczlHbVJ0mNk1kDjmp7mmlBxh8tJ6b1woF8juv4oEy7MeZj2a0P%2BSrL5bOkQUAciIKJlRqOvX%2BYAZHocadTz%2BYBFg%2FaBcwTSW%2BJy1LpjJEr2T9ra8HFl8KsGOEprRGMszIThKQqnuujlFP5r9qrZBpQCIIKaEXM%2FTVw9CDrZhM3IuveqqSgo%2B3KmXi4bgb5L0RcUKcbe%2Fvgz0Zfz2DiuBpEDuPAwmV9UOFmupRA7baXJ%2Bk4MiEx6MYr0zQuZfwrswxLOezgY6pgFmbt0KQkDZUYZJOlcuXYpn6qOROOI4bYdLgO893nUobuF6jn0QpM1hO%2BGWlG%2BSBAqKlL3%2FN8LPLIrxGBN0ZSDCGTLasQtpY1FVibOdeFe5m5b4xRgHSAvqlfUs%2BxulG8h%2BJYd%2BegXoTfcSnoWN%2BS%2FsZ6mE5rmE2lY9if%2FQ7m%2BIZsFqQGQc7NzkIhPalcLrUqzrDWjUgj6SlyFbjO6Bhrb26%2FFMfDla&X-Amz-Signature=19dd4c1d52bbe703bd50b639be022f585f3f0ea2a39c3e05dc88cb83c8cb95f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645AIFETT%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T101847Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJGMEQCIBYRDZLSAOwiXeGxsiEIo9QF96gW777XI1uVSMZYwiwOAiA3WjvY2NR7TloIWjwCN3OqeJ8bPkMnwrx4VuZYMNl7eiqIBAjy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNrcQMM6tKBT8tUyJKtwD%2BwqJ5wujK3m6l2MASFwtlvyzKmUhFySZDbcLVZcgpuOhJcFi0OqjJN2iwI0R7NVyQSsJuAsgb8eZLibXc05jZDvEvWeKcAmowJVw96f0hvYZvxYs5db6Fukmj7emUXYgOg9TRZ9gIh5uLrsTd6hi4zj0o1fa%2BPPn%2BsNh2UJ82dO5wd%2Fesg4ZA0RWnyNabCVeDw%2BcIvCfHVt466afKkCfClh7UUgJFQLug7zYQJWpmk8%2BYcteCvgVV92Tp8lJV8ak3iBZm4iFli5Jz219GiMNEX5%2FRi0V5z9FonCkOAewGRoqosocuYTz0YCzpRGHym95rhsg3FkYrR1aRR1aDxlFEp6v0aQeMz6uZJjm8JcLm8j7L%2B2YPr1EGpM8IzwlczlHbVJ0mNk1kDjmp7mmlBxh8tJ6b1woF8juv4oEy7MeZj2a0P%2BSrL5bOkQUAciIKJlRqOvX%2BYAZHocadTz%2BYBFg%2FaBcwTSW%2BJy1LpjJEr2T9ra8HFl8KsGOEprRGMszIThKQqnuujlFP5r9qrZBpQCIIKaEXM%2FTVw9CDrZhM3IuveqqSgo%2B3KmXi4bgb5L0RcUKcbe%2Fvgz0Zfz2DiuBpEDuPAwmV9UOFmupRA7baXJ%2Bk4MiEx6MYr0zQuZfwrswxLOezgY6pgFmbt0KQkDZUYZJOlcuXYpn6qOROOI4bYdLgO893nUobuF6jn0QpM1hO%2BGWlG%2BSBAqKlL3%2FN8LPLIrxGBN0ZSDCGTLasQtpY1FVibOdeFe5m5b4xRgHSAvqlfUs%2BxulG8h%2BJYd%2BegXoTfcSnoWN%2BS%2FsZ6mE5rmE2lY9if%2FQ7m%2BIZsFqQGQc7NzkIhPalcLrUqzrDWjUgj6SlyFbjO6Bhrb26%2FFMfDla&X-Amz-Signature=19dd4c1d52bbe703bd50b639be022f585f3f0ea2a39c3e05dc88cb83c8cb95f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYI4B7H4%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T101848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQDtPQT%2BdxH4whwN9k8AgyQaN6MfsXxN3iQ8VffnNlvyzQIgPTUjiXLcGN9d%2BdNnVUWnM6fItG29fH5K3I9%2FbK3me50qiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNGtuDv0pj7QUY9n6ircA8dtjgA%2F4T%2FlyCYTk%2BvtoqUMwv%2Ft8QV6wRPVorFB7rDUfsw%2FEbpBU1X9OANEyZqlYewZ8xZ2y0dDVfWZb1q4qQ1Sx5uOn9OvdTptu42SsdTDtyBUGzeeZengnhNTVs4ohPMDyLiNiRdctS5FBXNm4RjmCZbY1kq5bufTWwxR1MY39zghcxBHVJj38gsg%2Fwxv1HeAE%2FCuByRWBksm2kwXYsn2qoG1muwxaKSkMelt8bLO1YbidIcYQ8i035Rt4CXT79yx%2BVyYLxvuCldQphxY7ZxPxiWP3esGRgKUbh3GiEmdX1lDMKOXYOOPY0l0%2FwsjSm2fjJm4UE3NrIA34giAXXi9pLjFzUnIDf2drGwbU8wO0rYxrwVVEaPdgChNrL9CsM54vr2qUsQD9aeAoKmSaxQlQqJAjhDPKCWrL5ic2Yi5eZNQQM%2FE%2B71zbRP8KMFP%2FJoW1eFM%2B7YSLESIR7iZUqn1I2Cc3P5zq5ZXPdKmun%2B75oF6K2FLzPCPSypW1KEoV%2B59L5ETKcsV8ypJORfPVDQGuzRjqRW3PoDRyxH9ADXtNL5Vt9Oxqb%2FJXwHJW0g20mqTIir%2Fm%2FON%2BdzuSZ5qRgNSr6sUJIzgcD0tRRQNUlGAEB12%2BhecyiSyWrmiMLWzns4GOqUBEeDaWC1eMLmFKEucr%2BaqzXPT4QpZMWokzy6KCN36dkToR28jgTKJORnX%2FlufOYwwLJwmGj%2Bp8p2G47G886S494lv%2B2w2Zs1gKmEh1fncg6wl3wLMiGkNsnnitE9yrHVNok9xQXfY4KKJ2ejUzxdhUpZDX3CDUuOHlbxrhAtXGh8t9NZLaUJM%2B%2B12cyNJfbSJGam3xYaJV17o3S4kEggmEDB%2BORU4&X-Amz-Signature=4c7ce9e4d8aff7737d16608dbdab0c5fef051c51e41807006f1e7553644b349f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665MAA2FO6%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T101851Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQCyPSN3YkpaBWwHRddZKeK2RTBemD7MFaEgTv9U8WgfOAIgXAOyPElmW1T727XTq3yTe%2FdpPNCyUA%2BuKkyi1JJ%2Bx5MqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBV57sOc66TPIDgpgyrcA22LUW2hN5hAnEKVH8FibgQIgihuc%2BcuRTpVajhZYvGV0XWe9A3dHUhzAyGs3uah2XbbkVcxa46S7Wg2ZDIvedYeV%2BNLGm6iNCWfzq9eXdNC65Hdbd3ord6l6Z9SGJrqBhy%2BQ%2BT6tWlccAKP0vFt2v8RQXv8rzn1MCC62hEGxZdEFafhRw18AmpwLvhwwvuRewJhUO7bn6U9NkJhCC5Kxh2Qfn%2FHbZrEnPWdFNlx38v8%2BiELuR%2FarJgiFjARest1M3N2qmYfxAAQHQe%2BB1KCBJqZWTv8uGVjM0cSowtCbrxnfitBUZV154pmZO9r7GQQjK6eb4wLqC%2BI%2FLGTcfp3e9UVWI6pkm6TXfQbojeKo83iyoT%2BOncv5JTatGvY8UZunKY5NSu1Ya%2FlTnaJ9yEzHnd0dUdI53z%2Bca%2BA4inXzPENnN3of0zf7tCGDOBcjOc0MqhprkagHpv0P4oki6994fxk2Vz3O4OD8SvekhQNSKN5FuwF5XG76wFwJLnXc6RkOcTQIwvh9jeIyAPNOyrF%2Bdl%2FoLi6mGcdIt9lOFCGBAFfkl6ek4VVhH%2BjyBV18hySYO%2BwZzDYYOOeBkjUKpJOZCSoTdcJwy8ws8i5pxT003PdmHKCao9L7PvPnGllMNuzns4GOqUBrxtMtustGHwQB1urTCM1ERvmXZ9yv7lumeSlC1tM7w920QuctRkZDYBlpIdpFkwmI6m0Vh7Rb3N2umJOMIFppGK%2FFy35NyLrIuMolpQyjGETQs7GWf8G%2FGnvlBCl2Xsc6ph%2FDNKQEXJPzkWxHFtSQAuy9%2Fzhu1Kc7Rj1WagKgK86%2BjP8dX5RvcV4zM25QF7qFYFtPFUuHyCqvY54yBi3tZwvssPX&X-Amz-Signature=83dcdf41fd093dd76a4d30dc8739c163f265870d979d9fa4d7a895d110fff812&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665MAA2FO6%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T101851Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQCyPSN3YkpaBWwHRddZKeK2RTBemD7MFaEgTv9U8WgfOAIgXAOyPElmW1T727XTq3yTe%2FdpPNCyUA%2BuKkyi1JJ%2Bx5MqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBV57sOc66TPIDgpgyrcA22LUW2hN5hAnEKVH8FibgQIgihuc%2BcuRTpVajhZYvGV0XWe9A3dHUhzAyGs3uah2XbbkVcxa46S7Wg2ZDIvedYeV%2BNLGm6iNCWfzq9eXdNC65Hdbd3ord6l6Z9SGJrqBhy%2BQ%2BT6tWlccAKP0vFt2v8RQXv8rzn1MCC62hEGxZdEFafhRw18AmpwLvhwwvuRewJhUO7bn6U9NkJhCC5Kxh2Qfn%2FHbZrEnPWdFNlx38v8%2BiELuR%2FarJgiFjARest1M3N2qmYfxAAQHQe%2BB1KCBJqZWTv8uGVjM0cSowtCbrxnfitBUZV154pmZO9r7GQQjK6eb4wLqC%2BI%2FLGTcfp3e9UVWI6pkm6TXfQbojeKo83iyoT%2BOncv5JTatGvY8UZunKY5NSu1Ya%2FlTnaJ9yEzHnd0dUdI53z%2Bca%2BA4inXzPENnN3of0zf7tCGDOBcjOc0MqhprkagHpv0P4oki6994fxk2Vz3O4OD8SvekhQNSKN5FuwF5XG76wFwJLnXc6RkOcTQIwvh9jeIyAPNOyrF%2Bdl%2FoLi6mGcdIt9lOFCGBAFfkl6ek4VVhH%2BjyBV18hySYO%2BwZzDYYOOeBkjUKpJOZCSoTdcJwy8ws8i5pxT003PdmHKCao9L7PvPnGllMNuzns4GOqUBrxtMtustGHwQB1urTCM1ERvmXZ9yv7lumeSlC1tM7w920QuctRkZDYBlpIdpFkwmI6m0Vh7Rb3N2umJOMIFppGK%2FFy35NyLrIuMolpQyjGETQs7GWf8G%2FGnvlBCl2Xsc6ph%2FDNKQEXJPzkWxHFtSQAuy9%2Fzhu1Kc7Rj1WagKgK86%2BjP8dX5RvcV4zM25QF7qFYFtPFUuHyCqvY54yBi3tZwvssPX&X-Amz-Signature=4586e9bcdc1b1b9e75adc23c21fbed6ea5056f004fafbc26be6cb722b015e2b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYZTTGUK%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T101853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIEKHBBASfZk7uZvfG83U8evv7ExpQfnalRgGiAKFu9AlAiEAuYmbZOQ7KDW%2Fv8KXGoQPpE92Qv5cV5e4pesqKmR644kqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAxU7rC9znylFmhgRSrcA6QaQXp%2B5eiJY7cO4cWApmobcVdR1tCKrnK0mJlaJjCAA3tnlOYljLg0aewkr4ZjlpYTM7a3uGBF24c5B66Vf5Rw0UlxLtJUnQ9Njw2k%2FdPp0wRVAekcpLFmZTk%2FMHyXPZs4W6N2MDi%2B8rVhRXfN%2F5zMAyS9uvoF%2Fj7TfPtbjpPzqVbaf6%2ByHTUflUXtef5jTxV0mMToa9lITwVBYK62e023PsQwEaSbRqXXLpGua6QyC4hwZDaISiUmIM4JjRfVO%2FDiYe21Ba4bRyVAY%2FKqgJlH9Km1asy1NvvJc6lgPtlOoBx7wD1D%2BW7i%2BZ4BvNbueB7s9fkZ1jREEGib5%2FeczS6D16CfyzWmmw6%2BlYa%2BFzfRpQ9Sj89aeQW2af2JvCGOhsipVeqVNeflPNZstTI5KMvCauE74aRb9GuXEGnCFVV%2BqXabv5MCZvbwm5ClJ0Mp0lYG9IQGBA6vqTv8LEjhebJhaQ2zv9e05QKPq3oN%2BDUTZJzWIRJp4apZ919dckBhzD1t5GSGzfcEGNhrzLN4X3UCU7fO5WDl9BPdMl8D99tQFJTlQVEBLJedhTwZW1ANHuWWhvgVW8hSrPsnNs05y%2FaKlcFmcUGE6jhtUE0R3J%2BE0W4iGVru6V3HMF96MN6zns4GOqUBEZbWb5Ci4zRMfm6AxDLrkizd7qddAXz6zihCk%2FK2XakbjvM4sMU5REpYjnY%2B4bi%2B3NwQCTqDYIYckWReiFugOXuwn7hNrMtwGCSOh0Hgkt6makWkFjTQwWUueZx%2FGN9Rp641MLu4r%2BiTdkFJsdBFanLxyOkDyxG3Wyil3ySQe0qihFZ23QgGgDychy%2Bxf1QbaEh3CDKc8vVl%2FKaM%2B65EIwCaSfp7&X-Amz-Signature=45302026d2e51edf8ef9f10f407f1cd55a8b6f6ff0a37a8b984303431cdc94ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XMCVYXP%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T101853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJGMEQCIF7%2B1yl5R%2FKx3M20Lznb2FDI8wyOoKN5VIj%2BPLQc%2FoWSAiASk1B%2BRw%2Bj718wlnOOc8eyXggQC%2FUQFPPmszLTtgC6%2BiqIBAjy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM7F%2ByKYb9Xe4FHxiQKtwDJpJ%2B3sGFllPDxlJ4uZM0%2Bf6x4Y8Nkub5uax8KenlYROyJx%2FJwTn5QPUCOZYflI0d44O7spA35OmxxbJVvHeghNi1wt87Kowksiaiao8H3jSnwRzO838lz%2BGhliFkygGEvWLghAIFem%2BtgA%2B2t99VAQFExRiAmUWca9qMKMh1l9p%2BDZYbdrxwxVGdzdF5aHkuf7T7g388SXN4dL6hnba8Ueq6rX4EVtMuxcOEYCk2Mefe4JQ6dQ8d1IRcPvd1%2F0gTDBraO7%2FtNnkf%2FfsM0VcQRdJlbBKRiiBb0BQtbCp1jvIgZftIc5qiRcuMEXNRVcHoS%2FnGOHHB878y1hNVtBblC1%2BRTVejAbkOoDdL3uZtDL5rJcOtHsu0rMwrxpJYX05XzcmWgH3dWo7pXNzm8szZPfBsjWVA8eJ%2B%2BmIyopEyXfzX4YdIpj3QijF3Yz7Idx3r3GUXL%2FCCCl%2FN8Vz2wtVWYZusZoy6xFADsdivyxcNo4lSNCs9V5r0SFwsMWfKgfPanRH74WjVRBt%2FnnmfuwIigz7Wu3dbXd4pEyoVDAQszoKs3mjG7%2FXfoAdgu4FPJ8sfalD%2FAqS80V0%2FfCP3Q2y4jbzYLl8nIAfk7gGA7s3%2FHhcxxNnlTHYvIvg7x%2BIw4bSezgY6pgGp6yf5D30AdCAyZB%2FH6xQVJgTuM2U6Hau9PVjMW06W2zpJJn%2FhRQOYqjnxKZdIToCT9eqQVDUidO0pE%2Bf%2FXy078HdhiIfYF9Orf9AH%2Fy%2F24L9Swi%2FMp6J0n%2FXp5kcMg%2FZNTR5kzm74RkGWvJfOlTwUr85%2FXe7z3GJdfIFYyAZ49LoS3%2FI%2B%2FY9v%2Bl6RNvO5KQPEK8bkVG%2F%2Bi6He4%2BvedE5yvrf%2FKzDP&X-Amz-Signature=ea8749a361f67a59820048af58403c8bbb986e2203879e2fef43930c6d7dc8f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646CZZNP5%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T101855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIC1el5XwBAeSxj3lZqCWSzIudKlOkkF%2BUcg35lc4k3adAiEA%2FOt4Rbd5U69IHbPmiuurXoVKZnaO8nOOBYPIYNtoyIkqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC3TggH4M7acdIxkuyrcAwNS4qd3EYN1l3umLEQqFbMKm9YhYAbB1Ba9AyJgCAVSCSjG8faZKXuqCnbwm34CGaPQe6NJn2faE%2FlRFo9WC5euONiNCKZUugbFngQWwkLKLbv5MJ7q%2BoinrkAZGmAudcbZJdfpgN4EKjH5ULzmAajSGPB5Zzpsx8bGBAqJxj1uAp56brUmLJjqjyhlzdaJxxZKctsHsc0Oq6Rm54MjYOiubhd%2FAzdSJ57dFsN%2Bqy5GoKwYmfxmAAv4ga69GRgeZtLNyZJXH2GZZONdLT6Ia8XGVjdhdk7rO4x43erWYzGhCHB3C2DOkfzKww%2BplSoPGx0QZhBAo6oJu9VUCjtSoq5ObHIyqJ6LxupVWZOyO6CQNsxrnmNO1r5bDDN8PElMI2YWukjATFjp8xDV2ASLtd9Jr9sR4c3b695%2BIRTaoUi4VD6ZZ1ewxajdYUtgwmZznETprFbwL%2FfRCRYb5q6GkDtHhx6eAkvJ4TFmlUejjYllOxUgsI0J26HC0b2%2B6RG171QaTdc53hIniUhdmZW5xN7ks%2FZwfTGco7DV1jpLIzcjeClnLFEAWGt91oL5rRx%2BJD8SQN26Phru1FuI7CcR9uALXVsTCux74t2%2F3xTE2jPGTm6C4IAd%2B7c6OD3VMMKzns4GOqUB58zLbpphdJScQ8FFq7GU3njnApZKVCXwjR4yrAqz%2BpZcvGYpxlOynsmQUGrf7i0OTValrdhZ0rLISC%2FIHITkJZnhZmURNkKHmbgnIPAktEfOv7f2pktFHHGFQtj2kPWrW7u%2FcMcVV4whYjMgkZ6VYggSGPj%2F%2BzaRiuxvCCT50hHumdjsbtPYXgqd5CZoiISl%2FiAe7K4OsYTdzpldf5IaAR5Vec8v&X-Amz-Signature=e305143ca5bf5de520a1a5672a1d1efed1971eb1833554a656beb69774b19b00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7OD4PTO%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T101856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCICdnmWrYXrQZb%2BF6X305JQHM0jXsFGfj5bsKg6TAtAgNAiEAqWq03RZOQDr2InIgtSu3O2vMxKquXEckSk0Mi7EOxb4qiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDECCXpmXkW%2Bfu8L8%2BircA1wKEFlkEHvS8F7vK9rRQYt7EahUUQa7rTwUx57QljqMhRisgbHxFwBMBOMs7grbsq9UhEy0u%2Bj%2BXxJ1HlCSLGuWuy35wgljI0JgKQjzIllS90gm%2F%2BLVkaNIIBoc2FaA4k6l4dy1LOuRy%2B6xyuFtL9mu%2Blks89SAKgadqcxOXUQToskrLu2%2BZGz769ZR3%2Fw00o2Zos169YmMGazA4VY2fLl27HE6opy68G0KWFR3cV2ZlO3Uz3bMbEPGkLAtMKLtaMgEFxlJwEMebTdKFDj%2B%2FRa8wRER%2FeVZvlaC0KgvIojHpdKgR6WQH4mDY6zcTmQugFUh8BBELcA9pwBOdrj1i0zWxkq%2B3rM4jqxlVXAMUKWA9XDvAhowZC%2F7G307%2FOEKhIGP2GGJC%2BYdvkgi0od5s3qYY38XN0VBwe9BbNnU1FIrSpKpWIx739D2ivLMonNoaJrIZOIYmF9w7AaIwcOVkJVb33ckPIKrg4JhihTnSdGvh0LKHw60QIvQxFLdLO1ip6Z0fFS3k7RIQhjtTF6pBrmgM8iTckhirnFw3e8NxEUWwFrXg%2FEoXfNLyJYKfME7d%2FuHYgtnit2j0VxhRfsEyVr5MsunY5OKJi9x5FiW0NYzby3KMfF3LM1XlZV%2BMOizns4GOqUBP8UTLVDhAiMECm1uxaXZdrTVcr5SyRJfrTkp5k%2Fxs5mSYjFHHCkpO7SbP16sy1rZlLwXC969kP3tTVLIHPkyyBNHQVbrU%2FnYxUBvRprm1y3qOLm5GuASBxjkp3TET9SVTMZEtiBF4BwQc%2BmF%2FS7R%2BTeNCSMJRUmrHHBsaExrUm288r9cdxF2iZmPu%2Fa9onJGl1QGReHIuEJkKcbSLgXR8gngvfxK&X-Amz-Signature=a0300a1aaba31894de7dc5d492d84041704fefeff13fa445bd5c5e721e75499c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7OD4PTO%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T101856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCICdnmWrYXrQZb%2BF6X305JQHM0jXsFGfj5bsKg6TAtAgNAiEAqWq03RZOQDr2InIgtSu3O2vMxKquXEckSk0Mi7EOxb4qiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDECCXpmXkW%2Bfu8L8%2BircA1wKEFlkEHvS8F7vK9rRQYt7EahUUQa7rTwUx57QljqMhRisgbHxFwBMBOMs7grbsq9UhEy0u%2Bj%2BXxJ1HlCSLGuWuy35wgljI0JgKQjzIllS90gm%2F%2BLVkaNIIBoc2FaA4k6l4dy1LOuRy%2B6xyuFtL9mu%2Blks89SAKgadqcxOXUQToskrLu2%2BZGz769ZR3%2Fw00o2Zos169YmMGazA4VY2fLl27HE6opy68G0KWFR3cV2ZlO3Uz3bMbEPGkLAtMKLtaMgEFxlJwEMebTdKFDj%2B%2FRa8wRER%2FeVZvlaC0KgvIojHpdKgR6WQH4mDY6zcTmQugFUh8BBELcA9pwBOdrj1i0zWxkq%2B3rM4jqxlVXAMUKWA9XDvAhowZC%2F7G307%2FOEKhIGP2GGJC%2BYdvkgi0od5s3qYY38XN0VBwe9BbNnU1FIrSpKpWIx739D2ivLMonNoaJrIZOIYmF9w7AaIwcOVkJVb33ckPIKrg4JhihTnSdGvh0LKHw60QIvQxFLdLO1ip6Z0fFS3k7RIQhjtTF6pBrmgM8iTckhirnFw3e8NxEUWwFrXg%2FEoXfNLyJYKfME7d%2FuHYgtnit2j0VxhRfsEyVr5MsunY5OKJi9x5FiW0NYzby3KMfF3LM1XlZV%2BMOizns4GOqUBP8UTLVDhAiMECm1uxaXZdrTVcr5SyRJfrTkp5k%2Fxs5mSYjFHHCkpO7SbP16sy1rZlLwXC969kP3tTVLIHPkyyBNHQVbrU%2FnYxUBvRprm1y3qOLm5GuASBxjkp3TET9SVTMZEtiBF4BwQc%2BmF%2FS7R%2BTeNCSMJRUmrHHBsaExrUm288r9cdxF2iZmPu%2Fa9onJGl1QGReHIuEJkKcbSLgXR8gngvfxK&X-Amz-Signature=4d495a0bcc2df8ecb0d5ee1cce372a0c2f79abf265050c711eaef7c4e549ec53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NZFNM27%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T101843Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIH5CxLyrPAAtvJ1riDcz3DeFp7PEvXsmNSkcJ%2BCVH3tcAiEAn2Nbnuc7tRUn8Az%2Fpmui2LKN4ytxklC1YkBjUDFPr%2BIqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLqPnBFMIzd3vDN8zSrcA9P0JbPM9fI7FACLSUyCNLyI2%2BQIGhwJigZGhhNjVQ2X9y1J80cCUxHYIEd1h1lHZIhRlhsTHEB6s7aMgvh3mNmHXXZgtz51AHwoVTA4oAU6SEXkF3G%2Bh8rBIZqwMFQoXuk6E1JUDKuIuOhb6nV2Ge9tVfOgktb%2FJnFj8%2FVbEB85rFj14vO4Bx12Qz6XbSw8RXyK92J%2F6MKbKqw4LpLP%2F7pm2IyySsZg8Jiz1I%2Bvf4H6z%2FWzV7WSgbZdkesyMljxZaT37TgDWwjxHL1tsvsJkmNLtHeWlTcEl1uJzGn67YsqkHPqtTDfp%2B%2BQo35g5zMIffmDTeRHS0V%2FnocCwPRP8Nm2pAmfhxI2aSg1GRxTzZO%2BQLAEB1X%2Bq9CtEphMi7o9ojMIbL0Oyn04kRQV2kwY9Rs5S51u%2FBW83vfi77FVZiVfC9%2Bofd3ZDjaLAvTcw%2FwXINgpZufI3Q0rw2oRLa9xAT4DmnGDrHytTSMNTT%2BbUSt4XSl3Xm%2BI8psnsm0TLxBWyN8RwH7GwmFOIm6bqdJijaKDDC8QeWMOAm2cOHU1YZLgCwtA%2Bh90Wp47xNVi6m6sv%2F%2FB%2BEOMTnU16RAy9nqS3D4TPZ9JQkAFBuIjG5AldMVUTMtWWgGFc0%2FbknWmMPCzns4GOqUBUXIQScxh2xuzk5lp8Y8eWWTEzJmt93AFFlmSR2T6phW6KIJZedeQ8WfZ3ZDMuKwOdv7gEmoRKPZPdi0MoKhDhrUlpFr4JEVO3xDPUuR4e0ymo0IF7P8LR94MV1HbG7pSOrgjr7A5f7%2FbGmVyN19jQhidsUQisXw5MplFO4YuQi3Yqb2lNWYAyTeAeIthv4zm%2B96wWBZZI3OutAZUsIZrih9FNAhc&X-Amz-Signature=5c20f6b3d571428667f87eca2a9b5f3a9b2ba3050a933245c9c7407f8c5f90e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAP5LIUR%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T101858Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJIMEYCIQDsHDKxOA99wXq0WHaIxArz%2FlQSOMzwLM0cSVJLLBcA%2FgIhAPKKA5IeJaeGDY1h%2F3hHMN7vKm1%2FO2Badr1WebU%2FRXLiKogECPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyuohs7%2BCeA265SXPcq3AMdgGBomve7cImoXJrCi5BAPGl73%2BOUtOxVBEcUxZ34zPmKN1SY9HrNTuqxta%2FMMxSr6aXjntP5LDRrAj9hoRu%2BKHp3SzB2XEY%2B9e%2FeCkhtWlsmQuIFTbum9k%2FF84WSQf8Xsfw8orvG9ISKGcnjGOZnidN2mYk4WoRJ%2BiOf%2BZx8xYAdomIoHMx583l%2B7LGttMZ686kLRImY3uEJy80W%2FyATdTEKBXLU5IpZXrqL16u55oYqrik2vWRXv15ZSRRCBvJL0hNJm48lV7p2gl5jTkWeNmeO%2FD%2F1rGwe1EpWl6UIuFCI93lwRHeAa7yPfXgYBWmTFVDgmU8GB9gA6oWhMQmWYyPn6Gh%2FZyPV6XHulqdB257x0BSo42T0B3RANP14dHAvkActET2BEzJ5WVn%2FH%2B6%2FncO%2FP%2F3KMpbiEZgb0frlpHvGN%2F7%2FmbdCp42DKPIrImZn%2B5e0P0OD8tjzUHbR%2Bs3SUvYHFG1kWUkPZWu5TQZsKIXE%2BRwJo%2B7qFF4qv5Wk0q123FKKmcP0orHGRObRDC5J70bCHPLFZn0KeEhfEOjtTUcmNRIlBngUz%2F24WNppzF%2Blres6w9hziqV%2Bd5zP0VfFwEVfqU%2B8M7wo8u%2BcXGHrnO5YhffToaCs8DamtTDhtJ7OBjqkAXEe93o716z4Voptv%2BCrLWROCGvdIntdbohe8La0YsTx7y9ltaibNH0CxqtdEgsRlsrqn07JvqOqyzwGF%2BPAiAZa%2FYEODQjasBRAoM7ikg%2BSv6at8zoEHqRppBv1Ncx1KZuWahPsaIAbtRYQHgFwkC3Uze1dYDb0S9wxW60%2FY1iRRusbu2XMbB6YvhnDDI8wUDGuIwl6WgNhl61Ns9CpTPMC2ZgX&X-Amz-Signature=589152fa02aadca8d22f28d99e421530e4a5edb3fe79c592ff261f6b6c8a8cc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAP5LIUR%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T101858Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJIMEYCIQDsHDKxOA99wXq0WHaIxArz%2FlQSOMzwLM0cSVJLLBcA%2FgIhAPKKA5IeJaeGDY1h%2F3hHMN7vKm1%2FO2Badr1WebU%2FRXLiKogECPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyuohs7%2BCeA265SXPcq3AMdgGBomve7cImoXJrCi5BAPGl73%2BOUtOxVBEcUxZ34zPmKN1SY9HrNTuqxta%2FMMxSr6aXjntP5LDRrAj9hoRu%2BKHp3SzB2XEY%2B9e%2FeCkhtWlsmQuIFTbum9k%2FF84WSQf8Xsfw8orvG9ISKGcnjGOZnidN2mYk4WoRJ%2BiOf%2BZx8xYAdomIoHMx583l%2B7LGttMZ686kLRImY3uEJy80W%2FyATdTEKBXLU5IpZXrqL16u55oYqrik2vWRXv15ZSRRCBvJL0hNJm48lV7p2gl5jTkWeNmeO%2FD%2F1rGwe1EpWl6UIuFCI93lwRHeAa7yPfXgYBWmTFVDgmU8GB9gA6oWhMQmWYyPn6Gh%2FZyPV6XHulqdB257x0BSo42T0B3RANP14dHAvkActET2BEzJ5WVn%2FH%2B6%2FncO%2FP%2F3KMpbiEZgb0frlpHvGN%2F7%2FmbdCp42DKPIrImZn%2B5e0P0OD8tjzUHbR%2Bs3SUvYHFG1kWUkPZWu5TQZsKIXE%2BRwJo%2B7qFF4qv5Wk0q123FKKmcP0orHGRObRDC5J70bCHPLFZn0KeEhfEOjtTUcmNRIlBngUz%2F24WNppzF%2Blres6w9hziqV%2Bd5zP0VfFwEVfqU%2B8M7wo8u%2BcXGHrnO5YhffToaCs8DamtTDhtJ7OBjqkAXEe93o716z4Voptv%2BCrLWROCGvdIntdbohe8La0YsTx7y9ltaibNH0CxqtdEgsRlsrqn07JvqOqyzwGF%2BPAiAZa%2FYEODQjasBRAoM7ikg%2BSv6at8zoEHqRppBv1Ncx1KZuWahPsaIAbtRYQHgFwkC3Uze1dYDb0S9wxW60%2FY1iRRusbu2XMbB6YvhnDDI8wUDGuIwl6WgNhl61Ns9CpTPMC2ZgX&X-Amz-Signature=589152fa02aadca8d22f28d99e421530e4a5edb3fe79c592ff261f6b6c8a8cc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKZK3IAY%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T101858Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQChhS0AnPIzy5HyCMhpDVY9WFXlH%2FgHz6G6MFGFb9KBTAIgQTNFBUZf4sEBC8hqV13szBphFIIE9A1m3Mgdk3YkGcEqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFe%2B3dLfO2I06g%2FrtyrcA%2BvkD2shkgJOsY19fyX00yO2dwWQ4mePpCYuJ%2B7xwVESEBTyRfTAmqwpCx1dcOhr%2Fl9fLIdbD7QJScWA1U5YYuBKNuyfuC005TAq0%2FqtnfcDrGCdKnlF4%2Byj48P%2FnAv19CLTxnOXA%2B5pSsheOAOP1MF%2FmfaY5HaGeeckzL9mmwi8I%2FultY8OB16SYThqeYk9Z2h44PS65dt3hAgHVcd7nsT1kr8CNyB7ZiHHNh0miRnSeopR77nteyzykutnTIlBIvevy%2FYy3I2LX5PlPfgnChv998fnvVyBZTqE0KyPUXzSDO0DY%2FMXMpXxFVR6KovRVwv0qR87R%2Blg62wyCMQdyM7byvsFCqwlF71IomsnIebvY6sdFba57UZa%2BSOtqhHaNTXvaUTpQakZ%2B2NmYaG%2BouwdnCltqYhhdgeCiNMAFPKb51Q7tJXA7IsUpH4ZMDPwyC81ydVUqmnRciG8yKoGfT%2B6%2BwIpbrqZ2IX1ZSZzGHidNUG3JK4%2B7QHOJPqzCSGKewtHJ%2BlQgjBI8axjjU%2BDAIF3GIBXSAc0iGtemSGgETIsOs4dD9wX5ox2sWxhvQK1kDrIrpwOra8PU767puu9un2HxW88dIFVY6F4xsd93eg3P4nDG5U5u3pMC2r7MPyzns4GOqUB4TAbG1aK29YswkC03Rs6LM8rEYJRcjo8nkGaRigySKXylLgpSLc%2FCQpjCg8npBW8ygdQrzY%2BI71k6zc8Rard5oii%2BUy7kaTb0YOnZPFW4AvETSU%2FWemmBpzsyq5IEIljVA5gF4bISgeeajjaZuRml49s2woNEbOsPotusiS3o2ZdJ%2BnjGBwfhYiRQFf80Z%2B5MoIcUeWpQhdidm0x9AnT33UfYV4w&X-Amz-Signature=4048759fb344e6079cd66cb8330c2dc7bddcd81881211e13e9b00b8593c7000a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

