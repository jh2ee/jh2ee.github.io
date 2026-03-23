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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PHOLDGM%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T060152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDR3U98sFnxUJ9DW9jyBgvt6%2B8qarG5jSiF9uP9IBUVrAiA1egt1Rk0xNbD8uMCKw0ud9ROUp3teXddyVV5z3qp4Kyr%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIMyFGQYKrvYjdwEUMuKtwDLFOA0o62zW3DwIRP2uOzN2hZHZm3muj2ABsnNoluWgKUEGuk34JXBN0qnJ53Clp6VlvqcWycpz1HtILtuKEyN80aUUbxylRZmq0%2Fd4DtnvdiNbkZCiXIpMRnBvTQyv9%2F2PuMIzwSxkx%2Fb0AFy8N8qDthDYxJdZ2QAdI2bUK4Wz9tBqh5x8EI1DZYXHpPZule2t2eH97G4PIHJ0hf3P33rKNTetF4idyWT7fSHoCrJNgBGzLgj7D0RP80mwfhlcvw1DxMWGMLmfOHltk8RmSJ2BjWAOmq4B6%2BQyw9i3U9lYsPs%2FDyRGscb%2BdlGQe0oE6FWq8%2F52747z2DsWJU7AYDLQwQxY07e6ZKJIEPhTn0%2B9JFqxzTBJESCdDEn4Qd7l%2BBOWJ1n3UFBnAXN9kXTYe4jK%2B7h%2BtlZwvuvDKsTzM9qcaU8g5GecNaP6N9Jm9qr2M3yqTUho6S3hXTBLzagFEbhOL%2BAp9ukgeUtrqupbzra9XusS653e382xmvp%2F5BKrcM9hVniqjVVYDP0NXztygT9hMDjPX6rW4aeJcMShbzyHRBSSAYn%2FjQFlUmBQLEjntXj68fJ67gxC9TmB4WmKtQPMNd1%2BXYtGaxOhiLoAg%2FcKE4XPXHcvdKcBTRjkww8pGDzgY6pgGPNBYmaWRgUrBETXj%2F55CwLKfvD3aIXwH55oGigyjje0SO9PH56PTNDBQ%2FmT%2FExyngvn8Zgnw8QON6WTZ4RPyV%2BWAn%2BJaCrIdJ9vFVBTwVxOCM8xF4JB2BL5GRGZoZtpVRLp7PijBKbj6h%2BaNDimHFeDx%2BD7bn%2BwUur94NrMv0Yfp5TSAW%2FcQln88y%2BqfntXG6rT4VW%2Fx7JZ3MNLEexZvP3TH34pKL&X-Amz-Signature=707c53a7f155b4fbec1532fb1fcadef0ec580bd4e3bad28a18eab47b99da62e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PHOLDGM%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T060152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDR3U98sFnxUJ9DW9jyBgvt6%2B8qarG5jSiF9uP9IBUVrAiA1egt1Rk0xNbD8uMCKw0ud9ROUp3teXddyVV5z3qp4Kyr%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIMyFGQYKrvYjdwEUMuKtwDLFOA0o62zW3DwIRP2uOzN2hZHZm3muj2ABsnNoluWgKUEGuk34JXBN0qnJ53Clp6VlvqcWycpz1HtILtuKEyN80aUUbxylRZmq0%2Fd4DtnvdiNbkZCiXIpMRnBvTQyv9%2F2PuMIzwSxkx%2Fb0AFy8N8qDthDYxJdZ2QAdI2bUK4Wz9tBqh5x8EI1DZYXHpPZule2t2eH97G4PIHJ0hf3P33rKNTetF4idyWT7fSHoCrJNgBGzLgj7D0RP80mwfhlcvw1DxMWGMLmfOHltk8RmSJ2BjWAOmq4B6%2BQyw9i3U9lYsPs%2FDyRGscb%2BdlGQe0oE6FWq8%2F52747z2DsWJU7AYDLQwQxY07e6ZKJIEPhTn0%2B9JFqxzTBJESCdDEn4Qd7l%2BBOWJ1n3UFBnAXN9kXTYe4jK%2B7h%2BtlZwvuvDKsTzM9qcaU8g5GecNaP6N9Jm9qr2M3yqTUho6S3hXTBLzagFEbhOL%2BAp9ukgeUtrqupbzra9XusS653e382xmvp%2F5BKrcM9hVniqjVVYDP0NXztygT9hMDjPX6rW4aeJcMShbzyHRBSSAYn%2FjQFlUmBQLEjntXj68fJ67gxC9TmB4WmKtQPMNd1%2BXYtGaxOhiLoAg%2FcKE4XPXHcvdKcBTRjkww8pGDzgY6pgGPNBYmaWRgUrBETXj%2F55CwLKfvD3aIXwH55oGigyjje0SO9PH56PTNDBQ%2FmT%2FExyngvn8Zgnw8QON6WTZ4RPyV%2BWAn%2BJaCrIdJ9vFVBTwVxOCM8xF4JB2BL5GRGZoZtpVRLp7PijBKbj6h%2BaNDimHFeDx%2BD7bn%2BwUur94NrMv0Yfp5TSAW%2FcQln88y%2BqfntXG6rT4VW%2Fx7JZ3MNLEexZvP3TH34pKL&X-Amz-Signature=707c53a7f155b4fbec1532fb1fcadef0ec580bd4e3bad28a18eab47b99da62e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPDM57HX%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T060152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHtFR6mbKfGn8iQi37pRXXignxmbCgCqU3VkjrcHWvU6AiEAjTLyIuDa6C9N8pGgAC4bQ4LOuSJqhmjzX75xSvUTwv0q%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDJOemFIla6EklbA4kyrcA2L%2BwuzLmJyjGgTrn9SXL3L0EkLSUiNKyUUaeSrKrEorXMtq4oAoTiAmeNzKK4ki6A2coyacO9hh3XX8SGgqhYqlysm8XKTpyj7Gt4G0%2BWOyxdjYMTs14uMSc6peYRVPtvvR3K7h69VDOg90w1XlZ%2BeG6L0yf9ttlOKNg9cBHKcZ0vK0ZLUVzvDn9275HhgRoualqLHoJZU1j1F1lTrhdeFnRknlls8g8cx1MKQUSnz%2FwxjPHcEJZEwLmCeNilleCgYO8xwgp%2BaLL9rKfGH9iYToftU%2FKiXQQD%2FpNozGZ4L%2FYwGvtR4L4UcsasIhsJXQ7cX1yAchwPzj5KodN3NtgMLv%2BUBZAmsGJXWMzb%2BC7glzEm4Sf3JiqII4%2BHcguljsuHPpWhQ9AfuPZ029HIo3Pk4fe14ELyIZAHNszLzgGWwk9Agn%2Fe8u4FP084hW%2FceTVbGzfPQR5po2VQPNJbcP%2Fm73BWV3rC3qnEaqHjGKuhFrf%2Bq6w5yiw0mrTMWWBQqQWkrBSIdJWC87FTdCCTyS8oLZnF3CMUWnIlmwiqOGdHyTlMYNE%2BGKePJUZOaMYxCzp0LnwYJudfVbY6s7U3tjarV6PXd23%2FmEXvrrgWLHARlgyfiO8Cz8t3uEh5OzMIWTg84GOqUBdtcS8cg0FqrPXrM%2FXnIfuI%2F6LRLJ3wEE4JIKPCt3BymLraEr%2BKlpte5sXWZb%2BH44hFU7fwiRR1NFfTgtET1AB7P4YsmLib4%2FlXPmLlIwOr4bDM8eb8MmUFCtZa2qZHg06aGhZ9qsCKDBz5a5wIuVi0UChDayvlTsb42G2yIKzst17vgKCGJJNAC97pThxS%2Fulzrjagtphs8R7li7UrCQDYIL7Gjo&X-Amz-Signature=ef8625ad27c0fcf587db620bb028110fcd9c7da088857bb67a1efc19fd6b53cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LRGYZUZ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T060157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAXEIegWYbrjEYlO%2BG43kLoOFKecjhBFpimeVrrtTg7aAiEA%2BpewYfuq8G1nCwBt%2B8g922QJR91kRN72xrgm2yR11nsq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDAJfx46a6s6iitCO6ircAzyGIuUXwAmL6o25%2FWkZ4MrAG2nBSTub0cHKzVot8Z0Kt27wGhYjUGiFMbknCMCDPjeg9U9C3ZMUdKiDQo2%2F0BtK8j74fAp5RjTgWwz05c0m6IEq%2FIQwgc%2FaSr%2F%2FHUlNzMjIgHkHwyxHCzm0JLBZD2jfe1XNlrmNyesHaeLtR68uc5GpY3kmRp5NCltDt1cxt2ivDN6oriuFSuV8ylHvzxnz%2BMzrZxsHo21fkBi%2BKxcgYEuwMZXrnJHa8bN2mzjv3KXoA%2FUv8hpwWHP2pZFcevQEfKdtLq7sf4C3tnwse8E2jnnIZNlCcBzaWxt0AgO46uLP%2BPFFaJhAjkxPHFkxi%2BegQO6n5XFposNLBVF91WjJPiiqXd73igH054d6UgxR6ouAFmbRZQXEQ0oUJzg19UtZ11z4QeUnFnmxvZ%2FhJAlJMRpRyjGl7S2b8GWpJ0BlK%2FMhxDCBmD26fL1dHh214wkSw7oPffA3MWZoac3kE7Fb7Ko0YYnamTkecsvPsxw4j1BJWYhhCYgqCAiNrhQLveA7JtEGKClLApaQUlGIXyXpGjBRl9Ar2UCnbnER4FNw4wpo%2BMRdaMsPeGgOskd7kNyqY5CglC5a5HW%2FpVHIbM8MmE3C8ZD5o1MWnLfbMNCSg84GOqUBusuaFiiBFSZiyZ%2FsawfYcxPElp4YbFlkmqI%2Fp36EmFJz7LuiIxDNfxV52ix6cHUpGzxVBdr2RwVeJmneJJTTB1Yy1sI5zytWfvSCRULcdNVLRFEG5NVZSCMBAUKEW63a%2FrssXEofqn2O3JfHf7Z5UsquCOYRiFxMK%2BKd%2FQ0uSaYrB9oqEZIhAl0SD2nFszcxe25aJMc6eBdLOfH0F3ui%2FzisrxqS&X-Amz-Signature=44f9115e1f2b357199efe697c8428d3d375fcd225866a494478778267f40b936&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LRGYZUZ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T060157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAXEIegWYbrjEYlO%2BG43kLoOFKecjhBFpimeVrrtTg7aAiEA%2BpewYfuq8G1nCwBt%2B8g922QJR91kRN72xrgm2yR11nsq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDAJfx46a6s6iitCO6ircAzyGIuUXwAmL6o25%2FWkZ4MrAG2nBSTub0cHKzVot8Z0Kt27wGhYjUGiFMbknCMCDPjeg9U9C3ZMUdKiDQo2%2F0BtK8j74fAp5RjTgWwz05c0m6IEq%2FIQwgc%2FaSr%2F%2FHUlNzMjIgHkHwyxHCzm0JLBZD2jfe1XNlrmNyesHaeLtR68uc5GpY3kmRp5NCltDt1cxt2ivDN6oriuFSuV8ylHvzxnz%2BMzrZxsHo21fkBi%2BKxcgYEuwMZXrnJHa8bN2mzjv3KXoA%2FUv8hpwWHP2pZFcevQEfKdtLq7sf4C3tnwse8E2jnnIZNlCcBzaWxt0AgO46uLP%2BPFFaJhAjkxPHFkxi%2BegQO6n5XFposNLBVF91WjJPiiqXd73igH054d6UgxR6ouAFmbRZQXEQ0oUJzg19UtZ11z4QeUnFnmxvZ%2FhJAlJMRpRyjGl7S2b8GWpJ0BlK%2FMhxDCBmD26fL1dHh214wkSw7oPffA3MWZoac3kE7Fb7Ko0YYnamTkecsvPsxw4j1BJWYhhCYgqCAiNrhQLveA7JtEGKClLApaQUlGIXyXpGjBRl9Ar2UCnbnER4FNw4wpo%2BMRdaMsPeGgOskd7kNyqY5CglC5a5HW%2FpVHIbM8MmE3C8ZD5o1MWnLfbMNCSg84GOqUBusuaFiiBFSZiyZ%2FsawfYcxPElp4YbFlkmqI%2Fp36EmFJz7LuiIxDNfxV52ix6cHUpGzxVBdr2RwVeJmneJJTTB1Yy1sI5zytWfvSCRULcdNVLRFEG5NVZSCMBAUKEW63a%2FrssXEofqn2O3JfHf7Z5UsquCOYRiFxMK%2BKd%2FQ0uSaYrB9oqEZIhAl0SD2nFszcxe25aJMc6eBdLOfH0F3ui%2FzisrxqS&X-Amz-Signature=6f859c0044e54921ec3fab1498c236df91eab3f43c8088c0881fc2409c2d4e67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXNMF35Q%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T060157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF1%2F0b82HzszywaXmPTqzdO36xO0jwcNDyTkJytHqvtDAiB5IUdGF4ZOECQkwOQx0%2BRDD1tcVwfPV9UzOX0LaTitZSr%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIMOewtt1gbslxaHg69KtwD5MhmON2zN%2F%2Faut1czkPNH8dQFFTKWlLUfG9h87YWmdI4cLNQCFqb1zqapO1j6e5Z%2BfDmnmoJadih74NmtrlZDNakljsGpUMM%2FgGt18zq%2FHpOWoo9%2FuC40iOfdxpJMorSvsi%2FL1sqSI3vFMvc%2BUS0XngARr1Nqpf2G6Fqsdpa7VzHFHIrfgpL3%2BOKBTsWSkOrzjUGYY4Y55pueQYR0ioTQvXkYXQVubQv3QSi4IXQv3huMTHLteMfmMBctWa0lItHvEosnpxNQ%2Bx8YtrBCpbXwsxDdrqZOb1oinlT2pWVF2w7F7u6xNsAhL15LBZymDpcaHYEc6tKh66GoeXvyZOxpee1CPraTaRSDQA0piyAyfgMImu7V4K4xcwiFbhFyXe10b3juTMFj3ByNiH9370sSzT1le8NggiuX%2BzA0ZeGeiyuAV5fEhRbhChcYOEU36OAMM5UZHC1FHnOJ%2BFhzKJRGh7uaWWVf1QEy%2FSqw01Fty2xlP%2BK2EiWD87xMX84fu4%2BdDxKnJR27Smlm4b4uQIN83TNfTR2NEQzSdPcnc%2BcCYD9yNjNvHSdtxN39JoKrbXZ74m4q96QsdAcAPrxPYFb7IxVsdzBOceCw5j9qvlRPSKUas%2B6E98i2P1RPiEwopKDzgY6pgHau9OwojUn0qjWG%2B8sfb3FgqmPcJIG8EchPaV6QHByCLnNPmBfmEnelxynccDXqj0MQI%2Bb6C0TeRg7c9QTNaBazC2sFK2wuLnQYYxqOq9nJLNyqjiuXFhvjWY1XgnyTMBt8hvg8kMqQXP82eEKv2P8IBRjZapmkCzyUuKC5GE5VeEl9aLiggnXwTOsGw1JCmHiFt8gtM0qZFI5UqbtMeek%2FpAprzV6&X-Amz-Signature=fcabfc4a3ba1401cc484adca9257f7780f698bedec35789c41426611b346a617&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SB2CJFZX%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T060200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFeFcbbeuP4AAGk3wxUlY9Bnsa7BtVDPxK1eed6bWS3LAiA1Q4j3wltIyO%2BqI3zGmPvD1nhjBPW42jgppRi7WFS6tyr%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIMv6zjSl8yYypaDdF4KtwDFOraNtaRcUYWbciwYs62XdRdUNHAUjJMeLN6hi6CdlB6X%2F6qgi9%2FrLFsgQbrEy1XeWzJtGSH01IvT1lnEt5chdZ7gZA0oUG%2BcqiSXV7U%2Ba8%2BIHyIN1Ov7%2FzlFHOkaW641bYZMTN8e8S0zUiXJKiu%2FR8J6khSdcfEpnEkHdGbayrHbZi4kJOubmrMpV131UUC7d%2Fonb9fRRezikv4MAgxIHkW0myvBD4p3vXzj3KdNYQN1%2BhGLnKJc5l2%2FZTn%2BNqVJQJlWDpkgPSNsi5vQ6t8UXroEry0ullld3imBdj%2FTke%2BclEPwkrYcXYsNlYVfXsAVzmJ6j1uHy9EIGLOqKppVGOwDnOWIvmizZmT29jyvbezl6ts96MLDxgQ3%2Feb7xanZTY%2BS%2FISi%2BXHvBLZKYJ1S9CyDZezUHH17v%2FVJG%2FtGcqV7dW6JUReeuNyS51MSZxTk4HOhubgdRE806O%2Fdcmu0Z0Gni44UbowUA3EyOWWziLr4jfpBlM0mrwswmxygET6CpbKIX4%2FI23ParZBOiQNCD7bfkCFanaQcaaRGdRESLvErM3IvIOnxjucVRyBV42tCHjASYbI4jzi38j6S0U6eLbfhMFagKBZh7Nl1gHYm6MfAPq1ZkHqNzm8zYww6JKDzgY6pgFPDB%2F%2F7Yd6MtakKyNlyXgea%2F4MBGimbIjBeXXjbaaYppdaGKd8IeVXN1sLFfOCcd16KzSSeIOprnbi9Xm5ulVkWVDKYe61qlbyL8VgsBI3ZPIlGtXkITpkHQbSUmTr1v8KyMNhvLwW%2Bvr%2BM36ST6FkGQK%2FcrpEb6X5WEcFiTMUGzYzOTwHscxfvRqiemTskwExCCjKmjtIws%2FNNV7uowonQdI%2FxHKX&X-Amz-Signature=fede843eb73ad70bc0cb3b506ce8a2c9efc2a361bfee65697e9df65dff80d8d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HFNJYEB%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T060201Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDjdAlygoM1HHAb7c4T3QiHjEUFA9V3v2k6vU0ylrtHSQIgOtMxLsDr67kjAoJNa6WMwproP3qrNiSnMUer2Ww8LcEq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDCpfwvgUBEh1J1qfQyrcAysyoOs5wxQtCPdh9Cpezx7LqOuy9LI%2BiSPyJ5jUUR22Cc5AI1f9HPZQpP3%2F3bNkTi67jI7LApAWb4zYx%2BWKVDNX5l%2Bh%2F1fOBmZ45IDBgntERAQfsp3SfS8mhgVE83fwlcPWcYv0jhtGrxk8hkznC9icZebywsSdSOdfzZMxZWmzAztUAC4DBOb4qwtGgpp4NNH74vkv4n8sYArOHQ1ywBOk%2F41RmcxinkAy9tJu2p%2FeQguoBCymHXTwjpLaGbjTC0FHBLZPityfIkstlTGDPViVkhOJshtD9ih%2FlQVI92VmNk9l85XcGp6FI9JpLXOFBTxPI1zCWaYxOocHLetp0Dvt4sA15ehOazkWMdfPowiTILjlr79r7dDiXs67owc9ByLcZ%2FV144PMrrtwadqp%2BPv5Yzhxh71wfHSFiILP84%2FehGffFNFpY2UTmbR5MyAnY8ce1JQ0K6kYfvizWi3fj8wYSixDQuRx%2FkVDkmr6rE5YZ%2F9rH9SN%2FAX6SWb229o0gpj83IgJ0wBFLfq1xVYbP5sx4iCymDHLhclmdUs8F%2Bqefj64HpgcwNZakbqOrncARB7csfGnxLwVM9ARt%2FtCUzwpdiqJ%2F0RJUDWRlYed948EyBb7zkUY05v9SoWkMNKSg84GOqUBbB76cgFusDlv7ACmby3fVfnql6elJwo%2BE1xNFdG%2Fp%2B6L3V8prvU3m1%2B3sIjyRdER2J39R4yIdEL2tdNutsw7mV7k4HNzPVdvO%2Bqo6CfYFCti5L35BIF1x6s7PQP1Lmcr%2Brxg5BNtNpy57cOvU9eNppd%2BZUXZl%2BNYQO%2BOlMOTLErVSGqeylr06jSvsT55miBxgyVNhYGMEd7kcvusxjusSwX%2FjDIR&X-Amz-Signature=d97f6391f51595b7cac1d8a42f3d90650b6febe0be73c0220b1e99c0af765236&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y43GHIBR%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T060202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCttD7bxLXpHeIm5yAGTU%2B%2FsGsEhNjBxvPikw6WU6PjvQIgS%2BogphZtYiK%2FUh%2BWK57XMHHueSguW7QcZD%2F%2FjpQAR%2Boq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDFLQdVkHmBAN473FTyrcA5SwTacltAgzdcIaTpeH16HtLvDVHh9KLBQGWICGbIp0FfX6H21TZoPWzIH2wTgnr5MSTeRRHbdqXntGLn3mW4gaB3JQi%2FiNcoyW%2BxjJdaPN%2F9TFBVemPG%2BK1w8zrNrDEPtON5TfWQHiL6o5PKqDRCZwksyBZ8QhnK0EBWWEsbmOAq%2F%2Fvqi%2FAqRqr%2FrR5AX%2F4OO%2BQE4ml%2FD8bzeRv8VgkOkoWN9uQWtx3f6dhiHX%2BwX28rR%2FvqQRJ2mD0Cr9nL8K9yDP5z2ux5DRlLLMsOClrE%2BKkX5vvuDQ%2Fm018264aNws1LZoNHjsRbNj8HA8Du7Zu1EmMZQGOa8CAfHcJk8bRtkUxf%2B9TQHq7eoNr7ck68PiPIRAYScfdulmrKj1jmzrbfjSTvlAg57lzd8715vcyALK%2FVCEsrSK5hA0W2k%2Bk3q94xDWzYoOpFbG%2FIhMF868d1zuaTustYiYNRFr2PfZApBjTXA7SJLvy5pgVJV%2BlATPnGeiNNAI6JMTmGfisIEe7hAdgVrjfUFkJTxBzcN6tMQ9j5zdytFSR%2Bc3a4nf8iftN7%2FlQMqS2lBRbEuzd6Fx2pekMYRE5h5xYReEw8MMxQSOlQBb%2F%2B76QU8Ny7OUzDUusTlmgXsFCLXYmXMtMMmRg84GOqUBVtZ1cUXEy3MBum6y0oyFvhE6lzZASBQt5%2BYIY8OGWlHXWiULLN1woRGm2a3OzFfdq6W9wqoTk1hvESHOsFBG4CdrVUkfMOAhalYGH4UCUlnIw93fwoji6S1YO8QJrxUqJOlcVYRw8qeRj3u7F7S5zCJM9wZKBJikbmxnNT5s14TjqtHMai2lIjA3YVjtOrnbmvlHZxocrdT%2FUovBFADj20S%2FZWGs&X-Amz-Signature=9d3c2940b1ff789c65b80f1d276b80eee916553d051c3fa4703cc0dd7ce6a7f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y43GHIBR%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T060202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCttD7bxLXpHeIm5yAGTU%2B%2FsGsEhNjBxvPikw6WU6PjvQIgS%2BogphZtYiK%2FUh%2BWK57XMHHueSguW7QcZD%2F%2FjpQAR%2Boq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDFLQdVkHmBAN473FTyrcA5SwTacltAgzdcIaTpeH16HtLvDVHh9KLBQGWICGbIp0FfX6H21TZoPWzIH2wTgnr5MSTeRRHbdqXntGLn3mW4gaB3JQi%2FiNcoyW%2BxjJdaPN%2F9TFBVemPG%2BK1w8zrNrDEPtON5TfWQHiL6o5PKqDRCZwksyBZ8QhnK0EBWWEsbmOAq%2F%2Fvqi%2FAqRqr%2FrR5AX%2F4OO%2BQE4ml%2FD8bzeRv8VgkOkoWN9uQWtx3f6dhiHX%2BwX28rR%2FvqQRJ2mD0Cr9nL8K9yDP5z2ux5DRlLLMsOClrE%2BKkX5vvuDQ%2Fm018264aNws1LZoNHjsRbNj8HA8Du7Zu1EmMZQGOa8CAfHcJk8bRtkUxf%2B9TQHq7eoNr7ck68PiPIRAYScfdulmrKj1jmzrbfjSTvlAg57lzd8715vcyALK%2FVCEsrSK5hA0W2k%2Bk3q94xDWzYoOpFbG%2FIhMF868d1zuaTustYiYNRFr2PfZApBjTXA7SJLvy5pgVJV%2BlATPnGeiNNAI6JMTmGfisIEe7hAdgVrjfUFkJTxBzcN6tMQ9j5zdytFSR%2Bc3a4nf8iftN7%2FlQMqS2lBRbEuzd6Fx2pekMYRE5h5xYReEw8MMxQSOlQBb%2F%2B76QU8Ny7OUzDUusTlmgXsFCLXYmXMtMMmRg84GOqUBVtZ1cUXEy3MBum6y0oyFvhE6lzZASBQt5%2BYIY8OGWlHXWiULLN1woRGm2a3OzFfdq6W9wqoTk1hvESHOsFBG4CdrVUkfMOAhalYGH4UCUlnIw93fwoji6S1YO8QJrxUqJOlcVYRw8qeRj3u7F7S5zCJM9wZKBJikbmxnNT5s14TjqtHMai2lIjA3YVjtOrnbmvlHZxocrdT%2FUovBFADj20S%2FZWGs&X-Amz-Signature=c98d1fc29f5db786aa831f368853b9b5496e243d51ffbe411e80ee23de7e2a95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PZHMVW2%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T060146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH3r51pExy4geEjHpZ9KlFhJmVxj4O3XNr9lclDIl1eZAiEArxkrwzxrwNeNb75QwaltyVnH8GWN3PC5iRlXmxfjMCYq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDK%2FgD3FPv7NezmhpJyrcA0os5ejM%2FDhqOohUo9Ic97voReM1Tc9VzVC0seMCRkz3LfRA8G4gmwDuyeieRMI29XHlkC0Bc0whup3JiD39loBPAGhiBsY0GCfgDxLMHYIoCFz%2BXZwjyX9bDiI2aAiilgM1hDXQxmplQvVuthSSfHKCe4dE0wicpqZIu%2BC5bjOWbZ3IEw3130r7Aoex5azCGcZ60dVgkcbqGri9JdOM7OjayKkIrtXhr%2BQRF5%2Bp%2Bk4gbfN3yOo5GK%2F1Bp%2BDM%2FLnuXtI9%2FRBm2MqKGirS1JAJGdOGQ1m0Sn3%2Fqq2Ckfb%2FDJXDPvR5SA2gzh0nszuFiE9E3Bi3p5wwHmKNerX60hwTIBreI9OJW4wSGiOWCbxVi6M6GN5CDsrwYNDkA0X33Q1p2hlJn4bVvCgIis8YaWZzQd5v%2BrEkAJOftuQ1xFT%2Bud4K0VZ0c6O%2FuyGhtxznJCZ%2FDdx0h7Z%2FnN9fc7ejNbC1E1KtxrlSDp%2Fq%2FIxkx834LbtxRoMBNNd3ARNltuBdQmsJXQPMVnJGmnAtrZK%2B%2FC6s4oiRz3pH1tKxS%2FRvkm%2BnXsYe4LnvXZxQBL9vK6Y2iCBGJ0BxXEas97JGpaPssuKe%2FZ1iA490wIYCKgEKfcRizPULvnAJQLRnJIb2K8UMOCRg84GOqUBmTkHfGCWT4gI17Q0DRQ3DiIf856Kqr3ThJvrHkoAfZQ%2BehpAn0lWrP5ElSAV3xiRq%2BaOaxpqSbjXnR4MZJteq4bHZWB4gkhVsMksjhkv223bXWwiOuVIILKUvoScXvFTy4VLM3ycYmOQNtTtw5SccjQgjjz2TwTJVlnaTK%2FIPTrde3Yw5XK0l7LtbhdEq589hhCmmPCA6Ce1ytbFby9K5MywX%2F1U&X-Amz-Signature=c125f8201f739457824d66d47a7d4766309d4b592d77c14368abf9dbc21c61df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MIMZONS%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T060204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCoxdzNRKzNL0ywGzaxM%2BBLJE5%2BtOcqj%2F%2FtUXza8HXYqgIhAJPYCSo0Tx9gVC3SPdBseAMBOTbMlWomS0jfiNkDIBujKv8DCHYQABoMNjM3NDIzMTgzODA1IgzGqkKUguAA%2FkyT5vUq3AOVKA4kZUT4ABeq2n2aP0z4TjcKpb580hu5m2U2CP3UnQKiysPXI%2BaT72H09aMYJRP%2FCGqByBRGOUBZjD%2BUghJKDRcY2vaIPH7wl99ksLw7JmmIaIPAVj%2Fyx6B5W6%2F8D9o2Wc0qP1UTLNLo7zXh3enSo3gWg8C0W0bKW%2Fe8GoI6tmni6uIgglJVgagLqGcXg81Dig4Vv7O85gkf9sy74xiYOleVv%2FvOxMj92veEcyGjnOeoXas4cnoV9ZcLKoOqSq4nnyLbnNiK7xL%2FFDAQm5YI8EP81KZs9whongyiQDqGLnlRDn0Gv%2BO%2F2UJNk7Z2ZVVnaPK2q25N3C0S4P2iudvEHJXSCsFHcQYVmgR5P0Tzb73kK1bOuWJP0MkR5ZJRh99KAxrIQn3HfEEN7fqm%2F8IAJRF0P8PqwD8L2okTIdcHHqhvlN91mmWx7xtHc2N5kDBPNbgCQ2QFF8i82k7BGabJHavf6t%2BDFoZrzZsvVznCax%2Ft6feVGo5LJOJmBeJj0zGJ%2BkK4jdzmNUATa8eYb3KLcJ7H6DJFuJEIkGblXLAdeTcqxkrMx4kheB%2FGz6Zvs8fQk7B2X%2FdNfK3eVKPO1nCwV%2BugOGNhO6svnR4F9neeR%2Bz1fMfI0Xnq3oJSajC0koPOBjqkAUoeHE0vwjECfGP71vRSdIumVi9vowWlFtcq9tv8YNue6coB%2B5ju7%2Fr4FpcJ%2BxYm3r5%2BJLGal2akGpqGpXy64c6teo5qrP%2FPmxBTZfxLBy2lMP%2BoeHtUSMRjiOqQaLqmpn7cnqQe70PVih31gtPUnWvZQqoalmsRpHFycfSl6mmA10fxn9NAmnZEUDrdfxhmybf2n52AMMGxkWlzUXG9CX5Ix7pK&X-Amz-Signature=89c732f5e78e8e6bd6bb8ce6f028d746c9ba2dee7bd893071dea0a666de50ad5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MIMZONS%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T060204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCoxdzNRKzNL0ywGzaxM%2BBLJE5%2BtOcqj%2F%2FtUXza8HXYqgIhAJPYCSo0Tx9gVC3SPdBseAMBOTbMlWomS0jfiNkDIBujKv8DCHYQABoMNjM3NDIzMTgzODA1IgzGqkKUguAA%2FkyT5vUq3AOVKA4kZUT4ABeq2n2aP0z4TjcKpb580hu5m2U2CP3UnQKiysPXI%2BaT72H09aMYJRP%2FCGqByBRGOUBZjD%2BUghJKDRcY2vaIPH7wl99ksLw7JmmIaIPAVj%2Fyx6B5W6%2F8D9o2Wc0qP1UTLNLo7zXh3enSo3gWg8C0W0bKW%2Fe8GoI6tmni6uIgglJVgagLqGcXg81Dig4Vv7O85gkf9sy74xiYOleVv%2FvOxMj92veEcyGjnOeoXas4cnoV9ZcLKoOqSq4nnyLbnNiK7xL%2FFDAQm5YI8EP81KZs9whongyiQDqGLnlRDn0Gv%2BO%2F2UJNk7Z2ZVVnaPK2q25N3C0S4P2iudvEHJXSCsFHcQYVmgR5P0Tzb73kK1bOuWJP0MkR5ZJRh99KAxrIQn3HfEEN7fqm%2F8IAJRF0P8PqwD8L2okTIdcHHqhvlN91mmWx7xtHc2N5kDBPNbgCQ2QFF8i82k7BGabJHavf6t%2BDFoZrzZsvVznCax%2Ft6feVGo5LJOJmBeJj0zGJ%2BkK4jdzmNUATa8eYb3KLcJ7H6DJFuJEIkGblXLAdeTcqxkrMx4kheB%2FGz6Zvs8fQk7B2X%2FdNfK3eVKPO1nCwV%2BugOGNhO6svnR4F9neeR%2Bz1fMfI0Xnq3oJSajC0koPOBjqkAUoeHE0vwjECfGP71vRSdIumVi9vowWlFtcq9tv8YNue6coB%2B5ju7%2Fr4FpcJ%2BxYm3r5%2BJLGal2akGpqGpXy64c6teo5qrP%2FPmxBTZfxLBy2lMP%2BoeHtUSMRjiOqQaLqmpn7cnqQe70PVih31gtPUnWvZQqoalmsRpHFycfSl6mmA10fxn9NAmnZEUDrdfxhmybf2n52AMMGxkWlzUXG9CX5Ix7pK&X-Amz-Signature=89c732f5e78e8e6bd6bb8ce6f028d746c9ba2dee7bd893071dea0a666de50ad5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KUJYRDG%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T060204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDmzl7A81ii179x85wsNICdNCCg%2B7wmjcJEUAahnrmYmQIgZ5Fn%2BQUaUHWz%2BwGjRk0kWL5oI0zgK8GTc4ajOybUn2gq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDDr93%2F3gXltNEr%2FWHCrcA7TJxqFyYatxLbsutI7PPhJdnD%2Bgb5NbdeLYvNptcL3qW2gMukkjBiBdYaYOqgP0PylUwVDxITEHA6C91xrCTAhadTWI4u5uHwtnNgi62CLC85VbameSwDDDBNq6Rx3%2BPYEBdlWUg4ccxOzZVMHnhnzl2cm%2BQUSery3px8vRWNC7Ui3mVrgqcPXf8lH3%2BPhN0soxPfLhEziS6ACs0YATi4z27wOVF9Xjlaqy7TZbs3IHYMpTqXJm5JIpAK0fixs%2BqJJLPNvrc86e8yf10SM%2FB16Lfh0WahDIK09eZ9JpXdpC7VsVDR0RcZ2%2BJJJvSo34a0oUE2tsu2lGm2IJcJvzlYUYxKf3XRknd%2F5nZOrXbdXBj0EzL3G6vPNYnASBMLYV4k8QiyyBFKGOJYbu2u42Mq1k%2F94NTi2OG6IRRhPrZi456KLJ12QGWcgDXC%2Fodl6pjEfgX0CIPlVnYoeusZtTlvmSu5TbJzscwI2yUb1x%2BiZm8yq1c0ZJoj%2Fp8kHdbeWWu2Ch8pSZiPbMiJjY5mYahNHQDKzOKPZOX%2FHdrGEYubMI5t%2BKX7Zq%2FVcV7iLY4gxkRjzCufaiDnYodkQygt6PDyE%2FNu85dpth%2BA14Ahw4TlJQBtZuYhWD5OqNaE7%2FMKaSg84GOqUBLhV0Elo779PdwxkHmgibH2HY%2FkdSXD71hsSJMNh%2Fs6n8cXIjOR%2FoYZykSS25WwHArz5fOSopvlqAFBkDeVhyllOc80Hvts0myhpAPP4MT%2BStXdQ7jE%2BNDJZdJnUY3avJf0QFNBIZjTT5KX9G47uycgiiHKmxRVT3XygqkJpRmn%2FOWLfNrdceLHx35KaivYZojvqAqXcI2EKbYjmZNU80c329K04z&X-Amz-Signature=16a6d2bb0f02860b269937a6e55312f4bacd99ab6567643eb1dc872eb2f8689c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

