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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VZJGSXD%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T202151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQCmhmn9s3rNHuZ43zR%2FOOq7Sf3qnVWCkXSGv0X6BLKj9wIgV4yNNPTKUVxJqgM51AGoTlxXOKcoxQcxQGbgABJBYMkq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDPxZdTXbpvLJxt1eGircA24W4FxtS5ic9WAZUCZQ1ICiq%2FhX7sSFssVATvEgBbalV1PjyPRe5zQHuLGnfGPfEZdjg%2FAo8f%2B2Vut0Jl8yioljNBHW0mqcPfmpfDU1ZrKzhSPIVVrhSndfh%2BD34ax%2BfKlNf1mqPhgyFAm6jmsBeJ6%2B9gMijU2ls%2Fmbt%2F8jQKJQjR2Fh78mFSaJ5Lf%2Fu%2F%2BaEDKJPel27oAJqZrxna2vjEN9Qm4F%2BYm1cbNI3qkbDXIjmiu0UB3hqsP%2Bi9006n6YRHA1fEy9dv1FMiax5W8%2F21U%2FGxge3m8QOuk%2FCL4dJPRq%2BSWXZZ2bdf3kJfQfH%2F%2BuIAnL9eCTyl2tO1uxfeJKhyWZVU0C0douVW1JdBQnryNSbbKGqrSHyCeDa%2BJIRcF2CvhXYq8XjC9qRPHXRfvLH%2FqJrl2%2FWwZHHtYw8nR%2FtObns%2FD5HZEWvEtrG76rBDjPAwOE0ZsaQ6XyAp7iHdXKo8Sil5y8zw7iJ7BHe3Jymq8QbZgk325IkfdEaZNoFFkePczy2GT%2Bl3LfjO%2BLlMfUnilJysnm3f0qiqV7jBgdUNr1KYNT4GCyXeFWOxRgMNgwPSsr9Ea3f%2FPgP8OQTLlB4SjzCiw5q9Uw03zFQ7b9o%2BGpA0tkgRKM%2Bg7Ul9%2FEMOO3gs0GOqUB1O5YdPpjd0EE6JGSEPl%2FP2%2BIDBrG5zN5fHQl6CxY%2B5GDh7ThEKQsDnIT3%2BC2ozKpJCejnFyibDF1Do%2FWWarDgrjjF7mQqnehAaBw0JVwCLaCJYX5X3TijHjW3SfARD1fNo2KgOqI%2FNGj9NZJusDSlH2eDnaV4ZE0XBrXoH%2BzWGKdXzTBHJJnOli%2FgR6xh0BzqAQ4zUvsK1Yf%2BaPHC2to%2B4eMWbcu&X-Amz-Signature=cfe87a7e4c7bd5657f5dfc9481d608a3d042b60ca76ce657fbbba3ee73782966&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VZJGSXD%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T202151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQCmhmn9s3rNHuZ43zR%2FOOq7Sf3qnVWCkXSGv0X6BLKj9wIgV4yNNPTKUVxJqgM51AGoTlxXOKcoxQcxQGbgABJBYMkq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDPxZdTXbpvLJxt1eGircA24W4FxtS5ic9WAZUCZQ1ICiq%2FhX7sSFssVATvEgBbalV1PjyPRe5zQHuLGnfGPfEZdjg%2FAo8f%2B2Vut0Jl8yioljNBHW0mqcPfmpfDU1ZrKzhSPIVVrhSndfh%2BD34ax%2BfKlNf1mqPhgyFAm6jmsBeJ6%2B9gMijU2ls%2Fmbt%2F8jQKJQjR2Fh78mFSaJ5Lf%2Fu%2F%2BaEDKJPel27oAJqZrxna2vjEN9Qm4F%2BYm1cbNI3qkbDXIjmiu0UB3hqsP%2Bi9006n6YRHA1fEy9dv1FMiax5W8%2F21U%2FGxge3m8QOuk%2FCL4dJPRq%2BSWXZZ2bdf3kJfQfH%2F%2BuIAnL9eCTyl2tO1uxfeJKhyWZVU0C0douVW1JdBQnryNSbbKGqrSHyCeDa%2BJIRcF2CvhXYq8XjC9qRPHXRfvLH%2FqJrl2%2FWwZHHtYw8nR%2FtObns%2FD5HZEWvEtrG76rBDjPAwOE0ZsaQ6XyAp7iHdXKo8Sil5y8zw7iJ7BHe3Jymq8QbZgk325IkfdEaZNoFFkePczy2GT%2Bl3LfjO%2BLlMfUnilJysnm3f0qiqV7jBgdUNr1KYNT4GCyXeFWOxRgMNgwPSsr9Ea3f%2FPgP8OQTLlB4SjzCiw5q9Uw03zFQ7b9o%2BGpA0tkgRKM%2Bg7Ul9%2FEMOO3gs0GOqUB1O5YdPpjd0EE6JGSEPl%2FP2%2BIDBrG5zN5fHQl6CxY%2B5GDh7ThEKQsDnIT3%2BC2ozKpJCejnFyibDF1Do%2FWWarDgrjjF7mQqnehAaBw0JVwCLaCJYX5X3TijHjW3SfARD1fNo2KgOqI%2FNGj9NZJusDSlH2eDnaV4ZE0XBrXoH%2BzWGKdXzTBHJJnOli%2FgR6xh0BzqAQ4zUvsK1Yf%2BaPHC2to%2B4eMWbcu&X-Amz-Signature=cfe87a7e4c7bd5657f5dfc9481d608a3d042b60ca76ce657fbbba3ee73782966&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Q324HKV%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T202151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDVv0iydivZVMHWXZntRzI1ZBfroq6M6M5osy4w40lyBgIgUr1ZYt60ygfIkQ7L3nykDEoLl%2BJpKJ93mHwEz8aF%2BPkq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDHqqJzFu6ORi4zIPkyrcA7v2K92rP5oyKAKiRyOuruzfjoN%2BLYvkKKo5XtyesGlmJEDEW%2BHc6iDtrL1Q%2BwOK56JxrpyuZTTxWReh5GOTRW9NdAeB95IkA5mspU2K%2B5vaZf6ekquXRB8yYazJr79HzGruru92v73HoxQLYu1QrhKuPWWb%2BqItHlsI8ej8OWvoI8ovcv3ob68fnKXzlHJbWCHiTjCqZAB0NwKZV0BQ0HijHapRaUIYOA7BfM8KX89z2Vd0wHj6qXppuVZ9lcMFWmxqbIyBBno%2BU9sKXwNt4uvEXTYwI1bI9HDCKFAobM1XIms2y6BEsEP%2BYnfooKCvjgrwXitw9R%2F5mkTtYFmbj5seoLwsSUWjmzhqZkfD9MuKDlYRusumDuK45RoSO1m1AhZ7W0Icfgv3tJ4bGV9r%2Fu2F9zHuQM3Og2xQ2nwvMnQXC2RVvL8Tw2Z7DS2YJb43MUwSBrtjSHQQOgBc0b1lOswxzEo51VD20MV%2BpxTI1%2F2VimUSdjLPwMzrPF5S79uUxiPqPqtgODeN9niGwzBmFBDhFy56e6kXbg2r2sr7xTLT6Zz4%2BtjRYQYZvIwNVj6JtmD%2BIjCZCTtJ5j13uzy6jnhSh1pDNjV5imEXw4jhxSzNiTe1pySbs2u6joBfMOu2gs0GOqUBZImH9nBbvd2AlX70eUloDjynvkPwCBLpL6XHFKP4oOHIszSbGV9ZsFBUj4KCekSe534P28w0ooTxJulwTlFsLLz0EGJfgn%2FexPVNeaoMAkMyhOwJ6cXJxeQAdMleTsmSOFaUjDKgi1jxsLMeObT6iVEnFfa5JAjkKBs2pbmFd5xNyXx3c9wXiUsvZEsUvokYD8J7dhjnVFhTg1r5A4cikqTd2tRq&X-Amz-Signature=2504192e3ebd5c82d04e16eff1861ee9eec1e8202dac23b1764bd10133adee6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJTX2WJ3%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T202155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCICZ1hFRkSqwAQ9Gk4x7lFavMbRsMnZ2yy4lLcfz1OTgdAiEAgCRcpgAU%2FfNDK9i39HGYE4%2BZgoeA7UGqELNcC52Fb4Iq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDPNg1JkfyEMq7giA%2FyrcA%2BkukzWJ0KsS%2BOqZ2fPAX9MLQtF8m8lMMJxJTxWjPfGq%2FQ8xnQXi5eKWdRXZd2IQuIQ1EXivdB%2BlYjoJQs9TycymZe273R4WYwXJplOICe%2Be4n2C6v%2BB6sZs1wHswJtFKMXo6%2FsiEaBBgFNSF3AkRhto4MONCm3Ld5s3aW%2FLctn7Oi3DpOpa8nVvcEB0EyJcLp9d0lf5tX60MzDr3qneQ1KtrjsPKS5h62zGpo1KyKHAD0re1vxXX%2FHZzPNSrujQ49YT51KXEGSWLYfYYpYIt6OyVf3PIoJF6bZBiXkQG3U48QPfhJ3xpx1yYqigeQzizGg7Fx36nAxif831FPAH8ro5wBFJLngo9zwY6KOoQ7HemoNAtjQRKtmOzZjnCjV6cJtXghKAgS4C7YSD9176BzG3m0%2FqeSjqXy1%2BhA3b9Gng2fJDargNFT%2FKamomDDHNUao6Sk6v0rCZnqz3CC22ZIYNKVKDhuO0s%2B5MjYRrhOVjOLW%2FP3EwV94F2TV8qI1v0Tj2d4I7JUFuAQYtRPv%2FlTcf5YkOl6kq9DTPPEmpK9hnZauB3LVi4cAyncRK52uHSDXuBNaYBD7TX9D%2By606CpR%2FJoPcDHGrzuAcP%2BDmGASA%2BKFcegVNKiO3UZI%2BMI%2B3gs0GOqUBUZDD0eyCydhXSIVrCG2P6uXdI9Q2bsqtygdRTyszJLJwQWQOb%2BvMtnMEL4K8EzV5AGTS7574QWQDJxqIIKrDH8e4m7xHX8mbyBcsiaIn5tkD6wNXGw7vVt2BbwMVTIOEPL%2FfKoX3ZvyhkaUpt0cFyfMFoUwyO5II3A16fw4%2F7b3%2BV7zNkDI9iTB80D3JNySmt0pwUk3rNTvnxaDOauVmfx3sR42A&X-Amz-Signature=1af3beb1812eb370abb050714c97a1dcdba6bea1d389d499e537819604844072&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJTX2WJ3%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T202155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCICZ1hFRkSqwAQ9Gk4x7lFavMbRsMnZ2yy4lLcfz1OTgdAiEAgCRcpgAU%2FfNDK9i39HGYE4%2BZgoeA7UGqELNcC52Fb4Iq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDPNg1JkfyEMq7giA%2FyrcA%2BkukzWJ0KsS%2BOqZ2fPAX9MLQtF8m8lMMJxJTxWjPfGq%2FQ8xnQXi5eKWdRXZd2IQuIQ1EXivdB%2BlYjoJQs9TycymZe273R4WYwXJplOICe%2Be4n2C6v%2BB6sZs1wHswJtFKMXo6%2FsiEaBBgFNSF3AkRhto4MONCm3Ld5s3aW%2FLctn7Oi3DpOpa8nVvcEB0EyJcLp9d0lf5tX60MzDr3qneQ1KtrjsPKS5h62zGpo1KyKHAD0re1vxXX%2FHZzPNSrujQ49YT51KXEGSWLYfYYpYIt6OyVf3PIoJF6bZBiXkQG3U48QPfhJ3xpx1yYqigeQzizGg7Fx36nAxif831FPAH8ro5wBFJLngo9zwY6KOoQ7HemoNAtjQRKtmOzZjnCjV6cJtXghKAgS4C7YSD9176BzG3m0%2FqeSjqXy1%2BhA3b9Gng2fJDargNFT%2FKamomDDHNUao6Sk6v0rCZnqz3CC22ZIYNKVKDhuO0s%2B5MjYRrhOVjOLW%2FP3EwV94F2TV8qI1v0Tj2d4I7JUFuAQYtRPv%2FlTcf5YkOl6kq9DTPPEmpK9hnZauB3LVi4cAyncRK52uHSDXuBNaYBD7TX9D%2By606CpR%2FJoPcDHGrzuAcP%2BDmGASA%2BKFcegVNKiO3UZI%2BMI%2B3gs0GOqUBUZDD0eyCydhXSIVrCG2P6uXdI9Q2bsqtygdRTyszJLJwQWQOb%2BvMtnMEL4K8EzV5AGTS7574QWQDJxqIIKrDH8e4m7xHX8mbyBcsiaIn5tkD6wNXGw7vVt2BbwMVTIOEPL%2FfKoX3ZvyhkaUpt0cFyfMFoUwyO5II3A16fw4%2F7b3%2BV7zNkDI9iTB80D3JNySmt0pwUk3rNTvnxaDOauVmfx3sR42A&X-Amz-Signature=ec6f251a87a5270af1e5a9a913a4a4f8bbc10f79d2f2c80b266e8873129f4de9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6XFERNG%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T202155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDIMoN4DF1OArk38jfftsCXXT1rnLboXo4IDFoUQARGJgIgR2hC2E4KfIl%2FXr4EkJHbJefthRG%2BMnuqvVg0vdwdYqoq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDE43gNxkRP1J4JkAfircA0G8ioaRAG6ggNnfHSq4oDIUO%2BzeYFI2se2Ko3Km4bC784zTNUdMDINpaaUuueCOyy9B5ehpMbqs6xReARQx4z1NpmYcrxP7d%2BAERYXIzrEIZEan823oqS%2FtN9KXxoXo%2FE3FG%2FIwoxVitagXtXQMuvXGHzOw3IgEIWC2q5vYMb9Dz5Z022cclr%2FFX27XoIfmiHrAhcTrKonNGa1JYQw9PWp%2FEroB8YyHo7W%2Fo59GjExx%2FTx03JE09e0Fo3rSxRK7IfNMWVbsCnkPLnuD9BhsHMyxNZf0g8FXP18BfGyEnZDylhpp4LWSIfq5ogEdRpdA1ElLBjHl669reKJLDPYHRoJQjO7QvZJ34Mh5j5yX57g5ouO6yhOx%2BSV39dI0C6UzY%2FiLPtWUSl5Y2CMbec%2FIrkidoOsJExbFGoUbBPdG2aRpRpbmI755Ps7yiMXDKAgxxY443XrX9J6LzncfgLJpUR0rOzof29qAlnth8cq30Zmh5wNWsenixdfx9i873Vvcqxcg27zFtIhZmuv551Y1Fg5PHI1AstcaX044D0rUpd1tditjOyIIziq3Q4kL57b97po94NZqyDAWsC%2FFfPnFiY1SzGgyv0j3OB6vXI5UKqt4XV0rvz4xH9LbVMCMMJW3gs0GOqUBQXnEy5D0Q4OTa5AlPlbgrnfiMnRs6oJP9TOYhRTDiYQgAmCh5s2STfLLDhEfDUmvV1biEpvAJOYcvgBHGhLZZz638YuhpO8mqHZzAq9D0EidKBE4Kh7spycur%2B2anDzdrrhvJEnXOYHT5sXFNuDiwmPVDkyufAouPR5LvX6X%2BywVHAzKA0omx7eEZke8A2RpXJq%2B8WuztqLDMlUIBTzIBNBaL2M3&X-Amz-Signature=b8b76db3a44d304c22209c35321564045782bb3c304af9f30cccc8536b9c14bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZL4YEFY%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T202155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCPfdZoPE4MGQuDI5AIZ5v1GHIEzHojVafIW0Q%2F9nB4twIhAKvqGzR67%2FsstiUfjVG3am1b4zLddxfOuAc%2BMdFgnWcmKv8DCCwQABoMNjM3NDIzMTgzODA1Igxq7WvpUAjmt0w0l3Qq3APY4foC6GsCxrnoKnuXsi5N6GsgmIRX9dOZTQ6HvxWl%2FpVCcCe7ij9u8OA6F6ROZKV2Zq%2BYaqp1M6jp2DITTYZxBiuZAp7bs744YsRjGaqOb1v3JHvkebR1MKen%2FJQGIP%2FMfy5UUfQPZ2rNW6OMrLqRdlvoTZVlM2yGHjLMPqJNcxR6XGj%2BJ6NUVxMfuZZ7Gh3PTzDepRMRZqpT%2FvxZZka3doPllfDVQATlscFiyDwe3KYh4FZdS8chBstlInmHy64R6noY6esLYSuz4v%2FMLr9xE3yCTW%2Bq3qLUuTJxd%2F3y93rnGaAQlEpuDb4WXzKrGdKKD3jBEOjBpYOEOQcOkeG8qVqWAB6b%2F2NdO3j9yYJAgDfzwzNeFHRO3mHdsmuqYqwL4hLiO5Ai6YDM7bKPjaUJg810ro1nq9%2FcCX4R6VN5362icr3IXyR7tWeH26mim%2BT%2BcJCpnlHkupgsedTikXApVr9LaHYHsF%2BiY2QpaPeyIRZZXXEO7PNtWYo4D%2B8MKYOYflCE4V00tOILK0T9rjBcrvRm2B7xLbQuyDKr1fYdFNNzFZ1ec6YmAT91m4rywiZKKdVEo%2BhQi%2FkI9avm1C8Yg2csocHA51Xc1UPee7SOHoNuwiF%2Bj6l%2F4jhNMzCPt4LNBjqkAXpHf9vBZPRpqsG0jbRZ4QS0oqsv2byOrc%2Bi42TN%2BoqWbBOlgucUAjsCinDqDdUbuNDecJJmj4XAUXMF5WiOXR80RFrEAdjRXq1fbfrlzWt5zDAbN9B6B36HaTkgf0oUh7KDaJoqAg0xhKPkp5Cc9Bd2EZbmS9hDp9APERbX40FKmgJjhjiU8sCfKi8nFSSjAYModUoqRX8rJDSXPeriV3E%2B8ADW&X-Amz-Signature=fb34c7107a42aa60b25b7a60d51a57cf53aa86b741e7b2365ae527c9b7b5d2ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SR7NF3GX%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T202156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIFvWZBedm%2Bi0i7nByAFbsI%2Bp3tX6cWiuEE1BtgxnaxXtAiBq2WQZ%2BWJw%2FTkY3X%2Btu4LHgTFC%2FGzLB%2BPlf4bBiWuTnCr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMsWTfWbwGrxy72NDQKtwD94uw72DrLTojSjfxYYgE5zBFZ%2FROuvfxvsZ9IYZur3IP9FzwiG6fiu%2B4eMw5VsYRcH4SdKSgPls96zUi4gRHz4zErLljAZN%2Fs8zsDa5%2FEETGp6bl3R3hkzhnw3c8dgVCitzu7qEHVCmOWzCV8uUCl0fcq1k7gB0UUNC2rvplGRXoT4XSeI8W1i4wNzQ8M7A3kVUOxwYQYeQz0CPXDbtUI%2B6JMf7WYb3cXOuKFx9P0i7xnxMPSJRFv%2BYWkZ1Z%2B6ChrEgGfEpFVSHQtv6BNVnZD1KuFqhrxlf8eqZalmF8PfLPSXCgk0JpimIT0wk%2B9hVTJzKMBXrYZi9wCWwSXRmSKItTBJUE1z8%2FYpWmFR72lfIY3o1dfS9e%2FscOXtN53RdZ6bKB%2B3ps0EKKW%2Bm7RKigcne8f58kayUiZzMMbYxtBuBaV9CbWIa47BJQEv3VyWanL5ZskyoidmevspG6BXIWfcm%2FOT429YuuVdxmW8ewa3oxtq9CZuTk6Q6HJ3PuxR5Y7NBPIFvV0aWmCNUGm%2FBtCnZKsfQX0TUy%2B11E%2FseYuGR9wcmhYP8%2FbkV9HWfOaW8qAtapwIOuzWxOYwOkKrLRSOU9K%2B73Zj1IxCf7qAtcVTRsCL%2BQJhfRXzHairIw57aCzQY6pgFyDCdizK4pRC%2FX6JV7Qt%2BRbxhM3AyJcaLRETWsfVUs4kKiwAiSxFqddmeW4TuEOvlgeOhUJ86wRURXr%2FOkzqVm3H6hIvSCZpRPWjeZRkpYxPNquBEMEUcyZEsM%2BRLpXdBybR1Uip9HzMrZA%2FO%2BlKH6eq%2Flkwk3X8%2FS%2F%2FOB00S64k%2Bw0ymY7Gc6vtwtq20%2B0vCr2vkHLM%2B4FLduCUqxy%2FRU2o2pLoos&X-Amz-Signature=b4ea5f2da14c82c0ebada77ff5e1f77c2a6a220f543192f5481d7bdeec4939e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664R7SI5GA%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T202158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIHsRT7Xe2LQcwww80IZpNzUlY%2Bah%2Fey7J%2BSvfULW7UD5AiAHU1aiYQptcYsg00H7S4FlnCcISbpb6tpLA1Y7Eumnhir%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIM%2FT7zxWkXtrCKYPp2KtwDCZYXkisOl7YsvwZLMX9gUDphNzv%2BRixpeFk80Q%2Bf3tuK9EH5GGs4nWPP752Y6uPbPhRBLW%2FyP4i%2B3Yls1ZysZAmx92s2dVnHVfB9Bkz%2B1ac4wJkG2jRM9BgBYT6IG0DYFkaBg4N1w4H1z02VQC%2F9yn2k5qAnsbQmq0rn%2B%2FlnngqDbBttKGIzHkOzQC274GEq534VBckalDR7YpzejC8ZZCgUcACUK1zPgiBTLshPbaEmSTBdbOH%2FRHuOoy6jdHFG2gHXtByz2HEIg0URBkDWBjz9AfDxNZvQzM2KCZh1JzRqafPBw22RE1L7RGfL95x0fzTHuDz%2F1M%2FVET%2B83iPNBBmDAcnfHYqkgQrpU18TMk%2BNgTYrA%2BNcgOwHgSammCL9ZSl6ddr61KtXA3VUbcNfpddJG0cpqDppnBcNc26v8KuNbsIqTuav%2BD9rOVsprEKALIOEYQ5DtuZ4W8AR%2B0CwIIxLqsT0V%2FNXzKDApIPNkhs7vbinO67MV3te8AGt6ppJ9oI5qqQ34YP40h%2BZuDqokbQgyMmdaG0GZPM6G6IDgsG0xb3V1uIUE%2BPQk2Ryg%2FZ0qml0LUgEm0vzhoYOWyTDtenTGlO66YGPw64hpNLAM%2BgTAhQkoZaNL%2BOkIk4woLeCzQY6pgHb04imahTcP5AzEnR7iuxyPHH62qiNWkm6Cw%2FVLu%2B0KzHHR5IEDt3EvPl%2BKfhhm4Ok%2FXHRqlX4aqFKLtVX%2FCn7tIgTbq0H7odXFeXIVDHXetW5pDtXJ4jZacHbbQEwaICPEbJVW4DmnOWlIoPagBLC%2B%2BUvM6igltyGuOdpE5RGHmScCqoE8YCXjEZ9BZV47jsdsEeNKxBkBoNqPTOk2TujOQgVsw%2FO&X-Amz-Signature=0cf7f337ecdbe2395d4a9ad78f8cf79ce2d9f28f0a3442ed99b91e97d0e95ec2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664R7SI5GA%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T202158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIHsRT7Xe2LQcwww80IZpNzUlY%2Bah%2Fey7J%2BSvfULW7UD5AiAHU1aiYQptcYsg00H7S4FlnCcISbpb6tpLA1Y7Eumnhir%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIM%2FT7zxWkXtrCKYPp2KtwDCZYXkisOl7YsvwZLMX9gUDphNzv%2BRixpeFk80Q%2Bf3tuK9EH5GGs4nWPP752Y6uPbPhRBLW%2FyP4i%2B3Yls1ZysZAmx92s2dVnHVfB9Bkz%2B1ac4wJkG2jRM9BgBYT6IG0DYFkaBg4N1w4H1z02VQC%2F9yn2k5qAnsbQmq0rn%2B%2FlnngqDbBttKGIzHkOzQC274GEq534VBckalDR7YpzejC8ZZCgUcACUK1zPgiBTLshPbaEmSTBdbOH%2FRHuOoy6jdHFG2gHXtByz2HEIg0URBkDWBjz9AfDxNZvQzM2KCZh1JzRqafPBw22RE1L7RGfL95x0fzTHuDz%2F1M%2FVET%2B83iPNBBmDAcnfHYqkgQrpU18TMk%2BNgTYrA%2BNcgOwHgSammCL9ZSl6ddr61KtXA3VUbcNfpddJG0cpqDppnBcNc26v8KuNbsIqTuav%2BD9rOVsprEKALIOEYQ5DtuZ4W8AR%2B0CwIIxLqsT0V%2FNXzKDApIPNkhs7vbinO67MV3te8AGt6ppJ9oI5qqQ34YP40h%2BZuDqokbQgyMmdaG0GZPM6G6IDgsG0xb3V1uIUE%2BPQk2Ryg%2FZ0qml0LUgEm0vzhoYOWyTDtenTGlO66YGPw64hpNLAM%2BgTAhQkoZaNL%2BOkIk4woLeCzQY6pgHb04imahTcP5AzEnR7iuxyPHH62qiNWkm6Cw%2FVLu%2B0KzHHR5IEDt3EvPl%2BKfhhm4Ok%2FXHRqlX4aqFKLtVX%2FCn7tIgTbq0H7odXFeXIVDHXetW5pDtXJ4jZacHbbQEwaICPEbJVW4DmnOWlIoPagBLC%2B%2BUvM6igltyGuOdpE5RGHmScCqoE8YCXjEZ9BZV47jsdsEeNKxBkBoNqPTOk2TujOQgVsw%2FO&X-Amz-Signature=7621ee3cdaa86a1b2bd2d947adf22c5a2e168e920bebabdbb747c75e2d668670&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAHCY5LS%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T202144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIGUioVO3pmL3SyX%2BLGih4wacf9BuYMPSMZjOvd8hnKQHAiEA5s0FHCXcPagVEpN0Jop5cVIahvzdcb4gp3eO4yTYWwsq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDBIldZE5FH8DaCwtqircA5a1N2Xslw2dlWwGR4ao6vfIDdbM9cWQT33TvYTKSuTAGu01rcG%2B7vkSwsgBN9C4mqslPNFKhxxwZLYaW%2BwqTenlvbRSwewg4whu21A5PaLXZB32F7jf%2BSQzToW5JqUkg7bfXlIxsktYREPu6DfZHb%2FZLDn%2BDsEn8zZ7QKAkRWsw5vMMZ%2B3uFQ84P3%2BTAxXwSIBu6sXUShSqPYsxrJ4IcRd0rXzRcMGWPRyhKosWAHLDppotYq08zODCHctd1he8bYi9kBAsTVUezIIzVLI41BSh8NvOgUM%2Bk9ecGXGkqmKYnCw8X2vR%2FmbtYah4TYk8Wmv0vuQOyg1jUBUvl6mL6xA8xUip4V6QD3rcMN3brY5NY1kZK54M0JaLytNaJKuuMWZm%2FVdOjzQ9hqrumjkAU4rBPMQvpjMqtY%2FS3rryTexh0Pfr62LGyBY%2BofMsEEx94rbkWZUiGWHNVY4oAU5snrHbo1iLkm876yN%2BJEQjOIQpv5%2FwGy%2Bb3RpxogFVGtcw5m5r9HTkAxqSDkagACW6mrS8NZUdNGu9jDu5ag2fat8%2FHqHYb%2BSaBD%2BvERAYt8rrs2bgUNgxak4xyI4NWTykrH%2BzF8r7zpNzywzMmWHLsHMoWrykvHoGdYHVNH7GMOa2gs0GOqUBidvfvhUqGNFRSzjYiyYWaNT4P4IynvRLfCN2QI%2Bje70%2Fv%2FvZO985FH38xOCKFthaOuC0wxivZ5Ta23rFIDMX%2FhAQVV%2BaJSu28cz2qNg%2BPvc2N3dJ%2FNx8tyW3a8kW9mvoc0DNQbesE0HxDYhyU4ilCl72piLo36MdCCEVRkS2EpT9mMPJsJqSWlyosBIwdsZoe4zGytrjvYL9FtT8i0Sl5JOdt2mM&X-Amz-Signature=676afb4dcbabce1dde12800b0b19f751ecb964fa2492f4dd90a3591aeb5406b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXDTNXO2%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T202159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIAqyOc9eGXAPJ4jKcP3FYouSCq0LDcatDsrXNOOsE5RJAiEAmRY26bJ0EOA7RObx5pqdUFu%2F53JTdI7fpPNu3pme21gq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDCbxESVctIr1xCOYqCrcA8Sfh8cxiVJpHg3StTjJ7vUw6YFqWjO4fP1C9nZ4bI9d78iIFJNTP298KGvtnWvtiNA%2BkTZdYfrMEEwd0LtHt7c6IEHnaYEV3VNjj3T1c0bhxVMLcaABLNeimRgm6m3XZIAI4faoGK6%2BAKPdU6suxadwoivcc1nrA4phYsEAnoWnYzHGVNiGTgs7mjzBNlB8eesu5nTLlkFROUiZ0JVRfpy7QyiPOUPFpUQKIp4Z7sXzfKliZu0bmQztRY7tLUBo83U28oX47OmTeqNNuRkeB3g0QfB2%2FmCO2HbsAXtHeRmHpJaLaKfySDmKo5OdeHq2OuhEUnRgLncn24uyr4x%2BiMPhI9Fdl%2BnN9BBVTth0%2F10y2LWaSIPJXkiS%2BZ4B51jySV4sRRKo%2Fyxq7v7HnPOz8o60zaiO4%2BZWHs%2F1diS3ZJZdHqkrrgWhycsg0aHjsbI50yp4C5fd0a3Xhn%2FrgPvWj2r5JtH5gzMjXrdnE6fr%2FhrKcj0FK9SH2MwCfQrXvaMQ8pSWbODKY6TJ9qN7m0rS4DOb7KX8qZar46wtcO6mBkFjcpeHkrrNZkzUsMNNfO16FOAub9Fce5Zyjmb%2FckEfC0zd0IjDu3tES1eEJKyBNKu0ewy4Bs9BMZQlNpkHMJG4gs0GOqUBf6u5VRnp%2FeUyYMKO9t2IuhyJ3hRmczPSdl%2BivjhQn0pR%2FO9lqXirfufXhvuOjEhLTfATeb%2BhITahG0cM8fZGKkNQ%2BXJlnqHNKvotntgPq40fskrc6fBOTzI%2FnQ5SkFc5V8%2FnXS%2BnW2vrbq1JW6oVfjW8sGzYk0Fr0GDONBGqpPmyE3fwYIy1gSQBW2fukl3zFNuDEBMlt%2FyXlL7w9LsqkEgAhONj&X-Amz-Signature=5d499dc3eca3ace9b1ac1d457eb3655c79d6e8fbd0c8846f39aeda2f0d50b991&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXDTNXO2%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T202159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIAqyOc9eGXAPJ4jKcP3FYouSCq0LDcatDsrXNOOsE5RJAiEAmRY26bJ0EOA7RObx5pqdUFu%2F53JTdI7fpPNu3pme21gq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDCbxESVctIr1xCOYqCrcA8Sfh8cxiVJpHg3StTjJ7vUw6YFqWjO4fP1C9nZ4bI9d78iIFJNTP298KGvtnWvtiNA%2BkTZdYfrMEEwd0LtHt7c6IEHnaYEV3VNjj3T1c0bhxVMLcaABLNeimRgm6m3XZIAI4faoGK6%2BAKPdU6suxadwoivcc1nrA4phYsEAnoWnYzHGVNiGTgs7mjzBNlB8eesu5nTLlkFROUiZ0JVRfpy7QyiPOUPFpUQKIp4Z7sXzfKliZu0bmQztRY7tLUBo83U28oX47OmTeqNNuRkeB3g0QfB2%2FmCO2HbsAXtHeRmHpJaLaKfySDmKo5OdeHq2OuhEUnRgLncn24uyr4x%2BiMPhI9Fdl%2BnN9BBVTth0%2F10y2LWaSIPJXkiS%2BZ4B51jySV4sRRKo%2Fyxq7v7HnPOz8o60zaiO4%2BZWHs%2F1diS3ZJZdHqkrrgWhycsg0aHjsbI50yp4C5fd0a3Xhn%2FrgPvWj2r5JtH5gzMjXrdnE6fr%2FhrKcj0FK9SH2MwCfQrXvaMQ8pSWbODKY6TJ9qN7m0rS4DOb7KX8qZar46wtcO6mBkFjcpeHkrrNZkzUsMNNfO16FOAub9Fce5Zyjmb%2FckEfC0zd0IjDu3tES1eEJKyBNKu0ewy4Bs9BMZQlNpkHMJG4gs0GOqUBf6u5VRnp%2FeUyYMKO9t2IuhyJ3hRmczPSdl%2BivjhQn0pR%2FO9lqXirfufXhvuOjEhLTfATeb%2BhITahG0cM8fZGKkNQ%2BXJlnqHNKvotntgPq40fskrc6fBOTzI%2FnQ5SkFc5V8%2FnXS%2BnW2vrbq1JW6oVfjW8sGzYk0Fr0GDONBGqpPmyE3fwYIy1gSQBW2fukl3zFNuDEBMlt%2FyXlL7w9LsqkEgAhONj&X-Amz-Signature=5d499dc3eca3ace9b1ac1d457eb3655c79d6e8fbd0c8846f39aeda2f0d50b991&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DNO7Y5J%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T202200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDJhgYvIOQPihwLkzVzoj%2BgYfBUCCYSz2sRuXsXXGCVMQIhAOfVyR88hDDTBs1RO8YLYCksqzL%2FwP09Wn1UdUf8T2zbKv8DCCwQABoMNjM3NDIzMTgzODA1IgxTCagEq3KRgIsAX3cq3ANeI87DiTWN%2BojmO%2FPWosttpfBYk%2Bpm6BgqOvMlSdhozQ6S0dbncX3D3fBPS6gOLA2SsxXRgC7cAk0QZ3qspbzHtsASPc0Al5yRQ%2FBvVOMWsKsOMWyfbdUG2izKBvwcVFeP9n0GswOD6f2DOnNZQumTmJe7T8cA9SSKg5Dg7iIXQ9vQvLJSM7g%2BiMqq%2FhV5xALExvEf09H5Lumh91%2FmXbLpUwyz1xoaZIEJubuTcwQR8vB19h5SesgUgif%2BbE0C0gI%2FGZQCKYJ15UYYGqe7rM5fUE2xsq8VjzjC5XlyEVoBC%2FgP%2FPzc4%2F5j3rnIk9lfqHV1H3H3fn5QlFPIvmXnbsN2GmrPTVJf6Gmq8cbLtWv5qAne%2BsW2JZBx75PJ%2BPEMAPdK5z0pu%2Fk2%2BXpnrzICd3rHJBFifCS7ALhIWzfVQ3R6heTUjG1l4qgZNgxsSXsPJ1iilVW2q%2BfazFm4OMPhptxFdIY%2BmpNJja%2FhnTEdjdBmorwb4O8A92RwtL47QfZcQ2xs%2B1kE3vBnW9hXTRKsRWBVieGubIFfnl%2Bp9gK8H2QrBHduHNqtkJvtShfJWcFU%2FKQKbfJ9hGFdjfhCO18ylgO90%2BKlbadvDPhn2T%2Bm3JzSPXHF9C2%2FnyPzqnNgDTDvtoLNBjqkAWYqMR4PgjSMHKtv%2FoeJSqVn4IqOtVX4cjy2SDSSWnDSaPMt1SyKcerAI8izRWenbBRvSExV2Knx0mQQug7zqtXg4nx1YBTNQ6hlEdGcJ%2Fv31ZjqxDnFbzQJ9O8IfT7kq6t9OXYnB2unNO6UsVfINk3Fr9BtCqt8jLiEGUxwxKTumKHddDQl5NuLitoSxkBDstCOnyGcC711GcJizUkk6AhrUMFI&X-Amz-Signature=fc41384405f41b3df89cbd4490dd00d34d4734fe2fe99179a8114733283f5bad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

