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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663X6M2DU7%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T100307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE3dwcC6K3ffJCUQTm%2FuvGt9Zf%2Fs7X%2FVbrTS1GRQnLhxAiB4cpc9l0y36%2BoBqeJR47eiXI%2BQ7fXEhtc%2BjdKdhQCCyiqIBAi6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWU0x%2F2yLZ3VTnWdFKtwDnbSxcub47F8YIE%2BeRGbVSX2eiLggROBL6stTZa45NIwgrncLLcvd2TLQHMWtPSf2GkNA9ENdfCym32YGLryDEk8X719czmvEN%2FL2SDRgFeXLGoDIKxsO9wzLB8lxKRs6VXvdvwlUjNE6Gtw%2Blph%2F7WWW7tthCMfbketYukUOKxc3CS%2F%2FnlHi9XSowVvfrRO8bwuj%2FYwinCeHNf8Sz8vpS36tvFUGA8yalaMmfpVvopyHnbNORkxFgH2ZDqeUOTjObxhbjIYRsz4J8NQ2oSOdC%2FsyheIvDToMDJecuNv%2FcjJltbdpCYwzord5xJBNjTBsi2mySAs8yOzGN9vn3lll%2FKHpAVi92J8RrZFTCjmpfYceCASUB7zO1Kk%2BaHmtUJirqBk%2FKn085zlhoKNYH%2BOgSqDcVi5s3aJlsRs8mlSESVY2qyzAacS%2BwMneygesJtDfb8CTl%2FpH1fnhWfE5lzaLuIr8BREHmpVj4YWxraciAnG%2B8F%2BoO6d5%2BT%2FFFUdz8i9lR%2Bw05dk9pEPt5kWIucppEYbV7iqeB44F5jnGgkkTEadOJ9%2BKk%2F9zHxb0yvZ6nGLFUqIBD0Sc8i5RQdf%2BOAbNhCWNr1F9%2B2AsGZ93Yga5Um9K20t0RNeiEHHZYGww0tGCzwY6pgEkgKW29C%2F3V5e3FJ81F1qmnn4vVl4wex2%2BE1USARr9c8l2uC2KZ0GkNeOjXu4EMSz0y%2B3LoJDKuWt7%2Bs6WXOLuk1r7h%2FGeSnPDIeSWMQY0%2BbzRCKM3KHP8OfLlmoKIcx1rBdVm1i%2BLfEhAVzea0sKxTBMxmGD0O6RTJjjR1cPdqrm5A9Vq30Jw2ewZpync5pvJincx1C9T55B3SqqBIU0Jb6tKm5GY&X-Amz-Signature=d46c86e65e896fc546a9c69295f56f30d651efe2e2beda12e54347632f98ae5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663X6M2DU7%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T100307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE3dwcC6K3ffJCUQTm%2FuvGt9Zf%2Fs7X%2FVbrTS1GRQnLhxAiB4cpc9l0y36%2BoBqeJR47eiXI%2BQ7fXEhtc%2BjdKdhQCCyiqIBAi6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWU0x%2F2yLZ3VTnWdFKtwDnbSxcub47F8YIE%2BeRGbVSX2eiLggROBL6stTZa45NIwgrncLLcvd2TLQHMWtPSf2GkNA9ENdfCym32YGLryDEk8X719czmvEN%2FL2SDRgFeXLGoDIKxsO9wzLB8lxKRs6VXvdvwlUjNE6Gtw%2Blph%2F7WWW7tthCMfbketYukUOKxc3CS%2F%2FnlHi9XSowVvfrRO8bwuj%2FYwinCeHNf8Sz8vpS36tvFUGA8yalaMmfpVvopyHnbNORkxFgH2ZDqeUOTjObxhbjIYRsz4J8NQ2oSOdC%2FsyheIvDToMDJecuNv%2FcjJltbdpCYwzord5xJBNjTBsi2mySAs8yOzGN9vn3lll%2FKHpAVi92J8RrZFTCjmpfYceCASUB7zO1Kk%2BaHmtUJirqBk%2FKn085zlhoKNYH%2BOgSqDcVi5s3aJlsRs8mlSESVY2qyzAacS%2BwMneygesJtDfb8CTl%2FpH1fnhWfE5lzaLuIr8BREHmpVj4YWxraciAnG%2B8F%2BoO6d5%2BT%2FFFUdz8i9lR%2Bw05dk9pEPt5kWIucppEYbV7iqeB44F5jnGgkkTEadOJ9%2BKk%2F9zHxb0yvZ6nGLFUqIBD0Sc8i5RQdf%2BOAbNhCWNr1F9%2B2AsGZ93Yga5Um9K20t0RNeiEHHZYGww0tGCzwY6pgEkgKW29C%2F3V5e3FJ81F1qmnn4vVl4wex2%2BE1USARr9c8l2uC2KZ0GkNeOjXu4EMSz0y%2B3LoJDKuWt7%2Bs6WXOLuk1r7h%2FGeSnPDIeSWMQY0%2BbzRCKM3KHP8OfLlmoKIcx1rBdVm1i%2BLfEhAVzea0sKxTBMxmGD0O6RTJjjR1cPdqrm5A9Vq30Jw2ewZpync5pvJincx1C9T55B3SqqBIU0Jb6tKm5GY&X-Amz-Signature=d46c86e65e896fc546a9c69295f56f30d651efe2e2beda12e54347632f98ae5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FEVZLRD%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T100307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICUjSFCmv7fuk6mm42jLs%2BOEqsTEov3cKk1wJBJ3mKpfAiBP9blb4JgOIYr6aQDAyT8fe0Mo56VHzvYYBL9QccJVMCqIBAi6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrjg0vkRvuwr4e6sAKtwDbBAovp8ZAKv%2FjcG1eDiYCBaAOuVwWFTBoGZos7J0je9X9Wj5sKHMjT7PJyz6j4H8B2Yt66y0XhLzuL52%2BUYYVubcUmHk6ZW3tCrwbqAzefWiryfS0RR13yIEqQeGfXvj%2BEabYRq3i7uBRw8B%2FOx%2F5JWHOD8%2FLMxjZAAoF%2BsrlxR0Ng8cNR98iQ9uGCIsUlQlPdDaLIajo0IixyBdiE3rHcT2isjXdiScfN%2BJs9aX7gQhCkCJSxCATQ9SdoTMcXD0VEzsCgyF%2FmHGmyubsEf9HBBacZix6SKhNlYODc5majS9qq0WxXcsLcaCFSNiL1AzF0c3BzJYRRcBD%2FE8knK9Tejv40zQFHR%2BUFImYDTmtjKiZz9IN6aCVzOMGmdLbkGLxqQ7S9rzQn5JEixsZkycIaJaw9iw4jQyiKO5aj6dF6huNlBAMvNj0QuaL1vTF7QcOLCUbo0j3UKQjhR5jqpesU5NDy5IViB1035NffJk94ff0qu2nt4fgMCELn%2BxW0jAAo7a3%2F1jTgu4xUveF0IEJsOA9jU7yPESTmFgS7mUVIwaGZ3z3A9uLrjSqdOACHFI1ONMvbDgadCHMazRsUfvuaaKDMfZVqiS1kEtqjRyjAoP6%2Fh81eV5UH4VVMIwgtGCzwY6pgEoV6k5FklmNuYcRQq1V4CFj0t0WRTJJcsGTIBZWKh4nxl5GdxA4ywAqRxTegJbS21o%2FkTn%2FOeXZDxy7dGk%2Bj4%2FA0CEHnufvNd2b1WNehUlSm0FyXpCzuJcdhELOFZ6wu6eAdZfkvqHLgonDW%2BxNuAqfBKDImCIsVOFiz7%2BjnADgQRVn8IiIaTfJs88O0%2Fg0%2Fd9REkIGxeuhv%2FoZ%2BIcKx8xJmKM163U&X-Amz-Signature=1acc86a4cac668da1ad7961bd3e21d6df73e41353196ea2bf3fc0186ced4f214&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXPIXNZR%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T100309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF4%2F%2FD8viCQFdgrVtl8mAuWgqgqMum6R2mxMBr3WlzDYAiEA7Qh2V0YlosOXWMmLlST9h6%2BcxpCM4oGaEyLSdO0vTj0qiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF00zSPUPlItiLgVkircAz6y5AEjXq1hwl50%2FrufKj%2F28%2FUPwGEILgwMOyhNu6c21G6rvT71sKrTLjhn%2Fo7qga1H0CC%2BoHX3YgSZOtutoW7%2Bc0xsWB4JM%2Ff5jydfuNifch5%2Bm0557%2FrPfBoolKnq6Xz9sxSOwIapI%2FEO%2FzDF2DDx4nTpW1MSlzJhoiRSLXl4gzhXmZPUF0O8%2Bo4yINHY%2F7%2Bdk4fMH8B6F%2FdVDu%2BW8fpnm3vbJViere5ykAVc%2Fb%2B8mlBhKoGJO1129MLu9aMcnhcyeiOIg6ie6nJJDgWXN%2BTA41jVhpe8Er2%2F5g7THDP4Wn6SHyInBNQqSt5lV6lgkl5pDz8Ka2YcRwnsAG3p5QggwWMDhcilxiFAmT8N5Sqh0jOx8U%2Baf98UiqqsqPkNq%2FneihNW%2FHttSimztMM87Dzs2A9w%2B53T8oZ%2FVztDXwn2zXKmkppYn%2FZNBpw%2FAb0%2BqxeT%2Bf9fchAz1JyuTLbaorLsk2WXeBkvGahvdHddhhW8IjsN3HnqFgXjF1RWCCPnQJ0%2B6OdAF12wz1vKbsugJQLflPyp%2FF7lb%2FCjK%2BmQuSStYw16074fD8Folf9yWYHX6UL9Q6TrcYCXXel29dUmQdMYVmwMgxGgVnSvw75N3iv6hZdyU%2BeWIs9q%2FNcKMOHQgs8GOqUBKZDWe2A%2BH%2FptUa7ywa3LmMZfL%2FQajzLdX6PCj0XTcIcBwydcYykphEyA4vyAl8dsjmDHahEATLdh0Se9H2K1TAAgP%2FqAc1cbSxqRVS28H0Xzna5aNUyv2Pb5RBb52Vw723BsDeF%2F2AN%2FLhBC6DLVy7c96uKvTwBjeYC6oLDTf7uRKBqwKdw19xpNttXt4%2Fd9SmwdFQaNf4HIdmDdR1W6SUp%2F0ckM&X-Amz-Signature=f12231d400ed4e24416a58b1caf906a8c4552e37f4b9f901f3ad07447fa3b392&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXPIXNZR%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T100309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF4%2F%2FD8viCQFdgrVtl8mAuWgqgqMum6R2mxMBr3WlzDYAiEA7Qh2V0YlosOXWMmLlST9h6%2BcxpCM4oGaEyLSdO0vTj0qiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF00zSPUPlItiLgVkircAz6y5AEjXq1hwl50%2FrufKj%2F28%2FUPwGEILgwMOyhNu6c21G6rvT71sKrTLjhn%2Fo7qga1H0CC%2BoHX3YgSZOtutoW7%2Bc0xsWB4JM%2Ff5jydfuNifch5%2Bm0557%2FrPfBoolKnq6Xz9sxSOwIapI%2FEO%2FzDF2DDx4nTpW1MSlzJhoiRSLXl4gzhXmZPUF0O8%2Bo4yINHY%2F7%2Bdk4fMH8B6F%2FdVDu%2BW8fpnm3vbJViere5ykAVc%2Fb%2B8mlBhKoGJO1129MLu9aMcnhcyeiOIg6ie6nJJDgWXN%2BTA41jVhpe8Er2%2F5g7THDP4Wn6SHyInBNQqSt5lV6lgkl5pDz8Ka2YcRwnsAG3p5QggwWMDhcilxiFAmT8N5Sqh0jOx8U%2Baf98UiqqsqPkNq%2FneihNW%2FHttSimztMM87Dzs2A9w%2B53T8oZ%2FVztDXwn2zXKmkppYn%2FZNBpw%2FAb0%2BqxeT%2Bf9fchAz1JyuTLbaorLsk2WXeBkvGahvdHddhhW8IjsN3HnqFgXjF1RWCCPnQJ0%2B6OdAF12wz1vKbsugJQLflPyp%2FF7lb%2FCjK%2BmQuSStYw16074fD8Folf9yWYHX6UL9Q6TrcYCXXel29dUmQdMYVmwMgxGgVnSvw75N3iv6hZdyU%2BeWIs9q%2FNcKMOHQgs8GOqUBKZDWe2A%2BH%2FptUa7ywa3LmMZfL%2FQajzLdX6PCj0XTcIcBwydcYykphEyA4vyAl8dsjmDHahEATLdh0Se9H2K1TAAgP%2FqAc1cbSxqRVS28H0Xzna5aNUyv2Pb5RBb52Vw723BsDeF%2F2AN%2FLhBC6DLVy7c96uKvTwBjeYC6oLDTf7uRKBqwKdw19xpNttXt4%2Fd9SmwdFQaNf4HIdmDdR1W6SUp%2F0ckM&X-Amz-Signature=caa0f1bcb99b0d565b84a9439c0976a3a85ca59d1c0bbaba1dbad2a707be88cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UW2HSRM%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T100310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGhKzhAQz6Z1E9iKMVzTXh72uR73QadNADpQRonWHySWAiEA90uMPoaWdlALIoMhJjWY0Kpl5oUN7FisMs5TJMxx208qiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCR4rxIX%2FL92PwaHcSrcA1vtAhapn11awDHbRCXHrghEhdx5K7XAZLxeHYvvvwJVAlGnPxMEnq%2B5%2FLPMSngC5mWAX365CFxYszyiR%2B9ZH7Nm31p%2Ff5BYXocfAVtT4z4VdniNv2UC9Hyem7KG%2FEbl9i6WvWylRa7nGkxSyhOTGwDnL1ucHcTGTJKw2tMB0%2BohWDsxGhUNgmiHd5OpobV0r1QKt2MC7vAkoK2TfiqttKZ%2Bgjto2dQFB37tsTIZ2a%2F9OEuILSQWO344QQYWdTFmENeBeJcEuVhP5WQeCkoPoKkqMFzwaS6ddIVea4K9xzhs%2B18HgVgzT8Dm7ceG3QYxQ8L5TOFC%2FPK%2F2Qt3WHFQ5p%2Fg%2Fu1U7Y1DgSkICYIJ3ZPnBiWylc%2FqaheWsxGmj9el3Z0HHwyCKJh3NTI6LGiBqF7Ntn0cH2hJ5GgpZC4v8CMS5t5qVGDidFE93gGyuSuXrbuFML19Vc96xagSlL2C0sZi7mcDi5rD7AZVpIjl1xGnqbncSS6jTVEyqct43G%2BSVC8Tka9KKDQ%2BUyTJFpD4NLvr7XuLUiZyoNEqH1T4SFnOZYpP9Mu5IyX4%2BzBpjjiFmPmGhr%2Btfr2L3S238EV7KJCtAtB2Pe83ax27wY9DbMbWgILUjBw2RRFym2MpMMXQgs8GOqUBfKkpIRcRMCpYXWoaRw1N3YYu9Hs96VSBBK916E3nDB%2FLaWDgdAU2Ecdv%2BCLupsv4Upcy%2FM5GnJR3oG8F%2B4C%2FAYQ7PzDUT4OdfbY%2BCxEz%2B%2Bo%2BZfcNdrOvaCnN%2F%2Bs9OKjM21CtbKFqOMnZue5thn5wZqijApAfPcgaFwwIxEijlk%2BWtJj3OElqdbg9OEeI1BqUd2naPShoKxEGgi1EIt%2BcZfj21dhA&X-Amz-Signature=de205db55258734d321359df0ca3567c518e0b47a280f27d376bed0f267c161b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNU4XDZF%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T100310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF2xNHOiY1n7u3tocu8K31b30JOsrproLKc3bTEvHCMRAiEA%2FiVapH%2BB2l6xHvJDhqR%2Fqj5J9IFDms6rMh0m95f7DuMqiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCnpXP%2BgmErlbbCP2ircA%2B5nHbnUFSgZ1AVU9mxR8QhTZsLuVeIMb8Tfx6lX16FR8nc8WDf8eHdraiCYq9KPQ5KTXGm%2FJDXv4W%2FNlHNQzBaGT6h2uukURIxJuj3tAo%2B23ZwezmNzRKXTm8E7J9bGmhT7cBBB8QpiRiUCh9WWgJQWI6omWVXuCNatbjo4Mt7mZQ0GUx3Se%2Bkabeww2%2Fn6MXE3ixYSPI306fQzDfyvO5mDObH%2BrOH6lJmA2K1SjaHliNjK3JtaC9l6QzSct2%2Fa%2Fdz%2BOclKZo2lFwTPfThloguyABIWC4l9PyQ5cGiYO%2F0TmHh2NSQ%2BnFarH9QVuJeSaSAaeIWHaMtReKgbCFftkEG2ZYYPES3e8snoM5fe831ogWQdpP%2F1ABK7ezl4oA3IEMmGiM2fmwB%2F964hZEilB%2BDsT8B7DEGg8%2FgBUtaNTJ7oFWtz30PDAnk7ZrKHV1nvAysAvSpI4j9Z8K0zAgY03X%2Fo3n%2Bl1WDkS543f%2FGE2vkW3qL76rN5by10uokcae%2BSSuVPtkbIbpteEWjrPBlB0xXNExs3mZhMUU0m8qDQsW3UuNCpmVF8OphmF2J4hK1tHyp%2FK04hLoD2J041NuG90dGlmqP2OwZbyEjQJPaeTh5ysA335f609%2Ba6EuF1MIfSgs8GOqUBjE0MFkA9SU2r%2FXNIJHN4xiWCgW3Z77ZkZ7q8ch8dsSKg%2BI0Hm6aBEecJNjn9g%2F6y1ySwrIjQ4LitNKWO31uHOyQxNdvl81AbCon4GOJyvxSAKrRR9MIG6qvQrNYFuZfH4VtJntHtKM4shl97nGtdOEEgf282Csf0K3Rkjax7E8yqALzA2H9wYR%2BybPvpZAAAOijAekmspR7g4A8Ifciw47yetltQ&X-Amz-Signature=b850ff5acf34147261da61b1bb1e262d3a1f84e75c3184be985144d843c0eb05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHZLRB3U%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T100311Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCKlZ6Bi%2BuTpFwyn8nGrVr9ts0r%2BlCJpMvg2yG9thDumAIhAIaO%2BZ96HBcMwX%2B6KlIq5Cd67da4wYK%2F5k6hUPcHWDudKogECLr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzjWIqtk84KovgPxG8q3AOfZ9U0wZOUtl%2BF36aCd1jgVVav%2BOvn2J1rgJ2ZdYnokv01QZhH58vu3dJNWA%2BHxdVNH8pDwRMpUmYm62QyegjoCGJjOuyI%2Fnr86K%2FeUYmjbw13GfkVJK8RU9IrMBVKqIVniInHqG0wgNpg9c3zHTUux3tjXXpS5C0U%2BRZTAeuYZH7GyoLjKPZ0xr0zp9oKP5A33V0OBH7WD%2Bl6zqoTXCcdEMD52mETw5Nw29XxxtXmOedQ2Jh5bTM6fapxnSKxmX49AoKvTcBDwrfbL3HCUIZGD2algFc3YKFjTWMMs3ZB1nzRfz3JZtJWrO9Du5rS2bxyqSiHH2m3wabR0TwSRweMxivIZ3po%2B8BlKltF0PK3D7cU8IlvJfDbXGjBnq5rM00wUfnZRp0ul1tRUdy3cb2Hxo8UZEk%2FNbcB58pWuKx2bB%2FkyqEXRaoQXkFVAv8oGdQEaKCU%2BW86PkuRUBZmw4QoHF2S5qV%2F4PsHa5tJI4krdu6W6On1PeJzCliVNE5cm7ev07lTPI4XZ32SLhb85rnrEiL57ECvebqRfGoBekUY6KO8ILhv%2BILyV%2Fsz4cCwWdKdsxLyaI7prxESwjrkqo66yuWOYxXErCcy%2By0Qp8Q9iRbwDDRjbYpvnA5eSjDN0ILPBjqkAUg43EurC%2Bv3rxeSMVnV6a3yDJbvGRGRa4ZAumCNkf560MasT4C1v%2BJ7UNAssFnjkAbtyLoV1idjvPG1Z8aUEy%2BV1rSB0UEIv0PPws6UL26I61ZRY2LoBIUI%2BhocWXaNiSG8jCmfMzcFxRXMLMJkRuOxgb%2F6XHCt%2BSkaKB1HC9RGpCyPAUenDBuUrwKgG9wk9T5s5mvGVoWQ4fvWLXgG%2F1pTMHVV&X-Amz-Signature=0a0f211d92b70004c20395c224b9510f1a947f4cf374bf8da8cb5af35e64352d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QA4FBG5D%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T100313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDfyLz%2Fjkm5uyEqsO7BhRtiEj%2F%2F5J0Xre5WpXpVW381YAiAaz%2FpjypFgGDIdVX29eO7zUnPFQ%2BU4Kl5A5C1tFQZGaiqIBAi6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8KPO6YZNgsHpzPWhKtwDBZCKqLZ6B2oLD37c%2F4CjHfyhdwvf6qSB25XaOSc8m1jpVtmCAi4T3GTi8VPg3M3qVo7MehjxaSEoh%2BxrOEgAFHuD1OKJxB%2FNthW5ck%2BXbmmcvnaWw1JjTcz0oWqzXUlx83CSRva7mirAd4R9%2B1ID5XVvCBXOV1%2FrThwjEh608Om3jyk%2BCYHGETfhuLWqq%2FZcC59Otw6Ulp7p25R7qjQYYNxS1Kju0aS77XZy7E2hD9kbsIiBLjULFLUsScBoA9vgpNtLNwE6EPtUgzfw2KjW7xAFuuU%2BQr1Q54OGUg4dSFjCSP1U3K669PXo%2BToXWkSB0E%2ByoKTan%2B%2Fwgx0LL8tMvamTBR8dWXlG0XaOkRCd0WomUbEjbcpfWql9PlZLOxNKX9FTmx6V63vgqEIiOe81Zf615DCQ2Fvil9F0NNzAeCEC64aaQktaOTw191P%2BSC%2Fhd61NH%2FqXXyLW6rcwM%2FHk9KkB43nUC6u1kEhW6ON8eZHLsvVOR%2BipnLhdk7SDgvB4QL0K%2FcDqc9RTlq9LCHWVFabO1HV35k6jCRx0e3wBSs0nZexZIoQ6mt3U2PyrkZM5XFSrcaeBUNw28p3C0CAu0mBuZUn6%2B9Ptzl3UNyWY2RqRC6N1gT2zRG%2BBDfUw%2FdKCzwY6pgFad%2BoDzmuYBpHx4XwxXWC%2BfSPggZ4V57tfGztCfF0qapzWCw2OIwynmBtwDwrShyYjxjtd%2BottLcoSConOJu4cbcFcmWRE4NW4oCYHK%2FxylB0F%2FQPDlIVo5M%2By53EZUFbT1jG%2B2%2FCladg9MSLDv2X2MIgbxzhDPtWCg7zxspSEu4IMhF341UbZ84d1ddDVEG6osimEYRayA5FXc5fNPE18mwNRYSEm&X-Amz-Signature=f38dda69358a179e63c45280ddf73dd7743e9f8ee69698f0922260a8d4f87e3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QA4FBG5D%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T100313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDfyLz%2Fjkm5uyEqsO7BhRtiEj%2F%2F5J0Xre5WpXpVW381YAiAaz%2FpjypFgGDIdVX29eO7zUnPFQ%2BU4Kl5A5C1tFQZGaiqIBAi6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8KPO6YZNgsHpzPWhKtwDBZCKqLZ6B2oLD37c%2F4CjHfyhdwvf6qSB25XaOSc8m1jpVtmCAi4T3GTi8VPg3M3qVo7MehjxaSEoh%2BxrOEgAFHuD1OKJxB%2FNthW5ck%2BXbmmcvnaWw1JjTcz0oWqzXUlx83CSRva7mirAd4R9%2B1ID5XVvCBXOV1%2FrThwjEh608Om3jyk%2BCYHGETfhuLWqq%2FZcC59Otw6Ulp7p25R7qjQYYNxS1Kju0aS77XZy7E2hD9kbsIiBLjULFLUsScBoA9vgpNtLNwE6EPtUgzfw2KjW7xAFuuU%2BQr1Q54OGUg4dSFjCSP1U3K669PXo%2BToXWkSB0E%2ByoKTan%2B%2Fwgx0LL8tMvamTBR8dWXlG0XaOkRCd0WomUbEjbcpfWql9PlZLOxNKX9FTmx6V63vgqEIiOe81Zf615DCQ2Fvil9F0NNzAeCEC64aaQktaOTw191P%2BSC%2Fhd61NH%2FqXXyLW6rcwM%2FHk9KkB43nUC6u1kEhW6ON8eZHLsvVOR%2BipnLhdk7SDgvB4QL0K%2FcDqc9RTlq9LCHWVFabO1HV35k6jCRx0e3wBSs0nZexZIoQ6mt3U2PyrkZM5XFSrcaeBUNw28p3C0CAu0mBuZUn6%2B9Ptzl3UNyWY2RqRC6N1gT2zRG%2BBDfUw%2FdKCzwY6pgFad%2BoDzmuYBpHx4XwxXWC%2BfSPggZ4V57tfGztCfF0qapzWCw2OIwynmBtwDwrShyYjxjtd%2BottLcoSConOJu4cbcFcmWRE4NW4oCYHK%2FxylB0F%2FQPDlIVo5M%2By53EZUFbT1jG%2B2%2FCladg9MSLDv2X2MIgbxzhDPtWCg7zxspSEu4IMhF341UbZ84d1ddDVEG6osimEYRayA5FXc5fNPE18mwNRYSEm&X-Amz-Signature=4dcf8db150e524daf0e7581fcece68a296d534d9a2409e62bbe20a8da8f5396a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664D4BSPYP%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T100306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHdkWDhqztNShrhoQdlyRdLN4sufhaAddFZPsKN2TVMiAiB9pG6HsUlPcnWoXu3iHNSTj1m5G5tQRNjU27j6up11ASqIBAi6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMx82GEkvTAnMX4zPdKtwDY3pHw0JrqPZ5myEp7CFe6LEYw8VST5ZksgB6UlISsKg9KD%2FLMUCc7SQGtsEF74if%2FmDlUK61eACfGFxycJWUl07%2Bgyu%2Fq84RC4mPbdIMcDLxXsOncnPj3OHcQwJj0Bsyx8aHtkG%2BYp6R2W8bJURx0iNeaQ1mS5hZWfvCnIOS3Oe3egCyIR%2BcpYsBuucEdpP4hLpBWnPSBV3wbT%2BIEnW0pQ7mqmhhYDxb9TpSSQ%2BYK4UuKB94cgqFEe%2FQpXpX3TOOSOcAZU%2B9xvANwl3t5EkoHwDgMANus4NhDxDLfYFnwNFpHb7VbPJJrop9pOdi4MjanCAl69WW2UZzC1c0keuxq7oAL3pp0Pl%2FRWf2xNSfSOYD7L5OpIr2h6XEvRVBf9KIGLhJ9i5iyd0rPpcTPWjv0IiqMHlihkG5lph8qIW0uO%2BuTTlR2d1R8BLg5JHoWuoEYbooQ%2FGabJBEbWCAxjZkbhnv5Z4cuI6K1SdbkBtSPXuMXLTqvBwd1bjhLM9DJQ3UzEb5gMISpAq7OMBOVBZG8H4tHIqd%2BHoLa%2Bf3fZ%2B0SLi%2FAQsRDzKarHylCoS4tfPPNMRv%2FnWLhvk7F61djjEnbFn832nHP5SN5sLCUWUv1tqiYqimoCK3llH15eEw4dCCzwY6pgGKHTpxJqewNScG1MvVrl3EFZIuIW3Im8jQjRNMq9r52spfwBqMqa%2BBGU68xQLj6Abmq4F6KwRXxqaQlH4GZUixOBtFWWCg%2F%2FWFadGSwGUCEzMOiS0T%2FIIEAzurKv5BUXNV%2B3HKYY4Qwz7Boh1r4sYy2TDLxs2tg6hgtWtJgGkWXXlNbqEZvzEaIfUDCHw2aue%2B3B1bFOGbZd21e4KbfPVd%2FcOjtHNH&X-Amz-Signature=3fe8771b0035de0bab395f73cc71fcc6894a1bd2f39f62c48520a9de6cbcdbab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHR7LBBO%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T100316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCSUmq0ljEerhKD1QfxmueWcdHVUpcV0Fi%2FloxJapkr4QIhAK7hWRkHjMH4FDtnvBn0uPIzBSK681mSMpwo97MFdJBOKogECLv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyZsU0gjfHJnHOo%2BQEq3AMLfza5IUUM6yasWMapuKpSCTyXVKaMV7Q%2FV04YNXQpEM2xrZyDRpWfLMZKv2cGWP3PFcWNPXuCoEAGgWUo%2Fbn5AdWPfahYUKa34WS5sQ%2B85oicjSUMSEal8FMDzEtCBkK9zgooOaGPgnahTa1EiuRwnQT7Utwk32ME1Ci42pokoNHosMatPYXo3oUTYDMg%2F7ir54BSQ8P8uz5RZR%2FriGaHnsl4zcNwF36gstglTKuTgaPTjD%2BKQWYM2kIWYZf7wTlyHqFF0nDI82j5g4MERRX8hHZUpG7q2mlYBQcLqAUDBTctFsJJI%2FbsHkJ7flib0ZF7dovtRGUApvHELv6eBnClUkq45jOTUY1dOd8Vx%2B6Eo1SJT5EeaFmgh2uV44QcDxyuEGlRqELhJjv6XFTelJR8lTFauvzSKnibNaBn4yTNKiiL8hjWYewtW90USaqWtCoWDhRx00h9Ca6kkcWZg3CtCLpGW%2Bl4XBg%2F8khEp2c0xB0vOI6kE4FCzSF3DtqLon%2BwgGDOW1Qwq1oaBDam5Kr5r%2FXSUvKsZkjonmvJ7yejImScGf6ZdHqO8SZ7LbjkNDo00OLKMaF6iPuFYqF39KNxu0zPqMO3GgZcapn%2FtFVHZwqWyGMw%2FKPnw7Oj4jD%2B24LPBjqkAYfhGv60mUkw2EUH2EudsukvXAuriaAPeLcKGpFCSuthpN7J29e%2FS1kDLBoak5%2Fcj4FTKWbYLbRNcwzptf4UVPVlBDlwqTc9xK3eKNUnz3rDFv53ynUlJxUqlEnOtrLSuUOKC5NOjGxmSYoGrgSDGmUvsFs43vWCXn82e6CnekrZ%2FLUYK838dDvC3zegqSA1c%2F4gD6rB1L1%2BD2g5XeXC%2FfwrXMJJ&X-Amz-Signature=4dbf91f66fa634b46cadb083217f2f7d6e649505683766da43c6907996d688df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHR7LBBO%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T100316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCSUmq0ljEerhKD1QfxmueWcdHVUpcV0Fi%2FloxJapkr4QIhAK7hWRkHjMH4FDtnvBn0uPIzBSK681mSMpwo97MFdJBOKogECLv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyZsU0gjfHJnHOo%2BQEq3AMLfza5IUUM6yasWMapuKpSCTyXVKaMV7Q%2FV04YNXQpEM2xrZyDRpWfLMZKv2cGWP3PFcWNPXuCoEAGgWUo%2Fbn5AdWPfahYUKa34WS5sQ%2B85oicjSUMSEal8FMDzEtCBkK9zgooOaGPgnahTa1EiuRwnQT7Utwk32ME1Ci42pokoNHosMatPYXo3oUTYDMg%2F7ir54BSQ8P8uz5RZR%2FriGaHnsl4zcNwF36gstglTKuTgaPTjD%2BKQWYM2kIWYZf7wTlyHqFF0nDI82j5g4MERRX8hHZUpG7q2mlYBQcLqAUDBTctFsJJI%2FbsHkJ7flib0ZF7dovtRGUApvHELv6eBnClUkq45jOTUY1dOd8Vx%2B6Eo1SJT5EeaFmgh2uV44QcDxyuEGlRqELhJjv6XFTelJR8lTFauvzSKnibNaBn4yTNKiiL8hjWYewtW90USaqWtCoWDhRx00h9Ca6kkcWZg3CtCLpGW%2Bl4XBg%2F8khEp2c0xB0vOI6kE4FCzSF3DtqLon%2BwgGDOW1Qwq1oaBDam5Kr5r%2FXSUvKsZkjonmvJ7yejImScGf6ZdHqO8SZ7LbjkNDo00OLKMaF6iPuFYqF39KNxu0zPqMO3GgZcapn%2FtFVHZwqWyGMw%2FKPnw7Oj4jD%2B24LPBjqkAYfhGv60mUkw2EUH2EudsukvXAuriaAPeLcKGpFCSuthpN7J29e%2FS1kDLBoak5%2Fcj4FTKWbYLbRNcwzptf4UVPVlBDlwqTc9xK3eKNUnz3rDFv53ynUlJxUqlEnOtrLSuUOKC5NOjGxmSYoGrgSDGmUvsFs43vWCXn82e6CnekrZ%2FLUYK838dDvC3zegqSA1c%2F4gD6rB1L1%2BD2g5XeXC%2FfwrXMJJ&X-Amz-Signature=4dbf91f66fa634b46cadb083217f2f7d6e649505683766da43c6907996d688df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBSK6R2H%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T100316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBJs8tb68hySCHIjXXeKnRfkATVm%2BnrKcc1hhjLGDOJhAiEAl6CLYZtFKdRJSK0l8%2BF8%2BvtdL2gwtpJzF4X4FPTrtFkqiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNggWsHAamntKzS1ZircAy5EM82bLfgF5wo3CtnepTue8HWkxfBvZtjZAFzb%2FYgkhwU9AVVMBgfc%2BcanuvWK03YZfdfwH%2F6ui%2FXv6VBcxW%2F7lSpWn7%2Fp%2BM3z515evucP4s9xUPX9ODv%2FXQEvdL9Tp5wwyvmNjY7zyOuGyFfabw3%2BoEXhFksUAYUtWHXSa16HCYLMTQxmmBxIDreoaKjzGEYNbIzX2HX2SAQsmNmJvGkcBz6UFyO53HYOyiVypv8L1Vq8or5TnWj6gUZnuln%2Fg2LV%2BrGFjU58cMSK2aO0oUf8gmEcvAGrrgeJhsqKqgiLgrV9Ws4BXTZ3IJILEQtpnfPcZB7heDnYoeiazM7WMs7%2BRlwQUA828gBViDxWbRz4tX9FpOkhh3E17dweWI1pV3MgFVCJHXxvCHXWyLcpQJTSIJFNhWKnpn7V73DdcjzGZ73GTB9%2BJjuljxzmfc09RMtIhMWvxaz5rNJmlFF7v7l%2F1KeMMJy8JMtIABwL%2FXYxBje2cvacaf8Xb6JnSJL2It07iVP6K1JMWrQ5jssDgRUDkMnB9%2FeKe01DunJdD%2FLrFm%2FSAIqvKdyweqBr%2F5bzQJQTOFQKoxi1zFMNBiDnvR4a5FsaT2wf81QNZ5ur1P0gI7pR8ZiNSC%2FwWWNwMMvSgs8GOqUBDmywnx0d1XxQgZUfX58ur2qpGpr9vO47qGsxfO9ntDVjW4n6mDADcxBfyNF3a7vtrjKzc6NFjZtN049NtHDufHYV%2BInB6GXP3g%2FzzQuD%2FMc4TJwtQTOtCnLRn8mLLslEwFt6cMVRcz6mGsgBMuBLCYYGT5drxk1wGCBgDpbGv34waEqAFY5HHH1UB0S8EkFPQQBENinhVTEPWeviQjqwFm56omae&X-Amz-Signature=2ae811ae472848c8a1b34cc6ca1ef0f0db590a16f7a16560a229337459ff4c4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

