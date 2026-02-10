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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWDEVBJW%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T203115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDeNw509zz9dx9r%2BJXZYF%2Bfgp5qfY813xlvWQRmS32RswIhAJmwUeZTdb9w8gyeIM85j5hcA6789oA2x1m%2FxC1j4JAAKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyTO9BEKIYl%2FN3biJ8q3AM4Znt9lM4tjAU4LuPNja969MOC4PKH8N%2FozEwbDbLBd80xToa2vP7ZQnV3HEaQTyJIlOBPAu1DiQlMbLWH%2FDUMgPE3kYFw0jPpOg5YNxSfpSR1aO1hgwiXtC%2Br%2F9VhfAdDg%2BL7lIMXERe6FZTbA7eDiRPKKWCw740h0o28choouy6pqbPC6qcwqmzVFO8STtzQV1xOd%2BcBJu5aHQ8F%2BLAZRDDvql7YsnT6CIGbT8R9MVbRO1M1Cf%2B%2F24i3QHyDGv10mzQUzaKX2bRamxrNCM%2BRUSLrh7tL3hKR79RLzgoPyc8KFeYY%2F09Zqf6FTy0xWhKVJbdgpuo0E7KcGYXOZqcFtS9xjBw0ZMYkifTokJys0yrN%2BR5A%2Fix7%2FJ%2FFIqMoQlx7hVxypGGqmRrhl6wP%2BDaCqydZs9hJfnDPfo6qW5doAUG4wpk1fp5SV4%2FA6ko1j0VBYaRuyEZBF%2BPKFN9Gat5VljYT6qcuNgwgXvWhkdGMI7bJng1yZ8VYW0qa7jhKbkIyhonKbrki%2BuV8FTw%2BEDpvtNuA7C7S3fu46MtdIsD2CBIEYKmldMFGVKnfjrxpWOzKba4ErrKyWpkCNBQLkKDh2araHHIyU7VnuQUYuCJamn%2Bx9R%2FXG%2FmP9rTEqjD9kq7MBjqkAQurFKMtC6DRodniatvHYM9xuJPljUBxdtsv%2FgWvXVzaWi939WjQN239r8ETemlOC1fgg9MsE2G6H85f5WFn5uxYRHmIxL1XxiX3VGSpfgtDL%2FotkY2XJ%2BM%2BTiA6VT1kr0GRYo99Lw%2FDiWnSLeu3LWp4HvgiLgJzTOCEUQT2lyaXp%2B5I3zoCPKYYJ6Cu7sDAbbipS0X36P0QXqyreT0pkwDo5MxD&X-Amz-Signature=8a1e2fa93214189603ec09cb76c8ca8ea6bd2cd76c5bc0e448e868181c6fbee7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWDEVBJW%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T203115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDeNw509zz9dx9r%2BJXZYF%2Bfgp5qfY813xlvWQRmS32RswIhAJmwUeZTdb9w8gyeIM85j5hcA6789oA2x1m%2FxC1j4JAAKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyTO9BEKIYl%2FN3biJ8q3AM4Znt9lM4tjAU4LuPNja969MOC4PKH8N%2FozEwbDbLBd80xToa2vP7ZQnV3HEaQTyJIlOBPAu1DiQlMbLWH%2FDUMgPE3kYFw0jPpOg5YNxSfpSR1aO1hgwiXtC%2Br%2F9VhfAdDg%2BL7lIMXERe6FZTbA7eDiRPKKWCw740h0o28choouy6pqbPC6qcwqmzVFO8STtzQV1xOd%2BcBJu5aHQ8F%2BLAZRDDvql7YsnT6CIGbT8R9MVbRO1M1Cf%2B%2F24i3QHyDGv10mzQUzaKX2bRamxrNCM%2BRUSLrh7tL3hKR79RLzgoPyc8KFeYY%2F09Zqf6FTy0xWhKVJbdgpuo0E7KcGYXOZqcFtS9xjBw0ZMYkifTokJys0yrN%2BR5A%2Fix7%2FJ%2FFIqMoQlx7hVxypGGqmRrhl6wP%2BDaCqydZs9hJfnDPfo6qW5doAUG4wpk1fp5SV4%2FA6ko1j0VBYaRuyEZBF%2BPKFN9Gat5VljYT6qcuNgwgXvWhkdGMI7bJng1yZ8VYW0qa7jhKbkIyhonKbrki%2BuV8FTw%2BEDpvtNuA7C7S3fu46MtdIsD2CBIEYKmldMFGVKnfjrxpWOzKba4ErrKyWpkCNBQLkKDh2araHHIyU7VnuQUYuCJamn%2Bx9R%2FXG%2FmP9rTEqjD9kq7MBjqkAQurFKMtC6DRodniatvHYM9xuJPljUBxdtsv%2FgWvXVzaWi939WjQN239r8ETemlOC1fgg9MsE2G6H85f5WFn5uxYRHmIxL1XxiX3VGSpfgtDL%2FotkY2XJ%2BM%2BTiA6VT1kr0GRYo99Lw%2FDiWnSLeu3LWp4HvgiLgJzTOCEUQT2lyaXp%2B5I3zoCPKYYJ6Cu7sDAbbipS0X36P0QXqyreT0pkwDo5MxD&X-Amz-Signature=8a1e2fa93214189603ec09cb76c8ca8ea6bd2cd76c5bc0e448e868181c6fbee7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WUUZCF7%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T203116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID8ekwZ1FHc9vNPXjMAzEL0EmxzS4Je9edayR8f%2F2GwjAiA7Wp1E%2FmL8IbNs1cG5ttCYzlc6KQHZ7f5oHK0T1PsP3iqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMpO4XC2a2aKa%2B6iJ7KtwDn4WATjSPzXyiekslHanldZx1eLvhTJfudCccSgFC4NyjzWavyk2%2B9sod4E9TiaxmZawrYFPCTqkYnhumIO0z%2FE3Onhv5Sl52gYSKeYFFMXUADzeD17mHg5Med%2FQbDbfnTTsVoLPFPKdrxeEiQskWQ8nAGzTH1%2F3tEZAAMEI6R6bZpK8nNDD1Ve9wB9dPZvxXdJKbBGNi4l3FtC%2FOf7sM8SGpp7%2B%2FAu5aO2lL69Lsd0rm7QUSFCswc3twZRym4esVWf9YwCS%2FEbHRA6iOm7DyaYq2DxBbcIxEtLu1sZd3Axoy%2BBZBTKzjhPwShhfn%2F53uyWBzmK6V5Wpowc9hD452AJ1LI0s7mnouizrbBT2zdKKeK8Ei3t%2FUGb%2FwyXxoSFtWzNj8AwWtcxYaiYJ%2BQS421MGMgasFz4gMbKyiyHrnQAnOc7sU8Y6g4FNdZ99q72MqJGCURz4z8dimHIwQmY9BWvqoBPFN8KbeSrs249d53q9Xn%2FW8RRiS6E9jd0GN5ieFrxX%2F7l%2FPgUqyGnvHg7t0ByH0mL7GbtD%2BmqXkFEdc3QOddFV9oGc7Jf2KBoF9thztWyKS2efte8W403AP4CkS9rl63MDkn9ciuyZ%2BNoZtw33ockBsBav%2FWVK0gHYwwZOuzAY6pgFectTLMr%2BDMrOPELUGarIBkY1olJH33tzWl6VbSD7okkBaY5eYppKzALW9RuNYwXLVsfDgwGKakwMXIWswQ7cw4jRwZlLyG6NJkZCp2D6SO7yg4tnr1eNhX%2BboNY7OpQzOcPrv14OwMjMmwKhArlycyInbV09SkK9ktLMReFNQ56LQNa8ei0epYADCHdIZHC0jEO9gTERDeTpsaHM6tWYI1sQT6Uto&X-Amz-Signature=3954b4a93e928aa32d8fcb7cfb7486dcbef3d7efb6ae49c16300e1f95b2798d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTBE4BAX%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T203121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA%2F5oe9HU7et%2FFTx8XUo5VkbFAP%2Bmt4q%2BjY7Mm8Ovq2KAiBuJS3o6%2BGasv9ugE0dCygrLLQAFWf%2BRgfTqL8mWvlb8yqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMW11jMJZQUmcxRMtVKtwDwuU0N5MDP%2B7%2B7fVPhMGBiPVDoGLsze79yRKhoIcUFNAI1TZr0rM8xGdA%2BfhYojt8zV10id1KiHlQkd8n9hTH8VXwqCyCmStMpX9HuKnVHhcQ5ccmJ22qDDbXDm2RknHQV0HPUBz2XjMzVAxE60kWYHwfXiPQtjVi4E%2BZ0WQxl8IZfc%2FtjUonMil1ENLpR%2Fqha8ta%2B%2F%2FQjLPbcqaoJzGtXiArzGphLWuCy%2BpKlfIfUoYlyLxabbt2Jqb7rM5RWfkO811pKGzIWeKjwTTFbrOjSbJt4WPNusOe0CXPimVtJfDc%2FFxKieI7jKLzyyJVHm7VHZwrrugcap%2BZrzMsaDqy5DGYVSi2pNivsYYCz1dI3jjWwjRzOFimyTAQmYkl6%2BPVhouVmDg0h0HQfXK8U4saW0wEiTWF5vD7rcuJMQl73O8bZLRGo2z7pFop4VVDVZphXFraiMh%2BA8Rp5T9Lxur37pjRpFbwHMlxJcLnSUCa4lt0A6SzUrAMZ1pSt%2FWCpdAQ9CTqPQmdKPMbBcpGddDEhTVxso3Rq3hJlYPWmTy4h2%2FecxoeCiH0mMfO4renHFdR%2FiBW64pGxhq2oIZPFuZb%2FKzsPazRNlB0amwRy85xtc%2F%2F5lZ5pTS%2BZC%2FFd6gwn5KuzAY6pgFlhA54c7G1YS%2FYfEIeAuQAU6FdxqgKmcKI%2FAKO2%2BYsHKjfbebXdwtHr%2BKGlZUw%2BVaLtrRUA56BtZThPaZ1ZpyOFtQrBdoJoZ8aZmUz1lj%2Bbqh0sE%2BhUIyloBibKx%2BkgK36M9Hgu6oI2UTrpl29Esg8OJyTAqvg6oMKctMLFDeef02dQYfzrv6wW%2BDGuNSDbfPTnpkzfqUmBIDltoPklzCn66SDI6lr&X-Amz-Signature=5acf27d74e55af4b909f282b9f99cb66f73f55acd7f79b5183651e1257046955&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTBE4BAX%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T203121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA%2F5oe9HU7et%2FFTx8XUo5VkbFAP%2Bmt4q%2BjY7Mm8Ovq2KAiBuJS3o6%2BGasv9ugE0dCygrLLQAFWf%2BRgfTqL8mWvlb8yqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMW11jMJZQUmcxRMtVKtwDwuU0N5MDP%2B7%2B7fVPhMGBiPVDoGLsze79yRKhoIcUFNAI1TZr0rM8xGdA%2BfhYojt8zV10id1KiHlQkd8n9hTH8VXwqCyCmStMpX9HuKnVHhcQ5ccmJ22qDDbXDm2RknHQV0HPUBz2XjMzVAxE60kWYHwfXiPQtjVi4E%2BZ0WQxl8IZfc%2FtjUonMil1ENLpR%2Fqha8ta%2B%2F%2FQjLPbcqaoJzGtXiArzGphLWuCy%2BpKlfIfUoYlyLxabbt2Jqb7rM5RWfkO811pKGzIWeKjwTTFbrOjSbJt4WPNusOe0CXPimVtJfDc%2FFxKieI7jKLzyyJVHm7VHZwrrugcap%2BZrzMsaDqy5DGYVSi2pNivsYYCz1dI3jjWwjRzOFimyTAQmYkl6%2BPVhouVmDg0h0HQfXK8U4saW0wEiTWF5vD7rcuJMQl73O8bZLRGo2z7pFop4VVDVZphXFraiMh%2BA8Rp5T9Lxur37pjRpFbwHMlxJcLnSUCa4lt0A6SzUrAMZ1pSt%2FWCpdAQ9CTqPQmdKPMbBcpGddDEhTVxso3Rq3hJlYPWmTy4h2%2FecxoeCiH0mMfO4renHFdR%2FiBW64pGxhq2oIZPFuZb%2FKzsPazRNlB0amwRy85xtc%2F%2F5lZ5pTS%2BZC%2FFd6gwn5KuzAY6pgFlhA54c7G1YS%2FYfEIeAuQAU6FdxqgKmcKI%2FAKO2%2BYsHKjfbebXdwtHr%2BKGlZUw%2BVaLtrRUA56BtZThPaZ1ZpyOFtQrBdoJoZ8aZmUz1lj%2Bbqh0sE%2BhUIyloBibKx%2BkgK36M9Hgu6oI2UTrpl29Esg8OJyTAqvg6oMKctMLFDeef02dQYfzrv6wW%2BDGuNSDbfPTnpkzfqUmBIDltoPklzCn66SDI6lr&X-Amz-Signature=3f7aa5e078445784a147dfb7e386aa3aab246646171b6cf168cceaf4be6e4d21&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XMQT4UD%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T203122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF%2Bxa7AG6wnmeWM%2BZ8HGL6BhNLZ6rvPiwX17CEZ%2FnEiAAiEAiPCEJ%2F8p6K4QGdcl36%2B%2F10%2Bty%2BtiiRo9IGA9q4A49t0qiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOl1GtPC%2BLXl7WgtNircA7p2DLPIEbOGu1EWiLdGe%2BYibCp%2F2w5mJhik%2Bio0VhCtjY4LvDavB7%2Ba1luawj4qRJ0xZnPSgzo20aIq8q7w6P6RxWIYCMq5TxG8zJluVAnHcUuK8xohFDIjiz96p59kj4LgSgRaLQaHqQl3N5yaP8zeUjDFL8Xe9W291xbWvQjCWaa8CF8Da1glJ0k0QpH4ZhdZ0n9UjgjIMJnYppEvqVJbC4vF4CU5Zs%2B9IhOU19qRtnQQZrdLmocAE6VEu0%2BJIQhxuQnHwGiaiQrFVJhOzvXtZvtHk4H3YkoCbFKfjeN7cNUYIdQKU8AtmRNiYUP2m7yL8ojFsUXs%2Fdrl%2Bw%2B%2BDxy60WI%2BDVuYoKXpgmthVarZ6WBfLL29gkAWQKCMKASgYfEd6kCWAY1PtflzEmwiTcitZS0i5KEGUVxW4dvormv5p4sCP7Cs62rUsZaDmBtCQdTRugfP35pFDklEEc%2FYAHMSUFFqFfmvAnkWdzwuPgCa5yXdt1Uq1bIHOCuhyWxPgTDTM7gyHxCFeppLYPhg7b1fxaI%2BtFpgdFCWVMsnGSfCjGnnWZjRdrs%2BvkDvEwWa%2BaTi3pVGidLsFui7WWvAx90Rk%2B2iXzWuwBWT1fBlQjVtym0SaYPdS9Mvq6BqMNOSrswGOqUBTWG7uYcalpG%2BpE6PhUOy%2FJPQU0416lcGHmjC5BD2cLE%2FABTpsawuPdww9lPiGEEcPUAlJ4t9lodC1oU8dZTjouOmtlphgQsw7Z%2B7JQTGNbD%2F8sZGt5tn5RyKuSLHGpoz%2F5BKdFz20G5asi%2Fd%2FdmojO8cVgGE2In%2Bkp%2FGidrYLGEEmkYLSpwr6Ee1Uqyo%2FsAVYFUu6L0NVpolh87z960jXSb6ZVIQ&X-Amz-Signature=047a1204f7615cb965e7ba95eeead35b7a0a10e23efe6918800e9e0c4d3f8840&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AT73KH3%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T203122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDEEZ4H5zBiJ68n9t788xdMOGCLTaYTn3Za3mRfmvDV5wIgEYSs%2BYC6ogBBb16Af7mrRxOemqSSK2OJvVuSoVSsNa4qiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPH%2Foad9Ix6yqw1KkircA%2BPqt%2FyaQ3bDM0Xggfx2bcT6sz4m8zRlbk1qcwMn%2Fba3sC4UvO6fx6wsyP%2BGLZ1mk3GT4TyA4LdgLyF5IIQC%2BUzmBJDhde8JnkDKVKgOiillV1y9Gya6pvRM0%2BrxwNk34fUci9DD9jj5Np4csgQAcJea2WjFAa261MJg1rvPrqltRgZCvTtosUU9wxyu7U17tGzGr1fmIqzh4MblJr29ijYsbr8rB%2F7cTe4jDJVFjWSeVFiqD%2Fuk8u4MKj0d5IDT%2Fosrb715xdLu%2BuDTJbsAkg07B63%2Bi6zapuITbbNnAL0x7C0rVi2O6n4%2BC%2BXP0AX0IiDDQxGdsnsPpmp43YogejgcWG7iOw8OKZQrVsQTgIpXLTZlr5vYypAml2NhGg5JfcL3FL2RSNmVa0MhsdBJA3ErQ66yo3kZvP5NPcqlchbwNh%2Fu%2FFx88yq9Jm%2F8SPKbgM%2FdFEChS9IKEnqYvL6xDvda6WBIW1R8%2BRGibH2QVUzG7BS5EP2sgvkamu1uO5p3pn0Drjj%2FJeem887L%2B%2FYP6fKy51kR6mAbO3EX2Cc0yPFC3Tj7CZA3wjM70eoHV%2B4xpPGSomuMVZJeolxFRjo6fiY7kwcisc0Qs1QDF4AWFbELXXFf6zG1wTUPkWzwMNSTrswGOqUBpJ%2FdCsHhdguU3sqTzdy7YXQG2%2BUX9IE433T53OzceNU%2BqAo8PC%2Fsa3kb0KrMdJZm%2FMCtkGZuwDoAsjGqom7WG99oicGRnCNz%2FyMIvUF3AndCJlnvd93NPI9XHIw1vGeczlnWFkXrGTrSvFd2NxxDhMV9So%2Fs5UcJZWgmrbup%2Bw2ThnqqVa%2B3H%2FiiMv8gi%2FVaIip91DZSqqpPoK1IfDUr2HwjMwxc&X-Amz-Signature=492335c59a177afed3a7243356f80eef3359593c196b9ff65a258b2f5affe2c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJ4DPWKJ%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T203123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEJb0oBAl%2BhI44wq6A82CM11zRd4YziGWzKf%2FV61KjsSAiAlGqFslbCyEMx4AggY6%2FUcmnPO%2BEBS%2B4tUd5JaQhtP1yqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMyVtwK1ufAbGFqgVhKtwDIPiMZJfmKsRUqp964IjiIWmsUClmhAaY5jYPJEXqNp0HBi5lDKYvPvsHxGOfzu4t5eiAWI7P9ohShGiN9CQDHPdPnmkFbpFnMYHZ03p41pSMnRUV8ElSeHr7a%2Begx7GJJ6ochyxLC%2BfX0xR9nAgG%2Fx%2B%2BTAwlknBtgfWEX2Tg3mL8jbvwMM2x6UuQwn9fZFRRe7q70k2VJq09F%2FFnhhw1ErICRlB0f86XlvBErcuzuGGwbVWLHh7UHlNvmkTfn8l1tKo02G55%2Faxp7OpYa%2FOuLMOvaUJ7ibjuOV15jh7EAYlt4LHoN38ykxyZOJ4QuldI6ZBOjcb9ysoHWceNAZ98%2FrUDsBv%2BfJ9RZUPfGqhaTzqeAqbn92RFoHDTO8c83%2FLQGDnIgGlJDVZil2IG%2BHJInb3rd%2BRqkbGaWW1OXYZwhIPrSLnr7R9AMfKVN%2Byh1wGASnYK4rV3vCHRXP7355aVKIUzsLgyq%2FQbIfOi67sHQ%2FCo1uczmiSuFctATLX5vID62bof%2B2ICVg7VbuwvxELtbe5e3MdYGYkqxnkIHw4wzL%2BW00uweB8fzo9UpJHs2lta1pPg77qhBu%2Fh5OYZwiJ3WxO5Ts1di1RtfkBYRWeIFYhMSDKoZhQcj7Sp8WkwlJKuzAY6pgFfy9uKykfG6yWCIrwOlQ6zL%2B553lT2d9%2FSSqx2PAewMwrVi%2B0fytoCFJdWb%2Fq7eN98ZUsi%2B3M%2FS14XxxLIj%2BNEWsJkdjgptDPNT13ISP30VRdHerKr8OxDYG%2BLVWV09bfIt2dbOFK5VHUzKW6t%2Fr8%2F7dfbJxxILs8ck82KCwCxERLM6Qmh90RacJuWh686fcYfzLNS6YB4%2FOz%2FlxCeHVEq7StmeqRY&X-Amz-Signature=381a2706a00c5c6b4bde673a686602f436517d28a5380660c8ad5cf282b0c206&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VTKAVXA%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T203126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCN1%2FIg1C2vYUHtpd5YksmGMao2lLdaOK2vueOoW1uTJwIhAJvf1Jge86SGJQWJehkh%2BXHygO9pUudJD3R023PKWMMHKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx4yXSYaMoNRNQtMMkq3ANli2YVQWXLzJb9U6QGNYlurfH%2FYkjUZQ5gK6MLicRPNpKqBgs4Vme1bc8fva6L7PYUt463IflRLtZTxefCjdCLTL174A6ulRlbnHLjsaqDEm7y0SzEiGEZr8GAp%2FMJ%2FwlJdh%2FWm3iRqtQEAUp%2FT0jd6fsKQaL%2FbheY3%2FMPHXN60pVIHzJIVeABniyRr7hgkdXBAQCQWTY49P6wqRdNUpJpP2RTWjYLteWlhVoON0A%2BIv7Jv2MTvGWa1l933qOlv0M5edSrkuNocWijLfcAWCHH1QGMfbqHKTg3ApBX%2BcIGXBP209MKJSNdl3%2FhZoe%2Bpf0u%2BndBU9l3ddoU9IUv3CyPw5oGf8ywpnKyEhhN8haeivhh5RYzBDYn9jrbgeTOLJqTPs0Yu%2B8lUxfUHByvFUzeZrD7IDmRKD%2FfMPNlPOVJyzxFcM1VV75npUElEyB6p2x5tmBjbXRZhasNiXDDaLAbXoGkM7He2FzUY%2BFhbx4VQye8Bx%2B1blojhMefgureGrnhVsG95kDpqmtQ%2FyNDQlrNIiAnnbixEIxjUyV8BH2Bf%2BXKpOp5XnjB5cIxrsgkFnbaTaE%2BgvpquNBm23hJX3uqJHZvlRxL7kloeSpLc3T1R0rOn2t%2BCfJSeH1KezDEk67MBjqkAcB7Pe%2FuEIZsLB%2F9gNgG4lxCW66MbqIgY3%2BH1513rxHlf8v7fPj32d5DnlFxiGG7hG5Dkn4%2BTR1OMQEFhrNpCYP4MrZcgvZqbs6gul4g5WyjOJwTMVXOZtlvdONjPOCVUeWN77mccatqmVXprQ0GuGZIfO%2Fq0A9BljdOsNbS5rrSfITquur589bN0wXsDwcCnfBGBvmF5QlggFT9H1Q4BonqAluZ&X-Amz-Signature=e3968d3530d6610b5c40ef94b610d97533dcee5efb89bd1faa077da1d653dbc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VTKAVXA%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T203126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCN1%2FIg1C2vYUHtpd5YksmGMao2lLdaOK2vueOoW1uTJwIhAJvf1Jge86SGJQWJehkh%2BXHygO9pUudJD3R023PKWMMHKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx4yXSYaMoNRNQtMMkq3ANli2YVQWXLzJb9U6QGNYlurfH%2FYkjUZQ5gK6MLicRPNpKqBgs4Vme1bc8fva6L7PYUt463IflRLtZTxefCjdCLTL174A6ulRlbnHLjsaqDEm7y0SzEiGEZr8GAp%2FMJ%2FwlJdh%2FWm3iRqtQEAUp%2FT0jd6fsKQaL%2FbheY3%2FMPHXN60pVIHzJIVeABniyRr7hgkdXBAQCQWTY49P6wqRdNUpJpP2RTWjYLteWlhVoON0A%2BIv7Jv2MTvGWa1l933qOlv0M5edSrkuNocWijLfcAWCHH1QGMfbqHKTg3ApBX%2BcIGXBP209MKJSNdl3%2FhZoe%2Bpf0u%2BndBU9l3ddoU9IUv3CyPw5oGf8ywpnKyEhhN8haeivhh5RYzBDYn9jrbgeTOLJqTPs0Yu%2B8lUxfUHByvFUzeZrD7IDmRKD%2FfMPNlPOVJyzxFcM1VV75npUElEyB6p2x5tmBjbXRZhasNiXDDaLAbXoGkM7He2FzUY%2BFhbx4VQye8Bx%2B1blojhMefgureGrnhVsG95kDpqmtQ%2FyNDQlrNIiAnnbixEIxjUyV8BH2Bf%2BXKpOp5XnjB5cIxrsgkFnbaTaE%2BgvpquNBm23hJX3uqJHZvlRxL7kloeSpLc3T1R0rOn2t%2BCfJSeH1KezDEk67MBjqkAcB7Pe%2FuEIZsLB%2F9gNgG4lxCW66MbqIgY3%2BH1513rxHlf8v7fPj32d5DnlFxiGG7hG5Dkn4%2BTR1OMQEFhrNpCYP4MrZcgvZqbs6gul4g5WyjOJwTMVXOZtlvdONjPOCVUeWN77mccatqmVXprQ0GuGZIfO%2Fq0A9BljdOsNbS5rrSfITquur589bN0wXsDwcCnfBGBvmF5QlggFT9H1Q4BonqAluZ&X-Amz-Signature=c26a19ad9646af9cd428f5214190d76fac0687c661fb416b6724cbfb6d82babc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MTYYKT2%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T203113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF1PtAofeqCNkT7mp95wUl8ql%2BI8zBwXnSF5oriHF7gTAiEAjlvRQCuIOKIoaIVjTbbdHAe5NyRqzgiTTLDFy%2BtjmRgqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMfZE6uFHkWrHWEvwCrcAxJ9%2Fu6WOkUHKFLlteSGUjnnWAL3461%2FGAxkyyZfWEuEnAcTfI89dt0xc9jrEsi1WkBMea6RvRptV7aUx9N%2BZLShP%2BLVR5nkgb4eeAMCmFS72ETf4PiMkNnufRX39GLXEmEyD1KanhV32DCfKIWf4TBwzUXiBbQQdVKqX7Xli9Nxq9%2B3itubRzDYLB7vdhs3F8r16muh6YlID0S9Gp2VmMpQkmicPz2IZcBjGTm41QJ4hqf7No1wOA21BSrlfmYpo67al%2BW8R3gLoYsr8%2FmeMbC9Xfxjj8N1YweOuREFV4ajRUCE7NoxQHmaMqeBZBiC1hnNcsFJjUOnWdOv%2BduMDmiSEqRO3K5wgokSDKiBW6%2F%2Bnk7BOu2ADA9udJKS5QLv%2FW2ug2yAyPYWJKLQmkVD4OegQGhi5AiJFjF4d5JZuLbJspCbadyTuMpXz7WYLMKPFVAtg9Gqu1PWMhgAmfiGq%2B4RdW2RHvVfECZ3OiADAdQfo5a5ghHNqZNmPS2aOzoFOFVpwKZUyXSIu9PRcW3wE4A6oss9NJGaIh5KOoO90qzUZS%2FA42pwn1656twPQYHktxvVUAY4o1oFgiOf8KdSg%2BwWZegF4UkN0h8jiVAA0OCgiRYVh%2Fvi5eUujHiwMKySrswGOqUBrLN1z1u8tZNQIb0S1g4wRt0YihEJN%2BXe8CIJQd%2BYD0d9LTUebyDSLIQgv%2BHTZZiS4cAah%2Fu7mO%2F5N%2BDkECfyEZ4TNr7VCJSFvHxFp3ttS5Mne%2FPwEIryWrQ2UL2jmVz9CwHN33eIbv0J%2BYfZyYzkmS45K9erZmij82SJHXK%2B%2BiX0vC%2FlDYYmTz8BokSMZDnsX6VqDtZxFQkfJlpODeu9qUZa4rd8&X-Amz-Signature=c417bbbfb7c43e805b31d698cce0acd49fac5f62c71f7ba5baaa5778b661704b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RSGG7BAO%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T203127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGZJg9tGV7KeXCbUBPAZrdgvTUJMFgdQoAManSp%2BFgCOAiEA8Z4dxJjC9VSkP0GV62at3hxHdF%2FkRpacSbAMqr91GYgqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMybmR6ZLSQyeuLxiircA0zM3yyQhtY%2B%2FrURFlxjJg9lwi3%2BP1z6MTmLJxcDBpq%2B6wuKfY5V2EzBbe3q4M59%2FqgeKD6AbBEOTHFsq3F5996v6Py9YjibkaIGK0sUDwTEDCFpIMjwrK0X9pJLL3IGe%2FqA%2BNWU63xrRMx8jPN2NGw2Iz5G7Y9Hbg%2Fq05njRswbIJhzj%2FOtPDphTgj4xT56BTfy4GVeVy13Gp3Pakwh8EfeI4qDbxz%2F9k5n3K52UXvPGBEO1Chv3d7YiNG5e5a%2BaK8NceLfmIn9jvhtja2evq2OYOMN2qLMF5vh3LT39Ib0zvBZyG%2BHNMBgOud5yHfOc%2FVGdkEJU2HdjXRzMHGRqZeUSg22x20Pa2iHpul9o2Ge0Y6khTuR0xzmiRAwiw%2Bw7NUBPFyfVcRg%2FaIhJQ%2BrHegidT1gS6FuKiLiWyJ%2FV1A4jZg2lM9q%2Brs2ufOFNt%2Bp0eWjxL1kuz%2FyOJAbwnkGg2Jyp0a0OcJPV50Hj9Y9joFJ2AnOxJT95iIY4JAs%2BrngNhEfXELawMMfY7kobZoxFFzoOPU7xgY%2FlmjrXD37LMILkeJDdVl%2FgFjF59%2Bue%2BT%2F6rqUHElpF5bcaGoo9U%2FO4aY2ZOTyfOusaOUNahQPII06JgJNDw309K4IPNY5MJySrswGOqUBCZd68lNN9b4kwnVpXvqyXeDm%2Bv55SvKZQ3y6neHDTN8cSCeOUzrA9Jh6CpBM0IaJf1nzuEb44iTS3G1n5Kuiyn%2FdvHDIFux75pxbVvpSmtmjzW1y3zLOVwlZKEFCiGfxfKnQoiOC3Da1aFLHEmaDgxlMBqQWyMeOYKYKtZmIMfAXguxMcOQOw%2FCZeyWCwU6UpM%2BIKiXOmZuQhTQZE3qectk7AdrW&X-Amz-Signature=214d14c67408f5505c640490dfe09a525872e844f5da57869396de63a79e0a7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RSGG7BAO%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T203127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGZJg9tGV7KeXCbUBPAZrdgvTUJMFgdQoAManSp%2BFgCOAiEA8Z4dxJjC9VSkP0GV62at3hxHdF%2FkRpacSbAMqr91GYgqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMybmR6ZLSQyeuLxiircA0zM3yyQhtY%2B%2FrURFlxjJg9lwi3%2BP1z6MTmLJxcDBpq%2B6wuKfY5V2EzBbe3q4M59%2FqgeKD6AbBEOTHFsq3F5996v6Py9YjibkaIGK0sUDwTEDCFpIMjwrK0X9pJLL3IGe%2FqA%2BNWU63xrRMx8jPN2NGw2Iz5G7Y9Hbg%2Fq05njRswbIJhzj%2FOtPDphTgj4xT56BTfy4GVeVy13Gp3Pakwh8EfeI4qDbxz%2F9k5n3K52UXvPGBEO1Chv3d7YiNG5e5a%2BaK8NceLfmIn9jvhtja2evq2OYOMN2qLMF5vh3LT39Ib0zvBZyG%2BHNMBgOud5yHfOc%2FVGdkEJU2HdjXRzMHGRqZeUSg22x20Pa2iHpul9o2Ge0Y6khTuR0xzmiRAwiw%2Bw7NUBPFyfVcRg%2FaIhJQ%2BrHegidT1gS6FuKiLiWyJ%2FV1A4jZg2lM9q%2Brs2ufOFNt%2Bp0eWjxL1kuz%2FyOJAbwnkGg2Jyp0a0OcJPV50Hj9Y9joFJ2AnOxJT95iIY4JAs%2BrngNhEfXELawMMfY7kobZoxFFzoOPU7xgY%2FlmjrXD37LMILkeJDdVl%2FgFjF59%2Bue%2BT%2F6rqUHElpF5bcaGoo9U%2FO4aY2ZOTyfOusaOUNahQPII06JgJNDw309K4IPNY5MJySrswGOqUBCZd68lNN9b4kwnVpXvqyXeDm%2Bv55SvKZQ3y6neHDTN8cSCeOUzrA9Jh6CpBM0IaJf1nzuEb44iTS3G1n5Kuiyn%2FdvHDIFux75pxbVvpSmtmjzW1y3zLOVwlZKEFCiGfxfKnQoiOC3Da1aFLHEmaDgxlMBqQWyMeOYKYKtZmIMfAXguxMcOQOw%2FCZeyWCwU6UpM%2BIKiXOmZuQhTQZE3qectk7AdrW&X-Amz-Signature=214d14c67408f5505c640490dfe09a525872e844f5da57869396de63a79e0a7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666U2WWOAH%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T203127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDbsbG4ex3hJh5uxWaBAlABTfuU2tTXi3Yo8Uwtj8YbuwIhALgurX66jRKm8iVMqo9Ose%2BBOZpncOiHCsY1aN4upCSAKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx%2BI0HF1P3gMo8mTawq3APXHCen4hHNhfaaJga2dsfJoJoAbvctC3ONzK1GZKOqid71zBLhNkxpLzweUuRRT3jLo2R8SDb307hYqUDiwziq61xIkD9bEt%2Bagj9cTnoF%2FAccdW40Fp%2FyGmQW5sxMgv5BlQ1%2Fyg1dJDbJkc3H%2F5tce%2FeO7rOgKu%2BsQqt44bd%2BN7VoK0L6j3Vo5bsGremSEpK9CCm2sFdO1fTk0pPU4MG7QTdvZvZzDl6s70h7TjQG0Cll1DeWkahHhTPz%2B13yLhd1GhwS3y79x8WcMW9%2BRVbGSzAtRIjvnJ%2FU5qg08UVu0ZW9FY0v%2BJIFZQ3WXIHkR1mJB2Iv%2F72zz0UePxMRnP5EMkzgaoe9s%2Bj4Eddq2tB2g6epz10ygXmRHfSks0ZarVBHBrBl2Y9DszfklbnQuBhJ7ATqLPdafVgM1xjreSTBEo1FzHtXjjFdd12Nf2X3w3cADplhgATP%2BM%2BbLhRQEM8PRNe9QkQbFA8r71XhWTV%2BsHlFOC9IiuwCjiyA1wDXcdExLn1PXbctkEu%2B6VJKCvE9l8UHWEqJnAJrIMnAS5EjhZCKUDNYhqDa1AGxnzRLnIPxwsU0%2B5KkawPMmgpQRaRwg6ePgDMhr7QGdNgqkN2CoVEJE8y1h5XPEf9vIDDkkq7MBjqkATSaU%2BfO0axnZF%2FvETf5OZjkobbVXfWN1j5BfGKD9thDmbjqLl4hAKtmQ5wJ7X3u1cBYfcJsbFyLBQ2efq3Dlk%2FjezY%2F%2B04tGIJ75eSqnyIeJwgN3pk6ddQI8xcVd%2FXiz8Y4d3ifq6qrm4ncDNHXyBpP7y2gR1gtQlYndZsTdokL%2Fs0QViFqfZEvV2YXw5EzJKWyy92gz3YothujzZyFGceumEbO&X-Amz-Signature=f4dfc54c45b2e29c19ad2019aa13f9434b3169f54147675cccd36db93a22f38d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

