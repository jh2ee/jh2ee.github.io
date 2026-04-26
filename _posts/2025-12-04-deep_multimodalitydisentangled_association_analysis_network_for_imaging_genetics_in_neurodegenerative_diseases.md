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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKK7PU3X%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T135629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDTGsaxeXv8VS82A3HsGkwtVp6L3PQc9J%2F8p3V6qZiRDAiBCXN7Q1%2BPCUl42joC1K6%2FF4he8jVpJkigAm1V5ATNU8CqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZDy9EQv8wk4LRYRWKtwDDrYKU3c63c6sWz6llmfmmnjyyLqq%2BCHzDOBqFlPGhAsPqfapzlfwDiNuT36JVMKjgOqumVT5xAimnqsZBDRBWIlh4vRTxbvYdmdeD6zT1w%2Fqk6dg4X2%2F8u4kxhHoGk1xI5xSDDe2bY20Bs%2F0hzp32YXiYZCfwWqiV8mpCJxvh7isogqM8Gy6dlLhoaFbxTRaeznlottCgh2c%2BqwzzohmqW%2F9oEkbLfSrXmQ6pvH4wQWXaXVwuykQix5EFwFDOTyZ6%2FV05U1yEm7YyWVNDAlJPtX7Zg6jMxvbZTuqYvOkrumV%2BmNhU7nqjKz%2FLxP4arETsbmo1EvNJgNyExssh%2FHwf%2FtXS%2BgmmmZrr67Xm9z52S1PaX5H%2BPKUvi2YBVelrx%2Bz4q8R54MrRUQoSzhub6QqZQ8%2FahazywfMRmKWxz6cQKQyZwPuUkU4ytbWaHBvdnjyZ3ziItPpiNrtrKIiCUzUY7bmQr4j5iUdPgzmRWNgyyXqXn%2BQy1Ra975DKw4r3oQnuHQroQ48cAkjyj7MbV3Q%2B4RpSbCSoZKyGOqf%2FmQfpBlMSu4B9gN5Nv%2BBgm0VEHooz2Sovx3OkTTAIB5wnaIakUVqWfYJ8ymSf82EvnUKKPZUWafqOhpUKaOoy6Mwnvy3zwY6pgEkNMuM5vftNPisB6Sb2o6QYGDus4pfb0H%2B%2B7jPMGAQ47WZpqedLY%2FrgY60QBxrz1hDc%2Fiw2fuk7mBj1alaBpCo7MuhBlwhkjdWflQhZLIA290QNPP4OzVPGHHLRIVm2dAuCDk2EFucJ5nP23j5WcSghDatiRWWoFUf%2F6nbncMn7BJlhQxXo5v4XKZjTjpqv5n%2BA%2B1dp%2Bbkd1gdy70PvB9xSfX28VGl&X-Amz-Signature=28e6be2131a57c35ac2e0476bbf90192f466476e2cf5641ce1bff11db099f171&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKK7PU3X%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T135629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDTGsaxeXv8VS82A3HsGkwtVp6L3PQc9J%2F8p3V6qZiRDAiBCXN7Q1%2BPCUl42joC1K6%2FF4he8jVpJkigAm1V5ATNU8CqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZDy9EQv8wk4LRYRWKtwDDrYKU3c63c6sWz6llmfmmnjyyLqq%2BCHzDOBqFlPGhAsPqfapzlfwDiNuT36JVMKjgOqumVT5xAimnqsZBDRBWIlh4vRTxbvYdmdeD6zT1w%2Fqk6dg4X2%2F8u4kxhHoGk1xI5xSDDe2bY20Bs%2F0hzp32YXiYZCfwWqiV8mpCJxvh7isogqM8Gy6dlLhoaFbxTRaeznlottCgh2c%2BqwzzohmqW%2F9oEkbLfSrXmQ6pvH4wQWXaXVwuykQix5EFwFDOTyZ6%2FV05U1yEm7YyWVNDAlJPtX7Zg6jMxvbZTuqYvOkrumV%2BmNhU7nqjKz%2FLxP4arETsbmo1EvNJgNyExssh%2FHwf%2FtXS%2BgmmmZrr67Xm9z52S1PaX5H%2BPKUvi2YBVelrx%2Bz4q8R54MrRUQoSzhub6QqZQ8%2FahazywfMRmKWxz6cQKQyZwPuUkU4ytbWaHBvdnjyZ3ziItPpiNrtrKIiCUzUY7bmQr4j5iUdPgzmRWNgyyXqXn%2BQy1Ra975DKw4r3oQnuHQroQ48cAkjyj7MbV3Q%2B4RpSbCSoZKyGOqf%2FmQfpBlMSu4B9gN5Nv%2BBgm0VEHooz2Sovx3OkTTAIB5wnaIakUVqWfYJ8ymSf82EvnUKKPZUWafqOhpUKaOoy6Mwnvy3zwY6pgEkNMuM5vftNPisB6Sb2o6QYGDus4pfb0H%2B%2B7jPMGAQ47WZpqedLY%2FrgY60QBxrz1hDc%2Fiw2fuk7mBj1alaBpCo7MuhBlwhkjdWflQhZLIA290QNPP4OzVPGHHLRIVm2dAuCDk2EFucJ5nP23j5WcSghDatiRWWoFUf%2F6nbncMn7BJlhQxXo5v4XKZjTjpqv5n%2BA%2B1dp%2Bbkd1gdy70PvB9xSfX28VGl&X-Amz-Signature=28e6be2131a57c35ac2e0476bbf90192f466476e2cf5641ce1bff11db099f171&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7WH2ULU%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T135630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBB17bS0JLPbChiEiTrZxSkgHDrerqVeCsjBuIZXIqOaAiEAgGUtVm7YJgJ%2BH7HLCD8HjFge4Boy53orZWsUbjRyYUwqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI8dcKl4MApLuQAlhircA%2FfOwlmu5EtI1GPgcjYpoAwB5WxE9pywx3%2FjRWWW3ExI9gA1xHQwNf%2FQDmSo3LUqZaNV0AGK34CVMY0exjRcE6%2BPWiULShnV%2FjV%2Fn%2FbhdJouM1lesWLbnK9d%2BWAd1K2ik1X5KvxbyGE80WeiV00%2Bx%2F7U%2BA3TpNnzkgIrKnSnyZzw89dYhUi0nDNMqnThen%2BhsaTBaxuKFY%2B2uohOlOLELzOH%2BCPTbq4LU1YsctPC%2B3MC%2FcYwhgmqtzWBevZYBV05TpefBKjVwJtzMdozRjdNoN9R%2F47ZbrteLiUIIfcXU%2F0NSy5MJqxtNNSv%2B8wTAg9i6YClHOZODiWUJSZoyqJWBggdoRjZWcN0qMwPxuoqdYeAPxUtmLoZmvVyx7yIaN3KIXrUSiCx4xHPuWrFNljz%2Fln2LRgL9wl6ui%2BA2rkUkw0bSQvNSx2PExT%2FlBi1k90loNLqu%2Fsg72XcN4F9kIikkunraTFsk49F7IN97ZDhljgSa5T5aA9tGFS3yTdPBpc9atk6FclOwyNm4lABe%2FPGO8TXLu9iLejDYv3VlUESC%2B7I9Vhi7wyycddip6MRwG5VY%2F2nC%2Fai5nuE%2Fum2ppZP3YsLQaOQziRE7GU8pzhri1oualTc7tCwl1dkHR92ML3%2Ft88GOqUBeMd%2BC7%2B1lA%2FheW5pMRqG%2BfaCnj8JJ%2FtIRPk9%2BjuQRVEPLDAbo6PSeI5NMqJU1FecCNqKHeAngcIBruXQDe1PngDL8X84kGo92SRsvELZ5Bd8cjGD5Q2Ui3TcagHx3SXrHlNN9cXOA7EbE26JI06BN1qFkOWZDVNBWFp2SappDx5tY%2FndxnPWB3aB%2FHD0lS%2BJdXow0cWoZPUqyi0buYo2TeYQhXg9&X-Amz-Signature=08a2f83362562bcdf8f34748e5cec2254a05a737014faea56fb98682b6c8decb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664R2EYDH3%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T135631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC58wvLpVGD18OL8D5V8kmaWfkmTH467BJUswCteCmKTAIgNV%2BCZIVwY7IqxJsybHct%2B46h1fC8jHz4mXwS0Q3brkwqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBJila9IyYGMDCi9nircA4%2FJOdE1RGN9cA2MBFPeYHkOMez4%2FGNcMat70DmiBorEiuuwKq%2BBVJgklWEYm2KKgEPf62%2Bh0xy1%2B7vhlMEZlIEWMH0JMYNlWNbTikrchvWpztITdIQ%2FyxF1eaaAs42w%2FzWQfDwH2GqjhDzhdALbH1P9tD0qEsKklQ1i1YwVCPaIxMMrTZaXMm4M0%2FrTb0NHFXyzKtXvSJtCKdB0q28bon0Yo3ueOfQMTTqL%2Fvpe9cqUBZtnS1VcBVp9sMqMrB0T9lzYffj8N1amUq88E9%2BmaQ%2BmLtN4whJYld15hZjFwcdzvMG0tKvgy8b9%2BgH0W3J09dSV5P%2FV4mUVzcOICv5QALXIIfUheWUzJUCfSWvdfNpNu0J1dr0jgeCjoZvtAk2EYZCEF%2BBnS9yp70PvebLGG5Zm9AC1F0UWiGVnQSKw5%2BUmFgTRfCSUyzZ9xYJxb1Sluj7V0ZoWBW%2B7Sh0n4Ot3xZUQajqFwcA5YV2ZlGAMaNf8SYawH8UPHXB%2BXCm9qTVOHW%2FHlGcLwcGeVFJtI3%2F2yK0oRr7caTLU1AJE3oZeRiutQLf9if1hpnx7Bg6b4N%2BPXYMXWObgxUmdVD1S5gmo9%2BeAiiRiQ96YnrcA5DRL%2BsXr8E7%2B1Vge1hn%2B74TUMOT%2Ft88GOqUBDYB1DxnSbbsB01QycFprVFTHGJy%2BPHwaZhb3XA9%2FcEIG277JKWOfbHxfSySPAvvuc4w6x7Jb6SYjrLwCtSJ3sO0ifHvC%2FTLnUtR9ICrqqP%2BAyatmkxM1UteTlyR%2BynzmUTP9GJ576K7UUoUSu4qPYbcqtg4jH9wYKp%2B%2Bidf2xwMw3eR%2BUnMUfSOKzsBWSEyihqCHAPu%2FWWoYvwAYKfUAbup9qwNs&X-Amz-Signature=5eeb8a1ffdd1c42467951576fba6026e2ea4e8b257f150706ee930b9fd39815c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664R2EYDH3%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T135631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC58wvLpVGD18OL8D5V8kmaWfkmTH467BJUswCteCmKTAIgNV%2BCZIVwY7IqxJsybHct%2B46h1fC8jHz4mXwS0Q3brkwqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBJila9IyYGMDCi9nircA4%2FJOdE1RGN9cA2MBFPeYHkOMez4%2FGNcMat70DmiBorEiuuwKq%2BBVJgklWEYm2KKgEPf62%2Bh0xy1%2B7vhlMEZlIEWMH0JMYNlWNbTikrchvWpztITdIQ%2FyxF1eaaAs42w%2FzWQfDwH2GqjhDzhdALbH1P9tD0qEsKklQ1i1YwVCPaIxMMrTZaXMm4M0%2FrTb0NHFXyzKtXvSJtCKdB0q28bon0Yo3ueOfQMTTqL%2Fvpe9cqUBZtnS1VcBVp9sMqMrB0T9lzYffj8N1amUq88E9%2BmaQ%2BmLtN4whJYld15hZjFwcdzvMG0tKvgy8b9%2BgH0W3J09dSV5P%2FV4mUVzcOICv5QALXIIfUheWUzJUCfSWvdfNpNu0J1dr0jgeCjoZvtAk2EYZCEF%2BBnS9yp70PvebLGG5Zm9AC1F0UWiGVnQSKw5%2BUmFgTRfCSUyzZ9xYJxb1Sluj7V0ZoWBW%2B7Sh0n4Ot3xZUQajqFwcA5YV2ZlGAMaNf8SYawH8UPHXB%2BXCm9qTVOHW%2FHlGcLwcGeVFJtI3%2F2yK0oRr7caTLU1AJE3oZeRiutQLf9if1hpnx7Bg6b4N%2BPXYMXWObgxUmdVD1S5gmo9%2BeAiiRiQ96YnrcA5DRL%2BsXr8E7%2B1Vge1hn%2B74TUMOT%2Ft88GOqUBDYB1DxnSbbsB01QycFprVFTHGJy%2BPHwaZhb3XA9%2FcEIG277JKWOfbHxfSySPAvvuc4w6x7Jb6SYjrLwCtSJ3sO0ifHvC%2FTLnUtR9ICrqqP%2BAyatmkxM1UteTlyR%2BynzmUTP9GJ576K7UUoUSu4qPYbcqtg4jH9wYKp%2B%2Bidf2xwMw3eR%2BUnMUfSOKzsBWSEyihqCHAPu%2FWWoYvwAYKfUAbup9qwNs&X-Amz-Signature=f0871f57b30a28cc4fb5129c64aa0f252fe67f9a22499b1ad8cabedb5e402eec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TB2MEXL3%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T135631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDSB%2FlMG4otbGjlo%2FxCe0YzRPrQLb%2FrZ%2Fna48K%2BHcL%2FlgIgY%2FAebv9ULaOg5DOPxLI4XmelRNmANmpn9bVGapAU%2BlIqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPXBdPCL5sTASiY2YCrcA10nlTdBa7CbNXZNAtQq2%2Faf63o%2FemZsV2UC%2Fg1zXIDMBklMqlX4f0Vgvd1qOshDYTFqLZXJ1s0y5DWv9Lsyb4nA5X71S96i4xpdqLZgTCD%2Fg9UXW7Y4pNhWrgVd3LfxRoKwEYIiaJuZO415grtdHyAlt2SYFVnRtURnQfE%2B9fy%2BQDcJEWtFdbE0A2YKk9Mfrc28V%2BT7Y0y0ZECypHdP%2Fgmt8eOuFH8ha1AcmPcXpnf7qv5bCK01iCNtSRvTq92wgHI6xnCCUEaJJV5mD9%2FapY%2B3mVtH86i4%2FkWDrIho%2FU1aDveldbU0sleajFU6mXe%2FYhy7WDYtoE5DdMUkB94iwqR9KhI%2FgdKRDBnmXMoCGL742Lqhptk2Y7MB5hQcx0eOkefVfcOgjm1yKh%2BL5CpaiGo58zepjk81zz58X2jQiQOo2InNebCkCo%2BmrGfG2Pd6LkdrilAnWTwCbwT6iy3s8L6EN0d5rIuaPPdzMhFYLChW4gNNhasYVaW%2FUUCnYRMyRl3JT1sZtqdHmMqO1MNZzXfg5QbSb9zEOu9RRWE4zydDlvMsLl9U12V%2BA52ju2CAtcQbDOqofphFpRitxL%2FbjC30ED6oqVsLwzJLxCFNKBLWtXgJUh1id1MMZNQgMIL%2Ft88GOqUBAqc2Vlw8%2BULgBCXK9a6Q44rvbrlvpkXit5V7JWrxcsbrAmWHhfYFvfgp2UbEaj9BsabF5lmdJ3oPmCbclOOrLXvOdD%2Bc3s8eyCmMsFmm%2BAEL3DODJ3%2B2iUJabOsMsGzUmvFLR2iv5akDPqDpXlHJq80RAba7oYLzb5WDBWpjW7s%2FSS70HO6vwls2nN%2BZXvzqZqbnrvZU8%2BOixGwxGwTBK5GFMCWi&X-Amz-Signature=4265acdeb81252854c0a28f7c0365f4cbf147e23c6e34e3d531235e22298bc27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663USAHB23%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T135631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCSD7yLCXKlyeECpnM%2BwXCzMasF7APaGuk%2B09tnFdZU1gIhAIZJUxVh2bv7xea8IC3N5ZToPs8MfTuq98kj%2BAp097MoKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyqyRnVxZ39%2FTe6vHsq3APbwKsPyVkQC8qxyatQZMlmeVCuBfhjNEgZk4SalK7H4py74fyiAm6RnN4%2BXP8PkWHuJmrgzEePtqm1%2FpbPm2Rkso%2FCDvzZdmyarnfI%2FD%2BikTzEx73g%2BFzHsmW4RUK6F4hKUCWWClFH3VpnrjA%2BPXq1q%2BIjyC3Bjw6k%2FC0rsZZ0b6apTyCj%2Bu1apw266gQXtLJZ4%2BdLKlax%2BHuPpcT4qNVs8ad%2BVRK74ZUHm94VoRhhjrlCs8RqgdFL0Fw6H1SNm7FG8STmw1%2FVO8lTqYnvIveMZgdLXNpy9zA02xqccuUEc8hbC9A1KS1y3Pn8E2YRDJ2thmxEeronvoViVbhnORSdVa2Z8eK2dXenSXGm5bp0Ecv9DrvZbyhvOUqZufcwvyVeCfYpoE5QXBYYHcbDty7PZXdtBPQpc4qewTofchFLkSHDMC0UdsvusGHlGdIoXp4%2BGJ5SxIUuh4X80w4g68UDgbSW4ErvwKQSsBBRFr9Gs64ow7sC2%2FoP3YhKm7H1kjHnjldXeg972Tz8rSTYjHKO57xreormRH3E7SFZLM8N8ze%2FRD8h7ipAJ94gJt4Gy0mxnFJZs9ge4hMIqSHbYAEVUjGvGTtENLM8P6I4woGjqj1dulOaFjEcNL5MeTCJ97fPBjqkATf6oXL5Cv0yiJ%2Fz2nbRMud%2Bwc%2Bwo6CtCJocme7HaJB4QyrpRtZ98TPKvOjVJLV%2FnFBb1%2BT%2B1W2DGMhfReC1ujnorMRtg9QKzcJ%2F80djsa0cvX1VIdzTBRQ%2BRdAeC7jT1m1%2F%2BJpPxlAmAXufuHePVD6tWd1u2Uy7DztgqQRA5FoDp5TOdOugl0TwD5%2FrTs9rBZ5x1cKApGmgCdoY3PwfXI3ySDo%2F&X-Amz-Signature=3def6dc0b12b2caa1d9972f882c4d8d092442a800d5a5f3030f6caca02661f09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YL2VW3KA%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T135632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBbFT6HgsgUSEdqdKIFJPvvIFgYxBBFClHHwmboeZy%2FDAiAu7M%2B1kMiplAwT%2FVhwZQloMxsX945HZCM673unJcATyCqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVfhSvOFIIfiaxqXyKtwDc4W9uLFt3Mq%2BxagngnicEOQf11Ip3uksld%2BHQ%2BadQIsf3geNJj7iyn9IZbJ3un9Xqykj2414JAQUeDECWn0M8LGAxXAUaXBnRSVP8mJvvLoikpi6gMTlRUgn4%2FhYjW6%2BdWG2Umg4SeLx1JOBJkG%2FOThOMK4Eqg9MaK%2FFWrFm%2BjSYLdyH%2Bpm4%2FiuRiKz75ekEfHC06JfwMdapB374MzCnYZ2BC7U4L8uJzO39PRMnUxSfesx%2BIyJbeTquzKoUmLOtYz9V8DkiqRqLJwMj6we1uzFa8%2FIliLlUQ155JaB%2FsKFNJUVEij8j1bEX3kCUD0AmUWnQB%2Fq0zhYZPppTzvQQq47jViiIVNPRsT%2F4YsFqhBkxqLLbJ1EMe1TenaqGmoj6ykN4v7oEQeFav4GFY5jQPyfWc4BGM51AZZqrsNZnLHPZYnp5%2BTvfQQURmrIKvJrfYkjKH8O3xfLq2KHMBGPuWe7qzSEf6Pu%2FA9nJUgX9IInhFw7X0h6Qez%2BpYyn6jykHTLHFKJv5u0ruGC%2BGH1TBReNbUN8VbiwSpKS2BRqeAFFLK7zsmcgf4HtSmhptCjJkbhxTwqXPftyvB6J1zFIB6WQ9mXPObEGgAWxDVECr%2B3QNGRvvC9bspLFJH8IwgP%2B3zwY6pgER0QAS7DTaAWMGAYA80OAbJeEygK4kY2erWcCTu8fapWcGjIfeN6%2F0R3Q%2FxMS6EkC%2FZraizY%2BfLRkEV8FZHFK6MO1v9EwzaN%2Fq8ckITrCyOSzqz3rBKxL%2FxGPNmQ6wGqtoZ6EWVAoZz0IHbsm35CEs%2FrYjXTI6qdU%2Bk9OQ45R1PtkSE4PR4J%2FEltkZSibq8GOVJUmexg%2BVAw07zs2Buq0hOKmIXCA6&X-Amz-Signature=0673fb8d3a039cae5c691e31377566cb6db8355b1a5d65f3c84df67eaea43bfb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V62NFWJH%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T135633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAplHrY7ZnS4tkUM%2B6cE%2Fh%2B7jC3ZJbTcxxd9Wrz3E9f1AiEAvN7c52OabVTePsQoVpC%2BxnUVfnKIAJYyz34RB5k1xLMqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMNAFfX5f14Rtg24zircA6MnG778T6bU%2BYp6gpIkUV1ZC6ZoD7OmIfAwUcxz179xtH0av6N31TfzYNEctxuSe6qmAilOrL1IZoqNLmJarjns5reCG3Cgxrj%2Be1R3pOW23dtWmmIrxnETx1z%2BMu4zRZp%2FvTFE7zRmsauXFulgf81gY4ghdyKAqAy4tBlvW%2BuojtZkesrBtEM6fBLM9UyRm%2BlfjHXXY%2FK%2BEjkenqV1qvD%2FEg44kMoh7jbHmEwOyaL8RvgC8XJXAtTi1ljdzCL4aY%2FzsOxYc3NhWfg49Q5E0e9gT9QR9abumQC0uD6H4fwwdc%2FQbUhjUF5fGvLE%2FHz6PdrRQOToZUeCluuG9aoJizp7cs2wCnKtoKZtXx6gs9tMRSwEsgHRPcRFJpQMM8tcWyLPC3wAX7BtxZjL5N%2B32AXEyK%2FqECNi6FIQFQbRMzTtdsmiM2DqwNl3C61SKI5nJXhjpQ0znf2KcXIYF7PHqTykAlfqVH4vmJPwhYObengH9599C2PPYSCzu9XszfW4kEQ3iDVOjRG8s2u3pxQpFn%2B2HjJZG7PuEPqenmIP1EdHcxLgGXn1pf%2BV8OCg7ccN8oRCSyVNO9cYuw6BNFMWAwZAVFMiHqgdkXr1vxL6qyCK2MdMdumd3bow7amnMJX6t88GOqUBKHvALWAQgTNBrsbp7G0Uimxd2tdLtMQDrmTXbTuhSCyeXGMjASDEoLsRJjUo2H1AJQr%2FmWz5Wpt282kj6KDp5OZprM0hJ6ohgi1HmC8m8QILBql7lGm1u7SISs29QDhXQYMcdPFbzzLCHQ5Zi8mCL4ljI2eF%2BOojZHkUhc6k8MWdLM%2B0qg%2B5cA2zeHWfIavJcALkeA3HmdjbK7gAY5NzwBuDHrmN&X-Amz-Signature=46c9da82251a4da3ef2f901ec24e8bf578cc2e4303357ffa91a2e1b45f1a7190&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V62NFWJH%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T135633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAplHrY7ZnS4tkUM%2B6cE%2Fh%2B7jC3ZJbTcxxd9Wrz3E9f1AiEAvN7c52OabVTePsQoVpC%2BxnUVfnKIAJYyz34RB5k1xLMqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMNAFfX5f14Rtg24zircA6MnG778T6bU%2BYp6gpIkUV1ZC6ZoD7OmIfAwUcxz179xtH0av6N31TfzYNEctxuSe6qmAilOrL1IZoqNLmJarjns5reCG3Cgxrj%2Be1R3pOW23dtWmmIrxnETx1z%2BMu4zRZp%2FvTFE7zRmsauXFulgf81gY4ghdyKAqAy4tBlvW%2BuojtZkesrBtEM6fBLM9UyRm%2BlfjHXXY%2FK%2BEjkenqV1qvD%2FEg44kMoh7jbHmEwOyaL8RvgC8XJXAtTi1ljdzCL4aY%2FzsOxYc3NhWfg49Q5E0e9gT9QR9abumQC0uD6H4fwwdc%2FQbUhjUF5fGvLE%2FHz6PdrRQOToZUeCluuG9aoJizp7cs2wCnKtoKZtXx6gs9tMRSwEsgHRPcRFJpQMM8tcWyLPC3wAX7BtxZjL5N%2B32AXEyK%2FqECNi6FIQFQbRMzTtdsmiM2DqwNl3C61SKI5nJXhjpQ0znf2KcXIYF7PHqTykAlfqVH4vmJPwhYObengH9599C2PPYSCzu9XszfW4kEQ3iDVOjRG8s2u3pxQpFn%2B2HjJZG7PuEPqenmIP1EdHcxLgGXn1pf%2BV8OCg7ccN8oRCSyVNO9cYuw6BNFMWAwZAVFMiHqgdkXr1vxL6qyCK2MdMdumd3bow7amnMJX6t88GOqUBKHvALWAQgTNBrsbp7G0Uimxd2tdLtMQDrmTXbTuhSCyeXGMjASDEoLsRJjUo2H1AJQr%2FmWz5Wpt282kj6KDp5OZprM0hJ6ohgi1HmC8m8QILBql7lGm1u7SISs29QDhXQYMcdPFbzzLCHQ5Zi8mCL4ljI2eF%2BOojZHkUhc6k8MWdLM%2B0qg%2B5cA2zeHWfIavJcALkeA3HmdjbK7gAY5NzwBuDHrmN&X-Amz-Signature=c166b7d9d529cc5a7fd845cb6b549d5c1f30fd01731338215e3affac1663e9a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UA3GLAEV%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T135627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2B8LQyQZR7cpt7OEAt3EUtoWGN1vvhUp4xIxbX4dH7lAIhAOkSpX5WnRnA66vq7lBt%2BVLSnV%2F5sVTqM02opWo0p3vUKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxxHLFfZDQVHJYAw5Eq3AMTo7teiw1cbXlWqNyXi7N%2FIzmfHRrLkxeDu255spooiFbo0txVqCPOBorqmf8Mo3zWZ0QKVJd2kpCAHa9n2scI2lE0T3DZ3xqa%2BFpdyAILDiJNhJu4ocfvkNmUL4cf3Bd3no1rT4aIsTF2%2FJUsjwNvKDjVeEbI1C9A8h573arZbFjibPQ%2BddCOFSt3ixbiRFZrdGhkg5Piv%2B8lbA2u5O6KRIczJEeVyI9sPs5iGxJqlFY9cjuQoaaRSkZKHsgcE2dRP%2BpNmTwQViSE57YVaDE9%2BxK%2BL7T%2Bm6yMe87y0Mb36WkQtYQyYT86ixOO8GMXiPqkC1DBg1RweYQRdlkIT6JRrnP2dFOV41hMPgSKG1HcFsASMoy3ufygwezZyT8JsdenvL5crImVv6f2zvTdeIKfGy6OR8ExgvSY1IPxIx4U4BV998wTb5SvRGfpLFnDdKwlrxYjQoAw%2F27X3qyweKomK1%2BJ2B%2FCgk7sMPc9IoCca9iNjUZoC8YiWntXxykkOw%2FKD4w6FIR4GbpfSfcPl6Y3jumgoteJNCUk3adEmRznnN19DPN%2FCw5V5A0F8UJp89G4BfSSYbX5YDC577rFNTkJXwt6p%2FPc35t1He0hoX547Lm3j7zX6ZKXhuBdvzDb%2FbfPBjqkARwNH5y94PoDDLy7yNBpZgmLYh1y6YNSAZMMq0CZtvL6WgKTBsvlIBkJtspoiJMiZDj4TPRm7Pemsicdpy%2FmUqQU2ZiUB5tExUqIFBIdHR%2BiC8aJ%2F7Mx6iq5WOBbL90vUph0nJqeFLOGz2EkAuyB3DdUdmhJAY6%2F4zh3vzL1Iz%2FGhQXQuAP8bjT8CdyYcUR1s8bvcv525Vr9seTv1lNEBDt4pXOL&X-Amz-Signature=f50ab9745777dab772b60da9b5eb4918e919d34848f688f2b9d1c7410ac9e6a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYP3F7HF%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T135634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDE68vheQK6jc5ST8gXTMFr9GgvKKttFDxlA29t6w5ahQIgEhO9GDeHyCNsPqVq4sBLU%2BHfucp%2FWXEnFkYVy5e46lUqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEAh6WJs66oeHdPFfircAznjA0vN2kcnI3Sv829mFcwFa4iQ1T%2Fi9KSqMEDzZRp%2FHTAO0Yd2DhrPPDBeM%2BKFotwuQpwR5GpfETOZussiBHPKXqKmXGCqOK%2FEG51R4gQjOGA1sFqZlXCrX4JUx86GyzTJor2vZ3oSW%2F5a%2FYRWb1sdFN2%2F8jvcOeADZG26wznaph2AfpTLBhnxRRyUWOlTwKPaWe1z2D5TouinHxzJF4d2bhky2nUE3k0xJsVwtrsAlNKD%2FI07DQ4ERZxE7Rq370rJd2nBw5tLvhItGGmvYpxHKF0U8cVzqh3wETvseuT0KCTEN%2Bm8ltvDkVTFWTxWj7OXr4TT%2FKK4QbSRZzLrqZx01ULG9J3J4CGWKsl5le8HoHcV4mSpnk%2F1F%2FwMXQv%2B5I%2FBFFSE8XJFQhPdkiJFIxrIBd4QaEqB%2BSlAJRh8yiyDnEyOHBWYRP1Ir2VecIbjSd5TTfBpSyk5LsoKuiT32%2FfnHvw2r1A3ZobOgtWjDLgxW7IWUVCQ7rViz1qYkKW1bCcpRtUuQMYmFjPcxiIv65TlzasJkkBWR6jibw%2Fg9PQHEoxjLSLq3CaW62oqD1VpPu6a0EZdLBs%2Faoxmk2ReOUB8eEp8mtlco7e377N7fJstI7R0uM7z%2BSynH65jMPH%2Ft88GOqUBNnTQG9kcGnptVOaUF3Ibi%2FG%2FDHLF7VFYVTViVd7qBYdEAHzuqpkj%2BpcMjfq9C%2FjROlw3k8dNOAbIOXmrNkIwVaCKQvO%2B9NlFeyLBQG0iIJcmmbv%2FMCt1n5lkIV%2B1m261bacT9e8QY3fmIMarIJZNLMs504Us8C%2BcnvJZIKKcP8cu3IzX7Dtcqzs5YNLIdMjNizMuH23j9w46%2FwUQD%2Fp9HnR1hVFN&X-Amz-Signature=e5b3be2bc12eb06dcec1d4d7ff3a9e15ce8b0ac1fe4ad69cf5c388e5f2438199&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYP3F7HF%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T135634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDE68vheQK6jc5ST8gXTMFr9GgvKKttFDxlA29t6w5ahQIgEhO9GDeHyCNsPqVq4sBLU%2BHfucp%2FWXEnFkYVy5e46lUqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEAh6WJs66oeHdPFfircAznjA0vN2kcnI3Sv829mFcwFa4iQ1T%2Fi9KSqMEDzZRp%2FHTAO0Yd2DhrPPDBeM%2BKFotwuQpwR5GpfETOZussiBHPKXqKmXGCqOK%2FEG51R4gQjOGA1sFqZlXCrX4JUx86GyzTJor2vZ3oSW%2F5a%2FYRWb1sdFN2%2F8jvcOeADZG26wznaph2AfpTLBhnxRRyUWOlTwKPaWe1z2D5TouinHxzJF4d2bhky2nUE3k0xJsVwtrsAlNKD%2FI07DQ4ERZxE7Rq370rJd2nBw5tLvhItGGmvYpxHKF0U8cVzqh3wETvseuT0KCTEN%2Bm8ltvDkVTFWTxWj7OXr4TT%2FKK4QbSRZzLrqZx01ULG9J3J4CGWKsl5le8HoHcV4mSpnk%2F1F%2FwMXQv%2B5I%2FBFFSE8XJFQhPdkiJFIxrIBd4QaEqB%2BSlAJRh8yiyDnEyOHBWYRP1Ir2VecIbjSd5TTfBpSyk5LsoKuiT32%2FfnHvw2r1A3ZobOgtWjDLgxW7IWUVCQ7rViz1qYkKW1bCcpRtUuQMYmFjPcxiIv65TlzasJkkBWR6jibw%2Fg9PQHEoxjLSLq3CaW62oqD1VpPu6a0EZdLBs%2Faoxmk2ReOUB8eEp8mtlco7e377N7fJstI7R0uM7z%2BSynH65jMPH%2Ft88GOqUBNnTQG9kcGnptVOaUF3Ibi%2FG%2FDHLF7VFYVTViVd7qBYdEAHzuqpkj%2BpcMjfq9C%2FjROlw3k8dNOAbIOXmrNkIwVaCKQvO%2B9NlFeyLBQG0iIJcmmbv%2FMCt1n5lkIV%2B1m261bacT9e8QY3fmIMarIJZNLMs504Us8C%2BcnvJZIKKcP8cu3IzX7Dtcqzs5YNLIdMjNizMuH23j9w46%2FwUQD%2Fp9HnR1hVFN&X-Amz-Signature=e5b3be2bc12eb06dcec1d4d7ff3a9e15ce8b0ac1fe4ad69cf5c388e5f2438199&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQKUGIV7%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T135634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBdbPIM3b%2FyPKWVAGNQy6Rs7cEyraZPB1a7Mx%2FZ5uRSCAiEAxganoJBq6kAasQuCBGuRY2aQY1VmkoBgxcP7td3rqQUqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCX1Zswtfr5CuU7%2FrircAyThjMaVlP3G%2F5OfhhCGYTP0GMWtFtD3HcHawRfEN6eDUcBx7VoNgkrAsv5%2BHk%2FX9M%2B93X%2FrS%2FRrum86InD7JsI9i5Jni7f4khgH5v0rMRQsn0dxeKvTvXmdFcS8TQ5K6yIf%2BSrILOW5IzhoMm4zM6AzxhCOSSkMk01QXlkgc6H6nbXWpS7skHcewLAPiJZ41%2BGY6E1BRaxmnP8cgCynxHLw0FFZ9Uxvz4kwtVRPkSxamlraiEMKa44FVnue3Sb1ZvlQVYiDtNjKtp49lHqY44ilgfe00HwwRTy87h3skjapkoBaobWNZKhmDcD15ZqVP%2FbwaYahkXb9ZMYLSryemzT1X1AYKon238MWwD%2BiK3FRHRw%2BClqgepIPZBuKYVYq5KCz%2FDbw2fvveQkzcti3kRUGGRnRfIiYW4MQw8QoTg%2FNK1UKcFMHG6ek%2FhujnXam4hmJlkIkTCJaKz4wVxcWt4Dkfy2m2Lp5Y3hsEHXjwbGbzWHgbyKB2kHKQCKX0meAFchE1j10VmWo0McrrpftSdKRBjrmV2vKZN%2BMzfiFPMZr2SU%2B2OCknp13V9MwxVarN7lSzZD9QVIz44pIzLwNBMoFelq04RnG5sSLrbqfeeGnOcQq9XtEWgiR%2BLWTMPb9t88GOqUB4AJf3lq8rjpcKsW42zBUfdVTVYKevJBtQ7GQVrci%2FKJWsATL4QreS0VjekKB9d3IUO1fDurwNgZP2s2hm%2BAOVrpBxiyxMZWe8tjn16J2WJJuLW8MlDpkv%2Bs7meyL1NZq5mlxeoC7%2BxYDNIhra8mvb76vlTccIpxjoX5fGjvjjqwM4lMDZidfwmvac7U1aCroqmNH6cJpRGJTzUkk1T6XatUziXB6&X-Amz-Signature=dfa366a733380ffbc2c075c974f299a1c422448868e34ca24703150c4db7c766&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

