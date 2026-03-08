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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYE7OAWG%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T200056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCtI779Q53hGqzSl8SjN4OZXjGz47jbeCGQJqxRTf5vSgIgQl9jixZXqpkNw49ERldY7c39Zx4tRYQ%2Begh%2BfIMzZlIq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDOGQ4O6A8glqNBMpbCrcA6TmYp081h5fzkokrTm%2BOVhOrQbsvSt1V114Qr9SU1T07c%2FB0P2sMh2h1NL7tLHUWh7TI27N%2FE%2BeU9utkTAJk25OmMtJaMFqYlfcqQyF5f%2BSJEXliu0bb31zZ0R5Eb9K4PrZoGUpGCr8nZR5edEvfg1oYteYFvdJ4MRe7il5yYTH6XMxA8EuoB2m2y%2BgKNNZIxXP6Ld%2F67ywwiqYx4nePvxJDaovoaLsLpjEskwzru5vzetLnZLF32SxOCGIypbeT6vS9vrlxSIT%2Fdkcf0BjCgOgS1zH2qjhRHGQpUjbPJ51hAnl7Z%2BDaMuVb1VhHB1sgJkjOSg9z7WmOLyyBNU6tVQsQYFEgoJaTni23lC5gFckC2ATU2nw33PpdPRrE4X8CN0z9%2BldV8oDZc8uch1YA2XaPT50VTzfv6QKBad8zJXVmsYgeKnq%2BTqsEh7XKFNXxqj00hnXDOKX6f07vgJpJINUXVF6yjSqSS0S%2BYznJivFzm7CB8%2BFMCjjiovF9%2BH%2BuGCjGDFbRqkuOGpUqdG8m1jyw03oq7UC2E6qBV2cKpc7727H2%2FHTDnfSxZZncxo6hgVd2mDvuU9QgMam7UqWKXI9IIVjoMWw4Q10enzBUS27hsQj45vyu6DOI6AwMIXIts0GOqUBNd%2BHmgnOoxtNSnAkwmpAdyqZR7qOx4Qg88M0rW4uGtB6EShYNnRvx6I25G5%2BysHkc7M5gulhBtv%2Bqkbdsy%2FmSWlGN9ca2lCmNV6rtKTPc4LJHBHM9TP6x%2FAafB7Yb2Wt2VfTu94%2FMm1%2B09vl4ue%2Flj0bJp1Bj1KJVY%2FY4zEcdKMImZ6yHKnNnQReGYyoN99pbGGRKTJAk%2FbZOd%2FJMz0sXy2oO3B6&X-Amz-Signature=b5a36b0d6e7b7e1e9077d4b902201553a3c6f1c10b47a63caa81a7a2dbc192a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYE7OAWG%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T200056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCtI779Q53hGqzSl8SjN4OZXjGz47jbeCGQJqxRTf5vSgIgQl9jixZXqpkNw49ERldY7c39Zx4tRYQ%2Begh%2BfIMzZlIq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDOGQ4O6A8glqNBMpbCrcA6TmYp081h5fzkokrTm%2BOVhOrQbsvSt1V114Qr9SU1T07c%2FB0P2sMh2h1NL7tLHUWh7TI27N%2FE%2BeU9utkTAJk25OmMtJaMFqYlfcqQyF5f%2BSJEXliu0bb31zZ0R5Eb9K4PrZoGUpGCr8nZR5edEvfg1oYteYFvdJ4MRe7il5yYTH6XMxA8EuoB2m2y%2BgKNNZIxXP6Ld%2F67ywwiqYx4nePvxJDaovoaLsLpjEskwzru5vzetLnZLF32SxOCGIypbeT6vS9vrlxSIT%2Fdkcf0BjCgOgS1zH2qjhRHGQpUjbPJ51hAnl7Z%2BDaMuVb1VhHB1sgJkjOSg9z7WmOLyyBNU6tVQsQYFEgoJaTni23lC5gFckC2ATU2nw33PpdPRrE4X8CN0z9%2BldV8oDZc8uch1YA2XaPT50VTzfv6QKBad8zJXVmsYgeKnq%2BTqsEh7XKFNXxqj00hnXDOKX6f07vgJpJINUXVF6yjSqSS0S%2BYznJivFzm7CB8%2BFMCjjiovF9%2BH%2BuGCjGDFbRqkuOGpUqdG8m1jyw03oq7UC2E6qBV2cKpc7727H2%2FHTDnfSxZZncxo6hgVd2mDvuU9QgMam7UqWKXI9IIVjoMWw4Q10enzBUS27hsQj45vyu6DOI6AwMIXIts0GOqUBNd%2BHmgnOoxtNSnAkwmpAdyqZR7qOx4Qg88M0rW4uGtB6EShYNnRvx6I25G5%2BysHkc7M5gulhBtv%2Bqkbdsy%2FmSWlGN9ca2lCmNV6rtKTPc4LJHBHM9TP6x%2FAafB7Yb2Wt2VfTu94%2FMm1%2B09vl4ue%2Flj0bJp1Bj1KJVY%2FY4zEcdKMImZ6yHKnNnQReGYyoN99pbGGRKTJAk%2FbZOd%2FJMz0sXy2oO3B6&X-Amz-Signature=b5a36b0d6e7b7e1e9077d4b902201553a3c6f1c10b47a63caa81a7a2dbc192a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYLVCYM7%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T200056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQC%2BUM4zVRmP5HWTp6n79CP%2BPK8Nf2eJHk6qpx35opXboAIhAJDBnNiZRNK0GLGFelOxjQH98JBhZq2nawMDikcz0afpKv8DCBoQABoMNjM3NDIzMTgzODA1IgxPT2OZ1%2BV%2BgfJW2xQq3AMCxVB2mTLG%2BwexyDALi5B8CkjnhDKLFqTlFV1%2BIu7QTDaK672wiIV%2B17FRuernOqXQN5Zz5bmkkzJNZmJyXM72pc18QoFn8szbFiRdqCdGwx2odGrGun7OQBJD86v3dZWuAIvYHwTvHaysUdwi2Cefc0HoTDA1twkL8YgDjIIS%2FNaZ0hHMicDhz9cZC23gn7YTvRTxtNpCGroVfsM6ghvl69luQIw81q%2FoINItOB5NIeHg0u0YSzZm16a8tquMdgHNHCYtnQ3itC3AMOT23Lk99qagHKiIsBjdcmrhLPIop8MEmMjwEiVR2mkoWw36XVoi9ZJuQxrIkrr1R8mU2Nr2sa8TJpamzuUVLDv84SbQgEZ%2B%2F3bOliXJSqEOhmPWkzdOtY5hbjWgIozGhb1u88guf2FCC%2F4FVmkileQRI6l6hw%2BVxIirEy7qPJAZ6Q1yl3OUlADPh57uOVI%2BfwlG7hnQN4SA%2F%2F%2Ff1SIp5mpDRSnGWlmzIB9P41T3eaOcAjSq7kwY7oHW4pAEBkH%2FuoaqqMJXc4s6%2FviqiyO3tk6ho%2FyxO0grl0lsgw9jlZlE2DFdkn0l%2Bx%2BlKA%2FH1xab975ZIK4pxi84J%2FLFOKBKTn%2BpJaWItkv%2BQOQ%2FhWxDrfWJ6jCd3LbNBjqkATPIlD%2FUx6ThL9b6gQgwLtyMyYecmN0F5XIhu04WuAcXKGObmiFvWAFwyP%2B51mgdqWE1mw4WZJzcJWSczCVxp%2FifN0T7nMqr%2FxnLLRQIVDr%2FTzMkBdfdlFeKfM1vPCqsdqQgkprntJc5ldKth%2FzTK0RzqvTao5DWytgjxU1Ce9BIl1KEAodmfLkpsfzomCNbxU%2BGE%2BJWtQ9XXplPz6XdtDwJ7ISM&X-Amz-Signature=fc55f340c9d031546ca41657c163e69d144a73534cacde3b49f23c1e483c1a9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RX3XO7MZ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T200058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCqA13kvuHXE1EaeVlo66B7sefFTLRgEA7dMTYtZoNeYgIhAL03ZgfcThwCdjvHm%2F5Mfy6nSk7QgvfbJEclHQJiJB38Kv8DCBoQABoMNjM3NDIzMTgzODA1Igx1NtAIVuZyJ%2BwV8mwq3APpXgyRn6mTNpiRbbvBg4VMAMLrbhqglPrOZ6e6OYzZ9WZLYFeM9eTVh5pRvKZApkRabxl%2B76lYSeXcL3iB87BuMuj%2BLpuQz3EUNWKIc3VYxBFA2IOmV6HDaUSFVkBngxz0PE1QJpWt16wU5NoQlxL9Abv8q7xKReC1Y5aaXjHJJhkTg2xOnDXZhGB26ylIvEcHa%2Boa5eZ4zRHiI5XHr0Hw0P1C0Fm%2F0sjb4Fz5ZjXDSAMZFAjWwnuhfJnM11PesdOX6xD6cockj8ynIwLpl5pNFLTz6kntFAE%2FD1l4WQlJqKz8JNiFzkj%2BYcwAulKwAbectQ0TAgXuBdD7u1F9s3YY81Ly7tsTiINVH%2FCRAW2WK%2BaDF7%2FR2YqmlwitzGbZ4F9YQyX2m8ybg3eWc9ncBW5hMUu4t9kXLyFfHoRnI3aYN%2FNin%2FFIqtKQkgCM%2FymzTjrwPYmEwshtfcafrdoaXq8OYvZeO68EFdVVHiF8sk%2BzjmctMU97XlHVsyxfOnUEbwYuGfrrYdnY1%2FlQWgj9Gz4E8jIEA8kRdSs38yG5MY%2FXB%2FV8BQIYchNzSUDfIR30G6%2Br1WlRM6%2BusrugQ4990UBgZBcYEqXbCvbv6f6ApHOWoWpNIDZrkQ7l9mQHozDExbbNBjqkAdg4RIfOxcjzhnogt3xSMQUklh%2FTEGgvf8NocmguuiC0Fitwu%2FB1g8dpWuP6E%2BXn6UbGxpWKEP%2F6qCFlcI2%2BxKsbWcCYrxERoRqBdVFBp4atM1he7DIBsG8MHau01E9U92XIyXghFw4dR%2F8AvGbGa3TX1GoeQCgoqqRf2jSTXHc4TUIVZy%2BJ9C8%2F5K7OrN%2BBG0KQLk5SI%2BW%2Fn5%2BAX3LYk%2BGk6Ap%2B&X-Amz-Signature=c5f6aaf439ffb9405ddb97be60049820ee303895fad5124810f0bad74468c67f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RX3XO7MZ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T200058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCqA13kvuHXE1EaeVlo66B7sefFTLRgEA7dMTYtZoNeYgIhAL03ZgfcThwCdjvHm%2F5Mfy6nSk7QgvfbJEclHQJiJB38Kv8DCBoQABoMNjM3NDIzMTgzODA1Igx1NtAIVuZyJ%2BwV8mwq3APpXgyRn6mTNpiRbbvBg4VMAMLrbhqglPrOZ6e6OYzZ9WZLYFeM9eTVh5pRvKZApkRabxl%2B76lYSeXcL3iB87BuMuj%2BLpuQz3EUNWKIc3VYxBFA2IOmV6HDaUSFVkBngxz0PE1QJpWt16wU5NoQlxL9Abv8q7xKReC1Y5aaXjHJJhkTg2xOnDXZhGB26ylIvEcHa%2Boa5eZ4zRHiI5XHr0Hw0P1C0Fm%2F0sjb4Fz5ZjXDSAMZFAjWwnuhfJnM11PesdOX6xD6cockj8ynIwLpl5pNFLTz6kntFAE%2FD1l4WQlJqKz8JNiFzkj%2BYcwAulKwAbectQ0TAgXuBdD7u1F9s3YY81Ly7tsTiINVH%2FCRAW2WK%2BaDF7%2FR2YqmlwitzGbZ4F9YQyX2m8ybg3eWc9ncBW5hMUu4t9kXLyFfHoRnI3aYN%2FNin%2FFIqtKQkgCM%2FymzTjrwPYmEwshtfcafrdoaXq8OYvZeO68EFdVVHiF8sk%2BzjmctMU97XlHVsyxfOnUEbwYuGfrrYdnY1%2FlQWgj9Gz4E8jIEA8kRdSs38yG5MY%2FXB%2FV8BQIYchNzSUDfIR30G6%2Br1WlRM6%2BusrugQ4990UBgZBcYEqXbCvbv6f6ApHOWoWpNIDZrkQ7l9mQHozDExbbNBjqkAdg4RIfOxcjzhnogt3xSMQUklh%2FTEGgvf8NocmguuiC0Fitwu%2FB1g8dpWuP6E%2BXn6UbGxpWKEP%2F6qCFlcI2%2BxKsbWcCYrxERoRqBdVFBp4atM1he7DIBsG8MHau01E9U92XIyXghFw4dR%2F8AvGbGa3TX1GoeQCgoqqRf2jSTXHc4TUIVZy%2BJ9C8%2F5K7OrN%2BBG0KQLk5SI%2BW%2Fn5%2BAX3LYk%2BGk6Ap%2B&X-Amz-Signature=2114eeb81d7838074f97f1bdaab1ba2094556a39953aadb534f7c98d48985864&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466REDYNMA2%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T200059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIHspnlA2oKi162jFks0W9DgHeqa9GnzsgysGnqJc2hSXAiBqfVAAiEfPOdYiCmu0fpTvtYobtvPuRobGuiuBYsJW7Cr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMYlGFpxJ%2FbRqT1byiKtwDUxoFCFZj4J%2BSe4%2BTo6uDZTXd4WzP5OeqH0eZAlGuddy83%2FJyeDocPrHMdokKu9yoF%2BQsBOXpuWH2cVxyhrOK1i0nyZHG8kypZD7DpMvuTVYe0ZeTjug5i25s1%2Bj%2B8oV9Y8zqwD0HyRlIlJLbZyQEy%2BUH1EtUxTsRk5Ww5t4yDAQeKa%2BUij62nQNkkTZn6eXStpx3KsPjPRYIuxUY724O5w1PZ3EF5cN%2B3K0qRrRheeKUCyfAnsURnXcy%2FHTKCUsA7H0EzhNGgwFHeuRx0rragS7RSIaSghWvItVjinMdh1qA0%2FUbR5C%2BGqx8UU8I9XjXS08W4FEBhYGUS1OClnIU2zfoab2X6Iun%2BhUeB2DQRJtDUubMOxZDP2FFbbneowqDmU%2FaeAo5ayboSPlWTwFh0Jr5LhXqhBr6xBW5tuAbQ%2BB23LImm8XfIpxcVEmf8JCh6X2YorSFY033BM9UgO%2Fw2wN5%2FFFqplAr5J3Rj%2F8%2BmqMLfRgz4Qq%2FczAXSJxmq84gcU3rCJMWmu4qzNEU6fvyRBhg2kfEtsvq0nyeTSCMIp8S4nW1pLfDxxrEuna5LKqoYlE6outNSbEfSS4s2MPkMZEK4envVz0irqJo4fYcnzgCoJ9sWTSB31akguAwpYy3zQY6pgHgTCw85YPj0r4htESNy22PcVMsNKuJG3S8o64LS1jqZpOcJCughYQhqeZH2%2FNG%2BNsNvre8cDCjw%2Bmh3Knv%2Fs7%2BRqHTsZjIbl9E1%2BfJOkH9%2FiD31BvSsqaC%2FwK8jsJjgQPtUchnIyEVaahFoyOlgL4tyxnICh0tFjKGDSJJxE5x0RrIK4EQSMOevUs6uGEGUOo9hkacpmB0pEnxWo7mzEYaB7uJ1BBL&X-Amz-Signature=0a6f7239c71c475998e2455ec032e442a687f0fcd46306c08f2cd5db189ee56d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TBZGDUJ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T200100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIC743rcAU923ZfTS27nSC2IAulIAUIi1BDNy3IMOsbcEAiBPlR0G%2FwVQSFQ%2Bvexmg2AKzfDgvgkxuiTls8GSryGBWir%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMEZ1%2FjgZm3CPNQ7VDKtwDZPEmzEG0ZMLy49XPKdh5%2FuOF%2Brh5zE34lcKf3c%2BE2bGnaMuLuJGtwJCkGq4zoxbVV6Qh4HoiRMe%2Fy8FET0iQnZT4MZHdWzoJJj%2F3qOsPHaZT9gUxPkSoG8n4WEVMHrYHia7FQtDXhVsrl2X5xrXH8aCl%2FrCoJD%2F2wZN%2F%2BoRi2Ug5479DJsSNZ1yVu%2BpmD52QQEGVtw1XDVEn%2BBPeAV5COoMDLrFajgRAHYO1Y9TGPSLUUlr6A%2FtiY9ege1yAUV%2BQdGODXwdanGmBF9hPA5qscD5%2BbQvjAki1SJeGBJZq8z8h47%2FbqI5SZ0ymqAUHSDuXcMvyhhh4iVVfWzhSNF5Tx4a989zrNY7rfzWJWpbkfzjA1Zlq9vNI6I0g1ZyJBFRrfFW6SJBL76ED6t6Qb7yyOZmyQvki%2BPlEj4AYKcyM5GiWlVWil7VJZSGgTB%2F7D4JP51WGhsxlFLmAuV%2Fuqx2mEZHIEIG1smwFreuQYquhYZLwSUOMACHJH%2BilUtWa4rZRdU5S0g48T7wRxtODXvd4BEU%2F8nKmaO3pV%2BPUCSx33jv2rUBsA%2FcZu3%2FYDinsgeouBNQn%2FU44NqwFY3PcVmJZoJG1OJ7%2B0paYlz1XJnAK6spQKkFAEbHLEY0Ve3kwlOG2zQY6pgHG9j1sZ62BBssAL2rTo5U5uEXeeffuSFq2ypBvNN1RQMG3oCTTjxjFnlUyrgdCVuSlA9PvuYz9Zs16JgOqf3GSOI9oS9BoBtG3SvOodmxJ%2BlcDCdHgvtA9Eav90yIIkpxO4ww%2B1q9NNCCzUcnjLDBCcG8PrChDLQjOpaUa4uwAIGOiwVbkLdnP7BvlkNfsP9sZP7ZRZcpZKaxWbzrSpAPbrVAQfpt2&X-Amz-Signature=583e7eed28c69da098b50cd37609286082b14eb1fbc7e79d8e136bf3ffdc1b5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466634UM3BE%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T200101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIBs2T3k08kXNl%2F3TWa1uJ9R4ePj3YKWgC5jHe75k7MfiAiAUzpSTCii5EoBrbB8uDrAP65k8xdBfjECzG62MzqK%2BRCr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMkb6XA1opYcI5Viy4KtwDCrfoxl9RNd%2FbwFRn2oIjeXOwudYt%2F3QLu1Qqlk1TNlJfgDIz6oIb5%2FmsHnS6NXZ5x%2FcJTBAOzpxdTW6RxHoJ8iYNNvE6Omqt1Mao2mJBrvo1mg1lZAWCuuhMO%2BUJaeAg5udiET%2FLwi0z5wSfkanVHkECF6L7fVsHIq3wyq9TifTFTkNorkUGukEEVB7JbFGPqmeMYdSUgLTQpCGa8aNikBC1kYF%2BtpHcqS8TTTSXvpALDfKToHMdksjdgI7sX68G%2BsngfivHQ9UM6yDqyYqSrKTdsiwBeD0lP%2BOWLzs7CDu4N1vXMKvfJpfE%2FBouPzCqO2VS6f%2B0j9LJsVJYC1nRderDSBE6MDOW76Rm1pvOBsWOvVNGZStCVStn0eXJZBo2DFYwyg%2FOqbkt0ofHsqs9NQVTDJTNW0VV4Pf2YY6cweU82uqLzsiy4ZHA0cMPxkm4Z3JStyWju1gLMDmsW1KNNLwd8Lio78RpRIHiBUnL5sw5Y8lOlZXgpPeSCvmtZ4GjEfVSLlWW8Rx5z5hCG7X5kAPSIot6MlVohwfDDspLh9maY9w9XKsoNYdToyLPza64bV32%2B8KUFEp%2B%2F9GX%2FaMmAMiopKGSNT46GunWIKtnuGy8zkPV3oah426HH1wwodi2zQY6pgEnGOQA%2FmPRByfnGogUKVX0m0rIO1e%2B5pQ6oK2qj3BVDe9ra6Zu2eUx3MwUv5V3PdPG2e5D4m88iekuHQmtXXLesx6JS4ZAjL6paofXdthW3TkXbZ3TGc6qlVlgr4BHB%2Bd1MObSaoc083WPUgyRIOoljkqKEVIgrDXNNAwXQ2YRDECrcKvlfCEJLG%2Bp7REyuVZQnWlVwQxZat8kXuxSswX46Zn05YSt&X-Amz-Signature=c96df99f19569ad4591634d8cf1ba983d0aef3242138c6e99c6b76a963378d8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CSC4O3N%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T200104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIAK17XUUvIvrFNLGDRMoRXQltz7Dn2mgon85nS%2FynGE6AiEAxaok1rNqNyQCL%2BvssKTmqFWw3GWm%2F3yAAuIPEg3Fq5wq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDFjSGcpPDqGzjbLw%2BCrcA3pfWpyp%2FDiN0uhvCtBabIefqe4qS9lgEzLGTf2ElwD4xdodfqSsnGVRLLphL70NiGaKQAxoMcvjCkgxHMwHlLqbcdIbQ3ihhGGKU%2BdmX8HSYTdHox4k7NnPws8uE7%2FBsJG2w4Sixxx9nbAS5fW9beIGaS0tFYf2lZ62D4SxAMjUEgGBVia5JXPWAT6qMLDHKEXtM3Ht7M7HSPdzx2ryZnW63McraFAmbSFmd%2FJxNAJ4%2BU2IK%2BSBwWKpqdB0VJlmZNDqcGWuFkVgWWnYGU2APeuH357NA4pYFnsefYI3oewtCbAJvOcKInh7%2F7pFS6OUrjyda2aa0aFi074z3LzB8O3OqMWN0EJTm6mAXTz6EuYfgW%2BOBt9lcfzB3UdqwoW3KYxmzVb759EdV1J5cjQo5b9Mc3VpozH365fAlHaBfjtOamS%2BYrIe96wqQjAAlYcgNGt%2FUAgGpB9zeUNsJM2LikhT1TsayYhgWJbmxLd35kBTjiQuUAQIv2Jvi5I2lW5y0M2ZN0LA0FkelM13VCmqgEMsMXsMu10qHF3VOBxLh86hGB%2BcxyQLACq6bvNdArhRx3mew1ufQlZF2T0fMWP%2F%2FMh4NjfJO8CQ1RWfQzBsXhf1C5BoDMb%2BfVfEy0UoMK%2BTts0GOqUBdQY5kS4aR4tZmcl0PbGDAjw6AMkBCsyRX71Aeujrl7vYjkbCVf7MeAvtbi3S4%2FZTl9da4R%2FJ2T04xQgOL7mAl8yj62N2jvXokYvloUzDMZ%2BeqdrLLeuuxOJo9Kwqzrg7lpPEnruntebgx79jq40oY3qvI7P7arqLScisPKZtmizmXjqjcTIyM6p6kS79PBC8ZEKh5RoZ%2B1wdf4P%2Bb773znudjVGR&X-Amz-Signature=2dca304e89b74452a3ba2bc2134060182d8a58563cf2230c631a3b8f024f2e05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CSC4O3N%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T200104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIAK17XUUvIvrFNLGDRMoRXQltz7Dn2mgon85nS%2FynGE6AiEAxaok1rNqNyQCL%2BvssKTmqFWw3GWm%2F3yAAuIPEg3Fq5wq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDFjSGcpPDqGzjbLw%2BCrcA3pfWpyp%2FDiN0uhvCtBabIefqe4qS9lgEzLGTf2ElwD4xdodfqSsnGVRLLphL70NiGaKQAxoMcvjCkgxHMwHlLqbcdIbQ3ihhGGKU%2BdmX8HSYTdHox4k7NnPws8uE7%2FBsJG2w4Sixxx9nbAS5fW9beIGaS0tFYf2lZ62D4SxAMjUEgGBVia5JXPWAT6qMLDHKEXtM3Ht7M7HSPdzx2ryZnW63McraFAmbSFmd%2FJxNAJ4%2BU2IK%2BSBwWKpqdB0VJlmZNDqcGWuFkVgWWnYGU2APeuH357NA4pYFnsefYI3oewtCbAJvOcKInh7%2F7pFS6OUrjyda2aa0aFi074z3LzB8O3OqMWN0EJTm6mAXTz6EuYfgW%2BOBt9lcfzB3UdqwoW3KYxmzVb759EdV1J5cjQo5b9Mc3VpozH365fAlHaBfjtOamS%2BYrIe96wqQjAAlYcgNGt%2FUAgGpB9zeUNsJM2LikhT1TsayYhgWJbmxLd35kBTjiQuUAQIv2Jvi5I2lW5y0M2ZN0LA0FkelM13VCmqgEMsMXsMu10qHF3VOBxLh86hGB%2BcxyQLACq6bvNdArhRx3mew1ufQlZF2T0fMWP%2F%2FMh4NjfJO8CQ1RWfQzBsXhf1C5BoDMb%2BfVfEy0UoMK%2BTts0GOqUBdQY5kS4aR4tZmcl0PbGDAjw6AMkBCsyRX71Aeujrl7vYjkbCVf7MeAvtbi3S4%2FZTl9da4R%2FJ2T04xQgOL7mAl8yj62N2jvXokYvloUzDMZ%2BeqdrLLeuuxOJo9Kwqzrg7lpPEnruntebgx79jq40oY3qvI7P7arqLScisPKZtmizmXjqjcTIyM6p6kS79PBC8ZEKh5RoZ%2B1wdf4P%2Bb773znudjVGR&X-Amz-Signature=0218a3738afca25376b57741e869cb185a310053e008e0535089e93b59f9ba5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ISR4H3F%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T200053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIBKu5lPpJmzfIWY5GQbZBAaVWFqMZRkHWr9%2BOP%2FaURsZAiEArROxsY2A5oKlYHcmtdjOU6YcLwP2GdJH4lwKsk7FGG4q%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDAjPqoDoPkQRJh6wOircA3rDwSdy02mWO6qzu4rIhnESJhZxRmTltjuyLm8XT0JiIwZ9aNi71nZCdoo67RvIkm5oWtucZc6IboAiyLgNVcgV943nhxf5jlWtRcS3OkTQ3flyIRJ7z8n6M1p%2FIfwmBWEEPQsgTx8jCchZVm9kg8Ptq2E9fs3h%2Bb1EwqzeCrVuUmOTh1t5XXQLa0Sd%2B9KkAq4Xr0qE%2B8QucDFa%2BV4px1Jyhaxy2NNNxghDmYuOPgp6inHbzXQ2rJlrcPyAiC07KL6QL8V0YPZNow8oZBJcRLXObe3FBL7oq8iY%2BIHx78MWrIQBzDzGBTXYxWudWHvyDfmr6lw80dTp6jszs1EuYjwnyGyseqHIR%2FeUYXGWgsTxNwy5m%2FuHQ2gkwTPNdGTGH1%2FBiEK%2FE2y68hkYjhmc%2F60HtzmNm3Y%2F12lsnBQtX7oiN%2Bb10NLn%2BlhAAWxWPZQ59urakx2n5pN4dTYn4KzsNOZmnsnENOd2zbATCUsWfWn4Ncttwklfq%2FS6U2%2Fjon7VTprkseqKSkus0JUW6A0k3mQ%2BFLtiqfAqVWS1QWWW8LH5yc0TIhvlIM0vxYhYN94wHpt6448Paji43j0IVcHCr8BXFuLHAjLZRoZ6RdD%2B2c6w5%2BVWC3FVQ%2BqX51lSMIbEts0GOqUB2ANr9gzZgZeZb7lCTeFfxwQ9vAu6i1Z9SopCzwbgyzpXj8%2BBSKP8UB1cLlCG8FPk04s1cxA90J8YqAXSa99AAxI4Ftkdd1vUkaLeEEVsGo%2Fe0aKqOy3YgppARTfm61pciGctrOMeBP0pCAMPybcZT2dMiy4fyfJAt73G6wZEVTVyIhf5S3h0QrNNETjnLVy8afv1NcdKrt%2Bl3oNLCisM12XgN26T&X-Amz-Signature=d3829ef19fc862491c71cdac8c91ab7bf6508fbc6558b31392a8b4ba305f5283&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LDGEXRR%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T200110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCoQYSS9%2BOYhc5RIDuIfSq%2FzPeIhKMb2ocDGBugbIu7ogIgdmpkSaTyHkfB3wlt1mClz%2Fwr6KffrsUGhdeAmxJtW48q%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDLQ2zvHiMknaJrvJICrcAySK9PRmVa5f2VT0%2FIw1dX2xDKMgP%2FrkhLNLqspYFh2IZeC6MEUDAfDlcpF9X2y95FqkpZ1byDAXF%2BkQJdkEwsKU1VOnQ3%2BnoKec6haQWi8yC62okUhi6zcEc%2FjiiwEtrgltZ1Zzcxj0SuoW4fl4VxEyOJh%2BJgWH8u5UnzH%2FoCmZtoP3NF6alQCMqTjFgUYaiiOLSENl8t2XnUZYZXQ7Z3o%2B8UaVsOTGhfuPOuPCL82R3WwlyRUavG4I4241LrTCLv2b%2FqAyHPON49voA074qZV7%2FdHrzPANxjRUo65rnbl5ATEY13FRwXNEa883iItq%2BJ%2FaEG%2Bz8kqT0%2BxD3AMpw3bKa7blv0v0xMhG5%2FIY1ae8crdCe8p2E4VV0jxW0yiiWNHHTxkkHyPk3xFB8yz45aI0IUurZSsyWT2EQLotg7yyryWhz0rcgwBH8yfhS8o6eo3Ri8G7VbltU2C9%2FevDM9mnJJIWYLcxYkBoRRzhJqgo%2BDfFXpAy%2BCi%2FJ8HQB4Caq2tRTUNGnx1dXjfP40pjMtVCyF4uvh37si96uZFW3b1RrQTPoJZtk1Qxa06hnjTAODH249ORPoBFVLmRuuc%2BblbJFhqx8wf13fPK%2B1zzbYDKBL%2F9ViWqj6J1aSRmMMPEts0GOqUBJGkKbptsematndtMunRvZnOyAO9ikvDfXdZChHIlwjmK99PbCcV4GuyQYGtDb9Pgox43muOXYMZ%2B26meluGGkoklXX41JHRyoxLWYRfGUfuZCzdgUKz743YeF8rrgBpQerA%2FLX6YVx2FyYGZqQwUobXvoXLlSTTnxuwJqPvWRpd%2B2Imrwimyf%2Fva2I9s3twIyZJPI7tbFBBYmLmrBTJ%2F3igy1xKS&X-Amz-Signature=42ad590dd33b29293605499bfbaf6a968916c2ea565184db5bdf20ff3715138d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LDGEXRR%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T200110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCoQYSS9%2BOYhc5RIDuIfSq%2FzPeIhKMb2ocDGBugbIu7ogIgdmpkSaTyHkfB3wlt1mClz%2Fwr6KffrsUGhdeAmxJtW48q%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDLQ2zvHiMknaJrvJICrcAySK9PRmVa5f2VT0%2FIw1dX2xDKMgP%2FrkhLNLqspYFh2IZeC6MEUDAfDlcpF9X2y95FqkpZ1byDAXF%2BkQJdkEwsKU1VOnQ3%2BnoKec6haQWi8yC62okUhi6zcEc%2FjiiwEtrgltZ1Zzcxj0SuoW4fl4VxEyOJh%2BJgWH8u5UnzH%2FoCmZtoP3NF6alQCMqTjFgUYaiiOLSENl8t2XnUZYZXQ7Z3o%2B8UaVsOTGhfuPOuPCL82R3WwlyRUavG4I4241LrTCLv2b%2FqAyHPON49voA074qZV7%2FdHrzPANxjRUo65rnbl5ATEY13FRwXNEa883iItq%2BJ%2FaEG%2Bz8kqT0%2BxD3AMpw3bKa7blv0v0xMhG5%2FIY1ae8crdCe8p2E4VV0jxW0yiiWNHHTxkkHyPk3xFB8yz45aI0IUurZSsyWT2EQLotg7yyryWhz0rcgwBH8yfhS8o6eo3Ri8G7VbltU2C9%2FevDM9mnJJIWYLcxYkBoRRzhJqgo%2BDfFXpAy%2BCi%2FJ8HQB4Caq2tRTUNGnx1dXjfP40pjMtVCyF4uvh37si96uZFW3b1RrQTPoJZtk1Qxa06hnjTAODH249ORPoBFVLmRuuc%2BblbJFhqx8wf13fPK%2B1zzbYDKBL%2F9ViWqj6J1aSRmMMPEts0GOqUBJGkKbptsematndtMunRvZnOyAO9ikvDfXdZChHIlwjmK99PbCcV4GuyQYGtDb9Pgox43muOXYMZ%2B26meluGGkoklXX41JHRyoxLWYRfGUfuZCzdgUKz743YeF8rrgBpQerA%2FLX6YVx2FyYGZqQwUobXvoXLlSTTnxuwJqPvWRpd%2B2Imrwimyf%2Fva2I9s3twIyZJPI7tbFBBYmLmrBTJ%2F3igy1xKS&X-Amz-Signature=42ad590dd33b29293605499bfbaf6a968916c2ea565184db5bdf20ff3715138d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSHR37RE%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T200110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCICNfKHEETscn0lz33ouygTeiR%2FYUb5xPWKd9r8ZBjWelAiBZVDuan%2BkRdrDBV7g43ljWXm9GbG7RCgaTvLw%2F8Ev8NCr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIM8qIg193a4r7ZDUKWKtwDxwKp9wDjYj3EcBuAi2lllIa9JUFEKv%2BOaxa%2FeaaytyF%2FTvc%2BrJzm4NbVOzWArIt1YPkpIGH9eul2Q%2BvSNm3nUlSnYBxu11lW%2Bits3Wlmxxy%2FqIssV%2FVdMvz3%2B2vAwu4KOLaF%2B0if7gi8CpFtecPS9yNDIb4VM97xL%2Bx2u95DkhcyNc3qNez8VRrl%2FkfgHpKg%2BPa2PU074CQnGQRHxWnhuTjKkb9MDnbFI2xlWGksdmrHxJ10m%2FqFqPrd%2FiwS3TrH3hXZxLnFrevKg9EFivlEtqUiRJbOpRYoshuZSX1OnIMAZXQf0UyxSWNmkcQkuJCfmbwk3wMDiEw3QoLpQAxT68yuhf4GaeCvYvepCC%2FADRUlpIrZPsAcTwaRuM6190C%2BwBbmOMf9PjvfWddk21Sg2XZ0MOx30D4sK5E4IAleK8l28zs49kodcRVPQL2JGi3wpu%2F7WlI576pILiR1dmKsGOX52WuFa7vdIs8tsEzs9yMJTzTApsW%2BRSw9swRYLnbbYhQI5rDXDTtEH4C4yu4NLgUhSZmSBjiWwZBCwcjUWdlkrM06zRS8f7fgp5rreUpZKyZ2VYeYd4vTk1GLTOkmFn4jItj3JZ41O%2FOwWM6%2BpeXfMi6J0h2g4DPxyggwwse2zQY6pgEYuak3rU3hicFCvEYC9%2Fs0TPeoF6Up5WcIAwak8VAxziiAt7%2F4bHT5o3QLptUB2pWPqwqZ34zbgCCAXsWG0ZIjVs2q9fzbzKfNmKxoJw8nwVeYofoU7CbMZSJ9jSwxoozNgbjMm1JYPT4Pzu7fKicgvHa5xnwPEx0i0od4JXOYONa1qJ4zSceTMP24xQSZo9VvyDkikze2ADAcqd3qAjWD0%2FaDrJW5&X-Amz-Signature=bb4ea85fb5f1366fe64d60dc0eeb449a347357ae0bc6306c247bb8adda8e9b13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

