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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KIMR4EJ%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T064046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIQCPoZDrmmEe0iRHc2FBxXrsvfEKP0I%2FJG%2B3H2aHFnBv3gIgVdnWzmlmCHgphMxxOEOFdjELJ69j1BLErc2GrNmTimYqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO6VAyTKEI24qenqMircA%2FTBQsRYaJVlZVlVgmLMhYVfuYFNipXlNUXC1FTB9YR7bD232XQaU7QuiHenY6QQGm5ZwzGrmWmLG4iQsiJMxNO%2BfJzCuJ49CcH0ZdE37pPNqMAFMJVlyTl3FhmgvYXg8Tgwp62fFPu2liv4bArzy0FFbDhTIt9ZtGCLAu2Bct32nt%2BYzvSnyUA8EhuqugnVejxg9SzT%2FbpP%2F%2BWKDVZhEeRunEmnE%2FGn8en3h5UPKrfBUjp9aqVeTYGJqzFdxI3D1%2BVD6C8OAVmSFz0aJWjEku2yUzVFCbTZV3H1UdW80KxQig6dTnxiAaFQ8sKHfnffznxB4qHKNwuRWhUFzkpMyFi%2B%2BwJPEtvbrU9BT%2BcnNSrIIDmVi9JlTOR%2FEE1XSU9b4PD%2ByR764f0nq1OHp1vmZeuP7LIwSjvvOhRVZRfXT5HzJErD4xXIBOdKOMWBbSxgGmjQWJzYUUsmo2pLWsqj5%2BHVaYO3eEFler0bpF5otTBvoL7h1M59FnL8Vj9GYJXzSBW40VsvauUPaRUSU5baGCVNVMmCdWPMbA1PnfsAKy4bWi49xsZE9DoVoYAiGH4yLxVqXJvPyS9oJKBEN%2B9MECP7U6smcgUyZofZAaPFrIfQNLaZNZB2fr%2FdxoH9ML7Ync4GOqUB7qQo4uqyEHV96URP%2B0rHjqlTMufQNLahUFkiwOFXUejHrPDdzi2hke3aQ3pEXQ83RmRZKps3QKRWH5iShzHi%2BDFTJG9SGMDj6H3pXbkIhIuX3diT%2FsT9udV4ojBbaJ8Dc4HqmCYtqaynveVgNj7LQyBv1bFRSjrwIYVyGUYREwQomDVCZEBWlXaQwVlG9bO%2BX2PytkVTMB9chhmvlV4%2BWTdykwyD&X-Amz-Signature=d63c89f49afb3e506b38e8040ead4a40cfbbc0bb76571fc75fc1e6316fc6d103&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KIMR4EJ%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T064046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIQCPoZDrmmEe0iRHc2FBxXrsvfEKP0I%2FJG%2B3H2aHFnBv3gIgVdnWzmlmCHgphMxxOEOFdjELJ69j1BLErc2GrNmTimYqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO6VAyTKEI24qenqMircA%2FTBQsRYaJVlZVlVgmLMhYVfuYFNipXlNUXC1FTB9YR7bD232XQaU7QuiHenY6QQGm5ZwzGrmWmLG4iQsiJMxNO%2BfJzCuJ49CcH0ZdE37pPNqMAFMJVlyTl3FhmgvYXg8Tgwp62fFPu2liv4bArzy0FFbDhTIt9ZtGCLAu2Bct32nt%2BYzvSnyUA8EhuqugnVejxg9SzT%2FbpP%2F%2BWKDVZhEeRunEmnE%2FGn8en3h5UPKrfBUjp9aqVeTYGJqzFdxI3D1%2BVD6C8OAVmSFz0aJWjEku2yUzVFCbTZV3H1UdW80KxQig6dTnxiAaFQ8sKHfnffznxB4qHKNwuRWhUFzkpMyFi%2B%2BwJPEtvbrU9BT%2BcnNSrIIDmVi9JlTOR%2FEE1XSU9b4PD%2ByR764f0nq1OHp1vmZeuP7LIwSjvvOhRVZRfXT5HzJErD4xXIBOdKOMWBbSxgGmjQWJzYUUsmo2pLWsqj5%2BHVaYO3eEFler0bpF5otTBvoL7h1M59FnL8Vj9GYJXzSBW40VsvauUPaRUSU5baGCVNVMmCdWPMbA1PnfsAKy4bWi49xsZE9DoVoYAiGH4yLxVqXJvPyS9oJKBEN%2B9MECP7U6smcgUyZofZAaPFrIfQNLaZNZB2fr%2FdxoH9ML7Ync4GOqUB7qQo4uqyEHV96URP%2B0rHjqlTMufQNLahUFkiwOFXUejHrPDdzi2hke3aQ3pEXQ83RmRZKps3QKRWH5iShzHi%2BDFTJG9SGMDj6H3pXbkIhIuX3diT%2FsT9udV4ojBbaJ8Dc4HqmCYtqaynveVgNj7LQyBv1bFRSjrwIYVyGUYREwQomDVCZEBWlXaQwVlG9bO%2BX2PytkVTMB9chhmvlV4%2BWTdykwyD&X-Amz-Signature=d63c89f49afb3e506b38e8040ead4a40cfbbc0bb76571fc75fc1e6316fc6d103&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YFB2DOK%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T064046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJIMEYCIQD5KkOHzyaOOILNRq%2BWKd2YgyPBuL3A6FJPPt3psKpE9AIhAJXDd27xRdQxxQAtmY5deo0roZKoTiLGHwXOlY8VG4KcKogECO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyHAiDofmoKIcxe0wgq3AMy5BR0wDWjdbMuLYQ7Zm4uvc1j7putO47Jg7LW739fAXyKPlW0ph14nM4PV1du0%2FXe7rLejjsN01yAq%2BAGgd9PoEeulLmBd5zwUYDWacChOoIn4oNojZp2C1R%2FKnASxu7j%2FCJbUtg6tM0rNv0hWEQODLGQNP2cd62OsZuVw0zZQkN0wYIXz3YGe8ITlo7Uq2S17xTJaL7VyT1BucjGIzZIClTbXOrNtOT12SvGm2ZgY29QndE7Qd%2BPIaVWhUIybg%2FqNTBMkuP2roSq4%2BnQXv3BPJE33DNRF3jKOR3zM9DQXWkxzoDqKokuTVb3%2FEn%2FCLSwu0Bnt3tEmyla8IW1kqqeJqFfFTw8XkeNJlvi0Nw0X%2F6aRwrpB9aEpNBA1dyin2Xxc%2Fwv%2BfIxV0wQD27weqy8uwcJCtngAFwkonItjmNWebXXgzDlcqtGb%2BXm7SFdvhnddgLuQQ8Qt%2F01Beu67t60%2FPnD0hMl92EDX296VvvpSttWGyAM2e5TSlvPVS8siPVN1TQv0EeJDXSil5pegCYQ4o9%2FHjCQP9FL0tMO5O3uEu%2B2IZJZ8UCcgjGkDtq%2Bf3pX%2B3Iy9N%2Budfw69iD9xO0XAVXqWlRTLJf%2BaJVIHz6DXKDTA8swF0btwlqwqjDq2J3OBjqkAYfTpQTyMGCp1YBedvejnOqNizKCT9uSofZ5HDgU4MIlVnPChTecsRAqVOnlpnF5GbS6B1wCjvjWm%2FmjUr3mMCE9AYv92QnwGExzPkHDeXjw1bcCuPnkNaPpocHhDG2ualxwOQ%2Bnt%2Bj8Y3sRsIcEh0lSSOJpEo0Ro%2BQS9MPjs7122AGz0KmFx%2Fi5eUZx8Pd5RIHzGbX7fRq6IA77pBpy4uf2%2B7P7&X-Amz-Signature=2c142f8567961fac3b9ad8434654f1d68c347365587dd8fe157296abedff678f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666Q7M2LQ7%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T064048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIGF4bgelbtvu5Ie58%2FFJ78JXdlkxBkpBK6G7jbaklg%2F2AiEAyAB%2FnOnlHizsWdRKWoGaDwkquFk3YxnnkQS7Mu02sokqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHx1suBMd3ucd%2F1KICrcA%2BuXgJaRco4j3CbPSUL2h06EIA3DMZaTNXibBkN6zh6rQSdhHxyf4U6D0bazdo8%2Ftf1MI88p%2B9N1B2xG0QiCUBvruwdrbqBtn0%2FkJg6WciLuYhEkdRFmJmQPZO6a1R%2BowplsXTcW5nWSf7FjIsB1bSpWn3k8FLTYMa1jTwcscRgckU5unw0xHRPUJ5a99tyd0A1FUPmCpVH11cMrwLd2knXieObX5bbn5K1REytTGErofL3J1m4c3%2F4%2BN1IKTZXf32NaR%2FLqOtzUI56LO30%2BpW0QCch2W209j2ZuroFVlL9oOxC0j0Y7XkYwqKImFvJsl4Jl%2F2qOYNjJOvm%2BjPgeFPYBYV1AXLXLDhvcfWY6rTQYMSZDh2CHhXJVrSrT4s16YRCcOU%2BtHUEO%2BN3pwS0Zw%2F31y2Okg11B9HcMkOzU%2BSt1l3D1yky8ZQtG6bGnwlERRJNEAz%2BY5t%2BY0yYFwxJu7qxK5G1lV1ictiBLwKsbW7%2FKieZzzHwyK6uN4%2BunfJ8UyefDdKbPdfLcozSRwmkyKa41VAUD2gbaMWSXrQLUIDOhbc14iUne0oywcwDlue%2FfcA3gp9EAiwO9jR4j%2FpXXInHwOy1gnjLxvfeHzTOptYmDTdnjXAweRD0P490ZMIvZnc4GOqUB0upiVhoSlDbskzo1SxthiaPwEAdDq%2FYWkgolAtBKgR33xwxeZytn%2B%2BksEHq42EeAK%2BB6HM7TOHeHIjB2ppcGw%2FcSI7G2yb5eEh9P5HQT5lzr0lCixy75emgMA2YpFvSJ26C47qafCekCTZWClZVl4h7be2SDGYoRIJ35UkCFEp3uOwwHBLYAmJ1ujEtS8Q5qZJ61mbLdWy2IYQy4lgdmwgtvOk89&X-Amz-Signature=d840db19840c2a71c547b2eacbf3e0bf2309c0857c334200077d0185ce206fdc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666Q7M2LQ7%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T064048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIGF4bgelbtvu5Ie58%2FFJ78JXdlkxBkpBK6G7jbaklg%2F2AiEAyAB%2FnOnlHizsWdRKWoGaDwkquFk3YxnnkQS7Mu02sokqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHx1suBMd3ucd%2F1KICrcA%2BuXgJaRco4j3CbPSUL2h06EIA3DMZaTNXibBkN6zh6rQSdhHxyf4U6D0bazdo8%2Ftf1MI88p%2B9N1B2xG0QiCUBvruwdrbqBtn0%2FkJg6WciLuYhEkdRFmJmQPZO6a1R%2BowplsXTcW5nWSf7FjIsB1bSpWn3k8FLTYMa1jTwcscRgckU5unw0xHRPUJ5a99tyd0A1FUPmCpVH11cMrwLd2knXieObX5bbn5K1REytTGErofL3J1m4c3%2F4%2BN1IKTZXf32NaR%2FLqOtzUI56LO30%2BpW0QCch2W209j2ZuroFVlL9oOxC0j0Y7XkYwqKImFvJsl4Jl%2F2qOYNjJOvm%2BjPgeFPYBYV1AXLXLDhvcfWY6rTQYMSZDh2CHhXJVrSrT4s16YRCcOU%2BtHUEO%2BN3pwS0Zw%2F31y2Okg11B9HcMkOzU%2BSt1l3D1yky8ZQtG6bGnwlERRJNEAz%2BY5t%2BY0yYFwxJu7qxK5G1lV1ictiBLwKsbW7%2FKieZzzHwyK6uN4%2BunfJ8UyefDdKbPdfLcozSRwmkyKa41VAUD2gbaMWSXrQLUIDOhbc14iUne0oywcwDlue%2FfcA3gp9EAiwO9jR4j%2FpXXInHwOy1gnjLxvfeHzTOptYmDTdnjXAweRD0P490ZMIvZnc4GOqUB0upiVhoSlDbskzo1SxthiaPwEAdDq%2FYWkgolAtBKgR33xwxeZytn%2B%2BksEHq42EeAK%2BB6HM7TOHeHIjB2ppcGw%2FcSI7G2yb5eEh9P5HQT5lzr0lCixy75emgMA2YpFvSJ26C47qafCekCTZWClZVl4h7be2SDGYoRIJ35UkCFEp3uOwwHBLYAmJ1ujEtS8Q5qZJ61mbLdWy2IYQy4lgdmwgtvOk89&X-Amz-Signature=8c55bc601a97937ed1ae16d6036654c357a356155f745c7756a125ccc1ecb5ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4KYUW5U%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T064048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJIMEYCIQCHeiEvh0pUT9pQAlUdul2lR9biC4VwK%2FCuWIXiGJNWoQIhAOFsJO8Y%2BAPgihunDKF34AmrNp%2FuJth4VSCpebxaAuEbKogECO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwgGfqM4gEgxnunMOUq3AM6WoCVbs8b7HYFEsayfWK3w3eNX3yjfo3UB%2F6EcMPs93F65X0nEqmNArSQpj3imYM8pMiJuQsFdFFrTgSPDyibA%2BUcv13Oiy6pKyA2Kw7aU1cg%2FG956ZoUMtafichZP0tRSNp7DIUDwGla5Vv6UNh0NYcVEXO6UVkQnWpv3Y79X1rwqG3qFkiyFCVMSMEZxSzTwDGpItRCbMzqLRTciKjp6kGuATpUTSQmOH0DsUWwe9nkFKYFo8ORePtyEYJV7SIez%2BXBT9mAeoTqeekaVi43ue4hqzHQg99%2BHqncxPN5t40tXm3nAN9bkNqc6fhLB%2BlLoNxuf8Ym6DQUmcqBZZ%2BzZREkIshBxBZDF9vBBg%2F9YFHVTWvv8XpcyL7cNNQovAUM%2BbZedRLMmVu5Dqob9jhKkonKJRoF0QwdtsKHBbKHgZMtZmbHHTaxUisTa3%2FF4J7RklGZqv2T%2BCd5RwfA5KERnjrACVNajwiBl4IRBzrlxS588DjCxvNokpztKNejsm9S8eDr2kLciY8b8v15fuXa6Zk3GWPmSVi7NFBr7K57ixDq3ZA0Luoe6V1O3%2BadGptMXh9fERGIrnLuWHpIJi34LckoqQMLGFvoLZ0wTAMyArLr%2BMlk7XTLS9%2BVjDCa2Z3OBjqkAQgM4%2BYZfoORRaV%2F3x0YxlBSmtRysz6pNZ3uaPKkr9oLblH%2F8LeZZFiD41Slx3%2BoIRDot1hLN%2BeSSgbNm3E1NcbF48jQATnwYQpbGY5MdU3cwwn25PspXqXyU41DkLL0fRucovhggN14KKWHbKKevS9Q8W3nZrAdBlFBC8hWddhMCjYaqeaN8%2BXhdLzFXHq7B6TIgp46LC7eigkum9j72HMk9c%2FE&X-Amz-Signature=25f79e4b833a1acdd270f0ac373bb055a33d082ad9f47be01fdd5c5af2a0c276&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZR34EQ5T%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T064049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJGMEQCICWEYwHv6QNnTxSILKBKB%2BgTdyuaX15zrnKaALONV5OLAiBOZvxMPDZXjkIy%2FPAPbE9bhVOgpn5PtYT3tCCu21T2XSqIBAjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMW5Hq6LbwkMwXygu%2BKtwDEO2dGlaBrBcoEiyktygDtpcyuul4%2F%2BTtv%2FvPFuXrBTbensYRIEprwcQ8zT29jRrvotDFbfanoOjfE0poRKwQ9WTkGz2XDWhasd6bTH4zv6tfShrLM3%2BpXz%2BrnBVZwXDvaeG9ZL0L6rZuVQRPow2ckLDd1fxi5ZdCd6gRZLazmCvN%2Bmh6OKCniZ0VHOb2fw01rYDkeTSM%2F7q5IVhVyXPaQBOX4rWi9DkPVl3R8TLWn%2FJT408Z%2FeUda7GxF6z9cWCzN4WmKuqE1MOV4wCU82lHUmOq5NbDMd980KDzYHhllizavaEEBkFB9oLxZOjIpScPmDAEad%2Fl%2FD0xFakv9X9oTCRsQVK86d3G5fqHpU2iknslDeFUBWUZQf79cdja4irzBLwFIH5ZXARbPL2C8KQ471aAwUzsd1909mVJ%2F1uRSGPgiJw5Q6Fmi3t9XotPphPRZ9LD%2BbO8FzAgpzjwcNDvVSmxUQReZiIp%2BSt7H3o6t4g5mnZWUme5IR8YJBNe%2FUDTErT4aJoYcu1zvbwFw0dn38JmtReD7u%2FULksT4cczOBwjPZGVF0BTq018buJthN%2FhuuBhE7GBlbVaccK9M4eNmmoxwMkeoc2841ZhFgMjKdqFc8iVuRxyjIutBwIw4NidzgY6pgEglYseZc4QhczkC9Gpb%2BYB0dXULhAxFZ7N%2FnFbTgO9%2FFjwdP6e%2BMlJrb8Z2dUcVEY9speNmwnAngc8CNtr2QWkG30TGPS7P%2Bo7v5W4bIQAvNTX1dYRSQIqwi1tdPJdcUotqLd8Uxd9orIoPhGN4RzLmJbgnqBKY0OvSq%2FIjT7ENhAIUZoUSA7TR1JZSndDNLOaUqFyvUQ0Z6mWl%2BSw8n6RB3JtypLL&X-Amz-Signature=2e2940a05d82a7e5e958209f9bad6800896fda0e61a19438b9140e92c0a7aec7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTRBMB7P%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T064052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCICLPWqbSH%2BfDRB8RaETM2Op2t2LEMu66cpdmUXg4KE2pAiEA%2F9M5REYkNnmho9qnyD15QOO0Buc8dhc3Y8lIWqycOQ4qiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGVGXnlLqOdDd8MWsircAxONGCAOSY3yQhLBSUwTKeUWgMmsojMDaT0mYeEBBH9peaInGJLqzz09wtCZvUzYoCftXyI3bbFAHumc3NXJcYSHpZGDXCFMl8QmjFfOng4n0PzUPkv9KmVHuariqrs1xukWUmR9R%2BTylrTy0iMzHbNb%2FScC0MWCQTbSVnJAXaKvkSMdCJiEFeXhDlEkk9Yr6giYRaUfyY2wF70fAezTMTmQsnrYOY%2F0E1M%2FIU%2B9YHIUjB4t2Kaib%2FYX%2FkCBFV7grRgFnqxO1o61wugRk%2B8bzOZ99dCuZK5Mt7e05G%2B6gNiDMsBG%2BPhEWiCNsjlp1KMo%2FMQI5JXPVBoZpxuJ3AP%2BoODBmo5rdeEOZ8MD1rH0x63wmHqRlETN17m5wDzDt2HijFXQ%2F1M1TMeNs2X2nAHsqszjO9DVxNyd6KO4ZmRkFbn1o4CcHlaUv8xmTm9p5dB2YjOfSsAPZSAgNpLLUA8sHm9thAXzEHhakpyrMPNNY7Q1Cew4QvmBeqAsulOw1MqHYj9Ob31WMWbMApoOnSDGhvN1gDl6ba0CQeeVa2MpkeIgYf9%2B9XsOFFP%2FJ%2BInPDKESTW67zoIokzKcVgkGQ0gSk%2FT5PH74jgkei%2Bh3wu73bIosqgXngBDHmmvmdT7MOHZnc4GOqUBivMzLpao2D1BwQLJJR7%2FEfCtLpHQOXc3vU%2FidTWrGjm4LIjcLJ2VPMOjdZDdO7hJHEx5qlizHJ9xpjNFhkbxEOvAjdaBvOM%2FgIh7IGWAD4MN4B0uOfh27jpBzWGlV8WfxfIuqnQS7v8fdmQTve52M1lnnt39ep8oZCINv6PHjkLM9RcuFUmuGMFX2Be60LlegICvyWoqQuPMr1e%2BfHtUdOuEI3%2Fx&X-Amz-Signature=9ee775530ce75c8923d5e3404871e26ccac54bec6fb7e11c8f3aef048c2782c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BOD5DBP%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T064053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJGMEQCIFazthDGdcU1suCtWpi6FRppMjE77TRoOO%2BJyUJ1rQ01AiAHH7c%2Fh6JUuXLc50hTjCeq%2FQrPSAVqG6w6TWyxlINeFSqIBAjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9OsQJikt0N673LZbKtwDYejvPozkFRl9ce9U2FZyikoRFz2bHCgUebhw4sXA19cP5CQZE%2FTfyhRkB86oinFVXFKzINFK1qRzoQZKEwHROQ1EZrSnynaWsKBZm6s7y%2FwtRRLBQSwTnfUlmlBm%2Fg7b0KmLXoG0JX7IDKCwFFIhfri%2FGWJSpUzs3n%2BenHjWjQPMoeZ6UJLvo1ZjCFfLH20jSYeYIlvJVJPP9moHikENSOCYxl6q4hYFkOAAYtLTzPt5Prv%2BJOqTbzBYnMn1X6SwjT%2F03XnrMFB49R0GLI9DoaACIaY0uz7g8uSoKnkxpNCFYW9vJ0MOUMgRi5Tv%2Fo%2FfzsyDGSmfDPjwtlkvEjiZ1A0yAjcsnPxwWi9aKIcoLxEzzLx7Vo0jrbpgVmk06fWeoF4lwVRaOylXr%2BzR36TwxN5by%2Fh1y4vvgKfegf9Rxq7QAOJEBX1RMdZddy4sO0yvTRVjVDngbG73%2FHZLpn7kO37V%2FpZFwmSQlTQ%2BYqbZMpWpml%2BJcSBs3Lt%2Br%2B1rGabGGHAKqqzx9ID%2F8rrw3n9HcSZx7ebwkt5LKhg9xcMRk6rk%2BjrQTGkRQRBTabQYlOGPti3TWKaNb%2B9q0rCNJkl3S%2FLHiPso8Q%2Bb1YbRGwvArnCEEe356I57NVUd74Iw1didzgY6pgGc1c54ZWqXgqRPG8UoB9pBOMamoSkIzARRfgFvRKOSEENLURulnx7bHEpEHGRzQ5PFXIGhHQAFdBzb6jp0cbhDHpk5VodRJgRyo6oUCxG6y5nL0pZVS7HHXWSio7Mq7QratrpmKr6B0%2FmnYPHGrk5y0tLKC%2F%2F6VYixNAtPLSO2R6B1v1VjhZOs8XqhkAilZvGNkqyEhYztAUC53o4v%2F3uX2AfkU0H1&X-Amz-Signature=8bb32e8c3ce55861e1e3abf2e8443998dfc6890271355f9dbebe34584975a16b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BOD5DBP%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T064053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJGMEQCIFazthDGdcU1suCtWpi6FRppMjE77TRoOO%2BJyUJ1rQ01AiAHH7c%2Fh6JUuXLc50hTjCeq%2FQrPSAVqG6w6TWyxlINeFSqIBAjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9OsQJikt0N673LZbKtwDYejvPozkFRl9ce9U2FZyikoRFz2bHCgUebhw4sXA19cP5CQZE%2FTfyhRkB86oinFVXFKzINFK1qRzoQZKEwHROQ1EZrSnynaWsKBZm6s7y%2FwtRRLBQSwTnfUlmlBm%2Fg7b0KmLXoG0JX7IDKCwFFIhfri%2FGWJSpUzs3n%2BenHjWjQPMoeZ6UJLvo1ZjCFfLH20jSYeYIlvJVJPP9moHikENSOCYxl6q4hYFkOAAYtLTzPt5Prv%2BJOqTbzBYnMn1X6SwjT%2F03XnrMFB49R0GLI9DoaACIaY0uz7g8uSoKnkxpNCFYW9vJ0MOUMgRi5Tv%2Fo%2FfzsyDGSmfDPjwtlkvEjiZ1A0yAjcsnPxwWi9aKIcoLxEzzLx7Vo0jrbpgVmk06fWeoF4lwVRaOylXr%2BzR36TwxN5by%2Fh1y4vvgKfegf9Rxq7QAOJEBX1RMdZddy4sO0yvTRVjVDngbG73%2FHZLpn7kO37V%2FpZFwmSQlTQ%2BYqbZMpWpml%2BJcSBs3Lt%2Br%2B1rGabGGHAKqqzx9ID%2F8rrw3n9HcSZx7ebwkt5LKhg9xcMRk6rk%2BjrQTGkRQRBTabQYlOGPti3TWKaNb%2B9q0rCNJkl3S%2FLHiPso8Q%2Bb1YbRGwvArnCEEe356I57NVUd74Iw1didzgY6pgGc1c54ZWqXgqRPG8UoB9pBOMamoSkIzARRfgFvRKOSEENLURulnx7bHEpEHGRzQ5PFXIGhHQAFdBzb6jp0cbhDHpk5VodRJgRyo6oUCxG6y5nL0pZVS7HHXWSio7Mq7QratrpmKr6B0%2FmnYPHGrk5y0tLKC%2F%2F6VYixNAtPLSO2R6B1v1VjhZOs8XqhkAilZvGNkqyEhYztAUC53o4v%2F3uX2AfkU0H1&X-Amz-Signature=57a9127cb2e10413d5a458aa3ddd435c9d89c523f99dbf14216b65ddd9f0a661&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNLTVD26%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T064043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJGMEQCIAOBJiLyQP%2Fx2AelOXWoXsRo55DrIvfyW%2FbpSyr1o5IGAiAJANMOBVtrktJVnoB7ilXTuXZfTrtN9%2BhM7aBnD%2FRYOSqIBAjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMS5%2BPIGLxg%2B7sWU9mKtwDweAElqqtE13TNHn3pnaqljKQJT8G6ODT5ZOS7X5VMdwB9CMaTEqGaveXSNKs72huqQxGN4SEnBAiKH1vXzLDAfA8mOP%2F8kV1EsjRrneXt8K8jFArrzNKpPNK4Bo%2FztTSHakw9pFiwmApkO9dxS7JfOWQ4%2FRomjB71GGIbBRvbZMlhhU1dgInghjjKUvfGs%2Bs5aZINvuWcb2nTX5Fg8KoStFvcjeQORElF9T8gDrimXAiLYAOYHTcWNazw86gkD1QvM04EUE8PxjVllouOb93gIrqu05R2826uHOiQBz6CR7Ry0DXUbkRUls3aME1P%2F%2B6lCMaScA90eRRvG1BNRlxqBhCf6mhl4gf3zjH8s4kTeSoAN5JC6ILRt2Gl6LIvNsUwPvdlZOlNLGm00nyiHNU8XLo6tgdegIMmJoBd4E8fpFKkrIqODu0AMs1ylDyRBoBjuGkyZkRAd400CqhTB481R5jI7OR8Y1raxccOMniyhmyn%2BlcklomBhEd6MleYyLRz%2FZ6Qtjd3YQvBF1XUga3si3ju0dleqC7ijws7HqkyHwu0KC%2F0OLKOqNX9AUQkP3uEA5TYDFkzyDX7R6zkw9a4QgGk9TbKrPg6PYa5xqk3B5APcnEHrtdUIxR9pQw%2BNidzgY6pgHRSfEyoP81ooQNwLk%2BUjdy4A3JzAbyzcK06tDoTAWV%2B%2FiybbXrw%2BtoIaG9PKEs8luv8uCiU%2F55NGpK4ClM0WDy1Zz5EAucE6okY69Z7zike%2FVkgxkihmRjOAJLk3LtXirBbwN0Wxn5lPY5BtwDbajICwTEGA36p2fPOKDdCAbFiNWPvm0DwvjaLCZbBFzasg%2F0caCIebFPHvXYhWMV4AF3Ck6lQ6UB&X-Amz-Signature=8298a07b098b788a7b66e22345539265a293a2280f9d10a47afe7e78caeda6ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SPYGO7F%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T064058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIQCalvtJEAqlKCKEgg%2BjYvJeYmkgTBsPswtbo1i65Gq3yQIgSVnd%2FeA4HedzrA5tSgKISQtV81eusqsD02Zqj%2F4DeX0qiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOqCFh9SmkLC96juISrcAwAy3JiKw9Q6jgeDLkd6fM4bLDLY5qTa7D0fNDItlzFXfKJgntTgFtdacxB7m0XVCGjV11%2BsFc42%2B17O2m%2BRvzLdU%2BKRAJ7WeYhyMTqL6cAGcaPorlXBmrHI6amNJTG%2FbtfFOAwkbhif4953PBXSQcli1JDItz4LgUf%2FqReUDCq9NzYDTSoEDp4nCAjoR2hOyNNH23wtA%2BmfFaz3MZD%2FHUixSRYzF4X4cZbdmLc2NZcUBd56AKLYX0KzXN9LCmuUIGv9wlB0xxw3E3JywLQ5tLp0O6qKchfdXVY56fvPfKfnv6%2FK%2Bs%2BXcE4PZjJ07JRSwie4JvJmlUy425hNOlV26Ld5tA3RaGdi6TK4coOwCwQBe9mLkmorxIlHD819CcABGB1qsEDOo4H%2B%2FYSwKSChOgqYGR8uhAEPgT9%2FiyQ12csZg%2Fw%2BOxLlPSClen0AyXqhsnpU4U2LD4WC26qeJF%2FYVkK0%2FACWv8mzR0jPciCOpOlNwire1k%2FfDYooXA39obxLr4R23zW6vnDZZZN8Gu5JRszSOIm%2Btc4uAWfXORZXUnDA2RB3QzXqAOHCnSjPwrjVHAO86fI366BFTJTcxg3W21Hg92KCspwbGNCybU%2F42q1rU4rEx6rEYQEyUcEiMNjZnc4GOqUBnYw4GDksjZFYZUXiPBTZ1Kn4ewnoQ7NeAubkM7ARdreUwJEOrkcAK6wYP1s4y9CNjNmPLU%2BrXnPvEt9X484Au0jx4jKpHSbvC%2B8HvK82kd0bMNySeQIhz0G0M8OlbkuiMzWFGBiVUolVX%2BXYCYcIZSfyjmx0P%2FJ12iLyPErkPnhji3xu41F1Fhmd16%2Bd5Jk8k9xOvzgDhZEGOI%2BauaZSuloCq%2Fub&X-Amz-Signature=5a0a692c33b69e0990e3869ede5f8bfb4d61a3e093762e6d9690fade305c0409&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SPYGO7F%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T064058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIQCalvtJEAqlKCKEgg%2BjYvJeYmkgTBsPswtbo1i65Gq3yQIgSVnd%2FeA4HedzrA5tSgKISQtV81eusqsD02Zqj%2F4DeX0qiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOqCFh9SmkLC96juISrcAwAy3JiKw9Q6jgeDLkd6fM4bLDLY5qTa7D0fNDItlzFXfKJgntTgFtdacxB7m0XVCGjV11%2BsFc42%2B17O2m%2BRvzLdU%2BKRAJ7WeYhyMTqL6cAGcaPorlXBmrHI6amNJTG%2FbtfFOAwkbhif4953PBXSQcli1JDItz4LgUf%2FqReUDCq9NzYDTSoEDp4nCAjoR2hOyNNH23wtA%2BmfFaz3MZD%2FHUixSRYzF4X4cZbdmLc2NZcUBd56AKLYX0KzXN9LCmuUIGv9wlB0xxw3E3JywLQ5tLp0O6qKchfdXVY56fvPfKfnv6%2FK%2Bs%2BXcE4PZjJ07JRSwie4JvJmlUy425hNOlV26Ld5tA3RaGdi6TK4coOwCwQBe9mLkmorxIlHD819CcABGB1qsEDOo4H%2B%2FYSwKSChOgqYGR8uhAEPgT9%2FiyQ12csZg%2Fw%2BOxLlPSClen0AyXqhsnpU4U2LD4WC26qeJF%2FYVkK0%2FACWv8mzR0jPciCOpOlNwire1k%2FfDYooXA39obxLr4R23zW6vnDZZZN8Gu5JRszSOIm%2Btc4uAWfXORZXUnDA2RB3QzXqAOHCnSjPwrjVHAO86fI366BFTJTcxg3W21Hg92KCspwbGNCybU%2F42q1rU4rEx6rEYQEyUcEiMNjZnc4GOqUBnYw4GDksjZFYZUXiPBTZ1Kn4ewnoQ7NeAubkM7ARdreUwJEOrkcAK6wYP1s4y9CNjNmPLU%2BrXnPvEt9X484Au0jx4jKpHSbvC%2B8HvK82kd0bMNySeQIhz0G0M8OlbkuiMzWFGBiVUolVX%2BXYCYcIZSfyjmx0P%2FJ12iLyPErkPnhji3xu41F1Fhmd16%2Bd5Jk8k9xOvzgDhZEGOI%2BauaZSuloCq%2Fub&X-Amz-Signature=5a0a692c33b69e0990e3869ede5f8bfb4d61a3e093762e6d9690fade305c0409&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWGVJ7CP%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T064059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJIMEYCIQD%2BpPM6R%2Fr1Py1MuMLP7Negm1jH96gCzkRPBZ6SUcDBQAIhAI9w997BhKL%2B9pG82J8p2Vg%2FDgYzCZgwtSitBVDB30phKogECO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgywIXMRFmVqVsdtryAq3AMsYI4N1uLSAIH23cfdj9XhT71muEC9746xeUnJTS5qUP8hXxj9SZa6RJtrFd4m2VkVsOKpCRAwPfCjJgIKselnSpW5unpsXnnGV%2BiZG1MX4Oai57NaP5IFRhVWfBrPqZoAJe0qbRI%2BABp%2Ftwi8vlGcanRIagJ8tMFo91ePkKRghoxuL%2Bb21AljtGuZvqmGRPhbk89IMlMzXvhAq8M9yQoy5atMWvwtgjytL87vCIBxlMG2F4UZog2%2FNEC8RPajXFKU8MhXFb9cOPSyHqlFSKIS5l%2FHbMUrRUtrfvrNvF2yGIj1Z9fCCWalWOlcYOmGBjovJ%2FiJ7LZzmbLmEM8x%2F3Xo58ynfr4aTTAekO1C2K4AN8x2mfDFVEifzd6cig%2FETjgL1vsYenFX0KERvntMN6jhMP1wuUToyUEI67t4cMvUXOC3RVd9dzBCKPb2BiNXqkdSq%2BQf7LItG4f4rvpft7qP%2BqJpPWpLZ9pDDHG8Xl3QXi00Cph1JDQr7okJoUBqY0%2FrnYSXHNYn2I1qimxi7QhSW0WLnvXXOD48D0MpjL75Nsb%2FZe5ICaSiDu7pQdyXOrIqrJR89l2YG8onOJf0FVF5LOHCL4pFQ6VHyi2rvc0g8zmR7KnWJzFukeYXmzDR2J3OBjqkATmF4BbixzvoYRxgj2cERti4QH%2FL9YfYLVjsM2pNr4uKg3MUlufeuBV6LzXCxibFCjz4UrYRF4P6Xb%2F0tl4VRLH21E2cCnSRBLI4PYJt098dBZW6T59%2BnBgIChnA%2BUyAIPVmNEsEt5xx0tOtEu6A1oJLG8vY2U%2Bt7thPLBrOSNCZ6t4lsbbpbJih%2F7We3zWOsPjD4vz5x2FVlMButg4BOWpOfXEm&X-Amz-Signature=dcf40d038b38322db473c97611e0d0b496431f75888248c70a3d74bf5149ccc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

