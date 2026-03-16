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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTPUMTGM%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T113636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIHYh%2Fe7sIGrnG6kdG5xetEUFLxzNBouKBMU4eaVOPsSxAiEAq51xbQXd7ZlVduo7QM1VqI4chw1IJSpeC6QsoE%2FKO3YqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHB9zae0Fv%2Fze0r6SSrcAymxj6P4IERE3apyFC4gRojZZGGxfxqlD3WKiRruoN3cqfRJM%2B6Q%2FifJcG5RpMby56x%2FlCPsgLioeCNY06reQ0DSZ6nISzTO3h2n8s9P8t94E%2FVkrGT6wAVCPb1HViFK%2FaDo79u%2FnnwLYbezwKlRaLdvm1Ns6radQEdYpCHYBGaF4Ic5ENLJQaRm7SZj1LAxlDvi12C4u03KZsZ%2B%2B%2B%2BxIDA08adY63PHRfY%2BJB3R8BLCkd2DPX43zSKYAMTuOrYEINfuXc0ejPpS6Ee4daXaQN1nkq5L7l3PZda8LkrMBUeusSEAiluskwvO9IBGA0OtilOP9lEYY8vhVOG0uudgC0Q%2BrQkph1UghPohXKYVeePd5c5zD3vNqNdjZOxCp5tc46vwr50E%2BH5pqjqz34adD4ROUCQAJSDKQw6CiwSu%2BwDaMwTxzF1vO6xq9Vz5nSgA8gh4IGHGgdRo%2BvgLFJ%2BWI90tIWk4qN6lmNqac3rGNU%2BHSRbDFdYyDhNtJVCJ6KJyU2yZW0yIg8Vu9HvmxeqhXUzugVTXIMAdcjJDioPUk0N8ZaQFpRqEGW37gU3rXFDIspqXHYHHKNavxJ7NT%2FYYMNZqK%2FB9SVFzdZS%2BDWcZSlsAQOJRuWpwzES6XWGvMMnQ380GOqUB6cli4LR7QtrEjqxIYxWkfNLE9SJ2YyEUmU72RVmWOjvyvv4FgV%2FA4tO7%2FG9dOsmUlzpLCHfdotNGaS32%2BMUJzsbYbZdNKyXPWhqCEi0HTUqyFbAs%2FvKQm4LuM5I4Q%2BoKQC7aT3CjOqwvQbArERl4K4QhKY3plkyh7Qu9YyTBw7spEgARjld3DeiBlC%2B2vsnhu%2F5eOaGJVirlyN0Oj0aYycRMRN33&X-Amz-Signature=57cbc3fa3e2788f13f91bc7eba2dadef943b31fd3e9ceab8166c67715da22291&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTPUMTGM%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T113636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIHYh%2Fe7sIGrnG6kdG5xetEUFLxzNBouKBMU4eaVOPsSxAiEAq51xbQXd7ZlVduo7QM1VqI4chw1IJSpeC6QsoE%2FKO3YqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHB9zae0Fv%2Fze0r6SSrcAymxj6P4IERE3apyFC4gRojZZGGxfxqlD3WKiRruoN3cqfRJM%2B6Q%2FifJcG5RpMby56x%2FlCPsgLioeCNY06reQ0DSZ6nISzTO3h2n8s9P8t94E%2FVkrGT6wAVCPb1HViFK%2FaDo79u%2FnnwLYbezwKlRaLdvm1Ns6radQEdYpCHYBGaF4Ic5ENLJQaRm7SZj1LAxlDvi12C4u03KZsZ%2B%2B%2B%2BxIDA08adY63PHRfY%2BJB3R8BLCkd2DPX43zSKYAMTuOrYEINfuXc0ejPpS6Ee4daXaQN1nkq5L7l3PZda8LkrMBUeusSEAiluskwvO9IBGA0OtilOP9lEYY8vhVOG0uudgC0Q%2BrQkph1UghPohXKYVeePd5c5zD3vNqNdjZOxCp5tc46vwr50E%2BH5pqjqz34adD4ROUCQAJSDKQw6CiwSu%2BwDaMwTxzF1vO6xq9Vz5nSgA8gh4IGHGgdRo%2BvgLFJ%2BWI90tIWk4qN6lmNqac3rGNU%2BHSRbDFdYyDhNtJVCJ6KJyU2yZW0yIg8Vu9HvmxeqhXUzugVTXIMAdcjJDioPUk0N8ZaQFpRqEGW37gU3rXFDIspqXHYHHKNavxJ7NT%2FYYMNZqK%2FB9SVFzdZS%2BDWcZSlsAQOJRuWpwzES6XWGvMMnQ380GOqUB6cli4LR7QtrEjqxIYxWkfNLE9SJ2YyEUmU72RVmWOjvyvv4FgV%2FA4tO7%2FG9dOsmUlzpLCHfdotNGaS32%2BMUJzsbYbZdNKyXPWhqCEi0HTUqyFbAs%2FvKQm4LuM5I4Q%2BoKQC7aT3CjOqwvQbArERl4K4QhKY3plkyh7Qu9YyTBw7spEgARjld3DeiBlC%2B2vsnhu%2F5eOaGJVirlyN0Oj0aYycRMRN33&X-Amz-Signature=57cbc3fa3e2788f13f91bc7eba2dadef943b31fd3e9ceab8166c67715da22291&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y22MCYMI%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T113636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIGGt2OJvhuF%2BFm5%2BmNJvEqrW4PZI56ykT4VMZCsRLSvcAiBk6%2F42wQzXG3RUAtoLIQRIzFingfvgPPfnk25VYaXPnCqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkLgWSBdL5VAXrkGyKtwDqakYjUURzyL7I5qBzxk1rmperdrNshY1r%2FJuyh9XNdhhLRu6HIu5Uwae33tlVYOciy6uqcKzj1Dw60UHnW78yMsSL4EdJRWep9XnWuUCPouyxS%2FwASJH9asYFXzmFT1veDsOYDW4R7vosVvYUCCENtd6WfThSJawT3rG7eGwpAK4w4r8G1LywL2b4HzYOlYWpFWs8Fn4j9oRMXepKsj6ZxpXp4LaLXFpZIuXSvJsunp7n2yoijHRkVXu%2FGZKBt0Gi7i2MOgWF8FIC1VQJSo3wKelkqgfRNh43Ngjb0h5FSs3TW7KfqhlRBEdbvCbgsnWLAoxZHx4CCZ383lbt5FOc48J4uC%2BzeUu2mfUvN1COmE%2FbUSEFHmYPNazLvPloybvlP9elOG%2Ffmgs2xi7dXldkJoANw31OqxE2gkUQTav2GbcH9xUuBeoGS4alVKvwtRkZ6Wl3tD6kx3QbAztu0OGlwwB1dWmpVA9wiIxzodGaltTx6LmDrJPd3IfBV%2B08exQmhBuL6dFYJBi9i32PMv9M3gr0eL65KM8uaMTUegRjeh6aATGTSOhIOq1mSihAoxeGA0SubC5Hs6I9Z%2BtSfQLGhtVRAFhwM1eGC8yEHMSt2dzjakH5TqMVi3ZnXcw5dDfzQY6pgFtTeOTLaKflFL0QrOkkIauO%2F%2BvEKsVXRO9gph42doAi9syXZIHmjGd5VtxtCFVt68pr3KFZwj6Wziwd6a2mRYTmK%2BShubnOjIL3UA7XzfKaMQf1UkDKarTRvvetfPCW3DcWrV7HvbMUarBaZVK1hgU6wCqW23JSWk%2F6kVNa14lT9Pac2FlUuu3k40x3R76AwMxJv9QNUucY6A743S%2FqA6tDc7oGl8I&X-Amz-Signature=cd5e873e7fe525955e19ff87ef3ac914a461642e624303e50e1929ad41f779d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBQML7GR%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T113637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIGhFoZnvU3prJElIm1Fz6uWgWjXOwWOkcIYr4ZmnzOLmAiA%2F1BVIBSX59t2sX0eVQZl%2BPlNA2VDKkATEGtTKADpPxyqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMo5ZGN%2Fr8hSm35UkIKtwD3DEWD4Y2%2FkUc8xogzQz4VAgTuFCdDxkGscNtP9Cisqvj3P8t%2BhAzpmsJyHc5P71BrmR0TEhm5Udxt2Lc%2Fj8Kj%2BGUfTB5tUoKOth1N8ZF%2FKwZQqKrN817JyBl3QuLNP4fhoAh18iw1T29%2Fm11iuID2W9fZnYoNOMlVBtogny3jkyrAkz8Nyw%2Fr2UmmfQz34ZMlN0rLwYp%2FmpXmL%2FGOu0Z4YiwajznkEOFtL4%2BntK3DIDCw5qMJKWkBxLCcyjOVI0arg8IUSm8EJRyGG%2FN7Oldien0jSS2rGlMmd1mPUynnbl2oNyIAFu9J2JS0sO1P70atTEEev7sU2X59VlAP9ffu%2FN96xRUVEZgaDQ04HCkYz0S3BiTGoW%2Flf4SsffUJdCqOVuR%2FXTR8ZOcp7wTMkz%2B9Cpk1tPGOBEkGmoZDKaN5z7JLzkkYS0ymi6x7iiv0LZ2LHvVKo2K848EDmj1DnobJqrwG3sdyekBGFNTmrLkHsuyMaAgtk%2B%2Btutl4UtAeiHLkYCZ6Xyysd2JEtBpoeMSlxVKJLqRluPweP3mU2lxqEPUyZmlWS1JCEYKFi6paa5frWjv%2BkXH3iuQ2NAZJmMKK19d8ZAA%2FgtiFVWJ2kLdbGBRgGzefFBhA44hsOkw5NDfzQY6pgGO%2FVZ%2B3f6ZaoGol%2F5MjH35GP7%2BakBlzzG93VbRw3s6PpSolyYOtAsUk1zqv6SZGI%2B3Hlb5d3Msvob98muXsRcBC1necqJvwbwCx42DQSNEkTf6nimCXPaLOdT5ix4kHRuPjg5ODbgsdKOVA9y%2FrNHt9QS%2FBNX2SST24OBQvXXirCHgcgAAhwV%2F%2FBojnCUh%2BuXzYbQPrAj1oSi59oYtUIDOKYvWr%2Bep&X-Amz-Signature=94c068590090bf90e4812b27de08405b4805c8a693123f7513cdf76011c460b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBQML7GR%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T113637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIGhFoZnvU3prJElIm1Fz6uWgWjXOwWOkcIYr4ZmnzOLmAiA%2F1BVIBSX59t2sX0eVQZl%2BPlNA2VDKkATEGtTKADpPxyqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMo5ZGN%2Fr8hSm35UkIKtwD3DEWD4Y2%2FkUc8xogzQz4VAgTuFCdDxkGscNtP9Cisqvj3P8t%2BhAzpmsJyHc5P71BrmR0TEhm5Udxt2Lc%2Fj8Kj%2BGUfTB5tUoKOth1N8ZF%2FKwZQqKrN817JyBl3QuLNP4fhoAh18iw1T29%2Fm11iuID2W9fZnYoNOMlVBtogny3jkyrAkz8Nyw%2Fr2UmmfQz34ZMlN0rLwYp%2FmpXmL%2FGOu0Z4YiwajznkEOFtL4%2BntK3DIDCw5qMJKWkBxLCcyjOVI0arg8IUSm8EJRyGG%2FN7Oldien0jSS2rGlMmd1mPUynnbl2oNyIAFu9J2JS0sO1P70atTEEev7sU2X59VlAP9ffu%2FN96xRUVEZgaDQ04HCkYz0S3BiTGoW%2Flf4SsffUJdCqOVuR%2FXTR8ZOcp7wTMkz%2B9Cpk1tPGOBEkGmoZDKaN5z7JLzkkYS0ymi6x7iiv0LZ2LHvVKo2K848EDmj1DnobJqrwG3sdyekBGFNTmrLkHsuyMaAgtk%2B%2Btutl4UtAeiHLkYCZ6Xyysd2JEtBpoeMSlxVKJLqRluPweP3mU2lxqEPUyZmlWS1JCEYKFi6paa5frWjv%2BkXH3iuQ2NAZJmMKK19d8ZAA%2FgtiFVWJ2kLdbGBRgGzefFBhA44hsOkw5NDfzQY6pgGO%2FVZ%2B3f6ZaoGol%2F5MjH35GP7%2BakBlzzG93VbRw3s6PpSolyYOtAsUk1zqv6SZGI%2B3Hlb5d3Msvob98muXsRcBC1necqJvwbwCx42DQSNEkTf6nimCXPaLOdT5ix4kHRuPjg5ODbgsdKOVA9y%2FrNHt9QS%2FBNX2SST24OBQvXXirCHgcgAAhwV%2F%2FBojnCUh%2BuXzYbQPrAj1oSi59oYtUIDOKYvWr%2Bep&X-Amz-Signature=d571af036747c2be238b8dbed6bc5c658fe118cfffcf566683a14d45859e9946&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZARTS2OI%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T113637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCICRJfZKS8wCK7K15XzTs8TLsxiQQUVuZ5we9dsJtRDSPAiBIW1GgXYZjZ6Kyd6gKoc6UvKPPG7ufrEC8dMtWHJoAOCqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqg386Wc8ipLi16WCKtwDvgKW8Ob4CtFqSTpJjCfxAObXdyg60F0gAtvbfFzPoE7a6LmrqAf0zCasb6SlP8hfiKrjqXRtoI2YMiYYtJh%2F4K0xHcFL7rsyIHsikZmu3b7ay9cQzlvQOr9%2B2WWiBjWwW1n50jbvJREEBs9yLZQvKFrnsAJ8Z4uaHv0SwvgXmC5Cgnkj5ni2ZpweslPe2Acq0cceaSGx84sqg61LG70JbdFscjN4%2FwDgrbxMvoK%2FBZ1Wut8H5mIViLRUWjEXBVFy1iQ04NLxv5VzhorrhntQrH18p1%2F77SdwRJX4O%2B%2BzMo9mFG9TAwsRXGiTwHh8FDkOE9NO8lcim3Z6KXenTIOhtfaODDe9jYrx3R%2FI2H%2B7jHCkpaI6VbyXaWyPKQWX29C3mb7hvfruo%2FAXCmq0InxxZxgEsNsfelX6kAAoYo3KJijJ%2BiI6%2BzyDYz6Bx6pmAp4oqFDhX45F3O15%2BvPjZFdXGXh412qslo%2BbtiEMASZ4uDxbHU3Z30pNP06aSaYiNFsLtbQggQio4%2FBoFAk4A4fxOoIo3o04ay%2F%2BH8PALP1CAIOJ1woy5dXkktaUngN2k1mNGAInF%2FTac41jRySPZ9ciiRPzgQSL%2BnPCxoXG9ZhdBV%2BKE2s2zaU%2FO3PXokowus%2FfzQY6pgHgpDXxuN1MdWfDjYcteqOBHUxjdpIgj2erBwNBW2vz8JmAmojYeqTgKHV5CnMnyOFaN%2BsRhQWGBsB8ll52hWNGHsu8yPSBv2wXdWpshEfScUpu6pFqgwkIaeXI5VTCtmeAB%2BH9rr9mYuo5dJUmdur0Whr8dUFOrZ8jVAV%2FR7xaDmz0L9YEC4XE20C7BLJARnbaaa5%2B%2FLqgT7h738o40%2BdS5kQRGZ7g&X-Amz-Signature=aca28ec27e929f53e01a2e3920b72de555fd39e801c4205c7bac973800195869&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VO2XBE5J%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T113638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQDURCdUoEXJZH8T%2BPv50ULhWnnsOBcrYOsGcFeUwppo7AIhAPvGUT57s8G8YbCncv%2B5%2F4vlbCNPoB%2BLdu%2BkrVl%2F6zCkKogECNT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxtlsfs%2BXKJ%2BdpfW8oq3AOQlsHxnhgjrsbiXvT7VpewjQK%2BAWcDyYaJFz9rqx1A62LQ8HefZAWhsACIVPvzRmHA8F%2BVzLeBxIjwN0DeRLBBef5nESzlRW3ClCA9YIEbXEuOsqQcUaveOfTEaQuIXNbTZl416iFMEO8uT%2F60gbQ8Lre2paylFXQOUlmFnVflkiSMYVUdSZcbWOFtLPiQBi5XcEeOslvLgtiRyyvYI6jRNV5qYkDwyqJVzJrUVTd3cpUSCA4U3ScG9%2BssN%2FuBROqSH2pagsVyp5GD0TluOtSpD98NrZIHKvptYgL9jEc63pFDgdTVHtldlYx5Gj%2FbXskWR7oHXnVi45S%2F9cHxcSwCiBFchoJvk%2BMZzNiFoPp%2F7p6kxTZCptdWSAAqmRUWIEilGzPWKCc8bKwtckzQ6n2mu6AD4ULTLGX2NrE%2FK7j%2F%2BCQm6EngvAmGoSB9wrLpBjqfAXbrX3RrjUg9eA3ljNrN2%2FCYoNAE4Q%2BKKaAbPc9CtZDGjhb%2B4eECmPQx5nArqPK1CaBwFmIcxOb4aJIn09o%2B9aEgXibNvacc9fMic14kC1voJ2ZEw4%2Fl11McJhD7uB3wTAWXLX0dYo9m0ehaXxOKErRWnngzMmr4ztzXMjCsBlx648N4EptKqSiDJTDjz9%2FNBjqkAYqPj282aXZM7AaTYyllYx5HeHsY0BfqiD2KfO85dp3UF%2BPY%2BHgwAeaB7utxVM6Qks7rSrO4t6w1vGnHhPahAxUCuhL%2BOQsuQQXnA5wdx5E6Lb4wxpBc%2FMocEyztcbyXOikba0g8r596MGq3cKzGDAel7UkRPzUKFYU6EiPOF7f%2BBqMliDqMvP8zCE5ZdhLLYh5bPbaII6iIXI4WmpGlS9OgQLHS&X-Amz-Signature=0868ea73adbaa37c1b27301529a03dff2c8671fbff2cb4bd90337a0a521fa882&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XP27KRP6%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T113640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQCy8uyr5Sz01xuIFEtBn6RdSPRpGdSli1NgQjVrQDO57wIhALoz3WfiVNlf4G2GtQJTtBN4TMUGvw5EIrMqLrMTZ%2FBRKogECNT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx%2BoRSVDKuIcqoV8gAq3AMvDndh%2Bb91AN9awaar6gkwrsJ6PPV5Uu61%2ByUUYk6qdBFCc1bljnGGL1gFYP6%2BWRfgPbERid0qns%2BIZlakQKm4Ll%2FA5%2Fz2fPB0bOMqprkiYoc7Zpiv4Vq5qnMhbDPixjFZmbPoJvV2tCN9EjjJk3EWNKzqV7d7ZiZ0mVjzRzlmKYPPpIjjmqblaH1HwGmdU0IX5nXxxDSODFbMdaEMGn4YoSMCJkrKbuAXR0vAoTauqh5aew2Aglb9pqIu6PwyIAPO6XNwCfCnROnc2BwtEf337iQszz%2BlhQUE6OagACOh532xinl5or5tol4Cv3zZr75WgQiLUM2HJY098a8OjVih1XocsJ4EmguPVGiCLGhzYHtfIlpX%2FgmMD2oYRyvGkUMqSn7Rtei6qFeMGcGOU%2BCNhFf8Tq5%2BEKr4SM8qQXp03gc6WaI9q0e%2BwO1nAzKlsNwj0qpag0OJ5bu40F05zIoEBqZMKzubzJ7QTHZVIIcaVJXmlMFVVJvmO9wZD0ABLAaRtne8GLK9oIeZx0Ypp%2Fyhh9JXpfCJ7NOdB3%2B7ShlJbtKecwpVNGwOb3iHq1OpT%2FuxYKWrYkmy5Dui%2BqgKJ46Q3Gpu6%2Fr4Rq%2FbnQp3WFKzLihG%2Fk1tK8MqSC54KTDC0N%2FNBjqkAcxLKsm%2BEWzHey2If4HiacN2M3Q1gnWD09rJpoGjEcBnOGttfKWoe1%2ByB1Wwl%2B2evCaPLmyYEMW3eyoGHSXWjBvWCrEusWcKWb3tio4VAbfgc2Dqb9FUv3DdLYoXY7foRmOqB79gc%2Fsclfd0W164129QnU74h2VboRXs8k5HId%2BcXme%2FiIp41gMWXmRjqznPscGO7DaYdeSI%2FKwDsG5O%2FyaeYeXp&X-Amz-Signature=3a488c0848364594610e1be5ef7cfdca1bfb98bbb6ee6da50f82fc902c318da6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBYJM3MH%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T113642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIQDk23KA%2BlYRBNlffPxzddZIhdZCL9ZvtDgl%2FjwGNyf6iAIgEzokxYH8qV1hb3iO0tc5URxKu49e62JQBbAFYN%2BUS1UqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCP92E3Zg8Tj8KrRWSrcAySwpZA2k1KiK%2BZScTXMzPo%2B0nA4PfQhwARv9KOEvH80TR1Uz2f%2FjTbM3NMYU4VV09OEQO6LuYAS7dpwJGwu%2FhFWA3W6U7R7J1LpC7b%2BI8zpzSgWaWh1JsipO2Sy%2FK7mZ0qYPQ8bfNXgIETeiIhFvo8QQENjn2yyCysfRD33bdeGIjBMznkLwhulxE68%2FHBX9aupb8rpCKu3AcRy4CAFXVWYe7wWbzGtkB1LXx93sCYxCCHN%2BYbjhA5fukL7D1rhOXK0gErf55iQ0Z5MGZ8io%2F8jMTqaNiEd6b1NRcl4UXtdbbFo9RTzZl8bEdjvDh%2Br7mWI5zickKB69MqiX8cVpaV0n6ZIpJIf%2FiCsFjscgiE6zI7%2FCL0EryOYITS6kzoNEErcjGTaEqZF8hC4NpcVBJLYsIuU9%2ByqctsOkV2mZywFe07kvZvz2i379uEUd7T0GNk%2Fs%2FjMMFXglhvOgTDOcNRXuXXIxX%2BvSWpaSl7Oa0CtJBEWAyIIDQVag9XUT9QvcKU8VuM8R1lnLQgKDkm0ZE9GOLb7Ed8yeGH%2FgAUa59MvqVBx9iml6eRgfIeBrVTc032OliaTD3%2B%2FpkCE0fp9Cp6EM1HsJceYD%2FY%2BwrtpvvWEl%2Fqot1Ir6StGmwvEMO3P380GOqUBJ6%2BHWASsOEcMFiV3FioSzZSlopIErmLny8EVtv86gfc6riUPbtSpvWqoJq3pOJf4MvFcymqqKWZQ9g2ZHRcfbJ3yNXCP1iSNYUxZWT03WxhQsYeuQ%2FrpA%2FSgDbiZLS5KbU%2FKO0IQhk5fhW4Bcesjf8cgABV5riARa4Sebf5%2BTzwsGcKKye5OITTa1Onk%2Frp2CAeyuARwyPlZXdyt9v2p%2BVQOua0m&X-Amz-Signature=55c9b995492bc0b359f8597e785692fe0b1c3b013fc6f04de77556e1208b5c60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBYJM3MH%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T113642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIQDk23KA%2BlYRBNlffPxzddZIhdZCL9ZvtDgl%2FjwGNyf6iAIgEzokxYH8qV1hb3iO0tc5URxKu49e62JQBbAFYN%2BUS1UqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCP92E3Zg8Tj8KrRWSrcAySwpZA2k1KiK%2BZScTXMzPo%2B0nA4PfQhwARv9KOEvH80TR1Uz2f%2FjTbM3NMYU4VV09OEQO6LuYAS7dpwJGwu%2FhFWA3W6U7R7J1LpC7b%2BI8zpzSgWaWh1JsipO2Sy%2FK7mZ0qYPQ8bfNXgIETeiIhFvo8QQENjn2yyCysfRD33bdeGIjBMznkLwhulxE68%2FHBX9aupb8rpCKu3AcRy4CAFXVWYe7wWbzGtkB1LXx93sCYxCCHN%2BYbjhA5fukL7D1rhOXK0gErf55iQ0Z5MGZ8io%2F8jMTqaNiEd6b1NRcl4UXtdbbFo9RTzZl8bEdjvDh%2Br7mWI5zickKB69MqiX8cVpaV0n6ZIpJIf%2FiCsFjscgiE6zI7%2FCL0EryOYITS6kzoNEErcjGTaEqZF8hC4NpcVBJLYsIuU9%2ByqctsOkV2mZywFe07kvZvz2i379uEUd7T0GNk%2Fs%2FjMMFXglhvOgTDOcNRXuXXIxX%2BvSWpaSl7Oa0CtJBEWAyIIDQVag9XUT9QvcKU8VuM8R1lnLQgKDkm0ZE9GOLb7Ed8yeGH%2FgAUa59MvqVBx9iml6eRgfIeBrVTc032OliaTD3%2B%2FpkCE0fp9Cp6EM1HsJceYD%2FY%2BwrtpvvWEl%2Fqot1Ir6StGmwvEMO3P380GOqUBJ6%2BHWASsOEcMFiV3FioSzZSlopIErmLny8EVtv86gfc6riUPbtSpvWqoJq3pOJf4MvFcymqqKWZQ9g2ZHRcfbJ3yNXCP1iSNYUxZWT03WxhQsYeuQ%2FrpA%2FSgDbiZLS5KbU%2FKO0IQhk5fhW4Bcesjf8cgABV5riARa4Sebf5%2BTzwsGcKKye5OITTa1Onk%2Frp2CAeyuARwyPlZXdyt9v2p%2BVQOua0m&X-Amz-Signature=351b15a84657a426ad5403575f4269a32eba519ec742a5862677c7c585615b77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663OF5YZYV%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T113634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJGMEQCIDCJQV0DExI7La3H9oqek4JavCjktMcfNVS5aG6f6Px0AiBGZ7jonQPeipLPjN%2B2w8%2FS33KcnAMHgwr%2FRMw6j1rd0iqIBAjV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMUGpWG4kc7xshPyEWKtwDuK6lSxBKvnwNFZmohGnoCd%2FS1L9En5nA39WWah1J6AzsWSf610qRC2kAHbMRiJJDAZUHqBfKcQ%2BNVyJfQOiE9zCiFShk%2F4MKPYmMeJk%2BuaNM%2BhfOTyunCusM9zWSidfB7IBeHp0SUVumNPbRt2diPXc%2B20quIiR15IsJilVzOdXNPUBUtA9MDatZBZKmUBkIE%2FjphXoOZuD8K6bjihqrJtpNNJ4UWpK6clvt3O2XJBusPPXx66LWLfAPYmoR956hG%2BYZk0vsdUhFyPOLgdbyas8LsiUR21K8l9o9P6%2FLPjAUIJW9rcW3YxKYg0YdP4MzRFYTRu5OBn5VLBe1wxcm9PwFZQxVuJn9q2q4uHiQXevG0QQO1wtVB3Hi6ydiNfTcpcikpHhwp5AdjVM2YV44SIAiQMrWMf91URGqrtMYWsXd5liZvH4q06Khsrgl%2BmKSESKWig41d8KmYNbWDO0sqeHhCwSo9xODJkx%2FsyPog1rL%2B3BBSG3myaVJ%2Fyd23NAewBoK9BJEDJ8Z9vw6%2FvgEpV1O9ZJ7df5AdJSkEkAc3MemzZ2fCnDeV%2BmnVI2tktRiU73vFBbvqKxf4MGYHWGgBuBukUI18J0qw1uJl5aAu%2Bt3Iztlap5kA25C5S0w59DfzQY6pgGNZNUL6Ug5hwqTKMxCCduK8j4fyXaRhMfwzQeFxTWUUxO%2BAO92y%2F6Wr62fYpdzPza5EhTJmY1q9n5ZhboOHtq2%2FBAgWsFBaoZS1hLAHGAmB%2BMTl%2FMxlGWdhTrjsJ7xSz4T6ELgH%2BTkHnYB8aEJtYhTE%2FVP2gk1WRY4kyTbq2o%2Bbi6vxD2OrP0gs6XcAUGaAhWdCnBoXQWDMiGJtVUdDygAkP2gOOWp&X-Amz-Signature=b06a0a38623b4a95916024be73fdf0b95c1cf7bfd8819cac006b3f428de31ca1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6RZKROM%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T113724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIESXWp4OvouGIkm5cbAzB5UbWf8ZFEcb%2FUgazyTrgPN4AiEAkS5jaaAGqj1RbKOAFnl5slebmZnnguBwc%2BpW5SMV2%2BgqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPVIUPv5LMfZJP7LbircA5OkZcylDwv6gED4w85UwO1Dcg%2Fl%2FXiLs1AmtweA5MAv4rxbiOZE09T4UdYoqpSYjXR3gs8H3FpPAWjcCSJUJeyYxQgFaSxMcDlg08ksIf0Gyl5CLzPMPhl7HACiPdzBZ%2FesNkwmrHXwz3z%2FAwMd8E78drCrkl45KvgePp%2BLkNudQd%2BZQE0mxq7ZfF%2BagnkXuVnAnXRWz2WY1U9SbCIU9XVlaVWyiX%2BN4RWYbBTCkPhMv%2Fz%2FsG4Rw%2BOji9O%2BiEAAWMSe%2FVwEDlZNZEqhuEyF3r7qbcNE%2Bzc%2Baf3h%2FHn4LiUmd3lMQGEUL%2Faf8nVrOGYnv3Oo64cI4PIvHb%2Bpp2i81N63%2FUSHwjCqxfh6%2FnI8eHyFP7qDP0MM9Z1N70BrxwW3OxwYmTc7R0XbNeXlvK0Cn1nQf7mnszShfjOHGCwtXlY6eYAmF1vKWqNagNuWow3sYWF9eA%2B99XXGLgIDtT4DBrvFFcbCyr4YB%2FNPE3c%2BeOVcmL6%2Fsq0AuxpWlNK8YxNhxgwssyGkQHJdkHXuCbM1rN8Df1rPmQCj2s6Z099kG%2BUfGM1eg3zrz0zurQE89EHR25MT4x9r4Ch2XV5GILZ6vcJ%2Fg93jx8q%2FHxYYrJ0Fneay1vSR1zaeraNTkfNiMJbR380GOqUBIMqLYmFKjcC4RByVTjS2iU0RVUIhdwDLRArtQKggzMduMAMvzrwkcU%2BUj9w45OxKJ2tVXcAiSh8lg27NDeAqTlG9FVOuBZXalcrevhPbCYrRkEy1qYin8aHxfueZeDSnLKfHEJbR3cl97DxpTIEaFfLWL7kbd4MJktS5B10FYxNU5f9AjJCeU966YA7gt1MEuWZlZa5PMgnuAriGVWqp8B7QOlKW&X-Amz-Signature=c372f88d5a3e38fe8ba84b7a27f434412b22eb932bb590312f73dca9f7a66b42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6RZKROM%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T113724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIESXWp4OvouGIkm5cbAzB5UbWf8ZFEcb%2FUgazyTrgPN4AiEAkS5jaaAGqj1RbKOAFnl5slebmZnnguBwc%2BpW5SMV2%2BgqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPVIUPv5LMfZJP7LbircA5OkZcylDwv6gED4w85UwO1Dcg%2Fl%2FXiLs1AmtweA5MAv4rxbiOZE09T4UdYoqpSYjXR3gs8H3FpPAWjcCSJUJeyYxQgFaSxMcDlg08ksIf0Gyl5CLzPMPhl7HACiPdzBZ%2FesNkwmrHXwz3z%2FAwMd8E78drCrkl45KvgePp%2BLkNudQd%2BZQE0mxq7ZfF%2BagnkXuVnAnXRWz2WY1U9SbCIU9XVlaVWyiX%2BN4RWYbBTCkPhMv%2Fz%2FsG4Rw%2BOji9O%2BiEAAWMSe%2FVwEDlZNZEqhuEyF3r7qbcNE%2Bzc%2Baf3h%2FHn4LiUmd3lMQGEUL%2Faf8nVrOGYnv3Oo64cI4PIvHb%2Bpp2i81N63%2FUSHwjCqxfh6%2FnI8eHyFP7qDP0MM9Z1N70BrxwW3OxwYmTc7R0XbNeXlvK0Cn1nQf7mnszShfjOHGCwtXlY6eYAmF1vKWqNagNuWow3sYWF9eA%2B99XXGLgIDtT4DBrvFFcbCyr4YB%2FNPE3c%2BeOVcmL6%2Fsq0AuxpWlNK8YxNhxgwssyGkQHJdkHXuCbM1rN8Df1rPmQCj2s6Z099kG%2BUfGM1eg3zrz0zurQE89EHR25MT4x9r4Ch2XV5GILZ6vcJ%2Fg93jx8q%2FHxYYrJ0Fneay1vSR1zaeraNTkfNiMJbR380GOqUBIMqLYmFKjcC4RByVTjS2iU0RVUIhdwDLRArtQKggzMduMAMvzrwkcU%2BUj9w45OxKJ2tVXcAiSh8lg27NDeAqTlG9FVOuBZXalcrevhPbCYrRkEy1qYin8aHxfueZeDSnLKfHEJbR3cl97DxpTIEaFfLWL7kbd4MJktS5B10FYxNU5f9AjJCeU966YA7gt1MEuWZlZa5PMgnuAriGVWqp8B7QOlKW&X-Amz-Signature=c372f88d5a3e38fe8ba84b7a27f434412b22eb932bb590312f73dca9f7a66b42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MLL77W2%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T113724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQDBGp4aRDaIyooC6OtT%2BN0ITicCVglLZEGefdQTr0c%2FggIhAKmAIq7N%2FEuvmM2dWmlPkl4Xl%2Bc7YIFIjGsWsLXr84y%2BKogECNT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyt4%2BpoM8EGniPY0oYq3ANDuOBE7Xs%2FzdDgv9Z8wWv1SGBh6OX3tga1sldwdtlWXRUH%2FsVGuoVhsxSevNjHM279yx%2B3uAt1Shm6SsMgW9X7DkW%2Ffdx8u4S%2Fcmgb14mrC71MmTo0IVCo8oGIkHv6Zxao0dtiBaMY0CnI%2FDSdktmtdhseVMQZG3DYRI2lCicTEp43EJjkP9ycp2vJssmJ9Vf88dMo9kmxrk8ItZ50s13K5DaP56mDDOvxIcsfauIUgok7avGVUL0AFcq2Few%2F%2FJK6r0%2FPwAAtZvTEdkcE6FDIn4OO4sMzrXrmmaZPLKbpHRHDi68ZXk7aAEa8fiHZKDTbiBNwpgBDhEjOkpiMNNm03FukYBQtYCTIqONewmWzy6g3M%2F37CTRwoQDhIPBslcdXuRDvmrO%2FYOm03Cez63uEaDUWTwlcxioYwC1Qltp3gyYepp9DDwabPcFGcHNI8KpSl3rdr4BhCHmWhA%2BvtS1ZsuU6HvfP8148PUV%2F6ZhD5LfXXvANC%2FkOK7HXe8z4U0go%2B6uTwx9rLkPXBVKeRjWpAU0ZLbynZf6CRV1CV4i931142EbF4HDhTdsyUy3xapRLQZF%2BSSoBJ%2B0ux9zjNZOOMAJYGhBNW%2FMVsLiQxrAT6cx6iMJmS27KU56ZVjCm0N%2FNBjqkAXa5SivXT7VNGFNild9ar6gcV9i7HDGucTH0tojGmqtakNwz%2BHtuIw6YqgA5KtXVR3gvkVfB1%2B6aHFt6H5sRp3z0J6x5lIyDN8I78QQIsFn1iZcbmBmRI8r1Bfl3%2F8Z8P0sITw7cW4BCCKsRYN6%2Fw4mqWwPBcBukHaMD0piEBQY8%2BZkDkhVTWJxt6XAhKx8uvXiQ9D3dxlM7o0hspRDe20%2BVDNti&X-Amz-Signature=2bf4920a3079b1b81a3e45e07f5d7fc41083260be7e922a9365337cdcbf9b194&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

