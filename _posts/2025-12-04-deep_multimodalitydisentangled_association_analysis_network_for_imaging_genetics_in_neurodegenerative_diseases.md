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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZD5YWDYL%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T171020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJGMEQCIA%2FDY29MIapPvXLPj%2B57W5nIBuns54MFRJDlgo3PQZUkAiBYe2XC7UxrtSr%2BmCBtI4tXV6zKUX1OoMDpn7sVTzbl9SqIBAj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMUW1vvOTRhKwfqb9pKtwDu6VYoLxExUafKKoM0ZGmTAu4JRFt6%2Flvf8eIWQ3ruCgXKFaVMEcmCKlIVhLF32NRJi8HK41OgAZ2n6KiW%2BgLXHxiY%2FCD%2Bn%2BLNK6QzGNT%2F4ZBwkczxftQ0ryqrFWLHaBbGPKCnSaJYbZE54YpCceWrlo%2FAeZ32KqgLgwoph89EqH6PZx3ElEFjLHADSakSu6LqXv7832QYG1gT3Yd651F1DWXgsLwoPKJSXQaJhjLTx5mM1Qms2AHBMjQ3gvSy1HJHyQMeydWzgzpoVq4Hqr7%2BO0uhJV3c96%2F5Cj418ad0lTm5Z4CrjHrhfMnC0NeJ6leK2UQodzwDxxKrTU%2BjsOxifFjK6qHW%2FqkNyaaleT0Q9HwGWB9JRwbRnQUOIcHGQMawgstxQdAr7MuHJNuewI8xGNaIWB3G8E8mzplvKWs7wBf5CrSicpTj44xsGm5xvhJbyABWqzoJl5qIz3sTXPgYPeSkRrWE5UqjJjsOUKQWGf%2FlS7e2MHx2G8mFQDzyaVoORjTi5VI00kr%2FNc7e28Kl5NoIvB0Bzoe%2BnrlgHctxNasSjungjTNVfWYoC%2BbFrF4MSFbFzUfdHG7fN0N5PRS3XJ2gSAYmN3NRfyIBtlF4LGpvY8LDUjMjMffkxcwiqqwzQY6pgGIx0CENBFpslIOi%2B4rZWJaAy7%2FSas3K5qkd%2FjSeeb71l8UDdVGQ9HXgoRap5imAeJLYOONrraI9ATHXpomQQtJUmwlxPkatzVLUFm4Go9%2FvyaNzEUz33mnZxZ23OCLsjCIwKLcrrbirQ1q37XcJV62dF8uqepg7drlO1Cb6fQqX%2B37JaawSO6SpzCwpq%2B%2Fh8PTo3e5nPKhA8p1A7jT8MKlhsTt08ZN&X-Amz-Signature=189c493babc5e7dfe428863b107e7e6e3ee0ebde24f87e4c6cff87015eefc60f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZD5YWDYL%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T171020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJGMEQCIA%2FDY29MIapPvXLPj%2B57W5nIBuns54MFRJDlgo3PQZUkAiBYe2XC7UxrtSr%2BmCBtI4tXV6zKUX1OoMDpn7sVTzbl9SqIBAj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMUW1vvOTRhKwfqb9pKtwDu6VYoLxExUafKKoM0ZGmTAu4JRFt6%2Flvf8eIWQ3ruCgXKFaVMEcmCKlIVhLF32NRJi8HK41OgAZ2n6KiW%2BgLXHxiY%2FCD%2Bn%2BLNK6QzGNT%2F4ZBwkczxftQ0ryqrFWLHaBbGPKCnSaJYbZE54YpCceWrlo%2FAeZ32KqgLgwoph89EqH6PZx3ElEFjLHADSakSu6LqXv7832QYG1gT3Yd651F1DWXgsLwoPKJSXQaJhjLTx5mM1Qms2AHBMjQ3gvSy1HJHyQMeydWzgzpoVq4Hqr7%2BO0uhJV3c96%2F5Cj418ad0lTm5Z4CrjHrhfMnC0NeJ6leK2UQodzwDxxKrTU%2BjsOxifFjK6qHW%2FqkNyaaleT0Q9HwGWB9JRwbRnQUOIcHGQMawgstxQdAr7MuHJNuewI8xGNaIWB3G8E8mzplvKWs7wBf5CrSicpTj44xsGm5xvhJbyABWqzoJl5qIz3sTXPgYPeSkRrWE5UqjJjsOUKQWGf%2FlS7e2MHx2G8mFQDzyaVoORjTi5VI00kr%2FNc7e28Kl5NoIvB0Bzoe%2BnrlgHctxNasSjungjTNVfWYoC%2BbFrF4MSFbFzUfdHG7fN0N5PRS3XJ2gSAYmN3NRfyIBtlF4LGpvY8LDUjMjMffkxcwiqqwzQY6pgGIx0CENBFpslIOi%2B4rZWJaAy7%2FSas3K5qkd%2FjSeeb71l8UDdVGQ9HXgoRap5imAeJLYOONrraI9ATHXpomQQtJUmwlxPkatzVLUFm4Go9%2FvyaNzEUz33mnZxZ23OCLsjCIwKLcrrbirQ1q37XcJV62dF8uqepg7drlO1Cb6fQqX%2B37JaawSO6SpzCwpq%2B%2Fh8PTo3e5nPKhA8p1A7jT8MKlhsTt08ZN&X-Amz-Signature=189c493babc5e7dfe428863b107e7e6e3ee0ebde24f87e4c6cff87015eefc60f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WN4VX45M%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T171021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQC8syDcSng9ER9PhodGATOxwayw4q4LibzA%2B5kLQnmYiwIhANFnmnbNLgnusE3YiaC7xNiZfj09LSTVSeWfLDTM0GVRKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyHjSNSRQOOMe6ORc4q3ANIniF69JS0%2BUBfYqIz6Y0JnhXaoSloEQQ7XudXypwKmEx5RsqNU5fZHwpTvK15Lf0Uwkaxm%2B3ecH%2BnTm4P4ba6CAEGeJwdAe%2B6sQ%2B%2FbSIs2cbBxsyE7pTaCnTcm68Z3xF8mRiYCMBZo%2Bp6EzqsOHDyNnTG04TckRV9cqne%2BwTrPfJv11ESDW9xzrGyxxnpDnkzgmRJfC6gv%2F7llHDwWB3sZb1UgDUNtpUGSK4tXrtXAUCUn7rqmS6F7aNlF34bRQmYoOAnVI2rNb6%2FaI3b9O5kuMJxEbSSvea4Y7zIlZWmAB5tMEbZ2yTXIqRukBGUBZL8RcCFZ72AYMAcYmyuU8501SjD9h0QdaIi9q8W%2BDtQTJlK2jPNuY70jxFQm3I5m00C4ZGGZJsrZoB4LEQiQKdTETIuux0QPjUUvUzensB8Zqlf3%2BlmHoT2dIT8V7aYU8xEVJZHpa%2BLI4OoEcUs%2B7CqBoUqcoTdF7LUCHdXlzUCUML0PiHc4abrWRu4WbulBmR56aMEaVpSraRMjQMInnVS1sQPuwH9KmlRJYIpUiDREaDGfLTsxSVarCE4PfVSnXq%2B%2BlX5%2BHAMLfJF8PGKPpyDdw2q%2FffWGyRbpApienXorJW6ZhaD%2FDsg318XezCfqrDNBjqkAcD7creVWPm8ljZghWvwnuovQ0133h%2BZ19ZpxgrcoI1SwuM6l%2B8ajN8oLjGTY9%2BdhWD8z%2BqAj2Cyz8WffE3P5TQXg3RVasuXQ5voX7B%2F7maVbqcW6xyWw66%2FRJynMC6a2d9ka9MBVer863vaQdEUbB1xxrPWSgdqJEhZ4kGm9yivQQGB1TAjVJzP4lReGW4yJrIb2HTGGPp3qntnP2JzlKFBNipj&X-Amz-Signature=85a6fb0e7e475d2dc59bbd4d9d9c80e3f45c1b448f4eda6e53bc025740ad51e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYGNP3FE%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T171025Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQCTGM4%2BgNUT9S6Re3xPXuLn1X0K2Q62zzL1MaDRvZ4msQIhAMTnDppmzQppFsaVsCQH40q%2FtX9eKiPIsWEAl9hXva4PKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzy8ONKiasgqcoMKTcq3AOtBVUgMLBGK7UPKK8aurbPD8nt3HjyO9ASc3S5qTx1voA3CxoLXoId9Zci61eDBOBr5vnhKFTHxfaAHkVjuemmOmigbeqZZ3osT3lDBViu3BSlFmvOI%2BhsgZM5TO21mPVVnRieeenwUCgmkQlLi03NEi1OOteE5Z1yykg5Ny5s64xT7U3UN1%2B7Gc5scAXh7MIsNotpOflbXHoYvQCFGG6L2u9NgllaE%2FXLwiwbvjzLULxHjUNTTFrjSOvd%2BMGJF794UGZP4aPvROfc28Qsp83iGC4FMxg46dv%2FRR09XlB2rZOZGWNIQQgVoTVmLEp4RMJKox0wNJkxLfAk6pkZqLeqBMNuvpWzvEWLJTMgwg823HSay1rY41weAuLf1dwJaIitArPeWXVFuAYlzh4mcUG2eaUIqBjMOCTF2rf%2FfnjyYLoBWFoY5NzD3Iy4GIFy9E61QUwCnUaTHM0K1Kgp2Iq5zAHJJn90j47yCCGcnsw4JpzwGAa6x5%2BOEFttANoQ%2BWfsag7JyqKHTKWP2ddsNP1gvYvwh1GFX6MKV%2F29LUVbjYTFZ3ZjFXPdqFwvNXscqs6hKsib7q%2FiaC3vZr7EeHSE6auWFla8rtLtAsHA2P6jyKDHhIcWYjmQotrBpDDzqbDNBjqkAQsI5mfuyftryL5vgYvVimZAuD3m2uNLay0ea5V%2FK08ZaGYKTcYbQ7tj%2FG0FhRQoSZxo6FW%2F2sPk%2FEF4FyzIxnnzLeTnC13gPKYtr%2FGn8KAMWkXA%2FOaZWZFzDC9T0XE7%2B6eMZpDJIayZRcR1dEcbSGEVDxZ2bOUH8U7h6PEX%2BA6ZudcpZClQDsaSJ2iqu6f5ZWKpV6UYpGjf5bCNQcVYUETw2KjW&X-Amz-Signature=efba9a4917347dbe7c0780f3df4c4263905a61b9fe89f55b4eb3517469ee633f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYGNP3FE%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T171025Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQCTGM4%2BgNUT9S6Re3xPXuLn1X0K2Q62zzL1MaDRvZ4msQIhAMTnDppmzQppFsaVsCQH40q%2FtX9eKiPIsWEAl9hXva4PKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzy8ONKiasgqcoMKTcq3AOtBVUgMLBGK7UPKK8aurbPD8nt3HjyO9ASc3S5qTx1voA3CxoLXoId9Zci61eDBOBr5vnhKFTHxfaAHkVjuemmOmigbeqZZ3osT3lDBViu3BSlFmvOI%2BhsgZM5TO21mPVVnRieeenwUCgmkQlLi03NEi1OOteE5Z1yykg5Ny5s64xT7U3UN1%2B7Gc5scAXh7MIsNotpOflbXHoYvQCFGG6L2u9NgllaE%2FXLwiwbvjzLULxHjUNTTFrjSOvd%2BMGJF794UGZP4aPvROfc28Qsp83iGC4FMxg46dv%2FRR09XlB2rZOZGWNIQQgVoTVmLEp4RMJKox0wNJkxLfAk6pkZqLeqBMNuvpWzvEWLJTMgwg823HSay1rY41weAuLf1dwJaIitArPeWXVFuAYlzh4mcUG2eaUIqBjMOCTF2rf%2FfnjyYLoBWFoY5NzD3Iy4GIFy9E61QUwCnUaTHM0K1Kgp2Iq5zAHJJn90j47yCCGcnsw4JpzwGAa6x5%2BOEFttANoQ%2BWfsag7JyqKHTKWP2ddsNP1gvYvwh1GFX6MKV%2F29LUVbjYTFZ3ZjFXPdqFwvNXscqs6hKsib7q%2FiaC3vZr7EeHSE6auWFla8rtLtAsHA2P6jyKDHhIcWYjmQotrBpDDzqbDNBjqkAQsI5mfuyftryL5vgYvVimZAuD3m2uNLay0ea5V%2FK08ZaGYKTcYbQ7tj%2FG0FhRQoSZxo6FW%2F2sPk%2FEF4FyzIxnnzLeTnC13gPKYtr%2FGn8KAMWkXA%2FOaZWZFzDC9T0XE7%2B6eMZpDJIayZRcR1dEcbSGEVDxZ2bOUH8U7h6PEX%2BA6ZudcpZClQDsaSJ2iqu6f5ZWKpV6UYpGjf5bCNQcVYUETw2KjW&X-Amz-Signature=2b7863cd9b1ceed5c393620938d0f0faf5a38c0d8f3e99a05446e42d7f7d2314&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHMGKOF4%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T171027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIGW5KLXT5JpcU3D8DheKFYFMCY6VQmsTTo3cBtBR7qjPAiEAqOBX4zIry28y9JVg2bHgtTYOtiU4HO0PDJ5n3T2%2FkRkqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKTEJCwl2H1y5eqisSrcAyq3XjddV609Ji6cITfrg6F0SVk31y6pU3mMlemnyXdw4HZXgKnxBL9viumt%2Br9U57HmopFwxwn2pXQd%2B9xim%2BlY6yijEkdWKPgHH97k8qteWAU2UfKS9fAFHCvxeFsqG6S%2ByT0Qjs838IZja6ywnC3wcKwJf2SU6XxIowsosw65dvw7mlZnf5Ym8AaO0FqgjzeR3ajQtrYezWwVKExSCOJzLNcbyUDRKeII%2F1DcW%2FLD9ilDEPLn418Ur3lLs0xY6heV5eQgPJpl4RULzIJC70k1QGPvYoGbwM%2F6B%2B5Mm6EJlXey1fgk07leVnInIzJk7lOMtiIOfZ1xMCkVZJ%2BJDR450XWF8BoTCJbSPjKBXFKu2jJnD%2FCEdbeceGsBRtwUe2lXl1pv2ufHI%2BF5FKxjL23tf3qYROmoNBxHecm7UN6OG4JaDYCbIQr5nabn9eFfDxf7oAFZKfOw6Xi66SquSvfiPs4109mJbJQayNW6PY7VKZJea%2Bb441oZ6n6pNLUTlQFzg6DYWxF1iN%2BPoJ%2BgG5mmenUbdv8OZFyAQxtFZjk2blWUGcfZGrijiZKD74pAk5uheop7FozXUFnyIEWlqQr28VTLDZxalM078SKucugf1iebM5jB2W1Vw%2FV5ML%2BqsM0GOqUBKH3M%2B9HMjsNw6U%2FPPvPBCTXYhujyysubQongMkuNFI6gEatjhwjIHuuIMR54%2BdLuHGw3ZIcizJoNunEO2avesR%2Bo8NG0YbAR5A0GynSvqW3sUGJXKhDPlwm8fULkCX0buulLXtqK7EJTPTH9doYO14gZjcjOhKZ78g047smLayMkwhlFU%2BRpIMIEfGWaX1AthfvPpzfndWc6qot%2FlAIzDAJMZA4L&X-Amz-Signature=9b0f09242ce3b2078e668206e722e7e4dc1b902d1b17592266fb66952988f46b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJDZYLBQ%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T171028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIB7lQpozwKwgcYK%2FdsWqvUSwGJo3lW5V6UE8IDm4QALzAiEAzTMUP1BQUCa9g4d9ji5eAQwc0sfs1cxkg%2BkPHfrysOkqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKXB22kuzTvz6%2Foz9SrcA00rK5ZI6t%2F%2BYjL8OS3HB07R4KbEEMvJV0zUapOmOGWOrM1gY6NpbxyLeHaC%2BQab867ow4HldTT9Qfijst7hBUXjYjODCeyZwbL9hJQyKM10saTbqdbK4FTXuMvTYQrYvsoRRkjlT0djwBk1UE6xBlcfb4j3Qt37lrGR%2Bb4N5oSw%2BU%2FAVl%2F4swHyhPI06eAyp3Eb7jOx438yGzNCsm%2BwPKTzTNv%2FdmqYoMbZa6bdPqJsZQdO9FmU8xT35kNvB0AYP030nX5YckIKSe2rf43Td7tisvkWUT0mn56n2%2ByG3JidU1PwMIp5ymsy28a3ItBaAbjoJle8xmCF3zqqgBR6yrs%2BPGwiKEeeFes1DTKQrx%2Fe5oPWdvpVF64A2z3UO9MDrNmbYRFbgJxpdTd%2BEGKCC2926EP1OJfG4psY4t8zrxrkDDopdaZsmBpJuhZ6VxtSNqLVFPiobfYsOfHQ3SyyuSDBcgcjHmQqHNw3S04GoVQKgR3yF3xfTkXBvuA6ID4r0B46g8q6LHiijggV4o35Xh9qvuhj67kjDg00hxKw0ilYDtVT%2BkH%2FNhc4TFD7Xi%2Bx8yEJTMp%2F5BFvv1zJA5SwP3OllfePMLjGnuKdxLnhwM6zR%2FQCWwxQ%2Bqg%2FgLeiMOSpsM0GOqUBkS9j%2BIZmdv%2BUTFRPshuQMOPc8T3iXgTB2GNOFd3erCN5jQmXUU5YF%2BqGYmDfzS7HfKtuteyS1vjXX%2BzwELnoYkZNA6NHgSNeHdHkW6keWfKo3F0IUIxwGb3NNsQzYBT8rZ9PqjjANGkNN0nYAZqHutICZnomgbEn9uZdYY6wYDrP%2FZnXmxG469ue3F3CuSEphEqn0mGYszTBu276DSJ7lxu5u5w4&X-Amz-Signature=3fbea474248cc8925c279dc765c2c7ace35e279951a5efbb107d32b4831a4829&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCJPDOT6%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T171030Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJGMEQCIFN10GODlmbvdfm1bDtqB31IGDddgWJnB2g3%2Bcu%2F%2BYkYAiB1s%2BHMBxR9AcMcgCVw4PdoiHs%2B8G0XtRzSsgUrSkwOwiqIBAj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnfHdPzC2pIJAKPhuKtwDtQMNJTXZs12UISKJtEPXFx0efxyIW4GmmByKeFWSPqzgm40Z6rkyR2o2Rd2T290w6Oy7H%2BZfRV0LulopyMMcHDEevDaL0cYqh9UbB4MMRq2kvT0gmAzEyBhRUOBPXl8HSNdIR7R0Q7p6hIaRKRAVGKVa1ZVCfnEoyyDdfb5t6lQ8jXmvAaa6pi75nE7e%2F7bgwzAtVw5LGF0sG03vaee8ZgzVbwbbhVx3oeY8gRLoip6T8FQRkcuApV%2Fj5G8uVzPFS5hL6R5IaLDxH37gg4u7%2FFTIB0VtVlfp9oOZNTRicKfLFPf%2FXIU2lrNdr2ASxUltqZdM2cW5oqgSHbjxV%2BBG5yzeNESRTB9VinKKL54hj9nCHTAfEXKxwAbeuUC2PyytU66ZfnvenkmWS4pg47vcT4h2RU%2F84dWfgf3aqsBvrhFuA8UnWbBjuh74lN1HeUHihMB2XWcJ%2FLxI%2Fwv6wZGGEmmAVtf31maCVAl6ndxqn4LHdqAo40MG3XnpNH7avNcqrOpBsiIGw7NYMacXS8YZyH2e6zBtTFOKX17ZCv7Hq5Dlf8Ei%2BCPwK7dFhw%2FuPWukr2cg4R0jhe%2BIcNwrSrWhfMw2aNEtAVQsM91PE08Dy1nLecaJsm2LqX31W64wjaqwzQY6pgE2ctdjmoyq6G5i1YaFFMQ13axPJ%2BFCZ7UmQngXvuM61tAO1VoktWn5xwcPzYSj0NTQwiUreyaGgvrDwAQnkGxVt9tbbPwVpLeFkSXvHba15%2B%2F2Ro6OdhODyI86BGPusXCCTqEkxlcgpf74lAXahEkZfixMxcY2XvYHtCUIMdjmc8%2F5KBPwbV9S52RbYEm9Jk7fZdMkAnoSn8nQ7PAz2By6KZPhVdok&X-Amz-Signature=37b9026627da4bd0dca710dea315fc9154c709f4a7dbca6f258d8a41e2e9f118&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZGCFJR5%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T171031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIQDMWZUlLzobdi8h5jBsfBuzO0NKULSK3VZClBTVUKfUqAIgLzEsTKzMmyCrY3DYVlKDtVl2hwF3%2FdMD2%2BNQuYELcGAqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMNWmtCHFPL3T7SgvyrcA5GhlSWAcRzUQQC2aEwK52LkEKr3I1yaBPs4tv8eVVwisKBiBA%2FFED86RZFqSv6kBHOTDgmntd7%2Binv92nRox%2Bmb4GJSN9rOBh83TjOip4A8pylSg5duq%2FnC%2BPNW91QMoHwuc0UH%2BF112tUgzbhWneHSrCqG6zn6cQjVz46oUbhOhZdJFzBeh2%2B0SgZntEdZ0TA987j%2F03dJNs6nVlZ9meOnP9aaUiLWJh%2FyVr%2FztnMveHvMGnz4u95iEVSDohkNx1viVFftrk%2FZifW24YTCzn%2Fz72MPaRoas9SkyptazyYytXoZp0CE8DcKE5TU0bU7APu%2BlMJTdMbYC1pzkqYbHUU2lI%2FZ81mOlQOj%2BhGuJMQcau5FD%2Fbj1wJQmAys%2BzNs6oQtDbNsN%2FWQCFIgozR55UScAMtjk9nOH9i3IMG6oJZMxGz0vWuTWoZjc96bZOhFx%2BEMFsWgUjePrenHO3ckCp1LC3NFZ9tIVwpMClJauDmCKIqJf0bJjKDBF4EFg0mg%2B61hoUulOUEfeIHb8p5Tc3TXsANAfj4pmSVysPYmooTd9C5G%2Bo6fFPWSNSpRtox8ExWRfECKmXjQGrHgtJHMt1v54IzCtp7l9JyUH92etUzOgCj5EjV%2FNLvnsUKjMMuqsM0GOqUBVx5uMzBWXY6wUBP3rsB554z%2BHDqphYaB%2BKasc9WaZzS5zDaC%2BfiCEkTXliOAq44sCY2pPR%2FaOTeTw7CpKwGpjL43ESVa1SzwqwTUEHAHSjzuG05ENvX%2Be%2FC9nxkqi98xcwK35bWpTic5G3QfOoTFf%2B0Znch3EUriu6DPar1oLlsXEV4ToqH5Z9E9saThREwuZcdjwx55%2F4e2vMkOXwSWnO5w8iNF&X-Amz-Signature=9a7d5d720fe92c50d08b04f289f10ec9fc31c52bf143170c5886742420027e20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZGCFJR5%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T171031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIQDMWZUlLzobdi8h5jBsfBuzO0NKULSK3VZClBTVUKfUqAIgLzEsTKzMmyCrY3DYVlKDtVl2hwF3%2FdMD2%2BNQuYELcGAqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMNWmtCHFPL3T7SgvyrcA5GhlSWAcRzUQQC2aEwK52LkEKr3I1yaBPs4tv8eVVwisKBiBA%2FFED86RZFqSv6kBHOTDgmntd7%2Binv92nRox%2Bmb4GJSN9rOBh83TjOip4A8pylSg5duq%2FnC%2BPNW91QMoHwuc0UH%2BF112tUgzbhWneHSrCqG6zn6cQjVz46oUbhOhZdJFzBeh2%2B0SgZntEdZ0TA987j%2F03dJNs6nVlZ9meOnP9aaUiLWJh%2FyVr%2FztnMveHvMGnz4u95iEVSDohkNx1viVFftrk%2FZifW24YTCzn%2Fz72MPaRoas9SkyptazyYytXoZp0CE8DcKE5TU0bU7APu%2BlMJTdMbYC1pzkqYbHUU2lI%2FZ81mOlQOj%2BhGuJMQcau5FD%2Fbj1wJQmAys%2BzNs6oQtDbNsN%2FWQCFIgozR55UScAMtjk9nOH9i3IMG6oJZMxGz0vWuTWoZjc96bZOhFx%2BEMFsWgUjePrenHO3ckCp1LC3NFZ9tIVwpMClJauDmCKIqJf0bJjKDBF4EFg0mg%2B61hoUulOUEfeIHb8p5Tc3TXsANAfj4pmSVysPYmooTd9C5G%2Bo6fFPWSNSpRtox8ExWRfECKmXjQGrHgtJHMt1v54IzCtp7l9JyUH92etUzOgCj5EjV%2FNLvnsUKjMMuqsM0GOqUBVx5uMzBWXY6wUBP3rsB554z%2BHDqphYaB%2BKasc9WaZzS5zDaC%2BfiCEkTXliOAq44sCY2pPR%2FaOTeTw7CpKwGpjL43ESVa1SzwqwTUEHAHSjzuG05ENvX%2Be%2FC9nxkqi98xcwK35bWpTic5G3QfOoTFf%2B0Znch3EUriu6DPar1oLlsXEV4ToqH5Z9E9saThREwuZcdjwx55%2F4e2vMkOXwSWnO5w8iNF&X-Amz-Signature=93262804dcacc9d3102c49ceede4336bfc0c0b5e43b5d03738091ca5516735e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVIUIU4E%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T171016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIQClFAIXH3no8jRYqJ9vrp1oKgaIC5HoClmnMeYse%2FnmsAIgCfJ3mFybUHmyZOC1LAcyQ5wKidpZLHS3AFAZdwQgOngqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKMirFdQKlH7NthoYCrcA9p35PBqcHotGDLMJv64%2BESxDN7YfOT%2BPCCgZMsfKb8rOt910WELKdnGryH4ji6ZNtcxGbdj0FoTP4YzxBzAi3NXqQ5lGKEpMXjURA%2FAn9x37AnWF054U3%2BLWqZQqLsgxDpRnVgwFoPEzWQO6YKD8RLtRQ8zBcZfzanS%2F%2FxCDQoUygx%2BHF6LWKZokwLmXu8fTXUcZtILL94JUfki2UuZ%2Fra8DoR1Rb%2FSh26ALyLHSiiGwwAuL2%2Fj1QmFm648Nok2PDgksCeVX%2FQKfV5KDf44DL8FfxCC071nok78mCDc6a29%2Fnkc0TGn8f184EhQHDQ2rs5wlhUee46hYVPJS6Wikoid7YVu%2FlKkU60M%2BzpWeEiOKvis%2BSQTvvfH4pr%2Bsxz8lBe1Cs3f9yTqW%2Br3Yqm0a%2F2DJDQE28B1yauo7itC%2BMhb5I66HprnAEcPVb9CoQLzOcMApENrIrtjpi86atc290K3tkIbV%2FAb9UYX%2FphyuDBIDnDldDvTlofzROcUUoAPSkGOvO1f4HA95Y1BS5UOICw6qUicaLBXJSL%2FXNFa14ZhHjdIbVRfNPPiXnt47ywt4WeeDx2MIXJDHJ57dQSxNK5Fpf%2BLNSW6YQ5ip6i0Kw%2BO28YUnN0SPP4kxISpMNeqsM0GOqUBCsEFNLpUFgNocdWVtU16UlTD6FKuiHQ%2BH17ziwkZQkvf4hFjUkszEhTK0s%2FadeV0%2F7iIjtjcpHGqsziutKDhv5BAtOU7UPMRDIjq4KvBF%2FS3DF9eDuSWJUfaHTSoGAAJ2UaZA40qM7u49dH1dyNrYSJr%2FXqQAcpqKnb83V%2Bv55N77GksPVmR3EIYDxadk5mLUYYvaYawHkhnAZo0VaZsRnaGT%2F2d&X-Amz-Signature=3d91ef884b564b289a1f4679f0a63a4f510fed751d2fa1f3ef9f908e58c2b88f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCZSIQAX%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T171033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQDVMHfTv2kvAW3Ss%2FCZ0vUX3qwI8KzeSNGqyebnOD8jiAIhAOpQKFy5IaUEsarw2ZH%2BAX1SiSoJOmzAFmlcGAdEUkOZKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwV0oLaV2wnOOCjgOcq3AMd%2BqFP1GLEZAPjvw7QKvV%2BwmSWk2QcPHf3pWrQ2W%2BOu1P%2FKKifbgum9V2fyt6%2FVLxvTJVhm9RwD8Qh9PURXsB9x%2B72ITiy%2BDfPwZd%2FN1JlvQB2LuZdxQHHb%2FG3aAI7%2Bm%2BBch1NHgaU2e1nZSYg3t%2BNjzzWpWJophUJ79ollCQU054GLNFX4DUCuxqp%2BHczrvvUK4sYVYpnnD5wezjuB7fcw1%2BkOkgPl8LHjmMh6TGyfbV2VqcKqHxcy9YEsovOXhenFRSIc2sGQWZd6svFD7gA6c7%2FJe3e9zoJ1AWlXPPajrGe0jeDOScxivVCs2yCnhYY3l0Z0Y%2FY5iZ53K21ZNcTrDluuTOq2vQhtb3WLlQFhRG6ddnpUnQyy3ELht7ckEwhOHNgtKVfkEVYXWuggA1YALeu5C2I3RqiTwNs4sDGs%2B%2FglCe3rDXDhWPrXEG77wkI%2FbVjElmoWDo98nZZH4oa20l3jtiCrFGVnSP0P37e1nNDY%2FzWYSwMC3e2U6CmMNPiy9J10G7d8eUcH2fBqbTxFEJ1dIuRJqvTuiuZ4wq219EDOMMgcMWijlGsK4%2B%2FeLqnE7s4WXMs6sRWgzFPoqE7K3%2FT2QjWpsa2vAQnLU4gAwLKlUE3LeJ9HCdF6jCLqrDNBjqkAaAGolyjqU3IPqrOqVwwoS47vR9fienfWej6aIcUm9GFi4gSw9gLdKQ4CJZTJoStwcwjiBFJkwPBwB8oXJbSXncXhjQY3tNdAcmRKQbRXEvY6iDdczakG9V%2BUOzN2%2FIRjZG5jW6f%2BKa6HpjmZwaikERAMJBXYZemdchwp5Lx78%2Fs9RQ7ZjKuwYKpJUZ4LsxoSOYR1YpVX6aoUIfiXWyQN%2FlM4HCn&X-Amz-Signature=f38b7014b866eb7490ce39cd4829bccb13152ba88629e3c37d7882278029532b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCZSIQAX%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T171033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQDVMHfTv2kvAW3Ss%2FCZ0vUX3qwI8KzeSNGqyebnOD8jiAIhAOpQKFy5IaUEsarw2ZH%2BAX1SiSoJOmzAFmlcGAdEUkOZKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwV0oLaV2wnOOCjgOcq3AMd%2BqFP1GLEZAPjvw7QKvV%2BwmSWk2QcPHf3pWrQ2W%2BOu1P%2FKKifbgum9V2fyt6%2FVLxvTJVhm9RwD8Qh9PURXsB9x%2B72ITiy%2BDfPwZd%2FN1JlvQB2LuZdxQHHb%2FG3aAI7%2Bm%2BBch1NHgaU2e1nZSYg3t%2BNjzzWpWJophUJ79ollCQU054GLNFX4DUCuxqp%2BHczrvvUK4sYVYpnnD5wezjuB7fcw1%2BkOkgPl8LHjmMh6TGyfbV2VqcKqHxcy9YEsovOXhenFRSIc2sGQWZd6svFD7gA6c7%2FJe3e9zoJ1AWlXPPajrGe0jeDOScxivVCs2yCnhYY3l0Z0Y%2FY5iZ53K21ZNcTrDluuTOq2vQhtb3WLlQFhRG6ddnpUnQyy3ELht7ckEwhOHNgtKVfkEVYXWuggA1YALeu5C2I3RqiTwNs4sDGs%2B%2FglCe3rDXDhWPrXEG77wkI%2FbVjElmoWDo98nZZH4oa20l3jtiCrFGVnSP0P37e1nNDY%2FzWYSwMC3e2U6CmMNPiy9J10G7d8eUcH2fBqbTxFEJ1dIuRJqvTuiuZ4wq219EDOMMgcMWijlGsK4%2B%2FeLqnE7s4WXMs6sRWgzFPoqE7K3%2FT2QjWpsa2vAQnLU4gAwLKlUE3LeJ9HCdF6jCLqrDNBjqkAaAGolyjqU3IPqrOqVwwoS47vR9fienfWej6aIcUm9GFi4gSw9gLdKQ4CJZTJoStwcwjiBFJkwPBwB8oXJbSXncXhjQY3tNdAcmRKQbRXEvY6iDdczakG9V%2BUOzN2%2FIRjZG5jW6f%2BKa6HpjmZwaikERAMJBXYZemdchwp5Lx78%2Fs9RQ7ZjKuwYKpJUZ4LsxoSOYR1YpVX6aoUIfiXWyQN%2FlM4HCn&X-Amz-Signature=f38b7014b866eb7490ce39cd4829bccb13152ba88629e3c37d7882278029532b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RT4OR34%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T171033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIDNH6wODPiXO3a4hK%2FkfVGZO7NAgG8U3THMhHJgE7CQ0AiEAxV%2BSXNk85MZyaYk63h4giVSWSNNd9mS4E1NiuZ8bTDsqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLJVpfMmRzWmyg%2BaZyrcA%2BCVBVdHTbcZmIzi%2BWEn%2ByTZiGu6l9q0HsCZRdFMK%2FhE4i%2Bd0C%2F9VcKAGDzCSn06Jyl%2B4pAyUoAaDPI9sauVJdMeZhoWb7wwb4hA7RpRWagaQM7gLddoluHF4qjNCDbhDsx5Q%2FHQGYnusjqSApTTpz7s5KC4oYzHQeSHKAiS8EZxaRNVYbbbZoAvc%2FHaqVMoQx%2Fo%2FGLl9P0wU2wrtpmuFWo1kGG6T%2FHaD0TP7e%2F9JO3KJcLtyGaXbeAAJspeu823YWHn9%2Brhxk2qW2sBWSJ6oNs9Oudqmo5CebbnZRHNVHbZ8PHlowL%2FtUwoCLIXqU0sStphU7kiU1vgIUBrHaD90m0cucYIiCuZOiO2hPkyl9rKOmRTgOoQ%2FE8aAqmd%2BpBCKDyfdJPAr7pwwb%2F%2B4jyeJhkFmvnP3w5pPFNs7X6pIBhMeymsZsHLvorKiiLOaqrvi2L1y66URvkakmdjVeUKvozzoqGo7jZUrD6d9aeolyFpGfnFjLclNbqtOnH4ckbakzqyNufZtadORZB6H4F1iwmhsvVy8%2BP%2B06QygomLb%2B2fjofbaOZKH%2FlMxZzPAMXeR6jgQKx75sY9NLqF45K4vb45NJ%2FdSwQx4UXeqJvzngscJWnRkkaS9BJG24SUMImrsM0GOqUBgYJYYTbp7HbB5YdcuF3VB%2BiLNmDVPOSsrvzTHBlctdzo9EjSTyiY8Qp4a5cewNzGqtdlvMGbBC95ebxA77BCEtJGNYZrQTjeJ%2FXsiN4mGShFTYXzKNPyqroSV2P56nW7uO7QTaNmGxz9BUiC1bz0OVfDwEv3JK5oDqSaytvJVgSBcbyP9L8Cdv%2FfhIrFual7DeLQ4mAeQxgVfvjBNCBPP61nFPjT&X-Amz-Signature=54fb3bf3b3d1a6c75fc6b1bed95dbb989817228fc88014dea9e8a9e3f6999c45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

