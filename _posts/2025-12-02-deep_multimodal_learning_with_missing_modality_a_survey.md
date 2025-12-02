---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QS346ODZ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T180126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIG%2BxN6s1Kbi88UdVyWlap4yhmAqDQau6QgwsuxiTS9ybAiEA%2FMlIyPEIB%2B804Qbg701JJMVtdX0El14Kj7byLfRk6XMq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDObVwmcLWchxYsEtuCrcAz1q0ke03%2F0FcNZ%2BnxIz48e%2FjmeMDh%2FPqOkNSMgLaKp6I4I%2F8TnLCZqbTs9DjJUXKgjf%2BqkUE5%2Fob42n3XnKRUZ7ecRyuI03Y5aELW6TzWVS88Yd4zUnkohUNjPsV4anjDW9nSm9Em2J50emaCEGQVrmOOzK1vNiutSNuRuaUZVoRi0PJDW5OD1zm9IAqKKF4P26H36ug77%2FH6%2FAQIXRaesPDT7jVGRGLpm7sgZdcaYJADHHFmuFraRaX2YOddzZ2vrgifZBclTkz4e1xyN3apL2QghM7kbQB37edMnAgJMBmlK8l8U2OF28ueRtecSjc1RiT617Kk9NIvXZkxmV0sk0W%2BGbNgrKD15s2Na%2FBAQPrWAOSA%2FpdZyfSugJxcGgNsxVKpug1qDTvqsZK9MZ3RzGOnd6SMh9wYYqe7n0VExzFDpr%2F8DBkciPyWuqHIygXcGx9TjOXaT7Iz9LRI%2FlygXh86Fgu7GhxqSmnwhByW04hAJ5l8buA4l37JwsEO496bBUDAICFHRKUGpcN1tN20IClJQEEQvj6FoqQffjrwciXjorZAlwanUSuOqSVbumXPssuJHjfGIfwte1NDzT3aLrSmx9%2FY1Lq9M2gu4VWXTqP24u32mN6HcgNO4dMIfBvMkGOqUBzF1nVo1bLbLEWzpGCbc5jOFmEHImyjKNJpPnb8bbWO%2FmKX0IOzq6QOGZMnadbsi1jsIaDuBjqbO0TyMKd7nR1AxHDlSIQXx5tG1V5NGdSIYP%2FCGcpfl8njtruUT5UZ4bYENEAZv0N84qPUssiZdzQdoofhqC7a1dWQk6mGiVyVblW8ZZl1OF%2BZHwKXdtSmTziKSkZajn%2BZZzCSwPJJb4Ci7LEkSF&X-Amz-Signature=4a93172d9fc519d3c89f87373f1cc95ccafae1b4a8d9e915f3baf8effcefed09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QS346ODZ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T180126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIG%2BxN6s1Kbi88UdVyWlap4yhmAqDQau6QgwsuxiTS9ybAiEA%2FMlIyPEIB%2B804Qbg701JJMVtdX0El14Kj7byLfRk6XMq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDObVwmcLWchxYsEtuCrcAz1q0ke03%2F0FcNZ%2BnxIz48e%2FjmeMDh%2FPqOkNSMgLaKp6I4I%2F8TnLCZqbTs9DjJUXKgjf%2BqkUE5%2Fob42n3XnKRUZ7ecRyuI03Y5aELW6TzWVS88Yd4zUnkohUNjPsV4anjDW9nSm9Em2J50emaCEGQVrmOOzK1vNiutSNuRuaUZVoRi0PJDW5OD1zm9IAqKKF4P26H36ug77%2FH6%2FAQIXRaesPDT7jVGRGLpm7sgZdcaYJADHHFmuFraRaX2YOddzZ2vrgifZBclTkz4e1xyN3apL2QghM7kbQB37edMnAgJMBmlK8l8U2OF28ueRtecSjc1RiT617Kk9NIvXZkxmV0sk0W%2BGbNgrKD15s2Na%2FBAQPrWAOSA%2FpdZyfSugJxcGgNsxVKpug1qDTvqsZK9MZ3RzGOnd6SMh9wYYqe7n0VExzFDpr%2F8DBkciPyWuqHIygXcGx9TjOXaT7Iz9LRI%2FlygXh86Fgu7GhxqSmnwhByW04hAJ5l8buA4l37JwsEO496bBUDAICFHRKUGpcN1tN20IClJQEEQvj6FoqQffjrwciXjorZAlwanUSuOqSVbumXPssuJHjfGIfwte1NDzT3aLrSmx9%2FY1Lq9M2gu4VWXTqP24u32mN6HcgNO4dMIfBvMkGOqUBzF1nVo1bLbLEWzpGCbc5jOFmEHImyjKNJpPnb8bbWO%2FmKX0IOzq6QOGZMnadbsi1jsIaDuBjqbO0TyMKd7nR1AxHDlSIQXx5tG1V5NGdSIYP%2FCGcpfl8njtruUT5UZ4bYENEAZv0N84qPUssiZdzQdoofhqC7a1dWQk6mGiVyVblW8ZZl1OF%2BZHwKXdtSmTziKSkZajn%2BZZzCSwPJJb4Ci7LEkSF&X-Amz-Signature=4a93172d9fc519d3c89f87373f1cc95ccafae1b4a8d9e915f3baf8effcefed09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQKLTAQS%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T180127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIAbgoO7yOi27jdm06Euf3x0KGZ1ajMnxeT%2FENP6FyuSnAiBOHcusl6Btrh6t%2FnBLUMW1C1ovAG93%2FSlPi9f2Bt0QSir%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMJQVzkfSq2T%2B6eic8KtwDchrypX%2B8u8RPF8XzwgJADH%2BdWX%2FxEJF6%2BcLujaV6QlQmI7GNRe9rtY%2FiEhQNGiHd0fEw0JO0b%2B3xw9RsttipW%2FgF5SviDxZEJqt%2B4PyT6z%2F0rVK3uijikbvXNHJRPlGm1tUvQ9Oz%2BIjQMT270xMDyUxoJdRDo7q4%2B%2BwqyzzE1s5wVK2Hu2VIR8lAPwtN6mDnNDXjOEYwS%2BGVQKw2m%2FQXPOw0ivB2JebTST2eb2M64kQDO7%2FLqmhN7n56zMnmaaNWBCRC77%2FAAJ3AeDu4weUwSgkYZlAp2jzgVr8cjlst%2FLro7EHqipMpa1A5iwHxyoheZiVv1eY0kYqFmrpfeb6slE7plGv1b3PXeSHpsy%2FrK6tiQNpx7U6Q9GDdW%2Fc5XD1wW6XKhxAet8Fb7FfHWyugNHAKVJgANNCaVLegN5hGElcLf5M5Y5MFkSPPN5JsFwSwlXT0jNn4K1eAcgxhMgXEiLHrcBFjEdV6htpHPUDr94m1eBzT5XonrEcPMqF8wbEMh4lX00PjOoc5N4rhWZwzOtubr0jL8VJ2FemXUCXa3%2F7M%2B0P0MHlPhMzpSNNUstic1w4eUYZZqV72iUQUNKgFrMGSTC9NBf6B8opyOjdwfMYbCdnK9ucxQANFtCkw9MC8yQY6pgHOZsxEqdtrjTC6XhvxsjZdF2qsGu67y0WLxKxt3G4vzm%2Bc%2FcZv4yiTlTx05j%2BaGp%2FZiKfIMJIPgDiH5iShhHGeHpHZBi3%2FuHztItzBUXon1PuxEYTZHNowTE4lIRjwRRXhUTXathNOT3CeSsBpNEO%2BpqQ9QGWThyTKrzjt9jkmHKlnXhnjWcshEe%2BYpTBgxAAxBl3fgpNQaQ0V38Hn3uFMD4yQLLtR&X-Amz-Signature=c6cf7697868271ba8b96c2042bebf786f8549c01a5e1c6c2daa4dc9e7d3211a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQKLTAQS%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T180127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIAbgoO7yOi27jdm06Euf3x0KGZ1ajMnxeT%2FENP6FyuSnAiBOHcusl6Btrh6t%2FnBLUMW1C1ovAG93%2FSlPi9f2Bt0QSir%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMJQVzkfSq2T%2B6eic8KtwDchrypX%2B8u8RPF8XzwgJADH%2BdWX%2FxEJF6%2BcLujaV6QlQmI7GNRe9rtY%2FiEhQNGiHd0fEw0JO0b%2B3xw9RsttipW%2FgF5SviDxZEJqt%2B4PyT6z%2F0rVK3uijikbvXNHJRPlGm1tUvQ9Oz%2BIjQMT270xMDyUxoJdRDo7q4%2B%2BwqyzzE1s5wVK2Hu2VIR8lAPwtN6mDnNDXjOEYwS%2BGVQKw2m%2FQXPOw0ivB2JebTST2eb2M64kQDO7%2FLqmhN7n56zMnmaaNWBCRC77%2FAAJ3AeDu4weUwSgkYZlAp2jzgVr8cjlst%2FLro7EHqipMpa1A5iwHxyoheZiVv1eY0kYqFmrpfeb6slE7plGv1b3PXeSHpsy%2FrK6tiQNpx7U6Q9GDdW%2Fc5XD1wW6XKhxAet8Fb7FfHWyugNHAKVJgANNCaVLegN5hGElcLf5M5Y5MFkSPPN5JsFwSwlXT0jNn4K1eAcgxhMgXEiLHrcBFjEdV6htpHPUDr94m1eBzT5XonrEcPMqF8wbEMh4lX00PjOoc5N4rhWZwzOtubr0jL8VJ2FemXUCXa3%2F7M%2B0P0MHlPhMzpSNNUstic1w4eUYZZqV72iUQUNKgFrMGSTC9NBf6B8opyOjdwfMYbCdnK9ucxQANFtCkw9MC8yQY6pgHOZsxEqdtrjTC6XhvxsjZdF2qsGu67y0WLxKxt3G4vzm%2Bc%2FcZv4yiTlTx05j%2BaGp%2FZiKfIMJIPgDiH5iShhHGeHpHZBi3%2FuHztItzBUXon1PuxEYTZHNowTE4lIRjwRRXhUTXathNOT3CeSsBpNEO%2BpqQ9QGWThyTKrzjt9jkmHKlnXhnjWcshEe%2BYpTBgxAAxBl3fgpNQaQ0V38Hn3uFMD4yQLLtR&X-Amz-Signature=c6cf7697868271ba8b96c2042bebf786f8549c01a5e1c6c2daa4dc9e7d3211a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQ4TOBNF%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T180126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIF5y4mhy%2FNQnC7qeab%2BA4w%2BnC5%2Bgxx9hqdYFDn%2FmfQNAAiEA8YT21KPHk6OnujrLgpXdQ2lwpJCRqT3fWSsT6nOQnoUq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDFXnbR8UL3t%2FZTyx5CrcAz8ov71UNxOM5xXyOTBxMACFpNm4cnWCjeLfhup2tRCOcFbFStn2iych0YUs%2FmTM8vKBtGmLP4CiI0rAppZPiuKH2ZXnAMHpdujyyReuLu0ucHYIJ%2FlZtkHZrEvKBcG2DrDhs214iG4DCRqJmhNKVpHQt2uXJ5s%2Brj5BeyyaKYiLP6FdMDhyNEQUhmdHVnJHMYqOfXf3QKFZWmG1%2BYmlRSvyND8qTCmfESZNkY5Dpn4cypw09Sml8ivo%2Fcisz5%2BiN5B66pQFNv1a%2FMxzX3yqvs6x9pdBTh5LG7yfuo3wF5v8EdLGOb7jJRgUYS49LrYK6WVSGCQgLDFneZz4StpmgujXuAXGvHO20zkuR%2B2%2FmUIKUoQPncS3h1NDRvRJGEJPvk6FVNpTgq7hLzDozxlVfB0j6ixpPjJbHQVHpmUj5x9AEl1FUzZrlMBtMo0n%2FFNpMv38JK9NTKiAaF7c0C%2FiI5KvENBXISHIjmELLC3vUWQsWcyW61lqD8V%2BCEeqvFwuOytQbEpunoykYDgKd92G7B5AaCG7FszKBONs5BPhGR9rs70Xd%2F73ihc35UVCjFU9rsMuDzFZI9WkiDhSaL1XNAlKh2kxU4TvpfGU%2BI1W2Hwb6tkLdn2LfbHPQhMDMIXCvMkGOqUBdOFGhp0FdsBpvNwliYcNPQHFEOJfZRsy9JRU7tArsP9rMA8eCjWfNgImx%2B6rbNISl9wChCmlAnAaff2ny0RoMxJ%2BtbbcBqsEXRZEN7KjmwFlSPe0ePsaazuj8FxEUnOfhlD10E7m4G21PjZHFYyyqAjhStDoQkJUkL2iTgOp7KSYVW503OajDsiEE9vFFORUnSZsV6SVsP4XwwmwUot8DrCAJx59&X-Amz-Signature=f526c1c96089f39977c5cdc85673d8c89241e6452f0ffc7160facc4eb2e1d918&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4WVW7RX%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T180130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIE3hqfTKYzNiVoO7BdFrdSHlxcgepbCLPTVpzaYDQAKAAiBjBhLojW2OOSepowMSy3rKnjirkY25kF3t9P8qHWN3Sir%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMEcXFGGhDffXIBoIQKtwDtBEF3dOiRqNPIcLf40BVagFcuewO7ykFcd4QxSSFWSJ1DEUABFvWQe3rjZSa0d%2FnRQciLASdR5dnvhDtEG9ElWw73Hwh8ajAV5Z%2F9sTHVFe%2FFnHpSLqVZWOW5A4n1k1V%2BGdgXcNBVwyHbawVQcjSMpdF3k9kH8HJrBnwxmZCPaz9NQQzLORidvAPkX8ciWQXaCdr1dW72sVCcM8UdgN97gr4EyPO8l20cZ57jUhi6jWuBXbsr1SytEHz4SyQ22Bmz9ZXRBjG%2FHdWl2hacIqxyl3m4Kc72yzPGFng5I4527cZRhzgddXLA5qfy75Mz11EtItuvydWm1ti3FxVN5qLW%2BZJofUUloWZ3EKkOvorplgyUo2Sng4uai1lbY3TSfiidD4%2BT1Fr69WMNaqwI%2F5O9IoBXrSZyYQ3P3w4Ab5csEJwHvwUBj000pBt8SeGE0Hs7VfJz%2BMxZoM45dKpdnUjoxJu58%2BuhyjyYrs2G8XlUioEC56XPhi0R53zEKNtZZaSNMJDErmHabdFqSCL1Mq7JcJ5kydgWya2Y4WLv%2B5UQ2MigVG8FXHhCcmxxOeV1v5pkpcIZfgsUUsOaFho2GV2OonNgcNRzDAk617mDnv0sXtEN5vTknf7pYzSHOcw78G8yQY6pgEBNUSI4m2EWkBZmsZ0KxsV6eb2e43aLpkj6BrbZ7lYArpwjFKTQRkt5Z4dKb%2BHBzQmeAxeVPAyJva%2FRt7rTuRXDuxyezfdOsr6d4Dfmx9uov7RmohGVW5ZH9CI3dV9VGSghlndbgSv9eSB30LaT8Re45u7mFrn6z1CQgTJOfPtBz3QXEE1usw6r246uD7lKTwAEntWxAvHT70ptUswFFitvt8qmZ%2B5&X-Amz-Signature=f4fba6bde4cf8412d13c7ff66b6d6daa0b1166b0dccc39b13c6d322766761f19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4WVW7RX%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T180130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIE3hqfTKYzNiVoO7BdFrdSHlxcgepbCLPTVpzaYDQAKAAiBjBhLojW2OOSepowMSy3rKnjirkY25kF3t9P8qHWN3Sir%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMEcXFGGhDffXIBoIQKtwDtBEF3dOiRqNPIcLf40BVagFcuewO7ykFcd4QxSSFWSJ1DEUABFvWQe3rjZSa0d%2FnRQciLASdR5dnvhDtEG9ElWw73Hwh8ajAV5Z%2F9sTHVFe%2FFnHpSLqVZWOW5A4n1k1V%2BGdgXcNBVwyHbawVQcjSMpdF3k9kH8HJrBnwxmZCPaz9NQQzLORidvAPkX8ciWQXaCdr1dW72sVCcM8UdgN97gr4EyPO8l20cZ57jUhi6jWuBXbsr1SytEHz4SyQ22Bmz9ZXRBjG%2FHdWl2hacIqxyl3m4Kc72yzPGFng5I4527cZRhzgddXLA5qfy75Mz11EtItuvydWm1ti3FxVN5qLW%2BZJofUUloWZ3EKkOvorplgyUo2Sng4uai1lbY3TSfiidD4%2BT1Fr69WMNaqwI%2F5O9IoBXrSZyYQ3P3w4Ab5csEJwHvwUBj000pBt8SeGE0Hs7VfJz%2BMxZoM45dKpdnUjoxJu58%2BuhyjyYrs2G8XlUioEC56XPhi0R53zEKNtZZaSNMJDErmHabdFqSCL1Mq7JcJ5kydgWya2Y4WLv%2B5UQ2MigVG8FXHhCcmxxOeV1v5pkpcIZfgsUUsOaFho2GV2OonNgcNRzDAk617mDnv0sXtEN5vTknf7pYzSHOcw78G8yQY6pgEBNUSI4m2EWkBZmsZ0KxsV6eb2e43aLpkj6BrbZ7lYArpwjFKTQRkt5Z4dKb%2BHBzQmeAxeVPAyJva%2FRt7rTuRXDuxyezfdOsr6d4Dfmx9uov7RmohGVW5ZH9CI3dV9VGSghlndbgSv9eSB30LaT8Re45u7mFrn6z1CQgTJOfPtBz3QXEE1usw6r246uD7lKTwAEntWxAvHT70ptUswFFitvt8qmZ%2B5&X-Amz-Signature=f4fba6bde4cf8412d13c7ff66b6d6daa0b1166b0dccc39b13c6d322766761f19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

