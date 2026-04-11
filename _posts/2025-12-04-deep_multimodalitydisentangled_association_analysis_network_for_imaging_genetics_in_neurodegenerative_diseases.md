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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSV223JC%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T092838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIDeUamkTrmZWNGgCCFddCVKtEFAeKkd3Ky3nKbRJ0I2YAiB4f25E7w%2B%2BFgRnuC2c5UkIjSjFDitXDN0%2B0661y6Y4hir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMfLXRzwaaZyvAThodKtwDLBnz66RKXUoLKAMKZocni3jVnU%2FWDzElqzsnvjVeprpHlLx6EiuPIAGedcPliZalZhxpehtNX7VM3Kwjj4bkHQMHHgbNu6t4csvCVFax2EuYE5T6HivVDK1gC44rxzK8UFe%2B1ay3hkztF2p5ryghCj8ZVAyCXmwsufutEmfvIxJ80rgwIOlkkhK2nXGEqy6S5IBQDiUD1dTFn2H7MBIi%2BGbWK2%2Fvgs0FB4gDfzbQGsCLoBDOuyo%2B8x4Fw5cKhYCp1%2FSKv3XKVBwdHyfJj2UsVhbwJ0XAFNKHXeyOQNsDSbAVVBBtuYVKGprvQHWzcy6WgDu5Jfxb7pd%2F9PU%2FWw03P7LIumOrMNmqXjCg7fwQ9%2B0oD8TlME8UfCdNg17Uf%2F%2FWQR1lGwSjd518lFJTu0zxDeigJtctS0xFidufC9fSnaLry%2Fy8TuYgxrBw67%2BN0pebIGd1O5d%2FmIrR2kmy56gaXhv4McgaKH9mYj4tKR3H3w39gLFOafbn8d2hLFzZTF5yJzUtA7BEYtv373S8w%2BKJ12NfBsXR9qlEjH%2Fih1MY%2FLleyozJS10H8zEX5b1%2BJB%2B%2FTx1TERhVhTEmeL86De9Op%2FDg6RnN6GVCeoXKBXFsIzg5FHkWqpXKbuPZx%2FMwk%2FfnzgY6pgGmSn928pmpMwW3HdwiC0BDl7xUO8SxGF22dFqGFXCmNok7GrcYh5QYatYhxcXZz%2BG3XEkyWH5wCKidw6UsrnhNg6H%2Bod76L76aDJTdRiZFlvAiyKA%2FbdwlEnSMTdHMpZOpv0G%2BOUHMjAkp5gCqJ7SDnRJ9WvfoAUmwGZuYOjnaZF0PQiXdy4Z21BcdRtn%2FtOEmtoi7QJyzB4JuKk1CoULyF6pZc2kG&X-Amz-Signature=d2e02aacb18be56c677b0550cfe63db605febd6a928d168ba4d7bd980230aad1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSV223JC%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T092838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIDeUamkTrmZWNGgCCFddCVKtEFAeKkd3Ky3nKbRJ0I2YAiB4f25E7w%2B%2BFgRnuC2c5UkIjSjFDitXDN0%2B0661y6Y4hir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMfLXRzwaaZyvAThodKtwDLBnz66RKXUoLKAMKZocni3jVnU%2FWDzElqzsnvjVeprpHlLx6EiuPIAGedcPliZalZhxpehtNX7VM3Kwjj4bkHQMHHgbNu6t4csvCVFax2EuYE5T6HivVDK1gC44rxzK8UFe%2B1ay3hkztF2p5ryghCj8ZVAyCXmwsufutEmfvIxJ80rgwIOlkkhK2nXGEqy6S5IBQDiUD1dTFn2H7MBIi%2BGbWK2%2Fvgs0FB4gDfzbQGsCLoBDOuyo%2B8x4Fw5cKhYCp1%2FSKv3XKVBwdHyfJj2UsVhbwJ0XAFNKHXeyOQNsDSbAVVBBtuYVKGprvQHWzcy6WgDu5Jfxb7pd%2F9PU%2FWw03P7LIumOrMNmqXjCg7fwQ9%2B0oD8TlME8UfCdNg17Uf%2F%2FWQR1lGwSjd518lFJTu0zxDeigJtctS0xFidufC9fSnaLry%2Fy8TuYgxrBw67%2BN0pebIGd1O5d%2FmIrR2kmy56gaXhv4McgaKH9mYj4tKR3H3w39gLFOafbn8d2hLFzZTF5yJzUtA7BEYtv373S8w%2BKJ12NfBsXR9qlEjH%2Fih1MY%2FLleyozJS10H8zEX5b1%2BJB%2B%2FTx1TERhVhTEmeL86De9Op%2FDg6RnN6GVCeoXKBXFsIzg5FHkWqpXKbuPZx%2FMwk%2FfnzgY6pgGmSn928pmpMwW3HdwiC0BDl7xUO8SxGF22dFqGFXCmNok7GrcYh5QYatYhxcXZz%2BG3XEkyWH5wCKidw6UsrnhNg6H%2Bod76L76aDJTdRiZFlvAiyKA%2FbdwlEnSMTdHMpZOpv0G%2BOUHMjAkp5gCqJ7SDnRJ9WvfoAUmwGZuYOjnaZF0PQiXdy4Z21BcdRtn%2FtOEmtoi7QJyzB4JuKk1CoULyF6pZc2kG&X-Amz-Signature=d2e02aacb18be56c677b0550cfe63db605febd6a928d168ba4d7bd980230aad1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPWG4G4U%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T092838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQChuCZAVC4A3ndI0vO8RDIhLB3UaMLnFLrcKdO7EbAt6gIhAP16AGhhGiWw8s%2FMC8AjXdFwANWmdYIwLKGe53%2B6ZFyyKv8DCEEQABoMNjM3NDIzMTgzODA1IgyuErh9XjhpxJNwECsq3AOcuD7mQhcBkW7W9OF9aU3CLssOhUXPE5wDRSRtBY0PEC7GwtHT64%2BFrwwnq43ROZv%2Bf%2BNVmpuBQFe2EzUIZVcj8wqCXZmlfHYTg9rqkTDDteI0DY33MjcaWQ44Oe7EpuYA6wOR7HuT9Ba%2BvxwVENFI3I%2BwhFB%2FS%2BrmIBZt4FUsdk53OQyuaxOdwWV82CaVlnR0nGcLlOcExyMI4YqftSxSZmhsmtamjcmCWQHB0NFxf0ZGckGrVJhPw0A%2BE29r%2Fn9Rq7PNpPA1fMCe9PUcxKdXhm%2Fu3z%2FKbn7IZSioFyk1iZtNCqFHocZlTU2Ps%2FDnxskUfXE3J9%2FcYyisoSpDfA7JQwmnvGT%2Fs2I8a03yUe173UhBgovjWxuGbLAjyF70pNV1LPy%2FallLbdStVIUKUbzHenaZZxi%2BZaI5GGvaFLNKJvY%2BWo5o4UyDzqwJ%2BtijQcTJd1en418G%2BKWE1tk4kDXfZ48Hn0voLfo%2Fy6aix49IafKjCi1DY5rKRWCDVLZLs35q24tALhWtjDwjyxWP6PDxRGIZGh3fsFM1QPKPZJz6VwzoFE0qltWpheX52WT04He%2FEZcqIzZNKeF6KhWTAJPjAvfE9UVL9GW58g7hF6a%2BaVPk7un4D3jyiecA3zCJ%2BOfOBjqkAR9fDW93y7QAbIAPyCTlR2WgwYoDYElSQntz%2Bxps7zw%2FlXOh7qXFgy9rXVovTiJCL4NCqYQRKJApCxzCshgU5ytbHNruwFQFoZklR%2BpPbQTd2Eh25nra2HdLuIhFxr0yYmNOCN4ljhhbJQmG%2FdquXZA2yPGcv%2FdekV0WO7TdnXeEsCFtuGhS%2F8h%2F6Jkn4O3riSSFwbeYkUwQRAUT0%2B%2BbtRKUjaeK&X-Amz-Signature=e522d7b92c3b5c87ca7ed950b132cc120e1648f76b2dd795644f4032b6975922&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TOFSRJ3%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T092839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCv4gK9OK4zXP9NJMV7Knhy5vqegcfzrU6cYxpNx8vRwAIgR6Lvpls9KpIcSR7P54KaHtO4Zmzd4BbFx0V429tmSKAq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDP1o7rKYQ8DewJtdFSrcA%2F54kSVAvqecpK1kGUWJfAbXElDSti2r0BIKXDIa%2FZnMlACKLWcKzI2XAp3hgDY6sJzhmU1V%2F%2BpFDPQGS0KBRkH4EpEJQ48c3YXd4aDN%2Biy57OlVqCjLLSxm%2Fo5J473dBa%2FcYWFTW2W1IiaS%2FBphkDF4DciP2Jg4SI8FVTI1LckDgtbP1WjhEr3ck965PXcC0u7pmrU26guk7V1qJhl3pEBkcqkZR2ALN6Igl0eimDTwR1YTLxU0KFcviOa1S3spk%2BzRaowa8mPPEGrJPHSjmw5XY2NywzdSsy8Nn0ZkF%2BYDBFieqabt0Dqh39zAKoeYUiGCIder0uMy1KdwcppzQJG1TtEQPPwIN8OTDoRsIp886MHOAWT7GYX3ECWGqguwnjyU3nNo%2BTzswhAd5pC99Au1Xj3DNCIiW6ThrbHIztSF8PYM0lYTTJ2vxwPpRGL6hAgrzQzvk5snIu2YIKMNKmvyO8mjz0cZmipl1NEurohXxQ7Eq1a8yVoJbIi7AAC0wss3Za%2FtIUn7QpV7y9mGE9rjh%2FvRGkX%2FklG%2Ba7Y9U6TYUL4MIRYiOdLnASG7JbIDHI1p9CoVR4Q%2FZ4nc3VP%2BjnGOkRxP3U%2F4YxAl%2BjBkkqBPZoiy3V8PWNRLlatIMOL4584GOqUBVsJVqENo7OuH7v5i9SbokTQbiI2WYoWzAIxBRN1jQh1zzjLn9tXJ%2BAtliQoma%2BksRQ5i%2FgKDD2DYQpjg209RmKrEChMqdkHL8HfEhCyLlh5Rsg4TwlLxTeSK4i91jI91UCJwZQXjWIYeIk0025PwJZVwa%2FBYlXDfXj7A6bki3tGCvwDnnxi5W0GacIQPbmHMd6%2B1Z2BBo26%2FdLCWvtP4YONjACcu&X-Amz-Signature=973bbfbee5e0d84dcf8a4055a00912e32666be05e40fd7d510c8d672b7f30f74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TOFSRJ3%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T092839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCv4gK9OK4zXP9NJMV7Knhy5vqegcfzrU6cYxpNx8vRwAIgR6Lvpls9KpIcSR7P54KaHtO4Zmzd4BbFx0V429tmSKAq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDP1o7rKYQ8DewJtdFSrcA%2F54kSVAvqecpK1kGUWJfAbXElDSti2r0BIKXDIa%2FZnMlACKLWcKzI2XAp3hgDY6sJzhmU1V%2F%2BpFDPQGS0KBRkH4EpEJQ48c3YXd4aDN%2Biy57OlVqCjLLSxm%2Fo5J473dBa%2FcYWFTW2W1IiaS%2FBphkDF4DciP2Jg4SI8FVTI1LckDgtbP1WjhEr3ck965PXcC0u7pmrU26guk7V1qJhl3pEBkcqkZR2ALN6Igl0eimDTwR1YTLxU0KFcviOa1S3spk%2BzRaowa8mPPEGrJPHSjmw5XY2NywzdSsy8Nn0ZkF%2BYDBFieqabt0Dqh39zAKoeYUiGCIder0uMy1KdwcppzQJG1TtEQPPwIN8OTDoRsIp886MHOAWT7GYX3ECWGqguwnjyU3nNo%2BTzswhAd5pC99Au1Xj3DNCIiW6ThrbHIztSF8PYM0lYTTJ2vxwPpRGL6hAgrzQzvk5snIu2YIKMNKmvyO8mjz0cZmipl1NEurohXxQ7Eq1a8yVoJbIi7AAC0wss3Za%2FtIUn7QpV7y9mGE9rjh%2FvRGkX%2FklG%2Ba7Y9U6TYUL4MIRYiOdLnASG7JbIDHI1p9CoVR4Q%2FZ4nc3VP%2BjnGOkRxP3U%2F4YxAl%2BjBkkqBPZoiy3V8PWNRLlatIMOL4584GOqUBVsJVqENo7OuH7v5i9SbokTQbiI2WYoWzAIxBRN1jQh1zzjLn9tXJ%2BAtliQoma%2BksRQ5i%2FgKDD2DYQpjg209RmKrEChMqdkHL8HfEhCyLlh5Rsg4TwlLxTeSK4i91jI91UCJwZQXjWIYeIk0025PwJZVwa%2FBYlXDfXj7A6bki3tGCvwDnnxi5W0GacIQPbmHMd6%2B1Z2BBo26%2FdLCWvtP4YONjACcu&X-Amz-Signature=35483ac6c07df1c7eba427c49acf1eb0b9dd5cd43b241fc3bec386919dc72b79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WF66E2D6%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T092839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCudOYx1XJOLmSU2Nzrya%2FbJMJWx5ZmKvI%2B7FVCrOJ%2BQgIgElJ%2BLzDZWs8zDaDSE3XwQcCf59yP3iOH1UH%2BDbppiCMq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDLz3UXgYudEUBrdqEyrcA%2FC2TQsh%2Br5ldOh6bqAOsxxBuLIuZK1qyqq1JISqukjTD4bW0Fh92%2B5S4dcgNHr1RmvokPdMQDlkbpTcX8SKtzFFqdss5bfR04AvJuPLocB1Jb2W9L%2BwRRSaO2adLae1zhqvCCQYSLEtsNmS19Yk85LAx2H8YvM9y0H7fbLpl3%2BKX973YprJeIZ7br%2FAkj%2BDdZsUFpvNSl8EEDqVL1BY2A9FI3wW%2F7l0lQ%2FRZ7KROHv%2B0kyVzywWJQbzbEJ15jqFMWsXWFylhArzhjlHC0zuuegPAzkgFaoIYO7DMgzzvgTmGa%2BHTBkRtfwcsvE9y9QYiozHnBFOtgD88XXSu7iPTkMpxs%2BSCyi%2FgTKNC4rp7BRnGZMdqs1Mj9Q09EASJKCUatw39aRMWvW46B5u4Kxj0hqG4ESejIQrSGQrh2Dw3OvPanXVyY4GksVNFqmmJg63WbnfcIDAONnUt5zUzp1lQIM58f4GdBg9F4VhLFDRDZk7a534QIbgOHBheJ90cXylPmhq4bzceDiYej5YbIQoFDU%2FX7BpSJ2TXC9W7Ug46nKRNnUfEegmUiboyQQHG2kK%2FATgvnr4LR4Cumy2Z2w1omsTt%2BJUKx4gUM3f%2FMaSqlLCvpEEkZ1epHZLYlI0MOD4584GOqUBmqIs2r0WN9lImSAVQsvsjWs9qzS579H68pCcbxGdxQ0hjFR%2FhcJnVAJovhbcF5xcGdLW7sl%2BrB78XJpHLdxUAqMdEPPjBwyPH6DiZh60B6Izq8F1xwWMfOODz3vPAYHE%2FT6Ff8oxKXdM0c%2BAg3GLNNbGtoxilIqBPpV75kQgsQhukkTKwDtKwbqBfR8ZurGIOqIRL4IrjyYydjLIerocGE8kVM6k&X-Amz-Signature=f76341d5d21b0e6b47cb36c046fdf700ce858e6d8ed70f86e598a94cbdf28da9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665V56ICNM%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T092840Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIBAFAS5KDC4%2ByEXBzUTmO7hcuD%2BSKIPGfTJ43nT%2F9ODaAiAgumLpnYSemYOTXmGEpBQA5UkFyhmv0A5cQZEyiGkD0ir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMwVRmi7obdZEsRFqiKtwDTFtdRC3ApK1Ioc8AUh%2F6snzYMVjfpWMLSdEUPDBXdN9UkE9PcF0EiR%2Bv0MWzvkV38AYkkcu0tgal9UhTG%2FSYWBj4RKju2b2HC%2BHjNth6svJREZUxEaiw%2B%2BMyyu6qjLDNmvObgvH5vHizzKb85t3PEyDVRz4CG18DUCggGGA1CqRUIo6E587mqSrXY5UcJXlSIEqqwrTC4EeG9bwv9%2Bj59w2CgE7%2FYz5SxY250yaErOPcf8%2BAVH5TVgg3oJq2ao9Di6W6ZRwMbmjdgKgU2rED574nIpfDG%2BxTK4QmHTOhz%2BZmrdUYsZDtsRUgGd%2FpTLQ%2FcnvrVpwUjVwWabymGniuV336ED1bZ%2BOVT6or9NcJrJplD%2F0NxASF4ADBuEIOp6AqHAn%2FQIH0LT0EQ27U%2BD8isSdq0L4SXFw9GKD4C2cCQjLQf%2FBOybc4I6HBB1665jDs0FpM8jq6SZewekwdj1h34QhCrWZEllb79QLnYQ%2B3iqx0%2FpL1%2Bjgbb2cOFMiXSqaes0rGCjHvriotMhcZROX%2FKgjQ6na%2BNxKtY2WpD65gI3CSsJfVzaeQQSF%2Bdd8K13dCAnl5YizCwk2cAOKt6BL%2BIF0tVWyYfcSdVqAWnIgD6sodiA41T2SmhDBHdCYw6%2FnnzgY6pgFJz0X%2B3Ksqcoswvc1abHiIvDTc5Zksw6wiUS6f%2FQ4JwFPZ7wEJyKAM9F039kCphgHp6Nz5NqkV28H9XrwoA7SrhN7plfZtOhCxNYt2LvfHgtggdL5H4Yha5UPUdzO%2BG%2Bu9huaYHKSwOd4CtqtuxDB8JsOC4a4%2BAKvAj128vyINN5qD6NAwGF%2FPO4VGb1dolbmvIc8r54xXAReq6yO%2BpBTE2u8y4CQn&X-Amz-Signature=a51996eb941edcc7bed201e932b6975c9ef8240f2bc873dc3bb804172ae70a35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RL33IDBD%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T092841Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIDwZENkK9tEIOA%2B5gfRfnPSknYkhrpkLdc4G3%2F8YBOlYAiB3kHLsWfuGtb2BSDgfqSx4wM5%2F4gZxymCk2PMOC4WCsyr%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIM2F%2BkgZJ33YeOcF%2FqKtwDs8YbFyMbWVv7LUq%2FDEH1XN49DbCdpV3DUpqqYyOz5izoo%2BupatuBrOyZ%2BUaVzqjfKPlgp8Vj6OuyYZNfeOuVTwaVVAQUTE6QnzhczHGKiCQnt1AK2Zoq3JYMnoflOGDFJBi8ayTqNex8zxBjWTTQNq8tuXPjTtIPV9koITvNj43jfU%2Fd5GHYkBKjnxn%2Bsa%2B3o7JwNgt75qPlx9IfB7HJ0IpN0%2FRYiZUNmOGDho7SY6EsgonuZ2xCG28%2Fbj7dRwUPTy4vS5EWEAafpQ7AN2jIrF8%2FcfCTeOoKIq9Ktl%2BDGQZsejK0VL0vsIJxaujHs3PUwPfQOhMzw4jrcNjyhNeHmR%2FTkb01U1J2H2Va%2BgKy1nsQXsbvjanRkqq2Vixl0SIK7WbwclGHOA70EqA6ltvZckqSpVHSRzFgRq2xkIYyGVq0rRCuxjVmvJEUTG60%2BJve3VueOzFJl48oHzDC8s8GHmzuxsRzoW4GxhzVNJ%2BE8WFeOJdMoNng%2Bm5sDyHPd2AwmiMt5T5shW4VvWjw3DEV9P%2B2XHspjFAryp7waFdoygCI2w%2Bw1hgexT6P1pvb%2FrWeqkQ2RK7rq9CcA45O6ZE8S64m7E1mKXPYKMHidyXXgbaEBh5sLp6L62qVfKcwk%2FfnzgY6pgEndhj%2BAffGhFMlx%2F6FCCHGOyWdFoH4XpBSZOezfQ2N0S5uT9T3OCEvMIOouYw9wG3Wj0Cp1jKzmlprLdmcquXsM3LO%2BmjJ5Aklxqm%2FkaUUVjxI7Vtx45Y%2Fxf5iu0FADQ1D58YuBmYgHm%2BgOjnieaSEVomV91feENQgYRH5C%2F5slmyVFsizXwgxBH1WUOXOqyoIq4FymA6%2FDqhlKOuL7munLIC0%2Fl%2BW&X-Amz-Signature=37188bf0412f7456210dda18c261a5eac0d65ca9e35edc6d45a0313866179471&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YBP6VO3%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T092842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIGi4Kuno94rloa221qR3bu7DeNYOG5L1q6fdwRr6rEZiAiA9HCDqV8JYN1%2BD2DtzleP7zb6pdnUF2sguofBXXWRKWSr%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIM8%2BXjK2Sfr1Wn41iyKtwD%2BecJA0%2BegnF7yYcWmcwXouQfhA9P3gW0X49SnCalB2NJbwEfh1dufPSMleUeCkp3WyUn7sStZOGxLAEl1h1bs%2Fp2idzG%2BVZ1ujsJ0nVlO%2BoJ1mfJxhtymKQpHfrjWNgOicD%2FobDAAeMEJ%2BL%2FAHCg6r6Yj%2FPUsVQHXO1hJ20miBwRaUh1JRtmiHRQ7xrwpELl1cVk23kQ9nOfLvpy65atSt%2BpStff8XjL%2BLTk7bbX45%2FhfjIfaz4URnzgYuTObvqHTxnN%2F3%2Bzn10VKZmgEvZBTWNlqY%2BmtXNiil97fcz5lKR4XqnhognfgKN37U09IHPD4yDXbkn%2BOyU%2FiHMheP%2F8F8u4xQIsZXdR1IkwjOgsnghmvIGz8KVqWdfhXXY696s2Ao2mE4mdOEkpBC8nf62K9X1SejCWiLF2eiXUfdlC0MpxM9kpvXKy%2FZ5hkRrqdrt2t68QELNlssh%2By8KOwYjah71WWVqYdJEdsCjJqEeP5a9g0OdAKit5ynyhVgByQyO1HVarDfiPQDSjE8ubI08DURzCaaSTvPxr6eUwhjCP1QtRHeRYSljXl0b2ABJfau75mOM0GNxBDF1lxXSezk%2FbeTLwfN%2F3UcSq6iB7265ECmdGP6VswW%2FxDE4l%2B8EwvvfnzgY6pgF%2B7MRTP0i%2F%2Bu4wQfworH6sTvI89QgDGBEJfJDXlAMctcRacsgIw5OGekv6n5FThRiInJyS8D7InYfl%2B3EgvDnF0WhoHv82tU9aNRm6DTLnVnJGjoK89rsFoAcLXn%2BAwlSJ6vIlDoGSb2AT2fiE3vDiN5GrxXK8yRTk6gi8fWy6Ub%2FKBfHRfMYx3q6oyeO2DtF5qiWzgc3pcuxaYoPYUjQg5X139E86&X-Amz-Signature=d464b0a3021e380dfc0dacb10b98dace3100e3121969ca47ddde6220fe5357c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YBP6VO3%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T092842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIGi4Kuno94rloa221qR3bu7DeNYOG5L1q6fdwRr6rEZiAiA9HCDqV8JYN1%2BD2DtzleP7zb6pdnUF2sguofBXXWRKWSr%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIM8%2BXjK2Sfr1Wn41iyKtwD%2BecJA0%2BegnF7yYcWmcwXouQfhA9P3gW0X49SnCalB2NJbwEfh1dufPSMleUeCkp3WyUn7sStZOGxLAEl1h1bs%2Fp2idzG%2BVZ1ujsJ0nVlO%2BoJ1mfJxhtymKQpHfrjWNgOicD%2FobDAAeMEJ%2BL%2FAHCg6r6Yj%2FPUsVQHXO1hJ20miBwRaUh1JRtmiHRQ7xrwpELl1cVk23kQ9nOfLvpy65atSt%2BpStff8XjL%2BLTk7bbX45%2FhfjIfaz4URnzgYuTObvqHTxnN%2F3%2Bzn10VKZmgEvZBTWNlqY%2BmtXNiil97fcz5lKR4XqnhognfgKN37U09IHPD4yDXbkn%2BOyU%2FiHMheP%2F8F8u4xQIsZXdR1IkwjOgsnghmvIGz8KVqWdfhXXY696s2Ao2mE4mdOEkpBC8nf62K9X1SejCWiLF2eiXUfdlC0MpxM9kpvXKy%2FZ5hkRrqdrt2t68QELNlssh%2By8KOwYjah71WWVqYdJEdsCjJqEeP5a9g0OdAKit5ynyhVgByQyO1HVarDfiPQDSjE8ubI08DURzCaaSTvPxr6eUwhjCP1QtRHeRYSljXl0b2ABJfau75mOM0GNxBDF1lxXSezk%2FbeTLwfN%2F3UcSq6iB7265ECmdGP6VswW%2FxDE4l%2B8EwvvfnzgY6pgF%2B7MRTP0i%2F%2Bu4wQfworH6sTvI89QgDGBEJfJDXlAMctcRacsgIw5OGekv6n5FThRiInJyS8D7InYfl%2B3EgvDnF0WhoHv82tU9aNRm6DTLnVnJGjoK89rsFoAcLXn%2BAwlSJ6vIlDoGSb2AT2fiE3vDiN5GrxXK8yRTk6gi8fWy6Ub%2FKBfHRfMYx3q6oyeO2DtF5qiWzgc3pcuxaYoPYUjQg5X139E86&X-Amz-Signature=4031c844fb7cdd118927350ecfbcaaa3a55d79be24299c5a4be1686a04a8ca0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BVNL4U2%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T092835Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQDCn%2BOKLO856ytpw19KH3i%2FiCLQtw8zKcw318wSJv7T5QIgdBUZwDiI33Qqf62HD8EpXvERPJdHcyutcWK48UFm%2B0Eq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDOFG05iAKUxdcevF1ircA7zO39DHMjtmdQhp0%2Fdioszf3YutH4kvSNL4BdQRFNvh%2Fg8w9NvXfKnTAHYecoVyXoVhzoCtWVPk3WA%2BwkePv7%2FSvEC5dX7nc%2FFmNblZcsDVhx9iH1sZ%2BI%2BmFkQEHf%2F6zsdXNWWYhpRe4p3ydFUoZRqoJcoINNyAQH1YyZJvxeJ0qrSJBXuIddSs%2Fwwptra2%2FLPa7AIaCIdzC76cV45aOzaMLdQqGENY1SoqiP5AhsROZYegOYPccFYL9zjmaPKpOcyFJKrOhOqPDNZu9vpHg8v4ThejxkgcMqccSauTg9wkpRn1piBnbmCZOezJkywnzigw1%2BvGerxaJJb21uo%2FX7hhE9ppt8FW9NyqiWzoS%2FSf828xyeoc8wkHfsQ144TWHE1I1%2F5XrhDTbhf0F7JSARXvtLms4bTdqnkDnsxhQewQ%2Fm82rg%2FDzIqa8EXhH1Nm3oMHvBWzvnvZ6vuo6GbHDzPI0HNmYUx4M%2BjkHkaaBu9z3lMisH5J0omkR1hqtyucxUjds0u9i4h%2BULFABK8A1cwGH3S0zNOHYSYT7tDbUJF7bO2pQEpqIU9p%2BcD%2BNyz9rLHNR2tH3PwpnVA1l1Q%2BUmDwFd%2BLWEiCpZha7hIWJXSP6sd6%2BpLJFnwjTgvpMOb3584GOqUB1leBNOeoTg3nWhG%2BiA9a0lwySV0iNuO7qghnOdp5rfndbb2nvFQhE7AMgpe4PxD45Mt%2BdwSkvFjhWEhgTq%2F0ydx1EJD46cL5HiNRX5lckIhW%2BiiuPHcxdvC1E%2FFTfjg4pHGJptSIgtOBiSW5TdnAhpRMBAcl%2FWW8o%2FEcGh37mbW3ljdKJPjTMcik4v2Tew%2FeyuuyqsyOTHaXwzjwdfkfWZUYgCXc&X-Amz-Signature=75f55838bd9ec05765603bba89dde0baeab0c7105e6953767f67cdb5cfad84a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JOZL6ID%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T092843Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIEjNImar2TKcc7isCWPBV0jweewrD2u5Twc5oSSGJ5b%2FAiATnTYLDlrYmDHA%2FJHME7xaqPIx0tFVnkr3ugknAx2PwSr%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIM6kgjYOQHtQUw4RFJKtwDcgXghQRinOfL7mJ7CjPyLcE9G1AN47M8E0i5vKpM9%2B1Rwclh3IdDvUxetg9xOoWN22rxM7qbx3ZGTEsROZ0Z1tfrpAQfFe2C8ZAI%2FpyRaaIzoVIcX658t1o7nJ1zdeyXJFC3D6%2BoZil9DmLAHu5HtKse8eXmKu7sCFA5Lo1P0nbdZgZ9opSHmAODbo45DdCGtAK2h40SWTdDMbf1muZUNoiySaiCSC4tsIlm80Yz9LsaMdvUCfNZJ4L4Au1nxXHepHx009oV39wTietb3ncB3eR5wMwxF44lVVNZn5Bi7R4kN4xiu2LVuC9wKTrL6%2F0hTlh%2Fa0jrx1jU8eYqE6GHxXogYdfmXsUq8SZI0WOaCBDzmHPDWbKLkA6ZhlL678%2FN4M2efv4W%2BxHVwVeRI80833o9NujlE4MNXzgH8LtGDAqa4wnP%2BCVroEe6mPUbaemGE5Ji6yNHM9EdM%2B2e%2Bc1om5K8puQjXr7qBCg70NPyrMU6NiUiCCG7PfQnHon9M1z6K5Lt%2FZ6qDsTIGwCHgU14OSVkOZG4aVv3Vitr1nAv1KNJHZPHZ9ChxmdiY%2BNrntQiud5ej8x%2B4M7pXDCasLbyolGHSlqvagXAk2btXCl0WX9XxhLaDty%2Feq61EicwpffnzgY6pgEirPX0vCLJMQrI5%2FS39BCb2O8mQoQ%2F%2FmxSvIV8xLVDK5ZkopvB5m0zmTTb69XYfniVlihERfQIxKHlYfTvvwH%2B28LwhXLIr4jB76e5Wi7AynogIiUdsVUyW1yCi7eI4Eeww4uw8cjqcBLgqJOslyP8%2FaBK09lZdXytGhOxUuw5dPqiP0i3e%2BgQUxTJOXoVtRVYwoD8P7YIAd4XQYg%2BgJ7nJ89M3Pwn&X-Amz-Signature=911a01dbda2059d05b536baf59220d6e6d8512bd23a25f71da5d38086412f2d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JOZL6ID%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T092843Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIEjNImar2TKcc7isCWPBV0jweewrD2u5Twc5oSSGJ5b%2FAiATnTYLDlrYmDHA%2FJHME7xaqPIx0tFVnkr3ugknAx2PwSr%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIM6kgjYOQHtQUw4RFJKtwDcgXghQRinOfL7mJ7CjPyLcE9G1AN47M8E0i5vKpM9%2B1Rwclh3IdDvUxetg9xOoWN22rxM7qbx3ZGTEsROZ0Z1tfrpAQfFe2C8ZAI%2FpyRaaIzoVIcX658t1o7nJ1zdeyXJFC3D6%2BoZil9DmLAHu5HtKse8eXmKu7sCFA5Lo1P0nbdZgZ9opSHmAODbo45DdCGtAK2h40SWTdDMbf1muZUNoiySaiCSC4tsIlm80Yz9LsaMdvUCfNZJ4L4Au1nxXHepHx009oV39wTietb3ncB3eR5wMwxF44lVVNZn5Bi7R4kN4xiu2LVuC9wKTrL6%2F0hTlh%2Fa0jrx1jU8eYqE6GHxXogYdfmXsUq8SZI0WOaCBDzmHPDWbKLkA6ZhlL678%2FN4M2efv4W%2BxHVwVeRI80833o9NujlE4MNXzgH8LtGDAqa4wnP%2BCVroEe6mPUbaemGE5Ji6yNHM9EdM%2B2e%2Bc1om5K8puQjXr7qBCg70NPyrMU6NiUiCCG7PfQnHon9M1z6K5Lt%2FZ6qDsTIGwCHgU14OSVkOZG4aVv3Vitr1nAv1KNJHZPHZ9ChxmdiY%2BNrntQiud5ej8x%2B4M7pXDCasLbyolGHSlqvagXAk2btXCl0WX9XxhLaDty%2Feq61EicwpffnzgY6pgEirPX0vCLJMQrI5%2FS39BCb2O8mQoQ%2F%2FmxSvIV8xLVDK5ZkopvB5m0zmTTb69XYfniVlihERfQIxKHlYfTvvwH%2B28LwhXLIr4jB76e5Wi7AynogIiUdsVUyW1yCi7eI4Eeww4uw8cjqcBLgqJOslyP8%2FaBK09lZdXytGhOxUuw5dPqiP0i3e%2BgQUxTJOXoVtRVYwoD8P7YIAd4XQYg%2BgJ7nJ89M3Pwn&X-Amz-Signature=911a01dbda2059d05b536baf59220d6e6d8512bd23a25f71da5d38086412f2d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHPXWEIR%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T092843Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIQCrCohWM59kkOhMpZdIbWnO8800AGhwVruEc9VZXlBW0QIfMl08MsQqXzs165niM%2BhwO433yqaq5zxLff6fxXDRYSr%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMxKY1Y8aNvdCNxO%2BSKtwDQisSqN7nAsnlWagFIlfKJ82TzzYbIE0iEerU2ctJ2UhDchF9c4VsIBUsCBsLv0m01Qz0GUC989IiKa4JvGIj2fD4zpMsk%2FrjOBtGWk3rtnQjEfwoxuwgTInmKcGYYN%2BFXoAfQo1gpz%2BV20%2BqXIC%2F600i25G5qyZOhQvcBcaj7JlMeVsS6T6joFF59FSBlXAPwaVXuQ%2FnGPqSHpFYfnkXVTY%2FVXd%2Fh2EXhiGo81Dz0Vy8exQQB5La5S6QBs1lV6bSTskEkGWGFsmuTqBWYjLl9stlbW5W7LiRGll54tDy%2BdRYpHV%2FTBdfTXlsZVgTEfbThQfepHn0PzNNdIl9SkjIiuSKR4rhA8VIUSv43FI1mSf7nURFgZPdn%2F5lWplM%2FG1i1IMzl8Rp8e1atWDR%2FjOcUF4018bKADMEsAMcX76OyHcdRqANeY7vv0htGzSFPVWAbjLKx%2B3a5%2FdlHhy%2FHvX5HbLWzpFp8F1UAMo%2FK9kQXTiZehjSh3GucupzlHcGoW4nXezRYP16Dfb4TidztOpJ9a%2FuWbWhuxDastkH8zknvu39MF4Vp8Gi9928tYEOlC0yLE29ALGIngfIgxZ29rtqKCjRVAwIvVR8B8jYk27DTysLuTl4FY5lSBF9FI4wy%2FjnzgY6pgFmluLI9ZLXa1XZhtOsPIR8VOVyW8TXFNnGDCvmR0Dmj1A%2BxIfG4xxZhGmpNUAfwpmk7zqnxY%2BeHo5BnuiAr2c%2FF%2FHTcVRMeLkiIFTJV1kJ30X4TtSDB2QfS%2BF0OBa%2FO3xJIVqhDmo4mqGwiTcN%2Ff4KD%2Bp5sliaSq6QFGq0lB5xOFMQC4wOjpjVJP3ty3bJF4mfgcNl%2Fc1o%2Fh4gR6POe0xRv%2BJ27uZ%2F&X-Amz-Signature=4d4ec459de7b2e19adf3278118e3f0f2682937b50d640a58d2fa404d7b6ff6f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

