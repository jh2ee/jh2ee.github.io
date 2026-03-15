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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCYI627F%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T141831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAvAwDcv%2BwC8491cZ51ndWUdDrRjmac8C9pqGiducRZrAiAoHT9wl%2BWUxFZJsCuogMEpDftR%2BDmP518fjPTP7BPpXyqIBAi%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMu5lgFZGK3wcCuzrlKtwD7Yluu7rDxdBUom8%2FTk9onLGC4b%2BrtO6lQEn7zfsAhmtwf5rxkdzpGI3sv2dvPlXGBfvSQkmz%2Bt%2FNUd1tAXhdgavV1r%2BS9MIGzOYH%2FTn8f9VJbv047xcVFdlOXYeUnKWQ8Sh2MqdNAjZGHXrUSjzQxl9xpdETIT6gI%2BeYYm5M280sk8qr54O%2BD%2FreEItTV3EKLR4TjphaHQR9gRRCLkzMw0vPy5RJJpTpJyIZQY8tU2TfPkAh9G%2B196M9P5w%2BQIih0u0koTQfj1IzpLe0N6OXS9FVDa4Mv4xDrONICYg0io%2FniicFtHqD6sEcHXd8HJDvQFqRq3YKbDXjONW3JLRfPVIhZVeE4xlu8vnwV%2BYGl90HbNddVy6uqGZNTMB%2Fd87YKMqKkH6dC9Nqvv6O7zCXX2wFgpY7Zrv35tct%2B4TZgMelsUd2RU8VtzJ6jvabuqBfLkaXDjBZveWf8IVSQEuf9QPg0pozhVgjPjIPRqw2cHAAAmwVV4riprI1mC4G7i7oRkndf9WDeVbo2LtP%2Bs2Cd12WHwdu2YnTi1mY%2BCYJS%2FTMfzDUxB5BNE7EruDkC12JneSx6kQDcnX1F6e4sNZPLzEUZ1iZCM1Y5udNISyEhbLyiKjPmz9Ts3wPauYw%2B%2BLazQY6pgEU93KCCCtwvMODQ76sW21ae6siWrMYZqrtOhd4eGPNmERFUuK5P%2B7a8IeoBPOosAfEUkfihU5aI20c3Rrr5yIAZDLZ4tGYnYYUp9BVtF4bup2BdlZy8F1Y5HrTON3qkjHkVYlAs%2FDJr97Cbpwh3pAq7rLc%2FpI5HGE4LeLIVjIz5qWDIpPO9%2Bo2Icwaaqt4foysSNnaSK6EkvCOdDN7EwnaFin9hSby&X-Amz-Signature=7cba3fe05843fc74860b530260a27dc7373cccfaf0f268f3f7cbae1f987b9058&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCYI627F%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T141831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAvAwDcv%2BwC8491cZ51ndWUdDrRjmac8C9pqGiducRZrAiAoHT9wl%2BWUxFZJsCuogMEpDftR%2BDmP518fjPTP7BPpXyqIBAi%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMu5lgFZGK3wcCuzrlKtwD7Yluu7rDxdBUom8%2FTk9onLGC4b%2BrtO6lQEn7zfsAhmtwf5rxkdzpGI3sv2dvPlXGBfvSQkmz%2Bt%2FNUd1tAXhdgavV1r%2BS9MIGzOYH%2FTn8f9VJbv047xcVFdlOXYeUnKWQ8Sh2MqdNAjZGHXrUSjzQxl9xpdETIT6gI%2BeYYm5M280sk8qr54O%2BD%2FreEItTV3EKLR4TjphaHQR9gRRCLkzMw0vPy5RJJpTpJyIZQY8tU2TfPkAh9G%2B196M9P5w%2BQIih0u0koTQfj1IzpLe0N6OXS9FVDa4Mv4xDrONICYg0io%2FniicFtHqD6sEcHXd8HJDvQFqRq3YKbDXjONW3JLRfPVIhZVeE4xlu8vnwV%2BYGl90HbNddVy6uqGZNTMB%2Fd87YKMqKkH6dC9Nqvv6O7zCXX2wFgpY7Zrv35tct%2B4TZgMelsUd2RU8VtzJ6jvabuqBfLkaXDjBZveWf8IVSQEuf9QPg0pozhVgjPjIPRqw2cHAAAmwVV4riprI1mC4G7i7oRkndf9WDeVbo2LtP%2Bs2Cd12WHwdu2YnTi1mY%2BCYJS%2FTMfzDUxB5BNE7EruDkC12JneSx6kQDcnX1F6e4sNZPLzEUZ1iZCM1Y5udNISyEhbLyiKjPmz9Ts3wPauYw%2B%2BLazQY6pgEU93KCCCtwvMODQ76sW21ae6siWrMYZqrtOhd4eGPNmERFUuK5P%2B7a8IeoBPOosAfEUkfihU5aI20c3Rrr5yIAZDLZ4tGYnYYUp9BVtF4bup2BdlZy8F1Y5HrTON3qkjHkVYlAs%2FDJr97Cbpwh3pAq7rLc%2FpI5HGE4LeLIVjIz5qWDIpPO9%2Bo2Icwaaqt4foysSNnaSK6EkvCOdDN7EwnaFin9hSby&X-Amz-Signature=7cba3fe05843fc74860b530260a27dc7373cccfaf0f268f3f7cbae1f987b9058&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IW6FY3Q%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T141831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAaFEX8VSvhBg35yDtT1skOeBKBvtKgXUGMGnkvA0OAjAiEAmwPi1skXczFR6YKluPadU5hulJF8aTTnK773VAcPqp8qiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMg1O23syL3WbDT8ZircA47v9KvsiKWyKFQwYctQsP9dohVxisun7DFJ2tMxiIeWU%2BQ%2BThzYJcZFbYw4RwUNelbksjbTpvOP2VLddnd9A8HdhmdN62IvED2hb3OkuNBzsoceY1MJwijNZ9%2Fmgvq2vSqd11jO%2Fb9XErTcrykihadF3iEcYTpDL9P5Q8%2B%2BXcS32lWE7diKujsrTzdn%2ByRTaIrLfo54kjQtGCqR5NDmH%2FFe198alugUov%2BPFB6gODrNlW2b7%2B5IF%2BUpo3lJnR9VlRqb17AdfafA8psrN2Z3aDN3TMwbKXCN76LFumTHc%2FPB%2BAXjGr93EoFiz4gwkZ9X9MGH%2BzDyjoXYR3XMDzrdA%2FwNJTs3oBCZ6yi8%2F4QPBFFPhkT1pLhMt%2FYfg%2B7D27Gigy2vDuz7DDfL224ShcYjgnlCWe1t5xsuzcC0IBop4ltYR%2F8OKif8swJDnWl9o0fPhabxOrKQr7Zn4S2cQPHwGc5W9aFiD%2B2xLe8L0JTvaQHSpE3q7BxKNEofsxHwlY%2FnanYPQUoBB4XdMQz7N6ZS%2BB7k2zAU3qx0l5Uztt%2F1o94XDK%2FhSY09Gp85kLRup6weE65uEkRnFuBCsI5w7N0SoONhMBAiMZ6MCeDQTKp9MfALE1gqe%2FDJ7jk3GHQmMPzl2s0GOqUB0%2Ffy8pXVQxhxB%2FivQImw8Ckd1MNm45kFcKnTf9wU4hVkpJAPNdh3xvUEbDQFmQv0U7c7FIQCWVDl%2FOTftHMX13WZqmozkhU7GrdOcheRWurHuqbMvwBbQ7Y%2FWtinBHCXvuOVOLzunNfxpEQhWYM4mdCPnrg5qcKyLDu8XXxf45qGTrlENXX46241JAOVRrha9itOCggIWHXnMK%2BJVQNq04d%2F03yJ&X-Amz-Signature=f9f5d6b1204538bf24608a6b69852b9a24dcd237aa7b402a742fded669a0764f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7HDVFMB%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T141834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEuFql%2BCnIGbF73AcMDedolHzsB4EQQQElcWBmzYv6zJAiEAq%2FtODtR%2FlT2c08J%2BeMPuW1iHGw6ytepeUJp4%2FYkC4P8qiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC5tSErQO01B5oqD8SrcAwUmNOW30vn09n78vsx03IhPLmam%2BIbG83Dz9cEAnQg6UsOIogUJ7MPXi4t6ZbP06wut%2Fc3jcRgnOdntHlcTtvhoB9UuhyrDbM1iW2kC4SuRGEHMsSyBxTMTocpU9hKeAa9oMun9kBDNQe2hEvLFAu5iwzLDssSDP3QQ0HK90arhEFMP7SUqe5YWWLqmemI8oOteUHKN%2B%2B3%2F2M7CG%2FEwvCdjM%2B3gV8lpbmbGd4yRWVMtTHoQuw1TSumHrSr3g8dQB8XKENMBh%2FZRbMYlxP%2BZ8HT9T7UFre59%2FOdylUOovlaT1WCqHJj75uka1wM7e2Cbq3uvoPCL4P3u1AKsQclPPPCkei9Z2Mlr5MoWc1kua3Gl3J%2F8vNSMT4FhWt9gOYtGfShN11gq7k%2B8CmSgTcYb8j0I99QM4cyNc%2Fj2PVW9Ir2HaPLjqhW0cUMw4bnUMyPVlL21BSIMfUnVIvRgTKmM6E8gwrfzRWle9riVMgB7knua2jRgzQX3fJpnrOd%2FBv8KmY6y4Rb9qXI4DOXdk9gvCyK5fKCPJPDfhrK6%2FbUk1AaAN7QsROUTsHMUrV50uAkkYdYHQNkN9NlPOQnjPhi9f21QJt%2F385IdmpgRhBvQyc121uswZtAt0p1us8e8MM7j2s0GOqUBRxsK7c5VLi24Ae4g%2F0MXbraKUttfPLerI96oktJu3rgiKPbnRS9E%2B0omRCTwiFjV5Tx7uO9kKYRXTvG0D0A4Ad9%2BJuJUIGIE9vHo8M1eTTzgS07NDjL%2FOKJ5dLv8bxVVZ3xhI39vSWXGjGM8cWqo%2BL8F4Ytqsr5ifuVMiTzZoDXu4jtnht7FuOKPFJH9nL2cpwFRu6%2BSkKHelI26zPV4OxDkjUiM&X-Amz-Signature=6e00b682f23be089b7d0257f0a3ccb7b41c41a3b9eab980937fcbd184da1b957&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7HDVFMB%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T141834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEuFql%2BCnIGbF73AcMDedolHzsB4EQQQElcWBmzYv6zJAiEAq%2FtODtR%2FlT2c08J%2BeMPuW1iHGw6ytepeUJp4%2FYkC4P8qiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC5tSErQO01B5oqD8SrcAwUmNOW30vn09n78vsx03IhPLmam%2BIbG83Dz9cEAnQg6UsOIogUJ7MPXi4t6ZbP06wut%2Fc3jcRgnOdntHlcTtvhoB9UuhyrDbM1iW2kC4SuRGEHMsSyBxTMTocpU9hKeAa9oMun9kBDNQe2hEvLFAu5iwzLDssSDP3QQ0HK90arhEFMP7SUqe5YWWLqmemI8oOteUHKN%2B%2B3%2F2M7CG%2FEwvCdjM%2B3gV8lpbmbGd4yRWVMtTHoQuw1TSumHrSr3g8dQB8XKENMBh%2FZRbMYlxP%2BZ8HT9T7UFre59%2FOdylUOovlaT1WCqHJj75uka1wM7e2Cbq3uvoPCL4P3u1AKsQclPPPCkei9Z2Mlr5MoWc1kua3Gl3J%2F8vNSMT4FhWt9gOYtGfShN11gq7k%2B8CmSgTcYb8j0I99QM4cyNc%2Fj2PVW9Ir2HaPLjqhW0cUMw4bnUMyPVlL21BSIMfUnVIvRgTKmM6E8gwrfzRWle9riVMgB7knua2jRgzQX3fJpnrOd%2FBv8KmY6y4Rb9qXI4DOXdk9gvCyK5fKCPJPDfhrK6%2FbUk1AaAN7QsROUTsHMUrV50uAkkYdYHQNkN9NlPOQnjPhi9f21QJt%2F385IdmpgRhBvQyc121uswZtAt0p1us8e8MM7j2s0GOqUBRxsK7c5VLi24Ae4g%2F0MXbraKUttfPLerI96oktJu3rgiKPbnRS9E%2B0omRCTwiFjV5Tx7uO9kKYRXTvG0D0A4Ad9%2BJuJUIGIE9vHo8M1eTTzgS07NDjL%2FOKJ5dLv8bxVVZ3xhI39vSWXGjGM8cWqo%2BL8F4Ytqsr5ifuVMiTzZoDXu4jtnht7FuOKPFJH9nL2cpwFRu6%2BSkKHelI26zPV4OxDkjUiM&X-Amz-Signature=f5ca0a8f8811b16fb6adec89bc556346c495e687d8bbdf593a0eb8fc4c880e10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKA5N2RE%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T141834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCqBzYIFQ%2FLpcR0B9C7w%2BA57F5N3i3UMWHySQ6OOUWFAQIhAOcVNIrXW6sWz%2B4htzV5OeSRofOavsKaAE%2BVGzNgLEE0KogECL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyd3hk5k6dVs7s9lnIq3AMPOAQFnf9%2BxdGYdYrwOJOrjaHgcHd8jHDCV1A36Mzz78NmSHj1SRMhFv32Fh3nvGfUvaj6g5YPRddsKdQBvN%2FW3AUhuOBOvMufByMduLy%2FJxrS%2Fak2y6YcbO8fr6srMKJpDaXDs%2F8oupv3z9orRJx42iBSZlX6bemFs2hs1zGQ%2B1SQ3nS7IpgVuUZrEaO205SryTKN4w72UDDzkmP5W%2BnP3oJLRRdiuck5TSYIUe9M4%2FQHIYfmPUtdnyPjaM5locWNrNS133UA6LiaAKQpi9f27IVbBtxYsgPlTnuoXku159jGHPjQjfnLwdK31QOax54Wm%2FEXystZYxZjdS3qevVuISIixUiZ9J5sIJl5lOiIXz6yiDmwEcm5FJ2%2F5REtDR5D9ug06JUHSXUuwHqnCsm3p49mBHbDL8rACzDGvyMdhIoa9%2Fcj9ybM7gh%2B78jCC4%2FN1KUJfKUoScdTmR8LKliEzH5J7zniragiLf1C0KNV75hG826QCk7fDDa4BBISnbOO2zoZ6Q6oeIhqdWy6DqTQGPkkZy9P%2BQzZ8OiETLBYJn7BQ97e07P5tKZ4nkgIwz0ZzB9ORzWENzw3xbnGT0wNpZuMt0QsM7MW5RoyJ3tSrm6rT7oDVS20O7xOmDCF5drNBjqkAaQvQAfFLyY47JNERwxnYtV5%2FmDxmO9kxDCXO00CGRWFitWamGP9uKxgU0oIjY0WsB9NCXYahdimz%2BOO%2F96M50TvgezSbOsyXjeh3XmsdtmitsT2O7nF2HXWs%2FSdrjtWmBIl68GrrON0KETWzbIwo5I4lGXxcCmzaR%2Bz0ttlR5ighGlUF%2FCjq03O1OYEqrL6%2FjLImZ42Y76Xn2TTCDS0oQpSlZT%2F&X-Amz-Signature=639a1c2b31f869fe6e0e8cea6ceaca078522676ea53f34ce63c5ee60986e90ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666B5YGQMP%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T141835Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIECTRY1eZ2%2Fff9wTu72bzBQVp8Y%2B0AwldhHIxqAbpN4jAiEAum5Jb%2FVGjDy6uOjAf2qODWXQym4zjvpYFqnYbUfQYPEqiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN045AZI7jnRu9gkGyrcA3ZWoZoZrL7B5DiS9UBVOG0RenqIff1x%2FQ3JzCOTI3oxADO89agqPiw0QtZKz%2BkPAy%2Fb28em4C0HnMkB4gn9WBSL2U0iNXzV3GAflIUIBzdC28y73W3Cm8e8TW%2Fxn4daVTuxocvS9bg9lH5Oo2IGQ%2FQ20vYbqvqbJu%2FLViaY3UPGoW1lRqgQi2%2FrWXSdOTK6Zcj5LVgSDRFa%2Fpf1WEkvW2EspDsqnI6Gstwd3z6kh8FmBFafXr9be%2Fj5b%2FYy5SskxgX5dYo9w%2Fnuif7raZSwEu%2BVb%2Fudb%2F6wWf5Rqj3%2F3pQAsX5ffKF3KGjfVKmUcy4%2FORN1bhI9CdMjXPifa6u7b19UFKMB19yFIDvCQiDf4zcXcrh71cXe%2Br1lPkqs8VIOEvu4%2FnsY44QNjwfDQ73VT4Zwmvi%2FVu4ZtzSjiQXbDPw7Z0ELIZYkUktKPPIBBUK%2BGImqrmLIVlJ630IQJPf6RArWuPt%2FREsi2af0E4MWOg9XuGLZFULB8Bbw9JzSN%2BGR9E%2BwzM%2BZuGKErmIE%2FyiOBXtWAyr7%2FZg82fkN7rmNQy8RhL3mf8SJN%2FbsSEWxIeZogFpfkZ5zTRZdTudkjuyEOKBpYSdAYLE3KgkDfmD%2BFUkbbMLha4OJAPtQuzqrMPni2s0GOqUB2GSdzGeBvn%2FpbKa9BrT1u2EOxpviXN97Lyiud3mHBnC%2BtF10m1SxIzMTeF1GRRSVWmfKrd8AuyYlPl55Xu7b5gK8DFCOwe173dCeYHN0grgUMbzEMVA9VVqzzKZqBUpjOQby5REoBr%2FnkiJBpvnFfJI3XU80nEM%2Bpzpw5Lm3F5ueWeQHMXnDdHAnBvkCrDQDQF6O%2F9tGWHPjMjmmxLVNUZUG6Z0l&X-Amz-Signature=f3b7deafca55b06da71523f069863721e75c22e6fe5224b434ec604339a162b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNHPUUJQ%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T141835Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBxM3LWnkLmLbNKUIJRfkw8ZCff4YcqHvgyEFPtBLHudAiAZ2kNwZWW8nj2rRx6Fwk2bcZm1YQO7D2uVMbWMtN1hfSqIBAi%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNyQIWPsKRbE6p2i%2BKtwDgvQ97OoW39vY%2Bp27tQFSRcJThnYD1qh6RQHJJ5n%2FwKyRmph8KHhilakBd%2BQ1F%2BSI%2BgfqmmXJc0xrpJUbBppMVpf%2BzPZpDGymcSfmtPJOlACFO4zuNg2g9zUjsVDzxL81JYbpi9pb3AUcc%2Buvb%2B1Hb%2Fq2zY7adquWGxVikm%2BTaPbcf6xu7etmCtWnwLkGpSplKp7J1GuFFseaI3YYqiQlfZgHrBksS%2BTY5ktBbtIuqbYmfxCy6kQjjA0AHCKT7HHegvh2fFwDBwPwdfI8%2FiXVL8Xvl%2FsY6Yk07qbN0nsc44mRfqag03cq049yim301NHPe4UfAoqF2ORBZf%2FE85rVyu1vg7bpMECJrU78CKwQMzJLyOHhGbSetHWO2lcjdQfxPdHht88YlIlbSMlx%2BgSETV%2FIJ78nhHHnAAiIZpXXdgvLBH9xYn2kWNFeOFCh%2BYp%2BuIYsID3va5mMergCBKEkc5RRutpcBIZphR1YcwHITtudW3YT3vJBrv%2FxvqwB%2B1wNsezA1kJaFwAnYjYHl6z%2Fl5pt3fY%2B6JkNniu57Fa%2FCl5qIcHv%2FMmsCI6e6GHdKzC7qro8YJYidRN0Jpjd131jugDy9j21wJxisefTZya2UmURoNjqUaBuKZfbLigwit%2FazQY6pgHZIJ4F0AWxbIdkx5lbwqauuA%2BFnDMgYDmpP%2B9NKBpUfjmgdU7hm8d258ptcuSQhxp6OxeDsCIkhvAU%2BI3Y1rCXDBIvRI8jYIUTywgPQP1EfjA3vdObGKyTT9ax9K62ntE1Dzg185vLnQizfNFawxkBXtWnFRTAgWKcVAvYCem4lxBdnEZeOqbWsyj69FcVnL04Q7FHC9OGFf8G0oFEBwXOP3sxUL3A&X-Amz-Signature=459e73904af4507db6de30959553b18d5f3f5c8ca09d576f682394115a578843&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXEV6OYH%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T141836Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCbkrN%2FqUAmFSYt6XE1pMOtMBs0ElPlqY7e1pwjUUQwbQIhALyq%2Fcdp1O%2B0WUWPlHUJ4tO1a2N9q6g63AeeTv25NZT%2BKogECL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzy0s0eXbwvq3RazT0q3AP%2BrfOyXSZdmm1Sw20MW5YiLuQ9OEuxsw0OaTgeZaCJU9pQHtJkk%2FCUYphArQANE9ziP2PB%2B%2BARflal2MEsao5qBkRYJN5SSkette4COV2oDRFcrB2gYS1g5OWMhX9AG4MemTkKuIlh1sfp1aht6hsjoYAKRL%2BUPFeh74u1tKEtKUkI333MDM8tvbrDMZcyI13v22TGL8Uklg8nNpM%2Bc25lummkrDzvf53e65gfkCdYsXH8rHtzpj7cv8V2YuwUSCE0DdkGPJ6wx3L21uFRWywljW%2BZkKtznP8P4W52XdfTtf%2B23k7P%2FgGgaIwhut45IAEvzbb1gQEEIjsDnXy%2BRHkbrJLNd%2BxmO5bWjUEe4xdDmZieIHLrj296Gp1qd2ZLQ9wlpwIkyMmHpjFMdtb4XA7iHpHJPKXXJ88A6cDnwjm%2FMu0hyMCPXIm2QJdnPOS198z2TaA7E1JcPIIKeFyF6E%2FnOJqzJn6LcRoA3j3LMObzuBGSB1VP2qgFlqgNfq2ChoSURf%2BCKZvz94ss4bzObKJ1JlG424vy3azuaWyQz3RQ3sz3PFBqPnVAxhXPm2GIlg718AT4fBN2nOy48OR%2FmT5yaCBgHssNJeiJd9xY%2FztyOnrJb4z1WB28W23y0DCI3trNBjqkAR3sf958KyvdEsBWs8SxMUJwN38y51KVmnlW6yAx5S7J8U%2BzRKb8Ns8PTpO8wMALyEzc7XwVvuAUfE61Dnyv0Wb%2BmUret83hsafnbZFEX7X1549aS1ez62sKNCl5fZ39mC0FDyMv3xtu%2FcZSl3iUmC%2Fob9t5ZH51F59gUqiAz6%2FQqbfEMvJXuqRfAatTYgXHcZ45TiXbO%2BJ1Kr9nx2fTDjGzQ3A0&X-Amz-Signature=99fdc3188ce9a5ba21b21a26d7d06859d8d94f452fcd2cdfac5271324a6cf16c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXEV6OYH%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T141836Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCbkrN%2FqUAmFSYt6XE1pMOtMBs0ElPlqY7e1pwjUUQwbQIhALyq%2Fcdp1O%2B0WUWPlHUJ4tO1a2N9q6g63AeeTv25NZT%2BKogECL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzy0s0eXbwvq3RazT0q3AP%2BrfOyXSZdmm1Sw20MW5YiLuQ9OEuxsw0OaTgeZaCJU9pQHtJkk%2FCUYphArQANE9ziP2PB%2B%2BARflal2MEsao5qBkRYJN5SSkette4COV2oDRFcrB2gYS1g5OWMhX9AG4MemTkKuIlh1sfp1aht6hsjoYAKRL%2BUPFeh74u1tKEtKUkI333MDM8tvbrDMZcyI13v22TGL8Uklg8nNpM%2Bc25lummkrDzvf53e65gfkCdYsXH8rHtzpj7cv8V2YuwUSCE0DdkGPJ6wx3L21uFRWywljW%2BZkKtznP8P4W52XdfTtf%2B23k7P%2FgGgaIwhut45IAEvzbb1gQEEIjsDnXy%2BRHkbrJLNd%2BxmO5bWjUEe4xdDmZieIHLrj296Gp1qd2ZLQ9wlpwIkyMmHpjFMdtb4XA7iHpHJPKXXJ88A6cDnwjm%2FMu0hyMCPXIm2QJdnPOS198z2TaA7E1JcPIIKeFyF6E%2FnOJqzJn6LcRoA3j3LMObzuBGSB1VP2qgFlqgNfq2ChoSURf%2BCKZvz94ss4bzObKJ1JlG424vy3azuaWyQz3RQ3sz3PFBqPnVAxhXPm2GIlg718AT4fBN2nOy48OR%2FmT5yaCBgHssNJeiJd9xY%2FztyOnrJb4z1WB28W23y0DCI3trNBjqkAR3sf958KyvdEsBWs8SxMUJwN38y51KVmnlW6yAx5S7J8U%2BzRKb8Ns8PTpO8wMALyEzc7XwVvuAUfE61Dnyv0Wb%2BmUret83hsafnbZFEX7X1549aS1ez62sKNCl5fZ39mC0FDyMv3xtu%2FcZSl3iUmC%2Fob9t5ZH51F59gUqiAz6%2FQqbfEMvJXuqRfAatTYgXHcZ45TiXbO%2BJ1Kr9nx2fTDjGzQ3A0&X-Amz-Signature=f16fe646e4f6a1d1b92e2b377a5a75000a48c6bd7ab6f5788a30531f021a0963&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIQCPPCP%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T141830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDX6QovaXnHCt33dvGcjFxZurHfH5UKB01n08TgF9x5hQIhAOkWxSN%2F54IgNkGM4bhLIKTalggM0BHfagP3uPdaJ874KogECL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxhlGGROFme64LTK84q3AOml9owYAdAEylXanOFSsz3L8wYv1V2tZweOnNxLoCFJWHaPXrrPCBRjpuiMbmFzsh8vMELEaHUrsW12v33wweJfacElYCg%2FdfDfvbJBURFroOJv%2F%2BpEMCF3j3yQGWHd5mDbDb9vH%2Bba2eojRKndX8WcDm%2BHiziMTzAe1c2%2F85bkOwkRMzuvctNeO3WnC8DwpBXkD3fA5LINb6JWMBuzoCzu3bsOcKB5ZeAiUJvD5wIyJDIZ2xfWiRYxx0Aa4byzB4yyAHtf4801ua%2BWfOhX3DekiKFxX2ikguvKnFGpcpXbDO0eZOS4Lbf%2BeFYSFRXzQOJqCU8tW%2BY%2B7zQrArU7r9JgZuivK%2BtQLGDOQuMtJV3GVGsqFXBu%2BL3%2BDlTzwJpqNHM%2Bun%2Fy1eLXb2pxJV96%2Fm8okwcZUJ9VG8q%2F1SYKarBHuypKSngRGaJ7xhvWP67Zx7MQG%2BxHoZ9o6JWayPxmcxpstGSs2wGkxPNK4xc3z1KELaQpioAK2zmX%2BqAYP%2BOhY1qpIuCqnomGnUsK2XoglMRBHeLQL8NQ%2FUi7pa%2B6fQ3NFaHPtukrD4jDHje6Ae1v5jM2iPn7ERwlHytVCE%2B2jjj1w%2FWyWuo70DmQf6Sr%2FJrbMGqAfDB58MK4wEzhzC349rNBjqkAetSKslaiiyqOEKTlfXujxUKe4%2FvFH48JXih62qeVO6pr4u25vpzkhYGERX5Wd3r4V%2FxMuxfePvxkM1dl7ubENOiPD93%2FQZmXoYXKWrNhoNxLLxRz6bIAyWdVQxo9fAy9D8hvxiPdAFExpyVAfcHjSbg4vLMUC4a2gYPn8gcKbAbADpztm%2FMiqFnk18jw9g3hOJjx7LY8Oe2gA40tTwxQRnvuaFT&X-Amz-Signature=6fb51ef98a8739294bae2d13721bf988cd1dc9a59f02d265b70d74baa96e4399&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5SXV3Y2%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T141838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCYCzdAroj%2Bo2g1VAfPoe8eTZtfkP6YRFNyCQMZzMfIEQIhALyKhl4zb3%2BEtUpqqNRinaQzEujdYqyz6pThpb9BRbR4KogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxH1OM2ERqE54wy2R0q3APvTcdjT5TU7b6nSKFBvEvWt9s1IsB80adqW9fgwnbIBmiyeaquUTEHaTWufKedsiJoqDrOXe7MdRklA2%2BEuClQ1aPX42e%2BXt0C3zLKbyAqnDD683SpPWU1Zy8d1mnJD9SjfoGwARXg32s0wvcg8vigqZpUKGjGj2fUR1TZxHpUNPoHSkRCHDtI2JLbYaG5z3Lx3X0oY1oqb6B9TG7%2Fa%2FgxBsOs5guQ3jCFa5wSdkrkjyRiqYlc7wpEZjsYu%2B46LJZuoUtOXrxC8T3k6xKAoQ4r55dzlsWfXG3YXLWhwvhUGkd0L3F6eSJwDhIQhhJ4fCLbzYY8jVVGtsc9%2Fv6m08jACoT5Q8vjP%2BAYzal4CZIeR6kqmHOB4cAEGD98tyRd%2BG4WFl4xIzjf7h%2B4qkiz8KRG3Cn4pSp7RU9g9RKDABQbnQH%2B32z0joWetfcDidNzwgumtnJcDbfhq5gPt7Ro23V1AsIk42gmnoG06x0aHI8ONXwFuGsgzedIGJ8bqt%2BCNGBYcC0LU6e43YHM%2BjKlpsk1DXFU6imPk7psJHHxcUY%2FDdQ706mUuosB5nJ83pbrTyExhz9gA60zI%2FryC5JUqlI83Zj4WqdYyoCrjBZpme5R5YFnNOrWC%2Bg7kMT2njCxo9rNBjqkATkysnIoWI2BIWE7NA7gCPwdrl1yvHh2s5Dzvam%2Fc95mYypVsVQn%2FEmJXL6l%2B4Ia04v%2Bxp6rZe6YCmNwL0LYdgJ2ECX%2FipbPktM2AZN%2FPvq%2FzH%2BzPVSo5ryWe5CWq2EvSY5SAMXjmzHkb19mx69EXFSa2DW89zx23RYxfxRTnBcgzokN70c3PhL26beOAHQtJNoafLapq8%2FkeSbR9bBWh3OurMh5&X-Amz-Signature=daf958a21c3e7e2c41508380b293190606ed0cde8ccb22b0dd9e0cd9e191768e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5SXV3Y2%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T141838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCYCzdAroj%2Bo2g1VAfPoe8eTZtfkP6YRFNyCQMZzMfIEQIhALyKhl4zb3%2BEtUpqqNRinaQzEujdYqyz6pThpb9BRbR4KogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxH1OM2ERqE54wy2R0q3APvTcdjT5TU7b6nSKFBvEvWt9s1IsB80adqW9fgwnbIBmiyeaquUTEHaTWufKedsiJoqDrOXe7MdRklA2%2BEuClQ1aPX42e%2BXt0C3zLKbyAqnDD683SpPWU1Zy8d1mnJD9SjfoGwARXg32s0wvcg8vigqZpUKGjGj2fUR1TZxHpUNPoHSkRCHDtI2JLbYaG5z3Lx3X0oY1oqb6B9TG7%2Fa%2FgxBsOs5guQ3jCFa5wSdkrkjyRiqYlc7wpEZjsYu%2B46LJZuoUtOXrxC8T3k6xKAoQ4r55dzlsWfXG3YXLWhwvhUGkd0L3F6eSJwDhIQhhJ4fCLbzYY8jVVGtsc9%2Fv6m08jACoT5Q8vjP%2BAYzal4CZIeR6kqmHOB4cAEGD98tyRd%2BG4WFl4xIzjf7h%2B4qkiz8KRG3Cn4pSp7RU9g9RKDABQbnQH%2B32z0joWetfcDidNzwgumtnJcDbfhq5gPt7Ro23V1AsIk42gmnoG06x0aHI8ONXwFuGsgzedIGJ8bqt%2BCNGBYcC0LU6e43YHM%2BjKlpsk1DXFU6imPk7psJHHxcUY%2FDdQ706mUuosB5nJ83pbrTyExhz9gA60zI%2FryC5JUqlI83Zj4WqdYyoCrjBZpme5R5YFnNOrWC%2Bg7kMT2njCxo9rNBjqkATkysnIoWI2BIWE7NA7gCPwdrl1yvHh2s5Dzvam%2Fc95mYypVsVQn%2FEmJXL6l%2B4Ia04v%2Bxp6rZe6YCmNwL0LYdgJ2ECX%2FipbPktM2AZN%2FPvq%2FzH%2BzPVSo5ryWe5CWq2EvSY5SAMXjmzHkb19mx69EXFSa2DW89zx23RYxfxRTnBcgzokN70c3PhL26beOAHQtJNoafLapq8%2FkeSbR9bBWh3OurMh5&X-Amz-Signature=daf958a21c3e7e2c41508380b293190606ed0cde8ccb22b0dd9e0cd9e191768e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSC2RPOZ%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T141838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDmg152zgNz7dfqwNAJ%2BDLqVfvBhg7AEX%2BboxEVZQAJdwIgH60JU6pL%2BFPdISorOnlL84MKc4rhhnOfM9SVnDTCh%2BwqiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEu4mtoOpL9PZZuxkircA9ehji%2Bd0yKlxFbGX7NA%2FiKOgqo1qFalnRHCEv%2BPu6lGCrdCSGB0t%2FolfwOvhUDLJCNTH6hmyVPRpXs6PgUrxwAZv6dCUhg80%2FA15YGC9oHZ0azJYEe4E4RdNTGONxwJ1PAVowkWA0lRDYBpjgzdzVSkRpHUSgIiaW5fDLeQn8yonXclIIJWPiuC3to7Ljc0cxXVNGx9L7NaJ6nFa5pQZ40UFPikm6uMZm8gyTbHHuGkQ%2FLMvd%2BHnYdEMiLztcRzyq%2F4VFbdSG6LVauA%2FV7u6gRteYnrJijBliVUc02WSgWs8%2FFxQbeLX0iHLfxKP06cI2vhHxGIDO3JFXL1pzIhgT7cYmzTgwVxijB1J7HoVqqeq6OfGA%2B09UxHDYBGV1FilY9%2BNC%2Fd9AhJOyYGlQ6TcXT%2BEgX0lgCg70vTNLOawU%2Bs4a1GdJv5h6UMM1uzRBcC6cbWiHs6u2hpc%2FEAEfUAcs8AtRbk3%2BX%2FEounX8gVLQvmrdlVqBTRdT0Q75JU7JXQZeL3NeE%2FCo6X%2B34vCdn1mbLEqVRxJBYjQ2TU0Ag81VaI580XdGrJcGcM5P8b5Q3v56cXfXvdDwZwyDI%2BEKBGticGY6%2BFFYwHD2B50WcoHq9WpiHf8WSX0nWsfX11MJTj2s0GOqUBjv0yySXJGH3Vx41xOW7dsVimRNvmSUp65w8LBajImOp5zqrH235C8SGT938u91ydmcQiDAKmxGuhP0ZfX2wxzk0RrB1xIWazgRCKXBUymACzghP6FmO%2FIADKmXQ6IQhs2CEOpiYz6g8FHa44%2BNvbbAw7CGhTEhQWxMOe3J8Gd0KN%2FW0GkbVX7jPpptfPh9AtXEC%2FUKeor5CYIS%2Bg0xbbSutTYEQy&X-Amz-Signature=99b5ede70ab14e5b4f06e91e7c6e7f6bf5b2bf1eff3a2f0738a85687064d92a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

