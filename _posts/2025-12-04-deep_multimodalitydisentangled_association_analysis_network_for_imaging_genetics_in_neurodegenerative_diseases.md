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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STCWGIJC%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T152837Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQDAeyIaew5pm1P0tC7tAAXe2MgQQpIDyuX7xETxFexw2gIhANRvPy0unmpmSRhUG4JfJYSrGkRv%2FiaF6JK4MVadMrvcKv8DCDAQABoMNjM3NDIzMTgzODA1IgxF3KRd4%2F%2FueZ6SLzMq3ANHMCZUmuuLBghmH7whwTCpuT9EdzxKytQKqly1bZwhAUAL81eVNkQAUuWdE8gdGtWE2iZjM6Li%2F8jGrLjSvIYMbnWEJCUs7SBbeqo%2Bfj2v67L%2FFzN6GkGsh9mOw8wbriul2oIp7WZw%2BW4NpspHjWlGGb1hoOOALctF7jgRNtnUZaz6%2BrQo0ummTj6tV2UKhgRVXgyZFZbsyE37GmE2j71svKDeuvMG666ZgyahDLTFoRKFRWy37JwPcNM%2Byi3tsFoScnpd1seMn2GrYnQmUfAPda%2FKSIEV3Ykkop5sEm%2BYvqcWwjBJSk%2FEqlI0bOulRb5%2FAtLo3oj0hYuhzxsuDYzkqhrFVCKOyEGNJbLz2D0lNeEgkE2zpDH%2BqEQ3KOAY%2F5EloPMs0zDWVH6F9yLiJxtBHF%2F5PwJXOJQyQ1kSQzoDmvj5PWvQNDu1EkG%2FVBsjEDOaB6akKF13cQ0IChO1CYQY9%2F74eI5CkwgF14tCddfmI2DklrreOe5%2FmrtGDFFJV1D4XiVX4UdlPT%2Bb24%2FkP5UHaq6pFzJ1khVnQLaxYuHXtvSdIitiuxqurqi%2FTdjGwN7N0RSibfCk%2BAjrsomRXFiD7wGJMvLmDV8j7ZqzNsgaPuuUpAjNwmnPpzmckjDd5ZLMBjqkATtPvamASEJ6%2FxgSamKOe%2FrrFN%2BPxEzdewEYkkQiyNdJs8MZY%2FAdlXUHsuyn7MVxfvNoDq2RFjPujlr7z6ziw%2Fal3qYQGKhHQwdhXE%2F1SiVLl9utEgdhYwaotJdPtydcbqjJq1PUtnbCfIr0ltgJFtpzND8ythd4txz3oQmnU27gs6Z7dhqe%2FWnQzePWKknM14VxRV4zaF83LDrOhvqPHZoXQKgA&X-Amz-Signature=2d8828e535200d937b36fc975bfea5c76084540da4b93878f8ca1d0eb87dba4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STCWGIJC%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T152837Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQDAeyIaew5pm1P0tC7tAAXe2MgQQpIDyuX7xETxFexw2gIhANRvPy0unmpmSRhUG4JfJYSrGkRv%2FiaF6JK4MVadMrvcKv8DCDAQABoMNjM3NDIzMTgzODA1IgxF3KRd4%2F%2FueZ6SLzMq3ANHMCZUmuuLBghmH7whwTCpuT9EdzxKytQKqly1bZwhAUAL81eVNkQAUuWdE8gdGtWE2iZjM6Li%2F8jGrLjSvIYMbnWEJCUs7SBbeqo%2Bfj2v67L%2FFzN6GkGsh9mOw8wbriul2oIp7WZw%2BW4NpspHjWlGGb1hoOOALctF7jgRNtnUZaz6%2BrQo0ummTj6tV2UKhgRVXgyZFZbsyE37GmE2j71svKDeuvMG666ZgyahDLTFoRKFRWy37JwPcNM%2Byi3tsFoScnpd1seMn2GrYnQmUfAPda%2FKSIEV3Ykkop5sEm%2BYvqcWwjBJSk%2FEqlI0bOulRb5%2FAtLo3oj0hYuhzxsuDYzkqhrFVCKOyEGNJbLz2D0lNeEgkE2zpDH%2BqEQ3KOAY%2F5EloPMs0zDWVH6F9yLiJxtBHF%2F5PwJXOJQyQ1kSQzoDmvj5PWvQNDu1EkG%2FVBsjEDOaB6akKF13cQ0IChO1CYQY9%2F74eI5CkwgF14tCddfmI2DklrreOe5%2FmrtGDFFJV1D4XiVX4UdlPT%2Bb24%2FkP5UHaq6pFzJ1khVnQLaxYuHXtvSdIitiuxqurqi%2FTdjGwN7N0RSibfCk%2BAjrsomRXFiD7wGJMvLmDV8j7ZqzNsgaPuuUpAjNwmnPpzmckjDd5ZLMBjqkATtPvamASEJ6%2FxgSamKOe%2FrrFN%2BPxEzdewEYkkQiyNdJs8MZY%2FAdlXUHsuyn7MVxfvNoDq2RFjPujlr7z6ziw%2Fal3qYQGKhHQwdhXE%2F1SiVLl9utEgdhYwaotJdPtydcbqjJq1PUtnbCfIr0ltgJFtpzND8ythd4txz3oQmnU27gs6Z7dhqe%2FWnQzePWKknM14VxRV4zaF83LDrOhvqPHZoXQKgA&X-Amz-Signature=2d8828e535200d937b36fc975bfea5c76084540da4b93878f8ca1d0eb87dba4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPMBVCXV%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T152837Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIGsB88Ub23%2Fr3OKiD1iqANX7qpqY4H6ucid8Dwy41oTTAiEA7YvWtvdU5Z%2BzZ5tt%2BHFQM9GKgkj13i0uM5I8lvs4vgQq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDHRWyvrOlHUV8lLAWyrcAwdZMUAqTMEU3GU2zkvEZeV3QrKnQOnJdQdxkjUNI6L3unmPr25ZfX22OW3OwdvL0YNT6V%2Fn6FVHdWu9Nj5VF8hH1xfr6gJJoqWnpFvFFdhdzMD%2FEOkeOCq3voZJjkFOVD1uNaP9mNoT95mvJEDuA5YTf%2BsPIis7BhFtNjcv6tqHG90%2BKZjbGU8zutl5%2F20WxBRJs7Wa3DIzchvpiBxQ7GWOHg4a2rYbpo69%2F7hN3tZSWNjHhHExXyff%2BGNvoZMvKYd2ksCQclhmX%2FWP2TNXNPyz1APEmAkV8IqFjVMCeu8jiJxExXswei5KRhjsWGaUhi%2FGmBlSdXyIFYuVCqWi7f%2B6Fr1VM%2BBnamlJIqPh84RD4U%2Ffyinvdz1daU76gWbgWJfrvfhn%2BkOrZgHCM487OtfdCZHYe7%2BUWNYp2F10eL7Fr20BJVBuf%2FtR%2FWspg7G4UY%2BaJ76ZZijNjaNlHHavnct4lJFCM6GRcF9mhVlrIJWF%2FApkzKIt50vdfHF3cXR5dTY8ZhJ3t4UjhkQWKbBhFZ5MyhO%2Fl7k4Wp%2BSFMF9dQ%2BMbAvrb3TGw%2FJnhsXy1AZlGk2O8gXgGUrFJWBlDJCUwYJ%2BcFEMxacqS%2BljArDa%2B1p%2FkqHqOZhqS4AHQdk4MOLmkswGOqUBKLm7gqia4N50nFr%2FFPMmb480ShKRJ6oLGWi%2BSzzsHlbxfh2H1XXS8WqY6NIxvkf8QuUtPN3oaDf2gv9ASY4E5YVcuwb56U20QcFVbqrnLXqB2XyGHFVw750QY6cwaq6kUHGePjgAc1Gw9Yhl2IMsjZXcr%2BF%2BA8XiDyQ5qcRJa8d6TqkHz3stmM24kLiVTofw%2FVs5025KAz2dgHbN6OcGGdvhpc4C&X-Amz-Signature=1c3ca5892a108400904517d2b17213c74cbb654c9051ad807a18be0add9c4941&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZR2J7HCJ%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T152841Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIDHKmLbJvlDMGZZssRGyMuKO%2BDnv8dFcCeeEeJD1xFfVAiAexrwTMdgAsB6mYnTW0yjCthLyLv1n2v7Ea5Mbhlzqgir%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMc7F1XfxnmeOpgEhiKtwDQCG0jonCIB50YTUGN%2FqANm%2B8zvdhCaT7%2BnuLa4vDAk3jHgmij1Njp4dUXZISohEqOeSDcwK5q9VWiRigHLP5EFvujKeDZxoq%2FOUHgNIifrMdilPp9ys29Ygjs4OHJkedjAfF8E2ZsipJ9sTNdEaKJoQEm0sTgwl%2BY2FAI5pa0ZFc9vmytNvp6BnwcGdRdNPhf1gSpdJpP1PCLpJs8iZj1BTdbqYsji8Ru%2B3gEOJhBd8IB04pJYvdwNHI4uSuzwwV%2B4mVCeAZh4mnw2tjbRQ5dxmu7zAZ3YeW2OkFS1trlBcyqbB5y7TiHtU7IC0VdlznlclXJOwAoE1CAiXEwJwcTrUWpmMclrehgyDbC%2FVY6J6B2i1GRWP3nZmd1S4Ri8eosF2hFXlPIMksDfPyW1IM%2Bjt25MIRthbCt%2BMNOO8%2FS2pQVcxLENppeA1EQFT4bpYmT3c5rG5ka9XUwJ80qVRmryiaNl8uj9tLCOaEtBae0cwsP2SAwEsumx%2BFSxfRWdYPO0D34khG5ZgGbeeVjRImFNPD9p3jizZzpZEXkzCHXlFOK1D0HM%2F%2Bai8BX%2FWKODC5iTHm8BiQ4SAXcgSCazqkYYGkF8iivO6zIonG2Ld5JreYEGJl1uqGU6doMMow6OeSzAY6pgHp0YrQjtgQeNzuijAYka8nJKGmMVvEnmCmq0FTDJW1VFA%2BREIm2WBvY7I7J7q9S1pOHstRfSFmytbrF0TjmfE5aLgl951rBjUeuO4BcQm3ok9Uvv16hM9RX%2FIp2fsaQra%2B7YocM7XSdQoGYfQQ5Qyf0AfOw5iO11XJWCUDWyYuueERleSa0ftU2R39bjMvqn1Y5jwhqVW9eTGf3WoXH0EbobOyJ5yb&X-Amz-Signature=be26d895e044e8087e1a7218ae4f4587c0e3a75d7547b3af6175f2bfe124b790&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZR2J7HCJ%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T152841Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIDHKmLbJvlDMGZZssRGyMuKO%2BDnv8dFcCeeEeJD1xFfVAiAexrwTMdgAsB6mYnTW0yjCthLyLv1n2v7Ea5Mbhlzqgir%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMc7F1XfxnmeOpgEhiKtwDQCG0jonCIB50YTUGN%2FqANm%2B8zvdhCaT7%2BnuLa4vDAk3jHgmij1Njp4dUXZISohEqOeSDcwK5q9VWiRigHLP5EFvujKeDZxoq%2FOUHgNIifrMdilPp9ys29Ygjs4OHJkedjAfF8E2ZsipJ9sTNdEaKJoQEm0sTgwl%2BY2FAI5pa0ZFc9vmytNvp6BnwcGdRdNPhf1gSpdJpP1PCLpJs8iZj1BTdbqYsji8Ru%2B3gEOJhBd8IB04pJYvdwNHI4uSuzwwV%2B4mVCeAZh4mnw2tjbRQ5dxmu7zAZ3YeW2OkFS1trlBcyqbB5y7TiHtU7IC0VdlznlclXJOwAoE1CAiXEwJwcTrUWpmMclrehgyDbC%2FVY6J6B2i1GRWP3nZmd1S4Ri8eosF2hFXlPIMksDfPyW1IM%2Bjt25MIRthbCt%2BMNOO8%2FS2pQVcxLENppeA1EQFT4bpYmT3c5rG5ka9XUwJ80qVRmryiaNl8uj9tLCOaEtBae0cwsP2SAwEsumx%2BFSxfRWdYPO0D34khG5ZgGbeeVjRImFNPD9p3jizZzpZEXkzCHXlFOK1D0HM%2F%2Bai8BX%2FWKODC5iTHm8BiQ4SAXcgSCazqkYYGkF8iivO6zIonG2Ld5JreYEGJl1uqGU6doMMow6OeSzAY6pgHp0YrQjtgQeNzuijAYka8nJKGmMVvEnmCmq0FTDJW1VFA%2BREIm2WBvY7I7J7q9S1pOHstRfSFmytbrF0TjmfE5aLgl951rBjUeuO4BcQm3ok9Uvv16hM9RX%2FIp2fsaQra%2B7YocM7XSdQoGYfQQ5Qyf0AfOw5iO11XJWCUDWyYuueERleSa0ftU2R39bjMvqn1Y5jwhqVW9eTGf3WoXH0EbobOyJ5yb&X-Amz-Signature=bd9f0786d4b3355aa87ce8410c2bee591fbc86eb1ea7377ac6cb0140f551a475&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SM3E7VP%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T152841Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIEBF7jtVZuG0GsmaGmc8WgaldqJSkoPgxnhTzV%2BuQaRAAiA%2Br9me3WUXLT8dD9LwxQK0YMTUmfj4YSt6MYQln23Zlyr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMEoy50ctvyvsSb%2BI8KtwDw3X1cCCtTxG5KaErX1251O17qrxZoEE7yJnAVwL6cHWvwWaqeAPBT1DXacLtiw8pgf1fAbrFv3hpaxPN7WnqoeDQDR%2Fa9TPwioZoryoMwS37zn7wQKyq08icpK2P1gx6MyNNUmxvyoO2yMm4Nbl%2Fh7Me%2FudDchgzuQ6dywfgPjff8WUmvtH8ISXLWZ1oFAYzkZqxeK%2FqTZdlLfXNUqQYdUvIo7mt44Ue2r40NTO77yuPV6LYODDSPDE3KhqMg3U8ELen77yTwkvFeChcTHk%2F74AU%2FeYJJe4YHyr8Puflpniq%2FXNk2EMZE%2Bbuu8wBpx5XvTmruTRpzoou0Y0QBbBUJNV%2BR84%2FQ9CKO7k9bRmPNn7FnA%2BEhDVHk2YLIMG%2Fxcd42Oj6EZ0Nb2jsymeTxnh5Pn%2FjOJnwFsFWu%2BdQrn9jYQvKFgcxQu9%2FRjjUjWI507glomj5WdjRTt7XY6f%2FotXy6oeBr6UPWdCbd4HmBXB5bEPVwb4r8z7BTNzMyyCZvlDughiZ8bToeiDPyKEdXBsmJ7KJ%2BWu4fcztQsDY%2Frr2U9iaMF5roWVZqAdSL%2B3sMw2uipxArta5YBIDh8TUW1cqyOIXJ8j8PTY9awjvKYgC3Z9V6AMlRUkVi1u777Uw4OaSzAY6pgFJWtkt%2FBw9PEyJW1R5jp0EhjjuHJ5TQr2L2d9vnGQQe9AbdNIuAaaJEl1N0gqR134FvVeiDzHKn7mquvA%2FMV96z3hK6dMkAKUUQi0vvlwdwi8szTOqFiYjuyRX0nnKAqEeD5SQOPSqCNWyNEf7Kpd1uU678grMVRsSHBpsMWFdEh17b0mYgusrIo9BGemIThr%2BbUF9pr72la%2BPlbVFc%2FYTK6R2rXbE&X-Amz-Signature=031fd9df14751f3a479d0fce74033a52d64289bcc5ca0d2fb09950c2ef7e821d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KJ6TFAC%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T152841Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQDiFPeXbRgxsObAoSiBSpHjWvAfndLcsWlx5HF8%2FYuVCgIgbNISFjqvVvrFwb%2FXcQewG7KnqmvpcAANrHCrBgC8LCwq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDOaTVWIsSb4hLtfGZCrcAxQDDHZZCm21DRAiLvowRcZijMXi4prkJAHw0I4nikxCmeRaheDMiZiKIPVNTJCsR4cW6OHCGlFRPMr3CXbMTJbPgFYlVY%2B7Neg1%2FFHBoG7m8%2Fg1U%2BVCDMb0fa9Ij72kQfMdlH3Runo1%2BH1Q2g3avHEKlE2rphKkzJJDwbpKUguLFrU46F91x94gIUhk7m2%2BG0awidIbyuRvX9ZF0o4Kpt7VNp8T6JEXPIo1LwYypXpbGbmYqQM3qVjEi9tg%2BBEW4EVgcGTqBfKjTzCF%2Fm3v3E3Y2TI%2BoUqGOp2V0kSx%2FvjSTRX%2F2g1YWMmv9jfbTGn2MVQQUyhmXvuthIG2eSGc%2B4%2BygUglwrHGZMSOTOrV4E9GOZ0UOOsDv8fODaujoPJImcxIGUJWZkeO%2BZ9gXmJ8zVs2TtkUt8jpeRlugnV0%2BF%2FlD6tjsytO14vPNQchFK1yRnqKLEHvGLveP%2F%2BSWnjNsO7Fh2fAcKBsHi015E7Pxz%2BcN%2BBZVMwUmqtOtfM91%2BY6uWi8ejs%2FyILSkhZADdjJZHHKQsGnOLYkqLEWsIAIe6tDghgHELqlj6FjOSjGihyan%2F3D%2FVj1IFtv1s87ShV3tRMOER1hSoixAN5uMZfcnbGVPXQBTdUDVr2fJj8gMMHokswGOqUBGd6GZNoTk82kapSw5OuOHW0B9pOr2IQV1gyYcv1duy9O4HXvJ1hAxuf3awbQ%2BtbZnVajZLx5RL%2FDH2MEx0xMCqFi4vOMzzuBnr5bNaL%2Fz0sBcpSaJK5ghzeBZgSLIzJod4aYT%2B3GikDg13ba3txbEUcgUSEYnq8rxD%2FzJpGm%2BGQ6Ja7v6RJcA7zex996shFQrHgyPemp6sD89l0d4RCLkkXJep6u&X-Amz-Signature=b518566ab0ea6786d3a1462502da1a37140918a31fdc57af3df89210f8baac9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V5P53M6U%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T152843Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCID8ITyuxuOgqt%2FpGpkL6ngfxdbGOJjzrgu2idgm3D1MRAiEAleeQdjBmzlnuR4f2lxtbtD6NoETud%2F8lhgfjb6ChSJUq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDC0STVVOOfkS6dISbircA%2Bux0vzKUtlMsOT%2BH8M80nL0bZe160A9pUp%2FvkaPvZVH49%2FFqiR46nHWjW8FCgjmkrzUPgxPvUgLAB1ULRQL1kU9AdkwMZCQx820%2FbRcGxvwe6S%2BYhIW7vo6U045djkRh%2ByyNBDMwLNOwcCKuag6AyFy0S2xI%2BaqDHj6xQ2FiY8QskFIQy84H%2B0gpdmUGnyM0q9i1wbnrTRXRB39QFHRLCHPrP1T1lnY3n1OvtKYuQMaON07yuG0Gx%2FcHoVjooCyKzvAXVK8evmvjufzIP1%2FSs83d9Ds4aKv%2FMmihuNb9pUc4JdcmTYJK1ybHFaiZki6u8ZceFM3BI%2FnEiFsV5OO9BJx6PzTsDpAPsmmX6DZQibfgndSgQLTqewzSjLYzygYYuufEGXVl8c%2BheQ%2BnROi%2BOSPyfQ5IG3PtoUkAp%2BMGXayTOcGUKo9tw5N4NZ34Gwo2NVyoMNMAVCPvxAnNOrfmIjc8DWZ6j8%2BcQLlAVNPqiSCRmR2VkFmWM59cg81zjwLFQguCx%2BfZLaDGkHOhSR8YfqTfBlD6%2B9xdpmsTRDHz3B%2FpLuXii65FJTcv2qsfWDJJsCtMWJrGy37DvLw5CgbPLuv8izY6wW8gQUwIHjMCShc%2BybRaL0LtmfmrNuiMKrokswGOqUBCAaw4WfdLWtKrzyFQpIAke6%2F2AiWC%2FG4kmpFEdSIokQ%2B2CEV%2BcSaTlOOacBTmndNpO3KdY4fBftbH58G4lUR3RhdeCEujUUo2SLm9KgopWfJDkZK5tU%2BW4LNQRdjNWlD2VdBcFksDPBotyhZnEi%2BS%2FZZfQMbldCoU6N50N0%2BDmjmAPJHSYVT5eHRMnqFNjwvR%2Bp%2FhBoT43Uhfqb3ZzP08QJqPmax&X-Amz-Signature=dd022c496b88354bac210aae1e9da051e9f505180758e0e637e91cff3254dcde&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RR2PTCWF%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T152850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQDkdtUxeuia64PTMAC6PSJ5Yip5c%2FeJHokHWIX2SIzfyQIhAL3%2BfSkMpPAi26iYQcbsNBf2f2Fwpk0r0Hl3OfNvJ6ExKv8DCDAQABoMNjM3NDIzMTgzODA1Igyd846JgU%2FSIAsGgP0q3ANqkgxJYs3BssohhKVqtExx6Ny5Scn5tr1FNvlnY4GdfgmbHArVggY2Fu6uFROS1zZ6Wh1pNahEMKCwisnaMdAH%2F%2Faa20xfCz2s%2F%2BU9knb7SBOSojhPZHObUJJCOMaM4pKlj%2FB9b5KeGMSUFRJ6xP1T%2FRGMChj4tFttZeCb5HvFbz3fQsafyI7jtky3pzAG7M7XcgoHHUPOrCP7vHxr6F1cFtSffPztoT74G7Sr63COHMBMYG2JvbteBkdi5Y%2FpoSPnA3brPElcvoFezK7lBKa3TqaWouf%2FLXNOispp3N0LPmHvTaxXAYX881aVg9pTPEpnB8Ny6IWzSln5Fh22DP7bfeeCQTuWrc0jP5gcI99XgFu98GLVAumt%2Ft19GfgoYmfxvMG6I65dWh4%2B40JjE7ViTyqj1%2BzvLCl3wfJ6gPhzRwg0xdS9azpMtIPQrvFLSkjPG6aFPjFSHLuaFCV%2B%2Fayh%2BYAmq1zUzm6gUJhWvdFZwioKznLodHsQoak1jCgdCfi6khfG%2BN4NXUzermPeZiJAMno9yZS2eKS77iUHSZr2YgvlJ63KAtmZ%2FhBuS8XiShTAqHR2RaLaAm%2BcxUtl2EoazpJOGqbhmEe8aDHig3CrY3Ud6ucGhNuO%2Frmj2DDL6JLMBjqkAXQJivyZ7N2scQI9Q6SpcIkOf2Nf42bg%2BNaSn8pnhXJpRRbFMcZmPAGZ6vIwWbRqAD0r9LQPcjrI3n4D9YY4gyx8gwjy6ccTPdOyT6p5%2FBoZbRmI38hScSz6gwbJyvcvqJfbKQqWWxLaudUVVoaEscNzBtX4eZDCJ0B%2BMDUALJovGzgxiUwuEzYPB5JFhtHw78qiwu7g7oiheywVmHiFKWzReVeY&X-Amz-Signature=81de5d3e2487fd35679af09ba2c333a77864ab1e143e44ba8c81681bdd0512f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RR2PTCWF%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T152850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQDkdtUxeuia64PTMAC6PSJ5Yip5c%2FeJHokHWIX2SIzfyQIhAL3%2BfSkMpPAi26iYQcbsNBf2f2Fwpk0r0Hl3OfNvJ6ExKv8DCDAQABoMNjM3NDIzMTgzODA1Igyd846JgU%2FSIAsGgP0q3ANqkgxJYs3BssohhKVqtExx6Ny5Scn5tr1FNvlnY4GdfgmbHArVggY2Fu6uFROS1zZ6Wh1pNahEMKCwisnaMdAH%2F%2Faa20xfCz2s%2F%2BU9knb7SBOSojhPZHObUJJCOMaM4pKlj%2FB9b5KeGMSUFRJ6xP1T%2FRGMChj4tFttZeCb5HvFbz3fQsafyI7jtky3pzAG7M7XcgoHHUPOrCP7vHxr6F1cFtSffPztoT74G7Sr63COHMBMYG2JvbteBkdi5Y%2FpoSPnA3brPElcvoFezK7lBKa3TqaWouf%2FLXNOispp3N0LPmHvTaxXAYX881aVg9pTPEpnB8Ny6IWzSln5Fh22DP7bfeeCQTuWrc0jP5gcI99XgFu98GLVAumt%2Ft19GfgoYmfxvMG6I65dWh4%2B40JjE7ViTyqj1%2BzvLCl3wfJ6gPhzRwg0xdS9azpMtIPQrvFLSkjPG6aFPjFSHLuaFCV%2B%2Fayh%2BYAmq1zUzm6gUJhWvdFZwioKznLodHsQoak1jCgdCfi6khfG%2BN4NXUzermPeZiJAMno9yZS2eKS77iUHSZr2YgvlJ63KAtmZ%2FhBuS8XiShTAqHR2RaLaAm%2BcxUtl2EoazpJOGqbhmEe8aDHig3CrY3Ud6ucGhNuO%2Frmj2DDL6JLMBjqkAXQJivyZ7N2scQI9Q6SpcIkOf2Nf42bg%2BNaSn8pnhXJpRRbFMcZmPAGZ6vIwWbRqAD0r9LQPcjrI3n4D9YY4gyx8gwjy6ccTPdOyT6p5%2FBoZbRmI38hScSz6gwbJyvcvqJfbKQqWWxLaudUVVoaEscNzBtX4eZDCJ0B%2BMDUALJovGzgxiUwuEzYPB5JFhtHw78qiwu7g7oiheywVmHiFKWzReVeY&X-Amz-Signature=0d2ff9d511e6cacebe5a310d228967e74c467dc3592560215db4e692bed1d90c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663EPBWR5C%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T152834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIB96LIkeY%2BvM4y%2Fzy9slMZsIyz%2BWO%2Fg3roapqX5dwBGVAiEAtVp%2Bwk5KUSR6hWZRGgEgZaWLfL1MCz8yZCDA6dHCplgq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDOOT%2FOCLUIfbv5lveyrcAxSyQdJwvayqsFdvTY3d1nMqtiOjoH0T27hMaTb2cFzYQqTx9zA83qasy1BfPOO6r8syy%2BWOI1Kkr8dUdzCwToNmH9KJyt3uTboUmfb06hQyDNOrAY24uETA5Hr3FcWiBjV%2BlXun%2FtuXyqtDwQRX6i8UZwxrcy2ZwHwCGdtIOf93p3hFiLNnsJegM%2BI5yry%2BU57c8aSgi59NyQI60U6eKEYSseefX4YO33%2FT3fkV8I7S0Rm6CUPHVp77ZVHbf5T9SWMgcdMNXgUe3px0qGJnCJ%2FY9dY5651GdnwsFqnzExM8IyihZIS2WbPQZYLG3r%2Bjc2WY%2BS1xeZ5jFoIrFui8hbm7g%2FYCsA%2BnKi6YkB6V3iSUdoOcbxNimVY1McNUDe5yrza06M3Q8QD9IfZtUIC2iZ33q1s4WEEF4Ytxuwpf1KBUKAEyt84mpuT%2FP2qrjiCm%2BMAoYc6cUBjncLPPOHkWNBsnjpoEZkzV3xxPoHtbS%2B38zwSHV1wjFhp21qfMlItO8uKQwLu%2BLbXI0h3YNK7Z84pNP0sLwKn0yoNsWmc97Sj1A%2FTzasVKtszYUYAMyzvnFKCTeHMfsG6Ym0z9Hd418iojepgtuK3vIWvpqDli4yPJE7EK7GH7VtkTMn1kMNvokswGOqUBnYQS5YC2PwNiqZtjIQi4exT69PmYJaqU4tiwBc5tns9CiShGm0pMjtymiO7mlRIARbLdesgcF8uuQT6Ie53MalnsZpj5aT7s6DWirilypkj4Z6R06w%2BYWF6oNvpPCV57w9HHMMr9NzduEYE6K3spOFDIdUBXoFuF%2FjiLsHczfo%2F52nDRgBEZjkjUCyvKr9J1oQsh4dQPpKVka%2FNsbyjkZMEFJ7aZ&X-Amz-Signature=a603cd6da13fbdfb6c0fc57eb87dc0f65f21f2eb411e68509fe5027f230b1f48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXC55SAA%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T152855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIB4pxCrriI0kq37BLmrwccbjaQMX0c1ICLEN7kEHBx0QAiEApXSHvv1ncrjPmc9Q1wCO6Mon9k2sjz6dolhhf%2FUPE7Yq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDKdFzi1Xsp%2FwyrxkZyrcA%2BJmCJe%2BK6F5UaOt%2Bbxv7N6riM%2FccKEVfgr4FtnQyWmvkKHWT5bHHKaq2kU9dt9RFniM7MFaEDo1gWTOzeIx0%2B0T6rCc5cqk9VlqwXrcgYZIvufDT8xVnPhN9pnPoYpCogmw26cpJtr%2BSNm9PLYdhS2RnaBKRfA7yHgLNH4vzCNTyOIFKXWfPNWo%2Bn%2FwzeAfbsPJgquVFjMjTv85XQGhIocfUipHfJ9jcxJ5qJNEAIxjGmwu9MsnYwZu95G9Nd%2FQFaFrMGz7bjVDXhb3lHILNTqglNRBclCyJYPm2%2BjPxgFu1sYO1VOHRSVlO6Gl%2BKSGsgR57pamzx%2F64Zr4vLxjivfxLCB082dk1r5QmFX0eVgRfYsA1e6yGFLF8k8bGJYhx4xklbEv3EH0pL3RNQcEmqqASwDTivmzYD7Zqo4k0uZeqM5d3GV%2BDYWX0Wt0ACSujUTNnvWp75soOgOvXqSrp36cjxnJ9mFzqHrQblvN%2FVfCJTLUvcwLPGCAxHf76M0ngrgTyZ23BM5LgZdohhVrXNODJTqioojTv4x2x0ARpxGFvwoFbXmk0VeyNRaqXj8kJZnwqD%2B6OisKyNK0PYheFiDZeW2CjyqS8rnvqaqNxOW8enwevKEKfxx2fwLPMMfnkswGOqUBuwvsKuhe3MtO4Q%2BxMH9eHa3fF7eU%2BitPMDn1SLCJMI1Bwe76kd5S4U6AZJO%2BvyrdQCv3FEIsKi6Rz6pjFRkkIMOpR6htlVg7H5cQTucKtlLtpkkrXXOyid%2F3xW6CHva0%2Fcd0PmZfUIsyqgv3yeft8XYGK7lYXewGvkgcpuFdD6dOQ3%2B%2Bmq0063sa5yhaC8%2B8mV6raobUey%2BUbxjjEmZL326fHhxo&X-Amz-Signature=154b0c597f7346eb6d14423a0263d87bf059a7ca34b652cb7fc3ac29c6cf101b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXC55SAA%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T152855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIB4pxCrriI0kq37BLmrwccbjaQMX0c1ICLEN7kEHBx0QAiEApXSHvv1ncrjPmc9Q1wCO6Mon9k2sjz6dolhhf%2FUPE7Yq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDKdFzi1Xsp%2FwyrxkZyrcA%2BJmCJe%2BK6F5UaOt%2Bbxv7N6riM%2FccKEVfgr4FtnQyWmvkKHWT5bHHKaq2kU9dt9RFniM7MFaEDo1gWTOzeIx0%2B0T6rCc5cqk9VlqwXrcgYZIvufDT8xVnPhN9pnPoYpCogmw26cpJtr%2BSNm9PLYdhS2RnaBKRfA7yHgLNH4vzCNTyOIFKXWfPNWo%2Bn%2FwzeAfbsPJgquVFjMjTv85XQGhIocfUipHfJ9jcxJ5qJNEAIxjGmwu9MsnYwZu95G9Nd%2FQFaFrMGz7bjVDXhb3lHILNTqglNRBclCyJYPm2%2BjPxgFu1sYO1VOHRSVlO6Gl%2BKSGsgR57pamzx%2F64Zr4vLxjivfxLCB082dk1r5QmFX0eVgRfYsA1e6yGFLF8k8bGJYhx4xklbEv3EH0pL3RNQcEmqqASwDTivmzYD7Zqo4k0uZeqM5d3GV%2BDYWX0Wt0ACSujUTNnvWp75soOgOvXqSrp36cjxnJ9mFzqHrQblvN%2FVfCJTLUvcwLPGCAxHf76M0ngrgTyZ23BM5LgZdohhVrXNODJTqioojTv4x2x0ARpxGFvwoFbXmk0VeyNRaqXj8kJZnwqD%2B6OisKyNK0PYheFiDZeW2CjyqS8rnvqaqNxOW8enwevKEKfxx2fwLPMMfnkswGOqUBuwvsKuhe3MtO4Q%2BxMH9eHa3fF7eU%2BitPMDn1SLCJMI1Bwe76kd5S4U6AZJO%2BvyrdQCv3FEIsKi6Rz6pjFRkkIMOpR6htlVg7H5cQTucKtlLtpkkrXXOyid%2F3xW6CHva0%2Fcd0PmZfUIsyqgv3yeft8XYGK7lYXewGvkgcpuFdD6dOQ3%2B%2Bmq0063sa5yhaC8%2B8mV6raobUey%2BUbxjjEmZL326fHhxo&X-Amz-Signature=154b0c597f7346eb6d14423a0263d87bf059a7ca34b652cb7fc3ac29c6cf101b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQIA2F6N%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T152855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQCoX9ItdfS%2FtGeQm%2FvpnPxNI8eguWcTxbhYM2IuineN6gIgFA3zHFDRqt0jdAnqgVriXZjeXG4jeL%2BUvvx1GQgr0Ykq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDIFnjnlLycM42nGX%2FyrcAywEgIArPxXZe2%2B8SR6%2F3ePxzegYfmKssbZRpGvgUBeKWjxStJfsUL8RfQuoyootzrDVlGT75BTgYS6CwFeLrus6zxuh7LGqM3IT%2Fu8RSHQX%2FM5xOhDUWKDT5E4DaWQI2MdHDRmUK%2FYuSVHNLJQvS7hLXy%2BjNymJm8eFOYQf2eh8B%2F7QTsq5NMs8gjWDp12wlovX1T4iSJuZuKfCOVVTcGycHJWkDT5oR68OoTkdrPyOBv8r6whjBTkN%2FXm0LMbYJEk9OpT2kCi6tMzlcR1Fksh1oKmQoAH%2Bzw6ESQ%2Fb%2BgH9hGpUjuSzVVOgG1%2BiksD0qhxnxlUWP3jlY3kYWqCqi9Ln7tlGnWoYtJEK%2BzQfbAJTHBIYSDuZUx94zYnz8ZfylzfQuwfuTkxtiiQ%2F4R0UgL%2BQTHbERc%2BsYJdmAm73mWXUJ0Mys1w8iomLVqS995W2yQEbUB17zlKPBSRbL7zIv%2Fu0PvRfWzd8zjQxdJ%2F7tWdyWgFYUVig6E5D5shG4fWV%2BJ2RFUWicgWDmEemw5wfveLqHtaNSZGEKSty5pOyTD6SBX7JTUlisltCx%2Fg%2FvkJO64yP7VyXoo1prUb8%2BGxmybixt1W9ve7TR%2BGbDZOdBe3x7hChgT5loeSvxwO9MOnokswGOqUBV7GUB80OQur4P9Smr2pmyh0Xw7qA8WiU8LthLLJ4wbdgfRC6AeVgZdGEMLgcYcyZJdfDC3iHmV53%2F5%2BRoH7aylEn%2FchOWufTeMpRwKbOyzHxAKhcEy2cjAe6Gk9ol4lrscJcIMCIyJCBbg9F8DIb0k0WGzvAY1Rcy%2BgUyJSaVbJPNprINxsqROiij5CXJdyhopDBHN5%2B%2BuC%2BouiNNADOcBWTzwOP&X-Amz-Signature=56eb25c0eb6f2b432915cd2999cbaec9269edd4cb3dadf6a3e8018fd025afbcc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

