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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Y6PEMHC%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T195021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQCH0a%2BCs7oj2BaM52TkxyoKfysVXK7ImSRwJ80zInIeFAIhANtHcCv7T4DYpSjZ0sakS2qzJyMrsy2sXF%2F5N32kvt%2FYKv8DCCQQABoMNjM3NDIzMTgzODA1IgzR8%2FOAkdCU3AFJMb0q3AOhiUiX8VYZjZsDBAJHe%2BaZSWvvuwUgmJDb0xWdzWgPetu4u4OLS2iFMpfw2hd2%2FIwB09vxAWi64S9PvQCFKs2F1b%2BngNGCpVDy1G%2F21eYrbBF90W3UskQlWySm1bW1OBn2L%2F%2BUcL5P1uFIR78%2B%2BXtj2Fq91lVahdke%2BIeRkIFTchcZzNzgFpSHVIEHOB0wsa7eMYcfl%2B%2FQXssdB5bVMinXY%2Br8uQp3JbS%2Fp4ztqpxbOc%2BLuACMbiKbh8F3Doe%2B96yoeEFLFff2f9fF4cKhuTo1c%2B2ABdtL1d7hFTQimmByBfQq4MwL8eR6afUWOMK5bhg0xfJetmiGHk2IuLuXCLNiSmprxn4o4S2haZxWUNdMvGf6bSLbFV8fKWF3IiNroCmOENqDCdkTvIWKuh5fQlbu7uLCqMTcpKZpFIbUmDZnyxCXNGi2YrAkWNLm3Csd5zYABu%2F1w8E2hXfN1%2BfFWXTbies8Vj5LU5C7Xi%2FXOE8M6beY6hgmWjLOjFoIQxw%2BenMIQO6fejYV3TdQtVqW0pIzJQl0R7mu47XmApbd%2BDeZCFbpGnKfKNPTSXr%2FKWXNjHmX8IhXAdmfG%2FbgrpIAh3GeVSWA2%2FppYcJc5ad6cQwETJvPNEwJ9fjgutsHfTCR5ZnPBjqkAUe%2BySVBtvT6har0sk4IpyhdRItmfWcMWceqZUWP9McV4kKshsVKClFolW%2B%2BgxKBDbXv30m9GM%2BlDOapH9aLrzGn9kp86a%2Fo3YqMeibNcOYqHKY%2FAGyx5kXKld71UU82IZ%2B89Fu%2BpDVJXbxlS8e9X8vp7iLDY2HqRv86awSq5fdoY7jySlK2DuqyLeABW%2BEqE0OUx%2FqvOT9RpA5cIGW2dCrB3QyE&X-Amz-Signature=3109b68651f645190312adf1dcdf76de3dee839354cbc7248aa92dec823124d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Y6PEMHC%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T195021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQCH0a%2BCs7oj2BaM52TkxyoKfysVXK7ImSRwJ80zInIeFAIhANtHcCv7T4DYpSjZ0sakS2qzJyMrsy2sXF%2F5N32kvt%2FYKv8DCCQQABoMNjM3NDIzMTgzODA1IgzR8%2FOAkdCU3AFJMb0q3AOhiUiX8VYZjZsDBAJHe%2BaZSWvvuwUgmJDb0xWdzWgPetu4u4OLS2iFMpfw2hd2%2FIwB09vxAWi64S9PvQCFKs2F1b%2BngNGCpVDy1G%2F21eYrbBF90W3UskQlWySm1bW1OBn2L%2F%2BUcL5P1uFIR78%2B%2BXtj2Fq91lVahdke%2BIeRkIFTchcZzNzgFpSHVIEHOB0wsa7eMYcfl%2B%2FQXssdB5bVMinXY%2Br8uQp3JbS%2Fp4ztqpxbOc%2BLuACMbiKbh8F3Doe%2B96yoeEFLFff2f9fF4cKhuTo1c%2B2ABdtL1d7hFTQimmByBfQq4MwL8eR6afUWOMK5bhg0xfJetmiGHk2IuLuXCLNiSmprxn4o4S2haZxWUNdMvGf6bSLbFV8fKWF3IiNroCmOENqDCdkTvIWKuh5fQlbu7uLCqMTcpKZpFIbUmDZnyxCXNGi2YrAkWNLm3Csd5zYABu%2F1w8E2hXfN1%2BfFWXTbies8Vj5LU5C7Xi%2FXOE8M6beY6hgmWjLOjFoIQxw%2BenMIQO6fejYV3TdQtVqW0pIzJQl0R7mu47XmApbd%2BDeZCFbpGnKfKNPTSXr%2FKWXNjHmX8IhXAdmfG%2FbgrpIAh3GeVSWA2%2FppYcJc5ad6cQwETJvPNEwJ9fjgutsHfTCR5ZnPBjqkAUe%2BySVBtvT6har0sk4IpyhdRItmfWcMWceqZUWP9McV4kKshsVKClFolW%2B%2BgxKBDbXv30m9GM%2BlDOapH9aLrzGn9kp86a%2Fo3YqMeibNcOYqHKY%2FAGyx5kXKld71UU82IZ%2B89Fu%2BpDVJXbxlS8e9X8vp7iLDY2HqRv86awSq5fdoY7jySlK2DuqyLeABW%2BEqE0OUx%2FqvOT9RpA5cIGW2dCrB3QyE&X-Amz-Signature=3109b68651f645190312adf1dcdf76de3dee839354cbc7248aa92dec823124d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T42J7KWB%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T195021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCICouK6DBTWkcWywirmSKEe%2F0wmCu3xD8EV4gW0OoBmfwAiEAm2U3ge%2Fb4qKvtQjwLS80ORZmJsGLD0ez4C4oIYFGtfgq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDNbLjohL8KOYXSvk%2BircA2Iuu6bn76aPGFRJsyO3m%2Fc1iYfvT%2FR6Bd4dUC41%2BJ1f2naO214WMP3jNMpuyo0wPxTZJZXmwvzew5wbsTGxwUEDmg5Zqxl0ZVuIc0%2BgsdDXB8PP%2BGqqfam3knJmngjR6Svd%2Bns7WhLbf7CPIdnssk1%2BmdwsechY2G6EAWaB5T1NUqGRHreWk3dC44ZRC9NhDSNOOPA0GqPi6yqUy%2Fe5WwOUzbIscb%2FWbQ1r3cLWp5xKPANLCGqpZ4kJIuo3TDK0RgjFAExcaoPDSFu%2FYmmQFAYi3WObjR0eUnmvsMWfcslVFS3pdOPAb9ngUsREVANunmsca1QueDMjjvnHdq4zgEwtDDoP7kaXPso93UbK4u%2BxOLNaXh7zaZEznBxQGvwy5mQ0C6XNIMoZg0nso%2F1JPTuIjI0oJ6oH3R4yAoDmKwHTqEDP33hJQoK6KCj%2FyQvnvVOiMkoi5FvDA2A6w0z95rVQoOEnwoV4Yu5suu%2BgQ27JPFlY%2FfuImaPb2hi8jrBrZjhJSdrO5f200LOYqMT6jovM4EjIZjFxHKly1UoqmIW0gTSUCATo6MI25qRaahk6s4bylzWKidWHAUXXniGmmeAYfLFHheSgmt91jkP9SC48lR1VAsXSRn09tOpxMKHkmc8GOqUBN298i7x9ifqNLFADnISo%2FLcOV2i4wIhkxPJqj87VRaGL7hm86HRHr6Ij23D5LKmVPA6cljOsO%2BS2Emr8bLNjel9P%2F1js22XLyOtwOkxC83RSGY1Y19%2Flnl2ZPGgKACmzC802Rf52okcTPGqosIpxMvPqM%2FsWdTDWzxUJrAFxe7lccNj7oVaCG9G7wzKWvTacBwXeHn4a6YptWkcdjWIyprmX8aZ7&X-Amz-Signature=857634c2bf633bfc599eed20293daafbade5168e2c04e7c13e6d534bc4bdc8e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLSRPN6E%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T195022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQDxJosJpvZIAlElOnTLtM2%2Fti1CYK4Yq%2FaTJGL01XUzYgIhAMLjtOsbnLQyEkRGZWWleGBoCq%2FtMxf95eQAG9RFqiJWKv8DCCQQABoMNjM3NDIzMTgzODA1Igwbz8oR%2BQzUJw97Znkq3AO72yDTQZTK25uBOQ16Kiku%2Fbwoz773o7C3uHCpWeICx9JreSVRxQ2iiDml1%2BBW5jBqy26xtRrQVhXvTEK3SmiWJg%2B5fIFXsq%2FYOingHGthQgl9blUynqeeGj2WtYbynh7b93QAIfALjY6GhGO4iuY3neyq4fw3Irmf7PVNzMItFpz7%2BqiGEbgtN9GqNBU95v0GGosdxvzBnlrnUB5n7ces81D%2ByZ869i5H7RUyLd0z0d%2BlaO7G%2FpPrFiYbZy%2F1KDjvTIC17a264UjvfnXlHvIS8swhTC5zvpFcHWX76K7q1Wasi2oJFqe%2F9W2az6ND%2BAhRxaUQMR6vk%2F0J79cMq6Az5TEF5F3EZAAm60el8PLnfNhrzZzRllSs4pOB0TrhPcRLdqSwaJoZuSTB72fj60mASLSPWoQP6CQJaRW%2FA6DNomqDWtPcmZGbhoX%2Bd7WQuhXRFda3hzi7IHAiaB0KE0VGfn20hZEB4kXcKvAg%2BVS%2FLstlHTmN930vJVBsPWjuETQse9JBRjizBzlJuFNOtMIwqXgRaDSksftlKf108o%2FfutEiQgN%2FCd0KapjnfU7Hhi6rupfNhsR78VzeR4%2FTTs%2BpMNCzPaJsHkrd8hSJXdR0c1fFtGQcoNUw7K%2B6CDCA5JnPBjqkAW49bVXQIRiOE6GfygFO3b6tE0IXWTGSWHc1Luo30eJPcpnOpNAJi10wBrzOo7kd3yKX%2B32WxDPphZ9g26w6sB2XFbun0b5LkzLgd7lXkiLcfUgKbGEA5q24%2BDb3cNbmKOlBdnn5yQepF7hH%2BjkfmBiXTcGv6kbt%2BnAuNvIk4wYu7a1YQaOBF4WJoqBK1Yd8AqAZNYQAN9ae9eP2Au%2FtkC8Kr%2FrZ&X-Amz-Signature=686366b0666c3329b55aeb670b10af8a0fe7c5ee1c9878e9a6e0cb871f11649b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLSRPN6E%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T195022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQDxJosJpvZIAlElOnTLtM2%2Fti1CYK4Yq%2FaTJGL01XUzYgIhAMLjtOsbnLQyEkRGZWWleGBoCq%2FtMxf95eQAG9RFqiJWKv8DCCQQABoMNjM3NDIzMTgzODA1Igwbz8oR%2BQzUJw97Znkq3AO72yDTQZTK25uBOQ16Kiku%2Fbwoz773o7C3uHCpWeICx9JreSVRxQ2iiDml1%2BBW5jBqy26xtRrQVhXvTEK3SmiWJg%2B5fIFXsq%2FYOingHGthQgl9blUynqeeGj2WtYbynh7b93QAIfALjY6GhGO4iuY3neyq4fw3Irmf7PVNzMItFpz7%2BqiGEbgtN9GqNBU95v0GGosdxvzBnlrnUB5n7ces81D%2ByZ869i5H7RUyLd0z0d%2BlaO7G%2FpPrFiYbZy%2F1KDjvTIC17a264UjvfnXlHvIS8swhTC5zvpFcHWX76K7q1Wasi2oJFqe%2F9W2az6ND%2BAhRxaUQMR6vk%2F0J79cMq6Az5TEF5F3EZAAm60el8PLnfNhrzZzRllSs4pOB0TrhPcRLdqSwaJoZuSTB72fj60mASLSPWoQP6CQJaRW%2FA6DNomqDWtPcmZGbhoX%2Bd7WQuhXRFda3hzi7IHAiaB0KE0VGfn20hZEB4kXcKvAg%2BVS%2FLstlHTmN930vJVBsPWjuETQse9JBRjizBzlJuFNOtMIwqXgRaDSksftlKf108o%2FfutEiQgN%2FCd0KapjnfU7Hhi6rupfNhsR78VzeR4%2FTTs%2BpMNCzPaJsHkrd8hSJXdR0c1fFtGQcoNUw7K%2B6CDCA5JnPBjqkAW49bVXQIRiOE6GfygFO3b6tE0IXWTGSWHc1Luo30eJPcpnOpNAJi10wBrzOo7kd3yKX%2B32WxDPphZ9g26w6sB2XFbun0b5LkzLgd7lXkiLcfUgKbGEA5q24%2BDb3cNbmKOlBdnn5yQepF7hH%2BjkfmBiXTcGv6kbt%2BnAuNvIk4wYu7a1YQaOBF4WJoqBK1Yd8AqAZNYQAN9ae9eP2Au%2FtkC8Kr%2FrZ&X-Amz-Signature=4b36d1392e5dca8ec3363bfcbb46fa9eb154dc27c11daf1f592da0542e4f3231&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRX4KGBO%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T195022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIGePF3%2BdQ%2BnRHADCPDWWqDJiOuRDTmg5bmaz4NT%2Ba6u1AiEAqASW2qpXP1LyDXOgGdYxvenzcem0cTJrs8v%2F2TNqfz8q%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDNXOPTILsqU3UH3bvircAzAyXEGq4MeSSTzIrfyh2iw2l3gbpCD6Ggw6Z0eoJw5fDcEV%2BKR%2BA%2BycJUEql5UIkPN%2Ff1xeD2chTnkgUBfBlA5X4bC8lvcqWyqTRqPFndLNBl0nsfl7eHGFR9igaSLUFpHqC26gavcBvjln74UPtq6EcCPzUFQahEorSsyqxypf3Jdw5hzRAWSnnnnnM9JyyMFSaQ9I3RQjLK3weKgo6SIC%2FK%2FeCxy9lFHk7mTLTWcSRXRuNPJCRq7GK8%2Fc9LWO6KLz54tW%2FOqiTiU7OsuBozUoW%2BqR3Clp9H1PjvhV6R73A%2FsmmMUGU%2FZqmbHx0gkRLyGVNKtBuNKNvZJ1j%2BhNrrk6QFDak%2BQs4KNSH3MgZH7S8xtFCrseaNyjg85E2Ieljnkt%2B4TFoLlzkkxI%2Br9Xbie%2BYnDfXA1p8PnTDLtJ%2FoFipLf9emwqIU7pqv3KjEcIYzhTrYM8j8jW9AQyzMKay15%2BNccS4EJS47pvmP60X2%2BKhrhzkMXuGZk0iaRSzZqwK4HY8jpuc78S4qts6ZPRjDYzIp104dXgrx5h8NA6ESMxyI2z5nXKNRODX7hVh%2BhxiHpygfPn18u%2FuMy4Ty%2Bf%2BXnYtq897dfe9dMPx%2Bm8%2F%2BQmxle44esFkkPjbldQMKrlmc8GOqUB8veIqkMmor15MQLFdGv1FQN3Avkt9t5qDONke%2Fm72T6sw%2Bx8z4ZNEfymZB%2FmY%2BMOcYYiDglbMC8xvypmmjyyJT4EbjOMzBBTiRFyBi4P9%2BN1Eo0FGtASYwj1U7ywmnQZO9FzctBSlvsR%2FRupt%2Bo5VNcrCVY%2BOtAZ2%2FeNbN%2BDhQzxmE5zpW0jEVqYJC9SmetvAWBagxkjwAqKpeU2XCv%2Bzcy13YlA&X-Amz-Signature=537f08f3a571f0a228677cd9d8042e06f98370ff7cbf44cb7b092bee08343825&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XCLC7BD%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T195022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQCuI8IGQRKJBmdUXuvcdHxSRBJTMzG%2BpvYZKKCNZYXpMwIgXe22m%2B0DHw%2FzPw%2Bi7zdAi6KnGgIyLGhgtti0vW7vXHoq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDA22mIcICXpnUiUpWSrcA9aRDZA2Vw%2FIO%2BCvrXVlHnWVzubkGIr5fH4ZGANnnjtVLU6FEqAsO7GX4%2Bz9m8bjMaf6NmjfWk%2BdKMsWzxzc8qRJYq%2BTVrzfUJXOgaRQ9fMMa4zy%2BX04UQQ6qkkPmFNuk80EJZWC4vrxI%2BYSZv1W1uBF%2BzEMPHlvHg4ziKMwvyz72X8gQpS%2FvP8OzVYHxeGwAiFOkDnQhnn7qgkgt1oEuDYc3QKqJGU3TAYdN6p3ZVCjV2n%2FP9QprOsWHq6EYmJ8WjjwMG47MBwUz8SCEE8PQYe%2FT6tTkPuhx7TvqZJxaUhYX%2F%2FD1wl3GtJVCDs7j41m5uLq7LgmHGPZe%2FxR1BrUXotEaC7Za0N7ULWGAjjLgEClSnQ0d53mwq%2BMYsz39tGeY1dDddKbnTeg%2Bb2amgGkGo0wGQ2DJRezRShtlmJC7e10azzSmgPuIF2k%2Fn5HUcpU9ElaVEpwzEWQ4qIGo19pxs1XnLck4svTE1jAoYI53dstopYFWd6Z5j%2FJU7zkGy%2B4KR0NcfWmfnesuFsfDY%2B8NgM6EmTC90gPjup4%2B7TOQNNptssXwqts1xYdluXO8cjIhRAuILiiCWmdL4Xxw%2B1uGhejk78Bbn8frZhz9Ddh%2BwejP98sD%2Buhqc79GxstMM%2Fjmc8GOqUB%2BjOtt00%2FtQ5lNDAshjGeDZqLmgGl0BYXVK3XNaSQTRUtrJ3ZsshvrYovqgkiNUh1q8jpFQAW42mZAK84s2t7bx%2FhtXFAC8tEe79svwZKnzIeWFYnOBeOVLyeB%2BU%2BtnpFezmiS%2B%2F%2BLexOhwYoLZ5yCGllRis%2BrIO6PWbr9nW1DtbxmT%2FH0pUzSPFzpl%2FJ2YGBVX6Kd70fX7g9284mClBCmqlj7qcO&X-Amz-Signature=f740ca43840ef3ff5723283e17c844fdd654df622f0b1e541436e4e6a170ddc0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRYYSZRT%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T195023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQDZCy5dHt6Gzzr9YJZUyxSdWTmpS32kczVEv35FsjmGVgIgXv8P5pRx2Q28xTKhdm38sZpKNflpj7WqTa5zoHJ34lEq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDD9ZvfKzSMZ%2BtrTy9CrcA%2Fw4OKhpvio%2F2jV%2FbZWbViah2%2FsF8eaAIF6bsER4NF2TlM%2BeVIFg3amZvZqCvE4NeVvHI0qjn3nVlu1vPLDzH%2B9B4vslrQQlX8GT3v3fdrHlMC7x90A2BKb%2FXHBlqR9dNPP7Dogrx%2BbLQFN%2BJBfVmlDvg%2BpEtAarTzcZ%2B2LuzNokH8LmGzGGRk%2BIaFO7Mj5sMIovRpJk4i1BorKP44R0z2YRUJRu1fQwt5ADB1NaDm2ng5f3gko0Iv0XOPPYHLuE0DOG%2BUr1R8cmKV2I5UG6pGpGJq%2BSJc4n%2BLDp7Et2PyNG7fKgFRegEXIxPgpcXsDfpcrmrIgGHMGttSW%2FDMcyta90ToO2RrpICCt2hEhxspSIFh1tBnyxvlEbyiSqNK23reuWocJv2P8RZeYQ4CL%2Be%2F7qIXCIzzARtfacAXoP%2FUAzN9NCDZEnAt0npoBZjDG9%2Bjcz%2FFyhA%2BaGhUJXwxWddi8GZifQ%2BjvrrFLGGgxel6i3Zjiwr%2BFVKPatMmTY8ajvsQHSDf5WbXH9r5FHIuiXGW9td2NmGioGB4y%2F5sx39%2FroXdcyerfxdlnse%2BDUAlIblNujHr%2FUEr44DOp1mZVOWcM5gUxr6H024YlWXHzaLpMCaGngyU61SMa4qwXuMN3mmc8GOqUBKSKUeXMjAKHRsx29rDYYfarNQesUVak0bvSN%2B%2BQkYYZrudF23AtuXwrqCWhPpGUuXmZC6rhL7SlFBLUnWGJ6w3g7J5vykuYf7Z3SgZih30%2BVyCFLYq8jV5PlFs01zsipCXDg341%2FueCSY72ELNma5Vi993CT%2BYPLMsxBhiCiJwpGXmUMpFBjmFiJlmDk2poZRuH36eL2B4YW9DHKqROtVEPCUxgd&X-Amz-Signature=16ddf2e8417cbe979bf669c8f2f808f37ecb902bd7b0fba4efb795da0cadd0ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6HPQCPN%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T195023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQChoPfu5ehPcDDMHEj7a9nk3thXVwU7V8X3IanVX%2Fco3QIhAJFQ75Z4nESWD7J7XRH8O4UL4JsrypD%2FkW2E0aJDfcnEKv8DCCQQABoMNjM3NDIzMTgzODA1Igwte3R6ayT2oZD5TTcq3APZmiPSmnBCHkEKT1EtcGbUh%2Fyz7IQwsOBL%2Bzr24Ra%2BHI26WSy%2BlAMVkUvq6ZodM3sRw8kH6zV%2Fhs8qxhYZIm8oLprBjBGCZZFXQ7JhgbOnRdFt%2FD%2FcedfAnA09ibSAXrTFaIpZgJlMZZYzCONZhi80tjOSZ3POrFxIq8J5U68DmSLe%2BMnNo5fUzsjr7fqYmzjrJU5BlmbKhGvi4ctCmkgS%2F%2BIBN80Ir0HZ%2BOWmATd%2BKYx1eUQVAMQxRrgMI6tq%2FDHetEtzR7ePwgxyb%2F8HTtalIr6gwH45yW80AFyv8KZjUNfYaBFRy4TRvkWmslseAVIii8BkOr4RUiUO2y%2FPsqWZAKFIdUkhQOLRe%2FVozNtJW6Hg%2FrhNStWxCHwgP%2Fw2mapqsNrezWBHsy2agShlanWrsLqCF527LFfPM%2B1F6ecPEq1LydMvEI2a6itKhzVCfO9%2BGWGJC8ExP4IR3Ax6wVHUEtsJU4TUhI3cRAwqUbudeNPJsDBJgOx8GdyX18HcFcA%2FjjpuYRmVCA7UwSsS2CPBlGnZ%2BZV8BcjHbviBtdNtnfDApac%2FaZbSUwvMzJxV9zGRQViXn54UR35E%2FpSEncqMy6vdTPnNRPwhXRRhdWwLGy0SpV71Dl6JH5V8kDDU5JnPBjqkAUqOkdaA48hciKz7BR8KfDqDBW9KmLrvT4mG3tyqricspEonEbSDH7FjJHeQI2ANSed%2FV6FaBjGIAQGLaERWPReaJSr6poZp0igfaMiimpCs8yKx25GgYAfHTLkCHYQbLzSKK5sUnhksXtqcG01WTOYImjbsOcffzmCENabxAglJs9iSzJ7XvxmQaOgteZysoUVcm2ewLZ%2FIsZnctclTXremJElA&X-Amz-Signature=e117f2446d81ce88edee339cfdd1b1a8731a59d1df1f40d59e888dec4d6426a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6HPQCPN%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T195023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQChoPfu5ehPcDDMHEj7a9nk3thXVwU7V8X3IanVX%2Fco3QIhAJFQ75Z4nESWD7J7XRH8O4UL4JsrypD%2FkW2E0aJDfcnEKv8DCCQQABoMNjM3NDIzMTgzODA1Igwte3R6ayT2oZD5TTcq3APZmiPSmnBCHkEKT1EtcGbUh%2Fyz7IQwsOBL%2Bzr24Ra%2BHI26WSy%2BlAMVkUvq6ZodM3sRw8kH6zV%2Fhs8qxhYZIm8oLprBjBGCZZFXQ7JhgbOnRdFt%2FD%2FcedfAnA09ibSAXrTFaIpZgJlMZZYzCONZhi80tjOSZ3POrFxIq8J5U68DmSLe%2BMnNo5fUzsjr7fqYmzjrJU5BlmbKhGvi4ctCmkgS%2F%2BIBN80Ir0HZ%2BOWmATd%2BKYx1eUQVAMQxRrgMI6tq%2FDHetEtzR7ePwgxyb%2F8HTtalIr6gwH45yW80AFyv8KZjUNfYaBFRy4TRvkWmslseAVIii8BkOr4RUiUO2y%2FPsqWZAKFIdUkhQOLRe%2FVozNtJW6Hg%2FrhNStWxCHwgP%2Fw2mapqsNrezWBHsy2agShlanWrsLqCF527LFfPM%2B1F6ecPEq1LydMvEI2a6itKhzVCfO9%2BGWGJC8ExP4IR3Ax6wVHUEtsJU4TUhI3cRAwqUbudeNPJsDBJgOx8GdyX18HcFcA%2FjjpuYRmVCA7UwSsS2CPBlGnZ%2BZV8BcjHbviBtdNtnfDApac%2FaZbSUwvMzJxV9zGRQViXn54UR35E%2FpSEncqMy6vdTPnNRPwhXRRhdWwLGy0SpV71Dl6JH5V8kDDU5JnPBjqkAUqOkdaA48hciKz7BR8KfDqDBW9KmLrvT4mG3tyqricspEonEbSDH7FjJHeQI2ANSed%2FV6FaBjGIAQGLaERWPReaJSr6poZp0igfaMiimpCs8yKx25GgYAfHTLkCHYQbLzSKK5sUnhksXtqcG01WTOYImjbsOcffzmCENabxAglJs9iSzJ7XvxmQaOgteZysoUVcm2ewLZ%2FIsZnctclTXremJElA&X-Amz-Signature=338593a6f1f77a52c7fef85783c3109ecb50a054b933b0494352dbd772bb8e87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTTUI2J2%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T195020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQCG8lkiiQ9yKTXMwSEBbxMvlD4qkg0z4p19F1MilQuEFwIhAKnGiywO3ZHLGOoGEWtoS25dClgGrJasFCGsF8CVUOMRKv8DCCQQABoMNjM3NDIzMTgzODA1IgxB7L2g%2BIy6N790jkkq3AMNDQJ13DJhBHjgFneoyIced64w0%2Bgjf2%2B%2FmfDcRpcTxWoy23quV9J2divRCX4b4AdOEpI3Mkt1tZA65SRGlzmyrYXwRBpy1R9Gp8M7isU0VG1wG%2FsMQW%2FTez0xT76GIP%2Bk83RMt7%2FZnkcuprpgNhnhaNETMWXVLaJKOzIYjlQxG3dKFOeqPCeXgP9Lys0yM9mkbul%2B%2FpjXmjglW4bGqtWt00bjNExjqmtQp%2BnG9L8kTSmffyDZIE%2BybsjcRr2%2FEzYsmlNnn%2FJMXx%2FWenN5eY0F%2FZONOBb1ojKT6jsiUBzAD0M0Ismqba3k5uv6aHQrpUculOiogLLdkiSZcxiPQi5fEhQwAN%2FOPJEEH8w8mVyjr0KA6GPMQr7ZoG45E1i3umg8KE185A686Q9fjhj4uUDUny4T4tW0DeQFAPvGw2mLertmXd1ZkN1LpuSffEFbOkB7lDKUiU6AXyY4yYQrTPtF%2FPcGYKCEEq1zR%2Fk0wu77thTsnIGCTsfVCfnovfjBKVGoBAlWIDPtlpNJJRSdG1uQKT0WVRiSZYO%2FnSJB6TGeSDE1fbLSUgD%2BNA7Cl27WbCgbl6L7%2FEYVps9DFituUhJWO322p6Kfc8%2FhpAg293V4cVTsxh%2FDXIfnDkCjyTCa5JnPBjqkAUktXLWl42e96zVOov7Sc6z4XPFttGzKoho0d45A4D%2BhPz4YHAClNzTesqOaGTcOlteGJzgt7wEcjkUCRRAJDkKN8PAJQ4AYf9FpTvPZXYz6c4EN5eT9ADcJhk%2F1ue8rl5asIJn0%2F1414K1kyRmagSZALQSf4XjnHiG4YEyirD4i%2FN5lyRpGKOvHklge3Gx9T4%2FJgtXB3auw7S2nrPfu2v%2FBD4Dd&X-Amz-Signature=37ec27fb9872b386e7b931359b1fc79abf7d5d2edfd448cd3d45aa1309989e81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQPGGQ32%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T195024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQCePR%2F5JbOJOoHRhzsgf3asMmpfpdEpBin4k5n7v%2B2wPQIgEtrqToTpc4TF2hd7uplp%2FlyHvm2Us2YkHk73RDTJuNIq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDD9wZkU6N7x5jFrtuCrcA%2FTqDw2rwA5hyahgUEG74gwpA15rWkgDxA9Z8BXvJwCEmw%2Fju8ycLYNvejFBNMyv2tktqrK0G%2FRtGehAQGak%2F%2F5%2B9Al35QXFSWbucfr1Q6jzRIUN2txxhvzhrNlx7pGpdF3%2BOBvkHGnbH7wcLc97Nwm%2B2XaDNQdx85w%2BGc2Pz4q8pqMpeKzwBG8FLbg9q%2F6%2B%2BocqdyXNhA1MM5MjSEWQaoo%2FxAf%2F5uJvr41t6%2BJk2KOf%2FhjOw9eJUwCTj6HLuFteuCNtji2FbGxBI1%2B7bcPikbi9qI3NyyxPpD%2F9VmPk51VY%2BaHsrMFsrxS%2F16gdtNXrkdHmiRIYM7R4MG1r5s4DI1Cj7K%2Blppnr2nVjkqKKk%2FLXczOM92jVzlcNiXWCVTUO11GSDsSKiHPGsG6WyzuCOWBImsekxzOklA4Ilheumm8pFj1sX%2FCYOIE6yu%2BSFyp%2F6vOefX3uo1hiZsXnUL2sb5rXPQdOzds6v%2BpLT4%2FkIFhPr1bbFgC%2BTAjjV9nFho9nBafX4%2BPSrm9EPH1ij%2B1y2TK2u%2BRwtP8Vn6y%2BbxKpKInN3V4zOzgbz8EIW06utffBiKB86Qn9KDLEYbfQE6YY1TvcPtUpWscd666IbpbpTBiAJTnrxsUVRKlP0lZHMMPlmc8GOqUBypp3LIwaKEzUazL4FxBw%2F5r3jeVkvQLx1KMmnCihipk0QLLbjX4pJW9Ml9m12cAJh6Xg0%2BMyZ%2FWXrvAeMD4g7WUPDBjsRpmjzYqc0yHtnJYgE5X3YY6G74G7aDYJEmjbpMG7URItg4rZAz%2FVWHEcnQbG7XO3A1y0P8NwWKKOqmyJlOYXnndstfjf8E7%2F4XaKqDumvIX7YJsA9aVlpU4eAJZIzbgN&X-Amz-Signature=25099a44e87a3e90ffba62a2d89f2ebfe5110cbcd4c03fdefac3c824d51d8103&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQPGGQ32%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T195024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQCePR%2F5JbOJOoHRhzsgf3asMmpfpdEpBin4k5n7v%2B2wPQIgEtrqToTpc4TF2hd7uplp%2FlyHvm2Us2YkHk73RDTJuNIq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDD9wZkU6N7x5jFrtuCrcA%2FTqDw2rwA5hyahgUEG74gwpA15rWkgDxA9Z8BXvJwCEmw%2Fju8ycLYNvejFBNMyv2tktqrK0G%2FRtGehAQGak%2F%2F5%2B9Al35QXFSWbucfr1Q6jzRIUN2txxhvzhrNlx7pGpdF3%2BOBvkHGnbH7wcLc97Nwm%2B2XaDNQdx85w%2BGc2Pz4q8pqMpeKzwBG8FLbg9q%2F6%2B%2BocqdyXNhA1MM5MjSEWQaoo%2FxAf%2F5uJvr41t6%2BJk2KOf%2FhjOw9eJUwCTj6HLuFteuCNtji2FbGxBI1%2B7bcPikbi9qI3NyyxPpD%2F9VmPk51VY%2BaHsrMFsrxS%2F16gdtNXrkdHmiRIYM7R4MG1r5s4DI1Cj7K%2Blppnr2nVjkqKKk%2FLXczOM92jVzlcNiXWCVTUO11GSDsSKiHPGsG6WyzuCOWBImsekxzOklA4Ilheumm8pFj1sX%2FCYOIE6yu%2BSFyp%2F6vOefX3uo1hiZsXnUL2sb5rXPQdOzds6v%2BpLT4%2FkIFhPr1bbFgC%2BTAjjV9nFho9nBafX4%2BPSrm9EPH1ij%2B1y2TK2u%2BRwtP8Vn6y%2BbxKpKInN3V4zOzgbz8EIW06utffBiKB86Qn9KDLEYbfQE6YY1TvcPtUpWscd666IbpbpTBiAJTnrxsUVRKlP0lZHMMPlmc8GOqUBypp3LIwaKEzUazL4FxBw%2F5r3jeVkvQLx1KMmnCihipk0QLLbjX4pJW9Ml9m12cAJh6Xg0%2BMyZ%2FWXrvAeMD4g7WUPDBjsRpmjzYqc0yHtnJYgE5X3YY6G74G7aDYJEmjbpMG7URItg4rZAz%2FVWHEcnQbG7XO3A1y0P8NwWKKOqmyJlOYXnndstfjf8E7%2F4XaKqDumvIX7YJsA9aVlpU4eAJZIzbgN&X-Amz-Signature=25099a44e87a3e90ffba62a2d89f2ebfe5110cbcd4c03fdefac3c824d51d8103&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WT6IAR4U%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T195024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIADAkzOGmDEo8EsKiTUWjUnmNzX07Gnx4H4cYkIZ8rFnAiAjwQ3EjvqfP2QvMd%2F2BfGE4an74NKEQNXiiD03ZAys%2BCr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMLasFiMOoG7rYr9ymKtwDrIzwCFH2XocQWeAQrAAKu7IulvDGKZUcZp88qVwamKB%2BsaeYkr3jGVVfF6Vhd745w8LeIZG6DZPrSBWMBlxp%2B173A79aiM6j5Ev%2FbVezmqA%2FyvTOQl7oUKgXssFfNf6jp1YkqxJJhtWSEUtEcHXSuqXfu6kWcQHu5OtsrVk2xlE7NIlFd%2F9xmyVV5Ub2k7VlG9mvngvNyIrURCyIm2t6Kw7lXpKH4%2BdFUYnS5ilDWV3y8pwe92A7Co3sSrc37rRfxo0zLM0TkN856AOWVLo3Xyc8SJ88Ie1%2FQRnPkele2V2DT6zo29WKr5b%2BVrkXEsdabNci3rWyTA6E8efbSoGjQr7Np1uPP9Fjf3N%2FfnsI5xpTJzlxQa%2BrULB5mGkoTBz5Kcz9wxYAvPbmlXorJes26%2BzcK17x9C%2FIDukBu6C6F3jDvMk6nV1uYeG5cZH4sYpaVsjo5jmk322ukvEhrENKgkzxExTDX2%2BN%2Fb4QwoX8AhnrJQvYbXSZF8VM8%2FdSN3xUHFyX4CKG4X3RrbKwITOxJ7XgpqzbOX%2FllZx%2FSgw1NE8yMdS%2FbJyxfqALqQBaono8uo8fgfoarHOHfmezWWIokFkOa6FDxLO%2BRtLWPBpETeEiLOKbdVMLz10PfUEwgOSZzwY6pgEb5rA4JnxnC%2BnF11R8AR1NiYv1cuK%2BNKEzDylmDTw7Ap%2BuyBvsLx%2B8AyfNf%2FQ%2BzHctnRygwEzNCKklKgh%2FXlalbM9Q0eZzr9gOUDOUMVJOcU7q%2FX5jBFs9ncZtq8ytSP0yJLmTwnuSTcV%2B3pjtyQqz0srn%2BTz%2BALbFHVptbvAT9Kf8nHkx9u1A1BGxNhhSt5e3e%2FyLnctgJlysmIGgI7GzQr2hz49C&X-Amz-Signature=06daebf505077412054d0a6b3ce3d39f6f4d7e89f82e0ab1368fd45156874fd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

