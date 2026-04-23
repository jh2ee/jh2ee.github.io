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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WWISPXAW%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T082524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDMXnJJEM1eO04QOtyDH0OoL7RYjU0oGw5kkHK2kK8oMAIgD20Vh56NShqaf5mGCeXj95fN00qXYvIYNLvknLC2RIwq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDAtv23g3cYnHB3qnOCrcAzMavW0V6D%2FSm%2Bi4aGUPXzc%2BzfGGb2TVr%2BV1T0%2FngOtm74SbyuqSyLsDfdkkmvaHxVKRM3gtDf3qwCYvDRhSdpEyaZ8Z9JyesXY6gI3h4IEqsW7DcryM7Cyp6sAzy5k89d5XuH0xMUIiyEQiRar4xm4LQKboujdSRiYh%2F7BlKLa1P%2FOI74Xe56VQkjkaLpcptpZdoXa2rCe02mwbBjxuZ40BnqJgOTCG2yTpVSIK1knJAbR2cY2T0Vt7Sm9Vkik0uoqb5oVSOEHKyPONEQWeQpDxPksjVT7lemTIDsgcVefd%2Bt7dED5aLm6YBXBX4FxjXxUltXaCYQ%2Bk9KXGKYT2s6FJXP738OXoqP83FH10eK7z%2ByESk3a4eNqcTQXhBN8RH%2FhygSEQcOflCJjt3sVlxZgkIVIw2n7QOS0MjGRyqR8Ugn6zUnmbV53sLNRf4mlU7i3vTkFFrf9tlo6ZrbhEQ9TILw%2BvWOWpgU4h2KNVgH94GOAKNqZ1o0%2BFfB7QSp29GevVO937BSnNk13lB11MFJ8wocbi4etjRgRETdN3fULe%2BCP%2BE6ZA1vR2tvQzR4egnlX8Sp8CXk69EztC48yEmLOOQBq4b31%2BhMAdeKrOhbjHxU%2Baq7kXzxKyoq5jMKyYp88GOqUBJriKPtAMXF0GSGDipxwZJheAZqPEOz8GtShLDWcAZnLwWSpym5%2B1%2BnZ%2FSarsRBb%2B%2Fu%2FbsaO9nMk%2BaAS%2FEVaKtNl%2BdsSXMxxymmj2jnV1aPQm30azGjFnJHoRPnqJbIN9PM8VTM2qs97uDW2SnCpv1U7r%2BPWUcRrvweeg8BZqfUtEXjeWzIH7llxdy48kHJ7Ic5UNB%2FEkngtzB05DDXmeYDvfti1s&X-Amz-Signature=df51321004b519d8474c87c807e2168c896fe7ddcb4e883a06153a42ebbeb3d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WWISPXAW%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T082524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDMXnJJEM1eO04QOtyDH0OoL7RYjU0oGw5kkHK2kK8oMAIgD20Vh56NShqaf5mGCeXj95fN00qXYvIYNLvknLC2RIwq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDAtv23g3cYnHB3qnOCrcAzMavW0V6D%2FSm%2Bi4aGUPXzc%2BzfGGb2TVr%2BV1T0%2FngOtm74SbyuqSyLsDfdkkmvaHxVKRM3gtDf3qwCYvDRhSdpEyaZ8Z9JyesXY6gI3h4IEqsW7DcryM7Cyp6sAzy5k89d5XuH0xMUIiyEQiRar4xm4LQKboujdSRiYh%2F7BlKLa1P%2FOI74Xe56VQkjkaLpcptpZdoXa2rCe02mwbBjxuZ40BnqJgOTCG2yTpVSIK1knJAbR2cY2T0Vt7Sm9Vkik0uoqb5oVSOEHKyPONEQWeQpDxPksjVT7lemTIDsgcVefd%2Bt7dED5aLm6YBXBX4FxjXxUltXaCYQ%2Bk9KXGKYT2s6FJXP738OXoqP83FH10eK7z%2ByESk3a4eNqcTQXhBN8RH%2FhygSEQcOflCJjt3sVlxZgkIVIw2n7QOS0MjGRyqR8Ugn6zUnmbV53sLNRf4mlU7i3vTkFFrf9tlo6ZrbhEQ9TILw%2BvWOWpgU4h2KNVgH94GOAKNqZ1o0%2BFfB7QSp29GevVO937BSnNk13lB11MFJ8wocbi4etjRgRETdN3fULe%2BCP%2BE6ZA1vR2tvQzR4egnlX8Sp8CXk69EztC48yEmLOOQBq4b31%2BhMAdeKrOhbjHxU%2Baq7kXzxKyoq5jMKyYp88GOqUBJriKPtAMXF0GSGDipxwZJheAZqPEOz8GtShLDWcAZnLwWSpym5%2B1%2BnZ%2FSarsRBb%2B%2Fu%2FbsaO9nMk%2BaAS%2FEVaKtNl%2BdsSXMxxymmj2jnV1aPQm30azGjFnJHoRPnqJbIN9PM8VTM2qs97uDW2SnCpv1U7r%2BPWUcRrvweeg8BZqfUtEXjeWzIH7llxdy48kHJ7Ic5UNB%2FEkngtzB05DDXmeYDvfti1s&X-Amz-Signature=df51321004b519d8474c87c807e2168c896fe7ddcb4e883a06153a42ebbeb3d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QNPG67I%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T082524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHFI6TYe0fUTW%2F55HOFn6L%2FFycjowC640cjD5g1swG6GAiEA%2FykmrmrVQee%2FXi0asl8KTTbkBZhKZsB5YbMRNzZZcmgq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDPFeqZVPAW6Qu%2FiBtCrcA7fmcB8yuihvLvg9PsftIqW19fbBZKT7fjibJerQkyCWICYgFfBT33MTzOVcVAxPzkZpJJ36qQNB85x%2BVROSHNSjVTxHbOHD8iK8JADGMv0%2F%2FVD5n5KY%2BNWghbmrPkZXHHMb%2BrYgsxFWCyFzqp%2Br9hI%2Fsp1VkQVKlHrJ%2BXN21jCUozRjs8yFAfbqfXIuUvGuGlBeK%2BzyG4ZiccN0rC2vKoVr76MIMq5VwH2mrq6iUvgGfC4%2BixoulGBgwObeNUsIbkOvleawAl004YH%2FDM9pXVlUsRYtnMHWIVLHFluwrbiqq5%2Brc%2BzwCmbKM2nhSzKq640qdEPm4g52EuCbqAslDqikiJWdf8t1pU76ymoIB%2B6wEfdB8gU9SZqCKKDoFDSzJL5riCdWfPRbf4rWhVLjp4xMzx%2FrJs%2F4jcyZGklKfWvSfcwjfhhPAUK5RYhw1vIJEqQ%2BDadCRkyMKPIdOnFma1DCQFmcubt1ulQjz8T2oECgaK3TKDHBJ2cTOjo6C9ZiMDnlR1ebn3wWKt4Oug4wrXU4g7iycNs86JQoUdBe6HVxxJjrGia1RHKDniCj4Exzpy08cy3FDkBckviZPVLpSr7W4FRq1mPNU0kbU%2FEdlGyxYC0A10X6ynDQcSSdMJ2gp88GOqUBBEPpk0E0qWkXend48lcHH%2B%2BRwUjnKjr4SdrfXuNQwoBqglFm4r4RufgfUeN9uH4HLw60%2FSk73QOEHpUlbOVLfge%2Fkkcud21iPXm8zAz06diPFPIzwDpEaowJkTMtMXKN1WuCkAISkKqdIbpzp9Fivgr5OBcKaYsgS6O5GsseuO0LhuaiGuOsGt47%2BmD4J6ZFeM8A0IDQB6FcwTLsMpC7fZT9eTlo&X-Amz-Signature=28489b91371ca43b4b7347523210d5b865c3930d22d7724719a59e9a9f2e354c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XA47W4LB%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T082525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDFFI4%2F7Vjg6nx%2BTS6ZP5l4YaiXoa8irsgAfrz%2F%2BfF7bgIgKb%2B%2BWL5HA8%2FNa8sDj02ypPyQ8Z9Vftx8zc8gsoHKC9Mq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDKCxOI9zMFkdYZFUOSrcA8A2yxUBkpdG1wnjGHAjT2soe1M0AWL%2FNS7EmB095%2Bvr4Zn90UDUZuFYtvBPtuGYfD70oaagl5F%2FM2bZEwmDR6W6w7YuGZPdie7EQ08GTUMLrjhBQzO5PKvtyfRNXNR2cr0UqII3gogcvDEpaHdT8oF0O8dyE5noy01EjVl2QlMT7KNYEx%2Fsw6le4EV%2Feco5E2AAb%2BHlJhGNwAa6JJIxEFdd7%2BV12yx0TPVSlU2jZRCRci179YBM4vDZ3nXi6dKLHyOEbZ9Gw0uZaSTtg7HQjql1ZAEcIKovDgbgILM%2FoZpmigBJnJUiVHJuA%2FPVmsbFyEnYhUKlhOTr4alpMu6kYUsoCbPbSUmxHkLECHQ%2BlwS5NH5ioCZ4ST1wJtCr8bpSaS6ulkcCgMiXgKXE52bgnTQlbyLSwmsCUH1hSWBGD642p03la1c5f0ThN%2F4IfnSxN6jABDkOPHpSrfaHMmp38I5aYgvY0CbTLeE%2BEeP6sVOGiC3nqC0dDr3ZdFn7t%2BqAw4HlLXxaYEHGwWNO0sH%2FCaWz%2BNZirvljQ5UEM0xDJHyGxaKOyL4XB7MxdTvGaLVObxfODnGg9IoVu3ZqZNTHHP1VNogsrb6Khe%2BzN8V4ywqyrpx%2FIDhh5joWYOaDMI2Vp88GOqUBF8KTD3YpVRCqeeaHNl06HT0TVM1kSdr0bjTCw3ZMHBWZeluInrPSs9gVQBsVs4HcqVLBleTGno9ujzlk7ElS2euSGUCZg8OPncVHRwMKwoQeXcmIg2KfWdHsaX7cwTWxO%2BaW%2FBx67eHwMtwz38D4gVW9Rphlh8X1BX6MKyFG%2BrwYOhpWv9TLnmt8IKG7FGpQI89DF2KUcO%2FIUVuBd0YJM5RsJ2%2Bc&X-Amz-Signature=00a5439a47537a434dcb29cf10faf0e418ae147800896044b358cf7828276157&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XA47W4LB%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T082525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDFFI4%2F7Vjg6nx%2BTS6ZP5l4YaiXoa8irsgAfrz%2F%2BfF7bgIgKb%2B%2BWL5HA8%2FNa8sDj02ypPyQ8Z9Vftx8zc8gsoHKC9Mq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDKCxOI9zMFkdYZFUOSrcA8A2yxUBkpdG1wnjGHAjT2soe1M0AWL%2FNS7EmB095%2Bvr4Zn90UDUZuFYtvBPtuGYfD70oaagl5F%2FM2bZEwmDR6W6w7YuGZPdie7EQ08GTUMLrjhBQzO5PKvtyfRNXNR2cr0UqII3gogcvDEpaHdT8oF0O8dyE5noy01EjVl2QlMT7KNYEx%2Fsw6le4EV%2Feco5E2AAb%2BHlJhGNwAa6JJIxEFdd7%2BV12yx0TPVSlU2jZRCRci179YBM4vDZ3nXi6dKLHyOEbZ9Gw0uZaSTtg7HQjql1ZAEcIKovDgbgILM%2FoZpmigBJnJUiVHJuA%2FPVmsbFyEnYhUKlhOTr4alpMu6kYUsoCbPbSUmxHkLECHQ%2BlwS5NH5ioCZ4ST1wJtCr8bpSaS6ulkcCgMiXgKXE52bgnTQlbyLSwmsCUH1hSWBGD642p03la1c5f0ThN%2F4IfnSxN6jABDkOPHpSrfaHMmp38I5aYgvY0CbTLeE%2BEeP6sVOGiC3nqC0dDr3ZdFn7t%2BqAw4HlLXxaYEHGwWNO0sH%2FCaWz%2BNZirvljQ5UEM0xDJHyGxaKOyL4XB7MxdTvGaLVObxfODnGg9IoVu3ZqZNTHHP1VNogsrb6Khe%2BzN8V4ywqyrpx%2FIDhh5joWYOaDMI2Vp88GOqUBF8KTD3YpVRCqeeaHNl06HT0TVM1kSdr0bjTCw3ZMHBWZeluInrPSs9gVQBsVs4HcqVLBleTGno9ujzlk7ElS2euSGUCZg8OPncVHRwMKwoQeXcmIg2KfWdHsaX7cwTWxO%2BaW%2FBx67eHwMtwz38D4gVW9Rphlh8X1BX6MKyFG%2BrwYOhpWv9TLnmt8IKG7FGpQI89DF2KUcO%2FIUVuBd0YJM5RsJ2%2Bc&X-Amz-Signature=49cd68a97c3e95f20770d062d57114a283c10e536385e644ec67fe9b0d312d63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGQVEKAY%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T082525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEB3x%2B0gA1NVQX5XzyeKG9TlApdI4cetxjH%2BJRIYMmrMAiBVzZEvTGVeW8k6WWVe%2BXvblW%2FAhYwiEqFXP7oEMXttmSr%2FAwhhEAAaDDYzNzQyMzE4MzgwNSIMQs6VfBvcwdYzNL%2BCKtwDY2%2BPx9tI04qAXkmqg77KrYlG%2BV%2FFqvw6359oUAdtKMwzXN9MatYXd6kpyqI4os9uQ%2BG8%2BtaH7SH1BYV48Lqihoy0eg32Tx8%2BB%2FGcsysZvbhMxgcbtbH6oePACOn0VoM1KXMek5bV%2BzgR%2BMfhOFfUgENBV10cnLttOMZPURHVZOyya2tLQd3sIywnN8pISWXYoiTv%2Buo66vkGbc4uXIbmQHJFDAFI0k8n%2Fya%2BDxcwfqd9pc1cFYT5gfCZr2C21rVNeBr9WsJtlgPhWXI1USiYEpwgtdiVJRpAVLIr2Djo29dZ18jtTUOkI%2FMwRF1UdgjW5ag9c5dpZDazIjwJcxN6wjw5p1HW63ne0wO9AjELRxosc378k9TRfTy4AxgjNcnvSWm%2Bmd3fjUTkKldAkcK%2FbQ0yCqn4Oi6yH%2FapL%2FtNOvnOQX01ywu34A%2B0PSacG7H6crQhW1Q%2FNJr0ICBJxfKbkhCKEAol7e1AmOB06dlpCGCIEpVkFv8le3xkRxIotkOsCMuerM0MeNgTUHBPwoIiNJ8%2Bu14lEpMm%2BLhyA%2BZVPWprPRlLUC7%2BneAM7wfVnr%2FL74P86Kar8sCEmYiMJ1fNl3XnWAoJV6pp%2BY8DARyieTdHJ8gMpy1594CIHaMw5JanzwY6pgHbLigrwgJA%2FGfqq4u%2BidxB3DIuywzIY0yb15C7gGqwQQMorz0IFOK9JyumXs6wR2lKnq7lNOmLdWwEbIxLDZ3ituZNbbaJEzz3Lf9j9zLrk5v1EYMYqzk7PdV4RcW%2Bf4cS6%2FMUN4O%2BJkix0%2FL4nJHU1jNTIThk3cXwLkzi%2BMr2jJumh56fR3c%2BpVXpeFC3Q3WFxVRv6hlrsr9rWzRosxAKIHNsSkwQ&X-Amz-Signature=67db30317b357c9953a38beda58add78eff618f0288ab8f300bc3b260c33e808&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665M5BDTN7%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T082526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCiv4jMxQ%2FAfvvxpqCpNqPgViLhCzqIQnyGwpamtnO6BwIhAN7hEFPeHST7y07CKbgA3M9uDS5BA3uxqT%2FSeI0137cCKv8DCGEQABoMNjM3NDIzMTgzODA1IgzfUinkKrpUXYxOteoq3AMLT836WKziZB9uFpmP%2BUWM5fYqeFpbU4j2WjbuK%2Bi6h95LocCIpdAkOjrgAYKEyHZ%2BtuO0i1TEr%2FFzvZblSo1g3nouD4MHR%2BkXK2AupbGB2olu9ekInh4DjmaB5M8TGsRpF4KGZaFOxPWsuVaHAqg2yWgse%2Fz%2FCH83IoqmNwFWSQme63VTrTlDxGfarzoF6YiaNYzKibSPvSkNH8uUz7z671mNxYvdW%2BBYgPeJrKkslN5jX0U53oxrfryZJiNJ3Uek4DoC7HIm07wBvb4R%2Fh2LSTQIH0EmmRyaBB59FxCkwUEQfOnlY2Uv%2BU8WNHzz%2BfZcbjSgjdaZJPJk1Hy761QNxUUCFT%2B37OyLYP2ycBs3NDVivv8jbEyti32FcXTbklVoH1Qv1CY%2FwjNt2X1EDNnHj9Yt9cq50FlsEMLjV4XrQNwtSuInzzSmWWQl1AjxIunsVJw1b2iV43xqHkIhic1yVHMnz6UQRCn2tOs%2FttAGKZQs18frZbuGz1XDsqoDbRRTGehi2%2BKdaLFELh5GSMO5WEvRkcvuxKywBIiajAPqQTvPfMUYa5waH0Gy2avsiGcUrNRxZCAf70GmX%2Bus2cqtnMHAg64bRi0s5LGS3IthSHuOyKHQFeLQHmuo1zCglafPBjqkAVIC%2BdCWCqvivHRnGGv8M0vseVaPjaiBmlAvyrTbyHx5a0JzZa%2BdC2KiJCYz3tpNHiqkdtycuDAju6CdcqxZwcJQdyoaNX3gAHTv3OEKpqwu8iqERbWN%2BB3vLAY90O5EvWWFOZmKMKpru0EcWE%2BcXPyvAXhXXRdcsK4NkI2MeNNaOleBcA7BiNUdY9svEk0K9QMTYfOHW9w1YaoOd2uOwKsuBA9y&X-Amz-Signature=321fe9ad07b41778b7e5a5e83d548f69aca06b13306757392c0ffd7609d3fb86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMVIHQLP%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T082526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAaxh1ySFkh00w4FXBUSpUnYhCyEV8F9JNnNCVcoYcbFAiEA8%2FcKJ4lYHqwAN%2B7p3yny5FJORpHSvqGa%2BYBDeJEr7FUq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDHaGeAB70UHcScWVrCrcA0Ax5NvpkCiZGEpVWHGKcqmZ95pBZr%2FdRjeSFAaCMbgENaCOpzH47HAy3SNffjoAJQkjKTPBnylwWFKmWun0vw%2BsImr4yYMxZTMu1s%2BN4X62Daqkb7zu%2BJzPOu2ydHLfQxe8FxWKu90g60SQOK7gFpTYscKY4FX2%2BMDGnObukb0YFYiNLnhIcL%2F%2Bx%2B4t9fGUhd6V9TFuZyfR%2BQkY%2Bo8ThHC7L8WfATDSo804%2BRPkhUMUvasf%2B%2Fsx4rCckvzT7vRjDb0kgWxBa4UWTYv%2BV%2BPGNdPcX%2BUW0Mtbbq%2BNZcdeMaGuHODinqsNA1nVV%2FgyNgPn%2F05pqLVINZZetZq29JP9RnSSvjIfr5rJEQL8MFo9AYW%2BIV%2FzRy%2BgWp1gvGIQfopmwD%2BlwmdgJUohqnLKW7Nq80kFTuTzPW8F6UzccxzD5nDN9fsjkuum2OhBq654bDt9HF0LWzKndhWjKXVO12LC2p2xJ7Njw1APaeYzMX%2Fq1ij8qvPLzxeLBRnjyVw8K83uYkHi99FW8c8COyQb8HAGyq6g3DCCsOGsAlyCanh89kl1233mL%2B9kUuxbR9QhGw6RlU6B1%2B6ZWJgLC4DiNLe4mkulOaCvbTRwZ5fJ9SJXUK0%2F859NuUPOgTU%2BPzR9MICYp88GOqUBI3hWdogF9mfrOlc%2BRvVXZeyJmamlk22R3h0UfMqb0SoO4JC3oiEuwNjkP4ALo7wXZt7ep70HeKYB12DFz9bu42bA66JH4165iI%2BQ2ja4EIWuRsb5qjxCpXhoOuhL7nqI5KFtjWz2%2BnjWAMs%2Bkarrzf5rvXT8usv64ZUsFzsaDbz9%2BdN06BByUeparDhD3Z933932idMijVo1QI%2B5I5jnNNmOriBX&X-Amz-Signature=dba841ade346b5090db8a9d0e6acc86409195292be354465aa10e3b34ae21ded&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SICXNC22%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T082527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDD3dhHKDUQB07Zx3CM%2BE2JN3tVXxKCzylLX51pcxgPEAIhAM9sohcKgqX1vO16SfQkYTq4RoB0VLkiqSb9d6MEDTuKKv8DCGEQABoMNjM3NDIzMTgzODA1IgwZqLMNZ6%2Fnh59VT5gq3AN%2B%2BqimlsbePrUwINLMgcLzaQufPBcmUEE71warZFlW74Vo8mC1vj0%2FMZDpHJn3caEIBtuiSrqsT3CqOXIxGyOurYcb7jQrkfsnqyLVO1U3F4cuJy6z202nrtWq91FT%2F9OQ4I2%2F0DBMqaf%2FrBznzKlry7o%2FPY2NuMJQng5DQrhVfEYxA4DyFpXW8KRhoqk%2B%2FiSe94ubWXz%2FqFn1LgRIisHS%2BPue8GXuJRe4gLGK8GWqCbIKCf2uN3YDaB9vKA1EhpOwSIDTQyV6soaYVNkxxMU6hflMPqHwFKNW2M4i1uKYCbVrj3PcrQO%2FBwIaT96Wr0mdU3EcMYLfv3UB%2BQZyhkwhY9s9fexJPKzJTMsW9PJZ8qo1GuQPOAAEV3sKfKn%2BOkWZnPbJL5mD%2FkRDV5ax87fHKu0SnZSRH8n87cgd5Xs0Un925oQcMAvJl727d3Mdd1t6gdEvAaXSMBgI40sQ1h3SvyEVZYKwtxOciuUJEUGFe%2F4HfE96e%2BXDcpNpLeoYb7cQVAEFh9fDc2TFsOyZZyP3L6EVXw%2BT1pC%2FJS21ZvAIDJHlNOKufVwLSyiJyRfSh%2F8OJib822FLIu8QdDeIf8Fgr0e2%2B4yEMhOBhxIXiE02j5b72fL%2BR3wLfdgmUjCzlqfPBjqkAfXQ6brHitkB8xh8Eup7KgfPV12Eq45tgOWILg%2FG0dOZ2VQLhnpqKsd%2FBW7f%2BHBvTtiAGkxiC8nD2skt4XEJ8UhpAjzHtVgWOgUrKOGj3zS%2FgnSxuWTxmdll4ZU8WgexqaJKTGZe9GgdgQSimDucC4A%2B%2Bik4yA4eDQLS8IfhmxNboUjszB0roYO0EMjXr0OK4YpRKmoDBgXGUyxBiYY9y5bvXLZO&X-Amz-Signature=95b2c7060298285d398f50c33a4a283e57058a5cc5384bec463ea3a10b72f4ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SICXNC22%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T082527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDD3dhHKDUQB07Zx3CM%2BE2JN3tVXxKCzylLX51pcxgPEAIhAM9sohcKgqX1vO16SfQkYTq4RoB0VLkiqSb9d6MEDTuKKv8DCGEQABoMNjM3NDIzMTgzODA1IgwZqLMNZ6%2Fnh59VT5gq3AN%2B%2BqimlsbePrUwINLMgcLzaQufPBcmUEE71warZFlW74Vo8mC1vj0%2FMZDpHJn3caEIBtuiSrqsT3CqOXIxGyOurYcb7jQrkfsnqyLVO1U3F4cuJy6z202nrtWq91FT%2F9OQ4I2%2F0DBMqaf%2FrBznzKlry7o%2FPY2NuMJQng5DQrhVfEYxA4DyFpXW8KRhoqk%2B%2FiSe94ubWXz%2FqFn1LgRIisHS%2BPue8GXuJRe4gLGK8GWqCbIKCf2uN3YDaB9vKA1EhpOwSIDTQyV6soaYVNkxxMU6hflMPqHwFKNW2M4i1uKYCbVrj3PcrQO%2FBwIaT96Wr0mdU3EcMYLfv3UB%2BQZyhkwhY9s9fexJPKzJTMsW9PJZ8qo1GuQPOAAEV3sKfKn%2BOkWZnPbJL5mD%2FkRDV5ax87fHKu0SnZSRH8n87cgd5Xs0Un925oQcMAvJl727d3Mdd1t6gdEvAaXSMBgI40sQ1h3SvyEVZYKwtxOciuUJEUGFe%2F4HfE96e%2BXDcpNpLeoYb7cQVAEFh9fDc2TFsOyZZyP3L6EVXw%2BT1pC%2FJS21ZvAIDJHlNOKufVwLSyiJyRfSh%2F8OJib822FLIu8QdDeIf8Fgr0e2%2B4yEMhOBhxIXiE02j5b72fL%2BR3wLfdgmUjCzlqfPBjqkAfXQ6brHitkB8xh8Eup7KgfPV12Eq45tgOWILg%2FG0dOZ2VQLhnpqKsd%2FBW7f%2BHBvTtiAGkxiC8nD2skt4XEJ8UhpAjzHtVgWOgUrKOGj3zS%2FgnSxuWTxmdll4ZU8WgexqaJKTGZe9GgdgQSimDucC4A%2B%2Bik4yA4eDQLS8IfhmxNboUjszB0roYO0EMjXr0OK4YpRKmoDBgXGUyxBiYY9y5bvXLZO&X-Amz-Signature=1adb602a0994d3c63501ff9f28462be9fc4b07ef5c5cff832faa2963639474fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UUS5PVU%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T082523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC8aunbvOFFgx5FMK2TejJf5bjrqa58n9DMgydXkgQ2wAiAkUOwgcXsZKGg2SZfpedNegIrKnBSAFBmFLRgOOHYrCCr%2FAwhhEAAaDDYzNzQyMzE4MzgwNSIMPuHpxRYy1v3bjmXhKtwDQ2bK09sqfqv2bYBb40h4V8OF7i5JzsQMy7z464cfZ%2F0cL9Mlp7K%2BFXbt2dQ0qd0%2FuvYa61vgnr0KeB9IrO44BtLJtQgt6wRCA48kATKpw6n1nU0agcnE3FdqXrkZZH6bq6pmilvl%2FyF0EnK%2BskVzcEAg8spjwzl1zTvIZ8gBUfdaWm0h5N5tdPEEEwq%2Fc%2FJeiRSrMzlAbSn5dhunjees3lrzDtk%2FkofNdKznxlaWA7ZBKEl4smxIKI3uZDAxyXkNAongHcbU%2FYndPxB28do8h9fcGatfMtYjopdqHfH5vtCYfb6hjcsYboQgJRqHpVMZO20YMBTjHecfUWQxjTrlz2yf96lDyUH6jrSErrVffsCJeA4wqdv0oyp1H9O5rIxqozSFeHY0oYg3qe73Hhz6dmNH5Y3smLyt50k8UNIQNQyOEB87R7myU22gHkVl%2BKljomZGwjyvGf78ehvWhhxUgCsXKMCyMGkMhQ3T5%2Bsl3f%2Bo25yLC55tGON8fb77fDumtJ1gqyxjpcc%2BG45eo8Jsxemwh%2FtiXX1Ron91A02CMedTQmJDdux5hs4Htq6CFFs8ferEm2iLyS753%2FGXoWdGVSrjFajhGPgRo%2F0vynUYrDOzuriV9k%2BEjjCP%2BYAw35WnzwY6pgHqdLSvS6nhO3CXFmYZOcxNk8I5D0dZdAk%2BhMj9gwF0Cr%2F905bq%2BO3FvA%2FEzihUCBNkP8T079p%2FzG9Hxyy1v8ohFgHsR%2Ba%2ByeeVUv8Eh9nz%2BzsFu9vx3QV400T%2FSdffvvg32gkwsFOQNpK97lRCtcHBcNa8gn8r%2F1xLmaLKr4sVS%2FLiKhDGujS7chntKrHW0EOdMYYkaTy9HHDDhbpUa%2BJCUUAczhyp&X-Amz-Signature=a69cdd3ec1bfe5209155d9ecf55486f103f86da6d39b5172dd6add29bc38cf54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFKNH5IK%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T082529Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD82rDxSD7bgC3x774n7ihCXgV6AmGl1ovilOmRl3KHsAIgMqvqfBjnrXcIlJe%2FfI5Wg4SthQVdSFix4lFX32YCu4cq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDOBG9mjKWUHyKAyaAyrcAxlKdlSepC6sSu6eOBYg931CzeNAiVNEndj9yGIdOHK5RkVoTRbFDA2SsdpIYKzjkExBdYTEKYdDpFAZXcHtLyV%2Bv1vsrv2dXXzPKtjaE1JZoJOCEilaDIoWywElWHCDkfgPP5yE3LVdEKfcy5E1EZNJySp7cp72bR9W%2F7%2B9Gbuzz4xVt9NUiqWy29B7jKK0OM%2BQ1DAZ9Rc0cJRYL%2FzAFGZ6Bd3fY9TGnpsK3W6lQwmzVme8CRhMzFdMGk8R9VaYhyiv7MqWT2fihFq6%2BeyH7ox7vTyKpKisk7%2FrWKiTeWNrhKnLXymAeezOSaVBkBKk0RgS5cXxlcyIE%2Bv4z6zjqXNOTilKWxcSpYzp7JaAaHf4XgxgKKgXelUZtdGmydlNT3nHXcjC2kTa9lCLd3EFeU4cme96o7unBorEKhA2lMNpZaX97LCdAyPhZjTqKpqMfxI5QvVmbISdRG1%2BmD9lyIqsLR8%2F%2F3IqVgkOKCDDC1s3yFvIP2QTVxHyWAmEPHj9yD%2BsBVz4p5R8sc%2Ff%2FQRp7HXRq8wlKNOkhcV3aUmIaOuR9dCdsV46mOkrLrgLd%2BHbvL3DdWdFHry3qFjmwdGWnUoXg06jjcPqYWg3q3mnpK1VDASkIq4I81MshKwBMLOWp88GOqUBJhauCI%2BRFtFfH%2FaZfk2n83k5slSlY7XMvKR1yGhbaXxFFh4BYyF7jqKzg6UlDNwPi5oQFdcEFNwKIxGQLYOyIe7Ckb8i%2BQEaR17B%2Fjy9eDBbLz9HH%2BuOdgmSbBFKTrzLGyBrG%2BSP9hsvpOY5RKNBMVyszo%2BTs3wAnOI255pkHqfrtUBBBY8Rw%2Fokabb%2BUQRxd3j6ofYLZnUJ%2FPh7PNsqrNwZgxfK&X-Amz-Signature=a11f2e9cac34e38889770efebd449284bc93eb66273fa61a3207ae8e38542769&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFKNH5IK%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T082529Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD82rDxSD7bgC3x774n7ihCXgV6AmGl1ovilOmRl3KHsAIgMqvqfBjnrXcIlJe%2FfI5Wg4SthQVdSFix4lFX32YCu4cq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDOBG9mjKWUHyKAyaAyrcAxlKdlSepC6sSu6eOBYg931CzeNAiVNEndj9yGIdOHK5RkVoTRbFDA2SsdpIYKzjkExBdYTEKYdDpFAZXcHtLyV%2Bv1vsrv2dXXzPKtjaE1JZoJOCEilaDIoWywElWHCDkfgPP5yE3LVdEKfcy5E1EZNJySp7cp72bR9W%2F7%2B9Gbuzz4xVt9NUiqWy29B7jKK0OM%2BQ1DAZ9Rc0cJRYL%2FzAFGZ6Bd3fY9TGnpsK3W6lQwmzVme8CRhMzFdMGk8R9VaYhyiv7MqWT2fihFq6%2BeyH7ox7vTyKpKisk7%2FrWKiTeWNrhKnLXymAeezOSaVBkBKk0RgS5cXxlcyIE%2Bv4z6zjqXNOTilKWxcSpYzp7JaAaHf4XgxgKKgXelUZtdGmydlNT3nHXcjC2kTa9lCLd3EFeU4cme96o7unBorEKhA2lMNpZaX97LCdAyPhZjTqKpqMfxI5QvVmbISdRG1%2BmD9lyIqsLR8%2F%2F3IqVgkOKCDDC1s3yFvIP2QTVxHyWAmEPHj9yD%2BsBVz4p5R8sc%2Ff%2FQRp7HXRq8wlKNOkhcV3aUmIaOuR9dCdsV46mOkrLrgLd%2BHbvL3DdWdFHry3qFjmwdGWnUoXg06jjcPqYWg3q3mnpK1VDASkIq4I81MshKwBMLOWp88GOqUBJhauCI%2BRFtFfH%2FaZfk2n83k5slSlY7XMvKR1yGhbaXxFFh4BYyF7jqKzg6UlDNwPi5oQFdcEFNwKIxGQLYOyIe7Ckb8i%2BQEaR17B%2Fjy9eDBbLz9HH%2BuOdgmSbBFKTrzLGyBrG%2BSP9hsvpOY5RKNBMVyszo%2BTs3wAnOI255pkHqfrtUBBBY8Rw%2Fokabb%2BUQRxd3j6ofYLZnUJ%2FPh7PNsqrNwZgxfK&X-Amz-Signature=a11f2e9cac34e38889770efebd449284bc93eb66273fa61a3207ae8e38542769&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVPDYZ7A%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T082529Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFjCOe0TFyOfHM06le9m6jkyX4nElW9l5AvTT67KO9SEAiEAjAvcMTXtXJ%2BCAJdX%2BLllMQRUiEo7uTWSA9a2KZPHeTgq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDFMtxjZR17VRYMb%2FMSrcA5S8xIlR3K6MnibaF3M6MhZ8ik6Zkh5nnoRVioRCAL2Be%2BIArVFa%2BtnZdwG6AqzdXTHLwrVZLuFHtW4RxtEoaslVpxUtGxY%2FsewhonTDJ2aw%2BpxV7SqcbPxj%2B0kHg%2BElagd7SqGVlGi%2FuojbfijGOhy1GUpFuyJQK6QzxMAFYtgna%2BPo1gcUVaN0UEqfgF9E9BFLgvkpXH3COKlDdNrObppzXfaFZ7Egy5AVUORJDbKtBKoKKMmyYriMFP2ehmUQDnglmWEWRVfFFlUHW1dB3XOb%2FaJlCYPqrvxMWBdZ%2BFwu9xR%2BRUnKArWKolqooHBoR%2BeVRNt4KIpJ1zfeKg8zaFm%2Fqzvz%2FQCwyQm9BKdEyAgQxPKYawpSvt7yreKcuM%2BBsooBm5807Hk7Ppa8NTNJm5uNXOfppIEk%2BNr2yHr7pG7ZB8ZdqjJacG%2FimwWHb64IZ%2FWVVISOIE3dtcpFd4wU6aPaVd2RD2eYs2IuvMkNMRwdlRjMvqzBTIn75VktEz2sRnLiHQtADFzSZoXp4LQq%2BRw5jujSRFTEgx8ABAEweYFh%2Bs%2B7UFJ0ST%2FDnHaNMBkwidbjaVxbn9xn3elF6CWpxLwoX8HG3Hrp9qzAwsZs1c6eKNlbG5eAuc49wgd%2FMKeVp88GOqUBtP8HU8hP4UGIIG83Ku0%2Fo5z8GcSEOWLOyUi3R9tu6FbxjlYT8kUlqJBDKghh%2BykGpEvJaHOLYI8lPh7bnQrDS90gztr%2B1NM2ngfdOJnRv1w%2FfTBGt5k4Dmno2tyuFTry75gRW1Mpj0oxAVPzoVySjprK59vP%2FMKfHTtCbsUlMEQF2wYUVHvbTIr1gL592E3rHdoRbYFqikU0Qzs5SxOpW%2BCRs61f&X-Amz-Signature=9d056af5fbb018a5dfa7ae2cae61d6a52f4db55f9e0e03d315d7d3d018d35cdb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

