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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QSORULC%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T203725Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIAS8a5EXSceSA6HL1awNU45utifny77ytWxIoWtM6ETEAiBUzyJ89ba8V%2B08lWnSJnvT8cQQRCfZNF%2BWeIAo7P9E1Sr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMSAcdEHzgX8RU3uK1KtwDaGN7uwDE4u9OWHz9EKgR7Kjk6UyJ%2BalpCsd2MWMlwWRHSrTOBPDjJiYmlEIjbgh%2FiXm0cU1l62olTes%2BmveZQ4ra7kZj%2FPJsEklaVO6fzwr1ERd6LZFUzKHYO9BDgbBPXKBoyVKzSWpCfHPHcI7OC0A8AQSe6utpf7XzpCnC5o6LzlUjI7IS0B6vcdVI9QRbaRmkelKH7rGe63wgiC0eMdDNJXiECCuJ5qbk1Zpf0qfiEGEo21N0T6IMgqw6vS75M9ZGD3DaJzyu7sGG3S68fGKuK588w2US63qVP19VN2ueeyujlZMNNhw31KgV65QnTjFlo3e9NgqiFrXMCE5Lzl8Ta%2Fw%2BMAmZtpkqanVVW%2Bnh0BKlpAnhDiMxKwBH%2FF%2B1Z5Q24a%2BKFgHQzLLeMlEsfCJKSwpTxUfPq25OHS44y%2BkIjm95j6vNA4DFrIQzJkQNr108uEnlRI3hToZ3sykJZ2I9PcR29DocJxMQJDJDZ%2Ba50WDjj0jYglkU3HfQLIYbAzmsxglo%2BGmWdtpCuXX7qtMIsd9dGJI7B1Y%2FWoVdLDdTzNida1fAaEmoL8BpJErZtti9FjDcyEyrCJzlabKcr9kU%2B%2FAOalAkBG6kbqH5uox4JuHW%2FE1MEdfmsaMw1rOfzwY6pgHiWFj3XliwTcaxFiGHQEeqba%2BcLh3pDEmrpqIki9hSiwXyy6o7TvXrbb8uYT5jNYGGvPUL2tbzsl60rv7yrBt9LxnN6ORTkA2kl7AZjVCpoBb4r%2BEg22BveYqr06KGGmYpx6wsqX%2BxktUPYX2INQGefA5i1VVbAroTfpjR3XAHg32WURv9m52c4JF%2F1ESbMyWa6FbuJd%2FyP5GNJ2WVi47sdI89%2Fu1q&X-Amz-Signature=dd1126ff6815cb616fc6a228f9d7a1a3662e79eccb7d4a1b8bbfe6930f853ce3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QSORULC%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T203725Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIAS8a5EXSceSA6HL1awNU45utifny77ytWxIoWtM6ETEAiBUzyJ89ba8V%2B08lWnSJnvT8cQQRCfZNF%2BWeIAo7P9E1Sr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMSAcdEHzgX8RU3uK1KtwDaGN7uwDE4u9OWHz9EKgR7Kjk6UyJ%2BalpCsd2MWMlwWRHSrTOBPDjJiYmlEIjbgh%2FiXm0cU1l62olTes%2BmveZQ4ra7kZj%2FPJsEklaVO6fzwr1ERd6LZFUzKHYO9BDgbBPXKBoyVKzSWpCfHPHcI7OC0A8AQSe6utpf7XzpCnC5o6LzlUjI7IS0B6vcdVI9QRbaRmkelKH7rGe63wgiC0eMdDNJXiECCuJ5qbk1Zpf0qfiEGEo21N0T6IMgqw6vS75M9ZGD3DaJzyu7sGG3S68fGKuK588w2US63qVP19VN2ueeyujlZMNNhw31KgV65QnTjFlo3e9NgqiFrXMCE5Lzl8Ta%2Fw%2BMAmZtpkqanVVW%2Bnh0BKlpAnhDiMxKwBH%2FF%2B1Z5Q24a%2BKFgHQzLLeMlEsfCJKSwpTxUfPq25OHS44y%2BkIjm95j6vNA4DFrIQzJkQNr108uEnlRI3hToZ3sykJZ2I9PcR29DocJxMQJDJDZ%2Ba50WDjj0jYglkU3HfQLIYbAzmsxglo%2BGmWdtpCuXX7qtMIsd9dGJI7B1Y%2FWoVdLDdTzNida1fAaEmoL8BpJErZtti9FjDcyEyrCJzlabKcr9kU%2B%2FAOalAkBG6kbqH5uox4JuHW%2FE1MEdfmsaMw1rOfzwY6pgHiWFj3XliwTcaxFiGHQEeqba%2BcLh3pDEmrpqIki9hSiwXyy6o7TvXrbb8uYT5jNYGGvPUL2tbzsl60rv7yrBt9LxnN6ORTkA2kl7AZjVCpoBb4r%2BEg22BveYqr06KGGmYpx6wsqX%2BxktUPYX2INQGefA5i1VVbAroTfpjR3XAHg32WURv9m52c4JF%2F1ESbMyWa6FbuJd%2FyP5GNJ2WVi47sdI89%2Fu1q&X-Amz-Signature=dd1126ff6815cb616fc6a228f9d7a1a3662e79eccb7d4a1b8bbfe6930f853ce3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WM25YHVK%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T203726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCF3lJiNvr5O4qlH%2Fs8KbZzs3oJrkqwzZavvccXc38TCQIgTgRotMBPrhRQxYITsBVcxpuHvbK5e5VDKYfbNlFbaCMq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDERNEyHv4qQeAau22CrcAxzDLrgNE6kuc0ACzPrNiI%2BjmL3H%2Bh6MJ%2BI8ey%2Fh%2BvwU7%2BM4KaeS8%2FzmGy2M%2FVm880uhdkBxeJaio71OmhE9ln4Xf2w8LV8Zkexu6fr1DdJ6JxwoNdLFKhg44Wl9UhM8dNPu3YWgutUF6WTgcwEqHetlDENojbtY%2FQv7nok2athHvNNalSGcGuBA6R6zqs9ubaEMterO5JUf3fd58c%2Bxq19mSIzQGy35mXGoiCbWng0iv0ev1R%2B79PA8cMMQtHpV2lOsu9XvtkhL3VxZLcaOTmpO%2F%2BaIaBufRJ5UY8kcuqiQh1uf26Cbh%2FfmrWs9ck2FPNpxjmqjcIc5%2FMtxANJM4WW8nOYmqCP8i3WwCvMXhL6qHjR30gCE%2BN0LkoEj0CGVoHdOAESv9omgx%2BBTHOkiMzJcNgMkxR77GLR8TA36zBn1uKmJObZipMW3Xq17zJZBPMEPs9J%2FwOeu1zPYToF1xKhsu9jV%2FJ3l0g2QRMQw2OzpH5ChDJhT%2BIpVK1C7kEOXHsqDteyVePYaUSFojO91H%2BYez2IPUvwsBPfHPlst2RH8cpGFVEn90c3UUS2vUau5Gpb4QOq4pUFgnWgH%2F4Vjn8iKsCjaJPLzApypd%2Fz7NpxPVxa3K4384gCjDlnHMNi1n88GOqUBF8HVQbE1ghBz0CW8p8Y5q8QcZbGLpCo0gM7oivE6CSaWtZgobU%2BZa25BnR8khLoa0fFaHnCftghUeeR2oUEcni9iHGk27oDqaeDjLAxNPCJjEyTx6JHJf1id8ZXIu5ilr1fDhXeGIe%2Bum5PfPzpl%2FEbsNdKsMEbaG3OKGrQWNvyzJLYEixIS8%2Brreg0aXu5edYvuMODv1QMNA0ubKEwFW6CbBFZh&X-Amz-Signature=3de6691bee35e9dd616b2f8c367fdbd2d096c1b3512484c80b42fec2462dde0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TSWNSDU%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T203727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCCVf%2F7sHI6Dqz%2B9mx13htdeRBV2q5BSAbPb0M85L2IvAIhANZt6ENvhEfGhXYyEiCNXJXm6TIiQH3opJZ9eS8nrIqNKv8DCD0QABoMNjM3NDIzMTgzODA1IgzZKiESIDwWcVATExQq3AOk9b7GN%2Fm9z3QaN8WynQttfLupVvjlyD1fjvuOl5rlu4Xk8fY4UGdI4fnSKTD5f2eN1Gza5cnP6HK8%2Fpjcj9M1424sm%2FknjwVT9XSi%2F1g4cjTR3T%2FFdH8wDXWgqgv%2Fr9StytygvZ0rHZWXNLzmBabMi5cgnwcwa7JAhN7dJbZSplDzixX6khFesYTiiFp6Cc2B8V5GeTKhIVASUVX7%2F5vUBrBnGLUCImdk1QsdmeN69QrE5jL7%2BMHGanDnD1boBPmF9Nm1LzA9R8tthapj6FPC4GJKU1jai8QKCSTbD27QJSkj%2F9rWrlnAEZheLY37D05Iq957A6l2RTGhH5DZWf1cSaRLYj%2Fwa%2FX0uf4mWl8yZJcvWBpwXG3py52QJlB%2BrLz0XVLRfk8GrRto4fn5FJr01MblZNeLqTAatiZWfSrGeMc7KLLrBupOquahoWoLN74f1vGeLuCTFQb79H4oV1VI46qz%2F%2BgynKv%2BvyOpM0oHtzFL6sy2J76fP%2F6zociyrbGjnBcf7ME0fVJjTGb%2Bkf5MFDw45b0ioPbUVxcaI8JKtYdDcprus%2FY0i8TB1D%2F1CTL5vts7zi5k6953BBFLfiQX6mb1CYbJ0gVOVCEtqCO%2FBbsPK184bT2Uj6ViyjCGtJ%2FPBjqkAZYwKZp2oPHMNwV%2BS27DS7KwDd2u7Tq%2Fo5Uz0bty5aq4JkAoNEPoTWXwZH%2BxvzkKU7LEySDrtiAZ9hGJMseBVsVMeOWkrW4u4uY3DSS4aVXZUJN3c7EGaxuIOYPvBzKhTctEDIACaRKZOPHXrwIyubmumGVunCE2RS6rA%2BfMX2GhkTrhXJ9D5cyvmNcVI1dsGzB9I6wNMYn3YXwfn3mBYsTbwlIf&X-Amz-Signature=64fcea2fa2ae0d17381b239244e5fa86e4dcc72a76845e9ea82c49941bf6fa3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TSWNSDU%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T203727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCCVf%2F7sHI6Dqz%2B9mx13htdeRBV2q5BSAbPb0M85L2IvAIhANZt6ENvhEfGhXYyEiCNXJXm6TIiQH3opJZ9eS8nrIqNKv8DCD0QABoMNjM3NDIzMTgzODA1IgzZKiESIDwWcVATExQq3AOk9b7GN%2Fm9z3QaN8WynQttfLupVvjlyD1fjvuOl5rlu4Xk8fY4UGdI4fnSKTD5f2eN1Gza5cnP6HK8%2Fpjcj9M1424sm%2FknjwVT9XSi%2F1g4cjTR3T%2FFdH8wDXWgqgv%2Fr9StytygvZ0rHZWXNLzmBabMi5cgnwcwa7JAhN7dJbZSplDzixX6khFesYTiiFp6Cc2B8V5GeTKhIVASUVX7%2F5vUBrBnGLUCImdk1QsdmeN69QrE5jL7%2BMHGanDnD1boBPmF9Nm1LzA9R8tthapj6FPC4GJKU1jai8QKCSTbD27QJSkj%2F9rWrlnAEZheLY37D05Iq957A6l2RTGhH5DZWf1cSaRLYj%2Fwa%2FX0uf4mWl8yZJcvWBpwXG3py52QJlB%2BrLz0XVLRfk8GrRto4fn5FJr01MblZNeLqTAatiZWfSrGeMc7KLLrBupOquahoWoLN74f1vGeLuCTFQb79H4oV1VI46qz%2F%2BgynKv%2BvyOpM0oHtzFL6sy2J76fP%2F6zociyrbGjnBcf7ME0fVJjTGb%2Bkf5MFDw45b0ioPbUVxcaI8JKtYdDcprus%2FY0i8TB1D%2F1CTL5vts7zi5k6953BBFLfiQX6mb1CYbJ0gVOVCEtqCO%2FBbsPK184bT2Uj6ViyjCGtJ%2FPBjqkAZYwKZp2oPHMNwV%2BS27DS7KwDd2u7Tq%2Fo5Uz0bty5aq4JkAoNEPoTWXwZH%2BxvzkKU7LEySDrtiAZ9hGJMseBVsVMeOWkrW4u4uY3DSS4aVXZUJN3c7EGaxuIOYPvBzKhTctEDIACaRKZOPHXrwIyubmumGVunCE2RS6rA%2BfMX2GhkTrhXJ9D5cyvmNcVI1dsGzB9I6wNMYn3YXwfn3mBYsTbwlIf&X-Amz-Signature=9d1676f91e7f7ec5d08bf82c1c066745da93cdee33202ef9ed08085b46c7f025&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NPLCVZ7%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T203727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIF52NQ31WcGEQ6nJ61LDUKHaB4TUEiBe0mm0hXPkVJo%2FAiATvhDpgW2e1T4E5zrN8rO%2BUDv05Qh0RxUsubyofhM89yr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMasYFZlY8pA1RF0IeKtwDGBDzwffhs5E4ZgAGc7gx5%2BMcmhVuVgOxMSntYgtlH%2BoB5NcB5Rq3m%2B9JB8vbz0%2F37an6BgQGXgaw4YumRTSGaPbQ%2BCm4Kym03HHZSHKFL4%2F2zpme4xcwP14w82Xkd%2F%2FmW%2B9%2BDoUh4fohQY9Z51K%2F5DM1cFhrxDmAj4Nu0DsEmIUP%2Bl3RGq48BJGqjJDp41EwWxcDUoeKFYie7Bv3CqXtHpCmDVGKcCEfF00xAkX4enicz6Auy6sjF9VSzX9qWFMowVBhXvqdVNUPQg%2F4WM4QD4vQ9uKjh1uMcCkFxrQwmW6lq4%2B4DTZuql9b6NNdMJ2rnAV9jUFotIvarJHZ63TJBw5n66A5vKXX5CX5xKaUqlRxSZYTO8sAmWcvYYMV9DkRUQ8GA3aqnOnx%2FqFC11LtvDJGj5i4JM2gtYJZXUj1LMm8mq12tAa1IQ67u5hsLc%2BAzIY1C5yPnjMvVvHNAAB5yEaWqWwOQz8af4gXuP9TcgWpwyZ%2BVgpQKV5b%2Bznt7ccHdP7z5fGtlIjgDMtGnTB6LE7kmLSiqBPL13fYhu5j1d%2FEE9m8R47Yvct0eI4Pbe0oTNztSEq6mem8jA8Z5O1zh6I5DboUZsvuNVWBlXLKrxikrYqUDyGDx657%2ByEwxLOfzwY6pgGbtq5IkgLFGV8GfVF57%2F%2FOveYxOjRDatk9vg6Cls7gSkqjBLGefyZTMxfBdrPjn27VDpD1HSBVeMds7%2BpiPMzQR%2Frisfcmhf3EEj4lxv38gZRRimROy4qmixduKI2goNLgzMBIblv2qu08c313CCNwvRA6KGpLS7cwfs4HQeufIuFzNM72BZfVxrDaYEAGcCjaYRLpEtgCyiBk79n6AIemYawy0J8Y&X-Amz-Signature=b86b08263a89c3b87d8a4d9e5374ecde18e6839879a9c153d1d8a98b275583bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTEQQDFS%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T203727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCAMUABscyPNrPh8ZBXDYBOshk8%2Bq6TF1BCJjwnYL1BUgIgYvQS6ut0EZU0N%2FlrIEcaA3iwPzub%2BM%2FhLrfuWOtzHy0q%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDOr6l7ym3BOTFFC8%2FSrcA97DZRIUXNuwxYY4wA33EidhyVLS9EVHaMVpJdmP9M5lo%2FVuLBqzrd1vndSlDFrmU8xf6WhDp%2Fr0VlNTQSeVMfJ0uIw%2BwPUyD0l5QGYYjOG6woywIEj8zsdFz9dGLQ%2BxD%2B22Br%2FabotEEGG0w8MApuWj7GG4ILe8YjE2EFoU%2B57TdVnxv1%2F1UgblZNkSiUQJe1q%2BzHBk41ayYEOfS%2BL43xu6tKDEhYWk0KpC9BubnW2c2V03DfNPU%2BePig3Fyc1qPp04rtNvkIo0Vzr5tDvkEHcfY3YLsKwwVoDA7A56b63%2B15z5U2SlOwJAiosNFWzV61Hg6Ac%2BoJhWB8PaKktWf517CQPNXV38KcKKHsv3F40Kle0j9lqiFV2oIjxdM24bWeG%2BETQh7yijLPe8UevwhZwBbLYQv6EsukE6jS1kL4S8oZhFmJFdQdH6L0MUekPA4EwPNjmdDYgbTOJqOjLuuYWEkZi12CKAlH9Ju%2F%2B%2FHRXldtOtcQcYbM%2F3CKjZwOqINMh85zWzCDPpNxDb3Jeb2XpCgdG3l39PxDSh5RrMaruSUOIqBC%2FgfcBjGPBinNaeVWCa9mCY%2FCqYHQa8MitL3A5Op2GsO5ZctLfhCAAeU6DYznjCX%2BTSSrZG%2BMH7MICzn88GOqUBqBb3ja8Q4YHwG%2FtlcnbgsS%2BkMzOm7KLz0P6DNzNSWzhlxPPVPZCSA64rIMOfnMYGf0xaiVGoS9Zf%2FoWLk%2BL6xSh1xoQfykHOYjyBzcJMbejrm34whjjGIztlCJmmh0moEe2eBNRiNTe3y1EvtshXfDvMAZV01%2BcdgVQQlYgDLLDugMHp5wHI96V7U4S165Gt4Re%2Bcpum51du%2FkPv6r55fGFhr0XQ&X-Amz-Signature=dedc0d4f7f74b037b8b23d8aced52d9de9e1a0393fe784bbf0199462dde0f9f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TI2COGK%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T203728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIFlN0RIIzb%2Bvod7uOVvmH7ZuDyaGhy1Ept4Gu2d9yDNIAiBnLQSlxPaFf6FwCXTD2g2U2BHk5UrlIOpuBDnb%2FE0qzir%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIM736KCrBe596lis7GKtwDtAiW%2ByWcr7KOtTeuNuMvmdd49Hg3l1HJzEqtHRHDzQE7i7z%2B%2F3vinVSrIs8i%2FUdjWXHaIRHRmudUDUUrBjIQzsz3WLL7WO7t%2BukfWo2IkWxwQ%2BHvc4hZNaGWTVdQ0qiRZ57NaxAltblXdIxP4Rv3BxM0Om6OPWyMJQKeTVLJNAfPh99TsmqKPvZj2yWJe5dVkP2c0m7NKsoDYb6O%2Bims%2BKbMbwC8cSlBUGwREWh%2B2AklHEGkXJt7Bq79C3PDWDU6tzRsrFQDL%2BGfJotvp6%2FgB3P6QhRzKWsb%2Bh7hez%2BDqsbmQkuRupqNaipa6wbAtdnfAAgwoB0v466dQijdDQINbHOYVRcO0XmGNa523%2Bqst3OsDzUDTuYIEAQnZ4irJfsDmypwM1R%2FYqLjDds3Ivzg8fVGKeDXG51Mdt6H%2FQz%2FxkHx5alJvpBjQJvWxK109Sdj2a4It1NYkoG1X36V%2F0Qg1TXENk9tIUYd8gwKhkuf9b0hKHVntRGJVt%2BbsNceSTKRZRQLemlHyh%2F1MzzCbzaDfpwQm7282nWtHNQpVAF2J8qLuiKG0h6YGXt45p6GSXMAs3faBAKUg2683u17ujK2L%2FMLCZV%2FSCf9BN61xRAXXeUAk5w2b%2BWILUBAVS0wgrSfzwY6pgFpr8fc5jTsj6feR%2Bh%2Frs9tf79ZIT8FiwW1hfomGGzaDPCOfjxJA23rQKjypoE%2FzV%2FLAUbYM1%2BIHbQBuJzeHxsE8b9LEKH%2BigRmZLuy6DeY1JTeKk1ELeJTd1OPRXa2jhurhswwudg5cHxFUBIMJBzcMiFrPny%2BBsk4pPu9JM%2FUcXiLHTzEWyt4uBOjXRa2Cb5nqwq5vOgtScPJrZveZRmDeqfkmbMX&X-Amz-Signature=60274e179c1e1b3d7eaedd94f871ffe609cff3b3645e59c8ae8991e84fedd35d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2TYV74Q%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T203729Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIHfhU%2BoRazZzqXpKUAmnNjA%2Frn0436tdg8beMCCxtAsKAiEA7CbI748cwNHO8Z8lRLqaOECdeflQP1yH4BVOXV7QQkgq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDMOKiuQ6oIGLASnRvyrcAych%2Frby3DVtSyQgaPiKoBnHqjdq53sYv4duOyVwA1VAQD29055AzK28%2FX3OTZX8OR3B6cWrXGwTCayzkJJlCm1vsEBwRtVzLgwsTkSBWb2tVv9kEFsEbWxi4wssDKgoRE%2BavnKZ%2FBNq3CID1NRRWAv6M6TmgDON0xzrYxSs6eLEOB4z4UPYZn0p%2F5Ax5Ueelw5n3EAQsOCvc9E4%2B0lDx57fJCTDRCmu%2FEPb5R3hTEphgqTOnu2k%2F5lvZRIlQPFKnid%2FFh472SQ4MnraSe74C5z%2FGONAu3Q61UkOEdJlbwMWLwmwF27o2EqOSb2wcIY3IrDKPP4NeH%2FAZlZq6TGfgGKDXcf0NosnF%2BJ56dQVk3o5dPnbqhG9hWoWhpW3d5amHbD9qdRF%2BdqHnYtDpeWPmOfW7avbZp%2FbF%2FlWbF%2BFBafbq6Mw6RIpG9GpFpX2QcMWZrjrdSv5alxveIbVjygqXzunNjunH2rVXwwGYyuHT1gpmeHs9r936k%2Fctk%2Btl4QZF7C1cfUAkgFm3NcDXJyUuaQeWbFtqhfVBHqj03EHmoo8cmlzkTvO9YLZ%2BtX1nhkTGu7eijFDAJJQbbbbI1i60Hue1JuaD02m%2Bnwx7%2BdqtcAU5R%2B66RTEAj4vWvLTMPC1n88GOqUBdAzw09k%2FaoWqlF2aDzxRZjutvUtaCqPTqiZ1dzwXf%2BJbrAeaI0UkW1r0zKp9PKSJWGP915fCrXxMNAUe4zjvF82GW0QXI6jeN7xsgnc5cUx%2B9qEWKwjCkEFQ3nPV0aVmthJcZQEDafBd1hJB8zV6mHTHV7U9pDvfjxqw0BlMJ%2BryNs40w1fe1xTJ94BXPHvlRoPQC8JlDM9X%2BdiMiK%2BqCht9NoSx&X-Amz-Signature=4014df0eeff682bc6df9668a09a3b9a7e2d425d104a8e4e738ecfd708f48868d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2TYV74Q%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T203729Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIHfhU%2BoRazZzqXpKUAmnNjA%2Frn0436tdg8beMCCxtAsKAiEA7CbI748cwNHO8Z8lRLqaOECdeflQP1yH4BVOXV7QQkgq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDMOKiuQ6oIGLASnRvyrcAych%2Frby3DVtSyQgaPiKoBnHqjdq53sYv4duOyVwA1VAQD29055AzK28%2FX3OTZX8OR3B6cWrXGwTCayzkJJlCm1vsEBwRtVzLgwsTkSBWb2tVv9kEFsEbWxi4wssDKgoRE%2BavnKZ%2FBNq3CID1NRRWAv6M6TmgDON0xzrYxSs6eLEOB4z4UPYZn0p%2F5Ax5Ueelw5n3EAQsOCvc9E4%2B0lDx57fJCTDRCmu%2FEPb5R3hTEphgqTOnu2k%2F5lvZRIlQPFKnid%2FFh472SQ4MnraSe74C5z%2FGONAu3Q61UkOEdJlbwMWLwmwF27o2EqOSb2wcIY3IrDKPP4NeH%2FAZlZq6TGfgGKDXcf0NosnF%2BJ56dQVk3o5dPnbqhG9hWoWhpW3d5amHbD9qdRF%2BdqHnYtDpeWPmOfW7avbZp%2FbF%2FlWbF%2BFBafbq6Mw6RIpG9GpFpX2QcMWZrjrdSv5alxveIbVjygqXzunNjunH2rVXwwGYyuHT1gpmeHs9r936k%2Fctk%2Btl4QZF7C1cfUAkgFm3NcDXJyUuaQeWbFtqhfVBHqj03EHmoo8cmlzkTvO9YLZ%2BtX1nhkTGu7eijFDAJJQbbbbI1i60Hue1JuaD02m%2Bnwx7%2BdqtcAU5R%2B66RTEAj4vWvLTMPC1n88GOqUBdAzw09k%2FaoWqlF2aDzxRZjutvUtaCqPTqiZ1dzwXf%2BJbrAeaI0UkW1r0zKp9PKSJWGP915fCrXxMNAUe4zjvF82GW0QXI6jeN7xsgnc5cUx%2B9qEWKwjCkEFQ3nPV0aVmthJcZQEDafBd1hJB8zV6mHTHV7U9pDvfjxqw0BlMJ%2BryNs40w1fe1xTJ94BXPHvlRoPQC8JlDM9X%2BdiMiK%2BqCht9NoSx&X-Amz-Signature=f1c6e77473911826f84d92babd979c1ea2f2ab696a48d00889d0f95bc3c48d1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5NUGSDU%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T203721Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIDZhI1zmm6%2BP4%2BbmffQiguuZY20HHfQtCTES0uISQUo%2BAiBTLLjN%2F0mhYxXUyh%2Bts%2Fztc3CipxZbDLEI0Ss9tFe5Bir%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMb3iPN71u98%2FfQ9l%2FKtwDdo%2Fd7BF70OWPQRUrF9iFfCc7Z0SgJYLJ9eh29Mu2kFACdvt57jlcgYmX4m%2BUCgmt3rwn8AhEJ3dNaBtKbu%2FhmUkLPGCjG4oz%2BW708DIX99WXXTVzYJJBx9ZGxghlcKzUQoJ4vhwrvIgkqZiIPFmtxEkf4%2FsulU8YAiTGfyeGg3HLGuv4fVyebbYD17EJTRnpHEqUrf7WCGtf%2BuYVbQTF7hDFOmQeVh0GcG5fUI8%2BrCduABX3sDG%2FIZJrF5yB9aPpvjgmOgXk1xuRyuTp0ChMk5oHC21PelJKSD9IpkWNSDpGdZ%2F%2BwwWzQAuAU1s1X6YLY0%2FxxzhejY0ntkVnuRXacYb34Ynv134LwKuS%2Fb05Li69G1Uu4W4WO%2BqPpCLT940bYXn8JyjVLDpMdfnN8HaVYnbNIOg9TXYVvAJolMCw%2B7h6OOz6feu5uCO23881aJ60a1e0mIuR67OWz11W%2Bp70scDrWSMTfTNgkhPyErw%2BbEpLNrRlGUTpf%2FQz73Cz42Zc%2F5vVxp2BfvGtDllKtW76Un37gW4siy3M4HoN4Fk1%2BAYJabh%2BCWeGLhor2z%2B2h66r4IEYn7ww5QgzVqA4uf2HUQ5uDDwbUxIltjZuulR2ByK%2FvbJvYls05I6j1Xww8LWfzwY6pgFPNPRPtXawzAXxgZe%2FCveUzyPwUdQkF4zdM2g0nCc%2FWpp0vYAGPLGs%2FHE27qyOoEwYiMSVIMBaEYGY6rNSDhJ0N5aYEYt2%2FWarDGfCznFZ579zIFHRImU%2Bezpef6DIFkxWUlbr3nr14065c%2BG17wI6AcpyAZeXGDqxycEAw1zf57037TWwLEICPCKGy3ozKPiHn6NPZh5U9t1X0yxcDySdM7ZEyFw6&X-Amz-Signature=d5b38c3b2400cf6a8a5b8c7c9606b8d055f31f7e797365b1fee9536849a68ed0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2SUAND3%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T203730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCEu6RANTyhhXF9vlxw%2Fn%2BZuPsP0IeoxvFc1TT50Nh4xAIgJqNSKAoC9WAKKLRIzr%2BFjxhqmC%2FbEkzd788CRC2W80wq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDB%2FcMJ4BysJgdOBJMSrcA2QrvNrymKUtmtfppsniqkRMT627UMfpqzejc8oBSeo7Xar3QYPliPJItXT4%2BbEvM%2BHZIxW7ohTndhWmmKX30gGX8u7qoxdY3huuzTtj9B8Bc7t5MinF20S0kv7fGgndzpTYEIsupuYCqVb1n78l94%2FZetOJZrLGg8oUE30ywGbzyPjcxnxakgvUugktnBID3nC8kKmY255mAGujJAwXA2Rh6Xw%2FBh6BzgH9dZada2W%2B13ZiLqGL05MtpiaWqj4BbfDN7T%2FHjcObxbIjpDOR03wjWS4EtJnrUTB2beBY9b7SBxQpBkEGdl%2BSllFrsGbf1CBCFRBqS2VQOaP%2FjSXRwLYC4Q44LdyC4bEQvm8OvmdnxoBx2T5uAUDg%2B%2FdkZZILNe%2BBNokhKBdus7Ib9MCw4jS2faJYrOHFYHeE2Zhq382bbT8m0bGks3LcwU09GHsdEqqyGBgpWTHgguqCe5sVkhQFlPJEl6qNK58Y2%2BnPrKv6PBFkRSD%2FukBh8KEh3xOGqeIo8bBDIw5qBZyRerTPuk6HmEqxqIYdqWqbfuXZKG8Rq5iRlRPfCHLHVhCh2gFw1jCVXyRonBaHaKhLqAskL9W0IsE%2BdoOYPdQPvxQvPVqFD5UpH1DsdBlw8CcTMO21n88GOqUBiVzsq%2F3T8ENLbTApBS6%2F%2FhQLW5FhO6uipANek59UgvtrvaxXteC60eB8LgEKanJiD%2Be35%2Fxz2QRc%2BMZ4aQA7KahDEafPcdN%2FEtOWxPLYgjLp1aNsyyRg9TpcOXDWIP39ztXburWrlOCnG8zQXzn2I%2FpasxB%2BvhhZvwFMdjwaYdUWxjUqkNau9mIqwyIVrFXKpMfFU8tmb%2FODR8cxvMxyLnjGVpQE&X-Amz-Signature=df9db46819af5d432525a44841cf190df53814ff8b3a0ed58249c53e6b0aa78d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2SUAND3%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T203730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCEu6RANTyhhXF9vlxw%2Fn%2BZuPsP0IeoxvFc1TT50Nh4xAIgJqNSKAoC9WAKKLRIzr%2BFjxhqmC%2FbEkzd788CRC2W80wq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDB%2FcMJ4BysJgdOBJMSrcA2QrvNrymKUtmtfppsniqkRMT627UMfpqzejc8oBSeo7Xar3QYPliPJItXT4%2BbEvM%2BHZIxW7ohTndhWmmKX30gGX8u7qoxdY3huuzTtj9B8Bc7t5MinF20S0kv7fGgndzpTYEIsupuYCqVb1n78l94%2FZetOJZrLGg8oUE30ywGbzyPjcxnxakgvUugktnBID3nC8kKmY255mAGujJAwXA2Rh6Xw%2FBh6BzgH9dZada2W%2B13ZiLqGL05MtpiaWqj4BbfDN7T%2FHjcObxbIjpDOR03wjWS4EtJnrUTB2beBY9b7SBxQpBkEGdl%2BSllFrsGbf1CBCFRBqS2VQOaP%2FjSXRwLYC4Q44LdyC4bEQvm8OvmdnxoBx2T5uAUDg%2B%2FdkZZILNe%2BBNokhKBdus7Ib9MCw4jS2faJYrOHFYHeE2Zhq382bbT8m0bGks3LcwU09GHsdEqqyGBgpWTHgguqCe5sVkhQFlPJEl6qNK58Y2%2BnPrKv6PBFkRSD%2FukBh8KEh3xOGqeIo8bBDIw5qBZyRerTPuk6HmEqxqIYdqWqbfuXZKG8Rq5iRlRPfCHLHVhCh2gFw1jCVXyRonBaHaKhLqAskL9W0IsE%2BdoOYPdQPvxQvPVqFD5UpH1DsdBlw8CcTMO21n88GOqUBiVzsq%2F3T8ENLbTApBS6%2F%2FhQLW5FhO6uipANek59UgvtrvaxXteC60eB8LgEKanJiD%2Be35%2Fxz2QRc%2BMZ4aQA7KahDEafPcdN%2FEtOWxPLYgjLp1aNsyyRg9TpcOXDWIP39ztXburWrlOCnG8zQXzn2I%2FpasxB%2BvhhZvwFMdjwaYdUWxjUqkNau9mIqwyIVrFXKpMfFU8tmb%2FODR8cxvMxyLnjGVpQE&X-Amz-Signature=df9db46819af5d432525a44841cf190df53814ff8b3a0ed58249c53e6b0aa78d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466245K6LTV%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T203730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDgIvQLlw0IIqXGh8ToWvA13zQBpA3f3DySTq6F5dJ83AIhANVmJiEFLwv9196eGeU8ooSSwJ%2FsiOHCETo7kbDeFbe%2FKv8DCD0QABoMNjM3NDIzMTgzODA1IgxMdEtoq7TH29Oli%2Fgq3ANTDK0ImHDuWdfl7OdjMyPwonYZkYdYrIwIv%2BLMc3BKrlMCZmXYTSglaeiMo0MKCgmPreS9p%2FNS9Jnx02ouFmUDDr7LxcFNR%2FLZR%2B5ZWpQ0%2BSjiqNxsDz046M8PeVt5nmGNlUiEyx%2F7YUSOmC5XBr%2Feqr3GhHFQzLGHwu4uoN8Pt9rp%2BV64wohl0iSgjFmPLJbLMzAZ20PBSyNlm7zUHoDn4otSdYbpD7yoBmL98eI%2FFXZxvk0LDv7IhTL%2BHunSq0RAeXpAD0bVD7jVdP5IS5lYNmyb0vkYNQhOcsQlQ0G61Tez%2Bm%2FJyLbw%2BtN6nYZe9Tswb%2BVXobjS2r55PVZ9wXtc3DQx27LfbqMvrPC753kF6wjnwHDq17eoSmu%2B18NWg4fGbo0CmKqA%2BTvzomM8Y8ljDgnO2wNsRn9jMGvSRDb91E4zC9NJO3XrqZqmCmN29m9n%2FLf7LESd7QvNpXtCXLPNNPAFpHanrP6n9tswRuVtp%2BqbTYYu1PF38b%2FB8m0iiRniOdPBM8NihBBPjreg1Lo4sRvmnq%2BYjl0Gn1luZWvft5rY31eBZq1%2Bz1rQMEkxvyvzYjjUfeDgnqzFFq%2FgWwHo%2FmNONmKidJih8ah%2FboFA6W%2BTEMbk77r6gD9IsTDSs5%2FPBjqkAeejt4cmZeSgrptu%2BRiwYC3bKRTjUhDjFVykBlooQ8sMF%2F8UsbHYrEitGiQhPB%2FqqffctW%2BYO%2FzwsZckeatj%2FGl3cV41WqJkYj7dgeSUyYxnL46vY%2FnMBBypZ54%2BNVKdMFcRXEt3m8dcDcc%2F2hFh45K1B6dqzVy2SOjp8v9HLNeLYRj0PLIGcodC6ZpS5r%2FluZGAqCcDKDPsIENw3IXvNmpX49C8&X-Amz-Signature=4ea86333804f87ec007c1db174d9b5ae7498c14ca87b3c5846ce28a7669e33b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

