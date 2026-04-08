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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VKVFF5R%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T202824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIDQnQzmuNu2Oqh5B7Do4G2GKONGMn5tpKH2vqXjzs3RXAiAId%2FnMJeByP73o27AfvGJrf2Exdu3AlqxIr4O%2BxtkA2yr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIM8lh5fm%2FJP065wrBxKtwDheA23CDohz23C5Ngb2lnqUp%2B%2FxPJUPFM6IeOwH3yYTu9%2FylKGqxiLUaD9XGqx9GRuDI4YRFGTmcrNLgHF8%2FL0a5bODR%2BvqsmgM9Ly%2Fzhsy3iAtqwLe94wihjC8LeJmbRMXvfrSo3ksfUBGmih%2BPfKkDzZMWaeGOl%2BdMleRetEyY4zrlwFFw%2FtJ8NqNtWrYgCf8yq8zOPJB5IYwllkiUBoTPEE4yZXqZnTgkISY91c0mMvEU4Sh8ENZx%2FEKanHSz8Jg2Xzilg1yUIgsg1otfkKz08BE3386VA%2FE0B2Dj%2FoEfDgDuZ6435F7Jqji4l%2FhCvmvS6cyfWiLPB5yEs97JzJFRkYTXdZx1Xhyi7gDAZVT9V0rsskIUoNvSCTUMJ87PpyN%2FVnViNYG4MuhRW%2BDa8LyEOUUMYwl5zSDYKE3hgnLisg%2FQi%2FVs8iMGCs3Ibc668UL%2FCYuT5dyv%2FNC19SNWs7KzUl8Vnp4ft0bw%2Bg5d6R%2FIya%2Bw%2Bbf1vsNd%2BRQTtuNMb0SBBoyjG4UsSzwPkVU6MYLRic3rRDnFP7MFqf1%2BQhojDWWaZeKRZitZ6tx5%2F3YHTGpbLL%2Bss9raDFWjo26L2qvHd3NvX%2B0xwa1h0pQ4bHvkI3AD3Vb6vyIeUXsUwq%2BbazgY6pgGyRDGoSBd0VPYRGSiN%2FOeHGFWXP1Yy2S4q0u3T0hToP3OLhcZ49v2xCbR9DpjMizqm%2Bj30FWRv51tU1UnOfdakZcZM1%2FXQaFOK0%2BqEYkZQT1sBsnAtH96xaxhdwYDocpWXVxBxtjLbvqWx6Bg1Izk5Ut%2BaviXPUz6yV%2FyZcD5TDnndP%2Bzc3%2FdnIipofWtVazPT2lbH2FjKk8qwgxUCMK%2Fxg2aRxOKT&X-Amz-Signature=82038c36f23e87566831e3a96b057f3385498ad8950faf72659ec7da7cd49e06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VKVFF5R%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T202824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIDQnQzmuNu2Oqh5B7Do4G2GKONGMn5tpKH2vqXjzs3RXAiAId%2FnMJeByP73o27AfvGJrf2Exdu3AlqxIr4O%2BxtkA2yr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIM8lh5fm%2FJP065wrBxKtwDheA23CDohz23C5Ngb2lnqUp%2B%2FxPJUPFM6IeOwH3yYTu9%2FylKGqxiLUaD9XGqx9GRuDI4YRFGTmcrNLgHF8%2FL0a5bODR%2BvqsmgM9Ly%2Fzhsy3iAtqwLe94wihjC8LeJmbRMXvfrSo3ksfUBGmih%2BPfKkDzZMWaeGOl%2BdMleRetEyY4zrlwFFw%2FtJ8NqNtWrYgCf8yq8zOPJB5IYwllkiUBoTPEE4yZXqZnTgkISY91c0mMvEU4Sh8ENZx%2FEKanHSz8Jg2Xzilg1yUIgsg1otfkKz08BE3386VA%2FE0B2Dj%2FoEfDgDuZ6435F7Jqji4l%2FhCvmvS6cyfWiLPB5yEs97JzJFRkYTXdZx1Xhyi7gDAZVT9V0rsskIUoNvSCTUMJ87PpyN%2FVnViNYG4MuhRW%2BDa8LyEOUUMYwl5zSDYKE3hgnLisg%2FQi%2FVs8iMGCs3Ibc668UL%2FCYuT5dyv%2FNC19SNWs7KzUl8Vnp4ft0bw%2Bg5d6R%2FIya%2Bw%2Bbf1vsNd%2BRQTtuNMb0SBBoyjG4UsSzwPkVU6MYLRic3rRDnFP7MFqf1%2BQhojDWWaZeKRZitZ6tx5%2F3YHTGpbLL%2Bss9raDFWjo26L2qvHd3NvX%2B0xwa1h0pQ4bHvkI3AD3Vb6vyIeUXsUwq%2BbazgY6pgGyRDGoSBd0VPYRGSiN%2FOeHGFWXP1Yy2S4q0u3T0hToP3OLhcZ49v2xCbR9DpjMizqm%2Bj30FWRv51tU1UnOfdakZcZM1%2FXQaFOK0%2BqEYkZQT1sBsnAtH96xaxhdwYDocpWXVxBxtjLbvqWx6Bg1Izk5Ut%2BaviXPUz6yV%2FyZcD5TDnndP%2Bzc3%2FdnIipofWtVazPT2lbH2FjKk8qwgxUCMK%2Fxg2aRxOKT&X-Amz-Signature=82038c36f23e87566831e3a96b057f3385498ad8950faf72659ec7da7cd49e06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6KCN3GO%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T202824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDXZ733z7%2Btt3B1Dgv3sLaz7OvmUx5HjfF5yp4UbKPldAIhAI1DvY6ZBIuczaNgZV7RkcniSzG2cqneDUNUlobcmXBRKv8DCAUQABoMNjM3NDIzMTgzODA1Igz2ViwA9RRMfUhQDv0q3APHezsZW2qugSLs2Jl2x4Z%2F%2FWZeb3TSnb8tD%2BsfgCBH8qfHipVJM3GzILY2JgvDr6QHP6cGPg9Hgc68YcyrOdpLprVhfgRvzV6kujbtKhcZZMA16%2BYQYw3UIpdzEbXz4%2BW6XejiEwKYYL5DTV85t8EsSG%2BxMsXln4VP3FJUiGK0fOx%2BvLQGHP3IBgY26d6iCnPO02sz1OZG%2FINKGq4Dpbb8B4dy%2BpVAxYcbA7zeZtkf3ZJEIIYgT5xA6N3Vhi35K95kIcaYQ6bEvV5KhN6HIjtKWYtfl1AzsYPhgNp%2BApuVfDRYBl1gYpQD9h9qMnvme3vZIUT6rOmb4NzPVBbdjcV%2B7%2FwwuJNWSrwNuMtgkwckF3jiMUQ8G2qeMnSYjZq5l3svCZfzSebv4nxdZUSmpYxBObrVg2N19plgnhKGsSrWK8eXLd9Rd90vDSYAMFWp863Ngw0Cx8RRrKwUDwG%2B7vidLMLJfeUAy7Z5aAKQWtTKahGcvVTyNUJmcyWKFvu0OfU5leDmj0Rv1FhARq4VcrrGquyamLPuHu%2FesOco1qSo%2F%2FWvN3E7sKm0NOmYDcPa1h%2BWbwk%2F1%2F0yKh6kM3kSwqPX4BG2H7Q0aDxSMFb7xR6iRm9GMuvMNB14VbYKfzCt5trOBjqkAZishl2x4UWXczEFK1%2BtbM4khY892nEmKrH9EIdDN5LjnBSWfqXiHXN9GR36bAPXW%2Ftdp%2B9cJhz71nn8qWi%2Btnkjt7pzpmxiCBLiFmVa57GMKDDtohuWUhgHXvZMkW95ppe0e1t1F9Eyh50tHg8%2BNFCb7akps7DrSPCwBbl9PyrKEEoSayl3Ol3DxyRDbavgMQ2smpka2%2B64KR6%2BbsZR%2F76E5uge&X-Amz-Signature=74a26629555aacb39a56dbfd7b56218b13c0dd4288896dbbe1b0c2db04d46ce8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPSAC7F3%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T202825Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIGKcKgZoCJ%2FZReNvkA1%2FnuV64VDFTn%2BSz%2FRT0odHOCMvAiEA3beyeDKzqeA%2F%2F8iizwYWzE9Vkh%2BIvqUixHGHGgY66j8q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDJEshgDVsdgwmIXDHCrcA7bRyGrFkYezp4S4MPZR9bpqsOI4xfbDa75jS0Sd%2BUxuwOX6yWVt%2B9Zyd2Dv4XvDfacZGAX6wbe5MhC5b0t6PL5jDtwl1o7TK2vDxIfAUVOcI9LvH6jy4mcPB10KuEhT6IdZ5Ol0KF7Ds3Neqyj5vuEJrGwmnMwPO7YfMYCX%2Bqk2NUqVo2gE5TgHOzSXmCHa2N2TEGeqSZ1Rq0NlGXbXWOEbqyUtYh991g6iKbcxtaMTN5WpRUAN267NAhurJrxBBsVFcS0KHsfMGc3snS2uGfSWfCJpBZzn3t3DhDkJdaJq8ac7xuTeXrrl6cZZAzdIZxxHdYe%2FYm5tx16%2BUqUb8GbHA5AlagrlL3NIxRPtgwOb6veMd8dvEjvWOMeTBaem6L%2Bs3lAV1gFQEkpd9gWc5rGTp1%2FknkR2bZ6bojLnhT85xXDXxdibRaapu3DIgfttpGIwIhdIHciu%2BGQz%2FGC%2Fp5S3cTy%2FMJsr%2Fm8ukDGQTgETh9RqgW8IRDLSqFV20ckqbQWHCWvcNcvvv%2FrIkE7Ud0IWAGjhBqvUdTNL03f%2BvCa8jwnNMMu%2FuieNOGsgUhrzHG987%2BzkC7KY2h%2BCNQVSap6WtLX77%2BAfopfkafKE0Mofxv56bzAU0raJvgk0MITm2s4GOqUB1eucKFs%2BzojQ9hqdVctKigbLvgZrnijPVqoCIaqXTUpngDwXUniRm3KvQM2FZd6qSMoGpw1UeDCWYeTV%2FdiKTYdSlZq8Y5wu1%2B9fHW0cQGupiPSRBnQfMxACMFzZFRX6sqoDknYHVmhj6XvT6ZimTEvv%2FmTbhtdiHgHTw6iiLIUbAplCP2bgCoufVmj59SBClyNMiEsqHGLVTM4x8tEx4Lf%2BYigB&X-Amz-Signature=7d7740f3e98d025d7e51482dd2b2d4157f91b32c4d25d02e6c2e9e1ab34b8233&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPSAC7F3%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T202825Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIGKcKgZoCJ%2FZReNvkA1%2FnuV64VDFTn%2BSz%2FRT0odHOCMvAiEA3beyeDKzqeA%2F%2F8iizwYWzE9Vkh%2BIvqUixHGHGgY66j8q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDJEshgDVsdgwmIXDHCrcA7bRyGrFkYezp4S4MPZR9bpqsOI4xfbDa75jS0Sd%2BUxuwOX6yWVt%2B9Zyd2Dv4XvDfacZGAX6wbe5MhC5b0t6PL5jDtwl1o7TK2vDxIfAUVOcI9LvH6jy4mcPB10KuEhT6IdZ5Ol0KF7Ds3Neqyj5vuEJrGwmnMwPO7YfMYCX%2Bqk2NUqVo2gE5TgHOzSXmCHa2N2TEGeqSZ1Rq0NlGXbXWOEbqyUtYh991g6iKbcxtaMTN5WpRUAN267NAhurJrxBBsVFcS0KHsfMGc3snS2uGfSWfCJpBZzn3t3DhDkJdaJq8ac7xuTeXrrl6cZZAzdIZxxHdYe%2FYm5tx16%2BUqUb8GbHA5AlagrlL3NIxRPtgwOb6veMd8dvEjvWOMeTBaem6L%2Bs3lAV1gFQEkpd9gWc5rGTp1%2FknkR2bZ6bojLnhT85xXDXxdibRaapu3DIgfttpGIwIhdIHciu%2BGQz%2FGC%2Fp5S3cTy%2FMJsr%2Fm8ukDGQTgETh9RqgW8IRDLSqFV20ckqbQWHCWvcNcvvv%2FrIkE7Ud0IWAGjhBqvUdTNL03f%2BvCa8jwnNMMu%2FuieNOGsgUhrzHG987%2BzkC7KY2h%2BCNQVSap6WtLX77%2BAfopfkafKE0Mofxv56bzAU0raJvgk0MITm2s4GOqUB1eucKFs%2BzojQ9hqdVctKigbLvgZrnijPVqoCIaqXTUpngDwXUniRm3KvQM2FZd6qSMoGpw1UeDCWYeTV%2FdiKTYdSlZq8Y5wu1%2B9fHW0cQGupiPSRBnQfMxACMFzZFRX6sqoDknYHVmhj6XvT6ZimTEvv%2FmTbhtdiHgHTw6iiLIUbAplCP2bgCoufVmj59SBClyNMiEsqHGLVTM4x8tEx4Lf%2BYigB&X-Amz-Signature=3cb159ab3ba9e155294a17685cb5082d9d77ac029ee91f7ddd246102cd7a1857&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666V5UZ3ON%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T202826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIHoKkrbu0ibGgDrWzwnSGbGn1SjBi05D7dMkSYebST%2BxAiBN39z2%2BwqHtZE%2B5L2J%2FpV%2FcdHMxMsWz6nzugvEZHxRHyr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMwHPpwKyWUKNJa47ZKtwDJDGql1S9qh22yE%2BFVhZQpaoy74S6f6GoQQgyUvL5zDO7aztao1ji3DHzNDMtRStQYRt0vx4%2Bix4FS8WGg72MRVQR1KIIMOn7njubfsUNfDjq8EMR6jex72Bsw%2BTeIrdNcq%2FwyIJjIwRpqn4PP7mZgoZcly3HsEfoU2PFdSa7IirqK623tQnNmd0%2FSTiLXgObQIzxFbYkCAvUzyVCT3vDQznEGdLVK2MPEm6SITnTogRCQw%2BFHd6usmAZYbqRMJLa1W5CxXxyqUlMlWjNb9DrrKWTTpxLuVoD8jyJNvJMaewfESoaFNe2zNMj1hDeUSAH2qbyLTQSt8I9h%2Fg2XQw8Tdx9oUq3hwQXCzHjlm1lDIYlrwaHc1EhR7Yv2%2F0rc%2FOsRlaLRl3w9qaw9XjvIKFXcyZjqLyDl0QzzCW0Q1G3EIiee8pS9rlK6vIFnZpvHi0lPaa%2BdIG1j%2BRWNROxobCWmOEh4%2BP%2FJE%2FY3v6SxtTO2oqWy4qY%2B2Klru1Bcn2eRFdYWwNsF5GI6%2FbcRUhvPUgj1jzWy%2FbMr5ohPmwHVjZJaoVgS91Aqm0O1FW59Jms%2FtUvZRI6bMx91HgLIOtpaduzrKMW6YSlh7OHNWaLCXHi0G87qfDYnNtXBBnLtg8w%2FebazgY6pgEmS6VoZ6UG14JWsON3cizaGvj1WPhGzsVfaELTGtwT0q6lrecoHCkoxEmqCBZsN7f9T8c9yrKv0C5ersu%2F3QVNHpg4S%2Fwxj6FL2hqR%2FwFoVuHOP8nn6qZVlQaiNS678V49gyqwrTR22KMrOloSeDM5oEaiYuy78E05fvUM4bzYmzsWfUvMTwZJexO1sWGhmQjx1FL8W29ck9ET3p6tOLpPxZJn%2BoLi&X-Amz-Signature=c24117042ad103972e64347af862319d5f280484234f44ddfd93c345d4ff6340&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662C2FSMMF%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T202826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIDQiT1ar0b%2Bi40TP27xkMn98aeNHhymol5SpSJtupuh5AiAJbc1AmBGqM8Uo68zw4wPHyPKqxCdiUPbzEhauwS9kqCr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMNmzCSoKqVRdIG1oHKtwD1q40IlAQNDH%2BNtKjagwtrpGoQZmQyemq1QMldBHg4XSlwMvPAmkqZhqMSHCoh8ByYEZCsev9MvL1476w54wE1g2tQiNLVkmnUNeDSLkybMoLbWdaPItEFF6GBnORpE1d14dSo9GpoAZbIPE%2FiDDa6zVYsbwcUtMuQ3QDpbhlxd9S9ULgXsnrWXiYvDFV9IniTRq%2FXWlva1fHdMIiMVaz3hR278p80v0tQuc0E60DeOM6Hnqel2wziFghQQC3VZulc6kST8A56HbOWEBrMrYS0BJlv1uMFuaYlyvSsMfMkHz%2FuERZI%2BVU2VQwg57Y6l9XGefhzDnvK28f6fHooMpk4vM41t4%2Fz68TjSGGhLbaZDcQri34RJSNMQ0FmtbbtyJNTyAHf1ZhAtkaVW%2BuBenIJOSmgHZ0%2Ft6Y%2BNPV5GubdEDl3qB75rD0xNo86%2FyeOisRWWI%2B0Ud1sT2Ep2k%2Fot8IeO%2Fj7ltiuzwPSb4198iZlmHdGOVU6TgypCWTXQfPQ9KVp1xNcWrsaE4zzNFmG%2Fon3qb1q4qcHzPk1q4lfHsimX4cTT6HLr3jV1xuh7ZWlKG3%2FJrxDexbFMcRdLFoU0vgcvYeOvojGHpb7fe3xWSu3b6RdfLZyIflR%2F4VYccw8%2BXazgY6pgEuAqdXghQbYCm9OQpDhIEHqHpoNMNPNI%2FNrdYupXZHm8M8gSlwYZ0WEoEgeML3zBN97UoxFercWYTRirEVlX7jnB1vRJFw%2F9%2F091DaQcFdQmJ6o%2B%2F4FqHMIV4oif6PrxhhtiJhIODwPvW3ZBsnMgKIF2h5t8wP3w2HZZvmKgHAx8rceSzkxQr91n6fa8D4V7oCLRabn3sdma6v8Y5sJJlfqTL5TMFx&X-Amz-Signature=734428c6065890f72db2611be18e3b8c2dd3a6234a95bd283cc334ee247fe0a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGC773ZN%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T202826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIGgu7TGhAlSjoiT6TdmrZbTVbUBII5c4ebtpp2IiO08JAiB%2BkrQrjcslK%2BBuQk07CIzQ24Y9B%2FHk9bzGrYQuQUSWrSr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMO0qLANC9cQeuakglKtwDUKsPCRH%2B1Gh2Gyu8C5PeUCu9gQAegAgguA9hnNYvIGc02GHH210o3qkdHeImNj%2BJ1uX9i9zxCA7o%2BKqhWMaJb6O%2Ftn3e7VaXraWxPN5Gify1L1n2M1E8WVz%2BaQlCvjQ3T0zTzKsKqEzgs8q38xhAvZfccvpOv1uNIO7xTzfb17cSZF1vIleBZ042ehMT%2FvtQVpNiezdCWi2WB2PWjKll%2FNSft15I4okr%2FRHvJI0QwEmj0MfMR%2F7xLOz2SpRdnTO2jkx2CqIJIEsSJLSJOmadueM23iVV%2Ftqpvd5kWkJ6haMZNgwe5kpqPTRYW1XrWXefYYzvOgUwIHob4Z64Lrfh5a%2FG94j4O92z0Zgqxt%2Fclr%2B0bA3qNVl5p2cPgx00xZR%2BFenpLP2ha%2FHTGGKAgurtEBQFhU4SkUgVOg493zQnjt0Lh4kcykMt4joq7MC0U0wf6oAX9C6nPZfEC3j7Il7JTsfQO2EJ%2FIq2DMjkhNURvzdFkQLVxBw%2F8YKNZP7MQSZ0vsUVCIKFXqwfu%2FqCSZHrVlzUv11CZJRQtwvmQJdZ3Nki9zyul4qk9OYspF9daPg5yZIFhXmrvAFuE8XamGmtKrEBb0D%2BJnWmpKAqp5xTSNHvYBQf16Kyn9O5kMowrebazgY6pgGQcbv%2B4%2FnufXFM%2BKouaS10VXCy3b2dUtHbWaN5Moc2nrOSBERRga95eqrcA8N%2BkJSi9%2FdkrNM%2Fsrz67z2ktMnSx8C%2BL5DAb%2FHPgvGhzbuXqEm54A9lcO7Mj1ERZyHSK1t%2BZFjLwcBat9DCL1FmhuAqoNaB6Lhh0Y3VD2lHbR35beV6PCtyv7Fisr%2FFs0MtH5NF1SV1R3BYEcOF7veaQpkLzoE3%2FDRo&X-Amz-Signature=eadcccb082f151d39eb8bbee6932d6651a2a6bb6ee0c0736e7e379337398fa31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653JCOVCY%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T202827Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDZd7ehFLinVgMCqfI2%2BRh4cImBfN%2Bs9kYt0%2BM1%2F740EAIgSeoQuxXmXvkFsZbHxVMXSeL8nysDIW1IrFhQlyg%2Ftb8q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDKQfROgq9eo%2B%2BvLdsircA4NS6N%2B%2FcrDe2FBoRfpi0rgxDeHbiiG110ZaL%2BVu8dzpbhD319F%2Fd%2B7yqmJuLrQyq5Be5V%2FOuebUwSO7KIGdSOiOODtT91fDPIe5btiBkFlwaZDzYvyQLgxUm2Mkd6nmLlYjzpK2nCm5KDdFewANqrrz%2FHz4C9%2ByS1a2DIM647xZQiiTcVXoMLwtRuREjQ2rlULsXoY9iINtdwrUc11dylzgR7fbClO6tmCW6dHC8O40XuJrp%2FD3WQ1nDr766LNWzETwMtRF3gMcPsToaaZozs4laHrmtnHBR4RSexYn2P7x518iJuDbm%2FX8UAYNjfG29xDpEuuFWAMDUX3cwkJfJzG0wHkbJ%2B%2BEEpCee3v3qFaeo5tST3t7BQTjFOhqSlcmhKtATw1tkof5JQkFeFv%2B72KpFbRDWjBrTzygZ0ezHf6v1bbzOEcYWfIlbAdL5ZIbHqyWkm00WEcgwkcSSLe07omSH0iwYVZhoujsTOcGQ1sp8J9yWWbaH7K63zDkFOovV%2BLQjPZf4ybYJ8VWci11O2K3d5AlS2zzn%2Bz3RLyonpV53i9FZq7ZsxIfermItCPJ5g2hau0A%2FKpzjNmJwIZ9mDbG%2BtNmZScv7jrtWsI3pugkmPkORXEeRXdyGkcgMLzn2s4GOqUBxedZtruG7ecHcYWaXCreGTC1azaKqcbiURFkZDN1cF14IhjuJZk46AKvRSdJ2aCOyXWrcaBzlzNZRt127PjX6dKUFTV%2BFiNjn0HitS5%2FQfRczybcGsCH6onaOV%2FiWlUgyxWC7%2BZtYTTxf1%2BF%2BfyT82mh%2BAxGT9CCXk5ejGonimfu1lTz2szHrjCz6TeSITV%2F7TJJTZpqbziIbKrhnZM0yBBSxYSJ&X-Amz-Signature=06ac3d78e82d245d8e15121ff2eb4e61f14c5a3d6de11f46b472c7bf34883c5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653JCOVCY%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T202827Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDZd7ehFLinVgMCqfI2%2BRh4cImBfN%2Bs9kYt0%2BM1%2F740EAIgSeoQuxXmXvkFsZbHxVMXSeL8nysDIW1IrFhQlyg%2Ftb8q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDKQfROgq9eo%2B%2BvLdsircA4NS6N%2B%2FcrDe2FBoRfpi0rgxDeHbiiG110ZaL%2BVu8dzpbhD319F%2Fd%2B7yqmJuLrQyq5Be5V%2FOuebUwSO7KIGdSOiOODtT91fDPIe5btiBkFlwaZDzYvyQLgxUm2Mkd6nmLlYjzpK2nCm5KDdFewANqrrz%2FHz4C9%2ByS1a2DIM647xZQiiTcVXoMLwtRuREjQ2rlULsXoY9iINtdwrUc11dylzgR7fbClO6tmCW6dHC8O40XuJrp%2FD3WQ1nDr766LNWzETwMtRF3gMcPsToaaZozs4laHrmtnHBR4RSexYn2P7x518iJuDbm%2FX8UAYNjfG29xDpEuuFWAMDUX3cwkJfJzG0wHkbJ%2B%2BEEpCee3v3qFaeo5tST3t7BQTjFOhqSlcmhKtATw1tkof5JQkFeFv%2B72KpFbRDWjBrTzygZ0ezHf6v1bbzOEcYWfIlbAdL5ZIbHqyWkm00WEcgwkcSSLe07omSH0iwYVZhoujsTOcGQ1sp8J9yWWbaH7K63zDkFOovV%2BLQjPZf4ybYJ8VWci11O2K3d5AlS2zzn%2Bz3RLyonpV53i9FZq7ZsxIfermItCPJ5g2hau0A%2FKpzjNmJwIZ9mDbG%2BtNmZScv7jrtWsI3pugkmPkORXEeRXdyGkcgMLzn2s4GOqUBxedZtruG7ecHcYWaXCreGTC1azaKqcbiURFkZDN1cF14IhjuJZk46AKvRSdJ2aCOyXWrcaBzlzNZRt127PjX6dKUFTV%2BFiNjn0HitS5%2FQfRczybcGsCH6onaOV%2FiWlUgyxWC7%2BZtYTTxf1%2BF%2BfyT82mh%2BAxGT9CCXk5ejGonimfu1lTz2szHrjCz6TeSITV%2F7TJJTZpqbziIbKrhnZM0yBBSxYSJ&X-Amz-Signature=159a34cfab1c680dc8007d0975687333c4918f668a3e27c5fff10cf4232056f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466REFCR7T5%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T202823Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDUS5ZPQzYBLm17SVd6G%2Fap8zkZBc9wlK9fnKHOTyv%2BXgIhAOUrU0Pvcgry%2BpDHphZ3Hv7aF8sAfxkgRuc%2Fk70UUKKZKv8DCAUQABoMNjM3NDIzMTgzODA1Igw5U47JLYcTaWilkMIq3AMC%2BurQC8ArgLsAXAajrkjiM8Ie2gyQeBC445B3Dmk%2F9H3l%2FbmL%2BcfWUfAREns%2BoN%2F%2FKJk9oTlxUqFpiecGFR2xnEbvgZoHYXt1dsFG%2FHy2lon8wCWeGcGCWNW2R8Gi7lR0iNkRFDc09hLkXZew7R9%2FJJdA1ym2Hqlm1gepJOCduYQqNSrv2RZnYrzqEOFLgz8kCKXS5cU4r9FAcD1opgP4tNFQwLAK84kWXjaqoLBQ0PYHOYmUm0LHeZvuNmR6JlrpRFN22%2BXREZ%2FujQjRdtX6OfsAzajAKL49AW5Mmdu%2FE64K2kaHZ9E9YPyYk%2FE6F10%2FWZTl0JWpMzBjwPg7Mt5MFTpDMnsX6TWu%2FHjdZauKFMES6Gg0TYYiwJTW41oTOx0QF7lExo%2FU0tOX8TC7BXqjzkRtBl9JwuaqHWTXoMa76RFI4D5XI%2Bhy14kcb7bCP24PTH3wp3GgDHRyNsgi8ezJNpGZiqfaqN3Elces9wUDEzVjd1NruefcjrGJnjRmgZ1JoffGEH1ZbT5GZbDdSFlPMqHgs88rV6Y9bZPBQVpgrP0gVFQgGJGlY%2Buj2skf%2BGQVEu985QG8ZMFijOrkUgWV%2BDlsWIMwrksgChiH%2B6uoqCl8lz2kDo35FfCzkTCY5trOBjqkAY3itDxgBAL8ueh8bqAjeAVEPNHb5j3YXVXlVU8El6psiFWYlvCiTBTXcmBG7I%2BONxuM6Bs9a2Ms5art2DK6f8et9R%2FF8VTZqtm43hZwnxu2oAZtcaweltwiuDa7ly9xE%2B7bnwNnq6NjwER0e69PS1k9gXRppTohfWfHBbVqxWqY3ZMaV%2B2C3j6xsdwJ0POceULwO2tO06a9YfIEzvWBK77%2Fn78w&X-Amz-Signature=f8b62c056dc7f60a105c3ab72ca2b21ad7999afa597fd5cfd44ee1f18ff2c878&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LFTOVOV%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T202828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIF8Qu4n%2B8nGYEvVSh%2Fpn13f0t2YbVbaMp1r203kS8%2FCzAiEAzM0TAp%2FpwArvzt00AGQ5Jk5p1m4%2BAN6f6fwCV3ACoHkq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDBEYQQmcLAmkeF2aiCrcA5Ww5DvkzfKytz1oKlKu%2BvDBkh2SoSd%2Bbh5OvAEGrqdrutJe6SrLesGu0w78o0cBzT1ANRwFVFZN6ZfHOGpCNeTh4t1XOF0OqWP4VsNIIzuS3wp%2FpwzbQR6deTwUmadMGuPUWty0EsVt66BPaQKGD8IlxTW76fPZEtAAnt2J%2B%2BA%2BXZKsSkWzW8d1MMHSHMjKB63jjTaG2dnAMxy9tD38FT2f1XJ0MTulVwVle94UNRxhNv40xY8pYyYb7I1ufV2L2vw8Wxe0BNi2zA5XR51yM%2FPHtM%2BlmaOT6%2F5TBkmQ1CqP3IvqZOtBMYVXAeUH5SG4g8jiGMY4jSNgqrYQsvjb52befy4CjV7Z5GVKmHhg4FbkiEpMXta1vu%2FZPCe1V%2FzX5Mf%2Bn7p2n52pTe7t7d3o11Crj0QL0j1DRcKalcWFQOdmtMOCmO7coHEBvUSATgH5atyTHhVwjOk7hhSuAKxCN0TFFLNqLhoCpAwDdvXmaNHT5TQAJ%2F%2FMYPS0jN7ROqqujTwQzkzYyMmeTdrS8hChTnwSpdfCgbdccuTki32RZuw2%2BMMS0gZQ5kb5c2l8PlkCzlfiwKwKvfeu6W83Fn4hftEN0WJ8e8IeGG6cLlwOIJ3AZ%2BeJIlAoS%2FD%2BSHQgMJjm2s4GOqUB0RCAHcHdRQEw5mBSpFj1ifshrPcMVGh8YyGsxK9Xwcye3xgNXasW%2FsAzneEwF5WLEIfYK0JurrZq5m%2FDlzNk9BofBHNOzkA9CDoeFBPXorFStOcB3iCMB2iHNMUQR2tOdKTfvIc9tNQL%2FJ574lspFXC2AYSbrO0n5Lf8g%2FeWq5XZwToJtmY9w0Bn5DLmP%2BGDh9QoCvwafooDlEGNCGN4UAnST8s6&X-Amz-Signature=66277d8dc720caf7cfa2afd153a392fd1031050578709d6fffe5cb935793765d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LFTOVOV%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T202828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIF8Qu4n%2B8nGYEvVSh%2Fpn13f0t2YbVbaMp1r203kS8%2FCzAiEAzM0TAp%2FpwArvzt00AGQ5Jk5p1m4%2BAN6f6fwCV3ACoHkq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDBEYQQmcLAmkeF2aiCrcA5Ww5DvkzfKytz1oKlKu%2BvDBkh2SoSd%2Bbh5OvAEGrqdrutJe6SrLesGu0w78o0cBzT1ANRwFVFZN6ZfHOGpCNeTh4t1XOF0OqWP4VsNIIzuS3wp%2FpwzbQR6deTwUmadMGuPUWty0EsVt66BPaQKGD8IlxTW76fPZEtAAnt2J%2B%2BA%2BXZKsSkWzW8d1MMHSHMjKB63jjTaG2dnAMxy9tD38FT2f1XJ0MTulVwVle94UNRxhNv40xY8pYyYb7I1ufV2L2vw8Wxe0BNi2zA5XR51yM%2FPHtM%2BlmaOT6%2F5TBkmQ1CqP3IvqZOtBMYVXAeUH5SG4g8jiGMY4jSNgqrYQsvjb52befy4CjV7Z5GVKmHhg4FbkiEpMXta1vu%2FZPCe1V%2FzX5Mf%2Bn7p2n52pTe7t7d3o11Crj0QL0j1DRcKalcWFQOdmtMOCmO7coHEBvUSATgH5atyTHhVwjOk7hhSuAKxCN0TFFLNqLhoCpAwDdvXmaNHT5TQAJ%2F%2FMYPS0jN7ROqqujTwQzkzYyMmeTdrS8hChTnwSpdfCgbdccuTki32RZuw2%2BMMS0gZQ5kb5c2l8PlkCzlfiwKwKvfeu6W83Fn4hftEN0WJ8e8IeGG6cLlwOIJ3AZ%2BeJIlAoS%2FD%2BSHQgMJjm2s4GOqUB0RCAHcHdRQEw5mBSpFj1ifshrPcMVGh8YyGsxK9Xwcye3xgNXasW%2FsAzneEwF5WLEIfYK0JurrZq5m%2FDlzNk9BofBHNOzkA9CDoeFBPXorFStOcB3iCMB2iHNMUQR2tOdKTfvIc9tNQL%2FJ574lspFXC2AYSbrO0n5Lf8g%2FeWq5XZwToJtmY9w0Bn5DLmP%2BGDh9QoCvwafooDlEGNCGN4UAnST8s6&X-Amz-Signature=66277d8dc720caf7cfa2afd153a392fd1031050578709d6fffe5cb935793765d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJ6CVGKD%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T202828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIFXb81ZXiOyuFr3epRR1BgQim%2F%2BHNB1AyW9O%2BoG43n8GAiEA%2FWbz0QryX131EuYX2w%2FIHkTWOkqX17S2tvTbJ%2BJYdD8q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDMK%2FSYVx7kXv4VYxcCrcA29wVa0o9eULxisAOPUsn8P9%2BEW41lyGaJI1yS4ABBloyGw8CNlOAxj1Ua7d7XF9TyqQbdyl5y7IAvnA5cGFN68Q9Tyb7kn57oTJwUoIMUgyk6Rj8kZGQgmlFyHMhs%2ByvPkeUCzV6h6YGQ38bmylfCM5K%2BQnYKqpgWEx%2FJPr4uNFd9Wer8qq5xX%2BNDVgT7JrmXHgMw9Emol40aTouzRAgQ%2B0qr7VXCY88uI0XxkzbKJ8Tuhzt4buhuJkAoAIsT50kz9LpQXyv8OK0W2GPMVcqFUmMEorpCY94k4KsKRsq403GlvrNYKpeDzo8C48RWgCc020wfJZIGFoNzsCY0pQSbs8iCcZJewSoOHuQY%2BVjuVP9XgEZDkxYC%2B7RORir5xlDhXq5z6FLTdwH%2FZ6b4NkE2fzbr4EU6U7uWprKAcTfENI5cyjaNaDot1eHpi6XyfP%2BUdiSaiLg2yjTDdLtkXhnRNVnc%2FYMgMXIr3rU%2FGd0Fy7fF%2FCf%2BeWgYJ6Vut5yg790KMNI2OdTI64iXnZ%2BiYP2yzgg9gXQnliQ6wnHlX1S2OXzBxEZ39ba%2FGQHhOqJc34K08xtvrtBazyWxv%2BHV6Fn4%2FADkcj%2FKGQFiANk%2FVr6mbXof%2B9295SvXQ7QpndMMzn2s4GOqUB%2FBROSgMYpC5xrzWKRSo%2B%2B%2BeqtXacmsI3hd0yqd49tT%2BWLd50Ejbv7wk2lcq9WvmsFbZkCnh712M%2Bd%2FvaGzTPtNG2WllmYVF250FAj1DpoL1Sw8wiD68WU5FoYRk3458VXsPTGvuEvo9e9H6I%2Fr2YSNigKJjK45Fgf4bXL1U4TaQab9fqEhosCz%2B8oKbk0Zdt7lXGdWyiYQ7MwYSfLc2lWqaSuvUP&X-Amz-Signature=8fedc1396d6e20e66a3eab891364b10f820c1e998e70979b1ff0edaa59db562e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

